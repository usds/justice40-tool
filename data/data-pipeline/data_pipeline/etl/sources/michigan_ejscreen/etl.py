import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class MichiganEnviroScreenETL(ExtractTransformLoad):
    """Michigan EJ Screen class that ingests dataset represented
    here: https://www.arcgis.com/apps/webappviewer/index.html?id=dc4f0647dda34959963488d3f519fd24
    This class ingests the data presented in "Assessing the State of Environmental
    Justice in Michigan." Please see the README in this module for further details.
    """

    def __init__(self):
        self.MICHIGAN_EJSCREEN_S3_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/michigan_ejscore_12212021.csv"
        )

        self.CSV_PATH = self.DATA_PATH / "dataset" / "michigan_ejscreen"
        self.MICHIGAN_EJSCREEN_PRIORITY_COMMUNITY_THRESHOLD: float = 0.75

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.MICHIGAN_EJSCREEN_SCORE_FIELD,
            field_names.MICHIGAN_EJSCREEN_PERCENTILE_FIELD,
            field_names.MICHIGAN_EJSCREEN_PRIORITY_COMMUNITY_FIELD,
        ]

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading Michigan EJSCREEN Data")
        self.df = pd.read_csv(
            filepath_or_buffer=self.MICHIGAN_EJSCREEN_S3_URL,
            dtype={"GEO_ID": "string"},
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Transforming Michigan EJSCREEN Data")

        self.df.rename(
            columns={
                "GEO_ID": self.GEOID_TRACT_FIELD_NAME,
                "EJ_Score_Cal_Min": field_names.MICHIGAN_EJSCREEN_SCORE_FIELD,
                "Pct_CalMin": field_names.MICHIGAN_EJSCREEN_PERCENTILE_FIELD,
            },
            inplace=True,
        )
        # Calculate the top quartile of prioritized communities
        # Please see pg. 104 - 109 from source:
        # pg. https://deepblue.lib.umich.edu/bitstream/handle/2027.42/149105/AssessingtheStateofEnvironmentalJusticeinMichigan_344.pdf
        self.df[field_names.MICHIGAN_EJSCREEN_PRIORITY_COMMUNITY_FIELD] = (
            self.df[field_names.MICHIGAN_EJSCREEN_PERCENTILE_FIELD]
            >= self.MICHIGAN_EJSCREEN_PRIORITY_COMMUNITY_THRESHOLD
        )

    def load(self) -> None:
        logger.info("Saving Michigan Environmental Screening Tool to CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            self.CSV_PATH / "michigan_ejscreen.csv", index=False
        )
