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
        self.CENSUS_USA_CSV = self.DATA_PATH / "census" / "csv" / "us.csv"
        self.SCORE_CSV_PATH = self.DATA_PATH / "score" / "csv"

        self.STATE_CSV = self.DATA_PATH / "census" / "csv" / "fips_states_2010.csv"

        self.FULL_SCORE_CSV = self.SCORE_CSV_PATH / "full" / "usa.csv"
        self.TILR_SCORE_CSV = self.SCORE_CSV_PATH / "tile" / "usa.csv"

        self.TILES_SCORE_COLUMNS = [
            "GEOID10",
            "Score E (percentile)",
            "Score E (top 25th percentile)",
            "GEOID",
            "State Abbreviation",
            "County Name",
        ]
        self.TILES_SCORE_CSV_PATH = self.SCORE_CSV_PATH / "tiles"
        self.TILES_SCORE_CSV = self.TILES_SCORE_CSV_PATH / "usa.csv"

        self.counties_df: pd.DataFrame
        self.states_df: pd.DataFrame
        self.score_df: pd.DataFrame
        self.score_county_state_merged: pd.DataFrame
        self.score_for_tiles: pd.DataFrame

    def extract(self) -> None:
        super().extract(
            self.CENSUS_COUNTIES_ZIP_URL,
            self.TMP_PATH,
        )

        logger.info("Reading Counties CSV")
        self.counties_df = pd.read_csv(
            self.CENSUS_COUNTIES_TXT,
            sep="\t",
            dtype={"GEOID": "string", "USPS": "string"},
            low_memory=False,
            encoding="latin-1",
        )

        logger.info("Reading States CSV")
        self.states_df = pd.read_csv(
            self.STATE_CSV, dtype={"fips": "string", "state_code": "string"}
        )
        self.score_df = pd.read_csv(self.FULL_SCORE_CSV, dtype={"GEOID10": "string"})

    def transform(self) -> None:
        logger.info("Transforming data sources for Score + County CSV")

        # rename some of the columns to prepare for merge
        self.counties_df = self.counties_df[["USPS", "GEOID", "NAME"]]
        self.counties_df.rename(
            columns={"USPS": "State Abbreviation", "NAME": "County Name"},
            inplace=True,
        )

        # remove unnecessary columns
        self.states_df.rename(
            columns={
                "fips": "State Code",
                "state_name": "State Name",
                "state_abbreviation": "State Abbreviation",
            },
            inplace=True,
        )
        self.states_df.drop(["region", "division"], axis=1, inplace=True)

        # add the tract level column
        self.score_df["GEOID"] = self.score_df.GEOID10.str[:5]

        # merge state with counties
        county_state_merged = self.counties_df.merge(
            self.states_df, on="State Abbreviation", how="left"
        )

        # merge state + county with score
        self.score_county_state_merged = self.score_df.merge(
            county_state_merged, on="GEOID", how="left"
        )

        # check if there are census cbgs without score
        logger.info("Removing CBG rows without score")

        ## load cbgs
        cbg_usa_df = pd.read_csv(
            self.CENSUS_USA_CSV,
            names=["GEOID10"],
            dtype={"GEOID10": "string"},
            low_memory=False,
            header=None,
        )

        # merge census cbgs with score
        merged_df = cbg_usa_df.merge(
            self.score_county_state_merged, on="GEOID10", how="left"
        )

        # list the null score cbgs
        null_cbg_df = merged_df[merged_df["Score E (percentile)"].isnull()]

        # subsctract data sets
        removed_df = pd.concat([merged_df, null_cbg_df, null_cbg_df]).drop_duplicates(
            keep=False
        )

        # set the score to the new df
        self.score_county_state_merged = removed_df

    def load(self) -> None:
        logger.info("Saving Full Score CSV with County Information")
        self.SCORE_CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.score_county_state_merged.to_csv(self.FULL_SCORE_CSV, index=False)

        logger.info("Saving Tile Score CSV")
        # TODO: check which are the columns we'll use
        # Related to: https://github.com/usds/justice40-tool/issues/302
        score_tiles = self.score_county_state_merged[self.TILES_SCORE_COLUMNS]
        self.TILES_SCORE_CSV_PATH.mkdir(parents=True, exist_ok=True)
        score_tiles.to_csv(self.TILES_SCORE_CSV, index=False)
