import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource

logger = get_module_logger(__name__)


class HistoricRedliningETL(ExtractTransformLoad):

    NAME = "historic_redlining"

    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT
    EXPECTED_MISSING_STATES = [
        "10",
        "11",
        "16",
        "23",
        "30",
        "32",
        "35",
        "38",
        "46",
        "50",
        "56",
    ]
    PUERTO_RICO_EXPECTED_IN_DATA = False
    ALASKA_AND_HAWAII_EXPECTED_IN_DATA: bool = False

    def __init__(self):

        # fetch
        self.hrs_url = settings.AWS_JUSTICE40_DATASOURCES_URL + "/HRS_2010.zip"

        # input
        self.hrs_source = self.get_sources_path() / "HRS_2010.xlsx"

        self.REDLINING_SCALAR = "Tract-level redlining score"

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.REDLINING_SCALAR,
        ]

        self.df: pd.DataFrame
        self.historic_redlining_data: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.hrs_url, destination=self.get_sources_path()
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.historic_redlining_data = pd.read_excel(self.hrs_source)

    def transform(self) -> None:
        # this is obviously temporary

        self.historic_redlining_data[self.GEOID_TRACT_FIELD_NAME] = (
            self.historic_redlining_data["GEOID10"].astype(str).str.zfill(11)
        )
        self.historic_redlining_data = self.historic_redlining_data.rename(
            columns={"HRS2010": self.REDLINING_SCALAR}
        )

        logger.debug(f"{self.historic_redlining_data.columns}")

        # Calculate lots of different score thresholds for convenience
        for threshold in [3.25, 3.5, 3.75]:
            self.historic_redlining_data[
                f"{self.REDLINING_SCALAR} meets or exceeds {round(threshold, 2)}"
            ] = (
                self.historic_redlining_data[self.REDLINING_SCALAR] >= threshold
            )
            ## NOTE We add to columns to keep here
            self.COLUMNS_TO_KEEP.append(
                f"{self.REDLINING_SCALAR} meets or exceeds {round(threshold, 2)}"
            )

        self.output_df = self.historic_redlining_data
