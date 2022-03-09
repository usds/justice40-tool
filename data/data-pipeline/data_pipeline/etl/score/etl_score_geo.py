import concurrent.futures
import math
import os
import numpy as np
import pandas as pd
import geopandas as gpd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.score import constants
from data_pipeline.etl.sources.census.etl_utils import (
    check_census_data_source,
)
from data_pipeline.etl.score.etl_utils import check_score_data_source
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger, zip_files

logger = get_module_logger(__name__)


class GeoScoreETL(ExtractTransformLoad):
    """
    A class used to generate per state and national GeoJson files with the score baked in
    """

    def __init__(self, data_source: str = None):
        self.DATA_SOURCE = data_source
        self.SCORE_GEOJSON_PATH = self.DATA_PATH / "score" / "geojson"
        self.SCORE_LOW_GEOJSON = self.SCORE_GEOJSON_PATH / "usa-low.json"
        self.SCORE_HIGH_GEOJSON = self.SCORE_GEOJSON_PATH / "usa-high.json"

        self.SCORE_SHP_PATH = self.DATA_PATH / "score" / "shapefile"
        self.SCORE_SHP_FILE = self.SCORE_SHP_PATH / "usa.shp"
        self.SCORE_SHP_CODE_CSV = self.SCORE_SHP_PATH / "columns.csv"

        self.SCORE_CSV_PATH = self.DATA_PATH / "score" / "csv"
        self.TILE_SCORE_CSV = self.SCORE_CSV_PATH / "tiles" / "usa.csv"

        self.DATA_SOURCE = data_source
        self.CENSUS_USA_GEOJSON = (
            self.DATA_PATH / "census" / "geojson" / "us.json"
        )

        # Import the shortened name for Score M percentile ("SM_PFS") that's used on the
        # tiles.
        self.TARGET_SCORE_SHORT_FIELD = constants.TILES_SCORE_COLUMNS[
            field_names.SCORE_M + field_names.PERCENTILE_FIELD_SUFFIX
        ]
        self.TARGET_SCORE_RENAME_TO = "M_SCORE"

        # Import the shortened name for tract ("GTF") that's used on the tiles.
        self.TRACT_SHORT_FIELD = constants.TILES_SCORE_COLUMNS[
            field_names.GEOID_TRACT_FIELD
        ]
        self.GEOMETRY_FIELD_NAME = "geometry"

        # We will adjust this upwards while there is some fractional value
        # in the score. This is a starting value.
        self.NUMBER_OF_BUCKETS = 10
        self.HOMOGENEITY_THRESHOLD = 200
        self.HIGH_LOW_ZOOM_CENSUS_TRACT_THRESHOLD = 150

        self.geojson_usa_df: gpd.GeoDataFrame
        self.score_usa_df: pd.DataFrame
        self.geojson_score_usa_high: gpd.GeoDataFrame
        self.geojson_score_usa_low: gpd.GeoDataFrame

    def extract(self) -> None:
        # check census data
        check_census_data_source(
            census_data_path=self.DATA_PATH / "census",
            census_data_source=self.DATA_SOURCE,
        )

        # check score data
        check_score_data_source(
            score_csv_data_path=self.SCORE_CSV_PATH,
            score_data_source=self.DATA_SOURCE,
        )

        logger.info("Reading US GeoJSON (~6 minutes)")
        self.geojson_usa_df = gpd.read_file(
            self.CENSUS_USA_GEOJSON,
            dtype={self.GEOID_FIELD_NAME: "string"},
            usecols=[self.GEOID_FIELD_NAME, self.GEOMETRY_FIELD_NAME],
            low_memory=False,
        )

        logger.info("Reading score CSV")
        self.score_usa_df = pd.read_csv(
            self.TILE_SCORE_CSV,
            dtype={self.TRACT_SHORT_FIELD: "string"},
            low_memory=False,
        )

    def transform(self) -> None:
        # Rename GEOID10_TRACT to GEOID10 on score to allow merging with Census GeoJSON
        self.score_usa_df.rename(
            columns={self.TRACT_SHORT_FIELD: self.GEOID_FIELD_NAME},
            inplace=True,
        )

        logger.info("Pruning Census GeoJSON")
        fields = [self.GEOID_FIELD_NAME, self.GEOMETRY_FIELD_NAME]

        # TODO update this join
        logger.info("Merging and compressing score CSV with USA GeoJSON")
        self.geojson_score_usa_high = self.score_usa_df.set_index(
            self.GEOID_FIELD_NAME
        ).merge(
            self.geojson_usa_df[fields].set_index(self.GEOID_FIELD_NAME),
            left_index=True,
            right_index=True,
            how="left",
        )

        self.geojson_score_usa_high = gpd.GeoDataFrame(
            self.geojson_score_usa_high, crs="EPSG:4326"
        )

        usa_simplified = self.geojson_score_usa_high[
            [
                self.TARGET_SCORE_SHORT_FIELD,
                self.GEOMETRY_FIELD_NAME,
            ]
        ].reset_index()

        usa_tracts = usa_simplified.rename(
            columns={self.TARGET_SCORE_SHORT_FIELD: self.TARGET_SCORE_RENAME_TO}
        )

        logger.info("Converting to geojson into tracts")
        usa_tracts = gpd.GeoDataFrame(
            usa_tracts,
            columns=[
                self.TARGET_SCORE_RENAME_TO,
                self.GEOMETRY_FIELD_NAME,
                self.GEOID_FIELD_NAME,
            ],
            crs="EPSG:4326",
        )

        logger.info("Creating buckets from tracts")
        usa_bucketed, keep_high_zoom_df = self._create_buckets_from_tracts(
            usa_tracts, self.NUMBER_OF_BUCKETS
        )

        logger.info("Aggregating buckets")
        usa_aggregated = self._aggregate_buckets(usa_bucketed, agg_func="mean")

        logger.info("Breaking up polygons")
        compressed = self._breakup_multipolygons(
            usa_aggregated, self.NUMBER_OF_BUCKETS
        )

        self.geojson_score_usa_low = self._join_high_and_low_zoom_frames(
            compressed, keep_high_zoom_df
        )

        # round to 2 decimals
        self.geojson_score_usa_low = self.geojson_score_usa_low.round(
            {self.TARGET_SCORE_RENAME_TO: 2}
        )

    def _create_buckets_from_tracts(
        self, initial_state_tracts: gpd.GeoDataFrame, num_buckets: int
    ):
        # First, we remove any states that have under the threshold of census tracts
        # from being aggregated (right now, this just removes Wyoming)
        highzoom_state_tracts = initial_state_tracts.reset_index()
        highzoom_state_tracts["state"] = highzoom_state_tracts[
            self.GEOID_FIELD_NAME
        ].str[:2]
        keep_high_zoom = highzoom_state_tracts.groupby("state")[
            self.GEOID_FIELD_NAME
        ].transform(
            lambda x: x.count() <= self.HIGH_LOW_ZOOM_CENSUS_TRACT_THRESHOLD
        )
        assert (
            keep_high_zoom.sum() != initial_state_tracts.shape[0]
        ), "Error: Cutoff is too high, nothing is aggregated"
        assert keep_high_zoom.sum() > 1, "Error: Nothing is kept at high zoom"

        # Then we assign buckets only to tracts that do not get "kept" at high zoom
        state_tracts = initial_state_tracts[~keep_high_zoom].copy()
        state_tracts[f"{self.TARGET_SCORE_RENAME_TO}_bucket"] = np.arange(
            len(state_tracts)
        )
        # assign tracts to buckets by score
        state_tracts = state_tracts.sort_values(
            self.TARGET_SCORE_RENAME_TO, ascending=True
        )
        score_bucket = []
        bucket_size = math.ceil(
            len(state_tracts.index) / self.NUMBER_OF_BUCKETS
        )

        # This just increases the number of buckets so they are more
        # homogeneous. It's not actually necessary :shrug:
        while (
            state_tracts[self.TARGET_SCORE_RENAME_TO].sum() % bucket_size
            > self.HOMOGENEITY_THRESHOLD
        ):
            self.NUMBER_OF_BUCKETS += 1
            bucket_size = math.ceil(
                len(state_tracts.index) / self.NUMBER_OF_BUCKETS
            )

        logger.info(
            f"The number of buckets has increased to {self.NUMBER_OF_BUCKETS}"
        )
        for i in range(len(state_tracts.index)):
            score_bucket.extend([math.floor(i / bucket_size)])
        state_tracts[f"{self.TARGET_SCORE_RENAME_TO}_bucket"] = score_bucket

        return state_tracts, initial_state_tracts[keep_high_zoom]

    def _aggregate_buckets(
        self, state_tracts: gpd.GeoDataFrame, agg_func: str
    ) -> gpd.GeoDataFrame:
        keep_cols = [
            self.TARGET_SCORE_RENAME_TO,
            f"{self.TARGET_SCORE_RENAME_TO}_bucket",
            self.GEOMETRY_FIELD_NAME,
        ]

        #  We dissolve all other tracts by their score bucket
        state_dissolve = state_tracts[keep_cols].dissolve(
            by=f"{self.TARGET_SCORE_RENAME_TO}_bucket", aggfunc=agg_func
        )
        return state_dissolve

    def _breakup_multipolygons(
        self, state_bucketed_df: gpd.GeoDataFrame, num_buckets: int
    ) -> gpd.GeoDataFrame:

        compressed = []
        for i in range(num_buckets):
            for j in range(
                len(state_bucketed_df[self.GEOMETRY_FIELD_NAME][i].geoms)
            ):
                compressed.append(
                    [
                        state_bucketed_df[self.TARGET_SCORE_RENAME_TO][i],
                        state_bucketed_df[self.GEOMETRY_FIELD_NAME][i].geoms[j],
                    ]
                )
        return compressed

    def _join_high_and_low_zoom_frames(
        self, compressed: list, keep_high_zoom_df: gpd.GeoDataFrame
    ) -> gpd.GeoDataFrame:
        keep_columns = [
            self.TARGET_SCORE_RENAME_TO,
            self.GEOMETRY_FIELD_NAME,
        ]
        compressed_geodf = gpd.GeoDataFrame(
            compressed,
            columns=keep_columns,
            crs="EPSG:4326",
        )
        return pd.concat([compressed_geodf, keep_high_zoom_df[keep_columns]])

    def load(self) -> None:
        # Create separate threads to run each write to disk.
        def write_high_to_file():
            logger.info("Writing usa-high (~9 minutes)")
            self.geojson_score_usa_high.to_file(
                filename=self.SCORE_HIGH_GEOJSON, driver="GeoJSON"
            )
            logger.info("Completed writing usa-high")

        def write_low_to_file():
            logger.info("Writing usa-low (~9 minutes)")
            self.geojson_score_usa_low.to_file(
                filename=self.SCORE_LOW_GEOJSON, driver="GeoJSON"
            )
            logger.info("Completed writing usa-low")

        def write_esri_shapefile():
            logger.info("Producing ESRI shapefiles")
            # Note that esri shapefiles can't have long column names, so we borrow from the
            # shorten some tile names (renaming map) and print out a codebook for the user
            codebook = {}
            renaming_map = {}

            # allows us to quickly rename / describe columns
            reversed_tiles = {
                short: long
                for long, short in constants.TILES_SCORE_COLUMNS.items()
            }
            for column in self.geojson_score_usa_high.columns:
                # take first 10 characters, max due to ESRI constraints
                new_col = column[:10]
                codebook[new_col] = reversed_tiles.get(column, column)
                if new_col != column:
                    renaming_map[column] = new_col

            pd.Series(codebook).reset_index().rename(
                # kept as strings because no downstream impacts
                columns={0: "column", "index": "meaning"}
            ).to_csv(self.SCORE_SHP_CODE_CSV, index=False)

            self.geojson_score_usa_high.rename(columns=renaming_map).to_file(
                self.SCORE_SHP_FILE
            )
            logger.info("Completed writing shapefile")

            arcgis_zip_file_path = self.SCORE_SHP_PATH / "usa.zip"
            arcgis_files = []
            for file in os.listdir(self.SCORE_SHP_PATH):
                # don't remove __init__ files as they conserve dir structure
                if file != "__init__.py":
                    arcgis_files.append(self.SCORE_SHP_PATH / file)
            zip_files(arcgis_zip_file_path, arcgis_files)
            logger.info("Completed zipping shapefiles")

        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {
                executor.submit(task)
                for task in [
                    write_high_to_file,
                    write_low_to_file,
                    write_esri_shapefile,
                ]
            }

            for fut in concurrent.futures.as_completed(futures):
                # Calling result will raise an exception if one occurred.
                # Otherwise, the exceptions are silently ignored.
                fut.result()
