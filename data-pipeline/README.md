## Overview

This directory will hold the data processing scripts used to extract, transfrom, and load data into the justice40 tool.

## Getting Started

### Prerequisites

- Python installed on your local machine, preferably a version between 3.7 and 3.9

In order to check which version of python you have installed, run the following in your command line, and the output should look something like this:

> NOTE: in all of the code blocks below, lines preceded with $ indicate commands you should enter in your command line (excluding the $ itself), while lines preceded with > indicate the expected output from the previous command.

```
$ python --version
> Python 3.9.0
```

If you receive an error message, or the version of python you have installed is not between 3.7 and 3.9, consider using a tool like [pyenv](https://github.com/pyenv/pyenv) (on Mac/Linux) or [pyenv-win](https://github.com/pyenv-win/pyenv-win) to manage multiple python interpreters.

### Installation

1. Create a new virtual environment by running `python -m venv env` in the command line.
1. Activate the virtual environment by running `source env/bin/activate` (on Mac/Linux) or `.\env\Scripts\activate` (on Windows).
1. Install this package in editable mode by running `pip install -e .` which makes changes made to scripts within this package available without re-installing it.
1. Install the other dependencies required to contribute to the project by running `pip -r requirements.txt`
1. Execute all tests by running `tox`

## Usage

Additional information on usage TBA

## Contributing

Please follow the [contributing guidelines](../CONTRIBUTING.md) for the project overall. In addition to those general guidelines, please follow the steps below when contributing code to this package:

1. All new python code should be added either as a single module or collection of modules under the existing `src/data_pipeline/` package. For reference:
    ```
    setup.py
    src/
      data_pipeline/
        hello.py
        your_new_module_1.py
        your_new_module_2/
           your_new_module_2_1.py
           your_new_module_2_2.py
    tests/
    ```
1. If the code in your contribution requires a package that is not already listed in the `requirementst.txt` please add that dependency to the following locations in this package:
   - Add the name of the package to the list of packages passed to `install_requires` in `setup.py` like so:
     ```
     import os

     from setuptools import find_packages
     from setuptools import setup

     # ...

     setup(
        # ...
        install_requires=[
            "pandas",  # needs to be a string
        ],
        include_package_data=True,
        package_dir={'': 'src'},
        packages=find_packages(where="src"),
     )
     ```
   - Add the name and version to `requirements.txt` like so:
     ```
     # ...
     pytest-cov==2.12.1
     pandas==1.2.4
     ```
1. If your contribution involves creating a new method or function, make sure you add a test which calls that method or function to `tests/`. Please consider adding tests in a file structure that mirrors the modules you are contributing to. For reference:
   ```
   tests/
     conftest.py
     test_hello.py
     test_your_new_module_1.py
     your_new_module_2/
        test_your_new_module_2_1.py
        test_your_new_module_2_2.py

   ```
   > **Notes**
   > - CI/CD checks will only pass if more than 90% of the code base is executed by the tests
   > - Pytest requires the following naming conventions for [test discovery](https://docs.pytest.org/en/reorganize-docs/new-docs/user/naming_conventions.html)
