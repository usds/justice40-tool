from pathlib import Path

from utils import remove_files_from_dir, remove_all_dirs_from_dir


def reset_data_directories(data_path: Path) -> None:
    ejscreen_data_path = data_path / "dataset" / "ejscreen_2020"
    remove_files_from_dir(ejscreen_data_path, ".csv")
