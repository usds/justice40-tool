from pathlib import Path

import geopandas as gpd
import numpy as np
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import FileDataSource
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.etl.sources.geo_utils import add_tracts_for_geometries
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class USArmyFUDS(ExtractTransformLoad):
    """The Formerly Used Defense Sites (FUDS)"""

    NAME: str = "us_army_fuds"

    ELIGIBLE_FUDS_COUNT_FIELD_NAME: str
    INELIGIBLE_FUDS_COUNT_FIELD_NAME: str
    ELIGIBLE_FUDS_BINARY_FIELD_NAME: str
    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT
    LOAD_YAML_CONFIG: bool = True

    ISLAND_AREAS_EXPECTED_IN_DATA = True

    def __init__(self):

        self.OUTPUT_PATH: Path = self.DATA_PATH / "dataset" / "us_army_fuds"

        # Constants for output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.ELIGIBLE_FUDS_COUNT_FIELD_NAME,
            self.INELIGIBLE_FUDS_COUNT_FIELD_NAME,
            self.ELIGIBLE_FUDS_BINARY_FIELD_NAME,
        ]
        self.fuds_source = self.get_sources_path() / "fuds.geojson"

        self.raw_df: gpd.GeoDataFrame
        self.output_df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:

        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            fuds_url = (
                f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/"
                "us_army_fuds/Formerly_Used_Defense_Sites_(FUDS)_"
                "all_data_reported_to_Congress_in_FY2020.geojson"
            )
        else:
            fuds_url: str = (
                "https://opendata.arcgis.com/api/v3/datasets/"
                "3f8354667d5b4b1b8ad7a6e00c3cf3b1_1/downloads/"
                "data?format=geojson&spatialRefId=4326&where=1%3D1"
            )

        return [FileDataSource(source=fuds_url, destination=self.fuds_source)]

    def transform(self) -> None:
        # before we try to do any transformation, get the tract data
        # so it's loaded and the census ETL is out of scope

        logger.debug("Loading FUDS data as GeoDataFrame for transform")
        raw_df = gpd.read_file(
            filename=self.fuds_source,
            low_memory=False,
        )

        # Note that the length of raw_df will not be exactly the same
        # because same bases lack coordinated or have coordinates in
        # Mexico or in the ocean. See the following dataframe:
        # raw_df[~raw_df.OBJECTID.isin(df_with_tracts.OBJECTID)][
        # ['OBJECTID', 'CLOSESTCITY', 'COUNTY', 'ELIGIBILITY',
        # 'STATE', 'LATITUDE', "LONGITUDE"]]
        logger.debug("Adding tracts to FUDS data")
        df_with_tracts = add_tracts_for_geometries(raw_df)
        self.output_df = pd.DataFrame()

        # this will create a boolean series which you can do actually sans np.where
        df_with_tracts["tmp_fuds"] = (
            df_with_tracts.ELIGIBILITY == "Eligible"
        ) & (df_with_tracts.HASPROJECTS == "Yes")

        self.output_df[
            self.ELIGIBLE_FUDS_COUNT_FIELD_NAME
        ] = df_with_tracts.groupby(self.GEOID_TRACT_FIELD_NAME)[
            "tmp_fuds"
        ].sum()

        self.output_df[self.INELIGIBLE_FUDS_COUNT_FIELD_NAME] = (
            df_with_tracts[~df_with_tracts.tmp_fuds]
            .groupby(self.GEOID_TRACT_FIELD_NAME)
            .size()
        )
        self.output_df = (
            self.output_df.fillna(0).astype(np.int64).sort_index().reset_index()
        )

        self.output_df[self.ELIGIBLE_FUDS_BINARY_FIELD_NAME] = np.where(
            self.output_df[self.ELIGIBLE_FUDS_COUNT_FIELD_NAME] > 0.0,
            True,
            False,
        )
