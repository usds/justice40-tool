import pathlib

from data_pipeline.etl.sources.cdc_places.etl import CDCPlacesETL
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestCDCPlacesETL(TestETL):
    _ETL_CLASS = CDCPlacesETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "census_tract.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = None
    _EXTRACT_TMP_FOLDER_NAME = "cdc_places"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_sample_data_exists(self):
        """This will test that the sample data exists where it's supposed to as it's supposed to
        As per conversation with Jorge, here we can *just* test that the zip file exists.
        """
        assert (self._SAMPLE_DATA_PATH / self._SAMPLE_DATA_FILE_NAME).exists()
