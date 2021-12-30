import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class MichiganEnviroScreenETL(ExtractTransformLoad):
    """
    Michigan EJ Screen class that ingests dataset represented
    here: https://www.arcgis.com/apps/webappviewer/index.html?id=dc4f0647dda34959963488d3f519fd24
    """

    def __init__(self):
        self.MI_EJSCREEN_S3_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/michigan_ejscore_12212021.csv"
        )

        self.CSV_PATH = self.DATA_PATH / "dataset" / "michigan_ejscreen"

        # Definining some variable names
        self.MI_EJSCREEN_SCORE_FIELD = "michigan_ejscreen_score"
        self.MI_EJSCREEN_PERCENTILE_FIELD = "michigan_ejscreen_percentile"
        self.MI_EJSCREEN_PRIORITY_COMMUNITY_FIELD = (
            "michigan_ejscreen_priority_community"
        )

        self.MI_EJSCREEN_PRIORITY_COMMUNITY_THRESHOLD = 0.75

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading Michigan EJSCREEN Data")
        self.df = pd.read_csv(
            filepath_or_buffer=self.MI_EJSCREEN_S3_URL,
            dtype={"GEO_ID": "string"},
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Transforming Michigan EJSCREEN Data")

        self.df.rename(
            #
            columns={
                "GEO_ID": self.GEOID_TRACT_FIELD_NAME,
                "EJ_Score_Cal_Min": self.MI_EJSCREEN_SCORE_FIELD,
                "Pct_CalMin": self.MI_EJSCREEN_PERCENTILE_FIELD,
            },
            inplace=True,
        )
        # Calculate the top quartile of prioritized communities
        # Please see pg. 104 - 109 from source:
        # pg. https://deepblue.lib.umich.edu/bitstream/handle/2027.42/149105/AssessingtheStateofEnvironmentalJusticeinMichigan_344.pdf
        self.df[self.MI_EJSCREEN_PRIORITY_COMMUNITY_FIELD] = (
            self.df[self.MI_EJSCREEN_PERCENTILE_FIELD]
            >= self.MI_EJSCREEN_PRIORITY_COMMUNITY_THRESHOLD
        )

    def load(self) -> None:
        logger.info("Saving Michigan Environmental Screening Tool to CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "michiganejscreen.csv", index=False)
