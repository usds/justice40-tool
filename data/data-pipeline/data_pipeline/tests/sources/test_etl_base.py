# pylint: disable=protected-access
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.tests.conftest import copy_data_files
from data_pipeline.tests.sources.example.etl import ExampleETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestETL:
    """A base class that can be inherited by all other ETL tests.

    Note: every method that does *not* need to be reimplemented by child classes has
    the test name pattern of `test_*_base`. All other tests need to be reimplemented.
    """

    # In every child test class, change this to the class of the ETL being tested.
    _ETL_CLASS = ExampleETL

    # In every child test class, change this to the directory of the text fixtures.
    _DATA_DIRECTORY_FOR_TEST = (
        settings.APP_ROOT / "tests" / "sources" / "example" / "data"
    )

    # The following constants do not need to be updated in child class.
    _INPUT_CSV_FILE_NAME = "input.csv"
    _TRANSFORM_CSV_FILE_NAME = "transform.csv"
    _OUTPUT_CSV_FILE_NAME = "output.csv"

    def _get_instance_of_etl_class(self) -> type(ExtractTransformLoad):
        return self._ETL_CLASS()

    def _setup_etl_instance_and_run_extract(
        self, mock_etl, mock_paths
    ) -> ExtractTransformLoad:
        """Method to setup an ETL instance with proper upstream mocks to run extract.

        This must be re-implemented in every child class.

        This method can be used by multiple tests that need to run the same fixtures
        that need these same mocks, and by `test_update_test_fixtures`.

        In order to re-implement this method, usually it will involve a
        decent amount of work to monkeypatch `requests` or another method that's
        used to retrieve data in order to force that method to retrieve the fixture
        data.
        """
        # When running this in child classes, make sure the child class re-implements
        # this method.
        if self._ETL_CLASS is not ExampleETL:
            raise NotImplementedError(
                "Prepare and run extract method not defined for this class."
            )

        # The rest of this method applies for `ExampleETL` only.
        etl = self._get_instance_of_etl_class()
        etl.extract()

        return etl

    # TODO: Add a flag to make this run only when pytest is run with an argument.
    def test_update_test_fixtures(self, mock_etl, mock_paths):
        """Update the test fixtures (the data files) used by the test.

        This needs to be reimplemented for every child class. This is because there
        are not strict contracts on the outputs of the `extract` step so this method
        needs to explicitly define how to update the `input` fixture that comes after
        the extract step.

        Using this method to update fixtures  can be helpful if you expect the
        results to change because you changed the logic of the ETL class and need to
        quickly update the fixtures.

        However, note a few things first:

        1. Do *not* update these fixtures if you did not expect the ETL results to
        change!

        2. If the source data itself changes (e.g., the external source renames a
        column), update the "furthest upstream" test fixture which, in many cases,
        is a .zip file. Then running this method will update all subsequent files.

        If you're confused by any of this, ask for help, it's confusing :).
        """
        # When running this in child classes, make sure the child class re-implements
        # this method.
        if self._ETL_CLASS is not ExampleETL:
            raise NotImplementedError(
                "Update fixtures method not defined for this class."
            )

        # The rest of this method applies for `ExampleETL` only.
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )

        # After running extract, write the results as the "input.csv" in the test
        # directory.
        logger.info(
            f"Writing data to {self._DATA_DIRECTORY_FOR_TEST / self._INPUT_CSV_FILE_NAME}"
        )
        copy_data_files(
            src=etl.TMP_PATH / "input.csv",
            dst=self._DATA_DIRECTORY_FOR_TEST / self._INPUT_CSV_FILE_NAME,
        )

        # After running transform, write the results as the "transform.csv" in the test
        # directory.
        etl.transform()
        etl.output_df.to_csv(
            path_or_buf=self._DATA_DIRECTORY_FOR_TEST
            / self._TRANSFORM_CSV_FILE_NAME,
            index=False,
        )

        # Run validate, just to check.
        etl.validate()

        # After running load, write the results as the "output.csv" in the test
        # directory.
        etl.load()
        copy_data_files(
            src=etl._get_output_file_path(),
            dst=self._DATA_DIRECTORY_FOR_TEST / self._OUTPUT_CSV_FILE_NAME,
        )

    def test_existence_of_test_fixtures_base(self):
        """Every ETL test should have these two test fixture files.

        Can be run without modification for all child classes.
        """
        assert (
            self._DATA_DIRECTORY_FOR_TEST / self._TRANSFORM_CSV_FILE_NAME
        ).exists()

        assert (
            self._DATA_DIRECTORY_FOR_TEST / self._OUTPUT_CSV_FILE_NAME
        ).exists()

    def test_init_base(self, mock_etl, mock_paths):
        """Test whether class has appropriate parameters set.

        Can be run without modification for all child classes.
        """
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
        assert etl.EXPECTED_CENSUS_TRACTS_CHARACTER_LENGTH == 11
        assert etl.EXPECTED_CENSUS_BLOCK_GROUPS_CHARACTER_LENGTH == 13

    def test_get_output_file_path_base(self, mock_etl, mock_paths):
        """Test file path method.

        Can be run without modification for all child classes.
        """
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

    def test_transform_sets_output_df(self, mock_etl, mock_paths):
        """This test ensures that the transform step sets its results to `output_df`.

        Can be run without modification for all child classes.
        """
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )
        etl.transform()

        assert etl.output_df is not None

        # Assert it has some rows
        assert etl.output_df.shape[0] > 0

        # Check that it has all columns
        for col in etl.COLUMNS_TO_KEEP:
            assert col in etl.output_df.columns, f"{col} is missing from output"

    def test_load_base(self, mock_etl):
        """Test load method.

        Can be run without modification for all child classes.
        """
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

    def test_validate(self):
        pass


    def test_get_data_frame(self):
        pass