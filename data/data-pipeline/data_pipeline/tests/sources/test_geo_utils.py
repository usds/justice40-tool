from collections import namedtuple
from pathlib import Path

import geopandas as gpd
from data_pipeline.etl.sources.geo_utils import add_tracts_for_geometries


def test_add_tracts_for_geometries():
    field_names = ["latitude", "longitude", "expected_geoid"]
    DataPoint = namedtuple("DataPoint", field_names)
    # Pulled the tract IDs from the census geocoder
    records = [
        DataPoint(33.75649254612824, -84.39215035031984, "13121011900"),
        DataPoint(34.05289139656212, -118.2402117966315, "06037207400"),
        DataPoint(42.357500146415475, -71.0563146836545, "25025030300"),
        DataPoint(30.368185144529168, -89.0930992763473, "28047003800"),
    ]
    df = gpd.GeoDataFrame.from_records(records, columns=field_names)
    df = gpd.GeoDataFrame(
        df,
        geometry=gpd.points_from_xy(
            x=df["longitude"],
            y=df["latitude"],
        ),
        crs="epsg:4326",
    )

    # Use fixtures for tract data.
    tract_data_path = Path(__file__).parent / "data" / "us.geojson"
    tract_data = gpd.read_file(tract_data_path)

    enriched_df = add_tracts_for_geometries(df, tract_data=tract_data)
    assert (df["expected_geoid"] == enriched_df["GEOID10_TRACT"]).all()
