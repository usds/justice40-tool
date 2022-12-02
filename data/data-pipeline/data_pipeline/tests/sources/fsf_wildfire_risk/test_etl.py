import pathlib

from data_pipeline.etl.sources.fsf_wildfire_risk.etl import WildfireRiskETL
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestWildfireRiskETL(TestETL):
    _ETL_CLASS = WildfireRiskETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "fsf_fire/fire-tract2010.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "fsf_fire.zip"
    _EXTRACT_TMP_FOLDER_NAME = "WildfireRiskETL"
    _FIXTURES_SHARED_TRACT_IDS = TestETL._FIXTURES_SHARED_TRACT_IDS + [
        "04003001402"  # A tract with 1 property, also missing a digit
    ]

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)
