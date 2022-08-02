# pylint: disable=protected-access
from unittest import mock
import pathlib
import requests
from data_pipeline.etl.base import ValidGeoLevel

from data_pipeline.etl.sources.national_risk_index.etl import (
    NationalRiskIndexETL,
)
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestNationalRiskIndexETL(TestETL):
    """Tests the NRI ETL only.

    This uses pytest-snapshot.
    To update individual snapshots: $ poetry run pytest
            data_pipeline/tests/sources/national_risk_index/test_etl.py::TestClassNameETL::<testname>
            --snapshot-update
    """

    _ETL_CLASS = NationalRiskIndexETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "NRI_Table_CensusTracts.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "NRI_Table_CensusTracts.zip"
    _EXTRACT_TMP_FOLDER_NAME = "NationalRiskIndexETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_init(self, mock_etl, mock_paths):
        """Tests that the mock NationalRiskIndexETL class instance was
        initiliazed correctly.

        Validates the following conditions:
        - self.DATA_PATH points to the "data" folder in the temp directory
        - self.TMP_PATH points to the "data/tmp" folder in the temp directory
        - self.INPUT_PATH points to the correct path in the temp directory
        - self.OUTPUT_PATH points to the correct path in the temp directory
        """
        # setup
        etl = NationalRiskIndexETL()
        data_path, tmp_path = mock_paths
        input_csv = (
            tmp_path / "NationalRiskIndexETL" / "NRI_Table_CensusTracts.csv"
        )

        # validation
        assert etl.INPUT_CSV == input_csv
        assert etl.GEOID_FIELD_NAME == "GEOID10"
        assert etl.GEOID_TRACT_FIELD_NAME == "GEOID10_TRACT"
        assert etl.NAME == "national_risk_index"
        assert etl.GEO_LEVEL == ValidGeoLevel.CENSUS_TRACT
        assert etl.COLUMNS_TO_KEEP == [
            etl.GEOID_TRACT_FIELD_NAME,
            etl.RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_FIELD_NAME,
            etl.EXPECTED_POPULATION_LOSS_RATE_FIELD_NAME,
            etl.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME,
            etl.EXPECTED_BUILDING_LOSS_RATE_FIELD_NAME,
            etl.CONTAINS_AGRIVALUE,
        ]

    def test_get_output_file_path(self, mock_etl, mock_paths):
        """Tests the right file name is returned."""
        etl = NationalRiskIndexETL()
        data_path, tmp_path = mock_paths

        output_file_path = etl._get_output_file_path()
        expected_output_file_path = (
            data_path / "dataset" / "national_risk_index" / "usa.csv"
        )
        assert output_file_path == expected_output_file_path
