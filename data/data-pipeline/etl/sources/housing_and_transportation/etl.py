import pandas as pd

from etl.base import ExtractTransformLoad
from etl.sources.census.etl_utils import get_state_fips_codes
from utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class HousingTransportationETL(ExtractTransformLoad):
    def __init__(self):
        self.HOUSING_FTP_URL = (
            "https://htaindex.cnt.org/download/download.php?focus=blkgrp&geoid="
        )
        self.OUTPUT_PATH = (
            self.DATA_PATH / "dataset" / "housing_and_transportation_index"
        )
        self.df: pd.DataFrame

    def extract(self) -> None:
        # Download each state / territory individually
        dfs = []
        zip_file_dir = self.TMP_PATH / "housing_and_transportation_index"
        for fips in get_state_fips_codes(self.DATA_PATH):
            logger.info(
                f"Downloading housing data for state/territory with FIPS code {fips}"
            )
            unzip_file_from_url(
                f"{self.HOUSING_FTP_URL}{fips}", self.TMP_PATH, zip_file_dir
            )

            # New file name:
            tmp_csv_file_path = zip_file_dir / f"htaindex_data_blkgrps_{fips}.csv"
            tmp_df = pd.read_csv(filepath_or_buffer=tmp_csv_file_path)

            dfs.append(tmp_df)

        self.df = pd.concat(dfs)

        self.df.head()

    def transform(self) -> None:
        logger.info(f"Transforming Housing and Transportation Data")

        # Rename and reformat block group ID
        self.df.rename(columns={"blkgrp": self.GEOID_FIELD_NAME}, inplace=True)
        self.df[self.GEOID_FIELD_NAME] = self.df[self.GEOID_FIELD_NAME].str.replace(
            '"', ""
        )

    def load(self) -> None:
        logger.info(f"Saving Housing and Transportation Data")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
