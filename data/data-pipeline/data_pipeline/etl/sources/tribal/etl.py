from pathlib import Path

import geopandas as gpd
import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TribalETL(ExtractTransformLoad):
    def __init__(self):

        self.CSV_BASE_PATH = self.DATA_PATH / "tribal" / "csv"

        self.GEOGRAPHIC_BASE_PATH = (
            self.DATA_PATH / "tribal" / "geographic_data"
        )
        self.NATIONAL_TRIBAL_GEOJSON_PATH = (
            self.GEOGRAPHIC_BASE_PATH / "usa.json"
        )

        self.USA_TRIBAL_DF_LIST = []

    def get_data_sources(self) -> [DataSource]:

        national_lar_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/BIA_National_LAR_updated_20220929.zip"
        )
        tsa_and_aian_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/BIA_TSA_and_AIAN_json.zip"
        )
        alaska_native_villages_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/Alaska_Native_Villages_json.zip"
        )

        return [
            ZIPDataSource(
                national_lar_url,
                destination=self.get_sources_path() / "bia_national_lar",
            ),
            ZIPDataSource(
                source=tsa_and_aian_url,
                destination=self.get_sources_path() / "tsa_and_aian",
            ),
            ZIPDataSource(
                source=alaska_native_villages_url,
                destination=self.get_sources_path() / "alaska_native_villages",
            ),
        ]

    def _transform_bia_national_lar(self, path: Path) -> None:
        """Transform the Tribal BIA National Lar Geodataframe and appends it to the
        national Tribal Dataframe List

        Args:
            path (Path): the Path to the BIA National Lar

        Returns:
            None
        """

        bia_national_lar_df = gpd.read_file(path)

        # DELETE
        logger.debug(f"Columns: {bia_national_lar_df.columns}\n")

        bia_national_lar_df.drop(
            ["GISAcres"],
            axis=1,
            inplace=True,
        )

        bia_national_lar_df.rename(
            columns={
                "LARID": field_names.TRIBAL_ID,
                "LARName": field_names.TRIBAL_LAND_AREA_NAME,
            },
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
            columns={
                "OBJECTID": field_names.TRIBAL_ID,
                "Land_Area_": field_names.TRIBAL_LAND_AREA_NAME,
            },
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
            columns={
                "TSAID": field_names.TRIBAL_ID,
                "LARName": field_names.TRIBAL_LAND_AREA_NAME,
            },
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
                "GlobalID": field_names.TRIBAL_ID,
                "TRIBALOFFICENAME": field_names.TRIBAL_LAND_AREA_NAME,
            },
            inplace=True,
        )

        self.USA_TRIBAL_DF_LIST.append(alaska_native_villages_df)

    def transform(self) -> None:
        """Transform the tribal geojson files to generate national CSVs and GeoJSONs

        Returns:
            None
        """
        # Set the filepaths:
        bia_national_lar_shapefile = (
            self.get_sources_path() / "bia_national_lar"
        )

        bia_aian_supplemental_geojson = (
            self.get_sources_path()
            / "tsa_and_aian"
            / "BIA_AIAN_Supplemental.json"
        )

        bia_tsa_geojson = (
            self.get_sources_path() / "tsa_and_aian" / "BIA_TSA.json"
        )

        alaska_native_villages_geojson = (
            self.get_sources_path()
            / "alaska_native_villages"
            / "AlaskaNativeVillages.gdb.geojson"
        )

        self._transform_bia_national_lar(bia_national_lar_shapefile)
        self._transform_bia_aian_supplemental(bia_aian_supplemental_geojson)
        self._transform_bia_tsa(bia_tsa_geojson)
        self._transform_alaska_native_villages(alaska_native_villages_geojson)

    def load(self) -> None:
        """Create tribal national CSV and GeoJSON

        Returns:
            None
        """
        logger.debug("Saving Tribal GeoJson and CSV")
        usa_tribal_df = gpd.GeoDataFrame(
            pd.concat(self.USA_TRIBAL_DF_LIST, ignore_index=True)
        )
        usa_tribal_df = usa_tribal_df.to_crs(
            "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
        )

        # note – this works a little different than many of the ETLs. The file
        # being written here is used again downstream, so it's placed in a
        # special directory.
        logger.debug("Writing national geojson file")
        self.GEOGRAPHIC_BASE_PATH.mkdir(parents=True, exist_ok=True)
        usa_tribal_df.to_file(
            self.NATIONAL_TRIBAL_GEOJSON_PATH, driver="GeoJSON"
        )
