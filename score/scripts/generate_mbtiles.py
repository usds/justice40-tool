import os
from pathlib import Path
import shutil

data_path = Path.cwd() / "data"

# remove existing mbtiles file
mb_tiles_path = data_path / "tiles" / "block2010.mbtiles"
if os.path.exists(mb_tiles_path):
    os.remove(mb_tiles_path)

# remove existing mvt directory
mvt_tiles_path = data_path / "tiles" / "mvt"
if os.path.exists(mvt_tiles_path):
    shutil.rmtree(mvt_tiles_path)

# get a list of all json files to plug in the docker commands below
# (workaround since *.json doesn't seem to work)
geojson_list = ""
geojson_path = data_path / "census" / "geojson"
for file in os.listdir(geojson_path):
    if file.endswith(".json"):
        geojson_list += f"/home/data/census/geojson/{file} "

if geojson_list == "":
    print("No GeoJson files found. Please run download_cbg.py first")

# PWD is different for Windows
if os.name == "nt":
    pwd = "%cd%"
else:
    pwd = "${PWD}"
cmd = (
    'docker run --rm -it -v "'
    + pwd
    + '"/:/home klokantech/tippecanoe tippecanoe -s_srs EPSG:4269 -t_srs EPSG:4326 --drop-densest-as-needed -zg -o /home/data/tiles/block2010.mbtiles --drop-densest-as-needed --extend-zooms-if-still-dropping -l cbg2010 -s_srs EPSG:4269 -t_srs EPSG:4326 '
    + geojson_list
)
print(cmd)
os.system(cmd)

# if AWS creds are present, generate uncompressed toles
# docker run --rm -it -v ${PWD}:/data tippecanoe tippecanoe --no-tile-compression -zg -e /data/tiles_custom -l blocks /data/tabblock2010_01_pophu_joined.json
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
