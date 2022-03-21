import pandas as pd
from data_pipeline.score import field_names


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
    joined_frame: pd.DataFrame,
    comparator_column: str,
    score_column: str,
    population_column: str,
    geoid_column: str = field_names.GEOID_TRACT_FIELD,
) -> pd.DataFrame:
    """Produces high-level overview dataframe

    Parameters:
        joined_frame: the big df
        comparator_column: the column name for the comparator identification bool
        score_column: the column name for the CEJST score bool
        population_column: the column that includes population count per tract
        geoid_column: the geoid10_tract column

    Returns:
        population: the high-level overview df
    """
    population = joined_frame.groupby([comparator_column, score_column]).agg(
        {population_column: ["sum"], geoid_column: ["count"]}
    )

    population["share_of_tracts"] = (
        population[geoid_column] / population[geoid_column].sum()
    )

    population["share_of_population_in_tracts"] = (
        population[population_column] / population[population_column].sum()
    )

    population.columns = [
        "Population",
        "Count of tracts",
        "Share of tracts",
        "Share of population",
    ]
    return population


def get_demo_series(
    grouping_column: str,
    joined_frame: pd.DataFrame,
    demo_columns: list,
) -> pd.DataFrame:
    """Helper function to produce demographic information"""
    return (
        joined_frame[joined_frame[grouping_column]][demo_columns]
        .mean()
        .T.rename(grouping_column)
    )


def get_tract_level_grouping(
    joined_frame: pd.DataFrame,
    score_column: str,
    comparator_column: str,
    demo_columns: list,
) -> pd.DataFrame:
    """Function to produce segmented statistics (tract level)"""
    group_list = [score_column, comparator_column]
    grouping_frame = (
        joined_frame[joined_frame[group_list].sum(axis=1) > 0]
        .groupby(group_list)[demo_columns]
        .mean()
        .reset_index()
    )
    grouping_frame[score_column] = grouping_frame[score_column].map(
        {True: "CEJST", False: "Not CEJST"}
    )
    grouping_frame[comparator_column] = grouping_frame[comparator_column].map(
        {True: "Comparator", False: "Not Comparator"}
    )
    return grouping_frame.set_index([score_column, comparator_column]).T


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


def construct_weighted_statistics(
    _joined_frame: pd.DataFrame,
    weighting_column: str,
    demographic_columns: list,
    population_column: str,
) -> pd.DataFrame:
    """Function to produce population weighted stats

    Parameters:
        _joined_frame: this gets copied and is the big frame
        weighting_column: the column to group by for the comparator weights (e.g., grouped by this column, the sum of the weights is 1)
        demographic_columns: the columns to get weighted stats for
        population_column: the population column

    Returns:
        population-weighted comparator statistics
    """
    comparator_weighted_joined_frame = _joined_frame.copy()
    comparator_weighted_joined_frame[
        "tmp_weight"
    ] = comparator_weighted_joined_frame.groupby(weighting_column)[
        population_column
    ].transform(
        lambda x: x / x.sum()
    )
    comparator_weighted_joined_frame[
        demographic_columns
    ] = comparator_weighted_joined_frame[demographic_columns].transform(
        lambda x: x * comparator_weighted_joined_frame["tmp_weight"]
    )
    return (
        comparator_weighted_joined_frame.groupby(weighting_column)[
            demographic_columns
        ]
        .sum()
        .T
    ).rename(columns={True: weighting_column, False: "not " + weighting_column})


def write_excel_tab(
    writer: pd.ExcelWriter,
    worksheet_name: str,
    df: pd.DataFrame,
    text_format,
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
            worksheet.set_column(i, i + 1, 18, text_format)


def write_single_comparison_excel(
    output_excel: str,
    population: pd.DataFrame,
    tract_level_by_identification: pd.DataFrame,
    population_weighted_stats: pd.DataFrame,
    tract_level_by_grouping_formatted: pd.DataFrame,
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
        write_excel_tab(
            writer,
            "Summary",
            population.reset_index(),
            text_format,
            use_index=False,
        )
        write_excel_tab(
            writer,
            "Tract level stats",
            tract_level_by_identification.reset_index().rename(
                columns={"index": "Description of variable"}
            ),
            text_format,
            use_index=False,
        )

        write_excel_tab(
            writer,
            "Population level stats",
            population_weighted_stats.reset_index().rename(
                columns={"index": "Description of variable"}
            ),
            text_format,
            use_index=False,
        )
        write_excel_tab(
            writer,
            "Segmented tract level stats",
            tract_level_by_grouping_formatted,
            text_format,
            use_index=False,
        )
