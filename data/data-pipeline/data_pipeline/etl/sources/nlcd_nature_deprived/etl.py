# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation
import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class NatureDeprivedETL(ExtractTransformLoad):
    """ETL class for the Nature Deprived Communities dataset"""

    NAME = "nlcd_nature_deprived"

    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False
    LOAD_YAML_CONFIG: bool = True
    ALASKA_AND_HAWAII_EXPECTED_IN_DATA = False

    # Output score variables (values set on datasets.yml) for linting purposes
    ELIGIBLE_FOR_NATURE_DEPRIVED_FIELD_NAME: str
    TRACT_PERCENT_IMPERVIOUS_FIELD_NAME: str
    TRACT_PERCENT_NON_NATURAL_FIELD_NAME: str
    TRACT_PERCENT_CROPLAND_FIELD_NAME: str

    def __init__(self):

        # fetch
        self.nature_deprived_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/usa_conus_nat_dep__compiled_by_TPL.csv.zip"
        )

        # source
        # define the full path for the input CSV file
        self.nature_deprived_source = (
            self.get_sources_path() / "usa_conus_nat_dep__compiled_by_TPL.csv"
        )

        # output
        # this is the main dataframe
        self.df: pd.DataFrame

        self.df_ncld: pd.DataFrame

        # Start dataset-specific vars here
        self.PERCENT_NATURAL_FIELD_NAME = "PctNatural"
        self.PERCENT_IMPERVIOUS_FIELD_NAME = "PctImperv"
        self.PERCENT_CROPLAND_FIELD_NAME = "PctCrops"
        self.TRACT_ACRES_FIELD_NAME = "TractAcres"
        # In order to ensure that tracts with very small Acreage, we want to create an eligibility criterion
        # similar to agrivalue. Here, we are ensuring that a tract has at least 35 acres, or is above the 1st percentile
        # for area. This does indeed remove tracts from the 90th+ percentile later on
        self.TRACT_ACRES_LOWER_BOUND = 35

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.nature_deprived_url,
                destination=self.get_sources_path(),
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames columns as needed
        """

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df_ncld = pd.read_csv(
            self.nature_deprived_source,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: str},
            low_memory=False,
        )

    def transform(self) -> None:

        self.df_ncld[self.ELIGIBLE_FOR_NATURE_DEPRIVED_FIELD_NAME] = (
            self.df_ncld[self.TRACT_ACRES_FIELD_NAME]
            >= self.TRACT_ACRES_LOWER_BOUND
        )
        self.df_ncld[self.TRACT_PERCENT_NON_NATURAL_FIELD_NAME] = (
            100 - self.df_ncld[self.PERCENT_NATURAL_FIELD_NAME]
        )

        # Assign the final df to the class' output_df for the load method with rename
        self.output_df = self.df_ncld.rename(
            columns={
                self.PERCENT_IMPERVIOUS_FIELD_NAME: self.TRACT_PERCENT_IMPERVIOUS_FIELD_NAME,
                self.PERCENT_CROPLAND_FIELD_NAME: self.TRACT_PERCENT_CROPLAND_FIELD_NAME,
            }
        )
