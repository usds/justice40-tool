import click

from .config import settings
from .etl.runner import etl_runner, score_generate, score_geo
from .etl.sources.census.etl import download_census_csvs
from .etl.sources.census.etl_utils import reset_data_directories as census_reset
from .tile.generate import generate_tiles
from .utils import (
    data_folder_cleanup,
    get_module_logger,
    score_folder_cleanup,
    temp_folder_cleanup,
)

logger = get_module_logger(__name__)


@click.group()
def cli():
    """Defines a click group for the commands below"""

    pass


@cli.command(help="Clean up all census data folders",)
def census_cleanup():
    """CLI command to clean up the census data folder"""

    data_path = settings.APP_ROOT / "data"

    # census directories
    logger.info("Initializing all census data")
    census_reset(data_path)

    logger.info("Cleaned up all census data files")


@cli.command(help="Clean up all data folders",)
def data_cleanup():
    """CLI command to clean up the all the data folders"""

    data_folder_cleanup()
    score_folder_cleanup()
    temp_folder_cleanup()

    logger.info("Cleaned up all data folders")


@cli.command(help="Census data download",)
def census_data_download():
    """CLI command to download all census shape files from the Census FTP and extract the geojson
    to generate national and by state Census Block Group CSVs"""

    logger.info("Downloading census data")
    data_path = settings.APP_ROOT / "data"
    download_census_csvs(data_path)

    logger.info("Completed downloading census data")


@cli.command(help="Run all ETL processes or a specific one",)
@click.option("-d", "--dataset", required=False, type=str)
def etl_run(dataset: str):
    """Run a specific or all ETL processes

    Args:
        dataset (str): Name of the ETL module to be run (optional)

    Returns:
        None
    """

    etl_runner(dataset)


@cli.command(help="Generate Score",)
def score_run():
    """CLI command to generate the score"""

    score_generate()


@cli.command(help="Generate Geojson files with scores baked in",)
def geo_score():
    """CLI command to generate the score"""

    score_geo()


@cli.command(help="Generate map tiles",)
def generate_map_tiles():
    """CLI command to generate the map tiles"""

    data_path = settings.APP_ROOT / "data"
    generate_tiles(data_path)


if __name__ == "__main__":
    cli()
