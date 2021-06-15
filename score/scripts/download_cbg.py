import csv
import requests
import zipfile
import os
import json
from pathlib import Path

data_path = Path.cwd().joinpath("data")

with requests.Session() as s:
    # the fips_states_2010.csv is generated from data here
    # https://www.census.gov/geographies/reference-files/time-series/geo/tallies.html
    fips_csv_path = data_path.joinpath("fips_states_2010.csv")
    with open(fips_csv_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
            else:
                fips = row[0].strip()

                # check if file exists
                shp_file_path = data_path.joinpath(
                    "census", "shp", fips, f"tl_2010_{fips}_bg10.shp"
                )
                if not os.path.isfile(shp_file_path):
                    print(f"downloading {row[1]}")

                    cbg_state_url = f"https://www2.census.gov/geo/tiger/TIGER2010/BG/2010/tl_2010_{fips}_bg10.zip"
                    download = s.get(cbg_state_url)
                    file_contents = download.content
                    zip_file_path = data_path.joinpath("census", "downloaded.zip")
                    zip_file = open(zip_file_path, "wb")
                    zip_file.write(file_contents)
                    zip_file.close()

                    print(f"extracting {row[1]}")

                    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
                        shp_dir_path = data_path.joinpath("census", "shp", fips)
                        zip_ref.extractall(shp_dir_path)

                geojson_dir_path = data_path.joinpath(
                    "census",
                    "geojson",
                )
                if not os.path.isfile(geojson_dir_path.joinpath(fips + ".json")):
                    # ogr2ogr
                    print(f"encoding GeoJSON for {row[1]}")

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
                    print(cmd)
                    os.system(cmd)

    # generate CBG CSV table for pandas
    ## load in memory
    cbg_national_list = []  # in-memory global list
    cbg_per_state_list = {}  # in-memory dict per state
    for file in os.listdir(geojson_dir_path):
        if file.endswith(".json"):
            print(f"ingesting geoid10 for file {file}")
            with open(geojson_dir_path.joinpath(file)) as f:
                geojson = json.load(f)
                for feature in geojson["features"]:
                    geoid10 = feature["properties"]["GEOID10"]
                    cbg_national_list.append(str(geoid10))
                    geoid10_state_id = geoid10[:2]
                    if not cbg_per_state_list.get(geoid10_state_id):
                        cbg_per_state_list[geoid10_state_id] = []
                    cbg_per_state_list[geoid10_state_id].append(geoid10)

    csv_dir_path = data_path.joinpath(
        "census",
        "csv",
    )
    ## write to individual state csv
    for state_id in cbg_per_state_list:
        geoid10_list = cbg_per_state_list[state_id]
        with open(
            csv_dir_path.joinpath(f"{state_id}.csv"), mode="w", newline=""
        ) as cbg_csv_file:
            cbg_csv_file_writer = csv.writer(
                cbg_csv_file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
            )

            for geoid10 in geoid10_list:
                cbg_csv_file_writer.writerow(
                    [
                        geoid10,
                    ]
                )

    ## write US csv
    with open(csv_dir_path.joinpath("us.csv"), mode="w", newline="") as cbg_csv_file:
        cbg_csv_file_writer = csv.writer(
            cbg_csv_file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )
        for geoid10 in cbg_national_list:
            cbg_csv_file_writer.writerow(
                [
                    geoid10,
                ]
            )

    print("Census block groups downloading complete")
