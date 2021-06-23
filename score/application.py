from config import settings
import click
from pathlib import Path
import logging

from etl.sources.census.utils import reset_data_directories as census_reset
from etl.sources.ejscreen.utils import reset_data_directories as ejscreen_reset
from utils import remove_files_from_dir

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

    # ejscreen directory
    # TODO: read data sets and properties from a database built from YAMLs
    logging.info(f"Initializing all ejscreen data")
    ejscreen_reset(data_path)

    # score directory
    logging.info(f"Initializing all score data")
    remove_files_from_dir(data_path / "score" / "csv", ".csv")
    remove_files_from_dir(data_path / "score" / "geojson", ".json")

    # cleanup tmp dir
    remove_files_from_dir(data_path / "tmp")


@cli.command(
    help="Census data download",
)
def census():
    click.echo("Dropped the database")


if __name__ == "__main__":
    cli()
