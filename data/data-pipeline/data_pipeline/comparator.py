import sys
import click
import difflib
import pandas as pd

from data_pipeline.etl.score import constants
from data_pipeline.utils import get_module_logger, download_file_from_url
from data_pipeline.application import log_title, log_info, log_goodbye

logger = get_module_logger(__name__)

pd.set_option("display.max_columns", None)
pd.set_option("display.max_colwidth", None)
pd.set_option("display.max_rows", None)
pd.set_option("display.width", 10000)
pd.set_option("display.colheader_justify", "left")


@click.group()
def cli():
    """
    A helper tool to run comparisons between files in production and those
    in the local file system.
    """


@cli.command(
    help="Compare score stored in the AWS production environment to the locally generated score. Defaults to checking against version 1.0.",
)
@click.option(
    "-v",
    "--compare-to-version",
    default="1.0",
    required=False,
    type=str,
)
def compare_score(compare_to_version: str):
    """Compares the score in the production environment to the locally generated score. The
    algorithm is pretty simple:

    1. Fetch and load both scores into dataframes.
    2. Round floats to a number of decimal places to account for differences in the machine
    and python versions used to generate the scores. If we skip this step, there are usually
    thousands of extremely minor differences.
    3. Compare the columns. Print out the deltas.
    4. Compare the values. Print out the deltas. Save the deltas to deltas.csv.
    5. Save a nice summary to comparison-summary.md. End.
    """

    FLOAT_ROUNDING_PLACES = 2
    WORKING_PATH = constants.TMP_PATH / "Comparator" / "Score"

    summary = "# Score Comparison Summary\n"
    summary += f"Hi! I'm the Score Comparator. I compared the score in production (version {compare_to_version}) to the"
    summary += " locally calculated score. Here are the results.\n"

    log_title("Compare Score", "Compare production score to local score")

    locally_generated_score_path = constants.DATA_SCORE_CSV_FULL_FILE_PATH
    if not locally_generated_score_path.is_file():
        logger.error(
            f"- No score file exists at {locally_generated_score_path}. Please generate the score and try again."
        )
        sys.exit(1)

    # TODO: transition to downloader code when it's available
    production_score_url = f"https://justice40-data.s3.amazonaws.com/data-versions/{compare_to_version}/data/score/csv/full/usa.csv"
    production_score_path = WORKING_PATH / "usa.csv"

    log_info(f"Fetching score version {compare_to_version} from AWS")
    production_score_path.parent.mkdir(parents=True, exist_ok=True)
    download_file_from_url(
        file_url=production_score_url, download_file_name=production_score_path
    )

    log_info("Loading files into pandas for comparisons")

    local_score_df = pd.read_csv(
        locally_generated_score_path,
        index_col="GEOID10_TRACT",
        dtype={"GEOID10_TRACT": str},
        low_memory=False,
    ).sort_index()
    production_score_df = pd.read_csv(
        production_score_path,
        index_col="GEOID10_TRACT",
        dtype={"GEOID10_TRACT": str},
        low_memory=False,
    ).sort_index()

    # Because of variations in Python versions and machine-level calculations, some of
    # our numbers can be really close but not the same. That throws off our comparisons.
    # So we're going to round to a reasonable amount of digits before doing anything else.

    production_score_df = production_score_df.round(FLOAT_ROUNDING_PLACES)
    local_score_df = local_score_df.round(FLOAT_ROUNDING_PLACES)

    local_score_df_columns = sorted(local_score_df.columns.array.tolist())
    production_score_df_columns = sorted(
        production_score_df.columns.array.tolist()
    )

    log_info("Comparing columns (production vs local). Differences are: ")
    summary += "\n## Columns\n"
    summary += "I compared the columns. Here's what I found.\n"

    col_diff = difflib.unified_diff(
        production_score_df_columns, local_score_df_columns
    )
    col_diff_res = ""
    for d in col_diff:
        col_diff_res += str(d) + "\n"

    if len(col_diff_res) == 0:
        log_info("None. Columns are the same")
        summary += "* There are no differences in the column names.\n"
    else:
        log_info("There are differences. The diff is:")
        log_info(col_diff_res)
        summary += f"* There are differences in the column names. Here's a diff:\n{col_diff_res}\n"

    log_info("Comparing dataframe contents (production vs local)")
    summary += "\n## Scores\n"
    summary += "I compared the scores, too. Here's what I found.\n"

    production_row_count = len(production_score_df.index)
    local_row_count = len(local_score_df.index)

    summary += f"* The production score has {production_row_count:,} census tracts, and the freshly calculated score has {local_row_count:,}."
    summary += (
        " They match!\n"
        if production_row_count == local_row_count
        else " They don't match.\n"
    )

    production_total_population = production_score_df["Total population"].sum()
    local_total_population = local_score_df["Total population"].sum()

    log_info(
        f"The total population in all census tracts in production is {production_total_population:,}."
    )
    log_info(
        f"The total population in all census tracts locally is {local_total_population:,}."
    )
    log_info(
        f"The difference in population is {abs(production_total_population - local_total_population):,}."
    )

    summary += f"* The total population in all census tracts in the production score is {production_total_population:,}."
    summary += f" The total population in all census tracts locally is {local_total_population:,}."
    summary += (
        " They match!\n"
        if production_total_population == local_total_population
        else f"  The difference is {abs(production_total_population - local_total_population):,}.\n"
    )

    production_disadvantaged_tracts_df = production_score_df.query(
        "`Definition N community, including adjacency index tracts` == True"
    )
    local_disadvantaged_tracts_df = local_score_df.query(
        "`Definition N community, including adjacency index tracts` == True"
    )

    production_disadvantaged_tracts_set = set(
        production_disadvantaged_tracts_df.index.array
    )
    local_disadvantaged_tracts_set = set(
        local_disadvantaged_tracts_df.index.array
    )

    production_pct_of_population_represented = (
        production_disadvantaged_tracts_df["Total population"].sum()
        / production_total_population
    )
    local_pct_of_population_represented = (
        local_disadvantaged_tracts_df["Total population"].sum()
        / local_total_population
    )

    log_info(
        f"There are {len(production_disadvantaged_tracts_set):,} disadvantaged tracts in the production score."
    )
    log_info(
        f"This represents {production_pct_of_population_represented:.1%} of the total population."
    )
    log_info(
        f"There are {len(local_disadvantaged_tracts_set):,} in the locally generated score."
    )
    log_info(
        f"This represents {local_pct_of_population_represented:.1%} of the total population."
    )
    log_info(
        f"The difference is {abs(len(production_disadvantaged_tracts_set) - len(local_disadvantaged_tracts_set)):,} tract(s)."
    )

    summary += f"* There are {len(production_disadvantaged_tracts_set):,} disadvantaged tracts in the production score representing"
    summary += f" {production_pct_of_population_represented:.1%} of the total population, and {len(local_disadvantaged_tracts_set):,}"
    summary += f" in the locally generated score representing {local_pct_of_population_represented:.1%} of the total population."
    summary += (
        " The number of tracts match!\n"
        if len(production_disadvantaged_tracts_set)
        == len(local_disadvantaged_tracts_set)
        else f" The difference is {abs(len(production_disadvantaged_tracts_set) - len(local_disadvantaged_tracts_set)):,} tract(s).\n"
    )

    removed_tracts = production_disadvantaged_tracts_set.difference(
        local_disadvantaged_tracts_set
    )
    added_tracts = local_disadvantaged_tracts_set.difference(
        production_disadvantaged_tracts_set
    )

    log_info(
        f"There are {len(removed_tracts):,} tract(s) marked as disadvantaged in the prod score that are not disadvantaged in the local score."
    )
    log_info(
        f"There are {len(added_tracts):,} tract(s) marked as disadvantaged in the local score that are not disadvantaged in the prod score."
    )

    summary += (
        f"* There are {len(removed_tracts):,} tract(s) marked as disadvantaged in the production score that are not disadvantaged in the locally"
        " generated score (i.e. disadvantaged tracts that were removed by the new score)."
        f" There are {len(added_tracts):,} tract(s) marked as disadvantaged in the locally generated score that are not disadvantaged in the"
        " production score (i.e. disadvantaged tracts that were added by the new score).\n"
    )

    try:

        comparison_results_df = production_score_df.compare(
            local_score_df, align_axis=1, keep_shape=False, keep_equal=False
        ).rename({"self": "Production", "other": "Local"}, axis=1, level=1)

        summary += "* I compared all values across all census tracts."
        summary += f" There are {len(comparison_results_df.index):,} tracts with at least one difference."
        summary += " Please examine the logs or run the score comparison locally to view them all.\n"
        log_info(
            f"There are {len(comparison_results_df.index)} rows with any differences."
        )

        log_info("Those differences are:")
        log_info("\n" + str(comparison_results_df))

        comparison_path = WORKING_PATH / "deltas.csv"
        comparison_results_df.to_csv(path_or_buf=comparison_path)

        log_info(f"Wrote comparison results to {comparison_path}")

    except ValueError as e:
        summary += "* I could not run a full comparison. This is likely because there are column or index (census tract) differences."
        summary += " Please examine the logs or run the score comparison locally to find out more.\n"
        log_info(
            f"Encountered an exception while performing the comparison: {repr(e)}"
        )

    summary_path = WORKING_PATH / "comparison-summary.md"

    with open(summary_path, "w", encoding="utf-8") as f:
        f.write(summary)
        log_info(f"Wrote comparison summary to {summary_path}")

    log_goodbye()
    sys.exit()


if __name__ == "__main__":
    cli()
