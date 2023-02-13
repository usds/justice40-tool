from pathlib import Path
from typing import Protocol, List
from dataclasses import dataclass
from abc import ABC, abstractmethod

from data_pipeline.etl.downloader import Downloader
from data_pipeline.utils import unzip_file_from_url
from data_pipeline.etl.sources.census_acs.etl_utils import (
    retrieve_census_acs_data,
)


class Fetchable(Protocol):
    """Defines a protocol for fetchable things. That is, things that
    can be fetched from some origin and saved to some other place."""

    def fetch(self) -> None:
        pass


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
