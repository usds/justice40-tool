from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ExampleETL(ExtractTransformLoad):
    """A test-only, simple implementation of the ETL base class.

    This can be used for the base tests of the `TestETL` class below.
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


class TestETL:
    # In every child test class, change this to the class of the ETL being tested.
    _ETL_CLASS = ExampleETL

    def _get_instance_of_etl_class(self):
        return self._ETL_CLASS()

    def test_init_base(self, mock_etl, mock_paths):
        # Setup
        etl = self._get_instance_of_etl_class()
        data_path, tmp_path = mock_paths

        assert etl.DATA_PATH == data_path
        assert etl.TMP_PATH == tmp_path

        # Also make sure all parameters that need to be non-null are non-null
        assert etl.NAME is not None
        assert etl.LAST_UPDATED_YEAR is not None
        assert etl.SOURCE_URL is not None
        assert etl.GEO_LEVEL is not None
        assert etl.COLUMNS_TO_KEEP is not None
        assert len(etl.COLUMNS_TO_KEEP) > 0

        # Check certain parameters are set.
        assert etl.EXPECTED_MAX_CENSUS_BLOCK_GROUPS == 250000
        assert etl.EXPECTED_MAX_CENSUS_TRACTS == 74160

    def test_get_output_file_path_base(self, mock_etl, mock_paths):

        etl = self._get_instance_of_etl_class()
        data_path, tmp_path = mock_paths

        actual_file_path = etl._get_output_file_path()

        expected_file_path = (
                data_path
                / "dataset"
                / f"{etl.NAME}_{etl.LAST_UPDATED_YEAR}"
                / "usa.csv"
        )

        logger.info(f"Expected: {expected_file_path}")

        assert actual_file_path == expected_file_path