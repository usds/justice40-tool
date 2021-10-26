import collections
import functools
from pathlib import Path
from typing import Dict, List
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreCalculator(ExtractTransformLoad):
    def __init__(self, df: pd.DataFrame):
        # Define some global parameters
        self.df = df

        self.POVERTY_LESS_THAN_200_FPL_FIELD: str = (
            "Percent of individuals < 200% Federal Poverty Line"
        )

        self.POVERTY_LESS_THAN_100_FPL_FIELD: str = (
            "Percent of individuals < 100% Federal Poverty Line"
        )

        # FEMA Risk Index
        self.NATIONAL_RISK_FIELD: str ="FEMA Risk Index Expected Annual Loss Score (percentile)"

        # DOE energy burden
        self.ENERGY_BURDEN_FIELD: str = "Energy burden (percentile)"

        # Diesel particulate matter
        self.DIESEL_FIELD: str = "Diesel particulate matter (percentile)"

        # PM2.5
        self.PM25_FIELD: str = "Particulate matter (PM2.5) (percentile)"

        # Traffic proximity and volume
        self.TRAFFIC_FIELD: str = "Traffic proximity and volume (percentile)"

        # Lead paint
        self.LEAD_PAINT_FIELD: str = "Percent pre-1960s housing (lead paint indicator) (percentile)"

        # Housing cost burden
        self.HOUSING_BURDEN_FIELD: str = "Housing burden (percent) (percentile)"

        # Wastewater discharge
        self.WASTEWATER_FIELD: str = "Wastewater discharge (percentile)"

        # Diabetes
        self.DIABETES_FIELD: str = "Diagnosed diabetes among adults aged >=18 years (percentile)"

        # Asthma
        self.ASTHMA_FIELD: str = "Current asthma among adults aged >=18 years (percentile)"

        # Heart disease
        self.HEART_DISEASE_FIELD: str = "Coronary heart disease among adults aged >=18 years (percentile)"

        # Life expectancy
        self.LIFE_EXPECTANCY_FIELD: str = "Life expectancy (years) (percentile)"

        # Unemployment
        self.UNEMPLOYMENT_FIELD: str = "Unemployed civilians (percent)"

        # Median income as % of AMI
        self.MEDIAN_INCOME_FIELD: str = "Median household income (% of AMI)"

        # Linguistic isolation
        self.LINGUISTIC_ISO_FIELD: str = "Linguistic isolation (percent)"

        # Less than high school education
        self.HIGH_SCHOOL_ED_FIELD: str = "Percent individuals age 25 or over with less than high school degree"

        # Set thresholds for score L
        self.LOW_INCOME_THRESHOLD: float = 0.60
        self.ENVIRONMENTAL_BURDEN_THRESHOLD: float = 0.95

    def add_score_l_factors(self):
        self.df["Climate Factor"] = self.climate_factor()
        self.df["Energy Factor"] = self.energy_factor()
        self.df["Transportation Factor"] = self.transportation_factor()
        self.df["Housing Factor"] = self.housing_factor()
        self.df["Pollution Factor"] = self.pollution_factor()
        self.df["Water Factor"] = self.water_factor()
        self.df["Health Factor"] = self.health_factor()
        self.df["Workforce Factor"] = self.workforce_factor()

        factors = [
            "Climate Factor",
            "Energy Factor",
            "Transportation Factor",
            "Housing Factor",
            "Pollution Factor",
            "Water Factor",
            "Health Factor",
            "Workforce Factor",
        ]
        self.df["Score L (communities)"] = self.df[factors].any(axis=1)

        return self.df

    def climate_factor(self) -> bool:
        # In Xth percentile or above for FEMA’s Risk Index (Source: FEMA
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        return (
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD)
            & (self.df[self.NATIONAL_RISK_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
        )

    def energy_factor(self) -> bool:
        # In Xth percentile or above for DOE’s energy cost burden score (Source: LEAD Score)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        return (
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD] > self.LOW_INCOME_THRESHOLD)
            & (self.df[self.ENERGY_BURDEN_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
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
            (self.df[self.DIESEL_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.PM25_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | self.df[self.TRAFFIC_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD
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
            (self.df[self.LEAD_PAINT_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.HOUSING_BURDEN_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
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
            & (self.df[self.WASTEWATER_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
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
            (self.df[self.DIABETES_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.ASTHMA_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.HEART_DISEASE_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.LIFE_EXPECTANCY_FIELD] < 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD) # A HIGH NUMBER HERE IS GOOD
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
            (self.df[self.UNEMPLOYMENT_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.MEDIAN_INCOME_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.POVERTY_LESS_THAN_100_FPL_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[self.LINGUISTIC_ISO_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
        )
        return (
            (self.df[self.HIGH_SCHOOL_ED_FIELD] > 0.05)
            & workforce_criteria
        )
