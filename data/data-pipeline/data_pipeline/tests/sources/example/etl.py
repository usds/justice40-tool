import pandas as pd
import zipfile

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ExampleETL(ExtractTransformLoad):
    """A test-only, simple implementation of the ETL base class.

    This can be used for the base tests of the `TestETL` class.
    """

    INPUT_FIELD_NAME = "Input Field 1"
    EXAMPLE_FIELD_NAME = "Example Field 1"

    def __init__(self):
        self.NAME = "example_dataset"
        self.LAST_UPDATED_YEAR = 2017
        self.SOURCE_URL = "https://www.example.com/example.zip"
        self.GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.EXAMPLE_FIELD_NAME,
        ]

    def extract(self):
        # Pretend to download zip from external URL, write it to CSV.
        zip_file_path = (
            settings.APP_ROOT
            / "tests"
            / "sources"
            / "example"
            / "data"
            / "input.zip"
        )

        logger.info(f"Extracting {zip_file_path}")
        with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
            zip_ref.extractall(self.TMP_PATH)

    def transform(self):
        logger.info(f"Loading file from {self.TMP_PATH / 'input.csv'}.")

        df: pd.DataFrame = pd.read_csv(
            self.TMP_PATH / "input.csv",
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            na_values=["None"],
            low_memory=False,
        )

        df[self.EXAMPLE_FIELD_NAME] = df[self.INPUT_FIELD_NAME] * 2

        self.output_df = df
