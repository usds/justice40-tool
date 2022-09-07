# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation

import pandas as pd
from data_pipeline.config import settings

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class NatureDeprivedETL(ExtractTransformLoad):
    """ETL class for the Nature Deprived Communities dataset"""

    NAME = "nlcd_nature_deprived"
    SOURCE_URL = (
        settings.AWS_JUSTICE40_DATASOURCES_URL
        + "/usa_conus_nat_dep__compiled_by_TPL.csv.zip"
    )
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False
    LOAD_YAML_CONFIG: bool = True
    ALASKA_AND_HAWAII_EXPECTED_IN_DATA = False

    # Alaska and Hawaii are missing
    EXPECTED_MISSING_STATES = ["02", "15"]

    # Output score variables (values set on datasets.yml) for linting purposes
    ELIGIBLE_FOR_NATURE_DEPRIVED_FIELD_NAME: str
    TRACT_PERCENT_IMPERVIOUS_FIELD_NAME: str
    TRACT_PERCENT_NON_NATURAL_FIELD_NAME: str
    TRACT_PERCENT_CROPLAND_FIELD_NAME: str

    def __init__(self):
        # define the full path for the input CSV file
        self.INPUT_CSV = (
            self.get_tmp_path() / "usa_conus_nat_dep__compiled_by_TPL.csv"
        )

        # this is the main dataframe
        self.df: pd.DataFrame

        # Start dataset-specific vars here
        self.PERCENT_NATURAL_FIELD_NAME = "PctNatural"
        self.PERCENT_IMPERVIOUS_FIELD_NAME = "PctImperv"
        self.PERCENT_CROPLAND_FIELD_NAME = "PctCrops"
        self.TRACT_ACRES_FIELD_NAME = "TractAcres"
        # In order to ensure that tracts with very small Acreage, we want to create an eligibility criterion
        # similar to agrivalue. Here, we are ensuring that a tract has at least 35 acres, or is above the 1st percentile
        # for area. This does indeed remove tracts from the 90th+ percentile later on
        self.TRACT_ACRES_LOWER_BOUND = 35

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames columns as needed
        """
        logger.info("Transforming NLCD Data")

        df_ncld: pd.DataFrame = pd.read_csv(
            self.INPUT_CSV,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: str},
            low_memory=False,
        )

        df_ncld[self.ELIGIBLE_FOR_NATURE_DEPRIVED_FIELD_NAME] = (
            df_ncld[self.TRACT_ACRES_FIELD_NAME] >= self.TRACT_ACRES_LOWER_BOUND
        )
        df_ncld[self.TRACT_PERCENT_NON_NATURAL_FIELD_NAME] = (
            1 - df_ncld[self.PERCENT_NATURAL_FIELD_NAME]
        )

        # Assign the final df to the class' output_df for the load method with rename
        self.output_df = df_ncld.rename(
            columns={
                self.PERCENT_IMPERVIOUS_FIELD_NAME: self.TRACT_PERCENT_IMPERVIOUS_FIELD_NAME,
                self.PERCENT_CROPLAND_FIELD_NAME: self.TRACT_PERCENT_CROPLAND_FIELD_NAME,
            }
        )
