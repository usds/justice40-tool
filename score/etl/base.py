from pathlib import Path

from config import settings
from utils import unzip_file_from_url, remove_all_from_dir


class ExtractTransformLoad(object):
    DATA_PATH = settings.APP_ROOT / "data"
    TMP_PATH = DATA_PATH / "tmp"

    # constants
    GEOID_FIELD_NAME = "GEOID10"
    GEOID_TRACT_FIELD_NAME = "GEOID10_TRACT"

    def get_yaml_config(self) -> None:
        pass

    def check_ttl(self) -> None:
        # check if the data set has to go through the ETL based on last run
        pass

    def extract(self, source_url: str = None, extract_path: Path = None) -> None:
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
