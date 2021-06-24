import os
from pathlib import Path
import shutil

from etl.sources.census.etl_utils import get_state_fips_codes


def generate_tiles(data_path: Path):

    # remove existing mbtiles file
    mb_tiles_path = data_path / "tiles" / "block2010.mbtiles"
    if os.path.exists(mb_tiles_path):
        os.remove(mb_tiles_path)

    # remove existing mvt directory
    mvt_tiles_path = data_path / "tiles" / "mvt"
    if os.path.exists(mvt_tiles_path):
        shutil.rmtree(mvt_tiles_path)

    # Merge scores into json
    # TODO: for this first pass, just merging ACS EJScren indicators
    #       Per https://github.com/usds/justice40-tool/issues/102

    if os.name == "nt":
        pwd = "%cd%"
    else:
        pwd = "${PWD}"

    # remove existing score json files
    score_geojson_dir = data_path / "score" / "geojson"
    files_in_directory = os.listdir(score_geojson_dir)
    filtered_files = [file for file in files_in_directory if file.endswith(".json")]
    for file in filtered_files:
        path_to_file = os.path.join(score_geojson_dir, file)
        os.remove(path_to_file)

    # join the state shape sqllite with the score csv
    state_fips_codes = get_state_fips_codes()
    for fips in state_fips_codes:
        cmd = (
            'docker run --rm -v "'
            + pwd
            + '"/:/home '
            + "osgeo/gdal:alpine-small-latest ogr2ogr -f GeoJSON "
            + f"-sql \"SELECT * FROM tl_2010_{fips}_bg10 LEFT JOIN '/home/data/score/csv/data{fips}.csv'.data{fips} ON tl_2010_{fips}_bg10.GEOID10 = data{fips}.ID\" "
            + f"/home/data/score/geojson/{fips}.json /home/data/census/shp/{fips}/tl_2010_{fips}_bg10.dbf"
        )
        print(cmd)
        os.system(cmd)

    # get a list of all json files to plug in the docker commands below
    # (workaround since *.json doesn't seem to work)
    geojson_list = ""
    geojson_path = data_path / "score" / "geojson"
    for file in os.listdir(geojson_path):
        if file.endswith(".json"):
            geojson_list += f"/home/data/score/geojson/{file} "

    if geojson_list == "":
        print("No GeoJson files found. Please run scripts/download_cbg.py first")

    # generate mbtiles file
    # PWD is different for Windows
    if os.name == "nt":
        pwd = "%cd%"
    else:
        pwd = "${PWD}"
    cmd = (
        'docker run --rm -it -v "'
        + pwd
        + '"/:/home klokantech/tippecanoe tippecanoe --drop-densest-as-needed -zg -o /home/data/tiles/block2010.mbtiles --extend-zooms-if-still-dropping -l cbg2010 -s_srs EPSG:4269 -t_srs EPSG:4326 '
        + geojson_list
    )
    print(cmd)
    os.system(cmd)

    # PWD is different for Windows
    if os.name == "nt":
        pwd = "%cd%"
    else:
        pwd = "${PWD}"
    cmd = (
        'docker run --rm -it -v "'
        + pwd
        + '"/:/home klokantech/tippecanoe tippecanoe --drop-densest-as-needed --no-tile-compression  -zg -e /home/data/tiles/mvt '
        + geojson_list
    )
    print(cmd)
    os.system(cmd)
