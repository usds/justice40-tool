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
from data_pipeline.score import field_names
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

    @staticmethod
    def _create_string_from_list(series: pd.Series) -> str:
        """Helper method that creates a sorted string list (for tribal names)."""
        str_list = series.tolist()
        str_list = sorted(str_list)
        return ", ".join(str_list)

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

        tribal_overlap_with_tracts = tribal_overlap_with_tracts.groupby(
            [self.GEOID_TRACT_FIELD_NAME]
        ).agg(
            {
                field_names.TRIBAL_ID: "count",
                field_names.TRIBAL_LAND_AREA_NAME: self._create_string_from_list,
            }
        )

        tribal_overlap_with_tracts = tribal_overlap_with_tracts.reset_index()

        tribal_overlap_with_tracts = tribal_overlap_with_tracts.rename(
            columns={
                field_names.TRIBAL_ID: field_names.COUNT_OF_TRIBAL_AREAS_IN_TRACT,
                field_names.TRIBAL_LAND_AREA_NAME: field_names.NAMES_OF_TRIBAL_AREAS_IN_TRACT,
            }
        )

        # Second, calculate percentage overlap.
        # Drop the points from the Tribal data (because these cannot be joined to a
        # (Multi)Polygon tract data frame)
        tribal_gdf_without_points = self.tribal_gdf[
            self.tribal_gdf.geom_type != "Point"
        ]

        # Create a measure for the entire census tract area
        self.census_tract_gdf["area_tract"] = self.census_tract_gdf.area

        # Performing overlay funcion
        gdf_joined = gpd.overlay(
            self.census_tract_gdf, tribal_gdf_without_points, how="union"
        )
        # Calculating the areas of the newly-created geometries
        gdf_joined["area_joined"] = gdf_joined.area

        # Calculating the areas of the newly-created geometries in relation
        # to the original grid cells
        gdf_joined[field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT] = (
            gdf_joined["area_joined"] / gdf_joined["area_tract"]
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
