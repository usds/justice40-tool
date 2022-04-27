import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.utils import download_file_from_url

logger = get_module_logger(__name__)


class TribalBoundariesETL(ExtractTransformLoad):
    """ETL class for the 2010 Tribal Boundaries Relationship File"""

    NAME = "tribal_boundaries"
    LAST_UPDATED_YEAR = 2010
    SOURCE_URL = (
        "https://www2.census.gov/geo/docs/maps-data/data/rel/centract_aia.txt"
    )
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    def __init__(self):
        self.INPUT_CSV = self.get_tmp_path() / "centract_aia.txt"
        self.GEOID_TRACT_FIELD_NAME = "GEOID10_TRACT"
        self.PERCENT_AREA_FIELD_NAME = (
            "Percent of land in tract that is also an AIA territory (2010)"
        )
        self.PERCENT_POPULATION_FIELD_NAME = "Percent of population in tract that is also an AIA territory (2010)"
        self.POPULATION_IN_AIA_AREA = (
            "Tract includes population in AIA area (2010)"
        )
        self.LAND_IN_AIA_AREA = "Tract includes land in AIA area (2010)"
        self.CONTAINS_AIA = (
            "Tract contains population or land in AIA area (2010)"
        )

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.PERCENT_AREA_FIELD_NAME,
            self.PERCENT_POPULATION_FIELD_NAME,
            self.POPULATION_IN_AIA_AREA,
            self.LAND_IN_AIA_AREA,
            self.CONTAINS_AIA,
        ]

        self.df: pd.DataFrame

    def extract(self) -> None:
        """Downloads tract relationship file"""
        logger.info("Downloading Census Tract Relationship file")
        download_file_from_url(
            file_url=self.SOURCE_URL,
            download_file_name=self.INPUT_CSV,
        )

    def _update_geoid(self, tribal_area_df: pd.DataFrame):
        """Modify in place to add geoid"""
        logger.info("Updating geoid")
        tribal_area_df[self.GEOID_TRACT_FIELD_NAME] = tribal_area_df[
            ["STATEFP", "COUNTYFP", "TRACTCE"]
        ].apply(lambda x: "".join(x), axis=1)

    def _produce_tract_level_df(
        self, tribal_area_df: pd.DataFrame
    ) -> pd.DataFrame:
        """Rename columns and sum percents to create tract-level data"""
        # First, rename columns
        tribal_area_df = tribal_area_df.rename(
            columns={
                "PERCENT_AREA": self.PERCENT_AREA_FIELD_NAME,
                "PERCENT_POP": self.PERCENT_POPULATION_FIELD_NAME,
            },
            inplace=False,
        )

        # Next, group by tract so each row is a single tract
        tribal_area_tract_level_df = (
            tribal_area_df.groupby(self.GEOID_TRACT_FIELD_NAME)[
                [
                    self.PERCENT_AREA_FIELD_NAME,
                    self.PERCENT_POPULATION_FIELD_NAME,
                ]
            ]
            .sum()
            .reset_index()
        )

        return tribal_area_tract_level_df

    def transform(self) -> None:
        """Reads the data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Produces the tract column and names it to match all datasets
        - Constructs indicator for whether or not there's population in tribal area (2010)
        - Constructs indicator for whether or not there's land in tribal area (2010)
        - Retains native values for percent area or percent population
        - Constructs indicator for either population or land

        The columns we need to know are:
        - Percentage of Total Area of the Census Tract Covered by the American Indian Area: PERCENT_AREA
        - Percentage of the 2010 Population Count of the Census Tract Covered by the American Indian Area: PERCENT_POP

        There's also a field for share of housing units (PERCENT_HU) that we do not use.

        For more information, see:
            https://www.census.gov/programs-surveys/geography/technical-documentation/records-layout/2000-tract-to-aia-record-layout.html
        """
        logger.info("Transforming National Risk Index Data")
        tribal_area_df = pd.read_csv(
            self.INPUT_CSV,
            dtype={"STATEFP": str, "COUNTYFP": str, "TRACTCE": str},
            low_memory=False,
        )
        self._update_geoid(tribal_area_df)

        tribal_area_tract_level_df = self._produce_tract_level_df(
            tribal_area_df
        )

        # Calculate unique indicators
        tribal_area_tract_level_df[self.POPULATION_IN_AIA_AREA] = (
            tribal_area_tract_level_df[self.PERCENT_POPULATION_FIELD_NAME] > 0
        )
        tribal_area_tract_level_df[self.LAND_IN_AIA_AREA] = (
            tribal_area_tract_level_df[self.PERCENT_AREA_FIELD_NAME] > 0
        )

        tribal_area_tract_level_df[
            self.CONTAINS_AIA
        ] = tribal_area_tract_level_df[
            [self.POPULATION_IN_AIA_AREA, self.LAND_IN_AIA_AREA]
        ].max(
            axis=1
        )

        self.output_df = tribal_area_tract_level_df

    def load(self) -> None:
        # Suppress scientific notation.
        super().load(float_format="%.5f")
