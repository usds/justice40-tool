import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, download_file_from_url
from data_pipeline.score import field_names

logger = get_module_logger(__name__)


class CDCPlacesETL(ExtractTransformLoad):
    def __init__(self):
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "cdc_places"

        self.CDC_PLACES_URL = "https://chronicdata.cdc.gov/api/views/cwsq-ngmh/rows.csv?accessType=DOWNLOAD"
        self.CDC_GEOID_FIELD_NAME = "LocationID"
        self.CDC_VALUE_FIELD_NAME = "Data_Value"
        self.CDC_MEASURE_FIELD_NAME = "Measure"

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting to download 520MB CDC Places file.")
        file_path = download_file_from_url(
            file_url=self.CDC_PLACES_URL,
            download_file_name=self.get_tmp_path()
            / "cdc_places"
            / "census_tract.csv",
        )

        self.df = pd.read_csv(
            filepath_or_buffer=file_path,
            dtype={self.CDC_GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Starting CDC Places transform")

        # Rename GEOID field
        self.df.rename(
            columns={self.CDC_GEOID_FIELD_NAME: self.GEOID_TRACT_FIELD_NAME},
            inplace=True,
            errors="raise",
        )

        # Note: Puerto Rico not included.
        self.df = self.df.pivot(
            index=self.GEOID_TRACT_FIELD_NAME,
            columns=self.CDC_MEASURE_FIELD_NAME,
            values=self.CDC_VALUE_FIELD_NAME,
        )

        # rename columns to be used in score
        rename_fields = {
            "Current asthma among adults aged >=18 years": field_names.ASTHMA_FIELD,
            "Coronary heart disease among adults aged >=18 years": field_names.HEART_DISEASE_FIELD,
            "Cancer (excluding skin cancer) among adults aged >=18 years": field_names.CANCER_FIELD,
            "Diagnosed diabetes among adults aged >=18 years": field_names.DIABETES_FIELD,
            "Physical health not good for >=14 days among adults aged >=18 years": field_names.PHYS_HEALTH_NOT_GOOD_FIELD,
        }
        self.df.rename(
            columns=rename_fields,
            inplace=True,
            errors="raise",
        )

        # Make the index (the census tract ID) a column, not the index.
        self.df.reset_index(inplace=True)

    def load(self) -> None:
        logger.info("Saving CDC Places Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
