# Justice40 Data Pipeline and Scoring Application Installation Guide

This page documents the local environment setup steps for the Justice40 Data Pipeline and Scoring Application. It covers steps for macOS and Win10. If you are not on either of those platforms, install the software using instructions appropriate for your operating system and device.

> :warning: **WARNING**  
> This guide assumes you've performed all prerequisite steps listed in the [main installation guide](/INSTALLATION.md). If you've not performed those steps, now is a good time.

> :bulb: **NOTE**  
> If you've not yet read the [project README](/README.md) or the [data pipeline and scoring application README](README.md) to familiarize yourself with the project, it would be useful to do so before continuing with this installation guide.

## Installation

The Justice40 Data Pipeline and Scoring Application is written in Python. It can be run using Poetry after installing a few third party tools.

### 1. Install Python

The application is written in Python, and requires the installation of Python 3.8 or newer (we recommend 3.10).

#### macOS :apple:

There are many ways to install Python on macOS, and you can choose any of those ways that work for your configuration.

One such way is by using [`pyenv`](https://github.com/pyenv/pyenv). `pyenv` allows you to manage multiple Python versions on the same device. To install `pyenv` on your system, follow [these instructions](https://github.com/pyenv/pyenv#installation). Be sure to follow any post-installation steps listed by Homebrew, as well as any extra steps listed in the installation instructions.

Once `pyenv` is installed, you can use it to install Python. Execute the command `pyenv install 3.10.6` to install Python 3.10. After installing Python, navigate to the `justice40-tool` directory and set this Python to be your default by issuing the command `pyenv local 3.10.6`. Run the command `python --version` to make sure this worked.

> :warning: **WARNING**
> We've had trouble with 3rd party dependencies in Python 3.11 on macOS machines with Apple silicon. In case of odd dependency issues, please use Python 3.10.

#### Win10 :window:

Follow the Get Started guide on [python.org](https://www.python.org/) to download and install Python on your Windows system. Alternately, if you wish to manage your Python installations more carefully, you can use [`pyenv-win`](https://github.com/pyenv-win/pyenv-win).

---

### 2. Install Poetry

The Justice40 Data Pipeline and Scoring Application uses [Poetry](https://python-poetry.org/) to manage Python dependencies. Those dependencies are defined in [pyproject.toml](pyproject.toml), and exact versions of all dependencies can be found in [poetry.lock](poetry.lock).

Once Poetry is installed, you can download project dependencies by navigating to `justice40-tool/data/data-pipeline` and running `poetry install`.

> :warning: **WARNING**  
> While it may be tempting to run `poetry update`, this project is built with older versions of some dependencies. Updating all dependencies will likely cause the application to behave in unexpected ways, and may cause the application to crash.

#### macOS :apple:

To install Poetry on macOS, follow the [installation instructions](https://python-poetry.org/docs/#installation) on the Poetry site. There are multiple ways to install Poetry; we prefer installing and managing it through [`pipx`](https://pypa.github.io/pipx/installation/) (requires `pipx` installation), but feel free to use whatever works for your configuration.

#### Win10 :window:

To install Poetry on Win10, follow the [installation instructions](https://python-poetry.org/docs/#installation) on the Poetry site.

---

### 3. Install the 3rd Party Tools

The application requires the installation of three 3rd party tools.

| Tool            | Purpose              | Link                                                      |
| --------------- | -------------------- | --------------------------------------------------------- |
| GDAL            | Generate census data | [GDAL library](https://github.com/OSGeo/gdal)             |
| libspatialindex | Score generation     | [libspatialindex](https://libspatialindex.org/en/latest/) |
| tippecanoe      | Generate map tiles   | [Mapbox tippecanoe](https://github.com/mapbox/tippecanoe) |

#### macOS :apple:

Use Homebrew to install the three tools.

- GDAL: `brew install gdal`
- libspatialindex: `brew install spatialindex`
- tippecanoe: `brew install tippecanoe`

> :exclamation: **ATTENTION**  
> For macOS Monterey or Macs with Apple silicon, you may need to follow [these steps](https://stackoverflow.com/a/70880741) to install Scipy.

#### Win10 :window:

If you want to run tile generation, please install tippecanoe [following these instructions](https://github.com/GISupportICRC/ArcGIS2Mapbox#installing-tippecanoe-on-windows). You also need some pre-requisites for Geopandas (as specified in the Poetry requirements). Please follow [these instructions](https://stackoverflow.com/questions/56958421/pip-install-geopandas-on-windows) to install the Geopandas dependency locally. It's definitely easier if you have access to WSL (Windows Subsystem Linux), and install these packages using commands similar to our [Dockerfile](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/Dockerfile).

---

### 4. Install Pre-Commit Hooks

<!-- markdown-link-check-disable -->

To promote consistent code style and quality, we use Git [pre-commit](https://pre-commit.com) hooks to automatically lint and reformat our code before every commit. This project's pre-commit hooks are defined in [`.pre-commit-config.yaml`](../.pre-commit-config.yaml).

After following the installation instructions for your platform, navigate to the `justice40-tool/data/data-pipeline` directory and run `pre-commit install` to install the pre-commit hooks used in this repository.

After installing pre-commit hooks, any time you commit code to the repository the hooks will run on all modified files automatically. You can force a re-run on all files with `pre-commit run --all-files`.

<!-- markdown-link-check-enable -->

#### macOS :apple:

Follow [the Homebrew installation instructions on the pre-commit website](https://pre-commit.com/#install) to install pre-commit on macOS.

#### Win10 :window:

Follow [the instructions on the pre-commit website](https://pre-commit.com/#install) to install pre-commit on Win10.

#### Conflicts between backend and frontend Git hooks

In the client part of the codebase (the `justice40-tool/client` folder), we use a different tool, `Husky`, to run pre-commit hooks. It is not possible to run both our `Husky` hooks and `pre-commit` hooks on every commit; either one or the other will run.

`Husky` is installed every time you run `npm install`. To use the `Husky` front-end hooks during front-end development, simply run `npm install`.

However, running `npm install` overwrites the backend hooks setup by `pre-commit`. To restore the backend hooks after running `npm install`, do the following:

1. Run `pre-commit install` while in the `justice40-tool/data/data-pipeline` directory.
2. The terminal should respond with an error message such as:

```
[ERROR] Cowardly refusing to install hooks with `core.hooksPath` set.
hint: `git config --unset-all core.hooksPath`
```

This error is caused by having previously run `npm install` which used `Husky` to overwrite the hooks path.

3. Follow the hint and run `git config --unset-all core.hooksPath`.
4. Run `pre-commit install` again.

Now `pre-commit` and the backend hooks should work.

## Visual Studio Code

If you are using VS Code, you can make use of the `.vscode` configurations located at `data/data-pipeline/.vscode`. To do this, open VS Code with the command `code data/data-pipeline`.

These configurations include,

1. `launch.json` - launch commands that allow for debugging the various commands in `application.py`. Note that because we are using the otherwise excellent [Click CLI](https://click.palletsprojects.com/en/8.0.x/), and Click in turn uses `console_scripts` to parse and execute command line options, it is necessary to run the equivalent of `python -m data_pipeline.application [command]` within `launch.json` to be able to set and hit breakpoints (this is what is currently implemented. Otherwise, you may find that the script times out after 5 seconds. More about this [here](https://stackoverflow.com/questions/64556874/how-can-i-debug-python-console-script-command-line-apps-with-the-vscode-debugger).
2. `settings.json` - these ensure that you're using the default linter (`pylint`), formatter (`flake8`), and test library (`pytest`).
3. `tasks.json` - these enable you to use `Terminal → Run Task` to run our preferred formatters and linters within your project.

Please only add settings to this file that should be shared across the team (not settings here that only apply to local development environments, such as those that use absolute paths). If you are looking to add something to this file, check in with the rest of the team to ensure the proposed settings should be shared.
