import os
from pathlib import Path
from typing import List
import censusdata
import pandas as pd
import geopandas as gpd

from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

CENSUS_ACS_FIPS_CODES_TO_SKIP = ["60", "66", "69", "78"]


def _fips_from_censusdata_censusgeo(censusgeo: censusdata.censusgeo) -> str:
    """Create a FIPS code from the proprietary censusgeo index."""
    fips = "".join([value for (key, value) in censusgeo.params()])
    return fips


def impute_by_geographic_neighbors(
    impute_var_named_tup_list: list,
    geo_df: gpd.GeoDataFrame,
    geoid_field: str,
    county_bool: bool = True,
    county: str = "COUNTYFP10",
    state: str = "GEOID2",
) -> pd.DataFrame:
    """Impute values based on geographic neighbors

    We only want to check neighbors a single time, so all variables
    that we impute get imputed here.

    Takes in:
        required:
            impute_var_named_tup_list: list of named tuples (imputed field, raw field)
            geo_df: geo dataframe that already has the census shapefiles merged
            geoid field: tract level ID
        optional:
            county_bool: boolean for county (whether to impute using the county when there are county neighbors)
                default true
            county: county field
            state: state field
                default county and state fields are from ACS.

    Returns: non-geometry pd.DataFrame
    """
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
    logger.info(f"Imputing values for {len(tract_list)} unique tracts.")
    assert len(tract_list) > 0, "Error: No missing values to impute"

    # Impute variables based on geographic neighbors
    # for now, iterate through df rows
    # This is quite complicated, but there's no other way to do this in a manageable way,
    # since the compute time for neighbors is expensive
    for index, row in geo_df.iterrows():
        if row[geoid_field] in tract_list:
            neighbor_mask = geo_df["geometry"].touches(row["geometry"])

            # we only impute if the variable is NaN, but we also only want to calculate
            # neighbors a single time
            for impute_var_pair in impute_var_named_tup_list:
                logger.info(impute_var_pair)
                # use the neighbor mask if you can!
                if any(
                    geo_df[neighbor_mask][
                        impute_var_pair.raw_field_name
                    ].notna()
                ):
                    mask = neighbor_mask

                # if you can't...
                else:
                    # prepare to use the state mask
                    mask = geo_df[geoid_field].str[:2] == row[geoid_field][:2]

                    # unless county-level data is specified AND has non-null values
                    if county_bool:
                        county_mask = (geo_df[county] == row[county]) & (
                            geo_df[state] == row[state]
                        )
                        assert (
                            geo_df[county_mask][geoid_field].str[:2].nunique()
                            == 1
                        ), "Error: County field is not unique"

                        if any(
                            geo_df[county_mask][
                                impute_var_pair.raw_field_name
                            ].notna()
                        ):
                            mask = county_mask

                geo_df.loc[index, impute_var_pair.imputed_field_name] = geo_df[
                    mask
                ][impute_var_pair.raw_field_name].mean()

    # get rid of the geometry column and cast as a typical df
    df = pd.DataFrame(
        geo_df[[col for col in geo_df.columns if col != "geometry"]]
    )

    logger.info("Finalizing imputation...")
    # finalize imputation so that ONLY fields with NaN get included
    for impute_var_pair in impute_var_named_tup_list:
        geo_df[impute_var_pair.imputed_field_name] = geo_df[
            impute_var_pair.raw_field_name
        ].fillna(geo_df[impute_var_pair.imputed_field_name])

    # finally, return the df
    return df


# pylint: disable=too-many-arguments
def retrieve_census_acs_data(
    acs_year: int,
    variables: List[str],
    tract_output_field_name: str,
    data_path_for_fips_codes: Path,
    acs_type="acs5",
) -> pd.DataFrame:
    """Retrieves and combines census ACS data for a given year."""
    dfs = []
    for fips in get_state_fips_codes(data_path_for_fips_codes):
        if fips in CENSUS_ACS_FIPS_CODES_TO_SKIP:
            logger.info(
                f"Skipping download for state/territory with FIPS code {fips}"
            )
        else:
            census_api_key = ""
            if os.environ.get("CENSUS_API_KEY"):
                census_api_key = "with API key"
            logger.info(
                f"Downloading data for state/territory with FIPS code {fips} {census_api_key}"
            )

            try:
                response = censusdata.download(
                    src=acs_type,
                    year=acs_year,
                    geo=censusdata.censusgeo(
                        [("state", fips), ("county", "*"), ("tract", "*")]
                    ),
                    var=variables,
                    key=os.environ.get("CENSUS_API_KEY"),
                )
                dfs.append(response)

            except ValueError as e:
                logger.error(
                    f"Could not download data for state/territory with FIPS code {fips}"
                )
                raise e

    df = pd.concat(dfs)

    df[tract_output_field_name] = df.index.to_series().apply(
        func=_fips_from_censusdata_censusgeo
    )

    return df
