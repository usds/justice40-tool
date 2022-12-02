import pathlib

from data_pipeline.etl.sources.persistent_poverty.etl import (
    PersistentPovertyETL,
)
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestPersistentPovertyETL(TestETL):
    _ETL_CLASS = PersistentPovertyETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "ltdb_std_all_sample/ltdb_std_1990_sample.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "LTDB_Std_All_Sample.zip"
    _EXTRACT_TMP_FOLDER_NAME = "PersistentPovertyETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)
