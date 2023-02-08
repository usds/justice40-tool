"""Utililities for turning geographies into tracts, using census data"""
from functools import lru_cache
from pathlib import Path
from typing import Optional

import geopandas as gpd
from data_pipeline.etl.sources.tribal.etl import TribalETL
from data_pipeline.utils import get_module_logger

from .census.etl import CensusETL

logger = get_module_logger(__name__)


@lru_cache()
def get_tract_geojson(
    _tract_data_path: Optional[Path] = None,
) -> gpd.GeoDataFrame:
    logger.debug("Loading tract geometry data from census ETL")
    GEOJSON_PATH = _tract_data_path
    if GEOJSON_PATH is None:
        GEOJSON_PATH = CensusETL.NATIONAL_TRACT_JSON_PATH
    if not GEOJSON_PATH.exists():
        logger.debug("Census data has not been computed, running")
        census_etl = CensusETL()
        census_etl.extract()
        census_etl.transform()
        census_etl.load()
    tract_data = gpd.read_file(
        GEOJSON_PATH,
        include_fields=["GEOID10"],
    )
    tract_data = tract_data.rename(
        columns={"GEOID10": "GEOID10_TRACT"}, errors="raise"
    )
    return tract_data


@lru_cache()
def get_tribal_geojson(
    _tribal_data_path: Optional[Path] = None,
) -> gpd.GeoDataFrame:
    logger.debug("Loading Tribal geometry data from Tribal ETL")
    GEOJSON_PATH = _tribal_data_path
    if GEOJSON_PATH is None:
        GEOJSON_PATH = TribalETL().NATIONAL_TRIBAL_GEOJSON_PATH
    if not GEOJSON_PATH.exists():
        logger.debug("Tribal data has not been computed, running")
        tribal_etl = TribalETL()
        tribal_etl.extract()
        tribal_etl.transform()
        tribal_etl.load()
    tribal_data = gpd.read_file(
        GEOJSON_PATH,
    )
    return tribal_data


def add_tracts_for_geometries(
    df: gpd.GeoDataFrame, tract_data: Optional[gpd.GeoDataFrame] = None
) -> gpd.GeoDataFrame:
    """Adds tract-geoids to dataframe df that contains spatial geometries

    Depends on CensusETL for the geodata to do its conversion

    Args:
        df (GeoDataFrame): a geopandas GeoDataFrame with a point geometry column
        tract_data (GeoDataFrame): optional override to directly pass a
            geodataframe of the tract boundaries. Also helps simplify testing.

    Returns:
        GeoDataFrame: the above dataframe, with an additional GEOID10_TRACT column that
                      maps the points in DF to census tracts and a geometry column for later
                      spatial analysis
    """
    logger.debug("Appending tract data to dataframe")

    if tract_data is None:
        tract_data = get_tract_geojson()
    else:
        logger.debug("Using existing tract data.")

    assert (
        tract_data.crs == df.crs
    ), f"Dataframe must be projected to {tract_data.crs}"
    df = gpd.sjoin(
        df,
        tract_data[["GEOID10_TRACT", "geometry"]],
        how="inner",
        op="intersects",
    )
    return df
