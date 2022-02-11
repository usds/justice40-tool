from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, download_file_from_url

logger = get_module_logger(__name__)


class CDCLifeExpectancy(ExtractTransformLoad):
    def __init__(self):
        self.FILE_URL: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/US_A.CSV"
        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "cdc_life_expectancy"
        )

        self.TRACT_INPUT_COLUMN_NAME = "Tract ID"
        self.LIFE_EXPECTANCY_FIELD_NAME = "Life expectancy (years)"

        # Constants for output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.LIFE_EXPECTANCY_FIELD_NAME,
        ]

        self.raw_df: pd.DataFrame
        self.output_df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting data download.")

        download_file_name = (
            self.get_tmp_path() / "cdc_life_expectancy" / "usa.csv"
        )
        download_file_from_url(
            file_url=self.FILE_URL,
            download_file_name=download_file_name,
            verify=True,
        )

        self.raw_df = pd.read_csv(
            filepath_or_buffer=download_file_name,
            dtype={
                # The following need to remain as strings for all of their digits, not get converted to numbers.
                self.TRACT_INPUT_COLUMN_NAME: "string",
            },
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Starting DOE energy burden transform.")

        self.output_df = self.raw_df.rename(
            columns={
                "e(0)": self.LIFE_EXPECTANCY_FIELD_NAME,
                self.TRACT_INPUT_COLUMN_NAME: self.GEOID_TRACT_FIELD_NAME,
            }
        )

    def load(self) -> None:
        logger.info("Saving CDC Life Expectancy CSV")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
