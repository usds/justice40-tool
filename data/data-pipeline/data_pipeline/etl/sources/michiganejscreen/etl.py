import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class MichiganEnviroScreenETL(ExtractTransformLoad):
    def __init__(self):
        self.MIEJSCREEN_S3_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/michigan.csv"
        )
        self.MIEJSCREEN_CSV = (
            self.TMP_PATH / "CalEnviroScreen_4.0_2021.csv"
        )
        self.CSV_PATH = self.DATA_PATH / "dataset" / "michiganejscreen"

        # Definining some variable names
        self.MIEJSCREEN_SCORE_FIELD_NAME = "michiganejscreen_score"
        self.MIEJSCREEN_PERCENTILE_FIELD_NAME = (
            "michiganejscreen_percentile"
        )
        self.MIEJSCREEN_PRIORITY_COMMUNITY_FIELD_NAME = (
            "michiganejscreen_priority_community"
        )

        
        self.MIEJSCREEN_PRIORITY_COMMUNITY_THRESHOLD = 75

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading CalEnviroScreen Data")
        super().extract(
            self.CALENVIROSCREEN_S3_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        logger.info("Transforming CalEnviroScreen Data")


        self.df = pd.read_csv(
            self.MIEJSCREEN_CSV, dtype={"GEO_ID": "string"}
        )

        self.df.rename(
            columns={
                "GEO_ID": self.GEOID_TRACT_FIELD_NAME,
                "EJ_Score_Cal_Min": self.CALENVIROSCREEN_SCORE_FIELD_NAME,
                "Pct_CalMin": self.CALENVIROSCREEN_PERCENTILE_FIELD_NAME,
            },
            inplace=True,
        )


        # Calculate the top quartile of prioritized communities
        # Please see pg. 104 - 109 from source:
        # pg. https://deepblue.lib.umich.edu/bitstream/handle/2027.42/149105/AssessingtheStateofEnvironmentalJusticeinMichigan_344.pdf
        self.df[self.MIEJSCREEN_PRIORITY_COMMUNITY_FIELD_NAME] = (
            self.df[self.MIEJSCREEN_PERCENTILE_FIELD_NAME]
            >= self.MIEJSCREEN_PRIORITY_COMMUNITY_THRESHOLD
        )

    def load(self) -> None:
        logger.info("Saving Michigan Environmental Screening Tool to CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "michiganejscreen.csv", index=False)
