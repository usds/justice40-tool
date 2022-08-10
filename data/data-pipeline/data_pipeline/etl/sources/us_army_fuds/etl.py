from pathlib import Path
import geopandas as gpd
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger, download_file_from_url
from data_pipeline.etl.sources.geo_utils import add_tracts_for_geometries

logger = get_module_logger(__name__)


class USArmyFUDS(ExtractTransformLoad):
    """The Formerly Used Defense Sites (FUDS)"""

    NAME: str = "us_army_fuds"

    ELIGIBLE_FUDS_COUNT_FIELD_NAME: str
    INELIGIBLE_FUDS_COUNT_FIELD_NAME: str
    ELIGIBLE_FUDS_BINARY_FIELD_NAME: str
    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT

    def __init__(self):
        self.FILE_URL: str = (
            "https://opendata.arcgis.com/api/v3/datasets/"
            "3f8354667d5b4b1b8ad7a6e00c3cf3b1_1/downloads/"
            "data?format=geojson&spatialRefId=4326&where=1%3D1"
        )

        self.OUTPUT_PATH: Path = self.DATA_PATH / "dataset" / "us_army_fuds"

        # Constants for output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.ELIGIBLE_FUDS_COUNT_FIELD_NAME,
            self.INELIGIBLE_FUDS_COUNT_FIELD_NAME,
            self.ELIGIBLE_FUDS_BINARY_FIELD_NAME,
        ]
        self.DOWNLOAD_FILE_NAME = self.get_tmp_path() / "fuds.geojson"

        self.raw_df: gpd.GeoDataFrame
        self.output_df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting data download.")

        download_file_from_url(
            file_url=self.FILE_URL,
            download_file_name=self.DOWNLOAD_FILE_NAME,
            verify=True,
        )

    def transform(self) -> None:
        logger.info("Starting FUDS transform.")

        raw_df = gpd.read_file(
            filename=self.DOWNLOAD_FILE_NAME,
            low_memory=False,
        )

        # Note that the length of raw_df will not be exactly the same
        # because same bases lack coordinated or have coordinates in
        # Mexico or in the ocean. See the following dataframe:
        # raw_df[~raw_df.OBJECTID.isin(df_with_tracts.OBJECTID)][
        # ['OBJECTID', 'CLOSESTCITY', 'COUNTY', 'ELIGIBILITY',
        # 'STATE', 'LATITUDE', "LONGITUDE"]]
        df_with_tracts = add_tracts_for_geometries(raw_df)

        # Now, do some counting
        # XXX: @emma-nechamkin do the conditions for has_eligible_projects and
        # has_ineligble_projects look like what you were thinking?
        df_with_tracts.loc[
            (
                (df_with_tracts.ELIGIBILITY == "Eligible")
                & (df_with_tracts.HASPROJECTS == "Yes")
            ),
            "has_eligible_projects",
        ] = 1
        df_with_tracts.has_eligible_projects.fillna(0, inplace=True)
        df_with_tracts.loc[
            (
                (df_with_tracts.ELIGIBILITY == "Inligible")
                | (df_with_tracts.HASPROJECTS == "No")
                | (df_with_tracts.ELIGIBILITY.isna())
                | (df_with_tracts.HASPROJECTS.isna())
            ),
            "has_ineligible_projects",
        ] = 1
        df_with_tracts.has_ineligible_projects.fillna(0, inplace=True)
        self.output_df = (
            df_with_tracts.groupby("GEOID10_TRACT")[
                ["has_eligible_projects", "has_ineligible_projects"]
            ]
            .sum()
            .rename(
                columns={
                    "has_eligible_projects": self.ELIGIBLE_FUDS_COUNT_FIELD_NAME,
                    "has_ineligible_projects": self.INELIGIBLE_FUDS_COUNT_FIELD_NAME,
                }
            )
        ).reset_index()
        for col in [self.ELIGIBLE_FUDS_COUNT_FIELD_NAME, self.INELIGIBLE_FUDS_COUNT_FIELD_NAME]:
            self.output_df[col] = self.output_df[col].astype('int64')

        self.output_df[self.ELIGIBLE_FUDS_BINARY_FIELD_NAME] = (
            self.output_df[self.ELIGIBLE_FUDS_COUNT_FIELD_NAME] > 0.0
        )
