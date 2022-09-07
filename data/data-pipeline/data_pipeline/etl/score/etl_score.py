import functools
from dataclasses import dataclass

import numpy as np
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.national_risk_index.etl import (
    NationalRiskIndexETL,
)
from data_pipeline.etl.sources.dot_travel_composite.etl import (
    TravelCompositeETL,
)
from data_pipeline.etl.sources.fsf_flood_risk.etl import (
    FloodRiskETL,
)
from data_pipeline.etl.sources.eamlis.etl import AbandonedMineETL
from data_pipeline.etl.sources.us_army_fuds.etl import USArmyFUDS
from data_pipeline.etl.sources.nlcd_nature_deprived.etl import NatureDeprivedETL
from data_pipeline.etl.sources.fsf_wildfire_risk.etl import WildfireRiskETL
from data_pipeline.score.score_runner import ScoreRunner
from data_pipeline.score import field_names
from data_pipeline.etl.score import constants

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreETL(ExtractTransformLoad):
    def __init__(self):
        # Define some global parameters

        # dataframes
        self.df: pd.DataFrame
        self.ejscreen_df: pd.DataFrame
        self.census_df: pd.DataFrame
        self.hud_housing_df: pd.DataFrame
        self.cdc_places_df: pd.DataFrame
        self.census_acs_median_incomes_df: pd.DataFrame
        self.cdc_life_expectancy_df: pd.DataFrame
        self.doe_energy_burden_df: pd.DataFrame
        self.national_risk_index_df: pd.DataFrame
        self.geocorr_urban_rural_df: pd.DataFrame
        self.persistent_poverty_df: pd.DataFrame
        self.census_decennial_df: pd.DataFrame
        self.census_2010_df: pd.DataFrame
        self.child_opportunity_index_df: pd.DataFrame
        self.hrs_df: pd.DataFrame
        self.dot_travel_disadvantage_df: pd.DataFrame
        self.fsf_flood_df: pd.DataFrame
        self.fsf_fire_df: pd.DataFrame
        self.nature_deprived_df: pd.DataFrame
        self.eamlis_df: pd.DataFrame
        self.fuds_df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Loading data sets from disk.")

        # EJSCreen csv Load
        ejscreen_csv = constants.DATA_PATH / "dataset" / "ejscreen" / "usa.csv"
        self.ejscreen_df = pd.read_csv(
            ejscreen_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load census data
        census_csv = (
            constants.DATA_PATH / "dataset" / "census_acs_2019" / "usa.csv"
        )
        self.census_df = pd.read_csv(
            census_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load HUD housing data
        hud_housing_csv = (
            constants.DATA_PATH / "dataset" / "hud_housing" / "usa.csv"
        )
        self.hud_housing_df = pd.read_csv(
            hud_housing_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load CDC Places data
        cdc_places_csv = (
            constants.DATA_PATH / "dataset" / "cdc_places" / "usa.csv"
        )
        self.cdc_places_df = pd.read_csv(
            cdc_places_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load census AMI data
        census_acs_median_incomes_csv = (
            constants.DATA_PATH
            / "dataset"
            / "census_acs_median_income_2019"
            / "usa.csv"
        )
        self.census_acs_median_incomes_df = pd.read_csv(
            census_acs_median_incomes_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load CDC life expectancy data
        cdc_life_expectancy_csv = (
            constants.DATA_PATH / "dataset" / "cdc_life_expectancy" / "usa.csv"
        )
        self.cdc_life_expectancy_df = pd.read_csv(
            cdc_life_expectancy_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load DOE energy burden data
        doe_energy_burden_csv = (
            constants.DATA_PATH / "dataset" / "doe_energy_burden" / "usa.csv"
        )
        self.doe_energy_burden_df = pd.read_csv(
            doe_energy_burden_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load FEMA national risk index data
        self.national_risk_index_df = NationalRiskIndexETL.get_data_frame()

        # Load DOT Travel Disadvantage
        self.dot_travel_disadvantage_df = TravelCompositeETL.get_data_frame()

        # Load fire risk data
        self.fsf_fire_df = WildfireRiskETL.get_data_frame()

        # Load flood risk data
        self.fsf_flood_df = FloodRiskETL.get_data_frame()

        # Load NLCD Nature-Deprived Communities data
        self.nature_deprived_df = NatureDeprivedETL.get_data_frame()

        # Load eAMLIS dataset
        self.eamlis_df = AbandonedMineETL.get_data_frame()

        # Load FUDS dataset
        self.fuds_df = USArmyFUDS.get_data_frame()

        # Load GeoCorr Urban Rural Map
        geocorr_urban_rural_csv = (
            constants.DATA_PATH / "dataset" / "geocorr" / "usa.csv"
        )
        self.geocorr_urban_rural_df = pd.read_csv(
            geocorr_urban_rural_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load persistent poverty
        persistent_poverty_csv = (
            constants.DATA_PATH / "dataset" / "persistent_poverty" / "usa.csv"
        )
        self.persistent_poverty_df = pd.read_csv(
            persistent_poverty_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load decennial census data
        census_decennial_csv = (
            constants.DATA_PATH
            / "dataset"
            / "census_decennial_2010"
            / "usa.csv"
        )
        self.census_decennial_df = pd.read_csv(
            census_decennial_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load 2010 ACS data from states
        census_2010_csv = (
            constants.DATA_PATH / "dataset" / "census_acs_2010" / "usa.csv"
        )
        self.census_2010_df = pd.read_csv(
            census_2010_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load COI data
        child_opportunity_index_csv = (
            constants.DATA_PATH
            / "dataset"
            / "child_opportunity_index"
            / "usa.csv"
        )
        self.child_opportunity_index_df = pd.read_csv(
            child_opportunity_index_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load HRS data
        hrs_csv = (
            constants.DATA_PATH / "dataset" / "historic_redlining" / "usa.csv"
        )

        self.hrs_df = pd.read_csv(
            hrs_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

    def _join_tract_dfs(self, census_tract_dfs: list) -> pd.DataFrame:
        logger.info("Joining Census Tract dataframes")

        def merge_function(
            left: pd.DataFrame, right: pd.DataFrame
        ) -> pd.DataFrame:
            """This is a custom function that merges two dataframes.

            It provides some logging as additional helpful context for error handling.
            """
            try:
                df = pd.merge(
                    left=left,
                    right=right,
                    on=self.GEOID_TRACT_FIELD_NAME,
                    how="outer",
                )
            except Exception as e:
                # Note: it'd be nice to log the name of the dataframe, but that's not accessible in this scope.
                logger.warning(
                    f"Exception encountered while merging dataframe `right` that has the following columns: {','.join(right.columns)}"
                )
                raise e

            return df

        # Just a note -- it would be faster (I think) to set geoid10_tract as the index and  then concat all frames 1x
        census_tract_df = functools.reduce(
            merge_function,
            census_tract_dfs,
        )

        # Sanity check the join.
        if (
            len(census_tract_df[self.GEOID_TRACT_FIELD_NAME].str.len().unique())
            != 1
        ):
            raise ValueError(
                f"One of the input CSVs uses {self.GEOID_TRACT_FIELD_NAME} with a different length."
            )
        return census_tract_df

    def _census_tract_df_sanity_check(
        self, df_to_check: pd.DataFrame, df_name: str = None
    ) -> None:
        """Check an individual data frame for census tract data quality checks."""

        # Note: it'd be nice to log the name of the dataframe directly, but that's not accessible in this scope.
        dataframe_descriptor = (
            f"dataframe `{df_name}`"
            if df_name
            else f"the dataframe that has columns { ','.join(df_to_check.columns)}"
        )

        tract_values = (
            df_to_check[self.GEOID_TRACT_FIELD_NAME].str.len().unique()
        )
        if any(tract_values != [11]):
            raise ValueError(
                f"Some of the census tract data has the wrong length: {tract_values} in {dataframe_descriptor}"
            )

        non_unique_tract_values = len(
            df_to_check[self.GEOID_TRACT_FIELD_NAME]
        ) - len(df_to_check[self.GEOID_TRACT_FIELD_NAME].unique())

        if non_unique_tract_values > 0:
            raise ValueError(
                f"There are {non_unique_tract_values} duplicate tract IDs in {dataframe_descriptor}"
            )

        if len(df_to_check) > self.EXPECTED_MAX_CENSUS_TRACTS:
            raise ValueError(
                f"Too many rows in the join: {len(df_to_check)} in {dataframe_descriptor}"
            )

    @staticmethod
    def _add_percentiles_to_df(
        df: pd.DataFrame,
        input_column_name: str,
        output_column_name_root: str,
        drop_tracts: list = None,
        ascending: bool = True,
    ) -> pd.DataFrame:
        """Creates percentiles.

        One percentile will be created and returned as
        f"{output_column_name_root}{field_names.PERCENTILE_FIELD_SUFFIX}".
        E.g., "PM2.5 exposure (percentile)".
        This will be for the entire country.

        `output_column_name_root` is different from `input_column_name` to enable the
        reverse percentile use case. In that use case, `input_column_name` may be
        something like "3rd grade reading proficiency" and `output_column_name_root`
        may be something like "Low 3rd grade reading proficiency".
        """

        # We have two potential options for assessing how to calculate percentiles.
        # For the vast majority of columns, we will simply calculate percentiles overall.
        # However, for Linguistic Isolation and Agricultural  Value Loss, there exist conditions
        # for which we drop out tracts from consideration in the percentile. More details on those
        # are below, for them, we provide a list of tracts to not include. Ditto transit barriers.
        # Because of the fancy transformations below, I have removed the urban / rural percentiles,
        # which are now deprecated.
        if not drop_tracts:
            # Create the "basic" percentile.
            ## note: I believe this is less performant than if we made a bunch of these PFS columns
            ## and then concatenated the list. For the refactor!
            df[
                f"{output_column_name_root}"
                f"{field_names.PERCENTILE_FIELD_SUFFIX}"
            ] = df[input_column_name].rank(pct=True, ascending=ascending)

        else:
            tmp_series = df[input_column_name].where(
                ~df[field_names.GEOID_TRACT_FIELD].isin(drop_tracts),
                np.nan,
            )
            logger.info(
                f"Creating special case column for percentiles from {input_column_name}"
            )
            df[
                f"{output_column_name_root}"
                f"{field_names.PERCENTILE_FIELD_SUFFIX}"
            ] = tmp_series.rank(ascending=ascending, pct=True)

            # Check that "drop tracts" were dropped (quicker than creating a fixture?)
            assert df[df[field_names.GEOID_TRACT_FIELD].isin(drop_tracts)][
                f"{output_column_name_root}"
                f"{field_names.PERCENTILE_FIELD_SUFFIX}"
            ].isna().sum() == len(drop_tracts), "Not all tracts were dropped"

        return df

    # TODO Move a lot of this to the ETL part of the pipeline
    def _prepare_initial_df(self) -> pd.DataFrame:
        logger.info("Preparing initial dataframe")

        # Join all the data sources that use census tracts
        census_tract_dfs = [
            self.census_df,
            self.hud_housing_df,
            self.cdc_places_df,
            self.cdc_life_expectancy_df,
            self.doe_energy_burden_df,
            self.ejscreen_df,
            self.geocorr_urban_rural_df,
            self.persistent_poverty_df,
            self.national_risk_index_df,
            self.census_acs_median_incomes_df,
            self.census_decennial_df,
            self.census_2010_df,
            self.child_opportunity_index_df,
            self.hrs_df,
            self.dot_travel_disadvantage_df,
            self.fsf_flood_df,
            self.fsf_fire_df,
            self.nature_deprived_df,
            self.eamlis_df,
            self.fuds_df,
        ]

        # Sanity check each data frame before merging.
        for df in census_tract_dfs:
            self._census_tract_df_sanity_check(df_to_check=df)

        census_tract_df = self._join_tract_dfs(census_tract_dfs)

        # If GEOID10s are read as numbers instead of strings, the initial 0 is dropped,
        # and then we get too many CBG rows (one for 012345 and one for 12345).

        # Now sanity-check the merged df.
        self._census_tract_df_sanity_check(
            df_to_check=census_tract_df, df_name="census_tract_df"
        )

        # Calculate median income variables.
        # First, calculate the income of the block group as a fraction of the state income.
        df = census_tract_df
        df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD] = (
            df[field_names.MEDIAN_INCOME_FIELD]
            / df[field_names.STATE_MEDIAN_INCOME_FIELD]
        )

        # Calculate the income of the block group as a fraction of the AMI (either state or metropolitan, depending on reference).
        df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] = (
            df[field_names.MEDIAN_INCOME_FIELD] / df[field_names.AMI_FIELD]
        )

        # Donut columns get added later
        numeric_columns = [
            field_names.HOUSING_BURDEN_FIELD,
            field_names.NO_KITCHEN_OR_INDOOR_PLUMBING_FIELD,
            field_names.TOTAL_POP_FIELD,
            field_names.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD,
            field_names.ASTHMA_FIELD,
            field_names.HEART_DISEASE_FIELD,
            field_names.CANCER_FIELD,
            field_names.HEALTH_INSURANCE_FIELD,
            field_names.DIABETES_FIELD,
            field_names.PHYS_HEALTH_NOT_GOOD_FIELD,
            field_names.POVERTY_LESS_THAN_100_FPL_FIELD,
            field_names.POVERTY_LESS_THAN_150_FPL_FIELD,
            field_names.POVERTY_LESS_THAN_200_FPL_FIELD,
            field_names.AMI_FIELD,
            field_names.MEDIAN_INCOME_FIELD,
            field_names.ENERGY_BURDEN_FIELD,
            field_names.FEMA_RISK_FIELD,
            field_names.URBAN_HEURISTIC_FIELD,
            field_names.AIR_TOXICS_CANCER_RISK_FIELD,
            field_names.RESPIRATORY_HAZARD_FIELD,
            field_names.DIESEL_FIELD,
            field_names.PM25_FIELD,
            field_names.OZONE_FIELD,
            field_names.TRAFFIC_FIELD,
            field_names.RMP_FIELD,
            field_names.TSDF_FIELD,
            field_names.NPL_FIELD,
            field_names.WASTEWATER_FIELD,
            field_names.LEAD_PAINT_FIELD,
            field_names.UNDER_5_FIELD,
            field_names.OVER_64_FIELD,
            field_names.LINGUISTIC_ISO_FIELD,
            field_names.HOUSEHOLDS_LINGUISTIC_ISO_FIELD,
            field_names.POVERTY_FIELD,
            field_names.HIGH_SCHOOL_ED_FIELD,
            field_names.UNEMPLOYMENT_FIELD,
            field_names.MEDIAN_HOUSE_VALUE_FIELD,
            field_names.COLLEGE_ATTENDANCE_FIELD,
            field_names.COLLEGE_NON_ATTENDANCE_FIELD,
            field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD,
            field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD,
            field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD,
            field_names.CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009,
            field_names.CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009,
            field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009,
            field_names.CENSUS_UNEMPLOYMENT_FIELD_2010,
            field_names.CENSUS_POVERTY_LESS_THAN_100_FPL_FIELD_2010,
            field_names.CENSUS_DECENNIAL_TOTAL_POPULATION_FIELD_2009,
            field_names.EXTREME_HEAT_FIELD,
            field_names.HEALTHY_FOOD_FIELD,
            field_names.IMPENETRABLE_SURFACES_FIELD,
            field_names.UST_FIELD,
            field_names.DOT_TRAVEL_BURDEN_FIELD,
            field_names.FUTURE_FLOOD_RISK_FIELD,
            field_names.FUTURE_WILDFIRE_RISK_FIELD,
            field_names.TRACT_PERCENT_NON_NATURAL_FIELD_NAME,
            field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD,
            field_names.PERCENT_BLACK_FIELD_NAME,
            field_names.PERCENT_AMERICAN_INDIAN_FIELD_NAME,
            field_names.PERCENT_ASIAN_FIELD_NAME,
            field_names.PERCENT_HAWAIIAN_FIELD_NAME,
            field_names.PERCENT_TWO_OR_MORE_RACES_FIELD_NAME,
            field_names.PERCENT_NON_HISPANIC_WHITE_FIELD_NAME,
            field_names.PERCENT_HISPANIC_FIELD_NAME,
            field_names.PERCENT_OTHER_RACE_FIELD_NAME,
            field_names.PERCENT_AGE_UNDER_10,
            field_names.PERCENT_AGE_10_TO_64,
            field_names.PERCENT_AGE_OVER_64,
        ]

        non_numeric_columns = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.PERSISTENT_POVERTY_FIELD,
            field_names.TRACT_ELIGIBLE_FOR_NONNATURAL_THRESHOLD,
            field_names.AGRICULTURAL_VALUE_BOOL_FIELD,
        ]

        boolean_columns = [
            field_names.AML_BOOLEAN,
            field_names.IMPUTED_INCOME_FLAG_FIELD_NAME,
            field_names.ELIGIBLE_FUDS_BINARY_FIELD_NAME,
            field_names.HISTORIC_REDLINING_SCORE_EXCEEDED,
        ]

        # For some columns, high values are "good", so we want to reverse the percentile
        # so that high values are "bad" and any scoring logic can still check if it's
        # >= some threshold.
        # Note that we must use dataclass here instead of namedtuples on account of pylint
        # TODO: Add more fields here.
        #  https://github.com/usds/justice40-tool/issues/970
        @dataclass
        class ReversePercentile:
            field_name: str
            low_field_name: str

        reverse_percentiles = [
            # This dictionary follows the format:
            # <field name> : <field name for low values>
            # for instance, 3rd grade reading level : Low 3rd grade reading level.
            # This low field will not exist yet, it is only calculated for the
            # percentile.
            # TODO: This will come from the YAML dataset config
            ReversePercentile(
                field_name=field_names.READING_FIELD,
                low_field_name=field_names.LOW_READING_FIELD,
            ),
            ReversePercentile(
                field_name=field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD,
                low_field_name=field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD,
            ),
            ReversePercentile(
                field_name=field_names.LIFE_EXPECTANCY_FIELD,
                low_field_name=field_names.LOW_LIFE_EXPECTANCY_FIELD,
            ),
            ReversePercentile(
                field_name=field_names.CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009,
                low_field_name=field_names.LOW_CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009,
            ),
        ]

        columns_to_keep = (
            non_numeric_columns
            + numeric_columns
            + [rp.field_name for rp in reverse_percentiles]
            + boolean_columns
        )

        df_copy = df[columns_to_keep].copy()

        assert len(numeric_columns) == len(
            set(numeric_columns)
        ), "You have a double-entered column in the numeric columns list"

        df_copy[numeric_columns] = df_copy[numeric_columns].apply(pd.to_numeric)

        # coerce all booleans to bools preserving nan character
        # since this is a boolean, need to use `None`
        for col in boolean_columns:
            tmp = df_copy[col].copy()
            df_copy[col] = np.where(tmp.notna(), tmp.astype(bool), None)
            logger.info(f"{col} contains {df_copy[col].isna().sum()} nulls.")

        # Convert all columns to numeric and do math
        # Note that we have a few special conditions here and we handle them explicitly.
        #     For *Linguistic Isolation*, we do NOT want to include Puerto Rico in the percentile
        #     calculation. This is because linguistic isolation as a category doesn't make much sense
        #     in Puerto Rico, where Spanish is a recognized language. Thus, we construct a list
        #     of tracts to drop from the percentile calculation.
        #
        #     For *Expected Agricultural Loss*, we only want to include in the percentile tracts
        #     in which there is some agricultural value. This helps us adjust the data such that we have
        #     the ability to discern which tracts truly are at the 90th percentile, since many tracts have 0 value.
        #
        #     For *Non-Natural Space*, we may only want to include tracts that have at least 35 acreas, I think. This will
        #     get rid of  tracts that we think are aberrations statistically. Right now, we have left this out
        #     pending ground-truthing.

        for numeric_column in numeric_columns:
            drop_tracts = []
            if (
                numeric_column
                == field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD
            ):
                drop_tracts = df_copy[
                    ~df_copy[field_names.AGRICULTURAL_VALUE_BOOL_FIELD]
                    .astype(bool)
                    .fillna(False)
                ][field_names.GEOID_TRACT_FIELD].to_list()
                logger.info(
                    f"Dropping {len(drop_tracts)} tracts from Agricultural Value Loss"
                )
            elif numeric_column == field_names.LINGUISTIC_ISO_FIELD:
                drop_tracts = df_copy[
                    # 72 is the FIPS code for Puerto Rico
                    df_copy[field_names.GEOID_TRACT_FIELD].str.startswith("72")
                ][field_names.GEOID_TRACT_FIELD].to_list()
                logger.info(
                    f"Dropping {len(drop_tracts)} tracts from Linguistic Isolation"
                )
            elif numeric_column == field_names.DOT_TRAVEL_BURDEN_FIELD:
                # Not having any people appears to be correlated with transit burden, but also doesn't represent
                # on the ground need. For now, we remove these tracts from the percentile calculation. (To be QAed live)
                low_population = 20
                drop_tracts = df_copy[
                    df_copy[field_names.TOTAL_POP_FIELD] <= low_population
                ][field_names.GEOID_TRACT_FIELD].to_list()
                logger.info(
                    f"Dropping {len(drop_tracts)} tracts from DOT traffic burden"
                )

            df_copy = self._add_percentiles_to_df(
                df=df_copy,
                input_column_name=numeric_column,
                # For this use case, the input name and output name root are the same.
                output_column_name_root=numeric_column,
                ascending=True,
                drop_tracts=drop_tracts,
            )

        # Create reversed percentiles for these fields
        for reverse_percentile in reverse_percentiles:
            # Calculate reverse percentiles
            # For instance, for 3rd grade reading level (score from 0-500),
            # calculate reversed percentiles and give the result the name
            # `Low 3rd grade reading level (percentile)`.
            df_copy = self._add_percentiles_to_df(
                df=df_copy,
                input_column_name=reverse_percentile.field_name,
                output_column_name_root=reverse_percentile.low_field_name,
                ascending=False,
            )

        # Special logic: create a combined population field.
        # We sometimes run analytics on "population", and this makes a single field
        # that is either the island area's population in 2009 or the state's
        # population in 2019.
        # There should only be one entry in either 2009 or 2019, not one in both.
        # But just to be safe, we take the mean and ignore null values so if there
        # *were* entries in both fields, this result would make sense.
        df_copy[field_names.COMBINED_CENSUS_TOTAL_POPULATION_2010] = df_copy[
            [
                field_names.TOTAL_POP_FIELD,
                field_names.CENSUS_DECENNIAL_TOTAL_POPULATION_FIELD_2009,
            ]
        ].mean(axis=1, skipna=True)

        return df_copy

    def transform(self) -> None:
        logger.info("Transforming Score Data")

        # prepare the df with the right CBG/tract IDs, column names/types, and percentiles
        self.df = self._prepare_initial_df()

        # calculate scores
        self.df = ScoreRunner(df=self.df).calculate_scores()

    def load(self) -> None:
        logger.info("Saving Score CSV")
        constants.DATA_SCORE_CSV_FULL_DIR.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(constants.DATA_SCORE_CSV_FULL_FILE_PATH, index=False)
