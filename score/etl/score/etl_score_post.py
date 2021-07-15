import pandas as pd

from etl.base import ExtractTransformLoad
from utils import get_module_logger

logger = get_module_logger(__name__)


class PostScoreETL(ExtractTransformLoad):
    """
    A class used to instantiate an ETL object to retrieve and process data from
    datasets.
    """

    def __init__(self):
        self.CENSUS_COUNTIES_ZIP_URL = "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/Gaz_counties_national.zip"
        self.CENSUS_COUNTIES_TXT = self.TMP_PATH / "Gaz_counties_national.txt"
        self.CENSUS_COUNTIES_COLS = ["USPS", "GEOID", "NAME"]
        self.CSV_PATH = self.DATA_PATH / "score" / "csv"
        self.STATE_CSV = (
            self.DATA_PATH / "census" / "csv" / "fips_states_2010.csv"
        )
        self.SCORE_CSV = self.DATA_PATH / "score" / "csv" / "usa.csv"
        self.COUNTY_SCORE_CSV = (
            self.DATA_PATH / "score" / "csv" / "usa-county.csv"
        )

        self.counties_df: pd.DataFrame
        self.states_df: pd.DataFrame
        self.score_df: pd.DataFrame
        self.score_county_state_merged: pd.DataFrame

    def extract(self) -> None:
        super().extract(
            self.CENSUS_COUNTIES_ZIP_URL,
            self.TMP_PATH,
        )

        logger.info(f"Reading Counties CSV")
        self.counties_df = pd.read_csv(
            self.CENSUS_COUNTIES_TXT,
            sep="\t",
            dtype={"GEOID": "string", "USPS": "string"},
            low_memory=False,
            encoding="latin-1",
        )

        logger.info(f"Reading States CSV")
        self.states_df = pd.read_csv(
            self.STATE_CSV, dtype={"fips": "string", "state_code": "string"}
        )
        self.score_df = pd.read_csv(self.SCORE_CSV, dtype={"GEOID10": "string"})

    def transform(self) -> None:
        logger.info(f"Transforming data sources for Score + County CSV")

        # rename some of the columns to prepare for merge
        self.counties_df = self.counties_df[["USPS", "GEOID", "NAME"]]
        self.counties_df.rename(
            columns={"USPS": "State Abbreviation", "NAME": "County Name"},
            inplace=True,
        )
        self.states_df.rename(
            columns={
                "fips": "State Code",
                "state_name": "State Name",
                "state_abbreviation": "State Abbreviation",
            },
            inplace=True,
        )
        self.score_df["GEOID"] = self.score_df.GEOID10.str[:5]

        # merge state and counties
        county_state_merged = self.counties_df.join(
            self.states_df, rsuffix=" Other"
        )
        del county_state_merged["State Abbreviation Other"]

        # merge county and score
        self.score_county_state_merged = self.score_df.join(
            county_state_merged, rsuffix="_OTHER"
        )
        del self.score_county_state_merged["GEOID_OTHER"]

    def load(self) -> None:
        logger.info(f"Saving Score + County CSV")
        self.score_county_state_merged.to_csv(
            self.COUNTY_SCORE_CSV, index=False
        )
