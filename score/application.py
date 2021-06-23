from config import settings
import click
from pathlib import Path

from utils import reset_data_directories

settings.APP_ROOT = Path.cwd()


@click.group()
def cli():
    pass


@cli.command(
    help="Initialize all data folders",
)
def data_init():
    data_path = settings.APP_ROOT / "data"
    click.echo(f"Initializing all data folders in {data_path}")
    reset_data_directories("moco")


@cli.command(
    help="Census data download",
)
def census():
    click.echo("Dropped the database")


if __name__ == "__main__":
    cli()
