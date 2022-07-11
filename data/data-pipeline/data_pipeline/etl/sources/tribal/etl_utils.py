from pathlib import Path

from data_pipeline.config import settings
from data_pipeline.utils import (
    get_module_logger,
    remove_files_from_dir,
    zip_directory,
)


logger = get_module_logger(__name__)


def reset_data_directories(
    data_path: Path,
) -> None:
    """Empties all tribal files"""
    tribal_data_path = data_path / "tribal"

    # csv
    csv_path = tribal_data_path / "csv"
    remove_files_from_dir(
        csv_path,
        ".csv",
    )

    # geojson
    geojson_path = tribal_data_path / "geojson"
    remove_files_from_dir(geojson_path, ".json")


def zip_tribal_data():
    logger.info("Compressing tribal files to data/tmp folder")

    CENSUS_DATA_PATH = settings.APP_ROOT / "data" / "tribal"
    TMP_PATH = settings.APP_ROOT / "data" / "tmp"

    # zip folder
    zip_directory(CENSUS_DATA_PATH, TMP_PATH)
