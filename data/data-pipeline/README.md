# Justice 40 Score application

<details open="open">
<summary>Table of Contents</summary>

<!-- TOC -->

- [Justice 40 Score application](#justice-40-score-application)
  - [About this application](#about-this-application)
    - [Score generation and comparison workflow](#score-generation-and-comparison-workflow)
      - [Workflow Diagram](#workflow-diagram)
      - [Step 0: Set up your environment](#step-0-set-up-your-environment)
      - [Step 1: Run the script to download census data or download from the Justice40 S3 URL](#step-1-run-the-script-to-download-census-data-or-download-from-the-justice40-s3-url)
      - [Step 2: Run the ETL script for each data source](#step-2-run-the-etl-script-for-each-data-source)
      - [Step 3: Calculate the Justice40 score experiments](#step-3-calculate-the-justice40-score-experiments)
      - [Step 4: Compare the Justice40 score experiments to other indices](#step-4-compare-the-justice40-score-experiments-to-other-indices)
    - [Data Sources](#data-sources)
  - [Running using Docker](#running-using-docker)
  - [Local development](#local-development)
    - [VSCode](#vscode)
    - [MacOS](#macos)
    - [Windows Users](#windows-users)
    - [Setting up Poetry](#setting-up-poetry)
    - [Downloading Census Block Groups GeoJSON and Generating CBG CSVs](#downloading-census-block-groups-geojson-and-generating-cbg-csvs)
    - [Generating Map Tiles](#generating-map-tiles)
    - [Serve the map locally](#serve-the-map-locally)
    - [Running Jupyter notebooks](#running-jupyter-notebooks)
    - [Activating variable-enabled Markdown for Jupyter notebooks](#activating-variable-enabled-markdown-for-jupyter-notebooks)
  - [Miscellaneous](#miscellaneous)

<!-- /TOC -->

</details>

## About this application

This application is used to compare experimental versions of the Justice40 score to established environmental justice indices, such as EJSCREEN, CalEnviroScreen, and so on.

_**NOTE:** These scores **do not** represent final versions of the Justice40 scores and are merely used for comparative purposes. As a result, the specific input columns and formulas used to calculate them are likely to change over time._

### Score generation and comparison workflow

The descriptions below provide a more detailed outline of what happens at each step of ETL and score calculation workflow.

#### Workflow Diagram

TODO add mermaid diagram

#### Step 0: Set up your environment

1. Choose whether you'd like to run this application using Docker or if you'd like to install the dependencies locally so you can contribute to the project.
   - **With Docker:** Follow these [installation instructions](https://docs.docker.com/get-docker/) and skip down to the [Running with Docker section](#running-with-docker) for more information
   - **For Local Development:** Skip down to the [Local Development section](#local-development) for more detailed installation instructions

#### Step 1: Run the script to download census data or download from the Justice40 S3 URL

1. Call the `census_data_download` command using the application manager `application.py` **NOTE:** This may take several minutes to execute.
   - With Docker: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application census-data-download`
   - With Poetry: `poetry run download_census` (Install GDAL as described [below](#local-development))
2. If you have a high speed internet connection and don't want to generate the census data or install `GDAL` locally, you can download a zip version of the Census file [here](https://justice40-data.s3.amazonaws.com/data-sources/census.zip). Then unzip and move the contents inside the `data/data-pipeline/data_pipeline/data/census/` folder/

#### Step 2: Run the ETL script for each data source

1. Call the `etl-run` command using the application manager `application.py` **NOTE:** This may take several minutes to execute.
   - With Docker: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application etl-run`
   - With Poetry: `poetry run etl`
2. This command will execute the corresponding ETL script for each data source in `data_pipeline/etl/sources/`. For example, `data_pipeline/etl/sources/ejscreen/etl.py` is the ETL script for EJSCREEN data.
3. Each ETL script will extract the data from its original source, then format the data into `.csv` files that get stored in the relevant folder in `data_pipeline/data/dataset/`. For example, HUD Housing data is stored in `data_pipeline/data/dataset/hud_housing/usa.csv`

_**NOTE:** You have the option to pass the name of a specific data source to the `etl-run` command using the `-d` flag, which will limit the execution of the ETL process to that specific data source._
_For example: `poetry run etl -- -d ejscreen` would only run the ETL process for EJSCREEN data._

#### Step 3: Calculate the Justice40 score experiments

1. Call the `score-run` command using the application manager `application.py` **NOTE:** This may take several minutes to execute.
   - With Docker: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application score-run`
   - With Poetry: `poetry run score`
1. The `score-run` command will execute the `etl/score/etl.py` script which loads the data from each of the source files added to the `data/dataset/` directory by the ETL scripts in Step 1.
1. These data sets are merged into a single dataframe using their Census Block Group GEOID as a common key, and the data in each of the columns is standardized in two ways:
   - Their [percentile rank](https://en.wikipedia.org/wiki/Percentile_rank) is calculated, which tells us what percentage of other Census Block Groups have a lower value for that particular column.
   - They are normalized using [min-max normalization](https://en.wikipedia.org/wiki/Feature_scaling), which adjusts the scale of the data so that the Census Block Group with the highest value for that column is set to 1, the Census Block Group with the lowest value is set to 0, and all of the other values are adjusted to fit within that range based on how close they were to the highest or lowest value.
1. The standardized columns are then used to calculate each of the Justice40 score experiments described in greater detail below, and the results are exported to a `.csv` file in [`data/score/csv`](data/score/csv)

#### Step 4: Compare the Justice40 score experiments to other indices

We are building a comparison tool to enable easy (or at least straightforward) comparison of the Justice40 score with other existing indices. The goal of having this is so that as we experiment and iterate with a scoring methodology, we can understand how our score overlaps with or differs from other indices that communities, nonprofits, and governmentss use to inform decision making.

Right now, our comparison tool exists simply as a python notebook in `data/data-pipeline/data_pipeline/ipython/scoring_comparison.ipynb`.

To run this comparison tool:

1. Make sure you've gone through the above steps to run the data ETL and score generation.
1. From the package directory (`data/data-pipeline/data_pipeline/`), navigate to the `ipython` directory: `cd ipython`.
1. Ensure you have `pandoc` installed on your computer. If you're on a Mac, run `brew install pandoc`; for other OSes, see pandoc's [installation guide](https://pandoc.org/installing.html).
1. Start the notebooks: `jupyter notebook`
1. In your browser, navigate to one of the URLs returned by the above command.
1. Select `scoring_comparison.ipynb` from the options in your browser.
1. Run through the steps in the notebook. You can step through them one at a time by clicking the "Run" button for each cell, or open the "Cell" menu and click "Run all" to run them all at once.
1. Reports and spreadsheets generated by the comparison tool will be available in `data/data-pipeline/data_pipeline/data/comparison_outputs`.

_NOTE:_ This may take several minutes or over an hour to fully execute and generate the reports.

### Data Sources

- **[EJSCREEN](etl/sources/ejscreen):** TODO Add description of data source
- **[Census](etl/sources/census):** TODO Add description of data source
- **[American Communities Survey](etl/sources/census_acs):** TODO Add description of data source
- **[Housing and Transportation](etl/sources/housing_and_transportation):** TODO Add description of data source
- **[HUD Housing](etl/sources/hud_housing):** TODO Add description of data source
- **[HUD Recap](etl/sources/hud_recap):** TODO Add description of data source
- **[CalEnviroScreen](etl/scores/calenviroscreen):** TODO Add description of data source

## Running using Docker

We use Docker to install the necessary libraries in a container that can be run in any operating system.

To build the docker container the first time, make sure you're in the root directory of the repository and run `docker-compose build --no-cache`.

Once completed, run `docker-compose up` and then open a new tab or terminal window, and then run any command for the application using this format:
`docker exec j40_data_pipeline_1 python3 -m data_pipeline.application [command]`

Here's a list of commands:

- Get help: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application --help`
- Generate census data: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application census-data-download`
- Run all ETL and Generate score: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application score-full-run`
- Clean up the data directories: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application data-cleanup`
- Run all ETL processes: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application etl-run`
- Generate Score: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application score-run`
- Generate Score with Geojson and high and low versions: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application geo-score`
- Generate Map Tiles: `docker exec j40_data_pipeline_1 python3 -m data_pipeline.application generate-map-tiles`

## Local development

You can run the Python code locally without Docker to develop, using Poetry. However, to generate the census data you will need the [GDAL library](https://github.com/OSGeo/gdal) installed locally. Also to generate tiles for a local map, you will need [Mapbox tippecanoe](https://github.com/mapbox/tippecanoe). Please refer to the repos for specific instructions for your OS.

### VSCode

If you are using VSCode, you can make use of the `.vscode` folder checked in under `data/data-pipeline/.vscode`. To do this, open this directory with `code data/data-pipeline` .

Here's whats included:

1. `launch.json` - launch commands that allow for debugging the various commands in `application.py`. Note that because we are using the otherwise excellent [Click CLI](https://click.palletsprojects.com/en/8.0.x/), and Click in turn uses `console_scripts` to parse and execute command line options, it is necessary to run the equivalent of `python -m data_pipeline.application [command]` within `launch.json` to be able to set and hit breakpoints (this is what is currently implemented. Otherwise, you may find that the script times out after 5 seconds. More about this [here](https://stackoverflow.com/questions/64556874/how-can-i-debug-python-console-script-command-line-apps-with-the-vscode-debugger).

2. `settings.json` - these ensure that you're using the default linter (`pylint`), formatter (`flake8`), and test library (`pytest`) that the team is using.

3. `tasks.json` - these enable you to use `Terminal->Run Task` to run our preferred formatters and linters within your project.

Users are instructed to only add settings to this file that should be shared across the team, and not to add settings here that only apply to local development environments (particularly full absolute paths which can differ between setups). If you are looking to add something to this file, check in with the rest of the team to ensure the proposed settings should be shared.

### MacOS

To install the above-named executables:

- gdal: `brew install gdal`
- Tippecanoe: `brew install tippecanoe`

### Windows Users

If you want to run tile generation, please install TippeCanoe [following these instrcutions](https://github.com/GISupportICRC/ArcGIS2Mapbox#installing-tippecanoe-on-windows). You also need some pre-requisites for Geopandas as specified in the Poetry requirements. Please follow [these instructions](https://stackoverflow.com/questions/56958421/pip-install-geopandas-on-windows) to install the Geopandas dependency locally.

### Setting up Poetry

- Start a terminal
- Change to this directory (`/data/data-pipeline/`)
- Make sure you have Python 3.9 installed: `python -V` or `python3 -V`
- We use [Poetry](https://python-poetry.org/) for managing dependencies and building the application. Please follow the instructions on their site to download.
- Install Poetry requirements with `poetry install`

### Downloading Census Block Groups GeoJSON and Generating CBG CSVs

- Make sure you have Docker running in your machine
- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline/`)
- If you want to clear out all data and tiles from all directories, you can run: `poetry run cleanup_data`.
- Then run `poetry run download_census`
  Note: Census files are not kept in the repository and the download directories are ignored by Git

### Generating Map Tiles

- Make sure you have Docker running in your machine
- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Then run `poetry run generate_tiles`
- If you have S3 keys, you can sync to the dev repo by doing `aws s3 sync ./data_pipeline/data/score/tiles/ s3://justice40-data/data-pipeline/data/score/tiles --acl public-read --delete`

### Serve the map locally

- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- For USA high zoom: `docker run --rm -it -v ${PWD}/data/score/tiles/high:/data -p 8080:80 maptiler/tileserver-gl`

### Running Jupyter notebooks

- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Run `poetry run jupyter notebook`. Your browser should open with a Jupyter Notebook tab

### Activating variable-enabled Markdown for Jupyter notebooks

- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Activate a Poetry Shell (see above)
- Run `jupyter contrib nbextension install --user`
- Run `jupyter nbextension enable python-markdown/main`
- Make sure you've loaded the Jupyter notebook in a "Trusted" state. (See button near
  top right of Notebook screen.)

For more information, see [nbextensions docs](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html) and
see [python-markdown docs](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/tree/master/src/jupyter_contrib_nbextensions/nbextensions/python-markdown).

## Miscellaneous

- To export packages from Poetry to `requirements.txt` run `poetry export --without-hashes > requirements.txt`
