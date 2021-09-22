import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class EJScreenAreasOfConcernETL(ExtractTransformLoad):
    def __init__(self):
        # self.EJSCREEN_FTP_URL = "https://gaftp.epa.gov/EJSCREEN/2019/EJSCREEN_2019_StatePctile.csv.zip"
        # self.EJSCREEN_CSV = self.TMP_PATH / "EJSCREEN_2019_StatePctiles.csv"
        self.CSV_PATH = self.DATA_PATH / "dataset" / "ejscreen_2019"
        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading EJScreen Data")
        super().extract(
            self.EJSCREEN_FTP_URL,
            self.TMP_PATH,
            verify=False,  # EPA EJScreen end point has certificate issues often
        )

    def transform(self) -> None:
        logger.info("Transforming EJScreen Data")
        self.df = pd.read_csv(
            self.EJSCREEN_CSV,
            dtype={"ID": "string"},
            # EJSCREEN writes the word "None" for NA data.
            na_values=["None"],
            low_memory=False,
        )

    def load(self) -> None:
        logger.info("Saving EJScreen CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "usa.csv", index=False)
