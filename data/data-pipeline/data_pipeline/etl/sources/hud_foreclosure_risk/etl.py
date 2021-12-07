from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class HUDForeclosureRisk(ExtractTransformLoad):
    """HUD foreclosure risk data.

    Data dictionary: https://www.huduser.gov/portal/NSP2datadesc.html.

    """

    def __init__(self):
        self.HUD_FORECLOSURE_RISK_FILE_URL = (
            "https://www.huduser.gov/NSP2/excel/Total%20US.zip"
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
        logger.info("Starting 6MB data download.")

        unzip_file_from_url(
            file_url=self.HUD_FORECLOSURE_RISK_FILE_URL,
            download_path=self.TMP_PATH,
            unzipped_file_path=self.TMP_PATH / "child_opportunity_index",
        )

        self.raw_df = pd.read_csv(
            filepath_or_buffer=self.TMP_PATH
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

    def validate(self) -> None:
        logger.info("Validating data.")

        pass

    def load(self) -> None:
        logger.info("Saving CSV")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
