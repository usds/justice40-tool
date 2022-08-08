from pathlib import Path
import geopandas as gpd
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class TribalETL(ExtractTransformLoad):
    def __init__(self):
        self.GEOJSON_BASE_PATH = self.DATA_PATH / "tribal" / "geojson"
        self.CSV_BASE_PATH = self.DATA_PATH / "tribal" / "csv"
        self.NATIONAL_TRIBAL_GEOJSON_PATH = self.GEOJSON_BASE_PATH / "usa.json"
        self.USA_TRIBAL_DF_LIST = []

    def extract(self) -> None:
        """Extract the tribal geojson zip files from Justice40 S3 data folder

        Returns:
            None
        """
        logger.info("Downloading Tribal Data")

        bia_geojson_url = "https://justice40-data.s3.amazonaws.com/data-sources/BIA_National_LAR_json.zip"
        alaska_geojson_url = "https://justice40-data.s3.amazonaws.com/data-sources/Alaska_Native_Villages_json.zip"

        unzip_file_from_url(
            bia_geojson_url,
            self.TMP_PATH,
            self.DATA_PATH / "tribal" / "geojson" / "bia_national_lar",
        )

        unzip_file_from_url(
            alaska_geojson_url,
            self.TMP_PATH,
            self.DATA_PATH / "tribal" / "geojson" / "alaska_native_villages",
        )
        pass

    def _transform_bia_national_lar(self, tribal_geojson_path: Path) -> None:
        """Transform the Tribal BIA National Lar Geodataframe and appends it to the
        national Tribal Dataframe List

        Args:
            tribal_geojson_path (Path): the Path to the Tribal Geojson

        Returns:
            None
        """

        bia_national_lar_df = gpd.read_file(tribal_geojson_path)

        bia_national_lar_df.drop(
            ["OBJECTID", "GISAcres", "Shape_Length", "Shape_Area"],
            axis=1,
            inplace=True,
        )

        bia_national_lar_df.rename(
            columns={"TSAID": "tribalId", "LARName": "landAreaName"},
            inplace=True,
        )

        self.USA_TRIBAL_DF_LIST.append(bia_national_lar_df)

    def _transform_bia_aian_supplemental(
        self, tribal_geojson_path: Path
    ) -> None:
        """Transform the Tribal BIA Supplemental Geodataframe and appends it to the
        national Tribal Dataframe List

        Args:
            tribal_geojson_path (Path): the Path to the Tribal Geojson

        Returns:
            None
        """

        bia_aian_supplemental_df = gpd.read_file(tribal_geojson_path)

        bia_aian_supplemental_df.drop(
            ["GISAcres", "Source", "Shape_Length", "Shape_Area"],
            axis=1,
            inplace=True,
        )

        bia_aian_supplemental_df.rename(
            columns={"OBJECTID": "tribalId", "Land_Area_": "landAreaName"},
            inplace=True,
        )

        self.USA_TRIBAL_DF_LIST.append(bia_aian_supplemental_df)

    def _transform_bia_tsa(self, tribal_geojson_path: Path) -> None:
        """Transform the Tribal BIA TSA Geodataframe and appends it to the
        national Tribal Dataframe List

        Args:
            tribal_geojson_path (Path): the Path to the Tribal Geojson

        Returns:
            None
        """

        bia_tsa_df = gpd.read_file(tribal_geojson_path)

        bia_tsa_df.drop(
            ["OBJECTID", "GISAcres", "Shape_Length", "Shape_Area"],
            axis=1,
            inplace=True,
        )

        bia_tsa_df.rename(
            columns={"TSAID": "tribalId", "LARName": "landAreaName"},
            inplace=True,
        )

        self.USA_TRIBAL_DF_LIST.append(bia_tsa_df)

    def _transform_alaska_native_villages(
        self, tribal_geojson_path: Path
    ) -> None:
        """Transform the Alaska Native Villages Geodataframe and appends it to the
        national Tribal Dataframe List

        Args:
            tribal_geojson_path (Path): the Path to the Tribal Geojson

        Returns:
            None
        """

        alaska_native_villages_df = gpd.read_file(tribal_geojson_path)

        alaska_native_villages_df.rename(
            columns={
                "GlobalID": "tribalId",
                "TRIBALOFFICENAME": "landAreaName",
            },
            inplace=True,
        )

        self.USA_TRIBAL_DF_LIST.append(alaska_native_villages_df)

    def transform(self) -> None:
        """Transform the tribal geojson files to generate national CSVs and GeoJSONs

        Returns:
            None
        """
        logger.info("Transforming Tribal Data")

        # load the geojsons
        bia_national_lar_geojson = (
            self.GEOJSON_BASE_PATH / "bia_national_lar" / "BIA_TSA.json"
        )
        bia_aian_supplemental_geojson = (
            self.GEOJSON_BASE_PATH
            / "bia_national_lar"
            / "BIA_AIAN_Supplemental.json"
        )
        bia_tsa_geojson_geojson = (
            self.GEOJSON_BASE_PATH / "bia_national_lar" / "BIA_TSA.json"
        )
        alaska_native_villages_geojson = (
            self.GEOJSON_BASE_PATH
            / "alaska_native_villages"
            / "AlaskaNativeVillages.gdb.geojson"
        )

        self._transform_bia_national_lar(bia_national_lar_geojson)
        self._transform_bia_aian_supplemental(bia_aian_supplemental_geojson)
        self._transform_bia_tsa(bia_tsa_geojson_geojson)
        self._transform_alaska_native_villages(alaska_native_villages_geojson)

    def load(self) -> None:
        """Create tribal national CSV and GeoJSON

        Returns:
            None
        """
        logger.info("Saving Tribal GeoJson and CSV")

        usa_tribal_df = gpd.GeoDataFrame(
            pd.concat(self.USA_TRIBAL_DF_LIST, ignore_index=True)
        )
        usa_tribal_df = usa_tribal_df.to_crs(
            "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
        )
        logger.info("Writing national geojson file")
        usa_tribal_df.to_file(
            self.NATIONAL_TRIBAL_GEOJSON_PATH, driver="GeoJSON"
        )
