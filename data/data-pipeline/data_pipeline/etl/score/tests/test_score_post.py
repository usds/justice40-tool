import io
import pandas.api.types as ptypes
import pandas.testing as pdt
from data_pipeline.etl.score import constants

# See conftest.py for all fixtures used in these tests


# Extract Tests
def test_extract_counties(etl, county_data_initial):
    extracted = etl._extract_counties(io.StringIO(county_data_initial))
    assert all(
        ptypes.is_string_dtype(extracted[col])
        for col in constants.CENSUS_COUNTIES_COLUMNS
    )


def test_extract_states(etl, state_data_initial):
    extracted = etl._extract_states(io.StringIO(state_data_initial))
    string_cols = ["fips", "state_abbreviation"]
    assert all(ptypes.is_string_dtype(extracted[col]) for col in string_cols)


def test_extract_score(etl, score_data_initial):
    extracted = etl._extract_score(io.StringIO(score_data_initial))
    string_cols = ["GEOID10"]
    assert all(ptypes.is_string_dtype(extracted[col]) for col in string_cols)


# Transform Tests
def test_transform_counties(etl, county_data_initial, counties_transformed_expected):
    extracted_counties = etl._extract_counties(io.StringIO(county_data_initial))
    counties_transformed_actual = etl._transform_counties(extracted_counties)
    pdt.assert_frame_equal(counties_transformed_actual, counties_transformed_expected)


def test_transform_states(etl, state_data_initial, states_transformed_expected):
    extracted_states = etl._extract_states(io.StringIO(state_data_initial))
    states_transformed_actual = etl._transform_states(extracted_states)
    pdt.assert_frame_equal(states_transformed_actual, states_transformed_expected)


def test_transform_score(etl, score_data_initial, score_transformed_expected):
    extracted_score = etl._extract_score(io.StringIO(score_data_initial))
    score_transformed_actual = etl._transform_score(extracted_score)
    pdt.assert_frame_equal(
        score_transformed_actual, score_transformed_expected, check_dtype=False
    )


def test_create_score_data(
    etl,
    national_cbg_df,
    counties_transformed_expected,
    states_transformed_expected,
    score_transformed_expected,
    score_data_expected,
):
    score_data_actual = etl._create_score_data(
        national_cbg_df,
        counties_transformed_expected,
        states_transformed_expected,
        score_transformed_expected,
    )
    pdt.assert_frame_equal(
        score_data_actual,
        score_data_expected,
    )


def test_create_tile_data(etl, score_data_expected, tile_data_expected):
    output_tiles_df_actual = etl._create_tile_data(score_data_expected)
    pdt.assert_frame_equal(
        output_tiles_df_actual,
        tile_data_expected,
    )


def test_create_downloadable_data(etl, score_data_expected, downloadable_data_expected):
    output_downloadable_df_actual = etl._create_downloadable_data(score_data_expected)
    pdt.assert_frame_equal(
        output_downloadable_df_actual,
        downloadable_data_expected,
    )
