from typing import Tuple
import numpy as np
import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger
import data_pipeline.etl.score.constants as constants

logger = get_module_logger(__name__)


class ScoreM(Score):
    """Very similar to Score L, with a few minor modifications."""

    def __init__(self, df: pd.DataFrame) -> None:
        self.LOW_INCOME_THRESHOLD: float = 0.65
        self.MAX_COLLEGE_ATTENDANCE_THRESHOLD: float = 0.20
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
    ) -> Tuple[pd.DataFrame, str]:
        """Steps to set thresholds for island areas.

        This function is fairly logically complicated. It takes the following steps:

            1. Combine the two different fields into a single field.
            2. Calculate the 90th percentile for the combined field.
            3. Create a boolean series that is true for any census tract in the island
                areas (and only the island areas) that exceeds this percentile.

        For step one, it combines data that is either the island area's Decennial Census
        value in 2009 or the state's value in 5-year ACS ending in 2010.

        This will be used to generate the percentile cutoff for the 90th percentile.

        The stateside decennial census stopped asking economic comparisons,
        so this is as close to apples-to-apples as we get. We use 5-year ACS for data
        robustness over 1-year ACS.
        """
        # Create the combined field.
        # TODO: move this combined field percentile calculation to `etl_score`,
        #  since most other percentile logic is there.
        # There should only be one entry in either 2009 or 2019 fields, not one in both.
        # But just to be safe, we take the mean and ignore null values so if there
        # *were* entries in both, this result would make sense.
        df[combined_column_name] = df[
            [column_from_island_areas, column_from_decennial_census]
        ].mean(axis=1, skipna=True)

        # Create a percentile field for use in the Islands / PR visualization
        # TODO: move this code
        # In the code below, percentiles are constructed based on the combined column
        # of census and island data, but only reported for the island areas (where there
        # is no other comprehensive percentile information)
        return_series_name = (
            column_from_island_areas
            + field_names.ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD
            + field_names.PERCENTILE_FIELD_SUFFIX
        )
        df[return_series_name] = np.where(
            df[column_from_decennial_census].isna(),
            df[combined_column_name].rank(pct=True),
            np.nan,
        )

        threshold_column_name = (
            f"{column_from_island_areas} exceeds "
            f"{threshold_cutoff_for_island_areas*100:.0f}th percentile"
        )

        df[threshold_column_name] = (
            df[return_series_name] >= threshold_cutoff_for_island_areas
        )

        return df, threshold_column_name

    def _create_low_income_and_low_college_attendance_threshold(
        self, df: pd.DataFrame
    ) -> pd.Series:
        """
        Returns a pandas series (really a numpy array)
        of booleans based on the condition of the FPL at 200%
        is at or more than some established threshold
        """

        return (df[field_names.LOW_INCOME_THRESHOLD]) & (
            df[field_names.COLLEGE_ATTENDANCE_LESS_THAN_20_FIELD]
            | (
                # If college attendance data is null for this tract, just rely on the
                # poverty data
                df[field_names.COLLEGE_ATTENDANCE_FIELD].isna()
            )
        )

    def _increment_total_eligibility_exceeded(
        self, columns_for_subset: list, skip_fips: tuple = ()
    ) -> None:
        """
        Increments the total eligible factors for a given tract

        The new skip_fips argument specifies which (if any) fips codes to
        skip over for incrementing.
        This allows us to essentially skip data we think is of limited veracity,
        without overriding any values in the data.
        THIS IS A TEMPORARY FIX.
        """
        if skip_fips:
            self.df[field_names.THRESHOLD_COUNT] += np.where(
                self.df[field_names.GEOID_TRACT_FIELD].str.startswith(
                    skip_fips
                ),
                0,
                self.df[columns_for_subset].sum(axis=1, skipna=True),
            )
        else:
            self.df[field_names.THRESHOLD_COUNT] += self.df[
                columns_for_subset
            ].sum(axis=1, skipna=True)

    def _climate_factor(self) -> bool:
        # In Xth percentile or above for FEMA’s Risk Index (Source: FEMA
        # AND
        # Low income: In Nth percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level and there is low higher ed attendance
        # Source: Census's American Community Survey

        climate_eligibility_columns = [
            field_names.EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD,
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

        self.df[field_names.CLIMATE_THRESHOLD_EXCEEDED] = (
            expected_population_loss_threshold
            | expected_agriculture_loss_threshold
            | expected_building_loss_threshold
        )

        self.df[
            field_names.EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            expected_population_loss_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self.df[
            field_names.EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            expected_agriculture_loss_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self.df[
            field_names.EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            expected_building_loss_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            climate_eligibility_columns,
            skip_fips=constants.DROP_FIPS_FROM_NON_WTD_THRESHOLDS,
        )

        return self.df[climate_eligibility_columns].any(axis="columns")

    def _energy_factor(self) -> bool:
        # In Xth percentile or above for DOE’s energy cost burden score (Source: LEAD Score)
        # AND
        # Low income: In Nth percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level and has low higher ed attendance.
        # Source: Census's American Community Survey

        energy_eligibility_columns = [
            field_names.PM25_EXPOSURE_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.ENERGY_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD,
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

        self.df[field_names.ENERGY_THRESHOLD_EXCEEDED] = (
            energy_burden_threshold | pm25_threshold
        )

        self.df[field_names.PM25_EXPOSURE_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            pm25_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self.df[field_names.ENERGY_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            energy_burden_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            energy_eligibility_columns,
            skip_fips=constants.DROP_FIPS_FROM_NON_WTD_THRESHOLDS,
        )

        return self.df[energy_eligibility_columns].any(axis="columns")

    def _transportation_factor(self) -> bool:
        # In Xth percentile or above for diesel particulate matter (Source: EPA National Air Toxics Assessment (NATA)
        # or
        # In Xth percentile or above for PM 2.5 (Source: EPA, Office of Air and Radiation (OAR) fusion of model and monitor data)]
        # or
        # In Xth percentile or above traffic proximity and volume (Source: 2017 U.S. Department of Transportation (DOT) traffic data
        # AND
        # Low income: In Nth percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level and has a low percent of higher ed students.
        # Source: Census's American Community Survey

        transportion_eligibility_columns = [
            field_names.DIESEL_PARTICULATE_MATTER_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.TRAFFIC_PROXIMITY_LOW_INCOME_LOW_HIGHER_ED_FIELD,
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

        self.df[field_names.TRAFFIC_THRESHOLD_EXCEEDED] = (
            traffic_threshold | diesel_threshold
        )

        self.df[
            field_names.DIESEL_PARTICULATE_MATTER_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            diesel_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self.df[
            field_names.TRAFFIC_PROXIMITY_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            traffic_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            transportion_eligibility_columns,
            skip_fips=constants.DROP_FIPS_FROM_NON_WTD_THRESHOLDS,
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
        # Low income: In Nth percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level and has a low percent of higher ed students.
        # Source: Census's American Community Survey

        housing_eligibility_columns = [
            field_names.LEAD_PAINT_MEDIAN_HOUSE_VALUE_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.HOUSING_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD,
        ]

        lead_paint_median_home_value_threshold = (
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

        self.df[field_names.HOUSING_THREHSOLD_EXCEEDED] = (
            lead_paint_median_home_value_threshold | housing_burden_threshold
        )

        # series by series indicators
        self.df[
            field_names.LEAD_PAINT_MEDIAN_HOUSE_VALUE_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            lead_paint_median_home_value_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self.df[field_names.HOUSING_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            housing_burden_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            housing_eligibility_columns,
            skip_fips=constants.DROP_FIPS_FROM_NON_WTD_THRESHOLDS,
        )

        return self.df[housing_eligibility_columns].any(axis="columns")

    def _pollution_factor(self) -> bool:
        # Proximity to Risk Management Plan sites is > X
        # AND
        # Low income: In Nth percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level and has a low percent of higher ed students.
        # Source: Census's American Community Survey

        pollution_eligibility_columns = [
            field_names.RMP_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.SUPERFUND_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.HAZARDOUS_WASTE_LOW_INCOME_LOW_HIGHER_ED_FIELD,
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

        self.df[field_names.POLLUTION_THRESHOLD_EXCEEDED] = (
            rmp_sites_threshold | npl_sites_threshold
        ) | tsdf_sites_threshold

        # individual series-by-series
        self.df[field_names.RMP_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            rmp_sites_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )
        self.df[field_names.SUPERFUND_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            npl_sites_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )
        self.df[field_names.HAZARDOUS_WASTE_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            tsdf_sites_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            pollution_eligibility_columns,
            skip_fips=constants.DROP_FIPS_FROM_NON_WTD_THRESHOLDS,
        )

        return self.df[pollution_eligibility_columns].any(axis="columns")

    def _water_factor(self) -> bool:
        # In Xth percentile or above for wastewater discharge (Source: EPA Risk-Screening Environmental Indicators (RSEI) Model)
        # AND
        # Low income: In Nth percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level and has a low percent of higher ed students
        # Source: Census's American Community Survey

        self.df[field_names.WATER_THRESHOLD_EXCEEDED] = (
            self.df[
                field_names.WASTEWATER_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[
            field_names.WASTEWATER_DISCHARGE_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            self.df[field_names.WATER_THRESHOLD_EXCEEDED]
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            [field_names.WASTEWATER_DISCHARGE_LOW_INCOME_LOW_HIGHER_ED_FIELD],
            skip_fips=constants.DROP_FIPS_FROM_NON_WTD_THRESHOLDS,
        )

        return self.df[
            field_names.WASTEWATER_DISCHARGE_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ]

    def _health_factor(self) -> bool:
        # In Xth percentile or above for diabetes (Source: CDC Places)
        # or
        # In Xth percentile or above for asthma (Source: CDC Places)
        # or
        # In Xth percentile or above for heart disease
        # or
        # In Xth percentile or above for low life expectancy (Source: CDC Places)
        # AND
        # Low income: In Nth percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level and has a low percent of higher ed students
        # Source: Census's American Community Survey

        health_eligibility_columns = [
            field_names.DIABETES_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.ASTHMA_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.HEART_DISEASE_LOW_INCOME_LOW_HIGHER_ED_FIELD,
            field_names.LOW_LIFE_EXPECTANCY_LOW_INCOME_LOW_HIGHER_ED_FIELD,
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

        low_life_expectancy_threshold = (
            self.df[
                field_names.LOW_LIFE_EXPECTANCY_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.HEALTH_THRESHOLD_EXCEEDED] = (
            (diabetes_threshold | asthma_threshold) | heart_disease_threshold
        ) | low_life_expectancy_threshold

        self.df[field_names.DIABETES_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            diabetes_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )
        self.df[field_names.ASTHMA_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            asthma_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )
        self.df[field_names.HEART_DISEASE_LOW_INCOME_LOW_HIGHER_ED_FIELD] = (
            heart_disease_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )
        self.df[
            field_names.LOW_LIFE_EXPECTANCY_LOW_INCOME_LOW_HIGHER_ED_FIELD
        ] = (
            low_life_expectancy_threshold
            & self.df[field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES]
        )

        self._increment_total_eligibility_exceeded(
            health_eligibility_columns,
            skip_fips=constants.DROP_FIPS_FROM_NON_WTD_THRESHOLDS,
        )

        return self.df[health_eligibility_columns].any(axis="columns")

    def _workforce_factor(self) -> bool:
        # Where unemployment is above Xth percentile
        # or
        # Where median income as a percent of area median income is above Xth percentile
        # or
        # Where the percent of households at or below 100% of the federal poverty level
        # is above Xth percentile
        # or
        # Where linguistic isolation is above Xth percentile
        # AND
        # Where the high school degree achievement rates for adults 25 years and older
        # is less than Y%
        # AND the higher ed attendance rates are under Z%
        # (necessary to screen out university tracts)

        # Workforce criteria for states fields.
        workforce_eligibility_columns = [
            field_names.UNEMPLOYMENT_LOW_HS_LOW_HIGHER_ED_FIELD,
            field_names.POVERTY_LOW_HS_LOW_HIGHER_ED_FIELD,
            field_names.LINGUISTIC_ISOLATION_LOW_HS_LOW_HIGHER_ED_FIELD,
            field_names.LOW_MEDIAN_INCOME_LOW_HS_LOW_HIGHER_ED_FIELD,
        ]

        self.df[field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD] = (
            self.df[field_names.HIGH_SCHOOL_ED_FIELD]
            >= self.LACK_OF_HIGH_SCHOOL_MINIMUM_THRESHOLD
        ) & (
            (
                self.df[field_names.COLLEGE_ATTENDANCE_FIELD]
                <= self.MAX_COLLEGE_ATTENDANCE_THRESHOLD
            )
            | (
                # If college attendance data is null for this tract, just rely on the
                # poverty/AMI data
                self.df[field_names.COLLEGE_ATTENDANCE_FIELD].isna()
            )
        )

        unemployment_threshold = (
            self.df[
                field_names.UNEMPLOYMENT_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        low_median_income_threshold = (
            self.df[
                field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
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

        self.df[field_names.LINGUISTIC_ISOLATION_LOW_HS_LOW_HIGHER_ED_FIELD] = (
            linguistic_isolation_threshold
            & self.df[field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD]
        )

        self.df[field_names.POVERTY_LOW_HS_LOW_HIGHER_ED_FIELD] = (
            poverty_threshold
            & self.df[field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD]
        )

        self.df[field_names.LOW_MEDIAN_INCOME_LOW_HS_LOW_HIGHER_ED_FIELD] = (
            low_median_income_threshold
            & self.df[field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD]
        )

        self.df[field_names.UNEMPLOYMENT_LOW_HS_LOW_HIGHER_ED_FIELD] = (
            unemployment_threshold
            & self.df[field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD]
        )

        workforce_combined_criteria_for_states = self.df[
            workforce_eligibility_columns
        ].any(axis="columns")

        self._increment_total_eligibility_exceeded(
            workforce_eligibility_columns
        )

        # Now, calculate workforce criteria for island territories.
        island_areas_workforce_eligibility_columns = [
            field_names.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD,
            field_names.ISLAND_AREAS_POVERTY_LOW_HS_EDUCATION_FIELD,
            field_names.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD,
        ]

        # First, combine unemployment.
        # This will include an adjusted percentile column for the island areas
        # to be used by the front end.
        (
            self.df,
            island_areas_unemployment_criteria_field_name,
        ) = self._combine_island_areas_with_states_and_set_thresholds(
            df=self.df,
            column_from_island_areas=field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009,
            column_from_decennial_census=field_names.CENSUS_UNEMPLOYMENT_FIELD_2010,
            combined_column_name=field_names.COMBINED_UNEMPLOYMENT_2010,
            threshold_cutoff_for_island_areas=self.ENVIRONMENTAL_BURDEN_THRESHOLD,
        )

        # Next, combine poverty.
        # This will include an adjusted percentile column for the island areas
        # to be used by the front end.
        (
            self.df,
            island_areas_poverty_criteria_field_name,
        ) = self._combine_island_areas_with_states_and_set_thresholds(
            df=self.df,
            column_from_island_areas=field_names.CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009,
            column_from_decennial_census=field_names.CENSUS_POVERTY_LESS_THAN_100_FPL_FIELD_2010,
            combined_column_name=field_names.COMBINED_POVERTY_LESS_THAN_100_FPL_FIELD_2010,
            threshold_cutoff_for_island_areas=self.ENVIRONMENTAL_BURDEN_THRESHOLD,
        )

        # Also check whether low area median income is 90th percentile or higher
        # within the islands.

        # Note that because the field for low median does not have to be combined,
        # unlike the other fields, we do not need to create a new percentile
        # column. This code should probably be refactored when (TODO) we do the big
        # refactor.
        island_areas_low_median_income_as_a_percent_of_ami_criteria_field_name = (
            f"{field_names.LOW_CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009} exceeds "
            f"{field_names.PERCENTILE}th percentile"
        )
        self.df[
            island_areas_low_median_income_as_a_percent_of_ami_criteria_field_name
        ] = (
            self.df[
                field_names.LOW_CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        self.df[field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD] = (
            self.df[field_names.CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009]
            >= self.LACK_OF_HIGH_SCHOOL_MINIMUM_THRESHOLD
        )

        self.df[
            field_names.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD
        ] = (
            self.df[island_areas_unemployment_criteria_field_name]
            & self.df[field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD]
        )

        self.df[field_names.ISLAND_AREAS_POVERTY_LOW_HS_EDUCATION_FIELD] = (
            self.df[island_areas_poverty_criteria_field_name]
            & self.df[field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD]
        )

        self.df[
            field_names.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD
        ] = (
            self.df[
                island_areas_low_median_income_as_a_percent_of_ami_criteria_field_name
            ]
            & self.df[field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD]
        )

        workforce_combined_criteria_for_island_areas = self.df[
            island_areas_workforce_eligibility_columns
        ].any(axis="columns")

        self._increment_total_eligibility_exceeded(
            island_areas_workforce_eligibility_columns
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

        # Because these criteria are calculated differently for the islands, we also calculate the
        # thresholds to pass to the FE slightly differently

        self.df[field_names.WORKFORCE_THRESHOLD_EXCEEDED] = (
            ## First we calculate for the non-island areas
            (
                (poverty_threshold | linguistic_isolation_threshold)
                | low_median_income_threshold
            )
            | unemployment_threshold
        ) | (
            ## then we calculate just for the island areas
            (
                self.df[island_areas_unemployment_criteria_field_name]
                | self.df[island_areas_poverty_criteria_field_name]
            )
            | self.df[
                island_areas_low_median_income_as_a_percent_of_ami_criteria_field_name
            ]
        )

        # Because of the island complications, we also have to separately calculate the threshold for
        # socioeconomic thresholds
        self.df[field_names.WORKFORCE_SOCIO_INDICATORS_EXCEEDED] = (
            self.df[field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD]
            | self.df[field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD]
        )

        # A tract is included if it meets either the states tract criteria or the
        # island areas tract criteria.
        return (
            workforce_combined_criteria_for_states
            | workforce_combined_criteria_for_island_areas
        )

    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score M")

        self.df[field_names.THRESHOLD_COUNT] = 0

        # TODO: move this inside of
        #  `_create_low_income_and_low_college_attendance_threshold`
        # and change the return signature of that method.
        # Create a standalone field that captures the college attendance boolean
        # threshold.
        self.df[field_names.LOW_INCOME_THRESHOLD] = (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.LOW_INCOME_THRESHOLD
        )

        # Because we are moving this variable to be in the same direction as all
        # other variables, we change this to be < rather than <=. This translates
        # to "80% or more of residents are not college students", rather than
        # "Strictly greater than 80% of residents are not college students."
        # There are two tracts that are impacted by this (that is, they have exactly)
        # 20% college students -- neither of these has been a DAC under any score.
        self.df[field_names.COLLEGE_ATTENDANCE_LESS_THAN_20_FIELD] = (
            self.df[field_names.COLLEGE_ATTENDANCE_FIELD]
            < self.MAX_COLLEGE_ATTENDANCE_THRESHOLD
        )

        self.df[
            field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES
        ] = self._create_low_income_and_low_college_attendance_threshold(
            self.df
        )
        self.df[field_names.M_CLIMATE] = self._climate_factor()
        self.df[field_names.M_ENERGY] = self._energy_factor()
        self.df[field_names.M_TRANSPORTATION] = self._transportation_factor()
        self.df[field_names.M_HOUSING] = self._housing_factor()
        self.df[field_names.M_POLLUTION] = self._pollution_factor()
        self.df[field_names.M_WATER] = self._water_factor()
        self.df[field_names.M_HEALTH] = self._health_factor()
        self.df[field_names.M_WORKFORCE] = self._workforce_factor()

        factors = [
            field_names.M_CLIMATE,
            field_names.M_ENERGY,
            field_names.M_TRANSPORTATION,
            field_names.M_HOUSING,
            field_names.M_POLLUTION,
            field_names.M_WATER,
            field_names.M_HEALTH,
            field_names.M_WORKFORCE,
        ]
        self.df[field_names.SCORE_M_COMMUNITIES] = self.df[factors].any(axis=1)

        # Note: this is purely used for comparison tool analysis, and can be removed at a later date. - LMB.
        non_workforce_factors = [
            field_names.M_CLIMATE,
            field_names.M_ENERGY,
            field_names.M_TRANSPORTATION,
            field_names.M_HOUSING,
            field_names.M_POLLUTION,
            field_names.M_WATER,
            field_names.M_HEALTH,
        ]
        self.df[field_names.M_NON_WORKFORCE] = self.df[
            non_workforce_factors
        ].any(axis=1)

        self.df[
            field_names.SCORE_M + field_names.PERCENTILE_FIELD_SUFFIX
        ] = self.df[field_names.SCORE_M_COMMUNITIES].astype(int)

        return self.df
