from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import download_file_from_url, get_module_logger

logger = get_module_logger(__name__)


class CDCLifeExpectancy(ExtractTransformLoad):
    NAME = "cdc_life_expectancy"
    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT

    def __init__(self):
        self.FILE_URL: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/US_A.CSV"
        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "cdc_life_expectancy"
        )

        self.LIFE_EXPECTANCY_FIELD_NAME = "Life expectancy (years)"
        self._DOWNLOAD_FILE_LOCATION = self.get_tmp_path() / "US_A.CSV"

        # Constants for output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.LIFE_EXPECTANCY_FIELD_NAME,
        ]

        self.output_df: pd.DataFrame

    def extract(self) -> None:
        # Needs to be overridden because the data aren't zipped
        logger.info("Starting data download.")

        download_file_from_url(
            file_url=self.FILE_URL,
            download_file_name=self._DOWNLOAD_FILE_LOCATION,
            verify=True,
        )

    def transform(self) -> None:
        logger.info("Starting DOE energy burden transform.")

        raw_df = pd.read_csv(
            filepath_or_buffer=self._DOWNLOAD_FILE_LOCATION,
            dtype={
                # The following need to remain as strings for all of their digits, not get converted to numbers.
                self.INPUT_GEOID_TRACT_FIELD_NAME: "string",
            },
            low_memory=False,
        )

        self.output_df = raw_df.rename(
            columns={
                "e(0)": self.LIFE_EXPECTANCY_FIELD_NAME,
                self.INPUT_GEOID_TRACT_FIELD_NAME: self.GEOID_TRACT_FIELD_NAME,
            }
        )

    def load(self) -> None:
        logger.info("Saving CDC Life Expectancy CSV")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
