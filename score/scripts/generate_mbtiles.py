import os

os.remove("./data/tiles/block2010.mbtiles")

# PWD is different for Windows
if os.name == "nt":
    pwd = "%cd%"
else:
    pwd = "${PWD}"
cmd = (
    'docker run --rm -it -v "'
    + pwd
    + '"/:/home klokantech/tippecanoe tippecanoe -zg -o /home/data/tiles/block2010.mbtiles --drop-densest-as-needed --extend-zooms-if-still-dropping -l cbg2010 /home/data/census/geojson/01.json /home/data/census/geojson/02.json /home/data/census/geojson/04.json'
)
print(cmd)
os.system(cmd)
