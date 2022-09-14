import geopandas as gpd
import pathlib
from data_pipeline.tests.sources.example.test_etl import TestETL
from data_pipeline.etl.sources.dot_travel_composite.etl import (
    TravelCompositeETL,
)


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

    def test_extract_produces_valid_data(self, snapshot, mock_etl, mock_paths):
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )
        tmp_df = gpd.read_file(
            etl.get_tmp_path() / self._SAMPLE_DATA_FILE_NAME,
            dtype={etl.GEOID_TRACT_FIELD_NAME: str},
        )
        assert tmp_df.shape[0] >= 15
        assert tmp_df.shape[1] >= 86