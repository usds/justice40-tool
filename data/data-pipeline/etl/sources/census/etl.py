import csv
import os
import json
from pathlib import Path
import geopandas as gpd

from .etl_utils import get_state_fips_codes
from utils import unzip_file_from_url, get_module_logger

logger = get_module_logger(__name__)


def download_census_csvs(data_path: Path) -> None:
    """Download all census shape files from the Census FTP and extract the geojson
    to generate national and by state Census Block Group CSVs and GeoJSONs

    Args:
        data_path (pathlib.Path): Name of the directory where the files and directories will
        be created

    Returns:
        None
    """

    # the fips_states_2010.csv is generated from data here
    # https://www.census.gov/geographies/reference-files/time-series/geo/tallies.html
    state_fips_codes = get_state_fips_codes(data_path)
    geojson_dir_path = data_path / "census" / "geojson"

    for fips in state_fips_codes:
        # check if file exists
        shp_file_path = data_path / "census" / "shp" / fips / f"tl_2010_{fips}_bg10.shp"

        logger.info(f"Checking if {fips} file exists")
        if not os.path.isfile(shp_file_path):
            logger.info(f"Downloading and extracting {fips} shape file")
            # 2020 tiger data is here: https://www2.census.gov/geo/tiger/TIGER2020/BG/
            # But using 2010 for now
            cbg_state_url = f"https://www2.census.gov/geo/tiger/TIGER2010/BG/2010/tl_2010_{fips}_bg10.zip"
            unzip_file_from_url(
                cbg_state_url,
                data_path / "tmp",
                data_path / "census" / "shp" / fips,
            )

            cmd = (
                "ogr2ogr -f GeoJSON data/census/geojson/"
                + fips
                + ".json data/census/shp/"
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
            logger.info(f"Ingesting geoid10 for file {file}")
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
            cbg_csv_file,
            delimiter=",",
            quotechar='"',
            quoting=csv.QUOTE_MINIMAL,
        )
        for geoid10 in cbg_national:
            cbg_csv_file_writer.writerow(
                [
                    geoid10,
                ]
            )

    ## create national geojson
    logger.info(f"Generating national geojson file")
    usa_df = gpd.GeoDataFrame()

    for file_name in geojson_dir_path.rglob("*.json"):
        logger.info(f"Ingesting {file_name}")
        state_gdf = gpd.read_file(file_name)
        usa_df = usa_df.append(state_gdf)

    usa_df = usa_df.to_crs("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
    logger.info(f"Writing national geojson file")
    usa_df.to_file(geojson_dir_path / "us.json", driver="GeoJSON")

    logger.info("Census block groups downloading complete")
