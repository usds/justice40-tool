import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class EJScreenAreasOfConcernETL(ExtractTransformLoad):
    def __init__(self):
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "ejscreen_areas_of_concern"

        # TO DO: Load from actual source; the issue is that this dataset is not public for now
        self.LOCAL_CSV_PATH = self.DATA_PATH / "local"
        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Loading EJScreen Areas of Concern Data Locally")

        self.df = pd.read_csv(
            filepath_or_buffer=self.LOCAL_CSV_PATH
            / "ejscreen_areas_of_concerns_indicators.csv",
            dtype={
                self.GEOID_FIELD_NAME: "string",
            },
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Transforming EJScreen Areas of Concern Data")

        # TO DO: As a one off we did all the processing in a separate Notebook
        # Can add here later for a future PR
        pass

    def load(self) -> None:
        logger.info("Saving EJScreen Areas of Concern Data")
        # write nationwide csv
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.OUTPUT_PATH / "usa.csv", index=False)
