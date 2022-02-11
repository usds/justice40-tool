from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger, unzip_file_from_url

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

    def __init__(self):
        self.COI_FILE_URL = (
            "https://data.diversitydatakids.org/datastore/zip/f16fff12-b1e5-4f60-85d3-"
            "3a0ededa30a0?format=csv"
        )

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "child_opportunity_index"
        )

        self.TRACT_INPUT_COLUMN_NAME = "geoid"
        self.EXTREME_HEAT_INPUT_FIELD = "HE_HEAT"
        self.HEALTHY_FOOD_INPUT_FIELD = "HE_FOOD"
        self.IMPENETRABLE_SURFACES_INPUT_FIELD = "HE_GREEN"
        self.READING_INPUT_FIELD = "ED_READING"

        # Constants for output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.EXTREME_HEAT_FIELD,
            field_names.HEALTHY_FOOD_FIELD,
            field_names.IMPENETRABLE_SURFACES_FIELD,
            field_names.READING_FIELD,
        ]

        self.raw_df: pd.DataFrame
        self.output_df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting 51MB data download.")

        unzip_file_from_url(
            file_url=self.COI_FILE_URL,
            download_path=self.get_tmp_path(),
            unzipped_file_path=self.get_tmp_path() / "child_opportunity_index",
        )

        self.raw_df = pd.read_csv(
            filepath_or_buffer=self.get_tmp_path()
            / "child_opportunity_index"
            / "raw.csv",
            # The following need to remain as strings for all of their digits, not get
            # converted to numbers.
            dtype={
                self.TRACT_INPUT_COLUMN_NAME: "string",
            },
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Starting transforms.")

        output_df = self.raw_df.rename(
            columns={
                self.TRACT_INPUT_COLUMN_NAME: self.GEOID_TRACT_FIELD_NAME,
                self.EXTREME_HEAT_INPUT_FIELD: field_names.EXTREME_HEAT_FIELD,
                self.HEALTHY_FOOD_INPUT_FIELD: field_names.HEALTHY_FOOD_FIELD,
                self.IMPENETRABLE_SURFACES_INPUT_FIELD: field_names.IMPENETRABLE_SURFACES_FIELD,
                self.READING_INPUT_FIELD: field_names.READING_FIELD,
            }
        )

        # Sanity check the tract field.
        if len(output_df[self.GEOID_TRACT_FIELD_NAME].str.len().unique()) != 1:
            raise ValueError("Wrong tract length.")

        # COI has two rows per tract: one for 2010 and one for 2015.
        output_df = output_df[output_df["year"] == 2015]

        # Convert percents from 0-100 to 0-1 to standardize with our other fields.
        percent_fields_to_convert = [
            field_names.HEALTHY_FOOD_FIELD,
            field_names.IMPENETRABLE_SURFACES_FIELD,
        ]

        for percent_field_to_convert in percent_fields_to_convert:
            output_df[percent_field_to_convert] = (
                output_df[percent_field_to_convert] / 100
            )

        self.output_df = output_df

    def load(self) -> None:
        logger.info("Saving CSV")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
