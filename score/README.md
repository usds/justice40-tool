# Justice 40 Score generator

## Setup

- Start a terminal
- Make sure you have Python 3.9 installed: `python -V` or `python3 -V`
- Create a `virtualenv` in this folder: `python -m venv venv`
- Activate the virtualenv
  - Windows: `./venv/Scripts/activate`
  - Mac/Linux: `source venv/bin/activate`
- Install packages: `pip install -r requirements.txt`
  - If you are a Windows user, you might need to install Build Tools for Visual Studio. [Instructions here](https://stackoverflow.com/a/54136652)

## Running the Jupyter notebook

- Start a terminal
- Change to this directory (i.e. `cd score`)
- Activate your virtualenv (see above)
- Type `jupyter notebook`. Your browser should open with a Jupyter Notebook tab

## Downloading Census Block Groups GeoJSON and Generating CBG CSVs

- Make sure you have Docker running in your machine
- Start a terminal
- Change to this directory (i.e. `cd score`)
- Activate your virtualenv (see above)
- Run `python scripts/download_cbg.py`
  Note: Census files are not kept in the repository and the download directories are ignored by Git

## Generating mbtiles

- Change to this directory (i.e. `cd score`)
- Activate your virtualenv (see above)
- Run the following script: `python .\scripts\generate_mbtiles.py`

## Serve the map locally

- Run: `docker run --rm -it -v ${PWD}/data/tiles:/data -p 8080:80 klokantech/tileserver-gl`
