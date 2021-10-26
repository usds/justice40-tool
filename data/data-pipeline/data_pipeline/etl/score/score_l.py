from data_pipeline.etl.score.score import Score

class ScoreL(Score):
    def columns(self):
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