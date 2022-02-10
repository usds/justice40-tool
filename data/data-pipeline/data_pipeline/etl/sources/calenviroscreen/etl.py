import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class CalEnviroScreenETL(ExtractTransformLoad):
    def __init__(self):
        self.CALENVIROSCREEN_FTP_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/CalEnviroScreen_4.0_2021.zip"
        )
        self.CALENVIROSCREEN_CSV = (
            self.get_tmp_path() / "CalEnviroScreen_4.0_2021.csv"
        )
        self.CSV_PATH = self.DATA_PATH / "dataset" / "calenviroscreen4"

        # Definining some variable names
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

    def extract(self) -> None:
        logger.info("Downloading CalEnviroScreen Data")
        super().extract(
            self.CALENVIROSCREEN_FTP_URL,
            self.get_tmp_path(),
        )

    def transform(self) -> None:
        logger.info("Transforming CalEnviroScreen Data")

        # Data from https://calenviroscreen-oehha.hub.arcgis.com/#Data, specifically:
        # https://oehha.ca.gov/media/downloads/calenviroscreen/document/calenviroscreen40resultsdatadictionaryd12021.zip
        # Load comparison index (CalEnviroScreen 4)
        self.df = pd.read_csv(
            self.CALENVIROSCREEN_CSV, dtype={"Census Tract": "string"}
        )

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
        logger.info("Saving CalEnviroScreen CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "data06.csv", index=False)
