# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation

import pandas as pd
from data_pipeline.config import settings

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class FloodRiskETL(ExtractTransformLoad):
    """ETL class for the First Street Foundation flood risk dataset"""

    NAME = "fsf_flood_risk"
    SOURCE_URL = settings.AWS_JUSTICE40_DATASOURCES_URL + "/fsf_flood.zip"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    # Output score variables (values set on datasets.yml) for linting purposes
    COUNT_PROPERTIES: str
    PROPERTIES_AT_RISK_FROM_FLOODING_TODAY: str
    PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS: str
    SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_TODAY: str
    SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS: str

    def __init__(self):
        # define the full path for the input CSV file
        self.INPUT_CSV = (
            self.get_tmp_path() / "fsf_flood" / "flood_tract_2010.csv"
        )

        # this is the main dataframe
        self.df: pd.DataFrame

        # Start dataset-specific vars here
        self.COUNT_PROPERTIES_NATIVE_FIELD_NAME = "count_properties"
        self.COUNT_PROPERTIES_AT_RISK_TODAY = "mid_depth_100_year00"
        self.COUNT_PROPERTIES_AT_RISK_30_YEARS = "mid_depth_100_year30"
        self.CLIP_PROPERTIES_COUNT = 250

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Calculates share of properties at risk, left-clipping number of properties at 250
        """
        logger.info("Transforming National Risk Index Data")

        # read in the unzipped csv data source then rename the
        # Census Tract column for merging
        df_fsf_flood_disagg: pd.DataFrame = pd.read_csv(
            self.INPUT_CSV,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: str},
            low_memory=False,
        )

        df_fsf_flood_disagg[self.GEOID_TRACT_FIELD_NAME] = df_fsf_flood_disagg[
            self.INPUT_GEOID_TRACT_FIELD_NAME
        ].str.zfill(11)

        # Because we have some tracts that are listed twice, we aggregate based on
        # GEOID10_TRACT. Note that I haven't confirmed this with the FSF boys -- to do!
        df_fsf_flood = (
            df_fsf_flood_disagg.groupby(self.GEOID_TRACT_FIELD_NAME)
            .sum()
            .reset_index()
        )

        df_fsf_flood[self.COUNT_PROPERTIES] = df_fsf_flood[
            self.COUNT_PROPERTIES_NATIVE_FIELD_NAME
        ].clip(lower=self.CLIP_PROPERTIES_COUNT)

        df_fsf_flood[self.SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_TODAY] = (
            df_fsf_flood[self.COUNT_PROPERTIES_AT_RISK_TODAY]
            / df_fsf_flood[self.COUNT_PROPERTIES]
        )
        df_fsf_flood[
            self.SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS
        ] = (
            df_fsf_flood[self.COUNT_PROPERTIES_AT_RISK_30_YEARS]
            / df_fsf_flood[self.COUNT_PROPERTIES]
        )

        # Assign the final df to the class' output_df for the load method with rename
        self.output_df = df_fsf_flood.rename(
            columns={
                self.COUNT_PROPERTIES_AT_RISK_TODAY: self.PROPERTIES_AT_RISK_FROM_FLOODING_TODAY,
                self.COUNT_PROPERTIES_AT_RISK_30_YEARS: self.PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS,
            }
        )
