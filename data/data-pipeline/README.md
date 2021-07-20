# Justice 40 Score application

## Running using Docker

We use Docker to install the necessary libraries in a container that can be run in any operating system.

To build the docker container the first time, make sure you're in the root directory of the repository and run `docker-compose build`.

Once completed, run `docker-compose up` and then open a new tab or terminal window, and then run any command for the application using this format:
`docker exec j40_data_pipeline_1 python3 application.py [command]`

Here's a list of commands:

- Get help: `docker exec j40_data_pipeline_1 python3 application.py --help"`
- Clean up the census data directories: `docker exec j40_data_pipeline_1 python3 application.py census-cleanup"`
- Clean up the data directories: `docker exec j40_data_pipeline_1 python3 application.py data-cleanup"`
- Generate census data: `docker exec j40_data_pipeline_1 python3 application.py census-data-download"`
- Run all ETL processes: `docker exec j40_data_pipeline_1 python3 application.py etl-run"`
- Generate Score: `docker exec j40_data_pipeline_1 python3 application.py score-run"`

## Local development

You can run the Python code locally without Docker to develop, using Poetry. However, to generate the census data you will need the [GDAL library](https://github.com/OSGeo/gdal) installed locally. Also to generate tiles for a local map, you will need [Mapbox tippeanoe](https://github.com/mapbox/tippecanoe). Please refer to the repos for specific instructions for your OS.

### Windows Users
- If you want to download Census data or run tile generation, please install TippeCanoe [following these instrcutions](https://github.com/GISupportICRC/ArcGIS2Mapbox#installing-tippecanoe-on-windows).
- If you want to generate tiles, you need some pre-requisites for Geopandas as specified in the Poetry requirements. Please follow [these instructions](https://stackoverflow.com/questions/56958421/pip-install-geopandas-on-windows) to install the Geopandas dependency locally.

### Setting up Poetry

- Start a terminal
- Change to this directory (`/data/data-pipeline`)
- Make sure you have Python 3.9 installed: `python -V` or `python3 -V`
- We use [Poetry](https://python-poetry.org/) for managing dependencies and building the application. Please follow the instructions on their site to download.
- Install Poetry requirements with `poetry install`

### Downloading Census Block Groups GeoJSON and Generating CBG CSVs

- Make sure you have Docker running in your machine
- Start a terminal
- Change to this directory (i.e. `cd data/data-pipeline`)
- If you want to clear out all data and tiles from all directories, you can run: `poetry run python application.py data-cleanup`.
- Then run `poetry run python application.py census-data-download`
  Note: Census files are not kept in the repository and the download directories are ignored by Git

### Generating mbtiles

- TBD

### Serve the map locally

- Start a terminal
- Change to this directory (i.e. `cd data/data-pipeline`)
- Run: `docker run --rm -it -v ${PWD}/data/tiles:/data -p 8080:80 maptiler/tileserver-gl`

### Running Jupyter notebooks

- Start a terminal
- Change to this directory (i.e. `cd data/data-pipeline`)
- Run `poetry run jupyter notebook`. Your browser should open with a Jupyter Notebook tab

### Activating variable-enabled Markdown for Jupyter notebooks

- Change to this directory (i.e. `cd data/data-pipeline`)
- Activate a Poetry Shell (see above)
- Run `jupyter contrib nbextension install --user`
- Run `jupyter nbextension enable python-markdown/main`
- Make sure you've loaded the Jupyter notebook in a "Trusted" state. (See button near
  top right of Notebook screen.)

For more information, see [nbextensions docs](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html) and
see [python-markdown docs](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/tree/master/src/jupyter_contrib_nbextensions/nbextensions/python-markdown).

## Miscellaneous

- To export packages from Poetry to `requirements.txt` run `poetry export --without-hashes > requirements.txt`
