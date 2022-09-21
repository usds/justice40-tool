import geopandas as gpd
import numpy as np
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.etl.sources.geo_utils import (
    add_tracts_for_geometries,
    get_tribal_geojson,
    get_tract_geojson,
)
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class GeoCorrAlternativesETL(ExtractTransformLoad):
    """Calculates overlap between Census tracts & various alternative geographies."""

    # Metadata for the baseclass
    NAME = "geocorr_alternatives"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    # Define these for easy code completion
    def __init__(self):
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
        ]

        self.output_df: pd.DataFrame

    def extract(self) -> None:
        pass

    def transform(self) -> None:
        logger.info("Starting GeoCorr alternatives transforms.")

        # self.output_df =
        
