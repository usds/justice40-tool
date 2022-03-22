"""
Quick script to generate a data dictionary for the download packet.

A few notes:
(1) This will ONLY crosswalk the downloadable CSV and the downloadable EXCEL file.
    The SHP file has a LOT more columns, and we should almost certainly
    make a data dictionary by hand once the column names are final.
(2) I haven't given much thought to how the yaml for notes is stored and assume
    this might change with the refactor
"""
import pathlib
import yaml
import pandas as pd
import numpy as np
from data_pipeline.config import settings
from data_pipeline.score import field_names

CEJST_SCORE_COLUMN_NAME = "score_name"
CONFIG_PATH = settings.APP_ROOT / "content" / "config"

EXCEL_CONFIG = CONFIG_PATH / "excel.yml"
CSV_CONFIG = CONFIG_PATH / "csv.yml"
SCORE_FIELD_CONFIG = CONFIG_PATH / "score_fields.yml"

CSV_FORMAT = "csv_format"
CSV_LABEL_FIELD = "csv_label"
EXCEL_LABEL_FIELD = "excel_label"

NOTES_FIELD = "notes"
THRESHOLD_CATEGORY_FIELD = "threshold_category"
CALCULATION_NOTES_FIELD = "calculation_notes"
CSV_FIELD_TYPE_FIELD = "csv_field_type"

COLUMNS_TO_KEEP = [
    CEJST_SCORE_COLUMN_NAME,
    CSV_FIELD_TYPE_FIELD,
    CSV_LABEL_FIELD,
    EXCEL_LABEL_FIELD,
    CALCULATION_NOTES_FIELD,
    THRESHOLD_CATEGORY_FIELD,
    NOTES_FIELD,
]

# for re-typing & notes
# note this doesn't perfectly square with field names
PERCENTILE_STRING = field_names.PERCENTILE_FIELD_SUFFIX
LOSS_RATE_STRING = "loss rate"
LOW_STRING = "Low "
ISLAND_STRING = "island areas"

PERCENTILE_EXPLANATION = (
    "All percentiles are floored (rounded down to the nearest percentile). "
    + "For example, 89.7th percentile is rounded down to 89 for this field."
)
LOW_PERCENTILE_EXPLANATION = "This percentile is reversed, meaning the lowest raw numbers become the highest percentiles."
ISLAND_AREAS_EXPLANATION = (
    "Because not all data is available for the Nation, Puerto Rico, "
    + "and the Island Territories, this uses different underlying data for the islands."
)


OUTPUT_PATH = (
    settings.APP_ROOT / "data" / "score" / "downloadable" / "codebook.csv"
)


def _set_up_infrastructure(
    yaml_path: pathlib.Path,
    fields_to_store: list,
):
    """helper function to parse yaml"""
    yaml_contents = yaml.safe_load(
        open(yaml_path, "r", encoding="utf-8").read()
    )
    if "sheets" in yaml_contents:
        fields = []
        for sheet in yaml_contents["sheets"]:
            # excel yaml has ability for many sheets
            fields.extend([single_field for single_field in sheet["fields"]])
    else:
        # other files do not
        fields = yaml_contents["fields"]

    to_frame_dict = {CEJST_SCORE_COLUMN_NAME: []} | {
        field: [] for field, _ in fields_to_store
    }

    return to_frame_dict, fields


def _create_df_from_yaml(
    yaml_path: pathlib.Path,
    fields_to_store: list,
    native_score_column: str = CEJST_SCORE_COLUMN_NAME,
):
    """helper function to create a dataframe from yaml"""
    to_frame_dict, fields = _set_up_infrastructure(
        yaml_path=yaml_path,
        fields_to_store=fields_to_store,
    )
    for details in fields:
        to_frame_dict[CEJST_SCORE_COLUMN_NAME].append(
            details[native_score_column]
        )
        for column_name, dict_field in fields_to_store:
            try:
                to_frame_dict[column_name].append(details[dict_field])
            except KeyError:
                assert column_name != CEJST_SCORE_COLUMN_NAME
                to_frame_dict[column_name].append(np.nan)
    return pd.DataFrame(to_frame_dict).set_index(CEJST_SCORE_COLUMN_NAME)


def _get_datatype(
    input_name: str,
    input_type: str,
    percentile_string: str = PERCENTILE_STRING,
    loss_rate_string: str = LOSS_RATE_STRING,
):
    """helper to convert datatype"""
    if percentile_string in input_name:
        return "percentile"
    elif loss_rate_string in input_name:
        return "rate"
    else:
        return input_type


def _get_calculation_notes(column_name):
    """produces calculation notes"""
    calculation_notes = []
    if PERCENTILE_STRING in column_name:
        calculation_notes += [PERCENTILE_EXPLANATION]
    if LOW_STRING in column_name:
        calculation_notes += [LOW_PERCENTILE_EXPLANATION]
    if ISLAND_STRING in column_name:
        calculation_notes += [ISLAND_AREAS_EXPLANATION]
    return " ".join(calculation_notes)


if __name__ == "__main__":
    # read component yamls
    csv_codes_df = _create_df_from_yaml(
        yaml_path=CSV_CONFIG,
        fields_to_store=[(CSV_LABEL_FIELD, "label"), (CSV_FORMAT, "format")],
        native_score_column=CEJST_SCORE_COLUMN_NAME,
    )

    excel_codes_df = _create_df_from_yaml(
        yaml_path=EXCEL_CONFIG,
        fields_to_store=[(EXCEL_LABEL_FIELD, "label")],
        native_score_column=CEJST_SCORE_COLUMN_NAME,
    )

    score_detail_notes_df = _create_df_from_yaml(
        yaml_path=SCORE_FIELD_CONFIG,
        fields_to_store=[
            (NOTES_FIELD, "notes"),
            (THRESHOLD_CATEGORY_FIELD, "category"),
        ],
        native_score_column="column_name",
    )

    # join all sources on the column name
    merged_df = pd.concat(
        [csv_codes_df, excel_codes_df, score_detail_notes_df],
        join="outer",
        axis=1,
    ).reset_index()

    # add field type column
    merged_df[CSV_FIELD_TYPE_FIELD] = merged_df.apply(
        lambda x: _get_datatype(
            input_name=x[CEJST_SCORE_COLUMN_NAME],
            input_type=x[CSV_FORMAT],
        ),
        axis=1,
    )

    merged_df[CALCULATION_NOTES_FIELD] = merged_df[
        CEJST_SCORE_COLUMN_NAME
    ].apply(_get_calculation_notes)

    # store codebook
    merged_df[COLUMNS_TO_KEEP].to_csv(OUTPUT_PATH, index=False)
