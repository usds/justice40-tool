from pathlib import Path

from utils import remove_files_from_dir, remove_all_dirs_from_dir


def reset_data_directories(data_path: Path) -> None:
    census_data_path = data_path / "census"

    # csv
    csv_path = census_data_path / "csv"
    remove_files_from_dir(csv_path, ".csv")

    # geojson
    geojson_path = census_data_path / "geojson"
    remove_files_from_dir(geojson_path, ".json")

    # shp
    shp_path = census_data_path / "shp"
    remove_all_dirs_from_dir(shp_path)
