from typing import List, NamedTuple
import pandas as pd
import geopandas as gpd

from data_pipeline.utils import get_module_logger

# pylint: disable=unsubscriptable-object

logger = get_module_logger(__name__)


def _get_fips_mask(
    geo_df: gpd.GeoDataFrame,
    row: gpd.GeoSeries,
    fips_digits: int,
    geoid_field: str = "GEOID10_TRACT",
) -> pd.Series:
    return (
        geo_df[geoid_field].str[:fips_digits] == row[geoid_field][:fips_digits]
    )


def _get_neighbor_mask(
    geo_df: gpd.GeoDataFrame, row: gpd.GeoSeries
) -> pd.Series:
    return geo_df["geometry"].touches(row["geometry"])


def _choose_best_mask(
    geo_df: gpd.GeoDataFrame,
    masks_in_priority_order: List[pd.Series],
    column_to_impute: str,
) -> pd.Series:
    for mask in masks_in_priority_order:
        if any(geo_df[mask][column_to_impute].notna()):
            return mask
    raise Exception("No mask found")


def _prepare_dataframe_for_imputation(
    impute_var_named_tup_list: List[NamedTuple],
    geo_df: gpd.GeoDataFrame,
    geoid_field: str = "GEOID10_TRACT",
) -> tuple[list, gpd.GeoDataFrame]:
    imputing_cols = [
        impute_var_pair.raw_field_name
        for impute_var_pair in impute_var_named_tup_list
    ]

    # prime column to exist
    for impute_var_pair in impute_var_named_tup_list:
        geo_df[impute_var_pair.imputed_field_name] = geo_df[
            impute_var_pair.raw_field_name
        ].copy()

    # generate a list of tracts for which at least one of the imputation
    # columns is null
    tract_list = geo_df[geo_df[imputing_cols].isna().any(axis=1)][
        geoid_field
    ].unique()

    # Check that imputation is a valid choice for this set of fields
    logger.info(f"Imputing values for {len(tract_list)} unique tracts.")
    assert len(tract_list) > 0, "Error: No missing values to impute"

    return tract_list, geo_df


def calculate_income_measures(
    impute_var_named_tup_list: list,
    geo_df: gpd.GeoDataFrame,
    geoid_field: str,
) -> pd.DataFrame:
    """Impute values based on geographic neighbors

    We only want to check neighbors a single time, so all variables
    that we impute get imputed here.

    Takes in:
        required:
            impute_var_named_tup_list: list of named tuples (imputed field, raw field)
            geo_df: geo dataframe that already has the census shapefiles merged
            geoid field: tract level ID

    Returns: non-geometry pd.DataFrame
    """
    # Determine where to impute variables and fill a column with nulls
    tract_list, geo_df = _prepare_dataframe_for_imputation(
        impute_var_named_tup_list=impute_var_named_tup_list,
        geo_df=geo_df,
        geoid_field=geoid_field,
    )

    # Iterate through the dataframe to impute in place
    ## TODO: We should probably convert this to a spatial join now that we are doing >1 imputation and it's taking a lot
    ## of time, but thinking through how to do this while maintaining the masking will take some time. I think the best
    ## way would be to (1) spatial join to all neighbors, and then (2) iterate to take the "smallest" set of neighbors...
    ## but haven't implemented it yet.
    for index, row in geo_df.iterrows():
        if row[geoid_field] in tract_list:
            neighbor_mask = _get_neighbor_mask(geo_df, row)
            county_mask = _get_fips_mask(
                geo_df=geo_df, row=row, fips_digits=5, geoid_field=geoid_field
            )
            state_mask = _get_fips_mask(
                geo_df=geo_df, row=row, fips_digits=2, geoid_field=geoid_field
            )

            # Impute fields for every row missing at least one value using the best possible set of neighbors
            # Note that later, we will pull raw.fillna(imputed), so the mechanics of this step aren't critical
            for impute_var_pair in impute_var_named_tup_list:
                mask_to_use = _choose_best_mask(
                    geo_df=geo_df,
                    masks_in_priority_order=[
                        neighbor_mask,
                        county_mask,
                        state_mask,
                    ],
                    column_to_impute=impute_var_pair.raw_field_name,
                )
                geo_df.loc[index, impute_var_pair.imputed_field_name] = geo_df[
                    mask_to_use
                ][impute_var_pair.raw_field_name].mean()

    logger.info("Casting geodataframe as a typical dataframe")
    # get rid of the geometry column and cast as a typical df
    df = pd.DataFrame(
        geo_df[[col for col in geo_df.columns if col != "geometry"]]
    )

    # finally, return the df
    return df
