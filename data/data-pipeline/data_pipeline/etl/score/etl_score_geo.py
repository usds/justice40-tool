import math
import pandas as pd
import geopandas as gpd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.score import constants
from data_pipeline.etl.sources.census.etl_utils import (
    check_census_data_source,
)
from data_pipeline.etl.score.etl_utils import check_score_data_source
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

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

        self.NUMBER_OF_BUCKETS = 10

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
        # self.score_usa_df.rename(
        #     columns={self.TRACT_SHORT_FIELD: self.GEOID_FIELD_NAME},
        #     inplace=True,
        # )

        logger.info("Pruning Census GeoJSON")
        fields = [self.GEOID_FIELD_NAME, self.GEOMETRY_FIELD_NAME]
        self.geojson_usa_df = self.geojson_usa_df[fields]
        logger.info("Merging and compressing score CSV with USA GeoJSON")
        self.geojson_score_usa_high = (
            self.score_usa_df.set_index(self.TRACT_SHORT_FIELD)
            .merge(
                self.geojson_usa_df.set_index(self.GEOID_FIELD_NAME),
                left_index=True,
                right_index=True,
                how="left",
            )
            .reset_index()
        )
        self.geojson_score_usa_high = gpd.GeoDataFrame(
            self.geojson_score_usa_high, crs="EPSG:4326"
        )

        usa_simplified = self.geojson_score_usa_high[
            [
                self.GEOID_FIELD_NAME,
                self.TARGET_SCORE_SHORT_FIELD,
                self.GEOMETRY_FIELD_NAME,
            ]
        ].reset_index(drop=True)

        usa_simplified.rename(
            columns={
                self.TARGET_SCORE_SHORT_FIELD: self.TARGET_SCORE_RENAME_TO
            },
            inplace=True,
        )

        logger.info("Aggregating into tracts (~5 minutes)")
        usa_tracts = self._aggregate_to_tracts(usa_simplified)

        usa_tracts = gpd.GeoDataFrame(
            usa_tracts,
            columns=[self.TARGET_SCORE_RENAME_TO, self.GEOMETRY_FIELD_NAME],
            crs="EPSG:4326",
        )

        logger.info("Creating buckets from tracts")
        usa_bucketed = self._create_buckets_from_tracts(
            usa_tracts, self.NUMBER_OF_BUCKETS
        )

        logger.info("Aggregating buckets")
        usa_aggregated = self._aggregate_buckets(usa_bucketed, agg_func="mean")

        compressed = self._breakup_multipolygons(
            usa_aggregated, self.NUMBER_OF_BUCKETS
        )

        self.geojson_score_usa_low = gpd.GeoDataFrame(
            compressed,
            columns=[self.TARGET_SCORE_RENAME_TO, self.GEOMETRY_FIELD_NAME],
            crs="EPSG:4326",
        )

        # round to 2 decimals
        decimals = pd.Series([2], index=[self.TARGET_SCORE_RENAME_TO])
        self.geojson_score_usa_low = self.geojson_score_usa_low.round(decimals)

    def _aggregate_to_tracts(
        self, block_group_df: gpd.GeoDataFrame
    ) -> gpd.GeoDataFrame:
        # The tract identifier is the first 11 digits of the GEOID
        block_group_df["tract"] = block_group_df[self.GEOID_FIELD_NAME].str[:11]
        state_tracts = block_group_df.dissolve(by="tract", aggfunc="mean")
        return state_tracts

    def _create_buckets_from_tracts(
        self, state_tracts: gpd.GeoDataFrame, num_buckets: int
    ) -> gpd.GeoDataFrame:
        # assign tracts to buckets by SCORE
        state_tracts.sort_values(self.TARGET_SCORE_RENAME_TO, inplace=True)
        score_bucket = []
        bucket_size = math.ceil(
            len(state_tracts.index) / self.NUMBER_OF_BUCKETS
        )
        for i in range(len(state_tracts.index)):
            score_bucket.extend([math.floor(i / bucket_size)])
        state_tracts[f"{self.TARGET_SCORE_RENAME_TO}_bucket"] = score_bucket
        return state_tracts

    def _aggregate_buckets(self, state_tracts: gpd.GeoDataFrame, agg_func: str):
        # dissolve tracts by bucket
        state_attr = state_tracts[
            [
                self.TARGET_SCORE_RENAME_TO,
                f"{self.TARGET_SCORE_RENAME_TO}_bucket",
                self.GEOMETRY_FIELD_NAME,
            ]
        ].reset_index(drop=True)
        state_dissolve = state_attr.dissolve(
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

    def load(self) -> None:
        logger.info("Writing usa-high (~9 minutes)")
        self.geojson_score_usa_high.to_file(
            self.SCORE_HIGH_GEOJSON, driver="GeoJSON"
        )
        logger.info("Completed writing usa-high")

        logger.info("Writing usa-low (~9 minutes)")
        self.geojson_score_usa_low.to_file(
            self.SCORE_LOW_GEOJSON, driver="GeoJSON"
        )
        logger.info("Completed writing usa-low")
