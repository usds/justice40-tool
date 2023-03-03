from pathlib import Path

import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource

logger = get_module_logger(__name__)


class DOEEnergyBurden(ExtractTransformLoad):

    NAME = "doe_energy_burden"

    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    LOAD_YAML_CONFIG: bool = True

    REVISED_ENERGY_BURDEN_FIELD_NAME: str

    def __init__(self):

        # fetch
        self.doe_energy_burden_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/DOE_LEAD_AMI_TRACT_2018_ALL.csv.zip"
        )

        # input
        self.doe_energy_burden_source = (
            self.get_sources_path() / "DOE_LEAD_AMI_TRACT_2018_ALL.csv"
        )

        # output
        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "doe_energy_burden"
        )
        self.INPUT_ENERGY_BURDEN_FIELD_NAME = "BURDEN"

        self.raw_df: pd.DataFrame
        self.output_df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.doe_energy_burden_url,
                destination=self.get_sources_path(),
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.raw_df = pd.read_csv(
            filepath_or_buffer=self.doe_energy_burden_source,
            # The following need to remain as strings for all of their digits, not get converted to numbers.
            dtype={
                self.INPUT_GEOID_TRACT_FIELD_NAME: "string",
            },
            low_memory=False,
        )

    def transform(self) -> None:

        logger.debug("Renaming columns and ensuring output format is correct")
        output_df = self.raw_df.rename(
            columns={
                self.INPUT_ENERGY_BURDEN_FIELD_NAME: self.REVISED_ENERGY_BURDEN_FIELD_NAME,
                self.INPUT_GEOID_TRACT_FIELD_NAME: self.GEOID_TRACT_FIELD_NAME,
            }
        )

        # Left-pad the tracts with 0s
        expected_length_of_census_tract_field = 11
        output_df[self.GEOID_TRACT_FIELD_NAME] = (
            output_df[self.GEOID_TRACT_FIELD_NAME]
            .astype(str)
            .apply(lambda x: x.zfill(expected_length_of_census_tract_field))
        )

        self.output_df = output_df
