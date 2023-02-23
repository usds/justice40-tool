# Justice40 Data Pipeline and Scoring Application Installation Guide

This page documents the installation steps for the Justice40 data pipeline and scoring application. It covers steps for macOS and Win10. If you are not on either of those platforms, install the software using steps appropriate for your operating system and device.

> :warning: **WARNING**  
> This guide assumes you've performed all prerequisite steps listed in the [main installation guide](/INSTALLATION.md). If you've not performed those steps, now is a good time.

> :bulb: **NOTE**  
> If you've not yet read the [project README](/README.md) or the [data pipeline and scoring application README](README.md) to familiarize yourself with the project and how to contribute, it would be useful to do so before continuing with this installation guide.

## Prerequisites

### 1. Install Git

---

---

---

---

## Local development

You can run the Python code locally without Docker to develop, using Poetry. However, to generate the census data you will need the [GDAL library](https://github.com/OSGeo/gdal) installed locally. For score generation, you will need [libspatialindex](https://libspatialindex.org/en/latest/). And to generate tiles for a local map, you will need [Mapbox tippecanoe](https://github.com/mapbox/tippecanoe). Please refer to the repos for specific instructions for your OS.

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
- spatialindex: `brew install spatialindex`

Note: For MacOS Monterey or M1 Macs, [you might need to follow these steps](https://stackoverflow.com/a/70880741) to install Scipy.

### Windows Users

If you want to run tile generation, please install TippeCanoe [following these instructions](https://github.com/GISupportICRC/ArcGIS2Mapbox#installing-tippecanoe-on-windows). You also need some pre-requisites for Geopandas as specified in the Poetry requirements. Please follow [these instructions](https://stackoverflow.com/questions/56958421/pip-install-geopandas-on-windows) to install the Geopandas dependency locally. It's definitely easier if you have access to WSL (Windows Subsystem Linux), and install these packages using commands similar to our [Dockerfile](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/Dockerfile).

### Setting up Poetry

- Start a terminal
- Change to this directory (`/data/data-pipeline/`)
- Make sure you have at least Python 3.8 installed: `python -V` or `python3 -V`
- We use [Poetry](https://python-poetry.org/) for managing dependencies and building the application. Please follow the instructions on their site to download.
- Install Poetry requirements with `poetry install`

### Running tox

Our full test and check suite is run using tox. This can be run using commands such
as `poetry run tox`.

Each run can take a while to build the whole environment. If you'd like to save time,
you can use the previously built environment by running `poetry run tox -e lint`
which will drastically speed up the linting process.

### Configuring pre-commit hooks

<!-- markdown-link-check-disable -->

To promote consistent code style and quality, we use git pre-commit hooks to
automatically lint and reformat our code before every commit we make to the codebase.
Pre-commit hooks are defined in the file [`.pre-commit-config.yaml`](../.pre-commit-config.yaml).

<!-- markdown-link-check-enable -->

1.  First, install [`pre-commit`](https://pre-commit.com/) globally:

        $ brew install pre-commit

2.  While in the `data/data-pipeline` directory, run `pre-commit install` to install
    the specific git hooks used in this repository.

Now, any time you commit code to the repository, the hooks will run on all modified files automatically. If you wish,
you can force a re-run on all files with `pre-commit run --all-files`.

#### Conflicts between backend and frontend git hooks

<!-- markdown-link-check-disable -->

In the front-end part of the codebase (the `justice40-tool/client` folder), we use
`Husky` to run pre-commit hooks for the front-end. This is different than the
`pre-commit` framework we use for the backend. The frontend `Husky` hooks are
configured at
[client/.husky](client/.husky).

It is not possible to run both our `Husky` hooks and `pre-commit` hooks on every
commit; either one or the other will run.

<!-- markdown-link-check-enable -->

`Husky` is installed every time you run `npm install`. To use the `Husky` front-end
hooks during front-end development, simply run `npm install`.

However, running `npm install` overwrites the backend hooks setup by `pre-commit`.
To restore the backend hooks after running `npm install`, do the following:

1. Run `pre-commit install` while in the `data/data-pipeline` directory.
2. The terminal should respond with an error message such as:

```
[ERROR] Cowardly refusing to install hooks with `core.hooksPath` set.
hint: `git config --unset-all core.hooksPath`
```

This error is caused by having previously run `npm install` which used `Husky` to
overwrite the hooks path.

3. Follow the hint and run `git config --unset-all core.hooksPath`.
4. Run `pre-commit install` again.

Now `pre-commit` and the backend hooks should take precedence.
