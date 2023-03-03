# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation
import geopandas as gpd
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class TravelCompositeETL(ExtractTransformLoad):
    """ETL class for the DOT Travel Disadvantage Dataset"""

    NAME = "travel_composite"

    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False
    LOAD_YAML_CONFIG: bool = True

    # Output score variables (values set on datasets.yml) for linting purposes
    TRAVEL_BURDEN_FIELD_NAME: str

    def __init__(self):

        # fetch
        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            self.travel_composite_url = (
                f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/"
                "dot_travel_composite/Shapefile_and_Metadata.zip"
            )
        else:
            self.travel_composite_url = "https://www.transportation.gov/sites/dot.gov/files/Shapefile_and_Metadata.zip"

        # input
        # define the full path for the input CSV file
        self.disadvantage_layer_shape_source = (
            self.get_sources_path()
            / "DOT_Disadvantage_Layer_Final_April2022.shp"
        )

        # output
        # this is the main dataframe
        self.df: pd.DataFrame

        self.df_dot: pd.DataFrame

        # Start dataset-specific vars here
        ## Average of Transportation Indicator Percentiles (calculated)
        ## Calculated: Average of (EPL_TCB+EPL_NWKI+EPL_NOVEH+EPL_COMMUTE) excluding NULLS
        ## See metadata for more information
        self.INPUT_TRAVEL_DISADVANTAGE_FIELD_NAME = "Transp_TH"
        self.INPUT_GEOID_TRACT_FIELD_NAME = "FIPS"

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.travel_composite_url,
                destination=self.get_sources_path(),
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df_dot = gpd.read_file(self.disadvantage_layer_shape_source)

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Converts to CSV
        """

        # reformat it to be standard df, remove unassigned rows, and
        # then rename the Census Tract column for merging

        self.df_dot = self.df_dot.rename(
            columns={
                self.INPUT_GEOID_TRACT_FIELD_NAME: self.GEOID_TRACT_FIELD_NAME,
                self.INPUT_TRAVEL_DISADVANTAGE_FIELD_NAME: self.TRAVEL_BURDEN_FIELD_NAME,
            }
        ).dropna(subset=[self.GEOID_TRACT_FIELD_NAME])

        # Assign the final df to the class' output_df for the load method
        self.output_df = self.df_dot
