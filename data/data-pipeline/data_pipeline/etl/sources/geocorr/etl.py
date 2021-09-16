import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, download_file_from_url, unzip_file_from_url

logger = get_module_logger(__name__)


class GeoCorrETL(ExtractTransformLoad):
    def __init__(self):
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "geocorr"

        # Need to change hyperlink to S3
        self.GEOCORR_PLACES_URL = "https://justice40-data.s3.amazonaws.com/data-sources/geocorr_urban_rural.csv.zip"
        self.GEOCORR_GEOID_FIELD_NAME = "GEOID10_TRACT"
        # self.GEOCORR_VALUE_FIELD_NAME = "Data_Value"
        # self.GEOCORR_MEASURE_FIELD_NAME = "Measure"

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting to download 2MB GeoCorr Urban Rural Census Tract Map file.")
        unzip_file_from_url(
            file_url = settings.AWS_JUSTICE40_DATASOURCES_URL
                + "/geocorr_urban_rural.csv.zip",
            download_path=self.TMP_PATH,
            unzipped_file_path=self.TMP_PATH / "geocorr",
        )

        self.df = pd.read_csv(
            filepath_or_buffer=self.TMP_PATH / "geocorr" / "geocorr2014_all_states.csv",
            dtype={self.GEOCORR_GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Starting GeoCorr Urban Rural Map transform")

        pass

        # Put in logic from Jupyter Notebook transform when we switch in the hyperlink to Geocorr

    def load(self) -> None:
        logger.info("Saving GeoCorr Urban Rural Map Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)

    def validate(self) -> None:
        logger.info("Validating Census ACS Data")

        pass
