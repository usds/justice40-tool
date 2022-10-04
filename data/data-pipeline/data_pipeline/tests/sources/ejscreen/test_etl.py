import pathlib

from data_pipeline.etl.sources.ejscreen.etl import EJSCREENETL
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestEJSCREENETL(TestETL):
    _ETL_CLASS = EJSCREENETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "EJSCREEN_2021_USPR_Tracts.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "EJSCREEN_2021_USPR_Tracts.csv.zip"
    _EXTRACT_TMP_FOLDER_NAME = "EJSCREENETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)
