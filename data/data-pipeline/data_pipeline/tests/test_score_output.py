from pathlib import Path
import pandas as pd
import pytest
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings
from data_pipeline.score.score_narwhal import ScoreNarwhal

logger = get_module_logger(__name__)


# this is so slow?
@pytest.fixture
def final_score_df():
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "full" / "usa.csv",
        dtype={field_names.GEOID_TRACT_FIELD: str},
    )


# when should things be fixtures??
@pytest.fixture
def climate_thresholds():
    return [
        field_names.EXPECTED_POPULATION_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        field_names.EXPECTED_AGRICULTURAL_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        field_names.EXPECTED_BUILDING_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        field_names.HIGH_FUTURE_FLOOD_RISK_FIELD,
        field_names.HIGH_FUTURE_WILDFIRE_RISK_FIELD,
    ]


@pytest.fixture
def environmental_burden_threshold():
    # well this is bad practice
    narwhal_params = ScoreNarwhal(pd.DataFrame())
    return narwhal_params.ENVIRONMENTAL_BURDEN_THRESHOLD


@pytest.fixture
def energy_thresholds():
    return [
        field_names.ENERGY_BURDEN_EXCEEDS_PCTILE_THRESHOLD,
        field_names.PM25_EXCEEDS_PCTILE_THRESHOLD,
    ]


@pytest.fixture
def transportation_thresholds():
    return [
        field_names.DIESEL_EXCEEDS_PCTILE_THRESHOLD,
        field_names.DOT_BURDEN_PCTILE_THRESHOLD,
        field_names.TRAFFIC_PROXIMITY_PCTILE_THRESHOLD,
    ]


@pytest.fixture
def housing_thresholds():
    return [
        field_names.HISTORIC_REDLINING_SCORE_EXCEEDED,
        field_names.NO_KITCHEN_OR_INDOOR_PLUMBING_PCTILE_THRESHOLD,
        field_names.LEAD_PAINT_PROXY_PCTILE_THRESHOLD,
        field_names.HOUSING_BURDEN_PCTILE_THRESHOLD,
        field_names.NON_NATURAL_PCTILE_THRESHOLD,
    ]


@pytest.fixture
def pollution_thresholds():
    return [
        field_names.RMP_PCTILE_THRESHOLD,
        field_names.NPL_PCTILE_THRESHOLD,
        field_names.TSDF_PCTILE_THRESHOLD,
        field_names.AML_BOOLEAN,
        field_names.ELIGIBLE_FUDS_BINARY_FIELD_NAME,
    ]


@pytest.fixture
def water_thresholds():
    return [
        field_names.WASTEWATER_PCTILE_THRESHOLD,
        field_names.UST_PCTILE_THRESHOLD,
    ]


@pytest.fixture
def health_thresholds():
    return [
        field_names.DIABETES_PCTILE_THRESHOLD,
        field_names.ASTHMA_PCTILE_THRESHOLD,
        field_names.HEART_DISEASE_PCTILE_THRESHOLD,
        field_names.LOW_LIFE_EXPECTANCY_PCTILE_THRESHOLD,
    ]


## TODO: Island Area columns?
@pytest.fixture
def workforce_base_thresholds():
    return [
        field_names.UNEMPLOYMENT_PCTILE_THRESHOLD,
        field_names.LOW_MEDIAN_INCOME_PCTILE_THRESHOLD,
        field_names.LINGUISTIC_ISOLATION_PCTILE_THRESHOLD,
        field_names.POVERTY_PCTILE_THRESHOLD,
    ]


@pytest.fixture
def low_hs_ses():
    return field_names.LOW_HS_EDUCATION_FIELD


@pytest.fixture
def low_inc_ses():
    return field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED


@pytest.fixture
def score_col():
    return field_names.SCORE_N_COMMUNITIES


@pytest.fixture
def score_col_with_donuts():
    return field_names.FINAL_SCORE_N_BOOLEAN


@pytest.fixture
def total_population_col():
    return field_names.TOTAL_POP_FIELD


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


def _helper_test_thresholds(df, thresholds, ses_col, score_col_name):
    """Tests to ensure that everything that "exceeds" burden threshold and socioeconomic threshold is properly labeled a DAC"""
    for col in thresholds:
        nulls_dont_exist, only_trues = _helper_single_threshold_test(
            df, col, ses_col, score_col_name
        )
        proper_threshold_identification = (
            _helper_test_count_exceeding_threshold(df, col)
        )
        assert (
            nulls_dont_exist
        ), f"For {col}, threshold is not calculated right -- there are NaNs in Score"
        assert (
            only_trues
        ), f"For {col} and {ses_col}, threshold is not calculated right -- there are Falses where there should only be Trues"
        assert proper_threshold_identification, (
            f"Threshold {col} returns too few tracts, are you sure it's nationally-representative?",
        )
        return True


def test_climate_thresholds(
    final_score_df, climate_thresholds, low_inc_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, climate_thresholds, low_inc_ses, score_col
    ), "Eligibility columns have an error, climate"


def test_energy_thresholds(
    final_score_df, energy_thresholds, low_inc_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, energy_thresholds, low_inc_ses, score_col
    ), "Eligibility columns have an error, energy"


def test_transportation_thresholds(
    final_score_df, transportation_thresholds, low_inc_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, transportation_thresholds, low_inc_ses, score_col
    ), "Eligibility columns have an error, transportation"


def test_housing_thresholds(
    final_score_df, housing_thresholds, low_inc_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, housing_thresholds, low_inc_ses, score_col
    ), "Eligibility columns have an error, housing"


def test_pollution_thresholds(
    final_score_df, pollution_thresholds, low_inc_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, pollution_thresholds, low_inc_ses, score_col
    ), "Eligibility columns have an error, pollution"


def test_water_thresholds(
    final_score_df, water_thresholds, low_inc_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, water_thresholds, low_inc_ses, score_col
    ), "Eligibility columns have an error, water"


def test_health_thresholds(
    final_score_df, health_thresholds, low_inc_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, health_thresholds, low_inc_ses, score_col
    ), "Eligibility columns have an error, health"


def test_workforce_base_thresholds(
    final_score_df, workforce_base_thresholds, low_hs_ses, score_col
):
    assert _helper_test_thresholds(
        final_score_df, workforce_base_thresholds, low_hs_ses, score_col
    ), "Eligibility columns have an error, workforce (not island areas)"


def test_max_40_percent_DAC(
    final_score_df, score_col_with_donuts, total_population_col
):
    assert (
        final_score_df[score_col_with_donuts].isna().sum() == 0
    ), f"Error: {score_col_with_donuts} contains NULLs"
    assert (
        final_score_df[final_score_df[score_col_with_donuts]][
            total_population_col
        ].sum()
        / final_score_df[total_population_col].sum()
    ) < 0.4, "Error: the scoring methodology identifies >40% of people in  the US as disadvantaged"
