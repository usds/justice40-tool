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
    ), f"For column {thresholded_column}, there is someone flagged below 90th percentile!"
    assert (
        maximum_not_flagged
    ), f"For column {thresholded_column}, there is someone not flagged above 90th percentile!"
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


## outstanding tests


# def test_single_percentile(
#     df: pd.DataFrame,
#     percentile_column: str,
#     exceeds_threshold_column: str,
#     threshold: float,
# ) -> None:
#     """Tests to ensure that all percentiles are weakly greater. Can also be used for socioeconomic thresholds"""
#     assert (
#         df[df[exceeds_threshold_column]][percentile_column].min() >= threshold
#     ), f"{exceeds_threshold_column} is improperly calculated from {percentile_column}; there's a value here below {threshold}"

#     assert (
#         df[~df[exceeds_threshold_column]][percentile_column].max() < threshold
#     ), f"{exceeds_threshold_column} is improperly calculated from {percentile_column}; there's a value not here above {threshold}"


# def test_category_burden():
#     """Tests that if a single combined threshold is exceeded, the category is exceeded"""
#     pass
