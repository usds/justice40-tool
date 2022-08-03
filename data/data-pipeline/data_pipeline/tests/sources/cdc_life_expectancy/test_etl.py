# pylint: disable=protected-access
import pathlib

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
    _SAMPLE_DATA_ZIP_FILE_NAME = "US_A.CSV"
    _EXTRACT_TMP_FOLDER_NAME = "CDCLifeExpectancy"
    _EXTRACT_CSV_FILE_NAME = "extract.csv"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

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
