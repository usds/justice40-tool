from pathlib import Path

from config import settings
from utils import unzip_file_from_url


class Etl:
    def __init__(self):
        self.DATA_PATH = settings.APP_ROOT / "data"
        self.TMP_PATH = DATA_PATH / "tmp"

    def get_yaml_config(self):
        pass

    @staticmethod
    def extract(source_url: str = None, extract_path: Path = None):
        if source_url and extract_path:
            unzip_file_from_url(source_url, TMP_PATH, extract_path)

    @staticmethod
    def translate():
        pass

    @staticmethod
    def load(dataset_folder: Path):
        dataset_folder.mkdir(parents=True, exist_ok=True)
        pass
