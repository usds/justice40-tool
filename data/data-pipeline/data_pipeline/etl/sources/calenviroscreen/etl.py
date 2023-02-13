import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class CalEnviroScreenETL(ExtractTransformLoad):
    """California environmental screen

    TODO: Need good description
    """

    def __init__(self):

        # fetch
        self.calenviroscreen_ftp_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/CalEnviroScreen_4.0_2021.zip"
        )

        # input
        self.calenviroscreen_source = (
            self.get_sources_path() / "CalEnviroScreen_4.0_2021.csv"
        )

        # output
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "calenviroscreen4"

        # Defining some variable names
        self.CALENVIROSCREEN_SCORE_FIELD_NAME = "calenviroscreen_score"
        self.CALENVIROSCREEN_PERCENTILE_FIELD_NAME = (
            "calenviroscreen_percentile"
        )
        self.CALENVIROSCREEN_PRIORITY_COMMUNITY_FIELD_NAME = (
            "calenviroscreen_priority_community"
        )

        # Choosing constants
        # None of these numbers are final, but just for the purposes of comparison.
        self.CALENVIROSCREEN_PRIORITY_COMMUNITY_THRESHOLD = 75

        self.df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.calenviroscreen_ftp_url,
                destination=self.get_sources_path(),
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df = pd.read_csv(
            self.calenviroscreen_source, dtype={"Census Tract": "string"}
        )

    def transform(self) -> None:
        # Data from https://calenviroscreen-oehha.hub.arcgis.com/#Data, specifically:
        # https://oehha.ca.gov/media/downloads/calenviroscreen/document/calenviroscreen40resultsdatadictionaryd12021.zip
        # Load comparison index (CalEnviroScreen 4)

        self.df.rename(
            columns={
                "Census Tract": self.GEOID_TRACT_FIELD_NAME,
                "DRAFT CES 4.0 Score": self.CALENVIROSCREEN_SCORE_FIELD_NAME,
                "DRAFT CES 4.0 Percentile": self.CALENVIROSCREEN_PERCENTILE_FIELD_NAME,
            },
            inplace=True,
        )

        # Add a leading "0" to the Census Tract to match our format in other data frames.
        self.df[self.GEOID_TRACT_FIELD_NAME] = (
            "0" + self.df[self.GEOID_TRACT_FIELD_NAME]
        )

        # Calculate the top K% of prioritized communities
        self.df[self.CALENVIROSCREEN_PRIORITY_COMMUNITY_FIELD_NAME] = (
            self.df[self.CALENVIROSCREEN_PERCENTILE_FIELD_NAME]
            >= self.CALENVIROSCREEN_PRIORITY_COMMUNITY_THRESHOLD
        )

    def load(self) -> None:
        # write nationwide csv
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.OUTPUT_PATH / "data06.csv", index=False)
