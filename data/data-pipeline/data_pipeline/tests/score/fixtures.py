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
        dtype={GEOID_TRACT_FIELD_NAME: str},
        low_memory=False,
    )


@pytest.fixture()
def census_df():
    census_csv = constants.DATA_PATH / "dataset" / "census_acs_2019" / "usa.csv"
    return pd.read_csv(
        census_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def ejscreen_df():
    ejscreen_csv = constants.DATA_PATH / "dataset" / "ejscreen" / "usa.csv"
    return pd.read_csv(
        ejscreen_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def hud_housing_df():
    hud_housing_csv = (
        constants.DATA_PATH / "dataset" / "hud_housing" / "usa.csv"
    )
    return pd.read_csv(
        hud_housing_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def cdc_places_df():
    cdc_places_csv = constants.DATA_PATH / "dataset" / "cdc_places" / "usa.csv"
    return pd.read_csv(
        cdc_places_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
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


@pytest.fixture()
def cdc_life_expectancy_df():
    cdc_life_expectancy_csv = (
        constants.DATA_PATH / "dataset" / "cdc_life_expectancy" / "usa.csv"
    )
    return pd.read_csv(
        cdc_life_expectancy_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def doe_energy_burden_df():
    doe_energy_burden_csv = (
        constants.DATA_PATH / "dataset" / "doe_energy_burden" / "usa.csv"
    )
    return pd.read_csv(
        doe_energy_burden_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def national_risk_index_df():
    return pd.read_csv(
        constants.DATA_PATH / "dataset" / "national_risk_index" / "usa.csv",
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def dot_travel_disadvantage_df():
    return pd.read_csv(
        constants.DATA_PATH / "dataset" / "travel_composite" / "usa.csv",
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def fsf_fire_df():
    return pd.read_csv(
        constants.DATA_PATH / "dataset" / "fsf_wildfire_risk" / "usa.csv",
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def fsf_flood_df():
    return pd.read_csv(
        constants.DATA_PATH / "dataset" / "fsf_flood_risk" / "usa.csv",
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def nature_deprived_df():
    return pd.read_csv(
        constants.DATA_PATH / "dataset" / "nlcd_nature_deprived" / "usa.csv",
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def eamlis_df():
    return pd.read_csv(
        constants.DATA_PATH / "dataset" / "eamlis" / "usa.csv",
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def fuds_df():
    return pd.read_csv(
        constants.DATA_PATH / "dataset" / "us_army_fuds" / "usa.csv",
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def geocorr_urban_rural_df():
    geocorr_urban_rural_csv = (
        constants.DATA_PATH / "dataset" / "geocorr" / "usa.csv"
    )
    return pd.read_csv(
        geocorr_urban_rural_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def census_decennial_df():
    census_decennial_csv = (
        constants.DATA_PATH / "dataset" / "census_decennial_2010" / "usa.csv"
    )
    return pd.read_csv(
        census_decennial_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def census_2010_df():
    census_2010_csv = (
        constants.DATA_PATH / "dataset" / "census_acs_2010" / "usa.csv"
    )
    return pd.read_csv(
        census_2010_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )


@pytest.fixture()
def hrs_df():
    hrs_csv = constants.DATA_PATH / "dataset" / "historic_redlining" / "usa.csv"

    return pd.read_csv(
        hrs_csv,
        dtype={GEOID_TRACT_FIELD_NAME: "string"},
        low_memory=False,
    )
