import pandas as pd

from etl.base import ExtractTransformLoad
from utils import get_module_logger

logger = get_module_logger(__name__)


class CountyStateScoreETL(ExtractTransformLoad):
    def __init__(self):
        self.CENSUS_COUNTIES_ZIP_URL = "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2020_Gazetteer/2020_Gaz_counties_national.zip"
        self.CENSUS_COUNTIES_TXT = (
            self.TMP_PATH / "2020_Gaz_counties_national.txt"
        )
        self.CENSUS_COUNTIES_COLS = ["USPS", "GEOID", "NAME"]
        self.CSV_PATH = self.DATA_PATH / "score" / "csv"
        self.counties_df: pd.DataFrame

    def extract(self) -> None:
        super().extract(
            self.CENSUS_COUNTIES_ZIP_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        self.counties_df = pd.read_csv(self.CENSUS_COUNTIES_TXT, sep="\t")
        breakpoint()
