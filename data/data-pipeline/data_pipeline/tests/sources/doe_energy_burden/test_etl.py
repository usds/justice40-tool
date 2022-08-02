# pylint: disable=protected-access
import pathlib

from data_pipeline.etl.sources.doe_energy_burden.etl import (
    DOEEnergyBurden,
)
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestDOEEnergyBurdenETL(TestETL):
    """Tests the COI ETL.

    This uses pytest-snapshot.
    To update individual snapshots: $ poetry run pytest
            data_pipeline/tests/sources/ndoe_energy_burden/test_etl.py::TestClassNameETL::<testname>
            --snapshot-update
    """

    _ETL_CLASS = DOEEnergyBurden

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "DOE_LEAD_AMI_TRACT_2018_ALL.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "DOE_LEAD_AMI_TRACT_2018_ALL.csv.zip"
    _EXTRACT_TMP_FOLDER_NAME = "DOEEnergyBurden"
    _EXTRACT_CSV_FILE_NAME = "extract.csv"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_init(self, mock_etl, mock_paths):
        """Tests that the ChildOpportunityIndexETL class was initialized
        correctly.
        """

        etl = DOEEnergyBurden()
        data_path, _ = mock_paths
        assert etl.DATA_PATH == data_path
        assert etl.COLUMNS_TO_KEEP == ["GEOID10_TRACT", "Energy burden"]
        assert etl.GEOID_FIELD_NAME == "GEOID10"
        assert etl.GEOID_TRACT_FIELD_NAME == "GEOID10_TRACT"
        assert etl.INPUT_GEOID_TRACT_FIELD_NAME == "FIP"
        assert etl.INPUT_ENERGY_BURDEN_FIELD_NAME == "BURDEN"
        assert etl.REVISED_ENERGY_BURDEN_FIELD_NAME == "Energy burden"
