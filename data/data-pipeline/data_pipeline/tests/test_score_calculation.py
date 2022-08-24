from ast import PyCF_TYPE_COMMENTS
from pathlib import Path
import pandas as pd
import pytest
import data_pipeline.score.field_names as field_names
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings
from data_pipeline.score.score_narwhal import ScoreNarwhal

logger = get_module_logger(__name__)


@pytest.fixture
def donut_hole_adjacency_parameters():
    """Test that donut indicator uses the right threshold"""
    return (
        # threshold boolean
        field_names.ADJACENT_TRACT_SCORE_ABOVE_DONUT_THRESHOLD,
        # percentile equivalent column
        field_names.SCORE_N_COMMUNITIES + field_names.ADJACENCY_INDEX_SUFFIX,
        # threshold
        ScoreNarwhal(final_score_df).SCORE_THRESHOLD_DONUT,
    )


@pytest.fixture
def donut_hole_income_threshold_and_column():
    """Test that donut income uses the right threshold"""
    return (
        # threshold
        ScoreNarwhal(final_score_df).LOW_INCOME_THRESHOLD_DONUT,
        field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED_DONUTS,
    )


@pytest.fixture
def final_score_df():
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "full" / "usa.csv",
        dtype={field_names.GEOID_TRACT_FIELD: str},
    )


@pytest.fixture
def low_income_threshold():
    return ScoreNarwhal(final_score_df).LOW_INCOME_THRESHOLD


@pytest.fixture
def low_income_percentile():
    return (
        field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED,
        field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX,
    )


@pytest.fixture
def low_hs_threshold():
    return ScoreNarwhal(final_score_df).LACK_OF_HIGH_SCHOOL_MINIMUM_THRESHOLD


@pytest.fixture
def low_hs_percent():
    return field_names.LOW_HS_EDUCATION_FIELD, field_names.HIGH_SCHOOL_ED_FIELD


@pytest.fixture
def env_percentile_threshold():
    return ScoreNarwhal(final_score_df).ENVIRONMENTAL_BURDEN_THRESHOLD


# Climate factor thresholds
@pytest.fixture
def expected_pop_loss_percentile_columns():
    return [
        field_names.EXPECTED_POPULATION_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX,
    ]


@pytest.fixture
def expected_ag_loss_percentile_columns():
    return [
        field_names.EXPECTED_AGRICULTURAL_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX,
    ]


@pytest.fixture
def expected_bldg_loss_percentile_columns():
    return [
        field_names.EXPECTED_BUILDING_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX,
    ]


@pytest.fixture
def expected_flood_percentile_columns():
    return [
        field_names.HIGH_FUTURE_FLOOD_RISK_FIELD,
        field_names.FUTURE_FLOOD_RISK_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX,
    ]


@pytest.fixture
def expected_wildfire_percentile_columns():
    return [
        field_names.HIGH_FUTURE_WILDFIRE_RISK_FIELD,
        field_names.FUTURE_WILDFIRE_RISK_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX,
    ]


@pytest.fixture
def score_col():
    return field_names.SCORE_N_COMMUNITIES


@pytest.fixture
def score_col_with_donuts():
    return field_names.FINAL_SCORE_N_BOOLEAN


@pytest.fixture
def lead_paint_columns():
    """Returns lead paint percentile column, Median house value percentile column,
    and thresholded boolean column for the proxy (in order).
    Does not return thresholds
    """
    return [
        field_names.LEAD_PAINT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
        field_names.MEDIAN_HOUSE_VALUE_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX,
        field_names.LEAD_PAINT_PROXY_PCTILE_THRESHOLD,
    ]


@pytest.fixture
def lead_paint_proxy_home_value_threshold():
    return ScoreNarwhal(final_score_df).MEDIAN_HOUSE_VALUE_THRESHOLD


### TODO: we need to blow this out for all eight categories
def _helper_test_percentile_against_threshold(
    df, pctile_column, thresholded_column, threshold
):
    """Note - for the purpose of testing, this fills with False"""
    minimum_flagged = (
        df[df[thresholded_column].fillna(False)][pctile_column].min()
        >= threshold
    )

    maximum_not_flagged = (
        df[~df[thresholded_column].fillna(False)][pctile_column].max()
        < threshold
    )
    assert (
        minimum_flagged
    ), f"For column {thresholded_column}, there is someone flagged below {threshold} percentile!"
    assert (
        maximum_not_flagged
    ), f"For column {thresholded_column}, there is someone not flagged above {threshold} percentile!"
    return True


def test_expected_pop_loss_percentile_columns(
    expected_pop_loss_percentile_columns,
    final_score_df,
    env_percentile_threshold,
):
    thresholded_column, pctile_column = expected_pop_loss_percentile_columns
    _helper_test_percentile_against_threshold(
        final_score_df,
        pctile_column,
        thresholded_column,
        env_percentile_threshold,
    )


def test_expected_ag_loss_percentile_columns(
    expected_ag_loss_percentile_columns,
    final_score_df,
    env_percentile_threshold,
):
    thresholded_column, pctile_column = expected_ag_loss_percentile_columns
    _helper_test_percentile_against_threshold(
        final_score_df,
        pctile_column,
        thresholded_column,
        env_percentile_threshold,
    )


def test_expected_bldg_loss_percentile_columns(
    expected_bldg_loss_percentile_columns,
    final_score_df,
    env_percentile_threshold,
):
    thresholded_column, pctile_column = expected_bldg_loss_percentile_columns
    _helper_test_percentile_against_threshold(
        final_score_df,
        pctile_column,
        thresholded_column,
        env_percentile_threshold,
    )


def test_expected_flood_percentile_columns(
    expected_flood_percentile_columns,
    final_score_df,
    env_percentile_threshold,
):
    thresholded_column, pctile_column = expected_flood_percentile_columns
    _helper_test_percentile_against_threshold(
        final_score_df,
        pctile_column,
        thresholded_column,
        env_percentile_threshold,
    )


def test_expected_wildfire_percentile_columns(
    expected_wildfire_percentile_columns,
    final_score_df,
    env_percentile_threshold,
):
    thresholded_column, pctile_column = expected_wildfire_percentile_columns
    _helper_test_percentile_against_threshold(
        final_score_df,
        pctile_column,
        thresholded_column,
        env_percentile_threshold,
    )


def test_low_income_threshold(
    final_score_df, low_income_percentile, low_income_threshold
):
    print(low_income_threshold)
    return _helper_test_percentile_against_threshold(
        final_score_df,
        low_income_percentile[1],
        low_income_percentile[0],
        low_income_threshold,
    )


def test_low_hs_threshold(final_score_df, low_hs_percent, low_hs_threshold):
    return _helper_test_percentile_against_threshold(
        final_score_df, low_hs_percent[1], low_hs_percent[0], low_hs_threshold
    )


def test_donut_hole_thresholds(
    final_score_df,
    donut_hole_adjacency_parameters,
    donut_hole_income_threshold_and_column,
    low_income_percentile,
):
    """We do it all! Check donut income and adjacency thresholds, and then that
    the score column is calculated properly"""
    _, inc_value_column = low_income_percentile
    inc_threshold, inc_thresh_column = donut_hole_income_threshold_and_column
    assert _helper_test_percentile_against_threshold(
        final_score_df, inc_value_column, inc_thresh_column, inc_threshold
    ), "Donut hole adjacency threshold is miscalculated"
    (
        adj_thresh_column,
        adj_value_column,
        adj_threshold,
    ) = donut_hole_adjacency_parameters
    assert _helper_test_percentile_against_threshold(
        final_score_df, adj_value_column, adj_thresh_column, adj_threshold
    ), "Donut hole low income threshold is miscalculated"
    return True


def test_lead_paint_indicator(
    final_score_df,
    lead_paint_columns,
    lead_paint_proxy_home_value_threshold,
    env_percentile_threshold,
):
    """We need special logic here because this is a combined threshold, so we need this test to have two parts.

    1. We construct our own threshold columns
    2. We make sure it's the same as the threshold column in the dataframe
    """
    lead_pfs, home_val_pfs, combined_proxy_boolean = lead_paint_columns
    home_threshold = lead_paint_proxy_home_value_threshold

    tmp_lead_threshold = final_score_df[lead_pfs] >= env_percentile_threshold
    tmp_mhv_threshold = final_score_df[home_val_pfs] <= home_threshold

    true_combined_proxy = tmp_lead_threshold & tmp_mhv_threshold

    assert (
        tmp_mhv_threshold.sum() > 0
    ), "MHV threshold alone does not capture any homes"

    assert final_score_df[combined_proxy_boolean].equals(
        true_combined_proxy
    ), "Lead proxy calculated improperly"
    assert (
        tmp_lead_threshold.sum() > true_combined_proxy.sum()
    ), "House value is not further limiting this proxy"
