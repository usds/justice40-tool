import json
import requests

import numpy as np
import pandas as pd
import censusdata

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class CensusDecennialETL(ExtractTransformLoad):
    def __init__(self):
        self.DECENNIAL_YEAR = 2010
        self.OUTPUT_PATH = (
            self.DATA_PATH / "dataset" / f"census_dec_{self.DECENNIAL_YEAR}"
        )

        # Income Fields
        # AS, GU, and MP all share the same variable names, but VI is different
        # https://api.census.gov/data/2010/dec/as.html
        # https://api.census.gov/data/2010/dec/gu/variables.html
        # https://api.census.gov/data/2010/dec/mp/variables.html
        # https://api.census.gov/data/2010/dec/vi/variables.html
        self.MEDIAN_INCOME_FIELD = "PBG049001"
        self.MEDIAN_INCOME_VI_FIELD = "PBG047001"
        self.MEDIAN_INCOME_FIELD_NAME = "MEDIAN HOUSEHOLD INCOME IN 2009 (DOLLARS)"
        
        self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD = "PBG083001"
        self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_VI_FIELD = "PBG077001"
        self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME = "TOTAL; RATIO OF INCOME TO POVERTY LEVEL IN 2009"

        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD = "PBG083010"
        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_VI_FIELD = "PBG077010"
        self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD_NAME = "Total!!2.00 and over; RATIO OF INCOME TO POVERTY LEVEL IN 2009"

        self.PERCENTAGE_HOUSEHOLDS_BELOW_200_PERC_POVERTY_LEVEL_FIELD_NAME = 'PERCENTAGE_HOUSEHOLDS_BELOW_200_PERC_POVERTY_LEVEL'

        # High School Education Fields
        self.TOTAL_POPULATION_FIELD = "PBG026001"
        self.TOTAL_POPULATION_VI_FIELD = "PCT032001"
        self.TOTAL_POPULATION_FIELD_NAME = "Total; SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER"

        self.MALE_HIGH_SCHOOL_ED_FIELD = "PBG026005"
        self.MALE_HIGH_SCHOOL_ED_VI_FIELD = "PCT032011"
        self.MALE_HIGH_SCHOOL_ED_FIELD_NAME = "Total!!Male!!High school graduate, GED, or alternative; SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER"

        self.FEMALE_HIGH_SCHOOL_ED_FIELD = "PBG026012"
        self.FEMALE_HIGH_SCHOOL_ED_VI_FIELD = "PCT032028"
        self.FEMALE_HIGH_SCHOOL_ED_FIELD_NAME = "Total!!Female!!High school graduate, GED, or alternative; SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER"

        self.PERCENTAGE_HIGH_SCHOOL_ED_FIELD_NAME = "PERCENTAGE_HIGH_SCHOOL_ED_FIELD_NAME"

        var_list = [
            self.MEDIAN_INCOME_FIELD,
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD,
            self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD,
            self.TOTAL_POPULATION_FIELD,
            self.MALE_HIGH_SCHOOL_ED_FIELD,
            self.FEMALE_HIGH_SCHOOL_ED_FIELD,
        ]
        var_list = ",".join(var_list)

        var_list_vi = [
            self.MEDIAN_INCOME_VI_FIELD,
            self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_VI_FIELD,
            self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_VI_FIELD,
            self.TOTAL_POPULATION_VI_FIELD,
            self.MALE_HIGH_SCHOOL_ED_VI_FIELD,
            self.FEMALE_HIGH_SCHOOL_ED_VI_FIELD,
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
        }


        # To do: Ask Census Slack Group about whether you need to hardcode the county fips
        # https://uscensusbureau.slack.com/archives/C6DGLC05B/p1635218909012600
        self.ISLAND_TERRITORIES = [
            {'state_abbreviation': 'as', 'fips': '60', 'county_fips': ['010', '020', '030', '040', '050'], 'var_list': var_list},
            {'state_abbreviation': 'gu', 'fips': '66', 'county_fips': ['010'], 'var_list': var_list},
            {'state_abbreviation': 'mp', 'fips': '69', 'county_fips': ['085', '100', '110', '120'], 'var_list': var_list},
            {'state_abbreviation': 'vi', 'fips': '78', 'county_fips': ['010', '020', '030'], 'var_list': var_list_vi},
        ]

        self.API_URL = "https://api.census.gov/data/{}/dec/{}?get=NAME,{}" + "&for=block%20group:*&in=state:{}%20county:{}"

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
            for county in island['county_fips']:
                download = requests.get(self.API_URL.format(self.DECENNIAL_YEAR, island['state_abbreviation'], island['var_list'], island['fips'], county))

                df = json.loads(download.content)
                # First row is the header
                df = pd.DataFrame(df[1:], columns=df[0])
                # new_header = df.iloc[0]
                # df = df[1:]
                # df.columns = new_header

                
                for col in island['var_list'].split(","):
                    # Converting appropriate variables to numeric.
                    # Also replacing 0s with NaNs
                    df[col] = pd.to_numeric(df[col]) 

                    # TO-DO: CHECK THIS. I think it makes sense to replace 0 with NaN because for our variables of interest (e.g. Median Household Income, it doesn't make sense for that to be 0.) Likely, it's actually missing but can't find a cite for that in the docs
                    df[col] = df[col].replace(0, np.nan)

                if island['state_abbreviation'] == 'vi':
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

        # Percentage of households below 200% which is
        # [PBG083001 (total) - PBG083010 (num households over 200%)] / PBG083001 (total)
        self.df_all[self.PERCENTAGE_HOUSEHOLDS_BELOW_200_PERC_POVERTY_LEVEL_FIELD_NAME] = (self.df_all[self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME] - self.df_all[self.HOUSEHOLD_OVER_200_PERC_POVERTY_LEVEL_FIELD_NAME]) / self.df_all[self.TOTAL_HOUSEHOLD_RATIO_INCOME_TO_POVERTY_LEVEL_FIELD_NAME]

        # Percentage High School Achievement is
        # Percentage = (Male + Female) / (Total)
        self.df_all[self.PERCENTAGE_HIGH_SCHOOL_ED_FIELD_NAME] = (self.df_all[self.MALE_HIGH_SCHOOL_ED_FIELD_NAME] + self.df_all[self.FEMALE_HIGH_SCHOOL_ED_FIELD_NAME]) / self.df_all[self.TOTAL_POPULATION_FIELD_NAME]

        # Creating Geo ID (Census Block Group) Field Name
        self.df_all[self.GEOID_FIELD_NAME] = self.df_all['state'] + self.df_all['county'] + self.df_all['tract'] + self.df_all['block group']

        # Reporting Missing Values
        for col in self.df_all.columns:
            missing_value_count = self.df_all[col].isnull().sum()
            logger.info("There are {} missing values in the field {} out of a total of {} rows".format(missing_value_count, col, self.df_all.shape[0]))


    def load(self) -> None:
        logger.info("Saving Census Decennial Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        columns_to_include = [
            self.GEOID_FIELD_NAME,
            self.MEDIAN_INCOME_FIELD_NAME,
            self.PERCENTAGE_HOUSEHOLDS_BELOW_200_PERC_POVERTY_LEVEL_FIELD_NAME,
            self.PERCENTAGE_HIGH_SCHOOL_ED_FIELD_NAME,
        ]

        self.df_all[columns_to_include].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )

    def validate(self) -> None:
        logger.info("Validating Census Decennial Data")

        pass
