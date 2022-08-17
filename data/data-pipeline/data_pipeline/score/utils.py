"""Utilities to help generate the score."""
import pandas as pd
import geopandas as gpd
import data_pipeline.score.field_names as field_names

# XXX: @jorge I am torn about the coupling that importing from
# etl.sources vs keeping the code DRY. Thoughts?
from data_pipeline.etl.sources.geo_utils import get_tract_geojson


def calculate_tract_adjacency_scores(
    df: pd.DataFrame, score_column: str
) -> pd.DataFrame:
    """Calculate the mean score of each tract in df based on its neighbors

    Args:
        df (pandas.DataFrame): A dataframe with at least the following columns:
          * field_names.GEOID_TRACT_FIELD
          * score_column

        score_column (str): The name of the column that contains the scores
                            to average
    Returns:
        df (pandas.DataFrame): A dataframe with two columns:
          * field_names.GEOID_TRACT_FIELD
          * {score_column}_ADJACENT_MEAN, which is the average of score_column for
            each tract that touches the tract identified
            in field_names.GEOID_TRACT_FIELD
    """
    ORIGINAL_TRACT = "ORIGINAL_TRACT"
    tract_data = get_tract_geojson()
    df: gpd.GeoDataFrame = tract_data.merge(
        df, on=field_names.GEOID_TRACT_FIELD
    )
    df = df.rename(columns={field_names.GEOID_TRACT_FIELD: ORIGINAL_TRACT})
    adjacent_tracts: gpd.GeoDataFrame = df.sjoin(
        tract_data, predicate="touches"
    )
    return (
        adjacent_tracts.groupby(field_names.GEOID_TRACT_FIELD)[[score_column]]
        .mean()
        .reset_index()
        .rename(
            columns={
                score_column: f"{score_column}_ADJACENT_MEAN",
            }
        )
    )
