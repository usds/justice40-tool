# pylint: disable=protected-access
import pathlib

from data_pipeline.etl.sources.child_opportunity_index.etl import (
    ChildOpportunityIndex,
)
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestChildOpportunityIndexETL(TestETL):
    """Tests the COI ETL.

    This uses pytest-snapshot.
    To update individual snapshots: $ poetry run pytest
            data_pipeline/tests/sources/child_opportunity_index/test_etl.py::TestClassNameETL::<testname>
            --snapshot-update
    """

    _ETL_CLASS = ChildOpportunityIndex

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "raw.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "coi.zip"
    _EXTRACT_TMP_FOLDER_NAME = "ChildOpportunityIndex"
    _EXTRACT_CSV_FILE_NAME = "raw.csv"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_init(self, mock_etl, mock_paths):
        """Tests that the ChildOpportunityIndexETL class was initialized
        correctly.
        """

        etl = ChildOpportunityIndex()
        data_path, _ = mock_paths
        assert etl.DATA_PATH == data_path
        assert etl.COLUMNS_TO_KEEP == [
            "GEOID10_TRACT",
            "Summer days above 90F",
            "Percent low access to healthy food",
            "Percent impenetrable surface areas",
            "Third grade reading proficiency",
        ]
        assert etl.GEOID_FIELD_NAME == "GEOID10"
        assert etl.GEOID_TRACT_FIELD_NAME == "GEOID10_TRACT"
        assert etl.TRACT_INPUT_COLUMN_NAME == "geoid"
        assert etl.EXTREME_HEAT_INPUT_FIELD == "HE_HEAT"
        assert etl.HEALTHY_FOOD_INPUT_FIELD == "HE_FOOD"
        assert etl.IMPENETRABLE_SURFACES_INPUT_FIELD == "HE_GREEN"
        assert etl.READING_INPUT_FIELD == "ED_READING"

    def test_get_output_file_path(self, mock_etl, mock_paths):
        """Tests the right file name is returned."""
        etl = self._ETL_CLASS()
        data_path, tmp_path = mock_paths

        output_file_path = etl._get_output_file_path()
        expected_output_file_path = (
            data_path / "dataset" / "child_opportunity_index" / "usa.csv"
        )
        assert output_file_path == expected_output_file_path
