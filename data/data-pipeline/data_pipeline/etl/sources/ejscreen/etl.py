import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class EJSCREENETL(ExtractTransformLoad):
    def __init__(self):
        self.EJSCREEN_FTP_URL = "https://edap-arcgiscloud-data-commons.s3.amazonaws.com/EJSCREEN2020/EJSCREEN_Tract_2020_USPR.csv.zip"
        self.EJSCREEN_CSV = self.TMP_PATH / "EJSCREEN_Tract_2020_USPR.csv"
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

        # rename ID to Tract ID
        self.df.rename(
            columns={
                "ID": self.GEOID_TRACT_FIELD_NAME,
            },
            inplace=True,
        )

    def load(self) -> None:
        logger.info("Saving EJScreen CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "usa.csv", index=False)
