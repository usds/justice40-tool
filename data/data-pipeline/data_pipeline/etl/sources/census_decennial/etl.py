import json
import requests

import numpy as np
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names

pd.options.mode.chained_assignment = "raise"

logger = get_module_logger(__name__)


class CensusDecennialETL(ExtractTransformLoad):
    def __init__(self):
        self.DECENNIAL_YEAR = 2010
        self.OUTPUT_PATH = (
            self.DATA_PATH
            / "dataset"
            / f"census_decennial_{self.DECENNIAL_YEAR}"
        )

        # Income Fields
        # AS, GU, and MP all share the same variable names, but VI is different
        # https://api.census.gov/data/2010/dec/as.html
        # https://api.census.gov/data/2010/dec/gu/variables.html
        # https://api.census.gov/data/2010/dec/mp/variables.html
        # https://api.census.gov/data/2010/dec/vi/variables.html

        # Total population field is the same in all island areas
        self.TOTAL_POP_FIELD = self.TOTAL_POP_VI_FIELD = "P001001"
        self.TOTAL_POP_FIELD_NAME = "Total population in 2009"

        self.MEDIAN_INCOME_FIELD = "PBG049001"
        self.MEDIAN_INCOME_VI_FIELD = "PBG047001"
        self.MEDIAN_INCOME_FIELD_NAME = "Median household income in 2009 ($)"
        self.AREA_MEDIAN_INCOME_FIELD_NAME = (
            "Median household income as a percent of "
            "territory median income in 2009"
        )

        self.TERRITORY_MEDIAN_INCOME_FIELD = "Territory Median Income"

        self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD = "PBG083001"
        self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_VI_FIELD = (
            "PBG077001"
        )
        self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME = (
            "TOTAL; RATIO OF INCOME TO POVERTY LEVEL IN 2009"
        )

        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD = "PBG083010"
        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_VI_FIELD = "PBG077010"
        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD_NAME = (
            "Total!!2.00 and over; RATIO OF INCOME TO POVERTY LEVEL IN 2009"
        )

        self.PERCENTAGE_HOUSEHOLDS_BELOW_200_PERC_POVERTY_LEVEL_FIELD_NAME = (
            "Percentage households below 200% of federal poverty line in 2009"
        )

        # We will combine three fields to get households < 100% FPL.
        self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_ONE = (
            "PBG083002"  # Total!!Under .50
        )
        self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_TWO = (
            "PBG083003"  # Total!!.50 to .74
        )
        self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_THREE = (
            "PBG083004"  # Total!!.75 to .99
        )

        # Same fields, for Virgin Islands.
        self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_ONE = (
            "PBG077002"  # Total!!Under .50
        )
        self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_TWO = (
            "PBG077003"  # Total!!.50 to .74
        )
        self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_THREE = (
            "PBG077004"  # Total!!.75 to .99
        )

        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD = "PBG083010"
        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_VI_FIELD = "PBG077010"
        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD_NAME = (
            "Total!!2.00 and over; RATIO OF INCOME TO POVERTY LEVEL IN 2009"
        )

        self.PERCENTAGE_HOUSEHOLDS_BELOW_100_PERC_POVERTY_LEVEL_FIELD_NAME = (
            "Percentage households below 100% of federal poverty line in 2009"
        )

        # High School Education Fields
        self.TOTAL_POPULATION_FIELD = "PBG026001"
        self.TOTAL_POPULATION_VI_FIELD = "PCT032001"
        self.TOTAL_POPULATION_FIELD_NAME = "Total; SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER"

        self.MALE_HIGH_SCHOOL_ED_FIELD = "PBG026005"
        self.MALE_HIGH_SCHOOL_ED_VI_FIELD = "PCT032011"
        self.MALE_HIGH_SCHOOL_ED_FIELD_NAME = (
            "Total!!Male!!High school graduate, GED, or alternative; "
            "SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER"
        )

        self.FEMALE_HIGH_SCHOOL_ED_FIELD = "PBG026012"
        self.FEMALE_HIGH_SCHOOL_ED_VI_FIELD = "PCT032028"
        self.FEMALE_HIGH_SCHOOL_ED_FIELD_NAME = (
            "Total!!Female!!High school graduate, GED, or alternative; "
            "SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER"
        )

        self.PERCENTAGE_HIGH_SCHOOL_ED_FIELD_NAME = "Percent individuals age 25 or over with less than high school degree in 2009"

        # Employment fields
        self.EMPLOYMENT_MALE_IN_LABOR_FORCE_FIELD = (
            "PBG038003"  # Total!!Male!!In labor force
        )
        self.EMPLOYMENT_MALE_UNEMPLOYED_FIELD = (
            "PBG038007"  # Total!!Male!!In labor force!!Civilian!!Unemployed
        )
        self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_FIELD = (
            "PBG038010"  # Total!!Female!!In labor force
        )
        self.EMPLOYMENT_FEMALE_UNEMPLOYED_FIELD = (
            "PBG038014"  # Total!!Female!!In labor force!!Civilian!!Unemployed
        )

        # Same fields, Virgin Islands.
        self.EMPLOYMENT_MALE_IN_LABOR_FORCE_VI_FIELD = (
            "PBG036003"  # Total!!Male!!In labor force
        )
        self.EMPLOYMENT_MALE_UNEMPLOYED_VI_FIELD = (
            "PBG036007"  # Total!!Male!!In labor force!!Civilian!!Unemployed
        )
        self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_VI_FIELD = (
            "PBG036010"  # Total!!Female!!In labor force
        )
        self.EMPLOYMENT_FEMALE_UNEMPLOYED_VI_FIELD = (
            "PBG036014"  # Total!!Female!!In labor force!!Civilian!!Unemployed
        )

        self.UNEMPLOYMENT_FIELD_NAME = (
            field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009
        )

        var_list = [
            self.MEDIAN_INCOME_FIELD,
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD,
            self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD,
            self.TOTAL_POPULATION_FIELD,
            self.MALE_HIGH_SCHOOL_ED_FIELD,
            self.FEMALE_HIGH_SCHOOL_ED_FIELD,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_ONE,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_TWO,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_THREE,
            self.EMPLOYMENT_MALE_IN_LABOR_FORCE_FIELD,
            self.EMPLOYMENT_MALE_UNEMPLOYED_FIELD,
            self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_FIELD,
            self.EMPLOYMENT_FEMALE_UNEMPLOYED_FIELD,
            self.TOTAL_POP_FIELD,
        ]
        var_list = ",".join(var_list)

        var_list_vi = [
            self.MEDIAN_INCOME_VI_FIELD,
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_VI_FIELD,
            self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_VI_FIELD,
            self.TOTAL_POPULATION_VI_FIELD,
            self.MALE_HIGH_SCHOOL_ED_VI_FIELD,
            self.FEMALE_HIGH_SCHOOL_ED_VI_FIELD,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_ONE,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_TWO,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_THREE,
            self.EMPLOYMENT_MALE_IN_LABOR_FORCE_VI_FIELD,
            self.EMPLOYMENT_MALE_UNEMPLOYED_VI_FIELD,
            self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_VI_FIELD,
            self.EMPLOYMENT_FEMALE_UNEMPLOYED_VI_FIELD,
            self.TOTAL_POP_VI_FIELD,
        ]
        var_list_vi = ",".join(var_list_vi)

        self.FIELD_NAME_XWALK = {
            self.MEDIAN_INCOME_FIELD: self.MEDIAN_INCOME_FIELD_NAME,
            self.MEDIAN_INCOME_VI_FIELD: self.MEDIAN_INCOME_FIELD_NAME,
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD: self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME,
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_VI_FIELD: self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME,
            self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD: self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD_NAME,
            self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_VI_FIELD: self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD_NAME,
            self.TOTAL_POPULATION_FIELD: self.TOTAL_POPULATION_FIELD_NAME,
            self.TOTAL_POPULATION_VI_FIELD: self.TOTAL_POPULATION_FIELD_NAME,
            self.MALE_HIGH_SCHOOL_ED_FIELD: self.MALE_HIGH_SCHOOL_ED_FIELD_NAME,
            self.MALE_HIGH_SCHOOL_ED_VI_FIELD: self.MALE_HIGH_SCHOOL_ED_FIELD_NAME,
            self.FEMALE_HIGH_SCHOOL_ED_FIELD: self.FEMALE_HIGH_SCHOOL_ED_FIELD_NAME,
            self.FEMALE_HIGH_SCHOOL_ED_VI_FIELD: self.FEMALE_HIGH_SCHOOL_ED_FIELD_NAME,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_ONE: self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_ONE,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_ONE: self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_ONE,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_TWO: self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_TWO,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_TWO: self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_TWO,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_THREE: self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_THREE,
            self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_VI_PART_THREE: self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_THREE,
            self.EMPLOYMENT_MALE_IN_LABOR_FORCE_VI_FIELD: self.EMPLOYMENT_MALE_IN_LABOR_FORCE_FIELD,
            self.EMPLOYMENT_MALE_UNEMPLOYED_VI_FIELD: self.EMPLOYMENT_MALE_UNEMPLOYED_FIELD,
            self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_VI_FIELD: self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_FIELD,
            self.EMPLOYMENT_FEMALE_UNEMPLOYED_VI_FIELD: self.EMPLOYMENT_FEMALE_UNEMPLOYED_FIELD,
            self.EMPLOYMENT_MALE_IN_LABOR_FORCE_FIELD: self.EMPLOYMENT_MALE_IN_LABOR_FORCE_FIELD,
            self.EMPLOYMENT_MALE_UNEMPLOYED_FIELD: self.EMPLOYMENT_MALE_UNEMPLOYED_FIELD,
            self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_FIELD: self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_FIELD,
            self.EMPLOYMENT_FEMALE_UNEMPLOYED_FIELD: self.EMPLOYMENT_FEMALE_UNEMPLOYED_FIELD,
        }

        # To do: Ask Census Slack Group about whether you need to hardcode the county fips
        # https://uscensusbureau.slack.com/archives/C6DGLC05B/p1635218909012600
        self.ISLAND_TERRITORIES = [
            {
                "state_abbreviation": "as",
                "fips": "60",
                "county_fips": ["010", "020", "030", "040", "050"],
                "var_list": var_list,
                # Note: we hardcode the median income for each territory in this dict,
                # because that data is hard to programmatically access.
                self.TERRITORY_MEDIAN_INCOME_FIELD: 23892,
            },
            {
                "state_abbreviation": "gu",
                "fips": "66",
                "county_fips": ["010"],
                "var_list": var_list,
                self.TERRITORY_MEDIAN_INCOME_FIELD: 48274,
            },
            {
                "state_abbreviation": "mp",
                "fips": "69",
                "county_fips": ["085", "100", "110", "120"],
                "var_list": var_list,
                self.TERRITORY_MEDIAN_INCOME_FIELD: 19958,
            },
            {
                "state_abbreviation": "vi",
                "fips": "78",
                "county_fips": ["010", "020", "030"],
                "var_list": var_list_vi,
                self.TERRITORY_MEDIAN_INCOME_FIELD: 37254,
            },
        ]

        self.API_URL = (
            "https://api.census.gov/data/{}/dec/{}?get=NAME,{}"
            + "&for=tract:*&in=state:{}%20county:{}"
        )

        self.df: pd.DataFrame
        self.df_vi: pd.DataFrame
        self.df_all: pd.DataFrame

    def extract(self) -> None:
        dfs = []
        dfs_vi = []
        for island in self.ISLAND_TERRITORIES:
            logger.info(
                f"Downloading data for state/territory {island['state_abbreviation']}"
            )
            for county in island["county_fips"]:
                download = requests.get(
                    self.API_URL.format(
                        self.DECENNIAL_YEAR,
                        island["state_abbreviation"],
                        island["var_list"],
                        island["fips"],
                        county,
                    )
                )

                df = json.loads(download.content)
                # First row is the header
                df = pd.DataFrame(df[1:], columns=df[0])

                for col in island["var_list"].split(","):
                    # Converting appropriate variables to numeric.
                    # Also replacing 0s with NaNs
                    df[col] = pd.to_numeric(df[col])

                    # TO-DO: CHECK THIS. I think it makes sense to replace 0 with NaN
                    # because for our variables of interest (e.g. Median Household Income,
                    # it doesn't make sense for that to be 0.)
                    # Likely, it's actually missing but can't find a cite for that in the docs
                    df[col] = df[col].replace(0, np.nan)

                if island["state_abbreviation"] == "vi":
                    dfs_vi.append(df)
                else:
                    dfs.append(df)

        self.df = pd.concat(dfs)
        self.df_vi = pd.concat(dfs_vi)

    def transform(self) -> None:
        logger.info("Starting Census Decennial Transform")

        # Rename All Fields
        self.df.rename(columns=self.FIELD_NAME_XWALK, inplace=True)
        self.df_vi.rename(columns=self.FIELD_NAME_XWALK, inplace=True)

        # Combine the dfs after renaming
        self.df_all = pd.concat([self.df, self.df_vi])

        # Rename total population:
        self.df_all[self.TOTAL_POP_FIELD_NAME] = self.df_all[
            self.TOTAL_POP_FIELD
        ]

        # Percentage of households below 200% which is
        # [PBG083001 (total) - PBG083010 (num households over 200%)] / PBG083001 (total)
        self.df_all[
            self.PERCENTAGE_HOUSEHOLDS_BELOW_200_PERC_POVERTY_LEVEL_FIELD_NAME
        ] = (
            self.df_all[
                self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME
            ]
            - self.df_all[self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD_NAME]
        ) / self.df_all[
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME
        ]

        # Percentage of households below 100% FPL
        # which we get by adding `Total!!Under .50`, `Total!!.50 to .74`, ` Total!!.75 to .99`,
        # and then dividing by PBG083001 (total)
        self.df_all[
            self.PERCENTAGE_HOUSEHOLDS_BELOW_100_PERC_POVERTY_LEVEL_FIELD_NAME
        ] = (
            self.df_all[
                self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_ONE
            ]
            + self.df_all[
                self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_TWO
            ]
            + self.df_all[
                self.HOUSEHOLD_UNDER_100_PERC_POVERTY_LEVEL_FIELD_PART_THREE
            ]
        ) / self.df_all[
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME
        ]

        # Percentage High School Achievement is
        # Percentage = (Male + Female) / (Total)
        self.df_all[self.PERCENTAGE_HIGH_SCHOOL_ED_FIELD_NAME] = (
            self.df_all[self.MALE_HIGH_SCHOOL_ED_FIELD_NAME]
            + self.df_all[self.FEMALE_HIGH_SCHOOL_ED_FIELD_NAME]
        ) / self.df_all[self.TOTAL_POPULATION_FIELD_NAME]

        # Calculate employment.
        self.df_all[self.UNEMPLOYMENT_FIELD_NAME] = (
            self.df_all[self.EMPLOYMENT_MALE_UNEMPLOYED_FIELD]
            + self.df_all[self.EMPLOYMENT_FEMALE_UNEMPLOYED_FIELD]
        ) / (
            self.df_all[self.EMPLOYMENT_MALE_IN_LABOR_FORCE_FIELD]
            + self.df_all[self.EMPLOYMENT_FEMALE_IN_LABOR_FORCE_FIELD]
        )

        # Calculate area median income
        median_income_df = pd.DataFrame(self.ISLAND_TERRITORIES)
        median_income_df = median_income_df[
            ["fips", self.TERRITORY_MEDIAN_INCOME_FIELD]
        ]
        self.df_all = self.df_all.merge(
            right=median_income_df, left_on="state", right_on="fips", how="left"
        )
        self.df_all[self.AREA_MEDIAN_INCOME_FIELD_NAME] = (
            self.df_all[self.MEDIAN_INCOME_FIELD_NAME]
            / self.df_all[self.TERRITORY_MEDIAN_INCOME_FIELD]
        )

        # Creating Geo ID (Census Block Group) Field Name
        self.df_all[self.GEOID_TRACT_FIELD_NAME] = (
            self.df_all["state"] + self.df_all["county"] + self.df_all["tract"]
        )

        # Reporting Missing Values
        for col in self.df_all.columns:
            missing_value_count = self.df_all[col].isnull().sum()
            logger.info(
                f"There are {missing_value_count} missing values in the field {col} out of a total of {self.df_all.shape[0]} rows"
            )

    def load(self) -> None:
        logger.info("Saving Census Decennial Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        columns_to_include = [
            self.GEOID_TRACT_FIELD_NAME,
            self.TOTAL_POP_FIELD_NAME,
            self.MEDIAN_INCOME_FIELD_NAME,
            self.TERRITORY_MEDIAN_INCOME_FIELD,
            self.AREA_MEDIAN_INCOME_FIELD_NAME,
            self.PERCENTAGE_HOUSEHOLDS_BELOW_100_PERC_POVERTY_LEVEL_FIELD_NAME,
            self.PERCENTAGE_HOUSEHOLDS_BELOW_200_PERC_POVERTY_LEVEL_FIELD_NAME,
            self.PERCENTAGE_HIGH_SCHOOL_ED_FIELD_NAME,
            self.UNEMPLOYMENT_FIELD_NAME,
        ]

        self.df_all[columns_to_include].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
