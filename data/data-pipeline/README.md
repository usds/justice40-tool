# Justice 40 Score application

<details open="open">
<summary>Table of Contents</summary>

<!-- TOC -->

- [Justice 40 Score application](#justice-40-score-application)
  - [About this application](#about-this-application)
    - [Using the data](#using-the-data)
      - [1. Source data](#1-source-data)
      - [2. Extract-Transform-Load (ETL) the data](#2-extract-transform-load-etl-the-data)
      - [3. Combined dataset](#3-combined-dataset)
      - [4. Tileset](#4-tileset)
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
  - [Testing](#testing)
    - [Background](#background)
    - [Configuration / Fixtures](#configuration--fixtures)
      - [Updating Pickles](#updating-pickles)
      - [Future Enchancements](#future-enchancements)
    - [ETL Unit Tests](#etl-unit-tests)
      - [Extract Tests](#extract-tests)
      - [Transform Tests](#transform-tests)
      - [Load Tests](#load-tests)

<!-- /TOC -->

</details>

## About this application

This application is used to compare experimental versions of the Justice40 score to established environmental justice indices, such as EJSCREEN, CalEnviroScreen, and so on.

_**NOTE:** These scores **do not** represent final versions of the Justice40 scores and are merely used for comparative purposes. As a result, the specific input columns and formulas used to calculate them are likely to change over time._

### Using the data

One of our primary development principles is that the entire data pipeline should be open and replicable end-to-end. As part of this, in addition to all code being open, we also strive to make data visible and available for use at every stage of our pipeline. You can follow the instructions below in this README to spin up the data pipeline yourself in your own environment; you can also access the data we've already processed on our S3 bucket.

In the sub-sections below, we outline what each stage of the data provenance looks like and where you can find the data output by that stage. If you'd like to actually perform each step in your own environment, skip down to [Score generation and comparison workflow](#score-generation-and-comparison-workflow).

#### 1. Source data

If you would like to find and use the raw source data, you can find the source URLs in the `etl.py` files located within each directory in `data/data-pipeline/etl/sources`.

#### 2. Extract-Transform-Load (ETL) the data

The first step of processing we perform is a simple ETL process for each of the source datasets. Code is available in `data/data-pipeline/etl/sources`, and the output of this process is a number of CSVs available at the following locations:

- EJScreen: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/ejscreen_2019/usa.csv>
- Census ACS 2019: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/census_acs_2019/usa.csv>
- Housing and Transportation Index: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/housing_and_transportation_index/usa.csv>
- HUD Housing: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/hud_housing/usa.csv>

Each CSV may have a different column name for the census tract or census block group identifier. You can find what the name is in the ETL code. Please note that when you view these files you should make sure that your text editor or spreadsheet software does not remove the initial `0` from this identifier field (many IDs begin with `0`).

#### 3. Combined dataset
The CSV with the combined data from all of these sources [can be accessed here](https://justice40-data.s3.amazonaws.com/data-pipeline/data/score/csv/full/usa.csv).

#### 4. Tileset
Once we have all the data from the previous stages, we convert it to tiles to make it usable on a map. We render the map on the client side which can be seen using `docker-compose up`.

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
   - With Docker: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application census-data-download`
   - With Poetry: `poetry run download_census` (Install GDAL as described [below](#local-development))
2. If you have a high speed internet connection and don't want to generate the census data or install `GDAL` locally, you can download a zip version of the Census file [here](https://justice40-data.s3.amazonaws.com/data-sources/census.zip). Then unzip and move the contents inside the `data/data-pipeline/data_pipeline/data/census/` folder/

#### Step 2: Run the ETL script for each data source

##### Table of commands

| VS code command           | actual command      | run time | what it does                                                                                                                     | where it writes to                                     | notes                                                                                               |
|---------------------------|---------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ETL run                   | etl-run             |          | Downloads the data set files                                                                                                     | data/dataset                                           | check if there are any changes in data_pipeline/etl/sources. if there are none this can be skipped. |
| Score run                 | score-run           | 6 mins   | consume the etl outputs and combine into a score csv full.                                                                       | data/score/csv/full/usa.csv                            |                                                                                                     |
| Generate Score post       | generate-score-post | 9 mins   | 1. combines the score/csv/full with counties. 2. downloadable assets (xls, csv, zip), 3. creates the tiles/csv                   | data/score/csv/tiles/usa.csv, data/ score/downloadable | check destination folder to see if newly created                                                    |
| Combine score and geoJson | geo-score           | 26 mins  | 1. combine the data/score/csv/tiles/usa.csv with the census tiger geojson data 2. aggregates into super tracts for usa-low layer | data/score/geojson (usa high / low)                    |                                                                                                     |
| Generate Map Tiles        | generate-map-tiles  |    TBD | ogr-ogr pbf / mvt tiles generator that consume the geojson usa high / usa low                                                    | data/score/tiles/ high or low / {zoomLevel}            |                                                                                                     |

##### ETL steps
1. Call the `etl-run` command using the application manager `application.py` **NOTE:** This may take several minutes to execute.
   - With Docker: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application etl-run`
   - With Poetry: `poetry run python3 data_pipeline/application.py etl-run`
2. This command will execute the corresponding ETL script for each data source in `data_pipeline/etl/sources/`. For example, `data_pipeline/etl/sources/ejscreen/etl.py` is the ETL script for EJSCREEN data.
3. Each ETL script will extract the data from its original source, then format the data into `.csv` files that get stored in the relevant folder in `data_pipeline/data/dataset/`. For example, HUD Housing data is stored in `data_pipeline/data/dataset/hud_housing/usa.csv`

_**NOTE:** You have the option to pass the name of a specific data source to the `etl-run` command using the `-d` flag, which will limit the execution of the ETL process to that specific data source._
_For example: `poetry run python3 data_pipeline/application.py etl-run -d ejscreen` would only run the ETL process for EJSCREEN data._

#### Step 3: Calculate the Justice40 score experiments

1. Call the `score-run` command using the application manager `application.py` **NOTE:** This may take several minutes to execute.
   - With Docker: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application score-run`
   - With Poetry: `poetry run python3 data_pipeline/application.py score-run`
1. The `score-run` command will execute the `etl/score/etl.py` script which loads the data from each of the source files added to the `data/dataset/` directory by the ETL scripts in Step 1.
1. These data sets are merged into a single dataframe using their Census Block Group GEOID as a common key, and the data in each of the columns is standardized in two ways:
   - Their [percentile rank](https://en.wikipedia.org/wiki/Percentile_rank) is calculated, which tells us what percentage of other Census Block Groups have a lower value for that particular column.
   - They are normalized using [min-max normalization](https://en.wikipedia.org/wiki/Feature_scaling), which adjusts the scale of the data so that the Census Block Group with the highest value for that column is set to 1, the Census Block Group with the lowest value is set to 0, and all of the other values are adjusted to fit within that range based on how close they were to the highest or lowest value.
1. The standardized columns are then used to calculate each of the Justice40 score experiments described in greater detail below, and the results are exported to a `.csv` file in [`data_pipeline/data/score/csv`](data_pipeline/data/score/csv)

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

- **[EJSCREEN](data_pipeline/etl/sources/ejscreen):** TODO Add description of data source
- **[Census](data_pipeline/etl/sources/census):** TODO Add description of data source
- **[American Communities Survey](data_pipeline/etl/sources/census_acs):** TODO Add description of data source
- **[Housing and Transportation](data_pipeline/etl/sources/housing_and_transportation):** TODO Add description of data source
- **[HUD Housing](data_pipeline/etl/sources/hud_housing):** TODO Add description of data source
- **[HUD Recap](data_pipeline/etl/sources/hud_recap):** TODO Add description of data source
- **[CalEnviroScreen](data_pipeline/etl/sources/calenviroscreen):** TODO Add description of data source

## Running using Docker

We use Docker to install the necessary libraries in a container that can be run in any operating system.

*Important*: To be able to run the data Docker containers, you need to increase the memory resource of your container to at leat 8096 MB.

To build the docker container the first time, make sure you're in the root directory of the repository and run `docker-compose build --no-cache`.

Once completed, run `docker-compose up`. Docker will spin up 3 containers: the client container, the static server container and the data container. Once all data is generated, you can see the application using a browser and navigating to `http://localhost:8000`.

If you want to run specific data tasks, you can open a terminal window, navigate to the root folder for this repository and then execute any command for the application using this format:

`docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application [command]`

Here's a list of commands:

- Get help: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application --help`
- Generate census data: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application census-data-download`
- Run all ETL and Generate score: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application score-full-run`
- Clean up the data directories: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application data-cleanup`
- Run all ETL processes: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application etl-run`
- Generate Score: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application score-run`
- Combine Score with Geojson and generate high and low zoom map tile sets: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application geo-score`
- Generate Map Tiles: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application generate-map-tiles`

## Local development

You can run the Python code locally without Docker to develop, using Poetry. However, to generate the census data you will need the [GDAL library](https://github.com/OSGeo/gdal) installed locally. Also to generate tiles for a local map, you will need [Mapbox tippecanoe](https://github.com/mapbox/tippecanoe). Please refer to the repos for specific instructions for your OS.

### VSCode

If you are using VSCode, you can make use of the `.vscode` folder checked in under `data/data-pipeline/.vscode`. To do this, open this directory with `code data/data-pipeline`.

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

If you want to run tile generation, please install TippeCanoe [following these instructions](https://github.com/GISupportICRC/ArcGIS2Mapbox#installing-tippecanoe-on-windows). You also need some pre-requisites for Geopandas as specified in the Poetry requirements. Please follow [these instructions](https://stackoverflow.com/questions/56958421/pip-install-geopandas-on-windows) to install the Geopandas dependency locally. It's definitely easier if you have access to WSL (Windows Subsystem Linux), and install these packages using commands similar to our [Dockerfile](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/Dockerfile).

### Setting up Poetry

- Start a terminal
- Change to this directory (`/data/data-pipeline/`)
- Make sure you have at least Python 3.7 installed: `python -V` or `python3 -V`
- We use [Poetry](https://python-poetry.org/) for managing dependencies and building the application. Please follow the instructions on their site to download.
- Install Poetry requirements with `poetry install`

### The Application entrypoint

After installing the poetry dependencies, you can see a list of commands with the following steps: 
- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Then run `poetry run python3 data_pipeline/application.py --help`

### Downloading Census Block Groups GeoJSON and Generating CBG CSVs (not normally required)

- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- If you want to clear out all data and tiles from all directories, you can run: `poetry run python3 data_pipeline/application.py data-cleanup`.
- Then run `poetry run python3 data_pipeline/application.py census-data-download`
  Note: Census files are hosted in the Justice40 S3 and you can skip this step by passing the `-s aws` or `--data-source aws` flag in the scripts below


### Run all ETL, score and map generation processes
- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Then run `poetry run python3 data_pipeline/application.py data-full-run -s aws`
- Note: The `-s` flag is optional if you have generated/downloaded the census data


### Run both ETL and score generation processes
- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Then run `poetry run python3 data_pipeline/application.py score-full-run`


### Run all ETL processes
- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Then run `poetry run python3 data_pipeline/application.py etl-run`


### Generating Map Tiles

- Start a terminal
- Change to the package directory (i.e. `cd data/data-pipeline/data_pipeline`)
- Then run `poetry run python3 data_pipeline/application.py generate-map-tiles -s aws`
- If you have S3 keys, you can sync to the dev repo by doing `aws s3 sync ./data_pipeline/data/score/tiles/ s3://justice40-data/data-pipeline/data/score/tiles --acl public-read --delete`
- Note: The `-s` flag is optional if you have generated/downloaded the score data

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
- Make sure you've loaded the Jupyter notebook in a "Trusted" state. (See button near top right of Notebook screen.)

For more information, see [nbextensions docs](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html) and
see [python-markdown docs](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/tree/master/src/jupyter_contrib_nbextensions/nbextensions/python-markdown).

## Testing

### Background

For this project, we make use of [pytest](https://docs.pytest.org/en/latest/) for testing purposes. To run tests, simply run `poetry run pytest` in this directory (i.e. `justice40-tool/data/data-pipeline`).

### Configuration / Fixtures

Test data is configured via [fixtures](https://docs.pytest.org/en/latest/explanation/fixtures.html).

These fixtures utilize [pickle files](https://docs.python.org/3/library/pickle.html) to store dataframes to disk. This is ultimately because if you assert equality on two dataframes, even if column values have the same "visible" value, if their types are mismatching they will be counted as not being equal.

In a bit more detail:

1. Pandas dataframes are typed, and by default, types are inferred when you create one from scratch. If you create a dataframe using the `DataFrame` [constructors](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html#pandas.DataFrame), there is no guarantee that types will be correct, without explicit `dtype` annotations. Explicit `dtype` annotations are possible, but, and this leads us to point #2:

2. Our transformations/dataframes in the source code under test itself doesn't always require specific types, and it is often sufficient in the code itself to just rely on the `object` type. I attempted adding explicit typing based on the "logical" type of given columns, but in practice it resulted in non-matching dataframes that _actually_ had the same value -- in particular it was very common to have one dataframe column of type `string` and another of type `object` that carried the same values. So, that is to say, even if we did create a "correctly" typed dataframe (according to our logical assumptions about what types should be), they were still counted as mismatched against the dataframes that are actually used in our program. To fix this "the right way", it is necessary to explicitly annotate types at the point of the `read_csv` call, which definitely has other potential unintended side effects and would need to be done carefully.

3. For larger dataframes (some of these have 150+ values), it was initially deemed too difficult/time consuming to manually annotate all types, and further, to modify those type annotations based on what is expected in the souce code under test.

#### Updating Pickles

If you update the score in any way, it is necessary to create new pickles so that data is validated correctly.

It starts with the `data_pipeline/etl/score/tests/sample_data/score_data_initial.csv`, which is the first two rows of the `score/full/usa.csv`.

To update this file, run a full score generation, then open a Python shell from the `data-pipeline` directory (e.g. `poetry run python3`), and then update the file with the following commands:
```
import pickle
from pathlib import Path
import pandas as pd
data_path = Path.cwd()

# score data expected
score_csv_path = data_path / "data_pipeline" / "data" / "score" / "csv" / "full" / "usa.csv"
score_initial_df = pd.read_csv(score_csv_path, dtype={"GEOID10_TRACT": "string"}, low_memory=False)[:2]
score_initial_df.to_csv(data_path / "data_pipeline" / "etl" / "score" / "tests" / "sample_data" /"score_data_initial.csv", index=False)
```

Now you can move on to updating individual pickles for the tests. Note that it is helpful to do them in this order:

We have four pickle files that correspond to expected files:
- `score_data_expected.pkl`: Initial score without counties
- `score_transformed_expected.pkl`: Intermediate score with `etl._extract_score` and `etl. _transform_score` applied. There's no file for this intermediate process, so we need to capture the pickle mid-process.
- `tile_data_expected.pkl`: Score with columns to be baked in tiles
- `downloadable_data_expected.pk1`: Downloadable csv

To update the pickles, let's go one by one:

For the `score_transformed_expected.pkl`, but a breakpoint on [this line](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post.py#L58), before the `pdt.assert_frame_equal` and run:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_transform_score`

Once on the breakpoint, capture the df to a pickle as follows:

```
import pickle
from pathlib import Path
data_path = Path.cwd()
score_transformed_actual.to_pickle(data_path / "data_pipeline" / "etl" / "score" / "tests" / "snapshots" / "score_transformed_expected.pkl", protocol=4)
```

Then take out the breakpoint and re-run the test: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_transform_score`

For the `score_data_expected.pkl`, but a breakpoint on [this line](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post.py#L78), before the `pdt.assert_frame_equal` and run:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_score_data`

Once on the breakpoint, capture the df to a pickle as follows:

```
import pickle
from pathlib import Path
data_path = Path.cwd()
score_data_actual.to_pickle(data_path / "data_pipeline" / "etl" / "score" / "tests" / "snapshots" / "score_data_expected.pkl", protocol=4)
```

Then take out the breakpoint and re-run the test: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_score_data`

For the `tile_data_expected.pkl`, but a breakpoint on [this line](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post.py#L86), before the `pdt.assert_frame_equal` and run:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_tile_data`

Once on the breakpoint, capture the df to a pickle as follows:

```
import pickle
from pathlib import Path
data_path = Path.cwd()
output_tiles_df_actual.to_pickle(data_path / "data_pipeline" / "etl" / "score" / "tests" / "snapshots" / "tile_data_expected.pkl", protocol=4)
```

Then take out the breakpoint and re-run the test: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_tile_data`

For the `downloadable_data_expected.pk1`, but a breakpoint on [this line](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post.py#L98), before the `pdt.assert_frame_equal` and run:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_downloadable_data`

Once on the breakpoint, capture the df to a pickle as follows:

```
import pickle
from pathlib import Path
data_path = Path.cwd()
output_downloadable_df_actual.to_pickle(data_path / "data_pipeline" / "etl" / "score" / "tests" / "snapshots" / "downloadable_data_expected.pkl", protocol=4)
```

Then take out the breakpoint and re-run the test: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_downloadable_data`

#### Future Enchancements

Pickles have several downsides that we should consider alternatives for:

1. They are opaque - it is necessary to open a python interpreter (as written above) to confirm its contents
2. They are a bit harder for newcomers to python to grok.
3. They potentially encode flawed typing assumptions (see above) which are paved over for future test runs.

In the future, we could adopt any of the below strategies to work around this:

1. We could use [pytest-snapshot](https://pypi.org/project/pytest-snapshot/) to automatically store the output of each test as data changes. This would make it so that you could avoid having to generate a pickle for each method - instead, you would only need to call `generate` once , and only when the dataframe had changed.

Additionally, you could use a pandas type schema annotation such as [pandera](https://pandera.readthedocs.io/en/stable/schema_models.html?highlight=inputschema#basic-usage) to annotate input/output schemas for given functions, and your unit tests could use these to validate explicitly. This could be of very high value for annotating expectations.

Alternatively, or in conjunction, you could move toward using a more strictly-typed container format for read/writes such as SQL/SQLite, and use something like [SQLModel](https://github.com/tiangolo/sqlmodel) to handle more explicit type guarantees.

### ETL Unit Tests

ETL unit tests are typically organized into three buckets:

- Extract Tests
- Transform Tests, and
- Load Tests

These are tested using different strategies explained below.

#### Extract Tests

Extract tests rely on the limited data transformations that occur as data is loaded from source files.

In tests, we use fake, limited CSVs read via `StringIO` , taken from the first several rows of the files of interest, and ensure data types are correct.

Down the line, we could use a tool like [Pandera](https://pandera.readthedocs.io/) to enforce schemas, both for the tests and the classes themselves.

#### Transform Tests

Transform tests are the heart of ETL unit tests, and compare ideal dataframes with their actual counterparts.

See above [Fixtures](#configuration--fixtures) section for information about where data is coming from.

#### Load Tests

These make use of [tmp_path_factory](https://docs.pytest.org/en/latest/how-to/tmp_path.html) to create a file-system located under `temp_dir`, and validate whether the correct files are written to the correct locations.

Additional future modifications could include the use of Pandera and/or other schema validation tools, and or a more explicit test that the data written to file can be read back in and yield the same dataframe.
