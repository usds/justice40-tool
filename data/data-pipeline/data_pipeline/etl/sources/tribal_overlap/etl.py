from pathlib import Path
import geopandas as gpd
import pandas as pd
from data_pipeline.config import settings

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.etl.sources.census.etl import CensusETL
from data_pipeline.etl.sources.geo_utils import (
    add_tracts_for_geometries,
    get_tribal_geojson,
    get_tract_geojson,
)
from data_pipeline.etl.sources.tribal.etl import TribalETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TribalOverlapETL(ExtractTransformLoad):
    """Calculates the overlap between Census tracts and Tribal boundaries."""

    # Metadata for the baseclass
    NAME = "tribal_overlap"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    PUERTO_RICO_EXPECTED_IN_DATA = False
    ALASKA_AND_HAWAII_EXPECTED_IN_DATA = True
    EXPECTED_MISSING_STATES = [
        # Hawaii expected to be missing
        "15",
    ]

    # Define these for easy code completion
    def __init__(self):
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
        ]

        self.output_df: pd.DataFrame
        self.census_tract_gdf: gpd.GeoDataFrame
        self.tribal_gdf: gpd.GeoDataFrame

    def extract(self) -> None:

        # TODO: delete
        tract_data_path = Path(
            "/Users/lucas/Downloads/tract_geojson_temp.geojson"
        )

        self.census_tract_gdf = get_tract_geojson(
            _tract_data_path=tract_data_path
        )
        self.tribal_gdf = get_tribal_geojson()

    def transform(self) -> None:
        logger.info("Starting tribal overlap transforms.")

        # First, calculate whether tracts include any areas from the Tribal areas,
        # for both the points in AK and the polygons in the continental US (CONUS).
        tribal_overlap_with_tracts = add_tracts_for_geometries(
            df=self.tribal_gdf, tract_data=self.census_tract_gdf
        )

        tribal_overlap_with_tracts = tribal_overlap_with_tracts.groupby([
            self.GEOID_TRACT_FIELD_NAME]).agg(
            {"tribalId": "count"}
        )

        # TODO: delete!
        self.output_df = tribal_overlap_with_tracts
        self.COLUMNS_TO_KEEP = tribal_overlap_with_tracts.columns
        self.COLUMNS_TO_KEEP = [
            x for x in self.COLUMNS_TO_KEEP if x != "geometry"
        ]

        # df = pd.read_csv(
        #     self.get_tmp_path() / "eAMLIS export of all data.tsv",
        #     sep="\t",
        #     low_memory=False,
        # )
        # gdf = gpd.GeoDataFrame(
        #     df,
        #     geometry=gpd.points_from_xy(
        #         x=df["Longitude"],
        #         y=df["Latitude"],
        #     ),
        #     crs="epsg:4326",
        # )
        # gdf = gdf.drop_duplicates(subset=["geometry"], keep="last")
        # gdf_tracts = add_tracts_for_geometries(gdf)
        # gdf_tracts = gdf_tracts.drop_duplicates(self.GEOID_TRACT_FIELD_NAME)
        # gdf_tracts[self.AML_BOOLEAN] = True
        # self.output_df = gdf_tracts[self.COLUMNS_TO_KEEP]

    # TODO: delete!
    def validate(self) -> None:
        pass
