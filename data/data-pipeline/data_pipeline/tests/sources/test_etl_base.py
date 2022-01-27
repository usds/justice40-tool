import pandas as pd

from data_pipeline.config import settings
from data_pipeline.tests.sources.example.etl import ExampleETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestETL:
    # In every child test class, change this to the class of the ETL being tested.
    _ETL_CLASS = ExampleETL

    # In every child test class, change this to the directory of the text fixtures.
    _DATA_DIRECTORY_FOR_TEST = (
        settings.APP_ROOT / "tests" / "sources" / "example" / "data"
    )

    # The following constants do not need to be updated in child class.
    _INPUT_CSV_FILE_NAME = "input.csv"  # TODO: delete this?
    _TRANSFORM_CSV_FILE_NAME = "transform.csv"
    _OUTPUT_CSV_FILE_NAME = "output.csv"

    def _get_instance_of_etl_class(self):
        return self._ETL_CLASS()

    def _setup_etl_instance_and_run_extract(self, mock_paths):
        raise NotImplementedError(
            "Prepare and run extract method not defined for this class."
        )

    def _setup_etl_instance_and_run_transform(self, mock_etl):
        raise NotImplementedError(
            "Prepare and run transform method not defined for this class."
        )

    def _setup_etl_instance_and_run_load(self, mock_etl):
        raise NotImplementedError(
            "Prepare and run load method not defined for this class."
        )

    def test_existence_of_test_fixtures_base(self):
        """Every ETL test should have these two test fixture files."""
        assert (
            self._DATA_DIRECTORY_FOR_TEST / self._TRANSFORM_CSV_FILE_NAME
        ).exists()
        assert (
            self._DATA_DIRECTORY_FOR_TEST / self._OUTPUT_CSV_FILE_NAME
        ).exists()

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

    def test_load_base(self, mock_etl):
        # setup - input variables
        etl = self._get_instance_of_etl_class()

        # setup - mock transform step
        df_transform = pd.read_csv(
            self._DATA_DIRECTORY_FOR_TEST / self._TRANSFORM_CSV_FILE_NAME,
            dtype={etl.GEOID_TRACT_FIELD_NAME: "string"},
        )
        etl.output_df = df_transform

        # execution
        etl.load()

        # Make sure it creates the file.
        actual_output_path = etl._get_output_file_path()
        assert actual_output_path.exists()

        actual_output = pd.read_csv(
            actual_output_path, dtype={etl.GEOID_TRACT_FIELD_NAME: str}
        )
        expected_output_csv_path = (
            self._DATA_DIRECTORY_FOR_TEST / self._OUTPUT_CSV_FILE_NAME
        )

        # setup - load expected output
        expected_output = pd.read_csv(
            filepath_or_buffer=expected_output_csv_path,
            dtype={etl.GEOID_TRACT_FIELD_NAME: str},
        )

        # check that the `COLUMNS_TO_KEEP` are in the output
        for col in etl.COLUMNS_TO_KEEP:
            assert col in actual_output.columns, f"{col} is missing from output"

        # validation
        pd.testing.assert_frame_equal(actual_output, expected_output)

    def test_transform_sets_output_df(self):
        """This test ensures that the transform step sets its results to `output_df`."""

        # TODO: each ETL class has such a specific way of transferring data between
        # the `extract` step and the `transform` step. For some, this is a CSV,
        # for some, it's a shapefile, for some, it's multiple files in a directory.
        # How do we create a standardized test fixture on the results of `extract`?
