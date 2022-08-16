from pathlib import Path
import geopandas as gpd
import pandas as pd
from data_pipeline.config import settings

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.etl.sources.geo_utils import add_tracts_for_geometries
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class AbandonedMineETL(ExtractTransformLoad):
    """Data from Office Of Surface Mining Reclamation and Enforcement's
    eAMLIS. These are the locations of abandoned mines.
    """

    # Metadata for the baseclass
    NAME = "eamlis"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    AML_BOOLEAN: str

    # Define these for easy code completion
    def __init__(self):
        self.SOURCE_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/eAMLIS export of all data.tsv.zip"
        )

        self.TRACT_INPUT_COLUMN_NAME = self.INPUT_GEOID_TRACT_FIELD_NAME

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "abandoned_mine_land_inventory_system"
        )

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.AML_BOOLEAN,
        ]

        self.output_df: pd.DataFrame

    def transform(self) -> None:
        logger.info("Starting eAMLIS transforms.")
        df = pd.read_csv(
            self.get_tmp_path() / "eAMLIS export of all data.tsv",
            sep="\t",
            low_memory=False,
        )
        gdf = gpd.GeoDataFrame(
            df,
            geometry=gpd.points_from_xy(
                x=df["Longitude"],
                y=df["Latitude"],
            ),
            crs="epsg:4326",
        )
        gdf = gdf.drop_duplicates(subset=["geometry"], keep="last")
        gdf_tracts = add_tracts_for_geometries(gdf)
        gdf = gdf_tracts.drop_duplicates(self.GEOID_TRACT_FIELD_NAME)
        gdf_tracts[self.AML_BOOLEAN] = True
        self.output_df = gdf_tracts[self.COLUMNS_TO_KEEP]

