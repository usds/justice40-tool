# common usage functions
import csv
from pathlib import Path


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


def reset_data_directories(data_path: Path) -> None:
    print(data_path)
