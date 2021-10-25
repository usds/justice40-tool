import collections
import functools
from pathlib import Path
from typing import Dict, List
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

class ScoreCalculator():
    def __init__(self, df: pd.DataFrame):
        # Define some global parameters
        self.df = df
        self.LOW_INCOME_THRESHOLD = 0.60

    def calculate_scores(self) -> pd.DataFrame:
        # Index scores
        self.df = self._add_score_a(self.df)
        self.df = self._add_score_b(self.df)
        self.df = self._add_score_c(self.df, data_sets)
        self.df = self._add_scores_d_e(self.df)

        # TODO do this with each score instead of in a bundle
        # Create percentiles for these index scores
        self.df = self._add_score_percentiles(self.df)

        # Binary (non index) scores (cannot be percentiled)
        self.df = self._add_score_f(self.df)
        self.df = self._add_score_g_k(self.df)
        self.df = self._add_score_l_factors(self.df)

    def _add_score_a(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score A")
        df["Score A"] = df[
            [
                "Poverty (Less than 200% of federal poverty line) (percentile)",
                "Percent individuals age 25 or over with less than high school degree (percentile)",
            ]
        ].mean(axis=1)
        return df

    def _add_score_b(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score B")
        df["Score B"] = (
            self.df[
                "Poverty (Less than 200% of federal poverty line) (percentile)"
            ]
            * self.df[
                "Percent individuals age 25 or over with less than high school degree (percentile)"
            ]
        )
        return df

    # "CalEnviroScreen for the US" score
    def _add_score_c(self, df: pd.DataFrame, data_sets: list) -> pd.DataFrame:
        logger.info("Adding Score C")
        # Average all the percentile values in each bucket into a single score for each of the four buckets.
        for bucket in self.BUCKETS:
            fields_in_bucket = [
                f"{data_set.renamed_field}{self.PERCENTILE_FIELD_SUFFIX}"
                for data_set in data_sets
                if data_set.bucket == bucket
            ]
            df[f"{bucket}"] = df[fields_in_bucket].mean(axis=1)

        # Combine the score from the two Exposures and Environmental Effects buckets
        # into a single score called "Pollution Burden".
        # The math for this score is:
        # (1.0 * Exposures Score + 0.5 * Environment Effects score) / 1.5.
        df[self.AGGREGATION_POLLUTION_FIELD] = (
            1.0 * df[f"{self.BUCKET_EXPOSURES}"]
            + 0.5 * df[f"{self.BUCKET_ENVIRONMENTAL}"]
        ) / 1.5

        # Average the score from the two Sensitive populations and
        # Socioeconomic factors buckets into a single score called
        # "Population Characteristics".
        df[self.AGGREGATION_POPULATION_FIELD] = df[
            [f"{self.BUCKET_SENSITIVE}", f"{self.BUCKET_SOCIOECONOMIC}"]
        ].mean(axis=1)

        # Multiply the "Pollution Burden" score and the "Population Characteristics"
        # together to produce the cumulative impact score.
        df["Score C"] = (
            df[self.AGGREGATION_POLLUTION] * df[self.AGGREGATION_POPULATION]
        )
        return df

    def _add_scores_d_e(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Scores D and E")
        fields_to_use_in_score = [
            self.UNEMPLOYED_FIELD_NAME,
            self.LINGUISTIC_ISOLATION_FIELD_NAME,
            self.HOUSING_BURDEN_FIELD_NAME,
            self.POVERTY_FIELD_NAME,
            self.HIGH_SCHOOL_FIELD_NAME,
        ]

        fields_min_max = [
            f"{field}{self.MIN_MAX_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]
        fields_percentile = [
            f"{field}{self.PERCENTILE_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]

        # Calculate "Score D", which uses min-max normalization
        # and calculate "Score E", which uses percentile normalization for the same fields
        df["Score D"] = self.df[fields_min_max].mean(axis=1)
        df["Score E"] = self.df[fields_percentile].mean(axis=1)
        return df

    # TODO Make variables and constants clearer (meaning and type)
    def _add_score_f(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score F")
        ami_and_high_school_field_name = "Low AMI, Low HS graduation"
        meets_socio_field_name = "Meets socioeconomic criteria"
        meets_burden_field_name = "Meets burden criteria"

        df[ami_and_high_school_field_name] = (
            df[self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME] < 0.80
        ) & (df[self.HIGH_SCHOOL_FIELD_NAME] > 0.2)

        df[meets_socio_field_name] = (
            df[ami_and_high_school_field_name]
            | (df[self.POVERTY_FIELD_NAME] > 0.40)
            | (df[self.LINGUISTIC_ISOLATION_FIELD_NAME] > 0.10)
            | (df[self.HIGH_SCHOOL_FIELD_NAME] > 0.4)
        )

        df[meets_burden_field_name] = (
            (df["Particulate matter (PM2.5) (percentile)"] > 0.9)
            | (df["Respiratory hazard index (percentile)"] > 0.9)
            | (df["Traffic proximity and volume (percentile)"] > 0.9)
            | (
                df[
                    "Percent pre-1960s housing (lead paint indicator) (percentile)"
                ]
                > 0.9
            )
            | (df["Proximity to RMP sites (percentile)"] > 0.9)
            | (
                df["Current asthma among adults aged >=18 years (percentile)"]
                > 0.9
            )
            | (
                df[
                    "Coronary heart disease among adults aged >=18 years (percentile)"
                ]
                > 0.9
            )
            | (
                df[
                    "Cancer (excluding skin cancer) among adults aged >=18 years (percentile)"
                ]
                > 0.9
            )
            # | (
            #     self.df[
            #         "Current lack of health insurance among adults aged 18-64 years (percentile)"
            #     ]
            #     > 0.9
            # )
            | (
                df[
                    "Diagnosed diabetes among adults aged >=18 years (percentile)"
                ]
                > 0.9
            )
            # | (
            #     self.df[
            #         "Physical health not good for >=14 days among adults aged >=18 years (percentile)"
            #     ]
            #     > 0.9
            # )
        )

        df["Score F (communities)"] = (
            df[meets_socio_field_name] & df[meets_burden_field_name]
        )
        return df

    def _add_score_g_k(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score G through K")

        high_school_cutoff_threshold = 0.05
        high_school_cutoff_threshold_2 = 0.06

        # Score G is now modified NMTC
        df["Score G (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        ) | (
            (df[self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME] > 0.20)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        )
        df["Score G"] = df["Score G (communities)"].astype(int)
        df["Score G (percentile)"] = df["Score G"]

        df["Score H (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        ) | (
            (df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        )
        df["Score H"] = df["Score H (communities)"].astype(int)

        df["Score I (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.7)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        ) | (
            (df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.50)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        )
        df["Score I"] = df["Score I (communities)"].astype(int)
        df["Score I (percentile)"] = df["Score I"]

        df["NMTC (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
        ) | (df[self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME] > 0.20)

        df["Score K (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        ) | (
            (df[self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME] > 0.20)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        )

        return df
    
    def _add_score_l_factors(self):
        self.df["Climate Factor"] = self.climate_factor()
        self.df["Energy Factor"] = self.energy_factor()
        self.df["Transportation Factor"] = self.transportation_factor()
        self.df["Housing Factor"] = self.housing_factor()
        self.df["Pollution Factor"] = self.pollution_factor()
        self.df["Water Factor"] = self.water_factor()
        self.df["Health Factor"] = self.health_factor()
        self.df["Workforce Factor"] = self.workforce_factor()
        
        # df['Score L'] = False
        
        factors = ["Climate Factor", "Energy Factor",
                    "Transportation Factor", "Housing Factor",
                    "Pollution Factor", "Water Factor",
                    "Health Factor", "Workforce Factor"]
        self.df['Score L (communities)'] = self.df[factors].any(axis=1)
        return self.df

    def climate_factor(self) -> bool:
        # In Xth percentile or above for FEMA’s Risk Index (Source: FEMA
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD) 
            & (self.df[self.FEMA_RISK_FIELD] > 0.90) 
        )

    def _add_score_percentiles(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score Percentiles")
        for score_field in [
            "Score A",
            "Score B",
            "Score C",
            "Score D",
            "Score E",
            "Poverty (Less than 200% of federal poverty line)",
        ]:
            df[f"{score_field}{self.PERCENTILE_FIELD_SUFFIX}"] = df[
                score_field
            ].rank(pct=True)

            for threshold in [0.25, 0.3, 0.35, 0.4]:
                fraction_converted_to_percent = int(100 * threshold)
                df[
                    f"{score_field} (top {fraction_converted_to_percent}th percentile)"
                ] = (
                    df[f"{score_field}{self.PERCENTILE_FIELD_SUFFIX}"]
                    >= 1 - threshold
                )
        return df

    def energy_factor(self) -> bool:
        # In Xth percentile or above for DOE’s energy cost burden score (Source: LEAD Score)
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD) 
            & (self.df[self.ENERGY_BURDEN_PERCENTILE_FIELD] > 0.90) 
        )

    def transportation_factor(self) -> bool:
        # In Xth percentile or above for diesel particulate matter (Source: EPA National Air Toxics Assessment (NATA) 
        # or
        # In Xth percentile or above for PM 2.5 (Source: EPA, Office of Air and Radiation (OAR) fusion of model and monitor data)]
        # or
        #In Xth percentile or above traffic proximity and volume (Source: 2017 U.S. Department of Transportation (DOT) traffic data 
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        transportation_criteria = (
            (self.df[self.DIESEL_FIELD] > 0.90)
            | (self.df[self.PM25_FIELD] > 0.90)
            | self.df[self.TRAFFIC_FIELD] > 0.90
        )
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD) 
            &  transportation_criteria
        )

    def housing_factor(self) -> bool:
        # In Xth percentile or above for lead paint (Source: Census's American Community Survey’s percent of housing units built pre-1960, used as an indicator of potential lead paint exposure in homes) 
        # or
        # In Xth percentile or above for housing cost burden (Source: HUD's Comprehensive Housing Affordability Strategy dataset
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        housing_criteria =  (
            (self.df[self.LEAD_PAINT_FIELD] > 0.40) 
            | (self.df[self.HOUSING_BURDEN_PERCENTILE_FIELD] > 0.90) 
        )
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD) 
            & housing_criteria
        )

    def pollution_factor(self) -> bool:
        # TBD
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        return False

    def water_factor(self) -> bool:
        # In Xth percentile or above for wastewater discharge (Source: EPA Risk-Screening Environmental Indicators (RSEI) Model)
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD) 
            & (self.df[self.WASTEWATER_FIELD] > 0.90) 
        )

    def health_factor(self) -> bool:
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

        health_criteria =  (
            (self.df[self.DIABETES_PERCENTILE_FIELD] > 0.90) 
            | (self.df[self.ASTHMA_PERCENTILE_FIELD] > 0.90) 
            | (self.df[self.HEART_DISEASE_PERCENTILE_FIELD] > 0.90) 
            | (self.df[self.LIFE_EXPECTANCY_PERCENTILE_FIELD] < 0.10) # A HIGH NUMBER HERE IS GOOD
        )
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD) 
            & health_criteria
        )
        
    def workforce_factor(self) -> bool:
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
        workforce_criteria = (
            (self.df[self.UNEMPLOYMENT_FIELD] > 0.90) 
            | (self.df[self.MEDIAN_INCOME_FIELD] > 0.90) 
            | (self.df[self.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.90) 
            | (self.df[self.LINGUISTIC_ISO_FIELD] > 0.90) 
        )
        return ( 
            (self.df[self.HIGH_SCHOOL_ED_FIELD] > 0.05) 
            & workforce_criteria
        )
        