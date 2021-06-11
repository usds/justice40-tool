import csv
import requests
import zipfile
import os

with requests.Session() as s:
    with open("data/fips_states_2010.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
            else:
                fips = row[0].strip()
                print(f"downloading {row[1]}")

                cbg_state_url = f"https://www2.census.gov/geo/tiger/TIGER2010/BG/2010/tl_2010_{fips}_bg10.zip"
                download = s.get(cbg_state_url)
                file_contents = download.content
                zip_file = open("data/census/downloaded.zip", "wb")
                zip_file.write(file_contents)
                zip_file.close()

                print(f"extracting {row[1]}")

                with zipfile.ZipFile("data/census/downloaded.zip", "r") as zip_ref:
                    zip_ref.extractall(f"data/census/shp/{fips}")

                # ogr2ogr
                print(f"encoding GeoJSON for {row[1]}")
                cmd = (
                    'docker run --rm -it -v "%cd%"/:/home osgeo/gdal:alpine-ultrasmall-latest ogr2ogr -f GeoJSON /home/data/census/geojson/'
                    + fips
                    + ".json /home/data/census/shp/"
                    + fips
                    + "/tl_2010_"
                    + fips
                    + "_bg10.shp"
                )
                print(cmd)
                os.system(cmd)

    print("Census block groups downloading complete")
