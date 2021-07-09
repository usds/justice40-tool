from pathlib import Path
import pathlib

from config import settings
from utils import unzip_file_from_url, remove_all_from_dir


class ExtractTransformLoad(object):
    """
    A class used to instantiate an ETL object to retrieve and process data from
    datasets.

    Attributes:
        DATA_PATH (pathlib.Path): Local path where all data will be stored
        TMP_PATH (pathlib.Path): Local path where temporary data will be stored
        GEOID_FIELD_NAME (str): The common column name for a Census Block Group identifier
        GEOID_TRACT_FIELD_NAME (str): The common column name for a Census Tract identifier

    Methods:
        get_yaml_config() -> None: Reads the YAML configuration file for the dataset and stores
        the properies in the instance (upcoming feature)
        check_ttl() -> None: Checks if the ETL process can be run based on a the TLL value on the
        YAML config (upcoming feature)
        extract(source_url: str|None, extract_path: pathlib.Path|None) -> None: Extract the data from
        a remote source. By default it provides code to get the file from a source url, unzips it and stores
        it on an extract_path.
        transform() -> None: Transform the data extracted into a format that can be consumed by the
        score generator
        load() -> None: Saves the transformed data in the specified local data folder or remote AWS S3
        bucket
        cleanup() -> None: Clears out any files stored in the TMP folder

    """

    DATA_PATH: Path = settings.APP_ROOT / "data"
    TMP_PATH: Path = DATA_PATH / "tmp"
    GEOID_FIELD_NAME: str = "GEOID10"
    GEOID_TRACT_FIELD_NAME: str = "GEOID10_TRACT"

    def get_yaml_config(self) -> None:
        pass

    def check_ttl(self) -> None:
        # check if the data set has to go through the ETL based on last run
        pass

    def extract(
        self, source_url: str = None, extract_path: Path = None
    ) -> None:
        # this can be accessed via super().extract()
        if source_url and extract_path:
            unzip_file_from_url(source_url, self.TMP_PATH, extract_path)

    def transform(self) -> None:
        raise NotImplementedError

    def load(self) -> None:
        raise NotImplementedError

    def cleanup(self) -> None:
        # cleanup
        remove_all_from_dir(self.TMP_PATH)
