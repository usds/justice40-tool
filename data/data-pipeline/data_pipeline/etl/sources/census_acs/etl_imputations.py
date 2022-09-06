import pandas as pd
import geopandas as gpd
from data_pipeline.score.field_names import GEOID_TRACT_FIELD
import numpy as np

from data_pipeline.utils import get_module_logger

# pylint: disable=unsubscriptable-object

logger = get_module_logger(__name__)


def _prepare_dataframe_for_imputation(
    columns_to_impute: list,
    geo_df: gpd.GeoDataFrame,
    geoid_field: str = "GEOID10_TRACT",
):

    # generate a list of tracts for which at least one of the imputation
    # columns is null
    tract_list = geo_df[geo_df[columns_to_impute].isna().any(axis=1)][
        geoid_field
    ].unique()

    # Check that imputation is a valid choice for this set of fields
    logger.info(f"Imputing values for {len(tract_list)} unique tracts.")
    assert len(tract_list) > 0, "Error: No missing values to impute"

    return tract_list, geo_df


def _get_state_and_county_fills(df, tract_list, impute_var_pair_list):
    # When there is no neighbor average, we take the county-level average or state-level averages
    for impute_var_pair in impute_var_pair_list:
        # Fill missings with county means
        df[impute_var_pair.imputed_field_name] = np.where(
            (df[impute_var_pair.imputed_field_name].isna())
            & (df[GEOID_TRACT_FIELD].isin(tract_list)),
            df.groupby(df[GEOID_TRACT_FIELD].str[:5])[
                impute_var_pair.raw_field_name
            ].transform(np.mean),
            df[impute_var_pair.imputed_field_name],
        )
        # Fill the remaining missings with state means
        df[impute_var_pair.imputed_field_name] = np.where(
            (df[impute_var_pair.imputed_field_name].isna())
            & (df[GEOID_TRACT_FIELD].isin(tract_list)),
            df.groupby(df[GEOID_TRACT_FIELD].str[:2])[
                impute_var_pair.raw_field_name
            ].transform(np.mean),
            df[impute_var_pair.imputed_field_name],
        )
    return df


def calculate_income_measures(
    impute_var_named_tup_list: list,
    geo_df: gpd.GeoDataFrame,
    geoid_field: str,
) -> pd.DataFrame:
    """Impute values based on geographic neighbors or county fields.

    Takes in:
        required:
            impute_var_named_tup_list: list of named tuples (imputed field, raw field)
            geo_df: geo dataframe that already has the census shapefiles merged
            geoid field: tract level ID

    Returns: non-geometry pd.DataFrame
    """

    raw_fields = []
    imputed_fields = []
    rename_dict = {}
    for impute_var in impute_var_named_tup_list:
        raw_fields.append(impute_var.raw_field_name)
        imputed_fields.append(impute_var.imputed_field_name)

        assert (
            impute_var.raw_field_name not in rename_dict
        ), f"Error: trying to impute {impute_var.raw_field_name} twice"
        rename_dict[impute_var.raw_field_name] = impute_var.imputed_field_name

    # Determine where to impute variables and fill a column with nulls
    tract_list, geo_df = _prepare_dataframe_for_imputation(
        columns_to_impute=raw_fields,
        geo_df=geo_df,
        geoid_field=geoid_field,
    )

    missing_tracts_df = geo_df[geo_df[GEOID_TRACT_FIELD].isin(tract_list)]

    # Perform as spatial merge to save time
    spatially_joined_df = missing_tracts_df[
        [GEOID_TRACT_FIELD, "geometry"]
    ].sjoin(
        geo_df[raw_fields + ["geometry"]],
        predicate="touches",
    )

    # First take the neighbor averages
    neighbor_averages_df = (
        spatially_joined_df.groupby(GEOID_TRACT_FIELD)[raw_fields]
        .mean()
        .reset_index()
        .rename(columns=rename_dict)
    )

    logger.info("Merging and casting geodataframe as a typical dataframe")
    # get rid of the geometry column and cast as a typical df
    df = pd.DataFrame(
        geo_df[[col for col in geo_df.columns if col != "geometry"]].merge(
            neighbor_averages_df,
            on=[GEOID_TRACT_FIELD],
            how="outer",
        )
    )
    logger.info(df.head())

    logger.info("Filling with county or state")
    df = _get_state_and_county_fills(df, tract_list, impute_var_named_tup_list)
    logger.info(df.head())

    # finally, return the df
    return df
