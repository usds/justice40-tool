import pathlib

from data_pipeline.etl.sources.hud_housing.etl import HudHousingETL
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestHudHousingETL(TestETL):
    _ETL_CLASS = HudHousingETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "140/Table3.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "2014thru2018-140-csv.zip"
    _EXTRACT_TMP_FOLDER_NAME = "HudHousingETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)
