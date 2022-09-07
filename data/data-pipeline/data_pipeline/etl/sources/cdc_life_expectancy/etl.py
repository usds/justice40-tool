from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.etl.score.etl_utils import (
    compare_to_list_of_expected_state_fips_codes,
)
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger, download_file_from_url

logger = get_module_logger(__name__)


class CDCLifeExpectancy(ExtractTransformLoad):
    def __init__(self):
        self.GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
        self.PUERTO_RICO_EXPECTED_IN_DATA = False

        self.USA_FILE_URL: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/US_A.CSV"

        self.STATES_MISSING_FROM_USA_FILE = ["23", "55"]

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
        states_in_life_expectancy_usa_file = list(
            all_usa_raw_df[self.STATE_INPUT_COLUMN_NAME].unique()
        )

        # Expect that PR, Island Areas, and Maine/Wisconsin are missing
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=states_in_life_expectancy_usa_file,
            nation_expected=self.NATION_EXPECTED_IN_DATA,
            puerto_rico_expected=self.PUERTO_RICO_EXPECTED_IN_DATA,
            island_areas_expected=self.ISLAND_AREAS_EXPECTED_IN_DATA,
            additional_fips_codes_not_expected=self.STATES_MISSING_FROM_USA_FILE,
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

        states_in_combined_df = list(
            combined_df[self.STATE_INPUT_COLUMN_NAME].unique()
        )

        # Expect that PR and Island Areas are the only things now missing
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=states_in_combined_df,
            nation_expected=self.NATION_EXPECTED_IN_DATA,
            puerto_rico_expected=self.PUERTO_RICO_EXPECTED_IN_DATA,
            island_areas_expected=self.ISLAND_AREAS_EXPECTED_IN_DATA,
            additional_fips_codes_not_expected=[],
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
