import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class NationalRiskIndexETL(ExtractTransformLoad):
    def __init__(self):
        self.NRI_FTP_URL = (
            "https://nri-data-downloads.s3.amazonaws.com/NRI_Table_CensusTracts.zip"
        )
        self.INPUT_CSV = self.TMP_PATH / "NRI_Table_CensusTracts.csv"
        self.OUTPUT_DIR = self.DATA_PATH / "dataset" / "national_risk_index_2020"
        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading National Risk Index Data")
        super().extract(
            self.NRI_FTP_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        logger.info("Transforming National Risk Index Data")
        self.df = pd.read_csv(
            self.INPUT_CSV,
            dtype={"TRACTFIPS": "string"},
            na_values=["None"],
            low_memory=False,
        )

    def load(self) -> None:
        logger.info("Saving National Risk Index CSV")
        # write nationwide csv
        self.OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.OUTPUT_DIR / "usa.csv", index=False)
