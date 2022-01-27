from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel


class ExampleETL(ExtractTransformLoad):
    """A test-only, simple implementation of the ETL base class.

    This can be used for the base tests of the `TestETL` class.
    """

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
