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
    print("No GeoJson files found. Please run scripts/download_cbg.py first")

# Merge scores into json
# TODO: for this first pass, just merging ACS EJScren indicators
#       Per https://github.com/usds/justice40-tool/issues/102
# -sql "SELECT * FROM tabblock2010_01_pophu LEFT JOIN '/home/custom.csv'.custom ON tabblock2010_01_pophu.BLOCKID10 = custom.BLOCKID10" /home/tabblock2010_01_pophu.json /vsizip//home/tabblock2010_01_pophu.zip

if os.name == "nt":
    pwd = "%cd%"
else:
    pwd = "${PWD}"
cmd = (
    'docker run --rm -v "'
    + pwd
    + '"/:/home '
    + "osgeo/gdal:alpine-small-latest ogr2ogr -f GeoJSON "
    + "-sql \"SELECT * FROM tl_2010_01_bg10 LEFT JOIN '/home/data/dataset/ejscreen_2020/data01.csv'.data01 ON tl_2010_01_bg10.GEOID10 = data01.ID\" "
    + "/home/data/score/geojson/01.json /home/data/census/shp/01/tl_2010_01_bg10.dbf"
)
print(cmd)
os.system(cmd)

# generate mbtiles file
# PWD is different for Windows
if os.name == "nt":
    pwd = "%cd%"
else:
    pwd = "${PWD}"
cmd = (
    'docker run --rm -it -v "'
    + pwd
    + '"/:/home klokantech/tippecanoe tippecanoe --drop-densest-as-needed -zg -o /home/data/tiles/block2010.mbtiles --drop-densest-as-needed --extend-zooms-if-still-dropping -l cbg2010 -s_srs EPSG:4269 -t_srs EPSG:4326 '
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
