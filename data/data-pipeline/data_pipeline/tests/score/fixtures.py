import pandas as pd
import pytest
from data_pipeline.config import settings
from data_pipeline.score import field_names
from data_pipeline.etl.score import constants

GEOID_TRACT_FIELD_NAME = field_names.GEOID_TRACT_FIELD


@pytest.fixture(scope="session")
def final_score_df():
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "full" / "usa.csv",
        dtype={field_names.GEOID_TRACT_FIELD: str},
        low_memory=False,
    )


@pytest.fixture(scope="session")
def census_df():
    census_csv = constants.DATA_PATH / "dataset" / "census_acs_2019" / "usa.csv"
    return pd.read_csv(
        census_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture(scope="session")
def ejscreen_df():
    ejscreen_csv = constants.DATA_PATH / "dataset" / "ejscreen" / "usa.csv"
    return pd.read_csv(
        ejscreen_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture(scope="session")
def hud_housing_df():
    hud_housing_csv = (
        constants.DATA_PATH / "dataset" / "hud_housing" / "usa.csv"
    )
    return pd.read_csv(
        hud_housing_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture(scope="session")
def cdc_places_df():
    cdc_places_csv = constants.DATA_PATH / "dataset" / "cdc_places" / "usa.csv"
    return pd.read_csv(
        cdc_places_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture(scope="session")
def census_acs_median_incomes_df():
    census_acs_median_incomes_csv = (
        constants.DATA_PATH
        / "dataset"
        / "census_acs_median_income_2019"
        / "usa.csv"
    )
    return pd.read_csv(
        census_acs_median_incomes_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture(scope="session")
def cdc_life_expectancy_df():
    cdc_life_expectancy_csv = (
        constants.DATA_PATH / "dataset" / "cdc_life_expectancy" / "usa.csv"
    )
    return pd.read_csv(
        cdc_life_expectancy_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture(scope="session")
def doe_energy_burden_df():
    doe_energy_burden_csv = (
        constants.DATA_PATH / "dataset" / "doe_energy_burden" / "usa.csv"
    )
    return pd.read_csv(
        doe_energy_burden_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


# TODO: The datasets that are loaded from data_pipeline/etl/score/etl_score.py:131
