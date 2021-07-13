# Justice 40 Score application

<details open="open">
<summary>Table of Contents</summary>

<!-- TOC -->
- [About this application](#about-this-application)
  - [Scoring Comparison Workflow](#scoring-comparison-workflow)
    - [Workflow Diagram](#workflow-diagram)
    - [Step 1: Run ETL scripts for data sources](#step-1-run-etl-scripts-for-data-sources)
    - [Step 2: Load and merge source data as a dataframe](#step-2-load-and-merge-source-data-as-a-dataframe)
    - [Step 3: Calculate the Justice40 candidate scores](#step-3-calculate-the-justice40-candidate-scores)
    - [Step 4: Compare the Justice40 scores to other established scores](#step-4-compare-the-justice40-scores-to-other-established-scores)
  - [Data Sources](#data-sources)
- [Justice40 candidate scores](#justice40-candidate-scores)
  - [Score A](#score-a)
  - [Score B](#score-b)
  - [Score C](#score-c)
  - [Score D](#score-d)
  - [Score E](#score-e)
- [Running using Docker](#running-using-docker)
- [Log visualization](#log-visualization)
- [Local development](#local-development)
  - [Downloading Census Block Groups GeoJSON and Generating CBG CSVs](#downloading-census-block-groups-geojson-and-generating-cbg-csvs)
  - [Generating mbtiles](#generating-mbtiles)
  - [Serve the map locally](#serve-the-map-locally)
  - [Running Jupyter notebooks](#running-jupyter-notebooks)
  - [Activating variable-enabled Markdown for Jupyter notebooks](#activating-variable-enabled-markdown-for-jupyter-notebooks)
- [Miscellaneous](#miscellaneous)

<!-- /TOC -->

</details>

## About this application

### Scoring Comparison Workflow

#### Workflow Diagram

#### Step 1: Run ETL scripts for data sources

#### Step 2: Load and merge source data as a dataframe

#### Step 3: Calculate the Justice40 candidate scores

#### Step 4: Compare the Justice40 scores to other established scores

### Data Sources

- **[EJSCREEN](etl/sources/ejscreen):**
- **[Census](etl/sources/census):**
- **[American Communities Survey](etl/sources/census_acs):**
- **[Housing and Transportation](etl/sources/housing_and_transportation):**
- **[HUD Housing](etl/sources/hud_housing):**
- **[HUD Recap](etl/sources/hud_recap):**
- **[CalEnviroScreen](etl/scores/calenviroscreen):**

## Justice40 candidate scores

### Score A

### Score B

### Score C

### Score D

### Score E

## Running using Docker

We use Docker to install the necessary libraries in a container that can be run in any operating system.

To build the docker container the first time, make sure you're in the root directory of the repository and run `docker-compose build`.

After that, to run commands type the following:

- Get help: `docker run --rm -it j40_score /bin/sh -c "python3 application.py --help"`
- Clean up the census data directories: `docker run --rm -it j40_score /bin/sh -c "python3 application.py census-cleanup"`
- Clean up the data directories: `docker run --rm -it j40_score /bin/sh -c "python3 application.py data-cleanup"`
- Generate census data: `docker run --rm -it j40_score /bin/sh -c "python3 application.py census-data-download"`
- Run all ETL processes: `docker run --rm -it j40_score /bin/sh -c "python3 application.py etl-run"`
- Generate Score: `docker run --rm -it j40_score /bin/sh -c "python3 application.py score-run"`

## Log visualization

If you want to visualize logs while running a command, the following temporary workaround can be used:

- Run `docker-compose up` on the root of the repo
- Open a new tab on your terminal
- Then run any command for the application using this format: `docker exec j40_score_1 python3 application.py [command]`

## Local development

You can run the Python code locally without Docker to develop, using Poetry. However, to generate the census data you will need the [GDAL library](https://github.com/OSGeo/gdal) installed locally. Also to generate tiles for a local map, you will need [Mapbox tippeanoe](https://github.com/mapbox/tippecanoe)

Note: If you are using Windows, please follow [these instructions](https://stackoverflow.com/questions/56958421/pip-install-geopandas-on-windows) to install Geopandas locally. If you want to install TippeCanoe, [follow these instrcutions](https://github.com/GISupportICRC/ArcGIS2Mapbox#installing-tippecanoe-on-windows).

- Start a terminal
- Make sure you have Python 3.9 installed: `python -V` or `python3 -V`
- We use [Poetry](https://python-poetry.org/) for managing dependencies and building the application. Please follow the instructions on their site to download.
- Install Poetry requirements with `poetry install`

### Downloading Census Block Groups GeoJSON and Generating CBG CSVs

- Make sure you have Docker running in your machine
- Start a terminal
- Change to this directory (i.e. `cd score`)
- If you want to clear out all data and tiles from all directories, you can run: `poetry run python application.py data-cleanup`.
- Then run `poetry run python application.py census-data-download`
  Note: Census files are not kept in the repository and the download directories are ignored by Git

### Generating mbtiles

- TBD

### Serve the map locally

- Start a terminal
- Change to this directory (i.e. `cd score`)
- Run: `docker run --rm -it -v ${PWD}/data/tiles:/data -p 8080:80 maptiler/tileserver-gl`

### Running Jupyter notebooks

- Start a terminal
- Change to this directory (i.e. `cd score`)
- Run `poetry run jupyter notebook`. Your browser should open with a Jupyter Notebook tab

### Activating variable-enabled Markdown for Jupyter notebooks

- Change to this directory (i.e. `cd score`)
- Activate a Poetry Shell (see above)
- Run `jupyter contrib nbextension install --user`
- Run `jupyter nbextension enable python-markdown/main`
- Make sure you've loaded the Jupyter notebook in a "Trusted" state. (See button near
  top right of Notebook screen.)

For more information, see [nbextensions docs](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html) and
see [python-markdown docs](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/tree/master/src/jupyter_contrib_nbextensions/nbextensions/python-markdown).

## Miscellaneous

- To export packages from Poetry to `requirements.txt` run `poetry export --without-hashes > requirements.txt`
