from pathlib import Path

from config import settings
from utils import unzip_file_from_url


class ExtractTransformLoad:
    def __init__(self):
        self.DATA_PATH = settings.APP_ROOT / "data"
        self.TMP_PATH = self.DATA_PATH / "tmp"

    def get_yaml_config(self):
        pass

    @staticmethod
    def check_ttl(self):
        # check if the data set has to go through the ETL based on last run
        pass

    @staticmethod
    def extract(source_url: str = None, extract_path: Path = None):
        if source_url and extract_path:
            unzip_file_from_url(source_url, TMP_PATH, extract_path)

    @staticmethod
    def transform():
        pass

    @staticmethod
    def load(dataset_folder: Path):
        dataset_folder.mkdir(parents=True, exist_ok=True)
        pass
