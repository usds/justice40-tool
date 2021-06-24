import csv
import os
import json
from pathlib import Path
import logging

from .etl_utils import get_state_fips_codes
from utils import unzip_file_from_url


def download_census_csvs(data_path: Path) -> None:
    # the fips_states_2010.csv is generated from data here
    # https://www.census.gov/geographies/reference-files/time-series/geo/tallies.html
    state_fips_codes = get_state_fips_codes(data_path)
    for fips in state_fips_codes:
        # check if file exists
        shp_file_path = data_path / "census" / "shp" / fips / f"tl_2010_{fips}_bg10.shp"

        if not os.path.isfile(shp_file_path):
            logging.info(f"Downloading {fips}")

            # 2020 tiger data is here: https://www2.census.gov/geo/tiger/TIGER2020/BG/
            # But using 2010 for now
            cbg_state_url = f"https://www2.census.gov/geo/tiger/TIGER2010/BG/2010/tl_2010_{fips}_bg10.zip"
            unzip_file_from_url(
                cbg_state_url, data_path / "tmp", data_path / "census" / "shp" / fips
            )

        geojson_dir_path = data_path / "census" / "geojson"

        if not os.path.isfile(geojson_dir_path / f"{fips}.json"):
            # ogr2ogr
            logging.info(f"Encoding GeoJSON for {fips}")

            # if it's running inside Docker container
            if os.environ.get("DOCKER_CONTAINER"):
                # TODO
                pass
            else:
                # this is being run on virtualenv
                # PWD is different for Windows
                if os.name == "nt":
                    pwd = "%cd%"
                else:
                    pwd = "${PWD}"
                cmd = (
                    'docker run --rm -it -v "'
                    + pwd
                    + '"/:/home osgeo/gdal:alpine-ultrasmall-latest ogr2ogr -f GeoJSON /home/data/census/geojson/'
                    + fips
                    + ".json /home/data/census/shp/"
                    + fips
                    + "/tl_2010_"
                    + fips
                    + "_bg10.shp"
                )
                os.system(cmd)

        # generate CBG CSV table for pandas
        ## load in memory
        cbg_national = []  # in-memory global list
        cbg_per_state: dict = {}  # in-memory dict per state
        for file in os.listdir(geojson_dir_path):
            if file.endswith(".json"):
                logging.info(f"Ingesting geoid10 for file {file}")
                with open(geojson_dir_path / file) as f:
                    geojson = json.load(f)
                    for feature in geojson["features"]:
                        geoid10 = feature["properties"]["GEOID10"]
                        cbg_national.append(str(geoid10))
                        geoid10_state_id = geoid10[:2]
                        if not cbg_per_state.get(geoid10_state_id):
                            cbg_per_state[geoid10_state_id] = []
                        cbg_per_state[geoid10_state_id].append(geoid10)

        csv_dir_path = data_path / "census" / "csv"
        ## write to individual state csv
        for state_id in cbg_per_state:
            geoid10_list = cbg_per_state[state_id]
            with open(
                csv_dir_path / f"{state_id}.csv", mode="w", newline=""
            ) as cbg_csv_file:
                cbg_csv_file_writer = csv.writer(
                    cbg_csv_file,
                    delimiter=",",
                    quotechar='"',
                    quoting=csv.QUOTE_MINIMAL,
                )

                for geoid10 in geoid10_list:
                    cbg_csv_file_writer.writerow(
                        [
                            geoid10,
                        ]
                    )

        ## write US csv
        with open(csv_dir_path / "us.csv", mode="w", newline="") as cbg_csv_file:
            cbg_csv_file_writer = csv.writer(
                cbg_csv_file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
            )
            for geoid10 in cbg_national:
                cbg_csv_file_writer.writerow(
                    [
                        geoid10,
                    ]
                )

        logging.info("Census block groups downloading complete")
