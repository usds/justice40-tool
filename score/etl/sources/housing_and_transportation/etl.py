import pandas as pd

from etl.base import ExtractTransformLoad
from etl.sources.census.etl_utils import get_state_fips_codes
from utils import get_module_logger, unzip_file_from_url, remove_all_from_dir

logger = get_module_logger(__name__)


class HousingTransportationETL(ExtractTransformLoad):
    def __init__(self):
        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info(f"Extracting Housing and Transportation Data")
        pass

    def transform(self) -> None:
        logger.info(f"Transforming Housing and Transportation Data")
        pass

    def load(self) -> None:
        logger.info(f"Saving Housing and Transportation Data")
        pass
