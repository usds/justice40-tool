import geopandas as gpd
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TreeEquityScoreETL(ExtractTransformLoad):
    """Tree equity score methodology: https://www.treeequityscore.org/methodology/
    A lower Tree Equity Score indicates a greater priority for closing the tree canopy gap
    In order to estimate a general number of trees associated with an increase in tree
    canopy, the authors utilize a basic multiplier of 600 sq-ft (55.74 sq-m) of canopy area
    per urban tree assuming a medium-size urban tree crown width of 25-30 ft.
    Sources:
        1. Tree canopy cover. High resolution tree canopy where available.
        In the event tree canopy is not defer to National Land Cover Database.
        2. Census American Community Survey (ACS) 2018 5-year Block Group population estimates.
        3. Census ACS 2018 5-year city and block group Median Income estimates.
    """

    def __init__(self):
        self.TES_URL = "https://national-tes-data-share.s3.amazonaws.com/national_tes_share/"
        self.TES_CSV = self.get_tmp_path() / "tes_2021_data.csv"
        self.CSV_PATH = self.DATA_PATH / "dataset" / "tree_equity_score"
        self.df: gpd.GeoDataFrame
        self.states = [
            "al",
            "az",
            "ar",
            "ca",
            "co",
            "ct",
            "de",
            "dc",
            "fl",
            "ga",
            "id",
            "il",
            "in",
            "ia",
            "ks",
            "ky",
            "la",
            "me",
            "md",
            "ma",
            "mi",
            "mn",
            "ms",
            "mo",
            "mt",
            "ne",
            "nv",
            "nh",
            "nj",
            "nm",
            "ny",
            "nc",
            "nd",
            "oh",
            "ok",
            "or",
            "pa",
            "ri",
            "sc",
            "sd",
            "tn",
            "tx",
            "ut",
            "vt",
            "va",
            "wa",
            "wv",
            "wi",
            "wy",
        ]

    def extract(self) -> None:
        logger.info("Downloading Tree Equity Score Data")
        for state in self.states:
            super().extract(
                f"{self.TES_URL}{state}.zip.zip",
                f"{self.get_tmp_path()}/{state}",
            )

    def transform(self) -> None:
        logger.info("Transforming Tree Equity Score Data")
        tes_state_dfs = []
        for state in self.states:
            tes_state_dfs.append(
                gpd.read_file(f"{self.get_tmp_path()}/{state}/{state}.shp")
            )
        self.df = gpd.GeoDataFrame(
            pd.concat(tes_state_dfs), crs=tes_state_dfs[0].crs
        )

        # rename ID to Tract ID
        self.df.rename(
            # Block group ID delegated to attribute in superclass
            columns={"geoid": ExtractTransformLoad.GEOID_FIELD_NAME},
            inplace=True,
        )

    def load(self) -> None:
        logger.info("Saving Tree Equity Score CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df = self.df[
            [
                ExtractTransformLoad.GEOID_FIELD_NAME,
                "total_pop",  # Total Population according to ACS Estimates
                "state",
                "county",
                "dep_ratio",  # Dependent ratio
                "child_perc",  # Children (Age 0 -17) (ACS 2014 - 2018)
                "seniorperc",  # Seniors (Age 65+) (ACS 2014 - 2018)
                "treecanopy",  # Tree canopy cover
                "area",  # Source: https://www.fs.fed.us/nrs/pubs/gtr/gtr_nrs200.pdf
                "source",
                "avg_temp",  # Average Temperature from USGS Earth Explorer
                "ua_name",
                "incorpname",  # Incorporated place name
                "congressio",  # Congressional District
                "biome",
                "bgpopdense",
                "popadjust",  # Adjusted population estimate
                "tc_gap",  # Tree canopy gap
                "tc_goal",  # Tree canopy goal
                "priority",  # Priority community according to the index
                "tes",  # Tree equity score
                "tesctyscor",  # Tree equity score for the county
                "geometry",  # Block group geometry coordinates
            ]
        ]
        self.df.to_csv(self.CSV_PATH / "usa.csv", index=False)
