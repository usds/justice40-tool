import pandas as pd
import geopandas as gpd

from etl.base import ExtractTransformLoad
from utils import get_module_logger
import os

logger = get_module_logger(__name__)


class TreeEquityScoreETL(ExtractTransformLoad):
    def __init__(self):
        self.TES_URL = (
            "https://national-tes-data-share.s3.amazonaws.com/national_tes_share/"
        )
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
        logger.info(f"Downloading Tree Equity Score Data")
        for state in self.states:
            super().extract(
                f"{self.TES_URL}{state}.zip.zip",
                f"{self.TMP_PATH}/{state}",
            )

    def transform(self) -> None:
        logger.info(f"Transforming Tree Equity Score Data")
        tes_state_dfs = []
        for state in self.states:
            tes_state_dfs.append(gpd.read_file(f"{self.TMP_PATH}/{state}/{state}.shp"))
        self.df = gpd.GeoDataFrame(pd.concat(tes_state_dfs), crs=tes_state_dfs[0].crs)

    def load(self) -> None:
        logger.info(f"Saving Tree Equity Score GeoJSON")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_file(self.CSV_PATH / "tes_conus.geojson", driver="GeoJSON")
