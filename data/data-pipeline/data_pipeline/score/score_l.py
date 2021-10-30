from data_pipeline.score.score import *


class ScoreL(Score):
    def __init__(self, df: pd.DataFrame) -> None:
        self.LOW_INCOME_THRESHOLD: float = 0.60
        self.ENVIRONMENTAL_BURDEN_THRESHOLD: float = 0.90
        super().__init__(df)

    def add_columns(self) -> pd.DataFrame:
        self.df["Climate Factor (Definition L)"] = self._climate_factor()
        self.df["Energy Factor (Definition L)"] = self._energy_factor()
        self.df[
            "Transportation Factor (Definition L)"
        ] = self._transportation_factor()
        self.df["Housing Factor (Definition L)"] = self._housing_factor()
        self.df["Pollution Factor (Definition L)"] = self._pollution_factor()
        self.df["Water Factor (Definition L)"] = self._water_factor()
        self.df["Health Factor (Definition L)"] = self._health_factor()
        self.df["Workforce Factor (Definition L)"] = self._workforce_factor()

        factors = [
            "Climate Factor (Definition L)",
            "Energy Factor (Definition L)",
            "Transportation Factor (Definition L)",
            "Housing Factor (Definition L)",
            "Pollution Factor (Definition L)",
            "Water Factor (Definition L)",
            "Health Factor (Definition L)",
            "Workforce Factor (Definition L)",
        ]
        self.df["Definition L (communities)"] = self.df[factors].any(axis=1)

        # Note: this is purely used for comparison tool analysis, and can be removed at a later date. - LMB.
        non_workforce_factors = [
            "Climate Factor (Definition L)",
            "Energy Factor (Definition L)",
            "Transportation Factor (Definition L)",
            "Housing Factor (Definition L)",
            "Pollution Factor (Definition L)",
            "Water Factor (Definition L)",
            "Health Factor (Definition L)",
        ]
        self.df["Any Non-Workforce Factor (Definition L)"] = self.df[
            non_workforce_factors
        ].any(axis=1)

        return self.df

    def _climate_factor(self) -> bool:
        # In Xth percentile or above for FEMA’s Risk Index (Source: FEMA
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        return (
            self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD]
            > self.LOW_INCOME_THRESHOLD
        ) & (self.df[FN.FEMA_RISK_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)

    def _energy_factor(self) -> bool:
        # In Xth percentile or above for DOE’s energy cost burden score (Source: LEAD Score)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        return (
            self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD]
            > self.LOW_INCOME_THRESHOLD
        ) & (
            self.df[FN.ENERGY_BURDEN_FIELD]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

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
        transportation_criteria = (
            (self.df[FN.DIESEL_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[FN.PM25_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[FN.TRAFFIC_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
        )

        return (
            self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD]
            > self.LOW_INCOME_THRESHOLD
        ) & transportation_criteria

    def _housing_factor(self) -> bool:
        # In Xth percentile or above for lead paint (Source: Census's American Community Survey’s
        # percent of housing units built pre-1960, used as an indicator of potential lead paint exposure in homes)
        # or
        # In Xth percentile or above for housing cost burden (Source: HUD's Comprehensive Housing Affordability Strategy dataset
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        housing_criteria = (
            self.df[FN.LEAD_PAINT_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        ) | (
            self.df[FN.HOUSING_BURDEN_FIELD]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )
        return (
            self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD]
            > self.LOW_INCOME_THRESHOLD
        ) & housing_criteria

    def _pollution_factor(self) -> bool:
        # TBD
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        return False

    def _water_factor(self) -> bool:
        # In Xth percentile or above for wastewater discharge (Source: EPA Risk-Screening Environmental Indicators (RSEI) Model)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        return (
            self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD]
            > self.LOW_INCOME_THRESHOLD
        ) & (self.df[FN.WASTEWATER_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)

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

        health_criteria = (
            (self.df[FN.DIABETES_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (self.df[FN.ASTHMA_FIELD] > self.ENVIRONMENTAL_BURDEN_THRESHOLD)
            | (
                self.df[FN.HEART_DISEASE_FIELD]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[FN.LIFE_EXPECTANCY_FIELD]
                # Note: a high life expectancy is good, so take 1 minus the threshold to invert it,
                # and then look for life expenctancies lower than that (not greater than).
                < 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
        )
        return (
            self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD]
            > self.LOW_INCOME_THRESHOLD
        ) & health_criteria

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
        workforce_criteria = (
            (
                self.df[FN.UNEMPLOYMENT_FIELD]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[FN.MEDIAN_INCOME_PERCENT_AMI_FIELD]
                # Note: a high median income as a % of AMI is good, so take 1 minus the threshold to invert it.
                # and then look for median income lower than that (not greater than).
                < 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[FN.POVERTY_LESS_THAN_100_FPL_FIELD]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[FN.LINGUISTIC_ISO_FIELD]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
        )
        return (self.df[FN.HIGH_SCHOOL_ED_FIELD] > 0.05) & workforce_criteria
