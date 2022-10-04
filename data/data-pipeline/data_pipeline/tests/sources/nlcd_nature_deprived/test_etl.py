import pathlib

from data_pipeline.etl.sources.nlcd_nature_deprived.etl import NatureDeprivedETL
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestNatureDeprivedETL(TestETL):
    _ETL_CLASS = NatureDeprivedETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "usa_conus_nat_dep__compiled_by_TPL.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "usa_conus_nat_dep__compiled_by_TPL.csv.zip"
    _EXTRACT_TMP_FOLDER_NAME = "NatureDeprivedETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)
