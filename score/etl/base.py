from pathlib import Path

from config import settings
from utils import unzip_file_from_url


class ExtractTransformLoad:
    DATA_PATH = settings.APP_ROOT / "data"
    TMP_PATH = DATA_PATH / "tmp"

    def get_yaml_config(self):
        pass

    def check_ttl(self):
        # check if the data set has to go through the ETL based on last run
        pass

    def extract(self, source_url: str = None, extract_path: Path = None):
        if source_url and extract_path:
            unzip_file_from_url(source_url, self.TMP_PATH, extract_path)

    def transform(self):
        pass

    def load(self):
        pass
