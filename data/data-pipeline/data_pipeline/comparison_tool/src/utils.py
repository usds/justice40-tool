import pathlib
import pandas as pd
import xlsxwriter

from data_pipeline.score import field_names
from data_pipeline.etl.sources.census.etl_utils import get_state_information

# Some excel parameters
DEFAULT_COLUMN_WIDTH = 18
# the 31 is a limit from excel on how long the tab name can be
MSFT_TAB_NAME_LIMIT = 31

# FIPS information
DATA_PATH = pathlib.Path(__file__).parents[2] / "data"
FIPS_MAP = (
    get_state_information(data_path=DATA_PATH)
    .set_index("fips")["state_abbreviation"]
    .to_dict()
)


def read_file(
    file_path: str, columns: list, geoid: str = field_names.GEOID_TRACT_FIELD
) -> pd.DataFrame:
    """Reads standardized csvs in

    Parameters:
        file_path: the file to read
        columns: the columns to include
        geoid: the geoid column name (if we change this in usa.csv, will need to change this slightly)

    Returns:
        dataframe that has been read in with geographic index
    """
    assert (
        geoid == field_names.GEOID_TRACT_FIELD
    ), f"Field name specified for geoid is incorrect. Use {field_names.GEOID_TRACT_FIELD}"
    return pd.read_csv(
        file_path, usecols=columns + [geoid], dtype={geoid: str}
    ).set_index(geoid)


def produce_summary_stats(
    joined_df: pd.DataFrame,
    comparator_column: str,
    score_column: str,
    population_column: str,
    geoid_column: str = field_names.GEOID_TRACT_FIELD,
) -> pd.DataFrame:
    """Produces high-level overview dataframe

    Parameters:
        joined_df: the big df
        comparator_column: the column name for the comparator identification bool
        score_column: the column name for the CEJST score bool
        population_column: the column that includes population count per tract
        geoid_column: the geoid10_tract column

    Returns:
        population: the high-level overview df
    """
    population_df = joined_df.groupby([comparator_column, score_column]).agg(
        {population_column: ["sum"], geoid_column: ["count"]}
    )

    population_df["share_of_tracts"] = (
        population_df[geoid_column] / population_df[geoid_column].sum()
    )

    population_df["share_of_population_in_tracts"] = (
        population_df[population_column]
        / population_df[population_column].sum()
    )

    population_df.columns = [
        "Population",
        "Count of tracts",
        "Share of tracts",
        "Share of population",
    ]
    return population_df


def get_demo_series(
    grouping_column: str,
    joined_df: pd.DataFrame,
    demo_columns: list,
) -> pd.DataFrame:
    """Helper function to produce demographic information"""
    # To preserve np.nan, we drop all nans
    full_df = joined_df.dropna(subset=[grouping_column])
    return (
        full_df[full_df[grouping_column]][demo_columns]
        .mean()
        .T.rename(grouping_column)
    )


def get_tract_level_grouping(
    joined_df: pd.DataFrame,
    score_column: str,
    comparator_column: str,
    demo_columns: list,
    keep_missing_values: bool = True,
) -> pd.DataFrame:
    """Function to produce segmented statistics (tract level)

    Here, we are thinking about the following segments:
    1. CEJST and comparator
    2. Not CEJST and comparator
    3. Not CEJST and not comparator
    4. CEJST and not comparator

    If "keep_missing_values" flag:
    5. Missing from CEJST and comparator (this should never be true!)
    6. Missing from comparator and not highlighted by CEJST
    7. Missing from comparator and highlighted by CEJST

    This will make sure that comparisons are "apples to apples".
    """
    group_list = [score_column, comparator_column]
    use_df = joined_df.copy()
    if keep_missing_values:
        use_df = use_df.fillna({score_column: "nan", comparator_column: "nan"})
    grouping_df = use_df.groupby(group_list)[demo_columns].mean().reset_index()
    # this will work whether or not there are "nans" present
    grouping_df[score_column] = grouping_df[score_column].map(
        {
            True: "CEJST",
            False: "Not CEJST",
            "nan": "No CEJST classification",
        }
    )
    grouping_df[comparator_column] = grouping_df[comparator_column].map(
        {
            True: "Comparator",
            False: "Not Comparator",
            "nan": "No Comparator classification",
        }
    )
    return grouping_df.set_index([score_column, comparator_column]).T


def format_multi_index_for_excel(
    df: pd.DataFrame, rename_str: str = "Variable"
) -> pd.DataFrame:
    """Helper function for multiindex printing"""
    df = df.reset_index()
    df.columns = [rename_str] + [
        ", ".join(col_tuple).strip()
        for col_tuple in df.columns[1:].to_flat_index()
    ]
    return df


def get_final_summary_info(
    population: pd.DataFrame,
    comparator_file: str,
    geoid_col: str,
) -> tuple[pd.DataFrame, str]:
    """
    This creates a series that tells us what share (%) of census tracts identified
    by the comparator are also in CEJST and what states the comparator covers.
    """
    comparator_and_cejst_proportion_series = (
        population.loc[(True, True)] / population.loc[(True,)].sum()
    )

    states_represented = (
        pd.read_csv(
            comparator_file, usecols=[geoid_col], dtype={geoid_col: str}
        )[geoid_col]
        .str[:2]
        .unique()
    )
    states = ", ".join(
        [
            FIPS_MAP[state]
            if (state in FIPS_MAP)
            else f"territory (fips {state})"
            for state in states_represented
        ]
    )
    return comparator_and_cejst_proportion_series, states


def construct_weighted_statistics(
    input_df: pd.DataFrame,
    weighting_column: str,
    demographic_columns: list,
    population_column: str,
) -> pd.DataFrame:
    """Function to produce population weighted stats

    Parameters:
        input_df: this gets copied and is the big frame
        weighting_column: the column to group by for the comparator weights (e.g., grouped by this column, the sum of the weights is 1)
        demographic_columns: the columns to get weighted stats for
        population_column: the population column

    Returns:
        population-weighted comparator statistics
    """
    comparator_weighted_joined_df = input_df.copy()
    comparator_weighted_joined_df[
        "tmp_weight"
    ] = comparator_weighted_joined_df.groupby(weighting_column)[
        population_column
    ].transform(
        lambda x: x / x.sum()
    )
    comparator_weighted_joined_df[
        demographic_columns
    ] = comparator_weighted_joined_df[demographic_columns].transform(
        lambda x: x * comparator_weighted_joined_df["tmp_weight"]
    )
    return (
        comparator_weighted_joined_df.groupby(weighting_column)[
            demographic_columns
        ]
        .sum()
        .T
    ).rename(columns={True: weighting_column, False: "not " + weighting_column})


def write_excel_tab(
    writer: pd.ExcelWriter,
    worksheet_name: str,
    df: pd.DataFrame,
    text_format: xlsxwriter.format.Format,
    use_index: bool = True,
):
    """Helper function to set tab width"""
    df.to_excel(writer, sheet_name=worksheet_name, index=use_index)
    worksheet = writer.sheets[worksheet_name]
    for i, column_name in enumerate(df.columns):
        # We set variable names to be extra wide, all other columns can take
        # cues from their headers
        if not column_name == "Variable":
            worksheet.set_column(i, i + 1, len(column_name) + 2, text_format)
        else:
            worksheet.set_column(i, i + 1, DEFAULT_COLUMN_WIDTH, text_format)


def write_excel_tab_about_comparator_scope(
    writer: pd.ExcelWriter,
    worksheet_name: str,
    comparator_and_cejst_proportion_series: pd.Series,
    text_format: xlsxwriter.format.Format,
    merge_format: xlsxwriter.format.Format,
    states_text: str,
):
    comparator_and_cejst_proportion_series.to_excel(
        writer, sheet_name=worksheet_name
    )
    worksheet = writer.sheets[worksheet_name[:MSFT_TAB_NAME_LIMIT]]
    worksheet.set_column(0, 1, DEFAULT_COLUMN_WIDTH, text_format)

    # merge the cells for states text
    row_merge = len(comparator_and_cejst_proportion_series) + 2
    # changes the row height based on how long the states text is
    worksheet.set_row(row_merge, len(states_text) // 2)
    worksheet.merge_range(
        first_row=row_merge,
        last_row=row_merge,
        first_col=0,
        last_col=1,
        data=states_text,
        cell_format=merge_format,
    )


def write_single_comparison_excel(
    output_excel: str,
    population_df: pd.DataFrame,
    tract_level_by_identification_df: pd.DataFrame,
    population_weighted_stats_df: pd.DataFrame,
    tract_level_by_grouping_formatted_df: pd.DataFrame,
    comparator_and_cejst_proportion_series: pd.Series,
    states_text: str,
):
    """Writes the comparison excel file.

    Writing excel from python is always a huge pain. Making the functions truly generalizable is not worth
    the pay off and (in my experience) is extremely hard to maintain.
    """
    with pd.ExcelWriter(output_excel) as writer:
        workbook = writer.book
        text_format = workbook.add_format(
            {
                "bold": False,
                "text_wrap": True,
                "valign": "middle",
                "num_format": "#,##0.00",
            }
        )

        merge_format = workbook.add_format(
            {
                "border": 1,
                "align": "center",
                "valign": "vcenter",
                "text_wrap": True,
            }
        )
        write_excel_tab(
            writer=writer,
            worksheet_name="Summary",
            df=population_df.reset_index(),
            text_format=text_format,
            use_index=False,
        )
        write_excel_tab(
            writer=writer,
            worksheet_name="Tract level stats",
            df=tract_level_by_identification_df.reset_index().rename(
                columns={"index": "Description of variable"}
            ),
            text_format=text_format,
            use_index=False,
        )

        write_excel_tab(
            writer=writer,
            worksheet_name="Population level stats",
            df=population_weighted_stats_df.reset_index().rename(
                columns={"index": "Description of variable"}
            ),
            text_format=text_format,
            use_index=False,
        )
        write_excel_tab(
            writer=writer,
            worksheet_name="Segmented tract level stats",
            df=tract_level_by_grouping_formatted_df,
            text_format=text_format,
            use_index=False,
        )

        write_excel_tab_about_comparator_scope(
            writer=writer,
            worksheet_name="Comparator and CEJST overlap",
            comparator_and_cejst_proportion_series=comparator_and_cejst_proportion_series.rename(
                "Comparator and CEJST overlap"
            ),
            text_format=text_format,
            states_text=states_text,
            merge_format=merge_format,
        )
