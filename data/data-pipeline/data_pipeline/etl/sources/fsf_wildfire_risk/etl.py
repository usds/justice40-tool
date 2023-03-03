# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation
import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class WildfireRiskETL(ExtractTransformLoad):
    """ETL class for the First Street Foundation wildfire risk dataset"""

    NAME = "fsf_wildfire_risk"
    # These data were emailed to the J40 team while first street got
    # their official data sharing channels setup.

    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False
    LOAD_YAML_CONFIG: bool = True
    ALASKA_AND_HAWAII_EXPECTED_IN_DATA = False

    # Output score variables (values set on datasets.yml) for linting purposes
    COUNT_PROPERTIES: str
    PROPERTIES_AT_RISK_FROM_FIRE_TODAY: str
    PROPERTIES_AT_RISK_FROM_FIRE_IN_30_YEARS: str
    SHARE_OF_PROPERTIES_AT_RISK_FROM_FIRE_TODAY: str
    SHARE_OF_PROPERTIES_AT_RISK_FROM_FIRE_IN_30_YEARS: str

    def __init__(self):

        # fetch
        self.fsf_fire_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/fsf_fire.zip"
        )

        # input
        self.fsf_fire_source = (
            self.get_sources_path() / "fsf_fire" / "fire-tract2010.csv"
        )

        # output
        # this is the main dataframe
        self.df: pd.DataFrame

        self.df_fsf_fire: pd.DataFrame

        # Start dataset-specific vars here
        self.COUNT_PROPERTIES_NATIVE_FIELD_NAME = "count_properties"
        self.COUNT_PROPERTIES_AT_RISK_TODAY = "burnprob_year00_flag"
        self.COUNT_PROPERTIES_AT_RISK_30_YEARS = "burnprob_year30_flag"
        self.CLIP_PROPERTIES_COUNT = 250

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.fsf_fire_url, destination=self.get_sources_path()
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df_fsf_fire = pd.read_csv(
            self.fsf_fire_source,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: str},
            low_memory=False,
        )

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Calculates share of properties at risk, left-clipping number of properties at 250
        """
        # read in the unzipped csv data source then rename the
        # Census Tract column for merging

        self.df_fsf_fire[self.GEOID_TRACT_FIELD_NAME] = self.df_fsf_fire[
            self.INPUT_GEOID_TRACT_FIELD_NAME
        ].str.zfill(11)

        self.df_fsf_fire[self.COUNT_PROPERTIES] = self.df_fsf_fire[
            self.COUNT_PROPERTIES_NATIVE_FIELD_NAME
        ].clip(lower=self.CLIP_PROPERTIES_COUNT)

        self.df_fsf_fire[self.SHARE_OF_PROPERTIES_AT_RISK_FROM_FIRE_TODAY] = (
            self.df_fsf_fire[self.COUNT_PROPERTIES_AT_RISK_TODAY]
            / self.df_fsf_fire[self.COUNT_PROPERTIES]
        )
        self.df_fsf_fire[
            self.SHARE_OF_PROPERTIES_AT_RISK_FROM_FIRE_IN_30_YEARS
        ] = (
            self.df_fsf_fire[self.COUNT_PROPERTIES_AT_RISK_30_YEARS]
            / self.df_fsf_fire[self.COUNT_PROPERTIES]
        )

        # Assign the final df to the class' output_df for the load method with rename
        self.output_df = self.df_fsf_fire.rename(
            columns={
                self.COUNT_PROPERTIES_AT_RISK_TODAY: self.PROPERTIES_AT_RISK_FROM_FIRE_TODAY,
                self.COUNT_PROPERTIES_AT_RISK_30_YEARS: self.PROPERTIES_AT_RISK_FROM_FIRE_IN_30_YEARS,
            }
        )
