# pylint: disable=protected-access
import pathlib
from unittest import mock

import requests
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.cdc_life_expectancy.etl import CDCLifeExpectancy
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestCDCLifeExpectency(TestETL):
    """Tests the CDC Life Expectancy ETL.

    This uses pytest-snapshot.
    To update individual snapshots: $ poetry run pytest
            data_pipeline/tests/sources/cdc_life_expectancy/test_etl.py::TestClassNameETL::<testname>
            --snapshot-update
    """

    _ETL_CLASS = CDCLifeExpectancy

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "US_A.CSV"
    _SAMPLE_DATA_ZIP_FILE_NAME = None
    _EXTRACT_TMP_FOLDER_NAME = "CDCLifeExpectanc"
    _EXTRACT_CSV_FILE_NAME = "extract.csv"
    _FIXTURES_SHARED_TRACT_IDS = TestETL._FIXTURES_SHARED_TRACT_IDS + [
        "55001950201",  # WI
        "23001010100",  # ME
    ]

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def _setup_etl_instance_and_run_extract(
        self, mock_etl, mock_paths
    ) -> ExtractTransformLoad:
        """Method to setup an ETL instance with proper upstream mocks to run extract.
        This must be re-implemented in every child class.

        This method can be used by multiple tests that need to run the same fixtures
        that need these same mocks.

        In order to re-implement this method, usually it will involve a
        decent amount of work to monkeypatch `requests` or another method that's
        used to retrieve data in order to force that method to retrieve the fixture
        data. A basic version of that patching is included here for classes that can use it.
        """

        with mock.patch(
            "data_pipeline.utils.requests"
        ) as requests_mock, mock.patch(
            "data_pipeline.etl.score.etl_utils.get_state_fips_codes"
        ) as mock_get_state_fips_codes:
            tmp_path = mock_paths[1]

            def fake_get(url, *args, **kwargs):
                file_path = url.split("/")[-1]
                with open(
                    self._DATA_DIRECTORY_FOR_TEST / file_path,
                    "rb",
                ) as file:
                    file_contents = file.read()

                response_mock = requests.Response()
                response_mock.status_code = 200
                # pylint: disable=protected-access
                # Return text fixture:
                response_mock._content = file_contents
                return response_mock

            requests_mock.get = fake_get
            mock_get_state_fips_codes.return_value = [
                x[0:2] for x in self._FIXTURES_SHARED_TRACT_IDS
            ]
            # Instantiate the ETL class.
            etl = self._get_instance_of_etl_class()

            # Monkey-patch the temporary directory to the one used in the test
            etl.TMP_PATH = tmp_path

            # Run the extract method.
            etl.extract()
        return etl

    def test_init(self, mock_etl, mock_paths):
        etl = self._ETL_CLASS()
        data_path, _ = mock_paths
        assert etl.DATA_PATH == data_path
        assert etl.COLUMNS_TO_KEEP == [
            "GEOID10_TRACT",
            "Life expectancy (years)",
        ]
        assert etl.INPUT_GEOID_TRACT_FIELD_NAME == "Tract ID"
        assert etl.LIFE_EXPECTANCY_FIELD_NAME == "Life expectancy (years)"

    def test_get_output_file_path(self, mock_etl, mock_paths):
        """Tests the right file name is returned."""
        etl = self._ETL_CLASS()
        data_path, tmp_path = mock_paths

        output_file_path = etl._get_output_file_path()
        expected_output_file_path = (
            data_path / "dataset" / "cdc_life_expectancy" / "usa.csv"
        )
        assert output_file_path == expected_output_file_path
