import pandas as pd
import geopandas as gpd

from etl.base import ExtractTransformLoad
from utils import get_module_logger

logger = get_module_logger(__name__)


class GeoScoreETL(ExtractTransformLoad):
    """
    A class used to generate per state and national GeoJson files with the score baked in
    """

    def __init__(self):
        self.SCORE_GEOJSON_PATH = self.DATA_PATH / "score" / "geojson"
        self.SCORE_LOW_GEOJSON = self.SCORE_GEOJSON_PATH / "usa-low.json"
        self.SCORE_HIGH_GEOJSON = self.SCORE_GEOJSON_PATH / "usa-high.json"

        self.SCORE_CSV_PATH = self.DATA_PATH / "score" / "csv"
        self.TILE_SCORE_CSV = self.SCORE_CSV_PATH / "tiles" / "usa.csv"

        self.CENSUS_USA_GEOJSON = (
            self.DATA_PATH / "census" / "geojson" / "01.json"
        )

        self.geoson_usa_df: pd.DataFrame
        self.score_usa_df: pd.DataFrame
        self.geoson_score_usa_merged: pd.DataFrame

    def extract(self) -> None:
        logger.info(f"Reading US GeoJSON")
        self.geoson_usa_df = gpd.read_file(
            self.CENSUS_USA_GEOJSON,
            dtype={"GEOID10": "string"},
            low_memory=False,
        )

        logger.info(f"Reading score CSV")
        self.score_usa_df = pd.read_csv(
            self.TILE_SCORE_CSV,
            dtype={"GEOID10": "string"},
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info(f"Pruning Census GeoJSON")
        fields = ["GEOID10", "geometry"]
        self.geoson_usa_df = self.geoson_usa_df[fields]

        logger.info(f"Merging score CSV with USA GeoJSON")
        self.geoson_score_usa_merged = self.score_usa_df.merge(
            self.geoson_usa_df, on="GEOID10", how="left"
        )

    def load(self) -> None:
        pass
