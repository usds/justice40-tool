import enum
import pathlib
import typing
from pathlib import Path
from typing import Optional

import pandas as pd

from data_pipeline.config import settings
from data_pipeline.utils import (
    unzip_file_from_url,
    remove_all_from_dir,
    get_module_logger,
)

logger = get_module_logger(__name__)


class ValidGeoLevel(enum.Enum):
    """Enum used for indicating output data's geographic resolution."""

    CENSUS_TRACT = enum.auto()
    CENSUS_BLOCK_GROUP = enum.auto()


class ExtractTransformLoad:
    """
    A class used to instantiate an ETL object to retrieve and process data from
    datasets.

    Attributes:
        DATA_PATH (pathlib.Path): Local path where all data will be stored
        TMP_PATH (pathlib.Path): Local path where temporary data will be stored
        GEOID_FIELD_NAME (str): The common column name for a Census Block Group identifier
        GEOID_TRACT_FIELD_NAME (str): The common column name for a Census Tract identifier
    """

    APP_ROOT: Path = settings.APP_ROOT

    # Directories
    DATA_PATH: Path = APP_ROOT / "data"
    TMP_PATH: Path = DATA_PATH / "tmp"

    # Parameters
    GEOID_FIELD_NAME: str = "GEOID10"
    GEOID_TRACT_FIELD_NAME: str = "GEOID10_TRACT"

    # Parameters that will be changed by children of the class
    # NAME is used to create output path and populate logger info.
    NAME: str = None

    # LAST_UPDATED_YEAR is used to create output path.
    LAST_UPDATED_YEAR: int = None

    # SOURCE_URL is used to extract source data in extract().
    SOURCE_URL: str = None

    # GEO_LEVEL is used to identify whether output data is at the unit of the tract or
    # census block group.
    # TODO: add tests that enforce seeing the expected geographic identifier field
    #  in the output file based on this geography level.
    GEO_LEVEL: ValidGeoLevel = None

    # COLUMNS_TO_KEEP to used to identify which columns to keep in the output df.
    COLUMNS_TO_KEEP: typing.List[str] = None

    # TODO: investigate. Census says there are only 217,740 CBGs in the US. This might
    #  be from CBGs at different time periods.
    EXPECTED_MAX_CENSUS_BLOCK_GROUPS: int = 250000

    # TODO: investigate. Census says there are only 74,134 tracts in the US,
    #  Puerto Rico, and island areas. This might be from tracts at different time
    #  periods. https://github.com/usds/justice40-tool/issues/964
    EXPECTED_MAX_CENSUS_TRACTS: int = 74160

    output_df: pd.DataFrame = None

    def _get_output_file_path(self) -> pathlib.Path:
        """Generate the output file path."""
        if self.NAME is None:
            raise NotImplementedError(
                f"Child ETL class needs to specify `self.NAME` (currently "
                f"{self.NAME}) and `self.LAST_UPDATED_YEAR` (currently "
                f"{self.LAST_UPDATED_YEAR})."
            )

        output_file_path = (
            self.DATA_PATH
            / "dataset"
            / f"{self.NAME}_{self.LAST_UPDATED_YEAR}"
            / "usa.csv"
        )
        return output_file_path

    def extract(
        self,
        source_url: str = None,
        extract_path: Path = None,
        verify: Optional[bool] = True,
    ) -> None:
        """Extract the data from a remote source. By default it provides code
        to get the file from a source url, unzips it and stores it on an
        extract_path."""

        # this can be accessed via super().extract()
        if source_url and extract_path:
            unzip_file_from_url(
                file_url=source_url,
                download_path=self.TMP_PATH,
                unzipped_file_path=extract_path,
                verify=verify,
            )

    def transform(self) -> None:
        """Transform the data extracted into a format that can be consumed by the
        score generator"""

        raise NotImplementedError

    def load(self, float_format=None) -> None:
        """Saves the transformed data.

        Data is written in the specified local data folder or remote AWS S3 bucket.

        Uses the directory from `self.OUTPUT_DIR` and the file name from
        `self._get_output_file_path`.
        """
        logger.info(f"Saving `{self.NAME}` CSV")

        # write nationwide csv
        output_file_path = self._get_output_file_path()
        output_file_path.parent.mkdir(parents=True, exist_ok=True)

        if self.COLUMNS_TO_KEEP is None:
            raise NotImplementedError(
                "`self.COLUMNS_TO_KEEP` must be specified."
            )

        if self.output_df is None:
            raise NotImplementedError(
                "The `transform` step must set `self.output_df`."
            )

        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            output_file_path, index=False, float_format=float_format
        )
        logger.info(f"File written to `{output_file_path}`.")

    def cleanup(self) -> None:
        """Clears out any files stored in the TMP folder"""

        remove_all_from_dir(self.TMP_PATH)

    # TODO: Create tests
    def validate_output(self) -> None:
        """Checks that the output of the ETL process adheres to the contract
        expected by the score module

        Contract conditions:
        - Output is saved as usa.csv at the path specified by self.OUTPUT_PATH
        - The output csv has a column named GEOID10 which stores each of the
          Census block group FIPS codes in data/census/csv/usa.csv
        - The output csv has a column named GEOID10_TRACT which stores each of
          Census tract FIPS codes associated with each Census block group
        - The output csv has each of the columns expected by the score and the
          name and dtype of those columns match the format expected by score
        """
        # read in output file
        # and check that GEOID cols are present
        output_file_path = self._get_output_file_path()
        if not output_file_path.exists():
            raise ValueError(f"No file found at {output_file_path}")

        df_output = pd.read_csv(
            output_file_path,
            dtype={
                # Not all outputs will have both a Census Block Group ID and a
                # Tract ID, but these will be ignored if they're not present.
                self.GEOID_FIELD_NAME: "string",
                self.GEOID_TRACT_FIELD_NAME: "string",
            },
        )

        # check that the score columns are in the output
        for col in self.COLUMNS_TO_KEEP:
            assert col in df_output.columns, f"{col} is missing from output"
