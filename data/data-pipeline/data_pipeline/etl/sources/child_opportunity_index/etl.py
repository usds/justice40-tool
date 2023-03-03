from pathlib import Path

import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource

logger = get_module_logger(__name__)


class ChildOpportunityIndex(ExtractTransformLoad):
    """ETL Child Opportunity Index data.

    COI compiles a number of useful data sets. In the future, we could pull these
    data sets in directly from their original creators.

    Data dictionary available when you download zip from `self.COI_FILE_URL`.

    Data source overview: https://data.diversitydatakids.org/dataset/coi20-child-opportunity-index-2-0-database.

    Full technical documents: https://www.diversitydatakids.org/sites/default/files/2020-02/ddk_coi2.0_technical_documentation_20200212.pdf.

    Github repo: https://github.com/diversitydatakids/COI/
    """

    # Metadata for the baseclass
    NAME = "child_opportunity_index"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    LOAD_YAML_CONFIG: bool = True

    # Define these for easy code completion
    EXTREME_HEAT_FIELD: str
    HEALTHY_FOOD_FIELD: str
    IMPENETRABLE_SURFACES_FIELD: str
    READING_FIELD: str

    PUERTO_RICO_EXPECTED_IN_DATA = False

    def __init__(self):

        # fetch
        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            self.child_opportunity_url = (
                f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/"
                "child_opportunity_index/raw.zip"
            )
        else:
            self.child_opportunity_url = (
                "https://data.diversitydatakids.org/datastore/zip/f16fff12-b1e5-4f60-85d3-"
                "3a0ededa30a0?format=csv"
            )

        # input
        self.child_opportunity_index_source = (
            self.get_sources_path() / "raw.csv"
        )

        # output

        # TODO: Decide about nixing this
        self.TRACT_INPUT_COLUMN_NAME = self.INPUT_GEOID_TRACT_FIELD_NAME

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "child_opportunity_index"
        )

        self.TRACT_INPUT_COLUMN_NAME = "geoid"
        self.EXTREME_HEAT_INPUT_FIELD = "HE_HEAT"
        self.HEALTHY_FOOD_INPUT_FIELD = "HE_FOOD"
        self.IMPENETRABLE_SURFACES_INPUT_FIELD = "HE_GREEN"
        self.READING_INPUT_FIELD = "ED_READING"

        self.raw_df: pd.DataFrame
        self.output_df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.child_opportunity_url,
                destination=self.get_sources_path(),
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.raw_df = pd.read_csv(
            filepath_or_buffer=self.child_opportunity_index_source,
            # The following need to remain as strings for all of their digits, not get
            # converted to numbers.
            dtype={
                self.TRACT_INPUT_COLUMN_NAME: "string",
            },
            low_memory=False,
        )

    def transform(self) -> None:

        output_df = self.raw_df.rename(
            columns={
                self.TRACT_INPUT_COLUMN_NAME: self.GEOID_TRACT_FIELD_NAME,
                self.EXTREME_HEAT_INPUT_FIELD: self.EXTREME_HEAT_FIELD,
                self.HEALTHY_FOOD_INPUT_FIELD: self.HEALTHY_FOOD_FIELD,
                self.IMPENETRABLE_SURFACES_INPUT_FIELD: self.IMPENETRABLE_SURFACES_FIELD,
                self.READING_INPUT_FIELD: self.READING_FIELD,
            }
        )

        # Sanity check the tract field.
        if len(output_df[self.GEOID_TRACT_FIELD_NAME].str.len().unique()) != 1:
            raise ValueError("Wrong tract length.")

        # COI has two rows per tract: one for 2010 and one for 2015.
        output_df = output_df[output_df["year"] == 2015]

        # Convert percents from 0-100 to 0-1 to standardize with our other fields.
        percent_fields_to_convert = [
            self.HEALTHY_FOOD_FIELD,
            self.IMPENETRABLE_SURFACES_FIELD,
        ]

        for percent_field_to_convert in percent_fields_to_convert:
            output_df[percent_field_to_convert] = (
                output_df[percent_field_to_convert] / 100
            )

        self.output_df = output_df
