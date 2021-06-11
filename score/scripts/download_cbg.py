import csv
import requests
import zipfile
import shapefile
from json import dumps

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

                # read the shapefile
                reader = shapefile.Reader(
                    f"data/census/shp/{fips}/tl_2010_{fips}_bg10.shp"
                )
                fields = reader.fields[1:]
                field_names = [field[0] for field in fields]
                buffer = []
                for sr in reader.shapeRecords():
                    atr = dict(zip(field_names, sr.record))
                    geom = sr.shape.__geo_interface__
                    buffer.append(dict(type="Feature", geometry=geom, properties=atr))

                    # write the GeoJSON file
                    geojson = open("data/census/geojson/{fips}.json", "w")
                    geojson.write(
                        dumps(
                            {"type": "FeatureCollection", "features": buffer}, indent=2
                        )
                        + "\n"
                    )
                    geojson.close()

    print("Census block groups downloading complete")
