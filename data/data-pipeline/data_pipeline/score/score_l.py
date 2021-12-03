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
        super().__init__(df)

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
        climate_criteria = (
            (
                self.df[
                    field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD_NAME
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD_NAME
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
        )

        return (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.LOW_INCOME_THRESHOLD
        ) & climate_criteria

    def _energy_factor(self) -> bool:
        # In Xth percentile or above for DOE’s energy cost burden score (Source: LEAD Score)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        energy_criteria = (
            self.df[
                field_names.ENERGY_BURDEN_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        ) | (
            self.df[
                field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        return (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.LOW_INCOME_THRESHOLD
        ) & energy_criteria

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
            self.df[
                field_names.DIESEL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        ) | (
            self.df[
                field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        return (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.LOW_INCOME_THRESHOLD
        ) & transportation_criteria

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
        housing_criteria = (
            (
                self.df[
                    field_names.LEAD_PAINT_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            & (
                self.df[
                    field_names.MEDIAN_HOUSE_VALUE_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                < self.MEDIAN_HOUSE_VALUE_THRESHOLD
            )
        ) | (
            self.df[
                field_names.HOUSING_BURDEN_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )
        return (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.LOW_INCOME_THRESHOLD
        ) & housing_criteria

    def _pollution_factor(self) -> bool:
        # Proximity to Risk Management Plan sites is > X
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]

        pollution_criteria = (
            self.df[field_names.RMP_FIELD + field_names.PERCENTILE_FIELD_SUFFIX]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        ) | (
            self.df[field_names.NPL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        ) | (
            self.df[field_names.TSDF_FIELD + field_names.PERCENTILE_FIELD_SUFFIX]
            >= self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

        return pollution_criteria & (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.LOW_INCOME_THRESHOLD
        )

    def _water_factor(self) -> bool:
        # In Xth percentile or above for wastewater discharge (Source: EPA Risk-Screening Environmental Indicators (RSEI) Model)
        # AND
        # Low income: In 60th percentile or above for percent of block group population
        # of households where household income is less than or equal to twice the federal
        # poverty level. Source: Census's American Community Survey]
        return (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.LOW_INCOME_THRESHOLD
        ) & (
            self.df[
                field_names.WASTEWATER_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            > self.ENVIRONMENTAL_BURDEN_THRESHOLD
        )

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
            (
                self.df[
                    field_names.DIABETES_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.ASTHMA_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.HEART_DISEASE_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.LIFE_EXPECTANCY_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                # Note: a high life expectancy is good, so take 1 minus the threshold to invert it,
                # and then look for life expenctancies lower than that (not greater than).
                < 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
        )
        return (
            self.df[
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
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
                self.df[
                    field_names.UNEMPLOYMENT_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.MEDIAN_INCOME_PERCENT_AMI_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                # Note: a high median income as a % of AMI is good, so take 1 minus the threshold to invert it.
                # and then look for median income lower than that (not greater than).
                < 1 - self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.POVERTY_LESS_THAN_100_FPL_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
            | (
                self.df[
                    field_names.LINGUISTIC_ISO_FIELD
                    + field_names.PERCENTILE_FIELD_SUFFIX
                ]
                > self.ENVIRONMENTAL_BURDEN_THRESHOLD
            )
        )
        return (
            self.df[field_names.HIGH_SCHOOL_ED_FIELD] > 0.10
        ) & workforce_criteria
