import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census_acs.etl_utils import (
    retrieve_census_acs_data,
)
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names

logger = get_module_logger(__name__)


class CensusACS2010ETL(ExtractTransformLoad):
    """Extract ACS data from 2010 or approximately that year.

    Note: Census ACS 2010 uses different fields than those captured in CensusACSETL.

    To support this, we created a separate class.
    """

    def __init__(self):
        self.ACS_YEAR = 2010
        self.ACS_TYPE = "acs5"
        self.OUTPUT_PATH = (
            self.DATA_PATH / "dataset" / f"census_acs_{self.ACS_YEAR}"
        )

        # Employment fields
        self.EMPLOYMENT_LESS_THAN_HS_UNEMPLOYED = (
            "B23006_007E"
            # Estimate!!Total!!Less than high school graduate!!In labor force!!Civilian!!Unemployed
        )
        self.EMPLOYMENT_HS_GRADUATE_UNEMPLOYED = (
            "B23006_014E"
            # Estimate!!Total!!High school graduate!!In labor force!!Civilian!!Unemployed
        )
        self.EMPLOYMENT_SOME_COLLEGE_UNEMPLOYED = (
            "B23006_021E"
            # Estimate!!Total!!Some college or associate's degree!!In labor force!!Civilian!!Unemployed
        )
        self.EMPLOYMENT_COLLEGE_UNEMPLOYED = (
            "B23006_028E"
            # Estimate!!Total!!Bachelor's degree or higher!!In labor force!!Civilian!!Unemployed
        )

        self.UNEMPLOYED_FIELDS = [
            self.EMPLOYMENT_LESS_THAN_HS_UNEMPLOYED,
            self.EMPLOYMENT_HS_GRADUATE_UNEMPLOYED,
            self.EMPLOYMENT_SOME_COLLEGE_UNEMPLOYED,
            self.EMPLOYMENT_COLLEGE_UNEMPLOYED,
        ]

        self.EMPLOYMENT_LESS_THAN_HS_IN_LABOR_FORCE = (
            "B23006_005E"
            # Estimate!!Total!!Less than high school graduate!!In labor force!!Civilian
        )
        self.EMPLOYMENT_HS_GRADUATE_IN_LABOR_FORCE = (
            "B23006_010E"
            # Estimate!!Total!!High school graduate!!In labor force
        )
        self.EMPLOYMENT_SOME_COLLEGE_IN_LABOR_FORCE = (
            "B23006_017E"
            # Estimate!!Total!!Some college or associate's degree!!In labor force
        )
        self.EMPLOYMENT_COLLEGE_IN_LABOR_FORCE = (
            "B23006_024E"
            # Estimate!!Total!!Bachelor's degree or higher!!In labor force
        )

        self.IN_LABOR_FORCE_FIELDS = [
            self.EMPLOYMENT_LESS_THAN_HS_IN_LABOR_FORCE,
            self.EMPLOYMENT_HS_GRADUATE_IN_LABOR_FORCE,
            self.EMPLOYMENT_SOME_COLLEGE_IN_LABOR_FORCE,
            self.EMPLOYMENT_COLLEGE_IN_LABOR_FORCE,
        ]

        self.UNEMPLOYED_FIELD_NAME = "Unemployment (percent)"

        self.POVERTY_FIELDS = [
            "C17002_001E",  # Estimate!!Total,
            "C17002_002E",  # Estimate!!Total!!Under .50
            "C17002_003E",  # Estimate!!Total!!.50 to .99
            "C17002_004E",  # Estimate!!Total!!1.00 to 1.24
            "C17002_005E",  # Estimate!!Total!!1.25 to 1.49
            "C17002_006E",  # Estimate!!Total!!1.50 to 1.84
            "C17002_007E",  # Estimate!!Total!!1.85 to 1.99
        ]

        self.POVERTY_LESS_THAN_100_PERCENT_FPL_FIELD_NAME = (
            "Percent of individuals < 100% Federal Poverty Line"
        )
        self.POVERTY_LESS_THAN_150_PERCENT_FPL_FIELD_NAME = (
            "Percent of individuals < 150% Federal Poverty Line"
        )
        self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME = (
            "Percent of individuals < 200% Federal Poverty Line"
        )

        self.STATE_GEOID_FIELD_NAME = "GEOID2"

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting Census 2010 ACS Transform")
        # Define the variables to retrieve
        variables = (
            self.UNEMPLOYED_FIELDS
            + self.IN_LABOR_FORCE_FIELDS
            + self.POVERTY_FIELDS
        )

        # Use the method defined on CensusACSETL to reduce coding redundancy.
        self.df = retrieve_census_acs_data(
            acs_year=self.ACS_YEAR,
            variables=variables,
            tract_output_field_name=self.GEOID_TRACT_FIELD_NAME,
            data_path_for_fips_codes=self.DATA_PATH,
            acs_type=self.ACS_TYPE,
        )

    def transform(self) -> None:
        logger.info("Starting Census 2010 ACS Transform")

        df = self.df

        # Calculate percent unemployment.
        # TODO: remove small-sample data that should be `None` instead of a high-variance fraction.
        unemployed_totals = df[self.UNEMPLOYED_FIELDS].sum(axis=1)
        labor_force_totals = df[self.IN_LABOR_FORCE_FIELDS].sum(axis=1)

        df[self.UNEMPLOYED_FIELD_NAME] = unemployed_totals / labor_force_totals

        # Calculate percent at different poverty thresholds
        df[self.POVERTY_LESS_THAN_100_PERCENT_FPL_FIELD_NAME] = (
            df["C17002_002E"] + df["C17002_003E"]
        ) / df["C17002_001E"]

        df[self.POVERTY_LESS_THAN_150_PERCENT_FPL_FIELD_NAME] = (
            df["C17002_002E"]
            + df["C17002_003E"]
            + df["C17002_004E"]
            + df["C17002_005E"]
        ) / df["C17002_001E"]

        df[self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME] = (
            df["C17002_002E"]
            + df["C17002_003E"]
            + df["C17002_004E"]
            + df["C17002_005E"]
            + df["C17002_006E"]
            + df["C17002_007E"]
        ) / df["C17002_001E"]

        columns_to_include = [
            self.GEOID_TRACT_FIELD_NAME,
            self.UNEMPLOYED_FIELD_NAME,
            self.POVERTY_LESS_THAN_100_PERCENT_FPL_FIELD_NAME,
            self.POVERTY_LESS_THAN_150_PERCENT_FPL_FIELD_NAME,
            self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME,
        ]

        output_df = df[columns_to_include]

        # Add the year to the end of every column, so when it's all joined in the
        # score df, it's obvious which year this data is from.
        for column in columns_to_include:
            if column != self.GEOID_TRACT_FIELD_NAME:
                output_df = output_df.rename(
                    columns={
                        column: f"{column} in {self.ACS_YEAR}",
                    }
                )

        # rename columns to be used in score
        rename_fields = {
            "Percent of individuals < 100% Federal Poverty Line in 2010": field_names.CENSUS_POVERTY_LESS_THAN_100_FPL_FIELD_2010,
        }
        output_df.rename(
            columns=rename_fields,
            inplace=True,
            errors="raise",
        )

        # Save results to self.
        self.df = output_df

    def load(self) -> None:
        logger.info("Saving Census 2010 ACS Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
