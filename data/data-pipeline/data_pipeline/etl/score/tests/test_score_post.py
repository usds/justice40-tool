# pylint: disable=W0212
## Above disables warning about access to underscore-prefixed methods

from importlib import reload
from pathlib import Path
import pandas.api.types as ptypes
import pandas.testing as pdt

from data_pipeline.etl.score import constants
from data_pipeline.utils import load_yaml_dict_from_file

# See conftest.py for all fixtures used in these tests


# Extract Tests
def test_extract_counties(etl, county_data_initial):
    reload(constants)
    extracted = etl._extract_counties(county_data_initial)
    assert all(
        ptypes.is_string_dtype(extracted[col])
        for col in constants.CENSUS_COUNTIES_COLUMNS
    )


def test_extract_states(etl, state_data_initial):
    extracted = etl._extract_states(state_data_initial)
    string_cols = ["fips", "state_abbreviation"]
    assert all(ptypes.is_string_dtype(extracted[col]) for col in string_cols)


def test_extract_score(etl, score_data_initial):
    extracted = etl._extract_score(score_data_initial)
    string_cols = ["GEOID10_TRACT"]
    assert all(ptypes.is_string_dtype(extracted[col]) for col in string_cols)


# Transform Tests
def test_transform_counties(
    etl, county_data_initial, counties_transformed_expected
):
    extracted_counties = etl._extract_counties(county_data_initial)
    counties_transformed_actual = etl._transform_counties(extracted_counties)
    pdt.assert_frame_equal(
        counties_transformed_actual, counties_transformed_expected
    )


def test_transform_states(etl, state_data_initial, states_transformed_expected):
    extracted_states = etl._extract_states(state_data_initial)
    states_transformed_actual = etl._transform_states(extracted_states)
    pdt.assert_frame_equal(
        states_transformed_actual, states_transformed_expected
    )


def test_transform_score(etl, score_data_initial, score_transformed_expected):
    extracted_score = etl._extract_score(score_data_initial)
    score_transformed_actual = etl._transform_score(extracted_score)
    pdt.assert_frame_equal(
        score_transformed_actual, score_transformed_expected, check_dtype=False
    )


# pylint: disable=too-many-arguments
def test_create_score_data(
    etl,
    national_tract_df,
    counties_transformed_expected,
    states_transformed_expected,
    score_transformed_expected,
    score_data_expected,
):
    score_data_actual = etl._create_score_data(
        national_tract_df,
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


def test_create_downloadable_data(
    etl, score_data_expected, downloadable_data_expected
):
    downloadable_csv_config = load_yaml_dict_from_file(
        etl.CONTENT_CONFIG / "csv.yml"
    )
    output_downloadable_df_actual = etl._create_downloadable_data(
        score_data_expected,
        fields_object=downloadable_csv_config["fields"],
        config_object=downloadable_csv_config["global_config"],
    )
    pdt.assert_frame_equal(
        output_downloadable_df_actual,
        downloadable_data_expected,
    )


def test_load_score_csv_full(etl, score_data_expected):
    reload(constants)
    etl._load_score_csv_full(
        score_data_expected,
        constants.FULL_SCORE_CSV_FULL_PLUS_COUNTIES_FILE_PATH,
    )
    assert constants.FULL_SCORE_CSV_FULL_PLUS_COUNTIES_FILE_PATH.is_file()


def test_load_tile_csv(etl, tile_data_expected):
    reload(constants)
    etl._load_score_csv_full(
        tile_data_expected, constants.DATA_SCORE_CSV_TILES_FILE_PATH
    )
    assert constants.DATA_SCORE_CSV_TILES_FILE_PATH.is_file()


def test_load_downloadable_zip(etl, monkeypatch, score_data_expected):
    reload(constants)
    static_files_path = (
        Path.cwd() / "data_pipeline" / "files"
    )  # need to monkeypatch to real dir
    monkeypatch.setattr(constants, "FILES_PATH", static_files_path)
    monkeypatch.setattr(
        constants,
        "SCORE_DOWNLOADABLE_PDF_FILE_PATH",
        static_files_path / constants.SCORE_DOWNLOADABLE_PDF_FILE_NAME,
    )
    etl.output_score_county_state_merged_df = score_data_expected
    etl._load_downloadable_zip(constants.SCORE_DOWNLOADABLE_DIR)
    assert constants.SCORE_DOWNLOADABLE_DIR.is_dir()
    assert constants.SCORE_DOWNLOADABLE_CSV_FILE_PATH.is_file()
    assert constants.SCORE_DOWNLOADABLE_EXCEL_FILE_PATH.is_file()
    assert constants.SCORE_DOWNLOADABLE_ZIP_FILE_PATH.is_file()
