import zipfile

import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ExampleETL(ExtractTransformLoad):
    """A test-only, simple implementation of the ETL base class.

    This can be used for the base tests of the `TestETL` class.
    """

    INPUT_FIELD_NAME = "Input Field 1"
    EXAMPLE_FIELD_NAME = "Example Field 1"

    NAME = "example_dataset"
    LAST_UPDATED_YEAR = 2017
    SOURCE_URL = "https://www.example.com/example.zip"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    def __init__(self):
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
            low_memory=False,
        )

        df[self.EXAMPLE_FIELD_NAME] = df[self.INPUT_FIELD_NAME] * 2

        self.output_df = df
