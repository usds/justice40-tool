import zipfile

import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.datasource import DataSource

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
    LOAD_YAML_CONFIG: bool = True

    def __init__(self):
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.EXAMPLE_FIELD_NAME,
        ]

    def get_data_sources(self) -> [DataSource]:
        return []

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

        with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
            zip_ref.extractall(self.get_sources_path())

    def transform(self):
        df: pd.DataFrame = pd.read_csv(
            self.get_sources_path() / "input.csv",
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        df[self.EXAMPLE_FIELD_NAME] = df[self.INPUT_FIELD_NAME] * 2

        self.output_df = df
