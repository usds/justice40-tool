import os
import sys
from pathlib import Path
from collections import namedtuple
import numpy as np
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.utils import (
    download_file_from_url,
    get_module_logger,
)
from data_pipeline.score import field_names
from . import constants

logger = get_module_logger(__name__)


def check_score_data_source(
    score_csv_data_path: Path,
    score_data_source: str,
) -> None:
    """Checks if census data is present, and exits gracefully if it doesn't exist. It will download it from S3
       if census_data_source is set to "aws"

    Args:
        score_csv_data_path (str): Path for local Score CSV data
        score_data_source (str): Source for the score data
                                  Options:
                                  - local: fetch census data from the local data directory
                                  - aws: fetch census from AWS S3 J40 data repository

    Returns:
        None

    """
    TILE_SCORE_CSV_S3_URL = (
        settings.AWS_JUSTICE40_DATAPIPELINE_URL
        + "/data/score/csv/tiles/usa.csv"
    )
    TILE_SCORE_CSV = score_csv_data_path / "tiles" / "usa.csv"

    # download from s3 if census_data_source is aws
    if score_data_source == "aws":
        logger.info("Fetching Score Tile data from AWS S3")
        download_file_from_url(
            file_url=TILE_SCORE_CSV_S3_URL, download_file_name=TILE_SCORE_CSV
        )
    else:
        # check if score data is found locally
        if not os.path.isfile(TILE_SCORE_CSV):
            logger.info(
                "No local score tiles data found. Please use '-s aws` to fetch from AWS"
            )
            sys.exit()


def floor_series(series: pd.Series, number_of_decimals: int) -> pd.Series:
    """Floors all non-null numerical values to a specific number of decimal points

    Args:
        series (pd.Series): Input pandas series
        number_of_decimals (int): Number of decimal points to floor all numerical values to
    Returns:
        floored_series (pd.Series): A Pandas Series of numerical values with appropriate number of decimal points
    """

    # we perform many operations using the division operator
    # as well as elementwise multiplication. The result of such
    # operations can introduce such values, below, due to numerical
    # instability. This results in unsafe type inference for numpy
    # float types - exacerbated by panda's type inference engine.
    # Hence, to handle such offending values we default to None
    # Please see the reference, below, on nullable integer types for more details
    unacceptable_values = [-np.inf, np.inf, "None", np.nan]
    mapping = {
        unacceptable_value: None for unacceptable_value in unacceptable_values
    }

    # ensure we are working with a numpy array (which is really what a pandas series is)
    if not isinstance(series, pd.Series):
        raise TypeError(
            f"Argument series must be of type pandas series, not of type {type(series).__name__}."
        )

    # raise exception for handling empty series
    if series.empty:
        raise ValueError("Empty series provided.")

    # if we have any values, just replace them with None
    if series.isin(unacceptable_values).any():
        series.replace(mapping, regex=False, inplace=True)

    multiplication_factor = 10 ** number_of_decimals

    # In order to safely cast NaNs
    # First coerce series to float type: series.astype(float)
    # Please see here:
    # https://pandas.pydata.org/pandas-docs/stable/user_guide/integer_na.html#nullable-integer-data-type
    product_for_numerator = np.floor(
        series.astype(float) * multiplication_factor
    )

    floored_series = np.where(
        series.isnull(),
        # For all null values default to null
        None,
        # The other default condition - floor non-null values
        product_for_numerator / multiplication_factor,
    )

    return floored_series


def _create_df_from_yaml_contents(
    fields_list_from_yaml: list,
    fields_to_store_in_codebook: list,
) -> pd.DataFrame:
    """Helper function to create a dataframe from yaml fields to get used for
    all three configs: csv, excel, and supplemental codebook information yaml

    This function does:
        1. Creates a dictionary to be converted to a dataframe. Pandas easily converts
           dictionaries of the form {column_name: [value_1, value_2, value_3]} to
           dataframes, where column_name is the name of the column and the list of values
           is (by numerical index) the values for the series.
                Column names here are dictated by the fields_to_store_in_codebook list, a named
                tuple that includes the name of the field in the yaml and the name the field will
                take in the codebook. For example, both the csv and excel configs use the name "label",
                but in the codebook, we want one of these fields to be "csv_label" and the other
                to be "excel_label".
        2. Cycles through the fields specified in the yaml fields list. Each field includes
           some additional details, and so the function appends that information to the dictionary
           lists, as described above. If the field is missing, appends a null value so that the row's
           value is blank. This is an artifact of constructing a dataframe from a dictionary of lists.
        3. Returns a dataframe indexed by the column name used in CEJST data (i.e., the
           score name field that is consistent across all yamls and in our own usa.csv).
    """
    # this becomes the codebook frame for each  yaml source. In particular,
    # the key becomes column names, and the lists store their values. We hard-set the
    # first column name to be the CEJST_SCORE_COLUMN_NAME because this should be
    # the same across the board for every component codebook.
    codebook_dictionary = {
        field.new_label_in_codebook: [] for field in fields_to_store_in_codebook
    }
    codebook_dictionary[constants.CEJST_SCORE_COLUMN_NAME] = []

    # we reshape the data from a list of dictionaries to a dictionary of lists
    # so that we can cast it as a dataframe
    for single_field_details in fields_list_from_yaml:
        assert constants.CEJST_SCORE_COLUMN_NAME in single_field_details, (
            "Error: the yaml codebook should crosswalk to the native column "
            + f"from the CEJST pipeline, called {constants.CEJST_SCORE_COLUMN_NAME}"
        )
        # Since every single YAML file should have a score column name
        # that is the the same, this appends each to the list in the dictionary.
        # When pandas converts a dictionary of form {column_name: [val_1, val_2, val_3]},
        # the dataframe has a column named "column_name" with sequential val_1, 2, and 3.
        codebook_dictionary[constants.CEJST_SCORE_COLUMN_NAME].append(
            single_field_details[constants.CEJST_SCORE_COLUMN_NAME]
        )
        for field_information in fields_to_store_in_codebook:
            try:
                codebook_dictionary[
                    field_information.new_label_in_codebook
                ].append(
                    single_field_details[field_information.existing_yaml_label]
                )
            # a key error occurs when the field is not specified for the
            # column in the yaml file; when this happens, a null value should be
            # appended to the list in the dictionary, since the dataframe will
            # use the keys as column names and lists as values.
            # this allows us to have optional fields in the yaml file.
            except KeyError:
                assert (
                    field_information.new_label_in_codebook
                    != constants.CEJST_SCORE_COLUMN_NAME
                )
                codebook_dictionary[
                    field_information.new_label_in_codebook
                ].append(np.nan)
    return pd.DataFrame(codebook_dictionary).set_index(
        constants.CEJST_SCORE_COLUMN_NAME
    )


def _get_datatype(
    input_column_name: str,
    input_column_type: str,
    percentile_string: str = field_names.PERCENTILE_FIELD_SUFFIX,
    loss_rate_string: str = constants.LOSS_RATE_STRING,
) -> str:
    """Helper to convert datatype

    Note: eventually, this will either be programmatically set, or will be included in the yaml, depending on
    the refactor that we do
    """
    return_column_type = input_column_type
    if percentile_string in input_column_name:
        return_column_type = "percentile"
    elif loss_rate_string in input_column_name:
        return_column_type = "rate"
    return return_column_type


def _get_calculation_notes(column_name: str) -> str:
    """Produces calculation notes

    Note: eventually, this will either be programmatically set, or will be included in the yaml, depending on
    the refactor that we do
    """
    calculation_notes = []
    if field_names.PERCENTILE_FIELD_SUFFIX in column_name:
        calculation_notes += [constants.PERCENTILE_EXPLANATION]
    if constants.LOW_STRING in column_name:
        calculation_notes += [constants.LOW_PERCENTILE_EXPLANATION]
    if constants.ISLAND_STRING in column_name:
        calculation_notes += [constants.ISLAND_AREAS_EXPLANATION]
    return " ".join(calculation_notes)


def create_codebook(
    downloadable_csv_config: dict,
    excel_config: dict,
    field_descriptions_for_codebook: dict,
) -> pd.DataFrame:
    """Runs through all logic of creating the codebook.

    First it reads in each component yaml file for the codebook.
    Then it merges all of them.
    Finally, it applies any transforms to the columns (like getting the
        datatype or adding calculation_notes.
    """
    CodebookLabelFields = namedtuple(
        "CodebookLabelFields",
        ["new_label_in_codebook", "existing_yaml_label"],
    )

    # parse data from component yamls
    csv_codes_df = _create_df_from_yaml_contents(
        fields_list_from_yaml=downloadable_csv_config,
        fields_to_store_in_codebook=[
            CodebookLabelFields(
                new_label_in_codebook=constants.CSV_LABEL_FIELD,
                existing_yaml_label="label",
            ),
            CodebookLabelFields(
                new_label_in_codebook=constants.CSV_FORMAT,
                existing_yaml_label="format",
            ),
        ],
    )

    excel_codes_df = _create_df_from_yaml_contents(
        fields_list_from_yaml=excel_config,
        fields_to_store_in_codebook=[
            CodebookLabelFields(
                new_label_in_codebook=constants.EXCEL_LABEL_FIELD,
                existing_yaml_label="label",
            )
        ],
    )

    field_descriptions_for_codebook_df = _create_df_from_yaml_contents(
        fields_list_from_yaml=field_descriptions_for_codebook,
        fields_to_store_in_codebook=[
            CodebookLabelFields(
                new_label_in_codebook=constants.NOTES_FIELD,
                existing_yaml_label="notes",
            ),
            CodebookLabelFields(
                new_label_in_codebook=constants.THRESHOLD_CATEGORY_FIELD,
                existing_yaml_label="category",
            ),
        ],
    )

    # join all sources on the column name
    merged_codebook_df = pd.concat(
        [csv_codes_df, excel_codes_df, field_descriptions_for_codebook_df],
        join="outer",
        axis=1,
    ).reset_index()

    # add field type column
    merged_codebook_df[
        constants.CSV_FIELD_TYPE_FIELD
    ] = merged_codebook_df.apply(
        lambda x: _get_datatype(
            input_column_name=x[constants.CEJST_SCORE_COLUMN_NAME],
            input_column_type=x[constants.CSV_FORMAT],
        ),
        axis=1,
    )

    # get calculation notes column
    merged_codebook_df[constants.CALCULATION_NOTES_FIELD] = merged_codebook_df[
        constants.CEJST_SCORE_COLUMN_NAME
    ].apply(_get_calculation_notes)

    # This is temporary. Right now, our variable names are all
    # plain English. After the refactor, we will have new names
    # that are programmatic, and the CEJST_SCORE_COLUMN will
    # be dropped in favor of the explanation.
    return merged_codebook_df[constants.CODEBOOK_COLUMNS].rename(
        columns={constants.CEJST_SCORE_COLUMN_NAME: "Description"}
    )
