import pathlib
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.etl.sources.geocorr_urban.etl import GeoCorrUrbanETL


class TestGeoCorrETL(TestETL):
    _ETL_CLASS = GeoCorrUrbanETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "geocorr_urban_rural.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "geocorr_urban_rural.csv.zip"
    _EXTRACT_TMP_FOLDER_NAME = "GeoCorrUrbanETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)
