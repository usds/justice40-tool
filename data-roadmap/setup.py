"""Setup script for `data_roadmap` package."""
import os

from setuptools import find_packages
from setuptools import setup

# TODO: remove once this files has been checked by linter
# TODO: replace this with `poetry`. https://github.com/usds/justice40-tool/issues/57
_PACKAGE_DIRECTORY = os.path.abspath(os.path.dirname(__file__))

setup(
    name="data_roadmap",
    description="Data roadmap package",
    author="CEJST Development Team",
    author_email="justice40open@usds.gov",
    install_requires=[
        "yamale",
        "importlib-resources",
    ],
    include_package_data=True,
    packages=find_packages(),
)
