import pathlib
from pathlib import Path

import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.etl.score.etl_utils import (
    compare_to_list_of_expected_state_fips_codes,
)
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import FileDataSource
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings


logger = get_module_logger(__name__)


class CDCLifeExpectancy(ExtractTransformLoad):
    """#TODO: create description"""

    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False

    NAME = "cdc_life_expectancy"

    LOAD_YAML_CONFIG: bool = False
    LIFE_EXPECTANCY_FIELD_NAME = "Life expectancy (years)"
    INPUT_GEOID_TRACT_FIELD_NAME = "Tract ID"

    STATES_MISSING_FROM_USA_FILE = ["23", "55"]

    TRACT_INPUT_COLUMN_NAME = "Tract ID"
    STATE_INPUT_COLUMN_NAME = "STATE2KX"

    raw_df: pd.DataFrame  # result of extraction
    output_df: pd.DataFrame  # result of transformation

    def __init__(self):

        # fetch
        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            self.usa_file_url = f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/cdc_file_expectancy/US_A.CSV"
        else:
            self.usa_file_url: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/US_A.CSV"

        # For some reason, LEEP does not include Maine or Wisconsin in its "All of USA" file. Load these separately.
        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            self.wisconsin_file_url: str = f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/cdc_file_expectancy/WI_A.CSV"
            self.maine_file_url: str = f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/cdc_file_expectancy/ME_A.CSV"
        else:
            self.wisconsin_file_url: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/WI_A.CSV"
            self.maine_file_url: str = "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/NVSS/USALEEP/CSV/ME_A.CSV"

        # input
        self.usa_source = self.get_sources_path() / "US_A.CSV"
        self.maine_source = self.get_sources_path() / "ME_A.CSV"
        self.wisconsin_source = self.get_sources_path() / "WI_A.CSV"

        # output
        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "cdc_life_expectancy"
        )

        self.COLUMNS_TO_KEEP = [  # the columns to save on output
            self.GEOID_TRACT_FIELD_NAME,
            field_names.LIFE_EXPECTANCY_FIELD,
        ]

    def get_data_sources(self) -> [DataSource]:
        return [
            FileDataSource(
                source=self.usa_file_url, destination=self.usa_source
            ),
            FileDataSource(
                source=self.maine_file_url, destination=self.maine_source
            ),
            FileDataSource(
                source=self.wisconsin_file_url,
                destination=self.wisconsin_source,
            ),
        ]

    def _read_data(self, file_name: pathlib.Path) -> pd.DataFrame:

        df = pd.read_csv(
            filepath_or_buffer=file_name,
            dtype={
                # The following need to remain as strings for all of their digits, not get converted to numbers.
                self.TRACT_INPUT_COLUMN_NAME: "string",
                self.STATE_INPUT_COLUMN_NAME: "string",
            },
            low_memory=False,
        )

        return df

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        all_usa_raw_df = self._read_data(self.usa_source)

        # Check which states are missing
        states_in_life_expectancy_usa_file = list(
            all_usa_raw_df[self.STATE_INPUT_COLUMN_NAME].unique()
        )

        # Expect that PR, Island Areas, and Maine/Wisconsin are missing
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=states_in_life_expectancy_usa_file,
            continental_us_expected=self.CONTINENTAL_US_EXPECTED_IN_DATA,
            puerto_rico_expected=self.PUERTO_RICO_EXPECTED_IN_DATA,
            island_areas_expected=self.ISLAND_AREAS_EXPECTED_IN_DATA,
            additional_fips_codes_not_expected=self.STATES_MISSING_FROM_USA_FILE,
        )

        maine_raw_df = self._read_data(
            self.maine_source,
        )

        wisconsin_raw_df = self._read_data(self.wisconsin_source)

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
            continental_us_expected=self.CONTINENTAL_US_EXPECTED_IN_DATA,
            puerto_rico_expected=self.PUERTO_RICO_EXPECTED_IN_DATA,
            island_areas_expected=self.ISLAND_AREAS_EXPECTED_IN_DATA,
            additional_fips_codes_not_expected=[],
        )

        # Save the updated version
        self.raw_df = combined_df

    def transform(self) -> None:

        self.output_df = self.raw_df.rename(
            columns={
                "e(0)": field_names.LIFE_EXPECTANCY_FIELD,
                self.TRACT_INPUT_COLUMN_NAME: self.GEOID_TRACT_FIELD_NAME,
            }
        )

    def load(self) -> None:

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
