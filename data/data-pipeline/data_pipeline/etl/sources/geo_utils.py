"""Utililities for turning geographies into tracts, using census data"""

from pathlib import Path
from typing import Optional
import geopandas as gpd
from .census.etl import CensusETL


def add_tracts_for_geometries(
    df: gpd.GeoDataFrame, _tract_data_path: Optional[Path] = None
) -> gpd.GeoDataFrame:
    """Adds tract-geoids to dataframe df that contains spatial geometries

    Depends on CensusETL for the geodata to do its conversion

    Args:
        df (GeoDataFrame): a geopandas GeoDataFrame with a point geometry column
        _tract_data_path (Path): an override to directly pass a GEOJSON file of
                              tracts->Geometries, to simplify testing.

    Returns:
        GeoDataFrame: the above dataframe, with an additional GEOID10_TRACT column that
                      maps the points in DF to census tracts and a geometry column for later
                      spatial analysis
    """
    GEOJSON_PATH = _tract_data_path
    if GEOJSON_PATH is None:
        GEOJSON_PATH = CensusETL.NATIONAL_TRACT_JSON_PATH
        if not GEOJSON_PATH.exists():
            census_etl = CensusETL()
            census_etl.extract()
            census_etl.transform()
            census_etl.load()
    tract_data = gpd.read_file(GEOJSON_PATH, include_fields=["GEOID10"])
    tract_data.rename(columns={"GEOID10": "GEOID10_TRACT"}, inplace=True)
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
