import concurrent.futures
import math
import os

import geopandas as gpd
import numpy as np
import pandas as pd
from data_pipeline.content.schemas.download_schemas import CSVConfig
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.score import constants
from data_pipeline.etl.score.etl_utils import check_score_data_source
from data_pipeline.etl.sources.census.etl_utils import check_census_data_source
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.utils import load_dict_from_yaml_object_fields
from data_pipeline.utils import load_yaml_dict_from_file
from data_pipeline.utils import zip_files
from data_pipeline.etl.datasource import DataSource

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

        self.SCORE_CSV_PATH = self.DATA_PATH / "score" / "csv"
        self.TILE_SCORE_CSV = self.SCORE_CSV_PATH / "tiles" / "usa.csv"

        self.CENSUS_USA_GEOJSON = (
            self.DATA_PATH / "census" / "geojson" / "us.json"
        )

        # Import the shortened name for Score N to be used on tiles.
        # We should no longer be using PFS

        ## TODO: We really should not have this any longer changing
        self.TARGET_SCORE_SHORT_FIELD = constants.TILES_SCORE_COLUMNS[
            field_names.FINAL_SCORE_N_BOOLEAN
        ]
        self.TARGET_SCORE_RENAME_TO = "SCORE"

        # Import the shortened name for tract ("GTF") that's used on the tiles.
        self.TRACT_SHORT_FIELD = constants.TILES_SCORE_COLUMNS[
            field_names.GEOID_TRACT_FIELD
        ]
        self.GEOMETRY_FIELD_NAME = "geometry"
        self.LAND_FIELD_NAME = "ALAND10"

        # We will adjust this upwards while there is some fractional value
        # in the score. This is a starting value.
        self.NUMBER_OF_BUCKETS = 10
        self.HOMOGENEITY_THRESHOLD = 200
        self.HIGH_LOW_ZOOM_CENSUS_TRACT_THRESHOLD = 150

        self.geojson_usa_df: gpd.GeoDataFrame
        self.score_usa_df: pd.DataFrame
        self.geojson_score_usa_high: gpd.GeoDataFrame
        self.geojson_score_usa_low: gpd.GeoDataFrame

    def get_data_sources(self) -> [DataSource]:
        return (
            []
        )  # we have all prerequisite sources locally as a result of generating the previous steps in the pipeline

    def extract(self, use_cached_data_sources: bool = False) -> None:

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
        full_geojson_usa_df = gpd.read_file(
            self.CENSUS_USA_GEOJSON,
            dtype={self.GEOID_FIELD_NAME: "string"},
            usecols=[
                self.GEOID_FIELD_NAME,
                self.GEOMETRY_FIELD_NAME,
                self.LAND_FIELD_NAME,
            ],
            low_memory=False,
        )

        # We only want to keep tracts to visualize that have non-0 land
        self.geojson_usa_df = full_geojson_usa_df[
            full_geojson_usa_df[self.LAND_FIELD_NAME] > 0
        ]

        logger.info("Reading score CSV")
        self.score_usa_df = pd.read_csv(
            self.TILE_SCORE_CSV,
            dtype={
                self.TRACT_SHORT_FIELD: str,
            },
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
        logger.info("Merging and compressing score csv with USA GeoJSON")
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

        logger.info("Converting GeoJSON into GeoDataFrame with tracts")
        usa_tracts = gpd.GeoDataFrame(
            usa_tracts,
            columns=[
                self.TARGET_SCORE_RENAME_TO,
                self.GEOMETRY_FIELD_NAME,
                self.GEOID_FIELD_NAME,
            ],
            crs="EPSG:4326",
        )

        logger.debug("Creating buckets from tracts")
        usa_bucketed, keep_high_zoom_df = self._create_buckets_from_tracts(
            usa_tracts, self.NUMBER_OF_BUCKETS
        )

        logger.debug("Aggregating buckets")
        usa_aggregated = self._aggregate_buckets(usa_bucketed, agg_func="mean")

        logger.debug("Breaking up polygons")
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

        logger.debug(
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
                filename=self.SCORE_HIGH_GEOJSON,
                driver="GeoJSON",
            )
            logger.info("Completed writing usa-high")

        def write_low_to_file():
            logger.info("Writing usa-low (~9 minutes)")
            self.geojson_score_usa_low.to_file(
                filename=self.SCORE_LOW_GEOJSON, driver="GeoJSON"
            )
            logger.info("Completed writing usa-low")

        def create_esri_codebook(codebook) -> pd.DataFrame:
            """temporary: helper to make a codebook for esri shapefile only"""

            shapefile_column_field = "shapefile_column"
            internal_column_name_field = "column_name"
            column_description_field = "column_description"

            logger.info("Creating an ESRI codebook with shortened column names")
            codebook = (
                pd.Series(codebook)
                .reset_index()
                .rename(
                    columns={
                        0: internal_column_name_field,
                        "index": shapefile_column_field,
                    }
                )
            )

            # open yaml config
            downloadable_csv_config = load_yaml_dict_from_file(
                self.CONTENT_CONFIG / "csv.yml", CSVConfig
            )
            column_rename_dict = load_dict_from_yaml_object_fields(
                yaml_object=downloadable_csv_config["fields"],
                object_key="score_name",
                object_value="label",
            )

            codebook[column_description_field] = codebook[
                internal_column_name_field
            ].map(column_rename_dict)

            codebook = codebook[
                [
                    shapefile_column_field,
                    internal_column_name_field,
                    column_description_field,
                ]
            ]
            logger.info("Completed creating ESRI codebook")

            return codebook

        def combine_esri_codebook_with_original_codebook(esri_codebook_df):
            """Combines the ESRI codebook generated above with the original codebook generated
            during score-post. Essentially we want to include the shapefile column name in the
            original codebook."""

            logger.info("Combining ESRI codebook with original codebook")

            # load up the original codebook
            original_codebook_df = pd.read_csv(
                constants.SCORE_DOWNLOADABLE_CODEBOOK_FILE_PATH,
                low_memory=False,
            )

            # if we've already combined these files in the past, go ahead and remove the columns so we can do it again
            original_codebook_df.drop(
                "shapefile_label", axis=1, errors="ignore", inplace=True
            )

            # add the esri (shapefile) columns to the original codebook by joining the two dataframes
            combined_codebook_df = original_codebook_df.merge(
                esri_codebook_df[["shapefile_column", "column_name"]],
                how="outer",
                left_on="Description",
                right_on="column_name",
            )

            # if any descriptions are blank, replace them with the column_name description from the esri codebook
            combined_codebook_df["Description"].mask(
                combined_codebook_df["Description"].isnull(),
                combined_codebook_df["column_name"],
                inplace=True,
            )
            combined_codebook_df = combined_codebook_df.drop(
                "column_name", axis=1
            )

            # move some stuff around to make it easier to read the output
            shapefile_col = combined_codebook_df.pop("shapefile_column")
            combined_codebook_df.insert(2, "shapefile_label", shapefile_col)

            # save the combined codebook
            combined_codebook_df.to_csv(
                constants.SCORE_DOWNLOADABLE_CODEBOOK_FILE_PATH, index=False
            )
            logger.info(
                "Completed combining ESRI codebook with original codebook"
            )

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

            for i, column in enumerate(self.geojson_score_usa_high.columns):
                # take first 6 characters and add a number to ensure uniqueness
                # this is the max due to esri (index can be 3-digits)
                if len(column) > 10:
                    new_col = column[:6] + f"_{i}"
                else:
                    new_col = column
                codebook[new_col] = reversed_tiles.get(column, column)
                if new_col != column:
                    renaming_map[column] = new_col

            self.geojson_score_usa_high.rename(columns=renaming_map).to_file(
                self.SCORE_SHP_FILE
            )
            logger.info("Completed writing shapefile")

            esri_codebook_df = create_esri_codebook(codebook)
            combine_esri_codebook_with_original_codebook(esri_codebook_df)

            arcgis_zip_file_path = self.SCORE_SHP_PATH / "usa.zip"
            arcgis_files = []
            for file in os.listdir(self.SCORE_SHP_PATH):
                # don't remove __init__ files as they conserve dir structure
                if file != "__init__.py":
                    arcgis_files.append(self.SCORE_SHP_PATH / file)
            arcgis_files.append(constants.SCORE_DOWNLOADABLE_CODEBOOK_FILE_PATH)
            zip_files(arcgis_zip_file_path, arcgis_files)
            logger.info("Completed zipping shapefiles")

            # Per #1557:
            # Zip file that contains the shapefiles, codebook and checksum file.
            # Normally we get the codebook file path using this constant:
            # - codebook_path = constants.SCORE_DOWNLOADABLE_CODEBOOK_FILE_PATH
            # However since we generate it on a separate script (etl_score_post)
            # the time stamp can be generated again, and thus the file is not found.
            # So we grab it from the downloadable dir and if we don't find it, it
            # means we haven't run etl_score_post, and continue

            logger.info("Getting codebook from downloadable dir")
            codebook_path = None
            for file in os.listdir(constants.SCORE_DOWNLOADABLE_DIR):
                if "codebook" in file:
                    codebook_path = constants.SCORE_DOWNLOADABLE_DIR / file

            if codebook_path:
                version_shapefile_codebook_zip_path = (
                    constants.SCORE_VERSIONING_SHAPEFILE_CODEBOOK_FILE_PATH
                )
                readme_path = constants.SCORE_VERSIONING_README_FILE_PATH

                logger.info("Compressing shapefile and codebook files")
                files_to_compress = [
                    arcgis_zip_file_path,
                    codebook_path,
                    readme_path,
                ]
                zip_files(
                    version_shapefile_codebook_zip_path, files_to_compress
                )

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
