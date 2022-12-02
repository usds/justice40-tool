import pathlib

import geopandas as gpd
from data_pipeline.etl.sources.dot_travel_composite.etl import (
    TravelCompositeETL,
)
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestTravelCompositeETL(TestETL):
    _ETL_CLASS = TravelCompositeETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "DOT_Disadvantage_Layer_Final_April2022.shp"
    _SAMPLE_DATA_ZIP_FILE_NAME = "Shapefile_and_Metadata.zip"
    _EXTRACT_TMP_FOLDER_NAME = "TravelCompositeETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_extract_produces_valid_data(self, mock_etl, mock_paths):
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )
        df = gpd.read_file(
            etl.get_tmp_path() / self._SAMPLE_DATA_FILE_NAME,
            dtype={etl.GEOID_TRACT_FIELD_NAME: str},
        )
        assert df.shape[0] == 30
        assert df.shape[1] == 86

    def test_transform_removes_blank_tracts(self, mock_etl, mock_paths):
        etl: TravelCompositeETL = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )
        etl.transform()
        etl.load()
        df = etl.get_data_frame()
        assert df.shape[0] == 15
        assert df.shape[1] == len(etl.COLUMNS_TO_KEEP)
