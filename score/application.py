from config import settings
import click
from pathlib import Path
import logging

from etl.sources.census.etl_utils import reset_data_directories as census_reset
from utils import remove_files_from_dir, remove_all_from_dir
from etl.sources.census.etl import download_census_csvs

settings.APP_ROOT = Path.cwd()


@click.group()
def cli():
    pass


@cli.command(
    help="Clean up all data folders",
)
def data_cleanup():

    data_path = settings.APP_ROOT / "data"

    # census directories
    logging.info(f"Initializing all census data")
    census_reset(data_path)

    # dataset directory
    logging.info(f"Initializing all dataset directoriees")
    remove_all_from_dir(data_path / "dataset")

    # score directory
    logging.info(f"Initializing all score data")
    remove_files_from_dir(data_path / "score" / "csv", ".csv")
    remove_files_from_dir(data_path / "score" / "geojson", ".json")

    # cleanup tmp dir
    logging.info(f"Initializing all temp directoriees")
    remove_all_from_dir(data_path / "tmp")

    logging.info("Cleaned up all data files")


@cli.command(
    help="Census data download",
)
def census_data_download():
    logging.info("Downloading Census data")
    data_path = settings.APP_ROOT / "data"
    download_census_csvs(data_path)


if __name__ == "__main__":
    cli()
