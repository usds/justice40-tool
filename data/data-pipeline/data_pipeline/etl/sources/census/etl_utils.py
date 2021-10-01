import csv
import os
import sys
from pathlib import Path

import pandas as pd
from data_pipeline.config import settings
from data_pipeline.utils import (
    get_module_logger,
    remove_all_dirs_from_dir,
    remove_files_from_dir,
    unzip_file_from_url,
)
from data_pipeline.config import settings

logger = get_module_logger(__name__)


def reset_data_directories(data_path: Path) -> None:
    """Empties all census folders"""
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


def get_state_fips_codes(data_path: Path) -> list:
    """Returns a list with state data"""
    fips_csv_path = data_path / "census" / "csv" / "fips_states_2010.csv"

    # check if file exists
    if not os.path.isfile(fips_csv_path):
        logger.info("Downloading fips from S3 repository")
        unzip_file_from_url(
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/fips_states_2010.zip",
            data_path / "tmp",
            data_path / "census" / "csv",
        )

    fips_state_list = []
    with open(fips_csv_path, encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0

        for row in csv_reader:
            if line_count == 0:
                line_count += 1
            else:
                fips = row[0].strip()
                fips_state_list.append(fips)
    return fips_state_list


def get_state_information(data_path: Path) -> pd.DataFrame:
    """Load the full state file as a dataframe.

    Useful because of the state regional information.
    """
    fips_csv_path = data_path / "census" / "csv" / "fips_states_2010.csv"

    df = pd.read_csv(fips_csv_path)

    # Left pad the FIPS codes with 0s
    df["fips"] = df["fips"].astype(str).apply(lambda x: x.zfill(2))

    return df


def check_census_data(census_data_path: Path, census_data_source: str) -> None:
    """Checks if census data is present, and exits gradefully if it doesn't exist and if the user didn't request S3 downloading

    Args:
        census_data_path (str): Path for Census data
        census_data_source (str): Source for the census data
                                  Options:
                                  - local: fetch census data from the local data directory
                                  - aws: fetch census from AWS S3 J40 data repository

    Returns:
        None

    """
    breakpoint()
    CENSUS_DATA_S3_URL = settings.AWS_JUSTICE40_DATASOURCES_URL + "/census.zip"
    DATA_PATH = settings.APP_ROOT / "data"

    if not os.path.isfile(census_data_path / "geojson" / "us.json"):
        if census_data_source == "aws":
            logger.info("Fetching Census data from AWS S3")
            unzip_file_from_url(
                CENSUS_DATA_S3_URL,
                DATA_PATH / "tmp",
                DATA_PATH,
            )
        else:
            logger.info(
                "No local census data found. Please use '-cds aws` to fetch from AWS"
            )
            sys.exit()
