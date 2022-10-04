from pathlib import Path

from data_pipeline.utils import get_module_logger
from data_pipeline.utils import remove_all_from_dir
from data_pipeline.utils import remove_files_from_dir

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
    remove_all_from_dir(geojson_path)
