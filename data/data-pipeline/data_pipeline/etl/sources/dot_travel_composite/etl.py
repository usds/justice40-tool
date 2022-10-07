# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation
import geopandas as gpd
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TravelCompositeETL(ExtractTransformLoad):
    """ETL class for the DOT Travel Disadvantage Dataset"""

    NAME = "travel_composite"
    # Commenting below temporarily to get stating going. In the next PR we'll have env vars to control
    # data source endpoints to be either "source" or "aws"
    # SOURCE_URL = "https://www.transportation.gov/sites/dot.gov/files/Shapefile_and_Metadata.zip"
    SOURCE_URL = "https://justice40-data.s3.amazonaws.com/data-sources/raw-data-sources/dot_travel_composite/Shapefile_and_Metadata.zip"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False
    LOAD_YAML_CONFIG: bool = True

    # Output score variables (values set on datasets.yml) for linting purposes
    TRAVEL_BURDEN_FIELD_NAME: str

    def __init__(self):
        # define the full path for the input CSV file
        self.INPUT_SHP = (
            self.get_tmp_path() / "DOT_Disadvantage_Layer_Final_April2022.shp"
        )

        # this is the main dataframe
        self.df: pd.DataFrame

        # Start dataset-specific vars here
        ## Average of Transportation Indicator Percentiles (calculated)
        ## Calculated: Average of (EPL_TCB+EPL_NWKI+EPL_NOVEH+EPL_COMMUTE) excluding NULLS
        ## See metadata for more information
        self.INPUT_TRAVEL_DISADVANTAGE_FIELD_NAME = "Transp_TH"
        self.INPUT_GEOID_TRACT_FIELD_NAME = "FIPS"

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Converts to CSV
        """
        logger.info("Transforming DOT Travel Disadvantage Data")

        # read in the unzipped shapefile from data source
        # reformat it to be standard df, remove unassigned rows, and
        # then rename the Census Tract column for merging
        df_dot: pd.DataFrame = gpd.read_file(self.INPUT_SHP)
        df_dot = df_dot.rename(
            columns={
                self.INPUT_GEOID_TRACT_FIELD_NAME: self.GEOID_TRACT_FIELD_NAME,
                self.INPUT_TRAVEL_DISADVANTAGE_FIELD_NAME: self.TRAVEL_BURDEN_FIELD_NAME,
            }
        ).dropna(subset=[self.GEOID_TRACT_FIELD_NAME])
        # Assign the final df to the class' output_df for the load method
        self.output_df = df_dot
