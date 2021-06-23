# common usage functions
import csv
from pathlib import Path
import os
import logging
from typing import Union
import shutil


def get_state_fips_codes(data_path: Path) -> list:
    fips_csv_path = data_path / "census" / "fips_states_2010.csv"
    fips_state_list = []
    with open(fips_csv_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0

        for row in csv_reader:
            if line_count == 0:
                line_count += 1
            else:
                fips = row[0].strip()
                fips_state_list.append(fips)
    return fips_state_list


def remove_files_from_dir(files_path: Path, extension: str = None) -> None:
    for file in os.listdir(files_path):
        if extension:
            if not file.endswith(extension):
                continue
        else:
            # don't rempove __init__ files as they conserve dir structure
            if file == "__init__.py":
                continue
        os.remove(files_path / file)
        logging.info(f"Removing {file}")


def remove_all_dirs_from_dir(dir_path: Path) -> None:
    for filename in os.listdir(dir_path):
        file_path = os.path.join(dir_path, filename)
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)
            logging.info(f"Removing directory {file_path}")
