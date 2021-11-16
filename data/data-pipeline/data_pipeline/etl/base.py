from pathlib import Path
from typing import Optional

import pandas as pd
import yaml

from data_pipeline.config import settings
from data_pipeline.utils import (
    unzip_file_from_url,
    remove_all_from_dir,
    get_module_logger,
)

logger = get_module_logger(__name__)


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
    DATA_PATH: Path = APP_ROOT / "data"
    TMP_PATH: Path = DATA_PATH / "tmp"
    FILES_PATH: Path = settings.APP_ROOT / "files"
    GEOID_FIELD_NAME: str = "GEOID10"
    GEOID_TRACT_FIELD_NAME: str = "GEOID10_TRACT"
    # TODO: investigate. Census says there are only 217,740 CBGs in the US. This might be from CBGs at different time periods.
    EXPECTED_MAX_CENSUS_BLOCK_GROUPS: int = 250000
    EXPECTED_MAX_CENSUS_TRACTS: int = 73076

    def __init__(self, config_path: Path) -> None:
        """Inits the class with instance specific variables"""

        # set by _get_yaml_config()
        self.NAME: str = None
        self.SOURCE_URL: str = None
        self.GEOID_COL: str = None
        self.GEO_LEVEL: str = None
        self.SCORE_COLS: list = None
        self.FIPS_CODES: pd.DataFrame = None
        self.OUTPUT_PATH: Path = None
        self.CENSUS_CSV: Path = None

        self._get_yaml_config(config_path)

    def _get_yaml_config(self, config_path: Path) -> None:
        """Reads the YAML configuration file for the dataset and stores
        the properies in the instance (upcoming feature)"""
        # parse the yaml config file
        try:
            with open(config_path, "r", encoding="utf-8") as file:
                config = yaml.safe_load(file)
        except (FileNotFoundError, yaml.YAMLError) as err:
            raise err

        # set dataset specific attributes
        census_dir = self.DATA_PATH / "census" / "csv"
        if config["is_census"]:
            csv_dir = census_dir
        else:
            self.CENSUS_CSV = census_dir / "us.csv"
            self.FIPS_CODES = self._get_census_fips_codes()
            csv_dir = self.DATA_PATH / "dataset"

        # parse name and set output path
        name = config.get("name")
        snake_name = name.replace(" ", "_").lower()  # converts to snake case
        output_dir = snake_name + (config.get("year") or "")
        self.OUTPUT_PATH = csv_dir / output_dir / "usa.csv"
        self.OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

        # set class attributes
        attrs = ["NAME", "SOURCE_URL", "GEOID_COL", "GEO_LEVEL", "SCORE_COLS"]
        for attr in attrs:
            setattr(self, attr, config[attr.lower()])

    def check_ttl(self) -> None:
        """Checks if the ETL process can be run based on a the TLL value on the
        YAML config (upcoming feature)"""

        pass

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
                source_url, self.TMP_PATH, extract_path, verify=verify
            )

    def transform(self) -> None:
        """Transform the data extracted into a format that can be consumed by the
        score generator"""

        raise NotImplementedError

    def load(self) -> None:
        """Saves the transformed data in the specified local data folder or remote AWS S3
        bucket"""

        raise NotImplementedError

    def cleanup(self) -> None:
        """Clears out any files stored in the TMP folder"""

        remove_all_from_dir(self.TMP_PATH)

    # TODO: Add test for this
    def _get_census_fips_codes(self) -> pd.DataFrame:
        """Loads FIPS codes for each Census block group and tract"""

        # check that the census data exists
        if not self.CENSUS_CSV.exists():
            logger.info("Census data not found, please run download_csv first")
        # load the census data
        df = pd.read_csv(
            self.CENSUS_CSV, dtype={self.GEOID_FIELD_NAME: "string"}
        )
        # extract Census tract FIPS code from Census block group
        df[self.GEOID_TRACT_FIELD_NAME] = df[self.GEOID_FIELD_NAME].str[0:11]
        return df[[self.GEOID_FIELD_NAME, self.GEOID_TRACT_FIELD_NAME]]

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
        assert self.OUTPUT_PATH.exists(), f"No file found at {self.OUTPUT_PATH}"
        df_output = pd.read_csv(
            self.OUTPUT_PATH,
            dtype={
                self.GEOID_FIELD_NAME: "string",
                self.GEOID_TRACT_FIELD_NAME: "string",
            },
        )

        # check that the GEOID cols in the output match census data
        geoid_cols = [self.GEOID_FIELD_NAME, self.GEOID_TRACT_FIELD_NAME]
        for col in geoid_cols:
            assert col in self.FIPS_CODES.columns
        assert self.FIPS_CODES.equals(df_output[geoid_cols])

        # check that the score columns are in the output
        for col in self.SCORE_COLS:
            assert col in df_output.columns, f"{col} is missing from output"
