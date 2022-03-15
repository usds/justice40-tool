import functools
from collections import namedtuple

import numpy as np
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.national_risk_index.etl import (
    NationalRiskIndexETL,
)
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

    def extract(self) -> None:
        logger.info("Loading data sets from disk.")

        # EJSCreen csv Load
        ejscreen_csv = (
            constants.DATA_PATH / "dataset" / "ejscreen_2019" / "usa.csv"
        )
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
        ascending: bool = True,
    ) -> pd.DataFrame:
        """Creates percentiles.

        One percentile will be created and returned as
        f"{output_column_name_root}{field_names.PERCENTILE_FIELD_SUFFIX}".
        E.g., "PM2.5 exposure (percentile)".
        This will be for the entire country.

        For an "apples-to-apples" comparison of urban tracts to other urban tracts,
        and compare rural tracts to other rural tracts.

        This percentile will be created and returned as
        f"{output_column_name_root}{field_names.PERCENTILE_URBAN_RURAL_FIELD_SUFFIX}".
        E.g., "PM2.5 exposure (percentile urban/rural)".
        This field exists for every tract, but for urban tracts this value will be the
        percentile compared to other urban tracts, and for rural tracts this value
        will be the percentile compared to other rural tracts.

        Specific methdology:
            1. Decide a methodology for confirming whether a tract counts as urban or
            rural. Currently in the codebase, we use Geocorr to identify the % rural of
            a tract, and mark the tract as rural if the percentage is >50% and urban
            otherwise. This may or may not be the right methodology.
            2. Once tracts are marked as urban or rural, create one percentile rank
            that only ranks urban tracts, and one percentile rank that only ranks rural
            tracts.
            3. Combine into a single field.

        `output_column_name_root` is different from `input_column_name` to enable the
        reverse percentile use case. In that use case, `input_column_name` may be
        something like "3rd grade reading proficiency" and `output_column_name_root`
        may be something like "Low 3rd grade reading proficiency".
        """
        if (
            output_column_name_root
            != field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD
        ):
            # Create the "basic" percentile.
            df[
                f"{output_column_name_root}"
                f"{field_names.PERCENTILE_FIELD_SUFFIX}"
            ] = df[input_column_name].rank(pct=True, ascending=ascending)

        else:
            # For agricultural loss, we are using whether there is value at all to determine percentile and then
            # filling places where the value is False with 0
            df[
                f"{output_column_name_root}"
                f"{field_names.PERCENTILE_FIELD_SUFFIX}"
            ] = (
                df.where(
                    df[field_names.AGRICULTURAL_VALUE_BOOL_FIELD].astype(float)
                    == 1.0
                )[input_column_name]
                .rank(ascending=ascending, pct=True)
                .fillna(
                    df[field_names.AGRICULTURAL_VALUE_BOOL_FIELD].astype(float)
                )
            )

        # Create the urban/rural percentiles.
        urban_rural_percentile_fields_to_combine = []
        for (urban_or_rural_string, urban_heuristic_bool) in [
            ("urban", True),
            ("rural", False),
        ]:
            # Create a field with only those values
            this_category_only_value_field = (
                f"{input_column_name} (value {urban_or_rural_string} only)"
            )
            df[this_category_only_value_field] = np.where(
                df[field_names.URBAN_HEURISTIC_FIELD] == urban_heuristic_bool,
                df[input_column_name],
                None,
            )

            # Calculate the percentile for only this category
            this_category_only_percentile_field = (
                f"{output_column_name_root} "
                f"(percentile {urban_or_rural_string} only)"
            )
            df[this_category_only_percentile_field] = df[
                this_category_only_value_field
            ].rank(
                pct=True,
                # Set ascending to the parameter value.
                ascending=ascending,
            )

            # Add the field name to this list. Later, we'll combine this list.
            urban_rural_percentile_fields_to_combine.append(
                this_category_only_percentile_field
            )

        # Combine both urban and rural into one field:
        df[
            f"{output_column_name_root}{field_names.PERCENTILE_URBAN_RURAL_FIELD_SUFFIX}"
        ] = df[urban_rural_percentile_fields_to_combine].mean(
            axis=1, skipna=True
        )

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

        numeric_columns = [
            field_names.HOUSING_BURDEN_FIELD,
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
            # We have to pass this boolean here in order to include it in ag value loss percentiles.
            field_names.AGRICULTURAL_VALUE_BOOL_FIELD,
        ]

        non_numeric_columns = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.PERSISTENT_POVERTY_FIELD,
        ]

        # For some columns, high values are "good", so we want to reverse the percentile
        # so that high values are "bad" and any scoring logic can still check if it's
        # >= some threshold.
        # TODO: Add more fields here.
        #  https://github.com/usds/justice40-tool/issues/970
        ReversePercentile = namedtuple(
            typename="ReversePercentile",
            field_names=["field_name", "low_field_name"],
        )
        reverse_percentiles = [
            # This dictionary follows the format:
            # <field name> : <field name for low values>
            # for instance, 3rd grade reading level : Low 3rd grade reading level.
            # This low field will not exist yet, it is only calculated for the
            # percentile.
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
        )

        df_copy = df[columns_to_keep].copy()

        df_copy[numeric_columns] = df_copy[numeric_columns].apply(pd.to_numeric)

        # Convert all columns to numeric and do math
        for numeric_column in numeric_columns:
            df_copy = self._add_percentiles_to_df(
                df=df_copy,
                input_column_name=numeric_column,
                # For this use case, the input name and output name root are the same.
                output_column_name_root=numeric_column,
                ascending=True,
            )

            # Min-max normalization:
            # (
            #     Observed value
            #     - minimum of all values
            # )
            # divided by
            # (
            #    Maximum of all values
            #     - minimum of all values
            # )
            min_value = df_copy[numeric_column].min(skipna=True)

            max_value = df_copy[numeric_column].max(skipna=True)

            df_copy[f"{numeric_column}{field_names.MIN_MAX_FIELD_SUFFIX}"] = (
                df_copy[numeric_column] - min_value
            ) / (max_value - min_value)

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
