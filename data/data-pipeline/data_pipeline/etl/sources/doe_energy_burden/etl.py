from pathlib import Path

import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class DOEEnergyBurden(ExtractTransformLoad):
    NAME = "doe_energy_burden"
    SOURCE_URL: str = (
        settings.AWS_JUSTICE40_DATASOURCES_URL
        + "/DOE_LEAD_AMI_TRACT_2018_ALL.csv.zip"
    )
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    LOAD_YAML_CONFIG: bool = True

    REVISED_ENERGY_BURDEN_FIELD_NAME: str

    def __init__(self):
        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "doe_energy_burden"
        )
        self.INPUT_ENERGY_BURDEN_FIELD_NAME = "BURDEN"

        self.raw_df: pd.DataFrame
        self.output_df: pd.DataFrame

    def transform(self) -> None:
        logger.info("Starting DOE Energy Burden transforms.")
        raw_df: pd.DataFrame = pd.read_csv(
            filepath_or_buffer=self.get_tmp_path()
            / "DOE_LEAD_AMI_TRACT_2018_ALL.csv",
            # The following need to remain as strings for all of their digits, not get converted to numbers.
            dtype={
                self.INPUT_GEOID_TRACT_FIELD_NAME: "string",
            },
            low_memory=False,
        )

        logger.info("Renaming columns and ensuring output format is correct")
        output_df = raw_df.rename(
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
