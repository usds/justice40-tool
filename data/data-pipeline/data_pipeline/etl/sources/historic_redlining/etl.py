import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class HistoricRedliningETL(ExtractTransformLoad):
    NAME = "historic_redlining"
    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT

    def __init__(self):
        self.CSV_PATH = self.DATA_PATH / "dataset" / "historic_redlining"
        self.HISTORIC_REDLINING_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/HRS_2010.zip"
        )
        self.HISTORIC_REDLINING_FILE_PATH = (
            self.get_tmp_path() / "HRS_2010.xlsx"
        )

        self.REDLINING_SCALAR = "Tract-level redlining score"

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.REDLINING_SCALAR,
        ]
        self.df: pd.DataFrame

    def transform(self) -> None:
        logger.info("Transforming Historic Redlining Data")
        # this is obviously temporary
        historic_redlining_data = pd.read_excel(
            self.HISTORIC_REDLINING_FILE_PATH
        )
        historic_redlining_data[self.GEOID_TRACT_FIELD_NAME] = (
            historic_redlining_data["GEOID10"].astype(str).str.zfill(11)
        )
        historic_redlining_data = historic_redlining_data.rename(
            columns={"HRS2010": self.REDLINING_SCALAR}
        )

        logger.info(f"{historic_redlining_data.columns}")

        # Calculate lots of different score thresholds for convenience
        for threshold in [3.25, 3.5, 3.75]:
            historic_redlining_data[
                f"{self.REDLINING_SCALAR} meets or exceeds {round(threshold, 2)}"
            ] = (historic_redlining_data[self.REDLINING_SCALAR] >= threshold)
            ## NOTE We add to columns to keep here
            self.COLUMNS_TO_KEEP.append(
                f"{self.REDLINING_SCALAR} meets or exceeds {round(threshold, 2)}"
            )

        self.output_df = historic_redlining_data
