from pathlib import Path

import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource

logger = get_module_logger(__name__)


class EnergyDefinitionAlternativeDraft(ExtractTransformLoad):
    def __init__(self):

        # fetch
        self.definition_alternative_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/alternative DAC definition.csv.zip"
        )

        # input
        self.definition_alternative_source = (
            self.get_sources_path() / "J40 alternative DAC definition.csv"
        )

        # output
        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "energy_definition_alternative_draft"
        )

        self.TRACT_INPUT_COLUMN_NAME = "GEOID"
        self.ALTERNATIVE_DEFINITION_INPUT_COLUMN_NAME = "J40_DAC"

        # Constants for output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.ENERGY_RELATED_COMMUNITIES_DEFINITION_ALTERNATIVE,
            field_names.COAL_EMPLOYMENT,
            field_names.OUTAGE_EVENTS,
            field_names.HOMELESSNESS,
            field_names.DISABLED_POPULATION,
            field_names.OUTAGE_DURATION,
            field_names.JOB_ACCESS,
            field_names.FOSSIL_ENERGY_EMPLOYMENT,
            field_names.FOOD_DESERT,
            field_names.INCOMPLETE_PLUMBING,
            field_names.NON_GRID_CONNECTED_HEATING_FUEL,
            field_names.PARKS,
            field_names.GREATER_THAN_30_MIN_COMMUTE,
            field_names.INTERNET_ACCESS,
            field_names.MOBILE_HOME,
            field_names.SINGLE_PARENT,
            field_names.TRANSPORTATION_COSTS,
        ]

        self.df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.definition_alternative_url,
                destination=self.get_sources_path(),
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df = pd.read_csv(
            filepath_or_buffer=self.definition_alternative_source,
            # The following need to remain as strings for all of their digits, not get converted to numbers.
            dtype={
                self.TRACT_INPUT_COLUMN_NAME: "string",
            },
            low_memory=False,
        )

    def transform(self) -> None:

        self.df = self.df.rename(
            columns={
                self.TRACT_INPUT_COLUMN_NAME: self.GEOID_TRACT_FIELD_NAME,
                self.ALTERNATIVE_DEFINITION_INPUT_COLUMN_NAME: field_names.ENERGY_RELATED_COMMUNITIES_DEFINITION_ALTERNATIVE,
                "Coal_Emp_Ratio": field_names.COAL_EMPLOYMENT,
                "COUNT_Outage_Events": field_names.OUTAGE_EVENTS,
                "den_hmls_pop": field_names.HOMELESSNESS,
                "disability_pct": field_names.DISABLED_POPULATION,
                "Duration_in_Minutes": field_names.OUTAGE_DURATION,
                "emp_ovrll_ndx": field_names.JOB_ACCESS,
                "FE_Emp_Ratio": field_names.FOSSIL_ENERGY_EMPLOYMENT,
                "Food_LAhalfand10": field_names.FOOD_DESERT,
                "incomplete_plumbing_pct": field_names.INCOMPLETE_PLUMBING,
                "nongrid_heat_pct": field_names.NON_GRID_CONNECTED_HEATING_FUEL,
                "num_parks": field_names.PARKS,
                "Per_MoT_Dur_gte30": field_names.GREATER_THAN_30_MIN_COMMUTE,
                "Per_NoInt": field_names.INTERNET_ACCESS,
                "population_mobile_home_pct": field_names.MOBILE_HOME,
                "single_parent_pct": field_names.SINGLE_PARENT,
                "t_ami": field_names.TRANSPORTATION_COSTS,
            }
        )

        # Convert to boolean:
        self.df[
            field_names.ENERGY_RELATED_COMMUNITIES_DEFINITION_ALTERNATIVE
        ] = self.df[
            field_names.ENERGY_RELATED_COMMUNITIES_DEFINITION_ALTERNATIVE
        ].astype(
            "bool"
        )

    def load(self) -> None:
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
