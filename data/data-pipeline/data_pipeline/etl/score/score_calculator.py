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

        self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME: str = (
            "Percent of individuals < 200% Federal Poverty Line"
        )
        self.NATIONAL_RISK_FIELD_NAME: str = (
            "FEMA Risk Index Expected Annual Loss Score"
        )
        # DOE energy burden
        self.ENERGY_BURDEN_FIELD_NAME = "Energy burden"

    def climate_factor(self) -> bool:
        # In Xth percentile or above for FEMA’s Risk Index (Source: FEMA
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.60) 
            & (self.df[self.NATIONAL_RISK_FIELD_NAME] > 0.40) 
        )

    def energy_factor(self) -> bool:
        # In Xth percentile or above for DOE’s energy cost burden score (Source: LEAD Score)
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40) 
            & (self.df[self.ENERGY_BURDEN_FIELD_NAME] > 0.40) 
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
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40) 
            & (self.df[self.ENERGY_BURDEN_FIELD_NAME] > 0.40) 
        )

    def housing_factor(self) -> bool:
        # In Xth percentile or above for lead paint (Source: Census's American Community Survey’s percent of housing units built pre-1960, used as an indicator of potential lead paint exposure in homes) 
        # or
        # In Xth percentile or above for housing cost burden (Source: HUD's Comprehensive Housing Affordability Strategy dataset
        # AND
        # Low income: In 60th percentile or above for percent of block group population 
        # of households where household income is less than or equal to twice the federal 
        # poverty level. Source: Census's American Community Survey]
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40) 
            & (self.df[self.ENERGY_BURDEN_FIELD_NAME] > 0.40) 
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
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40) 
            & (self.df[self.ENERGY_BURDEN_FIELD_NAME] > 0.40) 
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
        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40) 
            & (self.df[self.ENERGY_BURDEN_FIELD_NAME] > 0.40) 
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

        return ( 
            (self.df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40) 
            & (self.df[self.ENERGY_BURDEN_FIELD_NAME] > 0.40) 
        )
        