# Note: I'm not sure why pylint is so upset with the particular dataframe `df_nri`,
# but it may be a known bug. https://github.com/PyCQA/pylint/issues/1498
# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation

import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class NationalRiskIndexETL(ExtractTransformLoad):
    """ETL class for the FEMA National Risk Index dataset"""

    NAME = "national_risk_index"
    SOURCE_URL = "https://hazards.fema.gov/nri/Content/StaticDocuments/DataDownload//NRI_Table_CensusTracts/NRI_Table_CensusTracts.zip"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    # Output score variables (values set on datasets.yml) for linting purposes
    RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_FIELD_NAME: str
    EXPECTED_BUILDING_LOSS_RATE_FIELD_NAME: str
    EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME: str
    EXPECTED_POPULATION_LOSS_RATE_FIELD_NAME: str
    CONTAINS_AGRIVALUE: str

    ## TEMPORARILY HERE
    ## To get this value up in time for launch, we've hard coded it. We would like
    ## to, in the future, have this pull the 10th percentile (or nth percentile)
    ## from the agrivalue data for rural tracts.
    # This is defined as roughly the 10th percentile for "rural tracts"
    AGRIVALUE_LOWER_BOUND = 408000

    def __init__(self):
        # define the full path for the input CSV file
        self.INPUT_CSV = self.get_tmp_path() / "NRI_Table_CensusTracts.csv"

        # this is the main dataframe
        self.df: pd.DataFrame

        # Start dataset-specific vars here
        self.RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_INPUT_FIELD_NAME = (
            "EAL_SCORE"
        )
        self.EXPECTED_ANNUAL_LOSS_BUILDING_VALUE_INPUT_FIELD_NAME = "EAL_VALB"
        self.EXPECTED_ANNUAL_LOSS_AGRICULTURAL_VALUE_INPUT_FIELD_NAME = (
            "EAL_VALA"
        )
        self.EXPECTED_ANNUAL_LOSS_POPULATION_VALUE_INPUT_FIELD_NAME = "EAL_VALP"
        self.AGRICULTURAL_VALUE_INPUT_FIELD_NAME = "AGRIVALUE"
        self.POPULATION_INPUT_FIELD_NAME = "POPULATION"
        self.BUILDING_VALUE_INPUT_FIELD_NAME = "BUILDVALUE"

    def extract(self) -> None:
        """Unzips NRI dataset from the FEMA data source and writes the files
        to the temporary data folder for use in the transform() method
        """
        logger.info("Downloading 405MB National Risk Index Data")

        super().extract(
            source_url=self.SOURCE_URL,
            extract_path=self.get_tmp_path(),
        )

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Applies the NRI score for each Census Tract to the Census Block
          Groups inside of that Tract
        """
        logger.info("Transforming National Risk Index Data")

        # read in the unzipped csv from NRI data source then rename the
        # Census Tract column for merging
        df_nri: pd.DataFrame = pd.read_csv(
            self.INPUT_CSV,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: "string"},
            na_values=["None"],
            low_memory=False,
        )

        df_nri.rename(
            columns={
                self.INPUT_GEOID_TRACT_FIELD_NAME: self.GEOID_TRACT_FIELD_NAME,
                self.RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_INPUT_FIELD_NAME: self.RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_FIELD_NAME,
            },
            inplace=True,
        )

        # Only use disasters linked to climate change
        disaster_categories = [
            "AVLN",  # Avalanche
            "CFLD",  # Coastal Flooding
            "CWAV",  # Cold Wave
            "DRGT",  # Drought
            "HAIL",  # Hail
            "HWAV",  # Heat Wave
            "HRCN",  # Hurricane
            "ISTM",  # Ice Storm
            "LNDS",  # Landslide
            "RFLD",  # Riverine Flooding
            "SWND",  # Strong Wind
            "TRND",  # Tornado
            "WFIR",  # Wildfire
            "WNTW",  # Winter Weather
        ]

        # Some disaster categories do not have agriculture value column
        agriculture_columns = [
            f"{x}_EALA"
            for x in disaster_categories
            if f"{x}_EALA" in list(df_nri.columns)
        ]

        population_columns = [
            f"{x}_EALP"
            for x in disaster_categories
            if f"{x}_EALP" in list(df_nri.columns)
        ]

        buildings_columns = [
            f"{x}_EALB"
            for x in disaster_categories
            if f"{x}_EALB" in list(df_nri.columns)
        ]

        disaster_population_sum_series = df_nri[population_columns].sum(axis=1)

        disaster_agriculture_sum_series = df_nri[agriculture_columns].sum(
            axis=1
        )

        disaster_buildings_sum_series = df_nri[buildings_columns].sum(axis=1)

        # Population EAL Rate = Eal Valp / Population
        df_nri[self.EXPECTED_POPULATION_LOSS_RATE_FIELD_NAME] = (
            disaster_population_sum_series
            / df_nri[self.POPULATION_INPUT_FIELD_NAME]
        )

        # Agriculture EAL Rate = Eal Vala / max(Agrivalue, 408000)
        ## FORMULA ADJUSTMENT 2/17
        ## Because AGRIVALUE contains a lot of 0s, we are going to consider
        ## 90th percentile only for places that have some agrivalue at all
        df_nri[
            self.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME
        ] = disaster_agriculture_sum_series / df_nri[
            self.AGRICULTURAL_VALUE_INPUT_FIELD_NAME
        ].clip(
            lower=self.AGRIVALUE_LOWER_BOUND
        )

        # This produces a boolean that is True in the case of non-zero agricultural value
        df_nri[self.CONTAINS_AGRIVALUE] = (
            df_nri[self.AGRICULTURAL_VALUE_INPUT_FIELD_NAME] > 0
        )

        # divide EAL_VALB (Expected Annual Loss - Building Value) by BUILDVALUE (Building Value ($)).
        df_nri[self.EXPECTED_BUILDING_LOSS_RATE_FIELD_NAME] = (
            disaster_buildings_sum_series
            / df_nri[self.BUILDING_VALUE_INPUT_FIELD_NAME]
        )

        # Round all float columns to just 10 digits.
        # Note: `round` is smart enough to only apply to float columns.
        df_nri = df_nri.round(10)

        # Assign the final df to the class' output_df for the load method
        self.output_df = df_nri

    def load(self) -> None:
        # Suppress scientific notation.
        super().load(float_format="%.10f")
