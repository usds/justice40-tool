import pathlib

from data_pipeline.etl.sources.fsf_flood_risk.etl import FloodRiskETL
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestFloodRiskETL(TestETL):
    _ETL_CLASS = FloodRiskETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "fsf_flood/flood-tract2010.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "fsf_flood.zip"
    _EXTRACT_TMP_FOLDER_NAME = "FloodRiskETL"
    _FIXTURES_SHARED_TRACT_IDS = TestETL._FIXTURES_SHARED_TRACT_IDS + [
        "02290000400"  # A tract with 1 property
    ]

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)
