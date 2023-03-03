"""This module defines a set of classes that can be used to fetch data
from a remote source. They are meant to be used in conjuction with ETLs
or other classes that require downloading data.

There are three types of data sources defined in this file:

FileDataSource – meant to be used when you have a single file to
retrive from a remote location and save to a destination.

ZipDataSource – used when you need to fetch and unzip a file, and save
the contents of that file to a destination.

CensusDataSource – used to download data from the Census API and store
the contents to a destination.

DataSource subclasses must implement the fetch method to define how
they will reach out to a remote source, download the data, and save
that data to the destination.
"""

from pathlib import Path
from typing import List
from dataclasses import dataclass
from abc import ABC, abstractmethod

from data_pipeline.etl.downloader import Downloader
from data_pipeline.etl.sources.census_acs.etl_utils import (
    retrieve_census_acs_data,
)


@dataclass
class DataSource(ABC):
    """A data source represents any source of data that is fetchable
    from a remote location.

    Attributes:
    source : str
            the location of this data source, as a url
    destination : Path
            the Path where the data source should be saved locally upon being fetched

    """

    source: str
    destination: Path

    @abstractmethod
    def fetch(self) -> None:
        pass


@dataclass
class FileDataSource(DataSource):
    """A data source representing a single file.

    This single file will be fetched from the source and saved to a single
    destination.
    """

    def fetch(self) -> None:
        """Fetches a single file from a source and saves it to a destination."""

        self.destination.parent.mkdir(parents=True, exist_ok=True)
        Downloader.download_file_from_url(
            file_url=self.source,
            download_file_name=self.destination,
            verify=True,
        )

    def __str__(self):
        return f"File – {self.source}"


@dataclass
class ZIPDataSource(DataSource):
    """A data source representing ZIP files.

    Zip files will be fetched and placed in the destination folder, then unzipped.
    """

    def fetch(self) -> None:

        self.destination.mkdir(parents=True, exist_ok=True)
        Downloader.download_zip_file_from_url(
            file_url=self.source,
            unzipped_file_path=self.destination,
            verify=True,
        )

    def __str__(self):
        return f"Zip – {self.source}"


@dataclass
class CensusDataSource(DataSource):
    """A data source representing census data.

    Data will be fetched using the Census API and saved to the destination file. Source is ignored.
    """

    acs_year: int
    variables: List[str]
    tract_output_field_name: str
    data_path_for_fips_codes: Path
    acs_type: str

    def fetch(self) -> None:

        df = retrieve_census_acs_data(
            acs_year=self.acs_year,
            variables=self.variables,
            tract_output_field_name=self.tract_output_field_name,
            data_path_for_fips_codes=self.data_path_for_fips_codes,
            acs_type=self.acs_type,
        )

        self.destination.parent.mkdir(parents=True, exist_ok=True)

        # Write CSV representation of census data
        df.to_csv(self.destination, index=False)

    def __str__(self):
        return f"Census – {self.acs_type}, {self.acs_year}"
