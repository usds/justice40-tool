# flake8: noqa: W0613,W0611,F811
from dataclasses import dataclass

import pytest
from data_pipeline.score import field_names
from data_pipeline.score.score_narwhal import ScoreNarwhal
from data_pipeline.utils import get_module_logger

from .fixtures import final_score_df  # pylint: disable=unused-import

logger = get_module_logger(__name__)

pytestmark = pytest.mark.smoketest


@dataclass
class PercentileTestConfig:
    percentile_column_name: str
    threshold_column_name: str
    threshold: float
    percentile_column_need_suffix: bool = True

    @property
    def full_percentile_column_name(self):
        if self.percentile_column_need_suffix:
            return (
                self.percentile_column_name
                + field_names.PERCENTILE_FIELD_SUFFIX
            )
        return self.percentile_column_name


def _check_percentile_against_threshold(df, config: PercentileTestConfig):
    """Note - for the purpose of testing, this fills with False"""
    is_minimum_flagged_ok = (
        df[df[config.threshold_column_name].fillna(False)][
            config.full_percentile_column_name
        ].min()
        >= config.threshold
    )

    is_maximum_not_flagged_ok = (
        df[~df[config.threshold_column_name].fillna(False)][
            config.full_percentile_column_name
        ].max()
        < config.threshold
    )
    errors = []
    if not is_minimum_flagged_ok:
        errors.append(
            f"For column {config.threshold_column_name}, there is someone flagged below {config.threshold} percentile!"
        )
    if not is_maximum_not_flagged_ok:
        errors.append(
            f"For column {config.threshold_column_name}, there is someone not flagged above {config.threshold} percentile!"
        )
    return errors


def test_percentile_columns(final_score_df):
    low_income = PercentileTestConfig(
        field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD,
        field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED,
        ScoreNarwhal.LOW_INCOME_THRESHOLD,
    )
    population_loss = PercentileTestConfig(
        field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD,
        field_names.EXPECTED_POPULATION_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    agricultural_loss = PercentileTestConfig(
        field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD,
        field_names.EXPECTED_AGRICULTURAL_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    building_loss = PercentileTestConfig(
        field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD,
        field_names.EXPECTED_BUILDING_LOSS_EXCEEDS_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    flood = PercentileTestConfig(
        field_names.FUTURE_FLOOD_RISK_FIELD,
        field_names.HIGH_FUTURE_FLOOD_RISK_FIELD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    wildfire = PercentileTestConfig(
        field_names.FUTURE_WILDFIRE_RISK_FIELD,
        field_names.HIGH_FUTURE_WILDFIRE_RISK_FIELD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    low_high_school = PercentileTestConfig(
        field_names.HIGH_SCHOOL_ED_FIELD,
        field_names.LOW_HS_EDUCATION_FIELD,
        ScoreNarwhal.LACK_OF_HIGH_SCHOOL_MINIMUM_THRESHOLD,
        percentile_column_need_suffix=False,
    )
    donut_hole_income = PercentileTestConfig(
        field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD,
        field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED_DONUTS,
        ScoreNarwhal.LOW_INCOME_THRESHOLD_DONUT,
    )
    donut_hole_adjacency = PercentileTestConfig(
        (field_names.SCORE_N_COMMUNITIES + field_names.ADJACENCY_INDEX_SUFFIX),
        field_names.ADJACENT_TRACT_SCORE_ABOVE_DONUT_THRESHOLD,
        ScoreNarwhal.SCORE_THRESHOLD_DONUT,
        percentile_column_need_suffix=False,
    )
    diesel = PercentileTestConfig(
        field_names.DIESEL_FIELD,
        field_names.DIESEL_EXCEEDS_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    dot_burden = PercentileTestConfig(
        field_names.DOT_TRAVEL_BURDEN_FIELD,
        field_names.DOT_BURDEN_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    traffic_proximity = PercentileTestConfig(
        field_names.TRAFFIC_FIELD,
        field_names.TRAFFIC_PROXIMITY_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    energy_burden = PercentileTestConfig(
        field_names.ENERGY_BURDEN_FIELD,
        field_names.ENERGY_BURDEN_EXCEEDS_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    pm25 = PercentileTestConfig(
        field_names.PM25_FIELD,
        field_names.PM25_EXCEEDS_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    kitchen_plumbing = PercentileTestConfig(
        field_names.NO_KITCHEN_OR_INDOOR_PLUMBING_FIELD,
        field_names.NO_KITCHEN_OR_INDOOR_PLUMBING_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    # Leadpaint is handled below in a separate method
    housing = PercentileTestConfig(
        field_names.HOUSING_BURDEN_FIELD,
        field_names.HOUSING_BURDEN_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    non_natural_space = PercentileTestConfig(
        field_names.TRACT_PERCENT_NON_NATURAL_FIELD_NAME,
        field_names.NON_NATURAL_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    rmp = PercentileTestConfig(
        field_names.RMP_FIELD,
        field_names.RMP_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    npl = PercentileTestConfig(
        field_names.NPL_FIELD,
        field_names.NPL_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    tsdf = PercentileTestConfig(
        field_names.TSDF_FIELD,
        field_names.TSDF_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    wastewater = PercentileTestConfig(
        field_names.WASTEWATER_FIELD,
        field_names.WASTEWATER_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    ust = PercentileTestConfig(
        field_names.UST_FIELD,
        field_names.UST_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    diabetes = PercentileTestConfig(
        field_names.DIABETES_FIELD,
        field_names.DIABETES_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    asthma = PercentileTestConfig(
        field_names.ASTHMA_FIELD,
        field_names.ASTHMA_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    heart_disease = PercentileTestConfig(
        field_names.HEART_DISEASE_FIELD,
        field_names.HEART_DISEASE_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    low_life_expectancy = PercentileTestConfig(
        field_names.LOW_LIFE_EXPECTANCY_FIELD,
        field_names.LOW_LIFE_EXPECTANCY_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    unemployment = PercentileTestConfig(
        field_names.UNEMPLOYMENT_FIELD,
        field_names.UNEMPLOYMENT_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    low_median_income = PercentileTestConfig(
        field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD,
        field_names.LOW_MEDIAN_INCOME_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    linguist_isolation = PercentileTestConfig(
        field_names.LINGUISTIC_ISO_FIELD,
        field_names.LINGUISTIC_ISOLATION_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    poverty = PercentileTestConfig(
        field_names.POVERTY_LESS_THAN_100_FPL_FIELD,
        field_names.POVERTY_PCTILE_THRESHOLD,
        ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD,
    )
    errors = []
    for threshhold_config in (
        low_income,
        population_loss,
        agricultural_loss,
        building_loss,
        flood,
        wildfire,
        low_high_school,
        donut_hole_income,
        donut_hole_adjacency,
        dot_burden,
        diesel,
        traffic_proximity,
        energy_burden,
        pm25,
        kitchen_plumbing,
        housing,
        non_natural_space,
        rmp,
        npl,
        tsdf,
        wastewater,
        ust,
        diabetes,
        asthma,
        heart_disease,
        low_life_expectancy,
        unemployment,
        low_median_income,
        linguist_isolation,
        poverty,
    ):
        errors.extend(
            _check_percentile_against_threshold(
                final_score_df, threshhold_config
            )
        )
    error_text = "\n".join(errors)
    assert not errors, error_text


def test_lead_paint_indicator(
    final_score_df,
):
    """We need special logic here because this is a combined threshold, so we need this test to have two parts.

    1. We construct our own threshold columns
    2. We make sure it's the same as the threshold column in the dataframe
    """
    lead_pfs = (
        field_names.LEAD_PAINT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
    )
    home_val_pfs = (
        field_names.MEDIAN_HOUSE_VALUE_FIELD
        + field_names.PERCENTILE_FIELD_SUFFIX
    )
    combined_proxy_boolean = field_names.LEAD_PAINT_PROXY_PCTILE_THRESHOLD

    tmp_lead_threshold = (
        final_score_df[lead_pfs] >= ScoreNarwhal.ENVIRONMENTAL_BURDEN_THRESHOLD
    )
    tmp_mhv_threshold = (
        final_score_df[home_val_pfs]
        <= ScoreNarwhal.MEDIAN_HOUSE_VALUE_THRESHOLD
    )

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
