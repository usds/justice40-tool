# Note: I'm not sure why pylint is so upset with the particular dataframe `df_nri`,
# but it may be a known bug. https://github.com/PyCQA/pylint/issues/1498
# pylint: disable=unsubscriptable-object
# pylint: disable=unsupported-assignment-operation
import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class NationalRiskIndexETL(ExtractTransformLoad):
    """ETL class for the FEMA National Risk Index dataset"""

    NAME = "national_risk_index"

    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False
    LOAD_YAML_CONFIG: bool = True

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

        # fetch
        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            self.risk_index_url = (
                f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/"
                "national_risk_index/NRI_Table_CensusTracts.zip"
            )
        else:
            self.risk_index_url = (
                "https://hazards.fema.gov/nri/Content/StaticDocuments/DataDownload/"
                "NRI_Table_CensusTracts/NRI_Table_CensusTracts.zip"
            )

        # source
        self.risk_index_source = (
            self.get_sources_path() / "NRI_Table_CensusTracts.csv"
        )

        # output
        # this is the main dataframe
        self.df: pd.DataFrame
        self.df_nri: pd.DataFrame

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

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.risk_index_url, destination=self.get_sources_path()
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        # read in the unzipped csv from NRI data source then rename the
        # Census Tract column for merging
        self.df_nri = pd.read_csv(
            self.risk_index_source,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: "string"},
            na_values=["None"],
            low_memory=False,
        )

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Applies the NRI score for each Census Tract to the Census Block
          Groups inside of that Tract
        """

        self.df_nri.rename(
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
            if f"{x}_EALA" in list(self.df_nri.columns)
        ]

        population_columns = [
            f"{x}_EALP"
            for x in disaster_categories
            if f"{x}_EALP" in list(self.df_nri.columns)
        ]

        buildings_columns = [
            f"{x}_EALB"
            for x in disaster_categories
            if f"{x}_EALB" in list(self.df_nri.columns)
        ]

        disaster_population_sum_series = self.df_nri[population_columns].sum(
            axis=1
        )

        disaster_agriculture_sum_series = self.df_nri[agriculture_columns].sum(
            axis=1
        )

        disaster_buildings_sum_series = self.df_nri[buildings_columns].sum(
            axis=1
        )

        # Population EAL Rate = Eal Valp / Population
        self.df_nri[self.EXPECTED_POPULATION_LOSS_RATE_FIELD_NAME] = (
            disaster_population_sum_series
            / self.df_nri[self.POPULATION_INPUT_FIELD_NAME]
        )

        # Agriculture EAL Rate = Eal Vala / max(Agrivalue, 408000)
        ## FORMULA ADJUSTMENT 2/17
        ## Because AGRIVALUE contains a lot of 0s, we are going to consider
        ## 90th percentile only for places that have some agrivalue at all
        self.df_nri[
            self.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME
        ] = disaster_agriculture_sum_series / self.df_nri[
            self.AGRICULTURAL_VALUE_INPUT_FIELD_NAME
        ].clip(
            lower=self.AGRIVALUE_LOWER_BOUND
        )

        ## Check that this clip worked -- that the only place the value has changed is when the clip took effect
        base_expectation = (
            disaster_agriculture_sum_series
            / self.df_nri[self.AGRICULTURAL_VALUE_INPUT_FIELD_NAME]
        )
        assert (
            self.df_nri[
                self.df_nri[self.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME]
                != base_expectation
            ][self.AGRICULTURAL_VALUE_INPUT_FIELD_NAME].max()
            <= self.AGRIVALUE_LOWER_BOUND
        ), (
            "Clipping the agrivalue did not work. There are places where the value doesn't "
            + "match an unclipped ratio, even where the agrivalue is above the lower bound!"
        )

        assert (
            self.df_nri[self.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME]
            != base_expectation
        ).sum() > 0, "Clipping the agrivalue did nothing!"

        # This produces a boolean that is True in the case of non-zero agricultural value
        self.df_nri[self.CONTAINS_AGRIVALUE] = (
            self.df_nri[self.AGRICULTURAL_VALUE_INPUT_FIELD_NAME] > 0
        )

        # divide EAL_VALB (Expected Annual Loss - Building Value) by BUILDVALUE (Building Value ($)).
        self.df_nri[self.EXPECTED_BUILDING_LOSS_RATE_FIELD_NAME] = (
            disaster_buildings_sum_series
            / self.df_nri[self.BUILDING_VALUE_INPUT_FIELD_NAME]
        )

        # Round all float columns to just 10 digits.
        # Note: `round` is smart enough to only apply to float columns.
        self.df_nri = self.df_nri.round(10)

        # Assign the final df to the class' output_df for the load method
        self.output_df = self.df_nri

    def load(self) -> None:
        # Suppress scientific notation.
        super().load(float_format="%.10f")
