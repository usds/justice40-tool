# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation
import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource

logger = get_module_logger(__name__)


class FloodRiskETL(ExtractTransformLoad):
    """ETL class for the First Street Foundation flood risk dataset"""

    NAME = "fsf_flood_risk"
    # These data were emailed to the J40 team while first street got
    # their official data sharing channels setup.

    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    LOAD_YAML_CONFIG: bool = True

    # Output score variables (values set on datasets.yml) for linting purposes
    COUNT_PROPERTIES: str
    PROPERTIES_AT_RISK_FROM_FLOODING_TODAY: str
    PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS: str
    SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_TODAY: str
    SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS: str

    def __init__(self):

        # fetch
        self.flood_tract_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/fsf_flood.zip"
        )

        # input
        self.flood_tract_source = (
            self.get_sources_path() / "fsf_flood" / "flood-tract2010.csv"
        )

        # Start dataset-specific vars here
        self.COUNT_PROPERTIES_NATIVE_FIELD_NAME = "count_properties"
        self.COUNT_PROPERTIES_AT_RISK_TODAY = "mid_depth_100_year00"
        self.COUNT_PROPERTIES_AT_RISK_30_YEARS = "mid_depth_100_year30"
        self.CLIP_PROPERTIES_COUNT = 250

        self.df_fsf_flood: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.flood_tract_url, destination=self.get_sources_path()
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        # read in the unzipped csv data source then rename the
        # Census Tract column for merging
        self.df_fsf_flood = pd.read_csv(
            self.flood_tract_source,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: str},
            low_memory=False,
        )

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Calculates share of properties at risk, left-clipping number of properties at 250
        """

        self.df_fsf_flood[self.GEOID_TRACT_FIELD_NAME] = self.df_fsf_flood[
            self.INPUT_GEOID_TRACT_FIELD_NAME
        ].str.zfill(11)

        self.df_fsf_flood[self.COUNT_PROPERTIES] = self.df_fsf_flood[
            self.COUNT_PROPERTIES_NATIVE_FIELD_NAME
        ].clip(lower=self.CLIP_PROPERTIES_COUNT)

        self.df_fsf_flood[
            self.SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_TODAY
        ] = (
            self.df_fsf_flood[self.COUNT_PROPERTIES_AT_RISK_TODAY]
            / self.df_fsf_flood[self.COUNT_PROPERTIES]
        )
        self.df_fsf_flood[
            self.SHARE_OF_PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS
        ] = (
            self.df_fsf_flood[self.COUNT_PROPERTIES_AT_RISK_30_YEARS]
            / self.df_fsf_flood[self.COUNT_PROPERTIES]
        )

        # Assign the final df to the class' output_df for the load method with rename
        self.output_df = self.df_fsf_flood.rename(
            columns={
                self.COUNT_PROPERTIES_AT_RISK_TODAY: self.PROPERTIES_AT_RISK_FROM_FLOODING_TODAY,
                self.COUNT_PROPERTIES_AT_RISK_30_YEARS: self.PROPERTIES_AT_RISK_FROM_FLOODING_IN_30_YEARS,
            }
        )
