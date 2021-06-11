import csv
import requests
import zipfile

with requests.Session() as s:
    fips = "01"
    print(f"downloading {fips}")

    cbg_state_url = (
        f"https://www2.census.gov/geo/tiger/TIGER2010/BG/2010/tl_2010_{fips}_bg10.zip"
    )
    download = s.get(cbg_state_url)
    file_contents = download.content
    zip_file = open("downloaded.zip", "wb")
    zip_file.write(file_contents)
    zip_file.close()

    print(f"extracting {fips}")

    with zipfile.ZipFile("downloaded.zip", "r") as zip_ref:
        zip_ref.extractall("data")
