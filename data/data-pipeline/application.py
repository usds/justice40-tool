import click

from config import settings
from etl.sources.census.etl_utils import reset_data_directories as census_reset
from utils import (
    get_module_logger,
    data_folder_cleanup,
    score_folder_cleanup,
    temp_folder_cleanup,
)
from etl.sources.census.etl import download_census_csvs
from etl.runner import etl_runner, score_generate, score_geo

logger = get_module_logger(__name__)


@click.group()
def cli():
    """Defines a click group for the commands below"""

    pass


@cli.command(
    help="Clean up all census data folders",
)
def census_cleanup():
    """CLI command to clean up the census data folder"""

    data_path = settings.APP_ROOT / "data"

    # census directories
    logger.info(f"Initializing all census data")
    census_reset(data_path)

    logger.info("Cleaned up all census data files")


@cli.command(
    help="Clean up all data folders",
)
def data_cleanup():
    """CLI command to clean up the all the data folders"""

    data_folder_cleanup()
    score_folder_cleanup()
    temp_folder_cleanup()

    logger.info("Cleaned up all data folders")


@cli.command(
    help="Census data download",
)
def census_data_download():
    """CLI command to download all census shape files from the Census FTP and extract the geojson
    to generate national and by state Census Block Group CSVs"""

    logger.info("Downloading census data")
    data_path = settings.APP_ROOT / "data"
    download_census_csvs(data_path)

    logger.info("Completed downloading census data")


@cli.command(
    help="Run all ETL processes or a specific one",
)
@click.option("-d", "--dataset", required=False, type=str)
def etl_run(dataset: str):
    """Run a specific or all ETL processes

    Args:
        dataset (str): Name of the ETL module to be run (optional)

    Returns:
        None
    """

    etl_runner(dataset)


@cli.command(
    help="Generate Score",
)
def score_run():
    """CLI command to generate the score"""
    score_generate()


@cli.command(
    help="Generate Geojson files with scores baked in",
)
def geo_score():
    """CLI command to generate the score"""
    score_geo()


if __name__ == "__main__":
    cli()
