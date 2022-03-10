from subprocess import call
import sys
import click

from data_pipeline.config import settings
from data_pipeline.etl.runner import (
    etl_runner,
    score_generate,
    score_geo,
    score_post,
)
from data_pipeline.etl.sources.census.etl_utils import (
    reset_data_directories as census_reset,
    zip_census_data,
)
from data_pipeline.tile.generate import generate_tiles
from data_pipeline.utils import (
    data_folder_cleanup,
    get_module_logger,
    score_folder_cleanup,
    downloadable_cleanup,
    temp_folder_cleanup,
    check_first_run,
)

logger = get_module_logger(__name__)

dataset_cli_help = "Grab the data from either 'local' for local access or 'aws' to retrieve from Justice40 S3 repository"


@click.group()
def cli():
    """Defines a click group for the commands below"""

    pass


@cli.command(help="Clean up all census data folders")
def census_cleanup():
    """CLI command to clean up the census data folder"""

    data_path = settings.APP_ROOT / "data"

    # census directories
    logger.info("Initializing all census data")
    census_reset(data_path)

    logger.info("Cleaned up all census data files")
    sys.exit()


@cli.command(help="Clean up all data folders")
def data_cleanup():
    """CLI command to clean up the all the data folders"""

    data_path = settings.APP_ROOT / "data"

    census_reset(data_path)
    data_folder_cleanup()
    score_folder_cleanup()
    temp_folder_cleanup()

    logger.info("Cleaned up all data folders")
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

    logger.info("Initializing all census data")

    data_path = settings.APP_ROOT / "data"
    census_reset(data_path)

    logger.info("Downloading census data")
    etl_runner("census")

    if zip_compress:
        zip_census_data()

    logger.info("Completed downloading census data")
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

    etl_runner(dataset)
    sys.exit()


@cli.command(
    help="Generate Score",
)
def score_run():
    """CLI command to generate the score"""

    score_folder_cleanup()
    score_generate()
    sys.exit()


@cli.command(
    help="Run ETL + Score Generation",
)
def score_full_run():
    """CLI command to run ETL and generate the score in one command"""

    data_folder_cleanup()
    score_folder_cleanup()
    temp_folder_cleanup()
    etl_runner()
    score_generate()
    sys.exit()


@cli.command(help="Generate Geojson files with scores baked in")
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

    score_geo(data_source=data_source)
    sys.exit()


@cli.command(
    help="Generate map tiles",
)
def generate_map_tiles():
    """CLI command to generate the map tiles"""

    data_path = settings.APP_ROOT / "data"
    generate_tiles(data_path)
    sys.exit()


@cli.command(
    help="Run etl_score_post to create score csv, tile csv, and downloadable zip",
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

    downloadable_cleanup()
    score_post(data_source)
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
    data_path = settings.APP_ROOT / "data"

    if check:
        if not check_first_run():
            # check if the data full run has been run before
            logger.info("*** The data full run was already executed")
            sys.exit()

    else:
        # census directories
        logger.info("*** Initializing all data folders")
        census_reset(data_path)
        data_folder_cleanup()
        score_folder_cleanup()
        temp_folder_cleanup()

        if data_source == "local":
            logger.info("*** Downloading census data")
            etl_runner("census")

        logger.info("*** Running all ETLs")
        etl_runner()

        logger.info("*** Generating Score")
        score_generate()

        logger.info("*** Running Post Score scripts")
        downloadable_cleanup()
        score_post(data_source)

    logger.info("*** Combining Score with Census Geojson")
    score_geo(data_source)

    logger.info("*** Generating Map Tiles")
    generate_tiles(data_path)

    file = "first_run.txt"
    cmd = f"touch {data_path}/{file}"
    call(cmd, shell=True)

    logger.info("*** Map data ready")
    sys.exit()


if __name__ == "__main__":
    cli()
