from pathlib import Path
from typing import Optional

from data_pipeline.config import settings
from data_pipeline.utils import unzip_file_from_url, remove_all_from_dir


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

    DATA_PATH: Path = settings.APP_ROOT / "data"
    TMP_PATH: Path = DATA_PATH / "tmp"
    FILES_PATH: Path = settings.APP_ROOT / "files"
    GEOID_FIELD_NAME: str = "GEOID10"
    GEOID_TRACT_FIELD_NAME: str = "GEOID10_TRACT"
    # TODO: investigate. Census says there are only 217,740 CBGs in the US.
    EXPECTED_MAX_CENSUS_BLOCK_GROUPS: int = 220405

    def get_yaml_config(self) -> None:
        """Reads the YAML configuration file for the dataset and stores
        the properies in the instance (upcoming feature)"""

        pass

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
        """Extract the data from
        a remote source. By default it provides code to get the file from a source url,
        unzips it and stores it on an extract_path."""

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
