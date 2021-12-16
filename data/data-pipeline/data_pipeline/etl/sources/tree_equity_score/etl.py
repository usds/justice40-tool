import geopandas as gpd
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TreeEquityScoreETL(ExtractTransformLoad):
    def __init__(self):
        self.TES_URL = "https://national-tes-data-share.s3.amazonaws.com/national_tes_share/"
        self.TES_CSV = self.TMP_PATH / "tes_2021_data.csv"
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
                f"{self.TMP_PATH}/{state}",
            )

    def transform(self) -> None:
        logger.info("Transforming Tree Equity Score Data")
        tes_state_dfs = []
        for state in self.states:
            tes_state_dfs.append(
                gpd.read_file(f"{self.TMP_PATH}/{state}/{state}.shp")
            )
        self.df = gpd.GeoDataFrame(
            pd.concat(tes_state_dfs), crs=tes_state_dfs[0].crs
        )

        # rename ID to Tract ID
        self.df.rename(
            columns={"geoid": self.GEOID_FIELD_NAME,
            ""
        },
            inplace=True,
        )

    def load(self) -> None:
        logger.info("Saving Tree Equity Score GeoJSON")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df = self.df[
            [
                self.GEOID_FIELD_NAME,
                "total_pop",
                "state",
                "county",
                "pctpov",
                "pctpoc",
                "unemplrate",
                "medhhinc",
                "dep_ratio",
                "child_perc",
                "seniorperc",
                "treecanopy",
                "area",
                "source",
                "avg_temp",
                "ua_name",
                "incorpname",
                "congressio",
                "biome",
                "bgpopdense",
                "popadjust",
                "tc_gap",
                "tc_goal",
                "phys_hlth",
                "ment_hlth",
                "asthma",
                "core_m",
                "core_w",
                "core_norm",
                "healthnorm",
                "priority",
                "tes",
                "tesctyscor",
                "geometry"
            ]
        ]
        self.df.to_csv(self.CSV_PATH / "usa.csv", index=False)
