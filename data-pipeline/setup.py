"""Setup script for `data_pipeline` package."""
import os

from setuptools import find_packages
from setuptools import setup

# TODO: replace this with `poetry`. https://github.com/usds/justice40-tool/issues/57
_PACKAGE_DIRECTORY = os.path.abspath(os.path.dirname(__file__))

setup(
    name="data-pipeline",
    version="1.0.0",
    description="Data Pipeline Package",
    author="CEJST Development Team",
    author_email="justice40open@usds.gov",
    install_requires=[],
    include_package_data=True,
    package_dir={'': 'src'},
    packages=find_packages(where="src"),
)
