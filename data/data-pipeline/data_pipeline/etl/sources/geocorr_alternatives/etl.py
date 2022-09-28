import geopandas as gpd
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.etl.sources.geo_utils import (
    get_tract_geojson,
)
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class GeoCorrAlternativesETL(ExtractTransformLoad):
    """Calculates overlap between Census tracts & various alternative geographies."""

    NAME = "geocorr_alternatives"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    ISLAND_AREAS_EXPECTED_IN_DATA = True

    # Skip some validation checks, because there will be multiple rows per tract in this
    # geocorr dataset.
    VALIDATE_SHOULD_SKIP_DUPLICATE_GEOGRAPHIES_AND_GEOGRAPHY_COUNT = True

    CRS_INTEGER = 3857

    ZCTA_2020_SHAPEFILE_PATH = (
        "https://www2.census.gov/geo/tiger/GENZ2020/shp"
        + "/cb_2020_us_zcta520_500k.zip"
    )

    ZIP_CODE_INPUT_FIELD = "ZCTA5CE20"
    AREA_JOINED_FIELD = "area_joined"
    AREA_ZIP_FIELD = "area_zip"

    def __init__(self):
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.ZIP_CODE,
            field_names.PERCENT_OF_ZIP_CODE_IN_TRACT,
            self.AREA_JOINED_FIELD,
            self.AREA_ZIP_FIELD,
        ]

        self.output_df: pd.DataFrame
        self.census_tract_gdf: gpd.GeoDataFrame

    def extract(self) -> None:
        # Download 2020 zip boundaries.
        unzip_file_from_url(
            file_url=self.ZCTA_2020_SHAPEFILE_PATH,
            download_path=self.get_tmp_path(),
            unzipped_file_path=self.get_tmp_path() / "cb_2020_us_zcta520_500k",
            verify=True,
        )

        # Load census
        self.census_tract_gdf = get_tract_geojson()

    def transform(self) -> None:
        logger.info("Starting GeoCorr alternatives transforms.")

        # Read in ZCTA data.
        zcta_2020_gdf = gpd.read_file(
            filename=self.get_tmp_path() / "cb_2020_us_zcta520_500k"
        )
        zcta_2020_gdf = zcta_2020_gdf.rename(
            columns={self.ZIP_CODE_INPUT_FIELD: field_names.ZIP_CODE},
            errors="raise",
        )

        # Switch from geographic to projected CRSes
        # because logically that's right
        self.census_tract_gdf = self.census_tract_gdf.to_crs(
            crs=self.CRS_INTEGER
        )
        zcta_2020_gdf = zcta_2020_gdf.to_crs(crs=self.CRS_INTEGER)

        # Calculate percentage overlap.
        # Create a measure of area for the entire Zip area.
        zcta_2020_gdf[self.AREA_ZIP_FIELD] = zcta_2020_gdf.area

        # Perform overlay function.
        # We have a mix of polygons and multipolygons, and we just want the overlaps
        # without caring a ton about the specific types, so we ignore geom type.
        # Realistically, this changes almost nothing in the calculation; True and False
        # are the same within 9 digits of precision.
        joined_gdf = gpd.overlay(
            df1=zcta_2020_gdf,
            df2=self.census_tract_gdf,
            how="intersection",
            keep_geom_type=False,
        )

        # Calculating the areas of the newly-created overlapping geometries
        joined_gdf[self.AREA_JOINED_FIELD] = joined_gdf.area

        # Calculating the areas of the newly-created geometries in relation
        # to the original tract geometries
        joined_gdf[field_names.PERCENT_OF_ZIP_CODE_IN_TRACT] = (
            joined_gdf[self.AREA_JOINED_FIELD] / joined_gdf[self.AREA_ZIP_FIELD]
        )

        self.output_df = joined_gdf
