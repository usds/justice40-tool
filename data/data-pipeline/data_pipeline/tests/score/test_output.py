# flake8: noqa: W0613,W0611,F811,
# pylint: disable=unused-import,too-many-arguments
from dataclasses import dataclass
from typing import List
import pytest
import pandas as pd
import numpy as np
from data_pipeline.score import field_names
from data_pipeline.score.field_names import GEOID_TRACT_FIELD
from .fixtures import (
    final_score_df,
    ejscreen_df,
    hud_housing_df,
    census_df,
    cdc_places_df,
    census_acs_median_incomes_df,
    cdc_life_expectancy_df,
    doe_energy_burden_df,
    national_risk_index_df,
    dot_travel_disadvantage_df,
    fsf_fire_df,
    nature_deprived_df,
    eamlis_df,
    fuds_df,
    geocorr_urban_rural_df,
    census_decennial_df,
    census_2010_df,
    hrs_df,
    national_tract_df,
)


pytestmark = pytest.mark.smoketest
UNMATCHED_TRACT_THRESHOLD = 1000


def _helper_test_count_exceeding_threshold(df, col, error_check=1000):
    """Fills NA with False"""
    return df[df[col].fillna(False)].shape[0] >= error_check


def _helper_single_threshold_test(df, col, socioeconomic_column, score_column):
    """Note that this fills nulls in the threshold column where nulls exist"""
    nulls_dont_exist = (
        df[df[col].fillna(False) & df[socioeconomic_column]][score_column]
        .isna()
        .sum()
        == 0
    )
    only_trues = df[df[col].fillna(False) & df[socioeconomic_column]][
        score_column
    ].min()
    return nulls_dont_exist, only_trues


@dataclass
class ThresholdTestConfig:
    name: str
    threshhold_columns: List[str]
    ses_column_name: str = field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED
    score_column_name: str = field_names.SCORE_N_COMMUNITIES

    @property
    def error_message(self):
        return f"Eligibility columns have an error, {self.name}"


def check_for_threshhold_errors(
    df: pd.DataFrame, config: ThresholdTestConfig
) -> List[str]:
    errors = []
    for col in config.threshhold_columns:
        nulls_dont_exist, only_trues = _helper_single_threshold_test(
            df,
            col,
            config.ses_column_name,
            config.score_column_name,
        )
        proper_threshold_identification = (
            _helper_test_count_exceeding_threshold(df, col)
        )
        if not nulls_dont_exist:
            errors.append(
                f"For {col}, threshold is not calculated right -- there are NaNs in Score"
            )
        if not only_trues:
            errors.append(
                f"For {col} and {config.ses_column_name}, threshold is not calculated right "
                f"-- there are Falses where there should only be Trues"
            )
        if not proper_threshold_identification:
            errors.append(
                f"Threshold {col} returns too few tracts, are you sure it's nationally-representative?"
            )
    if errors:
        errors.append(config.error_message)
    return errors


def test_threshholds(final_score_df):
    climate_thresholds = ThresholdTestConfig(
        "climate",
        [
            field_names.EXPECTED_POPULATION_LOSS_EXCEEDS_PCTILE_THRESHOLD,
            field_names.EXPECTED_AGRICULTURAL_LOSS_EXCEEDS_PCTILE_THRESHOLD,
            field_names.EXPECTED_BUILDING_LOSS_EXCEEDS_PCTILE_THRESHOLD,
            field_names.HIGH_FUTURE_FLOOD_RISK_FIELD,
            field_names.HIGH_FUTURE_WILDFIRE_RISK_FIELD,
        ],
    )
    energy_thresholds = ThresholdTestConfig(
        "energy",
        [
            field_names.ENERGY_BURDEN_EXCEEDS_PCTILE_THRESHOLD,
            field_names.PM25_EXCEEDS_PCTILE_THRESHOLD,
        ],
    )
    transportation_thresholds = ThresholdTestConfig(
        "transportation",
        [
            field_names.DIESEL_EXCEEDS_PCTILE_THRESHOLD,
            field_names.DOT_BURDEN_PCTILE_THRESHOLD,
            field_names.TRAFFIC_PROXIMITY_PCTILE_THRESHOLD,
        ],
    )
    housing_thresholds = ThresholdTestConfig(
        "housing",
        [
            field_names.HISTORIC_REDLINING_SCORE_EXCEEDED,
            field_names.NO_KITCHEN_OR_INDOOR_PLUMBING_PCTILE_THRESHOLD,
            field_names.LEAD_PAINT_PROXY_PCTILE_THRESHOLD,
            field_names.HOUSING_BURDEN_PCTILE_THRESHOLD,
            field_names.NON_NATURAL_PCTILE_THRESHOLD,
        ],
    )
    pollution_thresholds = ThresholdTestConfig(
        "pollution",
        [
            field_names.RMP_PCTILE_THRESHOLD,
            field_names.NPL_PCTILE_THRESHOLD,
            field_names.TSDF_PCTILE_THRESHOLD,
            field_names.AML_BOOLEAN,
            field_names.ELIGIBLE_FUDS_BINARY_FIELD_NAME,
        ],
    )
    water_thresholds = ThresholdTestConfig(
        "water",
        [
            field_names.WASTEWATER_PCTILE_THRESHOLD,
            field_names.UST_PCTILE_THRESHOLD,
        ],
    )
    health_thresholds = ThresholdTestConfig(
        "health",
        [
            field_names.DIABETES_PCTILE_THRESHOLD,
            field_names.ASTHMA_PCTILE_THRESHOLD,
            field_names.HEART_DISEASE_PCTILE_THRESHOLD,
            field_names.LOW_LIFE_EXPECTANCY_PCTILE_THRESHOLD,
        ],
    )
    workforce_base_thresholds = ThresholdTestConfig(
        "workforce (not island areas)",
        [
            field_names.UNEMPLOYMENT_PCTILE_THRESHOLD,
            field_names.LOW_MEDIAN_INCOME_PCTILE_THRESHOLD,
            field_names.LINGUISTIC_ISOLATION_PCTILE_THRESHOLD,
            field_names.POVERTY_PCTILE_THRESHOLD,
        ],
        ses_column_name=field_names.LOW_HS_EDUCATION_FIELD,
    )
    errors = []
    for threshhold_config in [
        climate_thresholds,
        energy_thresholds,
        transportation_thresholds,
        housing_thresholds,
        pollution_thresholds,
        water_thresholds,
        health_thresholds,
        workforce_base_thresholds,
    ]:
        errors.extend(
            check_for_threshhold_errors(final_score_df, threshhold_config)
        )
    error_text = "\n".join(errors)
    assert not errors, error_text


def test_max_40_percent_DAC(final_score_df):
    score_col_with_donuts = field_names.FINAL_SCORE_N_BOOLEAN
    total_population_col = field_names.TOTAL_POP_FIELD
    assert (
        final_score_df[score_col_with_donuts].isna().sum() == 0
    ), f"Error: {score_col_with_donuts} contains NULLs"
    assert (
        final_score_df[final_score_df[score_col_with_donuts]][
            total_population_col
        ].sum()
        / final_score_df[total_population_col].sum()
    ) < 0.4, "Error: the scoring methodology identifies >40% of people in  the US as disadvantaged"
    assert (
        final_score_df[score_col_with_donuts].sum() > 0
    ), "FYI: You've identified no tracts at all!"


def test_donut_hole_addition_to_score_n(final_score_df):
    score_col_with_donuts = field_names.FINAL_SCORE_N_BOOLEAN
    score_col = field_names.SCORE_N_COMMUNITIES
    donut_hole_score_only = (
        field_names.SCORE_N_COMMUNITIES + field_names.ADJACENT_MEAN_SUFFIX
    )
    count_donuts = final_score_df[donut_hole_score_only].sum()
    count_n = final_score_df[score_col].sum()
    count_n_with_donuts = final_score_df[score_col_with_donuts].sum()
    new_donuts = final_score_df[
        final_score_df[donut_hole_score_only] & ~final_score_df[score_col]
    ].shape[0]

    assert (
        new_donuts + count_n == count_n_with_donuts
    ), "The math doesn't work! The number of new donut hole tracts plus score tracts (base) does not equal the total number of tracts identified"

    assert (
        count_donuts < count_n
    ), "There are more donut hole tracts than base tracts. How can it be?"

    assert (
        new_donuts > 0
    ), "FYI: The adjacency index is doing nothing. Consider removing it?"


def test_data_sources(
    final_score_df,
    hud_housing_df,
    ejscreen_df,
    census_df,
    cdc_places_df,
    census_acs_median_incomes_df,
    cdc_life_expectancy_df,
    doe_energy_burden_df,
    national_risk_index_df,
    dot_travel_disadvantage_df,
    fsf_fire_df,
    nature_deprived_df,
    eamlis_df,
    fuds_df,
    geocorr_urban_rural_df,
    census_decennial_df,
    census_2010_df,
    hrs_df,
):
    data_sources = {
        key: value for key, value in locals().items() if key != "final_score_df"
    }

    # For each data source that's injected via the fixtures, do the following:
    # * Ensure at least one column from the source shows up in the score
    # * Ensure any tracts NOT in the data source are NA/null in the score
    # * Ensure the data source doesn't have a large number of tract IDs that are not
    #   included in the final score, since that implies the source is using 2020
    #   tract IDs
    # * Verify that the data from the source that's in the final score output
    #   is the "equal" to the data from the ETL, allowing for the minor
    #   differences that come from floating point comparisons
    for data_source_name, data_source in data_sources.items():
        final = "final_"
        df: pd.DataFrame = final_score_df.merge(
            data_source,
            on=GEOID_TRACT_FIELD,
            indicator="MERGE",
            suffixes=(final, f"_{data_source_name}"),
            how="outer",
        )

        # Make our lists of columns for later comparison
        core_cols = data_source.columns.intersection(
            final_score_df.columns
        ).drop(GEOID_TRACT_FIELD)
        data_source_columns = [f"{col}_{data_source_name}" for col in core_cols]
        final_columns = [f"{col}{final}" for col in core_cols]
        assert (
            final_columns
        ), f"No columns from data source show up in final score in source {data_source_name}"

        # Make sure we have NAs for any tracts in the final data that aren't
        # included in the data source
        assert np.all(df[df.MERGE == "left_only"][final_columns].isna())

        # Make sure the datasource doesn't have a ton of unmatched tracts, implying it
        # has moved to 2020 tracts
        assert len(df[df.MERGE == "right_only"]) < UNMATCHED_TRACT_THRESHOLD

        df = df[df.MERGE == "both"]

        # Compare every column for equality, using close equality for numerics and
        # `equals` equality for non-numeric columns
        for final_column, data_source_column in zip(
            data_source_columns, final_columns
        ):
            error_message = (
                f"Column {final_column} not equal "
                f"between {data_source_name} and final score"
            )
            # For non-numeric types, we can use the built-in equals from pandas
            if df[final_column].dtype in [
                np.dtype(object),
                np.dtype(bool),
                np.dtype(str),
            ]:
                assert df[final_column].equals(
                    df[data_source_column]
                ), error_message
            # For numeric sources, use np.close so we don't get harmed by
            # float equaity weirdness
            else:
                assert np.allclose(
                    df[final_column],
                    df[data_source_column],
                    equal_nan=True,
                ), error_message


def test_output_tracts(final_score_df, national_tract_df):
    df = final_score_df.merge(
        national_tract_df,
        on=GEOID_TRACT_FIELD,
        how="outer",
        indicator="MERGE",
    )
    counts = df.value_counts("MERGE")
    assert counts.loc["left_only"] == 0
    assert counts.loc["right_only"] == 0


def test_all_tracts_have_scores(final_score_df):
    assert not final_score_df[field_names.SCORE_N_COMMUNITIES].isna().any()
