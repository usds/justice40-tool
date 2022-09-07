from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.score.constants import (
    TILES_ISLAND_AREA_FIPS_CODES,
    TILES_PUERTO_RICO_FIPS_CODE,
)
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger, download_file_from_url

logger = get_module_logger(__name__)


class CDCLifeExpectancy(ExtractTransformLoad):
    def __init__(self):
        self.USA_FILE_URL: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/US_A.CSV"

        # For some reason, LEEP does not include Maine or Wisconsin in its "All of
        # USA" file. Load these separately.
        self.WISCONSIN_FILE_URL: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/WI_A.CSV"
        self.MAINE_FILE_URL: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/ME_A.CSV"

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "cdc_life_expectancy"
        )

        self.TRACT_INPUT_COLUMN_NAME = "Tract ID"
        self.STATE_INPUT_COLUMN_NAME = "STATE2KX"
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

        all_usa_download_file_name = (
            self.get_tmp_path() / "cdc_life_expectancy" / "usa.csv"
        )
        download_file_from_url(
            file_url=self.USA_FILE_URL,
            download_file_name=all_usa_download_file_name,
            verify=True,
        )

        pandas_read_csv_dtype_settings = {
            # The following need to remain as strings for all of their digits, not get converted to numbers.
            self.TRACT_INPUT_COLUMN_NAME: "string",
            self.STATE_INPUT_COLUMN_NAME: "string",
        }

        all_usa_raw_df = pd.read_csv(
            filepath_or_buffer=all_usa_download_file_name,
            dtype=pandas_read_csv_dtype_settings,
            low_memory=False,
        )

        # Check which states are missing
        state_fips_codes = get_state_fips_codes(self.DATA_PATH)
        states_in_life_expectancy_usa_file = all_usa_raw_df[
            self.STATE_INPUT_COLUMN_NAME
        ].unique()

        expected_states_set = (
            set(state_fips_codes)
            # We don't expect LEEP to have data for island areas or Puerto Rico.
            - set(TILES_ISLAND_AREA_FIPS_CODES)
            - set(TILES_PUERTO_RICO_FIPS_CODE)
        )

        # Find which states are missing from the expected set.
        states_missing = sorted(
            list(expected_states_set - set(states_in_life_expectancy_usa_file))
        )

        if states_missing != ["23", "55"]:
            raise ValueError(
                "LEEP data has changed. The states missing from the data are "
                "no longer the same."
            )

        logger.info("Downloading data for Maine")
        maine_download_file_name = (
            self.get_tmp_path() / "cdc_life_expectancy" / "maine.csv"
        )
        download_file_from_url(
            file_url=self.MAINE_FILE_URL,
            download_file_name=maine_download_file_name,
            verify=True,
        )
        maine_raw_df = pd.read_csv(
            filepath_or_buffer=maine_download_file_name,
            dtype=pandas_read_csv_dtype_settings,
            low_memory=False,
        )

        logger.info("Downloading data for Wisconsin")
        wisconsin_download_file_name = (
            self.get_tmp_path() / "cdc_life_expectancy" / "wisconsin.csv"
        )
        download_file_from_url(
            file_url=self.WISCONSIN_FILE_URL,
            download_file_name=wisconsin_download_file_name,
            verify=True,
        )
        wisconsin_raw_df = pd.read_csv(
            filepath_or_buffer=wisconsin_download_file_name,
            dtype=pandas_read_csv_dtype_settings,
            low_memory=False,
        )

        combined_df = pd.concat(
            objs=[all_usa_raw_df, maine_raw_df, wisconsin_raw_df],
            ignore_index=True,
            verify_integrity=True,
            axis=0,
        )

        states_in_combined_df = combined_df[
            self.STATE_INPUT_COLUMN_NAME
        ].unique()

        # Find which states are missing from the combined df.
        states_missing = sorted(
            list(expected_states_set - set(states_in_combined_df))
        )

        if len(states_missing) != 0:
            raise ValueError(
                "The states missing from combined dataframe are "
                "no longer as expected."
            )

        # Save the updated version
        self.raw_df = combined_df

    def transform(self) -> None:
        logger.info("Starting CDC life expectancy transform.")

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
        
