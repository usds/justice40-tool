import numpy as np
import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreL(Score):
    def __init__(self, df: pd.DataFrame) -> None:
        self.LOW_INCOME_THRESHOLD: float = 0.65
        self.ENVIRONMENTAL_BURDEN_THRESHOLD: float = 0.90
        self.MEDIAN_HOUSE_VALUE_THRESHOLD: float = 0.90
        self.LACK_OF_HIGH_SCHOOL_MINIMUM_THRESHOLD: float = 0.10

        super().__init__(df)

    def _combine_island_areas_with_states_and_set_thresholds(
        self,
        df: pd.DataFrame,
        column_from_island_areas: str,
        column_from_decennial_census: str,
        combined_column_name: str,
        threshold_cutoff_for_island_areas: float,
    ) -> (pd.DataFrame, str):
        """Steps to set thresholds for island areas.

        This function is fairly logically complicated. It takes the following steps:

            1. Combine the two different fields into a single field.
            2. Calculate the 90th percentile cutoff raw value for the combined field.
            3. Create a boolean series that is true for any census tract in the island
                areas (and only the island areas) that exceeds this cutoff.

        For step one, it combines data that is either the island area's Decennial Census
        value in 2009 or the state's value in 5-year ACS ending in 2010.

        This will be used to generate the percentile cutoff for the 90th percentile.

        The stateside decennial census stopped asking economic comparisons,
        so this is as close to apples-to-apples as we get. We use 5-year ACS for data
        robustness over 1-year ACS.
        """
        # Create the combined field.
        # There should only be one entry in either 2009 or 2019 fields, not one in both.
        # But just to be safe, we take the mean and ignore null values so if there
        # *were* entries in both, this result would make sense.
        df[combined_column_name] = df[
            [column_from_island_areas, column_from_decennial_census]
        ].mean(axis=1, skipna=True)

        logger.info(
            f"Combined field `{combined_column_name}` has "
            f"{df[combined_column_name].isnull().sum()} "
            f"({df[combined_column_name].isnull().sum() * 100 / len(df):.2f}%) "
            f"missing values for census tracts. "
        )

        # Calculate the percentile threshold raw value.
        raw_threshold = np.nanquantile(
            a=df[combined_column_name], q=threshold_cutoff_for_island_areas
        )

        logger.info(
            f"For combined field `{combined_column_name}`, "
            f"the {threshold_cutoff_for_island_areas*100:.0f} percentile cutoff is a "
            f"raw value of {raw_threshold:.3f}."
        )

        threshold_column_name = (
            f"{column_from_island_areas} exceeds "
            f"{threshold_cutoff_for_island_areas*100:.0f}th percentile"
        )

        df[threshold_column_name] = (
            df[column_from_island_areas] >= raw_threshold
        )

        percent_of_tracts_highlighted = (
            100
            * df[threshold_column_name].sum()
            / df[column_from_island_areas].notnull().sum()
        )

        logger.info(
            f"For `{threshold_column_name}`, "
            f"{df[threshold_column_name].sum()} ("
            f"{percent_of_tracts_highlighted:.2f}% of tracts that have non-null data "
            f"in the column) have a value of TRUE."
        )

        return df, threshold_column_name

    def _create_low_income_threshold(self, df: pd.DataFrame) -> pd.Series:
        """
        Returns a pandas series (really a numpy array)
        of booleans based on the condition of the FPL at 200%
        is at or more than some established threshold
        """
        return (
            df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.LOW_INCOME_THRESHOLD
        )

    def _increment_total_eligibility_exceeded(
        self, columns_for_subset: list
    ) -> None:
        """
        Increments the total eligible factors for a given tract
        """

        self.df[field_names.THRESHOLD_COUNT] += self.df[columns_for_subset].sum(
            axis=1
        )

    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score L")

        self.df[field_names.L_CLIMATE] = self._climate_factor()
        self.df[field_names.L_ENERGY] = self._energy_factor()
        self.df[field_names.L_TRANSPORTATION] = self._transportation_factor()
        self.df[field_names.L_HOUSING] = self._housing_factor()
        self.df[field_names.L_POLLUTION] = self._pollution_factor()
        self.df[field_names.L_WATER] = self._water_factor()
        self.df[field_names.L_HEALTH] = self._health_factor()
        self.df[field_names.L_WORKFORCE] = self._workforce_factor()
        self.df[field_names.FPL_200_SERIES] = self._create_low_income_threshold(
            self.df
        )

        factors = [
            field_names.L_CLIMATE,
            field_names.L_ENERGY,
            field_names.L_TRANSPORTATION,
            field_names.L_HOUSING,
            field_names.L_POLLUTION,
            field_names.L_WATER,
            field_names.L_HEALTH,
            field_names.L_WORKFORCE,
        ]
        self.df[field_names.SCORE_L_COMMUNITIES] = self.df[factors].any(axis=1)

        # Note: this is purely used for comparison tool analysis, and can be removed at a later date. - LMB.
        non_workforce_factors = [
            field_names.L_CLIMATE,
            field_names.L_ENERGY,
            field_names.L_TRANSPORTATION,
            field_names.L_HOUSING,
            field_names.L_POLLUTION,
            field_names.L_WATER,
            field_names.L_HEALTH,
        ]
        self.df[field_names.L_NON_WORKFORCE] = self.df[
            non_workforce_factors
        ].any(axis=1)

        self.df["Definition L (percentile)"] = self.df[
            field_names.SCORE_L_COMMUNITIES
        ].astype(int)

        return self.df

    def _climate_factor(self) -> bool:
        # In Xth percentile or above for FEMA’s Risk Index (Source: FEMA
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        climate_eligibility_columns = [
            field_names.EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_FIELD,
            field_names.EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_FIELD,
            field_names.EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_FIELD,
        ]

        expected_population_loss_threshold = (
            self.df[
                field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        expected_agriculture_loss_threshold = (
            self.df[
                field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        expected_building_loss_threshold = (
            self.df[
                field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_FIELD] = (
            expected_population_loss_threshold
            & self.df[field_names.FPL_200_SERIES]
        )

        self.df[field_names.EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_FIELD] = (
            expected_agriculture_loss_threshold
            & self.df[field_names.FPL_200_SERIES]
        )

        self.df[field_names.EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_FIELD] = (
            expected_building_loss_threshold
            & self.df[field_names.FPL_200_SERIES]
        )

        self._increment_total_eligibility_exceeded(climate_eligibility_columns)

        return self.df[climate_eligibility_columns].any(axis="columns")

    def _energy_factor(self) -> bool:
        # In Xth percentile or above for DOE’s energy cost burden score (Source: LEAD Score)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        energy_eligibility_columns = [
            field_names.PM25_EXPOSURE_LOW_INCOME_FIELD,
            field_names.ENERGY_BURDEN_LOW_INCOME_FIELD,
        ]

        energy_burden_threshold = (
            self.df[
                field_names.ENERGY_BURDEN_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        pm25_threshold = (
            self.df[
                field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.PM25_EXPOSURE_LOW_INCOME_FIELD] = (
            pm25_threshold & self.df[field_names.FPL_200_SERIES]
        )

        self.df[field_names.ENERGY_BURDEN_LOW_INCOME_FIELD] = (
            energy_burden_threshold & self.df[field_names.FPL_200_SERIES]
        )

        self._increment_total_eligibility_exceeded(energy_eligibility_columns)

        return self.df[energy_eligibility_columns].any(axis="columns")

    def _transportation_factor(self) -> bool:
        # In Xth percentile or above for diesel particulate matter (Source: EPA National Air Toxics Assessment (NATA)
        # or
        # In Xth percentile or above for PM 2.5 (Source: EPA, Office of Air and Radiation (OAR) fusion of model and monitor data)]
        # or
        # In Xth percentile or above traffic proximity and volume (Source: 2017 U.S. Department of Transportation (DOT) traffic data
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        transportion_eligibility_columns = [
            field_names.DIESEL_PARTICULATE_MATTER_LOW_INCOME_FIELD,
            field_names.TRAFFIC_PROXIMITY_LOW_INCOME_FIELD,
        ]

        diesel_threshold = (
            self.df[
                field_names.DIESEL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        traffic_threshold = (
            self.df[
                field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.DIESEL_PARTICULATE_MATTER_LOW_INCOME_FIELD] = (
            diesel_threshold & self.df[field_names.FPL_200_SERIES]
        )

        self.df[field_names.TRAFFIC_PROXIMITY_LOW_INCOME_FIELD] = (
            traffic_threshold & self.df[field_names.FPL_200_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            transportion_eligibility_columns
        )

        return self.df[transportion_eligibility_columns].any(axis="columns")

    def _housing_factor(self) -> bool:
        # (
        # In Xth percentile or above for lead paint (Source: Census's American Community Survey’s
        # percent of housing units built pre-1960, used as an indicator of potential lead paint exposure in homes)
        # AND
        # In Yth percentile or below for Median House Value (Source: Census's American Community Survey)
        # )
        # or
        # In Xth percentile or above for housing cost burden (Source: HUD's Comprehensive Housing Affordability Strategy dataset
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        housing_eligibility_columns = [
            field_names.LEAD_PAINT_MEDIAN_HOME_VALUE_LOW_INCOME_FIELD,
            field_names.HOUSING_BURDEN_LOW_INCOME_FIELD,
        ]

        lead_paint_median_house_hold_threshold = (
            self.df[
                field_names.LEAD_PAINT_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        ) & (
            self.df[
                field_names.MEDIAN_HOUSE_VALUE_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            <= self.MEDIAN_HOUSE_VALUE_THRESHOLD
        )

        housing_burden_threshold = (
            self.df[
                field_names.HOUSING_BURDEN_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        # series by series indicators
        self.df[field_names.LEAD_PAINT_MEDIAN_HOME_VALUE_LOW_INCOME_FIELD] = (
            lead_paint_median_house_hold_threshold
            & self.df[field_names.FPL_200_SERIES]
        )

        self.df[field_names.HOUSING_BURDEN_LOW_INCOME_FIELD] = (
            housing_burden_threshold & self.df[field_names.FPL_200_SERIES]
        )

        self._increment_total_eligibility_exceeded(housing_eligibility_columns)

        return self.df[housing_eligibility_columns].any(axis="columns")

    def _pollution_factor(self) -> bool:
        # Proximity to Risk Management Plan sites is > X
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        pollution_eligibility_columns = [
            field_names.RMP_LOW_INCOME_FIELD,
            field_names.SUPERFUND_LOW_INCOME_FIELD,
            field_names.HAZARDOUS_WASTE_LOW_INCOME_FIELD,
        ]

        rmp_sites_threshold = (
            self.df[field_names.RMP_FIELD + field_names.PERCENTILE_FIELD_SUFFIX]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        npl_sites_threshold = (
            self.df[field_names.NPL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        tsdf_sites_threshold = (
            self.df[
                field_names.TSDF_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        # individual series-by-series
        self.df[field_names.RMP_LOW_INCOME_FIELD] = (
            rmp_sites_threshold & self.df[field_names.FPL_200_SERIES]
        )
        self.df[field_names.SUPERFUND_LOW_INCOME_FIELD] = (
            npl_sites_threshold & self.df[field_names.FPL_200_SERIES]
        )
        self.df[field_names.HAZARDOUS_WASTE_LOW_INCOME_FIELD] = (
            tsdf_sites_threshold & self.df[field_names.FPL_200_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            pollution_eligibility_columns
        )

        return self.df[pollution_eligibility_columns].any(axis="columns")

    def _water_factor(self) -> bool:
        # In Xth percentile or above for wastewater discharge (Source: EPA Risk-Screening Environmental Indicators (RSEI) Model)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        wastewater_threshold = (
            self.df[
                field_names.WASTEWATER_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.WASTEWATER_DISCHARGE_LOW_INCOME_FIELD] = (
            wastewater_threshold
            & self.df[field_names.field_names.FPL_200_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            [field_names.WASTEWATER_DISCHARGE_LOW_INCOME_FIELD]
        )

        return self.df[field_names.WASTEWATER_DISCHARGE_LOW_INCOME_FIELD]

    def _health_factor(self) -> bool:
        # In Xth percentile or above for diabetes (Source: CDC Places)
        # or
        # In Xth percentile or above for asthma (Source: CDC Places)
        # or
        # In Xth percentile or above for heart disease
        # or
        # In Xth percentile or above for low life expectancy (Source: CDC Places)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        health_eligibility_columns = [
            field_names.DIABETES_LOW_INCOME_FIELD,
            field_names.ASTHMA_LOW_INCOME_FIELD,
            field_names.HEART_DISEASE_LOW_INCOME_FIELD,
            field_names.LIFE_EXPECTANCY_INCOME_FIELD,
        ]

        diabetes_threshold = (
            self.df[
                field_names.DIABETES_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        asthma_threshold = (
            self.df[
                field_names.ASTHMA_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        heart_disease_threshold = (
            self.df[
                field_names.HEART_DISEASE_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        life_expectancy_threshold = (
            self.df[
                field_names.LIFE_EXPECTANCY_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            # Note: a high life expectancy is good, so take 1 minus the threshold to invert it,
            # and then look for life expenctancies lower than that (not greater than).
            <= 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.DIABETES_LOW_INCOME_FIELD] = (
            diabetes_threshold & self.df[field_names.FPL_200_SERIES]
        )
        self.df[field_names.ASTHMA_LOW_INCOME_FIELD] = (
            asthma_threshold & self.df[field_names.FPL_200_SERIES]
        )
        self.df[field_names.HEART_DISEASE_LOW_INCOME_FIELD] = (
            heart_disease_threshold & self.df[field_names.FPL_200_SERIES]
        )
        self.df[field_names.LIFE_EXPECTANCY_INCOME_FIELD] = (
            life_expectancy_threshold & self.df[field_names.FPL_200_SERIES]
        )

        self._increment_total_eligibility_exceeded(health_eligibility_columns)

        return self.df[health_eligibility_columns].any(axis="columns")

    def _workforce_factor(self) -> bool:
        # Where unemployment is above X%
        # or
        # Where median income is less than Y% of the area median income
        # or
        # Where the percent of households at or below 100% of the federal poverty level is greater than Z%
        # or
        # Where linguistic isolation is greater than Y%
        # AND
        # Where the high school degree achievement rates for adults 25 years and older is less than 95%
        # (necessary to screen out university block groups)

        high_scool_achievement_rate_threshold = (
            self.df[field_names.HIGH_SCHOOL_ED_FIELD]
            >= self.LACK_OF_HIGH_SCHOOL_MINIMUM_THRESHOLD
        )

        unemployment_threshold = (
            self.df[
                field_names.UNEMPLOYMENT_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        median_income_threshold = (
            self.df[
                field_names.MEDIAN_INCOME_PERCENT_AMI_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            # Note: a high median income as a % of AMI is good, so take 1 minus the threshold to invert it.
            # and then look for median income lower than that (not greater than).
            <= 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        linguistic_isolation_threshold = (
            self.df[
                field_names.LINGUISTIC_ISO_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        poverty_threshold = (
            self.df[
                field_names.POVERTY_LESS_THAN_100_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.LINGUISTIC_ISOLATION_LOW_HS_EDUCATION_FIELD] = (
            linguistic_isolation_threshold
            & high_scool_achievement_rate_threshold
        )

        self.df[field_names.POVERTY_LOW_HS_EDUCATION_FIELD] = (
            poverty_threshold & high_scool_achievement_rate_threshold
        )

        self.df[field_names.MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD] = (
            median_income_threhsold & high_scool_achievement_rate_threshold
        )

        self.df[field_names.UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD] = (
            unemployment_threshold & high_scool_achievement_rate_threshold
        )

        # Workforce criteria for states fields that create indicator columns
        # for each tract in order to indicate whether they met any of the four
        # criteria. We will used this create individual indicator columns.
        workforce_eligibility_columns = [
            field_names.UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD,
            field_names.POVERTY_LOW_HS_EDUCATION_FIELD,
            field_names.LINGUISTIC_ISOLATION_LOW_HS_EDUCATION_FIELD,
            field_names.MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD,
        ]

        workforce_combined_criteria_for_states = self.df[
            workforce_eligibility_columns
        ].any(axis="columns")

        self._increment_total_eligibility_exceeded(
            workforce_eligibility_columns
        )

        # Now, calculate workforce criteria for island territories.

        # F a couple of values, create a combined field and criteria field.
        # First, combine unemployment.
        (
            self.df,
            unemployment_island_areas_criteria_field_name,
        ) = self._combine_island_areas_with_states_and_set_thresholds(
            df=self.df,
            column_from_island_areas=field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009,
            column_from_decennial_census=field_names.CENSUS_UNEMPLOYMENT_FIELD_2010,
            combined_column_name=field_names.COMBINED_UNEMPLOYMENT_2010,
            threshold_cutoff_for_island_areas=self.ENVIRONMENTAL_BURDEN_THRESHOLD,
        )

        # Next, combine poverty.
        (
            self.df,
            poverty_island_areas_criteria_field_name,
        ) = self._combine_island_areas_with_states_and_set_thresholds(
            df=self.df,
            column_from_island_areas=field_names.CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009,
            column_from_decennial_census=field_names.CENSUS_POVERTY_LESS_THAN_100_FPL_FIELD_2010,
            combined_column_name=field_names.COMBINED_POVERTY_LESS_THAN_100_FPL_FIELD_2010,
            threshold_cutoff_for_island_areas=self.ENVIRONMENTAL_BURDEN_THRESHOLD,
        )

        workforce_combined_criteria_for_island_areas = (
            self.df[unemployment_island_areas_criteria_field_name]
            | self.df[poverty_island_areas_criteria_field_name]
            # Also check whether area median income is 10th percentile or lower
            # within the islands.
            | (
                self.df[
                    field_names.CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                # Note: a high median income as a % of AMI is good, so take 1 minus the threshold to invert it.
                # and then look for median income lower than that (not greater than).
                < 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
        ) & (
            self.df[field_names.CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009]
            > self.LACK_OF_HIGH_SCHOOL_MINIMUM_THRESHOLD
        )

        percent_of_island_tracts_highlighted = (
            100
            * workforce_combined_criteria_for_island_areas.sum()
            # Choosing a random column from island areas to calculate the denominator.
            / self.df[field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009]
            .notnull()
            .sum()
        )

        logger.info(
            f"For workforce criteria in island areas, "
            f"{workforce_combined_criteria_for_island_areas.sum()} ("
            f"{percent_of_island_tracts_highlighted:.2f}% of tracts that have non-null data "
            f"in the column) have a value of TRUE."
        )

        # A tract is included if it meets either the states tract criteria or the
        # island areas tract criteria.
        return (
            workforce_combined_criteria_for_states
            | workforce_combined_criteria_for_island_areas
        )
