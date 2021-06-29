import pandas as pd
import censusdata

from etl.base import ExtractTransformLoad
from etl.sources.census.etl_utils import get_state_fips_codes
from utils import get_module_logger, unzip_file_from_url, remove_all_from_dir

logger = get_module_logger(__name__)


class EJScreenETL(ExtractTransformLoad):
    def __init__(self):
        self.EJSCREEN_FTP_URL = (
            "https://gaftp.epa.gov/EJSCREEN/2020/EJSCREEN_2020_StatePctile.csv.zip"
        )
        self.EJSCREEN_CSV = self.TMP_PATH / "EJSCREEN_2020_StatePctile.csv"
        self.CSV_PATH = self.DATA_PATH / "dataset" / "ejscreen_2020"
        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info(f"Downloading EJScreen Data")
        super().extract(
            self.EJSCREEN_FTP_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        logger.info(f"Transforming EJScreen Data")
        self.df = pd.read_csv(
            self.EJSCREEN_CSV,
            dtype={"ID": "string"},
            # EJSCREEN writes the word "None" for NA data.
            na_values=["None"],
            low_memory=False,
        )

    def load(self) -> None:
        logger.info(f"Saving EJScreen CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / f"usa.csv", index=False)
