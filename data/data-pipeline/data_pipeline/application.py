import sys
from subprocess import call

import click
from data_pipeline.config import settings
from data_pipeline.etl.runner import etl_runner
from data_pipeline.etl.runner import score_generate
from data_pipeline.etl.runner import score_geo
from data_pipeline.etl.runner import score_post
from data_pipeline.etl.sources.census.etl_utils import check_census_data_source
from data_pipeline.etl.sources.census.etl_utils import (
    reset_data_directories as census_reset,
)
from data_pipeline.etl.sources.census.etl_utils import zip_census_data
from data_pipeline.etl.sources.tribal.etl_utils import (
    reset_data_directories as tribal_reset,
)
from data_pipeline.tile.generate import generate_tiles
from data_pipeline.utils import check_first_run
from data_pipeline.utils import data_folder_cleanup
from data_pipeline.utils import downloadable_cleanup
from data_pipeline.utils import get_module_logger
from data_pipeline.utils import score_folder_cleanup
from data_pipeline.utils import temp_folder_cleanup
from data_pipeline.utils import geo_score_folder_cleanup

logger = get_module_logger(__name__)

dataset_cli_help = "Grab the data from either 'local' for local access or 'aws' to retrieve from Justice40 S3 repository"

LOG_LINE_WIDTH = 60

@click.group()
def cli():
    """Defines a click group for the commands below"""


@cli.command(help="Clean up all census data folders")
def census_cleanup():
    """CLI command to clean up the census data folder"""
    log_title("Clean Up Census Data")

    data_path = settings.APP_ROOT / "data"

    # census directories
    log_info("Cleaning up all census data")
    census_reset(data_path)

    log_goodbye()
    sys.exit()


@cli.command(help="Clean up all data folders")
def data_cleanup():
    """CLI command to clean up the all the data folders"""
    log_title("Clean Up Data ")

    data_path = settings.APP_ROOT / "data"

    log_info("Cleaning up all data folders")
    census_reset(data_path)
    data_folder_cleanup()
    tribal_reset(data_path)
    score_folder_cleanup()
    temp_folder_cleanup()
    geo_score_folder_cleanup()

    log_goodbye()
    sys.exit()


@cli.command(
    help="Census data download",
)
@click.option(
    "-zc",
    "--zip-compress",
    is_flag=True,
    help="Upload to AWS S3 a zipped archive of the census data.",
)
def census_data_download(zip_compress):
    """CLI command to download all census shape files from the Census FTP and extract the geojson
    to generate national and by state Census Block Group CSVs"""
    log_title("Download Census Data ")

    data_path = settings.APP_ROOT / "data"
    census_reset(data_path)

    log_info("Downloading census data")
    etl_runner("census")

    if zip_compress:
        log_info("Zipping census data")
        zip_census_data()

    log_goodbye()
    sys.exit()


@cli.command(help="Retrieve census data from source")
@click.option(
    "-s",
    "--data-source",
    default="local",
    required=False,
    type=str,
    help=dataset_cli_help,
)
def pull_census_data(data_source: str):

    log_title("Pull Census Data")

    log_info("Pulling census data from %s", data_source)
    data_path = settings.APP_ROOT / "data" / "census"
    check_census_data_source(data_path, data_source)

    log_goodbye()
    sys.exit()


@cli.command(
    help="Run all ETL processes or a specific one",
)
@click.option(
    "-d",
    "--dataset",
    required=False,
    type=str,
    help=dataset_cli_help,
)
def etl_run(dataset: str):
    """Run a specific or all ETL processes

    Args:
        dataset (str): Name of the ETL module to be run (optional)

    Returns:
        None
    """
    log_title("Run ETL")

    log_info("Running dataset(s)")
    etl_runner(dataset)

    log_goodbye()
    sys.exit()


@cli.command(
    help="Generate Score",
)
def score_run():
    """CLI command to generate the score"""
    log_title("Score", "Generate Score")

    log_info("Cleaning up data folders")
    score_folder_cleanup()

    log_info("Generating score")
    score_generate()

    log_goodbye()
    sys.exit()


@cli.command(
    help="Run ETL + Score Generation",
)
def score_full_run():
    """CLI command to run ETL and generate the score in one command"""
    log_title("Score Full Run", "Run ETL and Generate Score (no tiles)")

    log_info("Cleaning up data folders")
    data_folder_cleanup()
    score_folder_cleanup()
    temp_folder_cleanup()

    log_info("Running all ETLs")
    etl_runner()

    log_info("Generating score")
    score_generate()

    log_goodbye()
    sys.exit()


@cli.command(
    help="Run etl_score_post to create score csv, tile csv, and downloadable zip"
)
@click.option(
    "-s",
    "--data-source",
    default="local",
    required=False,
    type=str,
    help=dataset_cli_help,
)
def generate_score_post(data_source: str):
    """CLI command to generate score, tile, and downloadable files

    Args:
        data_source (str): Source for the census data (optional)
                           Options:
                           - local: fetch census and score data from the local data directory
                           - aws: fetch census and score from AWS S3 J40 data repository

    Returns:
        None
    """
    log_title("Generate Score Post ", "Create Score CSV, Tile CSV, Downloadable ZIP")

    log_info("Cleaning up downloadable folder")
    downloadable_cleanup()

    log_info("Running score post activities")
    score_post(data_source)

    log_goodbye()
    sys.exit()


@cli.command(help="Generate GeoJSON files with scores baked in")
@click.option(
    "-s",
    "--data-source",
    default="local",
    required=False,
    type=str,
    help=dataset_cli_help,
)
def geo_score(data_source: str):
    """CLI command to combine score with GeoJSON data and generate low and high files

    Args:
        data_source (str): Source for the census data (optional)
                           Options:
                           - local: fetch census and score data from the local data directory
                           - aws: fetch census and score from AWS S3 J40 data repository

    Returns:
        None
    """
    log_title("Generate GeoJSON", "Combine Score and GeoJSON")

    log_info("Cleaning up geo score folder")
    geo_score_folder_cleanup()

    log_info("Combining score with GeoJSON")
    score_geo(data_source=data_source)

    log_goodbye()
    sys.exit()


@cli.command(
    help="Generate map tiles. Pass -t to generate tribal layer as well.",
)
@click.option(
    "-t",
    "--generate-tribal-layer",
    default=False,
    required=False,
    is_flag=True,
    type=bool,
)
def generate_map_tiles(generate_tribal_layer):
    """CLI command to generate the map tiles"""
    log_title("Generate Map Tiles")

    data_path = settings.APP_ROOT / "data"

    log_info("Generating tiles")
    generate_tiles(data_path, generate_tribal_layer)

    log_goodbye()
    sys.exit()


@cli.command(
    help="Data Full Run (Census download, ETLs, score, combine and tile generation)",
)
@click.option(
    "-c",
    "--check",
    is_flag=True,
    help="Check if data run has been run before, and don't run it if so.",
)
@click.option(
    "-s",
    "--data-source",
    default="local",
    required=False,
    type=str,
    help=dataset_cli_help,
)
def data_full_run(check: bool, data_source: str):
    """CLI command to run ETL, score, JSON combine and generate tiles in one command

    Args:
        check (bool): Run the full data run only if the first run sempahore file is not set (optional)
        data_source (str): Source for the census data (optional)
                           Options:
                           - local: fetch census and score data from the local data directory
                           - aws: fetch census and score from AWS S3 J40 data repository

     Returns:
        None
    """
    log_title("Full Run", "Census DL, ETL, Score, Combine, Generate Tiles")

    data_path = settings.APP_ROOT / "data"

    if check:
        if not check_first_run():
            # check if the data full run has been run before
            log_info("The data full run was already executed")
            sys.exit()

    else:
        # census directories
        log_info("Cleaning up data folders")
        census_reset(data_path)
        data_folder_cleanup()
        score_folder_cleanup()
        temp_folder_cleanup()

        if data_source == "local":
            log_info("Downloading census data")
            etl_runner("census")

        log_info("Running all ETLs")
        etl_runner()

        log_info("Generating score")
        score_generate()

        log_info("Running post score")
        downloadable_cleanup()
        score_post(data_source)

    log_info("Combining score with census GeoJSON")
    score_geo(data_source)

    log_info("Generating map tiles")
    generate_tiles(data_path, True)

    log_.info("Completing pipeline")
    file = "first_run.txt"
    cmd = f"touch {data_path}/{file}"
    call(cmd, shell=True)

    log_goodbye()
    sys.exit()

def log_title(title: str, subtitle: str = None):
    """Logs a title in our fancy title format"""    
    logger.info("-"*LOG_LINE_WIDTH)
    logger.info("")
    logger.info(f"{title}")
    if subtitle:
        logger.info(f"{subtitle}")
    logger.info("")
    logger.info("-"*LOG_LINE_WIDTH)
    logger.info("")

    
def log_info(info: str):
    """Logs a general informational message"""
    logger.info(f"- {info}")
    
def log_goodbye():
    """Logs a goodbye message"""
    logger.info("- Finished. Bye!")  

if __name__ == "__main__":
    cli()
