from pathlib import Path

import pandas as pd
import geopandas as gpd

from data_pipeline.config import settings
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.geo_utils import add_tracts_for_geometries

logger = get_module_logger(__name__)


class AbandonedMineETL(ExtractTransformLoad):
    """Data from Office Of Surface Mining Reclamation and Enforcement's
    eAMLIS. These are the locations of abandoned mines.
    """

    # Metadata for the baseclass
    NAME = "eamlis"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    AML_BOOLEAN: str
    LOAD_YAML_CONFIG: bool = True

    PUERTO_RICO_EXPECTED_IN_DATA = False
    EXPECTED_MISSING_STATES = [
        "10",
        "11",
        "12",
        "15",
        "23",
        "27",
        "31",
        "33",
        "34",
        "36",
        "45",
        "50",
        "55",
    ]

    def __init__(self):

        # fetch
        self.eamlis_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/eAMLIS export of all data.tsv.zip"
        )

        # input
        self.eamlis_source = (
            self.get_sources_path() / "eAMLIS export of all data.tsv"
        )

        # output
        self.TRACT_INPUT_COLUMN_NAME = self.INPUT_GEOID_TRACT_FIELD_NAME

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "abandoned_mine_land_inventory_system"
        )

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.AML_BOOLEAN,
        ]

        self.output_df: pd.DataFrame
        self.df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.eamlis_url, destination=self.get_sources_path()
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df = pd.read_csv(
            self.eamlis_source,
            sep="\t",
            low_memory=False,
        )

    def transform(self) -> None:

        gdf = gpd.GeoDataFrame(
            self.df,
            geometry=gpd.points_from_xy(
                x=self.df["Longitude"],
                y=self.df["Latitude"],
            ),
            crs="epsg:4326",
        )
        gdf = gdf.drop_duplicates(subset=["geometry"], keep="last")
        gdf_tracts = add_tracts_for_geometries(gdf)
        gdf_tracts = gdf_tracts.drop_duplicates(self.GEOID_TRACT_FIELD_NAME)
        gdf_tracts[self.AML_BOOLEAN] = True

        self.output_df = gdf_tracts[self.COLUMNS_TO_KEEP]
