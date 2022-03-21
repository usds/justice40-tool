import enum
import pathlib
import typing
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

    APP_ROOT: pathlib.Path = settings.APP_ROOT

    # Directories
    DATA_PATH: pathlib.Path = APP_ROOT / "data"
    TMP_PATH: pathlib.Path = DATA_PATH / "tmp"
    CONTENT_CONFIG: pathlib.Path = APP_ROOT / "content" / "config"

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

    # Thirteen digits in a census block group ID.
    EXPECTED_CENSUS_BLOCK_GROUPS_CHARACTER_LENGTH: int = 13
    # TODO: investigate. Census says there are only 217,740 CBGs in the US. This might
    #  be from CBGs at different time periods.
    EXPECTED_MAX_CENSUS_BLOCK_GROUPS: int = 250000

    # Eleven digits in a census tract ID.
    EXPECTED_CENSUS_TRACTS_CHARACTER_LENGTH: int = 11
    # TODO: investigate. Census says there are only 74,134 tracts in the United States,
    #  Puerto Rico, and island areas. This might be from tracts at different time
    #  periods. https://github.com/usds/justice40-tool/issues/964
    EXPECTED_MAX_CENSUS_TRACTS: int = 74160

    output_df: pd.DataFrame = None

    # This is a classmethod so it can be used by `get_data_frame` without
    # needing to create an instance of the class. This is a use case in `etl_score`.
    @classmethod
    def _get_output_file_path(cls) -> pathlib.Path:
        """Generate the output file path."""
        if cls.NAME is None:
            raise NotImplementedError(
                f"Child ETL class needs to specify `cls.NAME` (currently "
                f"{cls.NAME}) and `cls.LAST_UPDATED_YEAR` (currently "
                f"{cls.LAST_UPDATED_YEAR})."
            )

        output_file_path = (
            cls.DATA_PATH
            / "dataset"
            / f"{cls.NAME}_{cls.LAST_UPDATED_YEAR}"
            / "usa.csv"
        )
        return output_file_path

    def get_tmp_path(self) -> pathlib.Path:
        """Returns the temporary path associated with this ETL class."""
        # Note: the temporary path will be defined on `init`, because it uses the class
        # of the instance which is often a child class.
        tmp_path = self.DATA_PATH / "tmp" / str(self.__class__.__name__)

        # Create directory if it doesn't exist
        tmp_path.mkdir(parents=True, exist_ok=True)

        return tmp_path

    def extract(
        self,
        source_url: str = None,
        extract_path: pathlib.Path = None,
        verify: Optional[bool] = True,
    ) -> None:
        """Extract the data from a remote source. By default it provides code
        to get the file from a source url, unzips it and stores it on an
        extract_path."""

        # this can be accessed via super().extract()
        if source_url and extract_path:
            unzip_file_from_url(
                file_url=source_url,
                download_path=self.get_tmp_path(),
                unzipped_file_path=extract_path,
                verify=verify,
            )

    def transform(self) -> None:
        """Transform the data extracted into a format that can be consumed by the
        score generator"""

        raise NotImplementedError

    def validate(self) -> None:
        """Validates the output.

        Runs after the `transform` step and before `load`.
        """
        # TODO: remove this once all ETL classes are converted to using the new
        #  base class parameters and patterns.
        if self.GEO_LEVEL is None:
            logger.info(
                "Skipping validation step for this class because it does not "
                "seem to be converted to new ETL class patterns."
            )
            return

        if self.COLUMNS_TO_KEEP is None:
            raise NotImplementedError(
                "`self.COLUMNS_TO_KEEP` must be specified."
            )

        if self.output_df is None:
            raise NotImplementedError(
                "The `transform` step must set `self.output_df`."
            )

        for column_to_keep in self.COLUMNS_TO_KEEP:
            if column_to_keep not in self.output_df.columns:
                raise ValueError(
                    f"Missing column: `{column_to_keep}` is missing from "
                    f"output"
                )

        for (
            geo_level,
            geo_field,
            expected_geo_field_characters,
            expected_rows,
        ) in [
            (
                ValidGeoLevel.CENSUS_TRACT,
                self.GEOID_TRACT_FIELD_NAME,
                self.EXPECTED_CENSUS_TRACTS_CHARACTER_LENGTH,
                self.EXPECTED_MAX_CENSUS_TRACTS,
            ),
            (
                ValidGeoLevel.CENSUS_BLOCK_GROUP,
                self.GEOID_FIELD_NAME,
                self.EXPECTED_CENSUS_BLOCK_GROUPS_CHARACTER_LENGTH,
                self.EXPECTED_MAX_CENSUS_BLOCK_GROUPS,
            ),
        ]:
            if self.GEO_LEVEL is geo_level:
                if geo_field not in self.COLUMNS_TO_KEEP:
                    raise ValueError(
                        f"Must have `{geo_field}` in columns if "
                        f"specifying geo level as `{geo_level} "
                    )
                if self.output_df.shape[0] > expected_rows:
                    raise ValueError(
                        f"Too many rows: `{self.output_df.shape[0]}` rows in "
                        f"output exceeds expectation of `{expected_rows}` "
                        f"rows."
                    )

                if self.output_df[geo_field].str.len().nunique() > 1:
                    raise ValueError(
                        f"Multiple character lengths for geo field "
                        f"present: {self.output_df[geo_field].str.len().unique()}."
                    )

                elif (
                    len(self.output_df[geo_field].array[0])
                    != expected_geo_field_characters
                ):
                    raise ValueError(
                        "Wrong character length: the census geography data "
                        "has the wrong length."
                    )

                duplicate_geo_field_values = (
                    self.output_df[geo_field].shape[0]
                    - self.output_df[geo_field].nunique()
                )
                if duplicate_geo_field_values > 0:
                    raise ValueError(
                        f"Duplicate values: There are {duplicate_geo_field_values} "
                        f"duplicate values in "
                        f"`{geo_field}`."
                    )

    def load(self, float_format=None) -> None:
        """Saves the transformed data.

        Data is written in the specified local data folder or remote AWS S3 bucket.

        Uses the directory from `self.OUTPUT_DIR` and the file name from
        `self._get_output_file_path`.
        """
        logger.info(f"Saving `{self.NAME}` CSV")

        # Create directory if necessary.
        output_file_path = self._get_output_file_path()
        output_file_path.parent.mkdir(parents=True, exist_ok=True)

        # Write nationwide csv
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            output_file_path, index=False, float_format=float_format
        )

        logger.info(f"File written to `{output_file_path}`.")

    # This is a classmethod so it can be used without needing to create an instance of
    # the class. This is a use case in `etl_score`.
    @classmethod
    def get_data_frame(cls) -> pd.DataFrame:
        """Return the output data frame for this class.

        Must be run after a full ETL process has been run for this class.

        If the ETL has been not run for this class, this will error.
        """
        # Read in output file
        output_file_path = cls._get_output_file_path()
        if not output_file_path.exists():
            raise ValueError(
                f"Make sure to run ETL process first for `{cls}`. "
                f"No file found at `{output_file_path}`."
            )

        output_df = pd.read_csv(
            output_file_path,
            dtype={
                # Not all outputs will have both a Census Block Group ID and a
                # Tract ID, but these will be ignored if they're not present.
                cls.GEOID_FIELD_NAME: "string",
                cls.GEOID_TRACT_FIELD_NAME: "string",
            },
        )

        return output_df

    def cleanup(self) -> None:
        """Clears out any files stored in the TMP folder"""
        remove_all_from_dir(self.get_tmp_path())
