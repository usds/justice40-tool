import os
from collections import namedtuple

import geopandas as gpd
import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census_acs.etl_imputations import (
    calculate_income_measures,
)
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.utils import unzip_file_from_url
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import CensusDataSource

logger = get_module_logger(__name__)

# because now there is a requirement for the us.json, this will port from
# AWS when a local copy does not exist.
CENSUS_DATA_S3_URL = settings.AWS_JUSTICE40_DATASOURCES_URL + "/census.zip"


class CensusACSETL(ExtractTransformLoad):
    NAME = "census_acs"
    ACS_YEAR = 2019
    MINIMUM_POPULATION_REQUIRED_FOR_IMPUTATION = 1

    def __init__(self):

        self.census_acs_source = self.get_sources_path() / "acs.csv"

        self.TOTAL_UNEMPLOYED_FIELD = "B23025_005E"
        self.TOTAL_IN_LABOR_FORCE = "B23025_003E"
        self.EMPLOYMENT_FIELDS = [
            self.TOTAL_UNEMPLOYED_FIELD,
            self.TOTAL_IN_LABOR_FORCE,
        ]
        self.UNEMPLOYED_FIELD_NAME = "Unemployment (percent)"

        self.LINGUISTIC_ISOLATION_FIELD_NAME = "Linguistic isolation (percent)"
        self.LINGUISTIC_ISOLATION_TOTAL_FIELD_NAME = (
            "Linguistic isolation (total)"
        )
        self.LINGUISTIC_ISOLATION_FIELDS = [
            "C16002_001E",  # Estimate!!Total
            "C16002_004E",  # Estimate!!Total!!Spanish!!Limited English speaking household
            "C16002_007E",  # Estimate!!Total!!Other Indo-European languages!!Limited English speaking household
            "C16002_010E",  # Estimate!!Total!!Asian and Pacific Island languages!!Limited English speaking household
            "C16002_013E",  # Estimate!!Total!!Other languages!!Limited English speaking household
        ]
        self.MEDIAN_INCOME_FIELD = "B19013_001E"
        self.MEDIAN_INCOME_FIELD_NAME = (
            "Median household income in the past 12 months"
        )
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
        self.IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME = (
            "Percent of individuals < 200% Federal Poverty Line, imputed"
        )

        self.ADJUSTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME = (
            "Adjusted percent of individuals < 200% Federal Poverty Line"
        )

        self.ADJUSTED_AND_IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME_PRELIMINARY = (
            "Preliminary adjusted percent of individuals < 200% Federal Poverty Line,"
            + " imputed"
        )

        self.ADJUSTED_AND_IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME = (
            "Adjusted percent of individuals < 200% Federal Poverty Line,"
            + " imputed"
        )

        self.MEDIAN_HOUSE_VALUE_FIELD = "B25077_001E"
        self.MEDIAN_HOUSE_VALUE_FIELD_NAME = (
            "Median value ($) of owner-occupied housing units"
        )

        # Educational attainment figures
        self.EDUCATION_POPULATION_OVER_25 = "B15003_001E"  # Estimate!!Total
        self.EDUCATION_NO_SCHOOLING = (
            "B15003_002E"  # Estimate!!Total!!No schooling completed
        )
        self.EDUCATION_NURSERY = (
            "B15003_003E"  # Estimate!!Total!!Nursery school
        )
        self.EDUCATION_KINDERGARTEN = (
            "B15003_004E"  # Estimate!!Total!!Kindergarten
        )
        self.EDUCATION_FIRST = "B15003_005E"  # Estimate!!Total!!1st grade
        self.EDUCATION_SECOND = "B15003_006E"  # Estimate!!Total!!2nd grade
        self.EDUCATION_THIRD = "B15003_007E"  # Estimate!!Total!!3rd grade
        self.EDUCATION_FOURTH = "B15003_008E"  # Estimate!!Total!!4th grade
        self.EDUCATION_FIFTH = "B15003_009E"  # Estimate!!Total!!5th grade
        self.EDUCATION_SIXTH = "B15003_010E"  # Estimate!!Total!!6th grade
        self.EDUCATION_SEVENTH = "B15003_011E"  # Estimate!!Total!!7th grade
        self.EDUCATION_EIGHTH = "B15003_012E"  # Estimate!!Total!!8th grade
        self.EDUCATION_NINTH = "B15003_013E"  # Estimate!!Total!!9th grade
        self.EDUCATION_TENTH = "B15003_014E"  # Estimate!!Total!!10th grade
        self.EDUCATION_ELEVENTH = "B15003_015E"  # Estimate!!Total!!11th grade
        self.EDUCATION_TWELFTH_NO_DIPLOMA = (
            "B15003_016E"  # Estimate!!Total!!12th grade, no diploma
        )

        self.EDUCATIONAL_FIELDS = [
            self.EDUCATION_POPULATION_OVER_25,
            self.EDUCATION_NO_SCHOOLING,
            self.EDUCATION_NURSERY,
            self.EDUCATION_KINDERGARTEN,
            self.EDUCATION_FIRST,
            self.EDUCATION_SECOND,
            self.EDUCATION_THIRD,
            self.EDUCATION_FOURTH,
            self.EDUCATION_FIFTH,
            self.EDUCATION_SIXTH,
            self.EDUCATION_SEVENTH,
            self.EDUCATION_EIGHTH,
            self.EDUCATION_NINTH,
            self.EDUCATION_TENTH,
            self.EDUCATION_ELEVENTH,
            self.EDUCATION_TWELFTH_NO_DIPLOMA,
        ]

        self.HIGH_SCHOOL_ED_RAW_COUNT_FIELD = (
            "Individuals age 25 or over with less than high school degree"
        )
        self.HIGH_SCHOOL_ED_FIELD = "Percent individuals age 25 or over with less than high school degree"

        # College attendance fields
        self.COLLEGE_ATTENDANCE_TOTAL_POPULATION_ASKED = (
            "B14004_001E"  # Estimate!!Total
        )
        self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PUBLIC = "B14004_003E"  # Estimate!!Total!!Male!!Enrolled in public college or graduate school
        self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PRIVATE = "B14004_008E"  # Estimate!!Total!!Male!!Enrolled in private college or graduate school
        self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PUBLIC = "B14004_019E"  # Estimate!!Total!!Female!!Enrolled in public college or graduate school
        self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PRIVATE = "B14004_024E"  # Estimate!!Total!!Female!!Enrolled in private college or graduate school

        self.COLLEGE_ATTENDANCE_FIELDS = [
            self.COLLEGE_ATTENDANCE_TOTAL_POPULATION_ASKED,
            self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PUBLIC,
            self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PRIVATE,
            self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PUBLIC,
            self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PRIVATE,
        ]

        self.COLLEGE_ATTENDANCE_FIELD = (
            "Percent enrollment in college or graduate school"
        )

        self.IMPUTED_COLLEGE_ATTENDANCE_FIELD = (
            "Percent enrollment in college or graduate school, imputed"
        )

        self.COLLEGE_NON_ATTENDANCE_FIELD = "Percent of population not currently enrolled in college or graduate school"

        self.RE_FIELDS = [
            "B02001_001E",
            "B02001_002E",
            "B02001_003E",
            "B02001_004E",
            "B02001_005E",
            "B02001_006E",
            "B02001_007E",
            "B02001_008E",
            "B02001_009E",
            "B02001_010E",
            "B03002_001E",
            "B03002_003E",
            "B03003_001E",
            "B03003_003E",
            "B02001_007E",  # "Some other race alone"
        ]

        self.BLACK_FIELD_NAME = "Black or African American"
        self.AMERICAN_INDIAN_FIELD_NAME = "American Indian / Alaska Native"
        self.ASIAN_FIELD_NAME = "Asian"
        self.HAWAIIAN_FIELD_NAME = "Native Hawaiian or Pacific"
        self.TWO_OR_MORE_RACES_FIELD_NAME = "two or more races"
        self.NON_HISPANIC_WHITE_FIELD_NAME = "White"
        self.HISPANIC_FIELD_NAME = "Hispanic or Latino"
        # Note that `other` is lowercase because the whole field will show up in the download
        # file as "Percent other races"
        self.OTHER_RACE_FIELD_NAME = "other races"

        self.TOTAL_RACE_POPULATION_FIELD_NAME = (
            "Total population surveyed on racial data"
        )

        # Name output demographics fields.
        self.RE_OUTPUT_FIELDS = [
            self.BLACK_FIELD_NAME,
            self.AMERICAN_INDIAN_FIELD_NAME,
            self.ASIAN_FIELD_NAME,
            self.HAWAIIAN_FIELD_NAME,
            self.TWO_OR_MORE_RACES_FIELD_NAME,
            self.NON_HISPANIC_WHITE_FIELD_NAME,
            self.HISPANIC_FIELD_NAME,
            self.OTHER_RACE_FIELD_NAME,
        ]

        # Note: this field does double-duty here. It's used as the total population
        # within the age questions.
        # It's also what EJScreen used as their variable for total population in the
        # census tract, so we use it similarly.
        # See p. 83 of https://www.epa.gov/sites/default/files/2021-04/documents/ejscreen_technical_document.pdf
        self.TOTAL_POPULATION_FROM_AGE_TABLE = "B01001_001E"  # Estimate!!Total:

        self.AGE_INPUT_FIELDS = [
            self.TOTAL_POPULATION_FROM_AGE_TABLE,
            "B01001_003E",  # Estimate!!Total:!!Male:!!Under 5 years
            "B01001_004E",  # Estimate!!Total:!!Male:!!5 to 9 years
            "B01001_005E",  # Estimate!!Total:!!Male:!!10 to 14 years
            "B01001_006E",  # Estimate!!Total:!!Male:!!15 to 17 years
            "B01001_007E",  # Estimate!!Total:!!Male:!!18 and 19 years
            "B01001_008E",  # Estimate!!Total:!!Male:!!20 years
            "B01001_009E",  # Estimate!!Total:!!Male:!!21 years
            "B01001_010E",  # Estimate!!Total:!!Male:!!22 to 24 years
            "B01001_011E",  # Estimate!!Total:!!Male:!!25 to 29 years
            "B01001_012E",  # Estimate!!Total:!!Male:!!30 to 34 years
            "B01001_013E",  # Estimate!!Total:!!Male:!!35 to 39 years
            "B01001_014E",  # Estimate!!Total:!!Male:!!40 to 44 years
            "B01001_015E",  # Estimate!!Total:!!Male:!!45 to 49 years
            "B01001_016E",  # Estimate!!Total:!!Male:!!50 to 54 years
            "B01001_017E",  # Estimate!!Total:!!Male:!!55 to 59 years
            "B01001_018E",  # Estimate!!Total:!!Male:!!60 and 61 years
            "B01001_019E",  # Estimate!!Total:!!Male:!!62 to 64 years
            "B01001_020E",  # Estimate!!Total:!!Male:!!65 and 66 years
            "B01001_021E",  # Estimate!!Total:!!Male:!!67 to 69 years
            "B01001_022E",  # Estimate!!Total:!!Male:!!70 to 74 years
            "B01001_023E",  # Estimate!!Total:!!Male:!!75 to 79 years
            "B01001_024E",  # Estimate!!Total:!!Male:!!80 to 84 years
            "B01001_025E",  # Estimate!!Total:!!Male:!!85 years and over
            "B01001_027E",  # Estimate!!Total:!!Female:!!Under 5 years
            "B01001_028E",  # Estimate!!Total:!!Female:!!5 to 9 years
            "B01001_029E",  # Estimate!!Total:!!Female:!!10 to 14 years
            "B01001_030E",  # Estimate!!Total:!!Female:!!15 to 17 years
            "B01001_031E",  # Estimate!!Total:!!Female:!!18 and 19 years
            "B01001_032E",  # Estimate!!Total:!!Female:!!20 years
            "B01001_033E",  # Estimate!!Total:!!Female:!!21 years
            "B01001_034E",  # Estimate!!Total:!!Female:!!22 to 24 years
            "B01001_035E",  # Estimate!!Total:!!Female:!!25 to 29 years
            "B01001_036E",  # Estimate!!Total:!!Female:!!30 to 34 years
            "B01001_037E",  # Estimate!!Total:!!Female:!!35 to 39 years
            "B01001_038E",  # Estimate!!Total:!!Female:!!40 to 44 years
            "B01001_039E",  # Estimate!!Total:!!Female:!!45 to 49 years
            "B01001_040E",  # Estimate!!Total:!!Female:!!50 to 54 years
            "B01001_041E",  # Estimate!!Total:!!Female:!!55 to 59 years
            "B01001_042E",  # Estimate!!Total:!!Female:!!60 and 61 years
            "B01001_043E",  # Estimate!!Total:!!Female:!!62 to 64 years
            "B01001_044E",  # Estimate!!Total:!!Female:!!65 and 66 years
            "B01001_045E",  # Estimate!!Total:!!Female:!!67 to 69 years
            "B01001_046E",  # Estimate!!Total:!!Female:!!70 to 74 years
            "B01001_047E",  # Estimate!!Total:!!Female:!!75 to 79 years
            "B01001_048E",  # Estimate!!Total:!!Female:!!80 to 84 years
            "B01001_049E",  # Estimate!!Total:!!Female:!!85 years and over
        ]

        self.AGE_OUTPUT_FIELDS = [
            field_names.PERCENT_AGE_UNDER_10,
            field_names.PERCENT_AGE_10_TO_64,
            field_names.PERCENT_AGE_OVER_64,
        ]

        self.STATE_GEOID_FIELD_NAME = "GEOID2"

        self.COLUMNS_TO_KEEP = (
            [
                self.GEOID_TRACT_FIELD_NAME,
                field_names.TOTAL_POP_FIELD,
                self.UNEMPLOYED_FIELD_NAME,
                self.LINGUISTIC_ISOLATION_FIELD_NAME,
                self.MEDIAN_INCOME_FIELD_NAME,
                self.POVERTY_LESS_THAN_100_PERCENT_FPL_FIELD_NAME,
                self.POVERTY_LESS_THAN_150_PERCENT_FPL_FIELD_NAME,
                self.IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME,
                self.MEDIAN_HOUSE_VALUE_FIELD_NAME,
                self.HIGH_SCHOOL_ED_FIELD,
                self.COLLEGE_ATTENDANCE_FIELD,
                self.COLLEGE_NON_ATTENDANCE_FIELD,
                self.IMPUTED_COLLEGE_ATTENDANCE_FIELD,
                field_names.IMPUTED_INCOME_FLAG_FIELD_NAME,
            ]
            + self.RE_OUTPUT_FIELDS
            + [
                field_names.PERCENT_PREFIX + field
                for field in self.RE_OUTPUT_FIELDS
            ]
            + self.AGE_OUTPUT_FIELDS
            + [
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD,
                field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD,
            ]
        )

        self.df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        # Define the variables to retrieve
        variables = (
            [
                self.MEDIAN_INCOME_FIELD,
                self.MEDIAN_HOUSE_VALUE_FIELD,
            ]
            + self.EMPLOYMENT_FIELDS
            + self.LINGUISTIC_ISOLATION_FIELDS
            + self.POVERTY_FIELDS
            + self.EDUCATIONAL_FIELDS
            + self.RE_FIELDS
            + self.COLLEGE_ATTENDANCE_FIELDS
            + self.AGE_INPUT_FIELDS
        )

        return [
            CensusDataSource(
                source=None,
                destination=self.census_acs_source,
                acs_year=self.ACS_YEAR,
                variables=variables,
                tract_output_field_name=self.GEOID_TRACT_FIELD_NAME,
                data_path_for_fips_codes=self.DATA_PATH,
                acs_type="acs5",
            )
        ]

    # pylint: disable=too-many-arguments
    def _merge_geojson(
        self,
        df: pd.DataFrame,
        usa_geo_df: gpd.GeoDataFrame,
        geoid_field: str = "GEOID10",
        geometry_field: str = "geometry",
        state_code_field: str = "STATEFP10",
        county_code_field: str = "COUNTYFP10",
    ) -> gpd.GeoDataFrame:
        usa_geo_df[geoid_field] = (
            usa_geo_df[geoid_field].astype(str).str.zfill(11)
        )
        return gpd.GeoDataFrame(
            df.merge(
                usa_geo_df[
                    [
                        geoid_field,
                        geometry_field,
                        state_code_field,
                        county_code_field,
                    ]
                ],
                left_on=[self.GEOID_TRACT_FIELD_NAME],
                right_on=[geoid_field],
            )
        )

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df = pd.read_csv(
            self.census_acs_source,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
        )

    def transform(self) -> None:
        df = self.df

        # Here we join the geometry of the US to the dataframe so that we can impute
        # The income of neighbors. first this looks locally; if there's no local
        # geojson file for all of the US, this will read it off of S3
        logger.debug("Reading in geojson for the country")
        if not os.path.exists(
            self.DATA_PATH / "census" / "geojson" / "us.json"
        ):
            logger.debug("Fetching Census data from AWS S3")
            unzip_file_from_url(
                CENSUS_DATA_S3_URL,
                self.DATA_PATH / "tmp",
                self.DATA_PATH,
            )

        geo_df = gpd.read_file(
            self.DATA_PATH / "census" / "geojson" / "us.json",
        )

        df = self._merge_geojson(
            df=df,
            usa_geo_df=geo_df,
        )

        # Rename some fields.
        df = df.rename(
            columns={
                self.MEDIAN_HOUSE_VALUE_FIELD: self.MEDIAN_HOUSE_VALUE_FIELD_NAME,
                self.MEDIAN_INCOME_FIELD: self.MEDIAN_INCOME_FIELD_NAME,
                self.TOTAL_POPULATION_FROM_AGE_TABLE: field_names.TOTAL_POP_FIELD,
            },
            errors="raise",
        )

        # Handle null values for various fields, which are `-666666666`.
        for field in [
            self.MEDIAN_INCOME_FIELD_NAME,
            self.MEDIAN_HOUSE_VALUE_FIELD_NAME,
        ]:
            missing_value_count = sum(df[field] == -666666666)
            logger.debug(
                f"There are {missing_value_count} ({int(100*missing_value_count/df[field].count())}%) values of "
                + f"`{field}` being marked as null values."
            )
            df[field] = df[field].replace(to_replace=-666666666, value=None)

        # Calculate percent unemployment.
        # TODO: remove small-sample data that should be `None` instead of a high-variance fraction.
        df[self.UNEMPLOYED_FIELD_NAME] = (
            df[self.TOTAL_UNEMPLOYED_FIELD] / df[self.TOTAL_IN_LABOR_FORCE]
        )

        # Calculate linguistic isolation.
        individual_limited_english_fields = [
            "C16002_004E",
            "C16002_007E",
            "C16002_010E",
            "C16002_013E",
        ]

        df[self.LINGUISTIC_ISOLATION_TOTAL_FIELD_NAME] = df[
            individual_limited_english_fields
        ].sum(axis=1, skipna=True)
        df[self.LINGUISTIC_ISOLATION_FIELD_NAME] = (
            df[self.LINGUISTIC_ISOLATION_TOTAL_FIELD_NAME].astype(float)
            / df["C16002_001E"]
        )

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

        # Calculate educational attainment
        educational_numerator_fields = [
            self.EDUCATION_NO_SCHOOLING,
            self.EDUCATION_NURSERY,
            self.EDUCATION_KINDERGARTEN,
            self.EDUCATION_FIRST,
            self.EDUCATION_SECOND,
            self.EDUCATION_THIRD,
            self.EDUCATION_FOURTH,
            self.EDUCATION_FIFTH,
            self.EDUCATION_SIXTH,
            self.EDUCATION_SEVENTH,
            self.EDUCATION_EIGHTH,
            self.EDUCATION_NINTH,
            self.EDUCATION_TENTH,
            self.EDUCATION_ELEVENTH,
            self.EDUCATION_TWELFTH_NO_DIPLOMA,
        ]

        df[self.HIGH_SCHOOL_ED_RAW_COUNT_FIELD] = df[
            educational_numerator_fields
        ].sum(axis=1)
        df[self.HIGH_SCHOOL_ED_FIELD] = (
            df[self.HIGH_SCHOOL_ED_RAW_COUNT_FIELD]
            / df[self.EDUCATION_POPULATION_OVER_25]
        )

        # Calculate some demographic information.
        df = df.rename(
            columns={
                "B02001_003E": self.BLACK_FIELD_NAME,
                "B02001_004E": self.AMERICAN_INDIAN_FIELD_NAME,
                "B02001_005E": self.ASIAN_FIELD_NAME,
                "B02001_006E": self.HAWAIIAN_FIELD_NAME,
                "B02001_008E": self.TWO_OR_MORE_RACES_FIELD_NAME,
                "B03002_003E": self.NON_HISPANIC_WHITE_FIELD_NAME,
                "B03003_003E": self.HISPANIC_FIELD_NAME,
                "B02001_007E": self.OTHER_RACE_FIELD_NAME,
                "B02001_001E": self.TOTAL_RACE_POPULATION_FIELD_NAME,
            },
            errors="raise",
        )

        for race_field_name in self.RE_OUTPUT_FIELDS:
            df[field_names.PERCENT_PREFIX + race_field_name] = (
                df[race_field_name] / df[self.TOTAL_RACE_POPULATION_FIELD_NAME]
            )

        # First value is the `age bucket`, and the second value is a list of all fields
        # that will be summed in the calculations of the total population in that age
        # bucket.
        age_bucket_and_its_sum_columns = [
            (
                field_names.PERCENT_AGE_UNDER_10,
                [
                    "B01001_003E",  # Estimate!!Total:!!Male:!!Under 5 years
                    "B01001_004E",  # Estimate!!Total:!!Male:!!5 to 9 years
                    "B01001_027E",  # Estimate!!Total:!!Female:!!Under 5 years
                    "B01001_028E",  # Estimate!!Total:!!Female:!!5 to 9 years
                ],
            ),
            (
                field_names.PERCENT_AGE_10_TO_64,
                [
                    "B01001_005E",  # Estimate!!Total:!!Male:!!10 to 14 years
                    "B01001_006E",  # Estimate!!Total:!!Male:!!15 to 17 years
                    "B01001_007E",  # Estimate!!Total:!!Male:!!18 and 19 years
                    "B01001_008E",  # Estimate!!Total:!!Male:!!20 years
                    "B01001_009E",  # Estimate!!Total:!!Male:!!21 years
                    "B01001_010E",  # Estimate!!Total:!!Male:!!22 to 24 years
                    "B01001_011E",  # Estimate!!Total:!!Male:!!25 to 29 years
                    "B01001_012E",  # Estimate!!Total:!!Male:!!30 to 34 years
                    "B01001_013E",  # Estimate!!Total:!!Male:!!35 to 39 years
                    "B01001_014E",  # Estimate!!Total:!!Male:!!40 to 44 years
                    "B01001_015E",  # Estimate!!Total:!!Male:!!45 to 49 years
                    "B01001_016E",  # Estimate!!Total:!!Male:!!50 to 54 years
                    "B01001_017E",  # Estimate!!Total:!!Male:!!55 to 59 years
                    "B01001_018E",  # Estimate!!Total:!!Male:!!60 and 61 years
                    "B01001_019E",  # Estimate!!Total:!!Male:!!62 to 64 years
                    "B01001_029E",  # Estimate!!Total:!!Female:!!10 to 14 years
                    "B01001_030E",  # Estimate!!Total:!!Female:!!15 to 17 years
                    "B01001_031E",  # Estimate!!Total:!!Female:!!18 and 19 years
                    "B01001_032E",  # Estimate!!Total:!!Female:!!20 years
                    "B01001_033E",  # Estimate!!Total:!!Female:!!21 years
                    "B01001_034E",  # Estimate!!Total:!!Female:!!22 to 24 years
                    "B01001_035E",  # Estimate!!Total:!!Female:!!25 to 29 years
                    "B01001_036E",  # Estimate!!Total:!!Female:!!30 to 34 years
                    "B01001_037E",  # Estimate!!Total:!!Female:!!35 to 39 years
                    "B01001_038E",  # Estimate!!Total:!!Female:!!40 to 44 years
                    "B01001_039E",  # Estimate!!Total:!!Female:!!45 to 49 years
                    "B01001_040E",  # Estimate!!Total:!!Female:!!50 to 54 years
                    "B01001_041E",  # Estimate!!Total:!!Female:!!55 to 59 years
                    "B01001_042E",  # Estimate!!Total:!!Female:!!60 and 61 years
                    "B01001_043E",  # Estimate!!Total:!!Female:!!62 to 64 years
                ],
            ),
            (
                field_names.PERCENT_AGE_OVER_64,
                [
                    "B01001_020E",  # Estimate!!Total:!!Male:!!65 and 66 years
                    "B01001_021E",  # Estimate!!Total:!!Male:!!67 to 69 years
                    "B01001_022E",  # Estimate!!Total:!!Male:!!70 to 74 years
                    "B01001_023E",  # Estimate!!Total:!!Male:!!75 to 79 years
                    "B01001_024E",  # Estimate!!Total:!!Male:!!80 to 84 years
                    "B01001_025E",  # Estimate!!Total:!!Male:!!85 years and over
                    "B01001_044E",  # Estimate!!Total:!!Female:!!65 and 66 years
                    "B01001_045E",  # Estimate!!Total:!!Female:!!67 to 69 years
                    "B01001_046E",  # Estimate!!Total:!!Female:!!70 to 74 years
                    "B01001_047E",  # Estimate!!Total:!!Female:!!75 to 79 years
                    "B01001_048E",  # Estimate!!Total:!!Female:!!80 to 84 years
                    "B01001_049E",  # Estimate!!Total:!!Female:!!85 years and over
                ],
            ),
        ]

        # For each age bucket, sum the relevant columns and calculate the total
        # percentage.
        for age_bucket, sum_columns in age_bucket_and_its_sum_columns:
            df[age_bucket] = (
                df[sum_columns].sum(axis=1) / df[field_names.TOTAL_POP_FIELD]
            )

        # Calculate college attendance and adjust low income
        df[self.COLLEGE_ATTENDANCE_FIELD] = (
            df[self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PUBLIC]
            + df[self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PRIVATE]
            + df[self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PUBLIC]
            + df[self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PRIVATE]
        ) / df[self.COLLEGE_ATTENDANCE_TOTAL_POPULATION_ASKED]

        df[self.COLLEGE_NON_ATTENDANCE_FIELD] = (
            1 - df[self.COLLEGE_ATTENDANCE_FIELD]
        )

        # we impute income for both income measures
        ## TODO: Convert to pydantic for clarity
        logger.debug("Imputing income information")
        ImputeVariables = namedtuple(
            "ImputeVariables", ["raw_field_name", "imputed_field_name"]
        )

        df = calculate_income_measures(
            impute_var_named_tup_list=[
                ImputeVariables(
                    raw_field_name=self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME,
                    imputed_field_name=self.IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME,
                ),
                ImputeVariables(
                    raw_field_name=self.COLLEGE_ATTENDANCE_FIELD,
                    imputed_field_name=self.IMPUTED_COLLEGE_ATTENDANCE_FIELD,
                ),
            ],
            geo_df=df,
            geoid_field=self.GEOID_TRACT_FIELD_NAME,
            minimum_population_required_for_imputation=self.MINIMUM_POPULATION_REQUIRED_FOR_IMPUTATION,
        )

        logger.debug("Calculating with imputed values")

        df[
            self.ADJUSTED_AND_IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME
        ] = (
            df[self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME].fillna(
                df[self.IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME]
            )
            - df[self.COLLEGE_ATTENDANCE_FIELD].fillna(
                df[self.IMPUTED_COLLEGE_ATTENDANCE_FIELD]
            )
            # Use clip to ensure that the values are not negative if college attendance
            # is very high
        ).clip(
            lower=0
        )

        # All values should have a value at this point
        assert (
            # For tracts with >0 population
            df[
                df[field_names.TOTAL_POP_FIELD]
                >= self.MINIMUM_POPULATION_REQUIRED_FOR_IMPUTATION
            ][
                # Then the imputed field should have no nulls
                self.ADJUSTED_AND_IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME
            ]
            .isna()
            .sum()
            == 0
        ), "Error: not all values were filled..."

        logger.debug("Renaming columns...")
        df = df.rename(
            columns={
                self.ADJUSTED_AND_IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME: field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD,
                self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME: field_names.POVERTY_LESS_THAN_200_FPL_FIELD,
            }
        )

        # We generate a boolean that is TRUE when there is an imputed income but not a baseline income, and FALSE otherwise.
        # This allows us to see which tracts have an imputed income.
        df[field_names.IMPUTED_INCOME_FLAG_FIELD_NAME] = (
            df[field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD].notna()
            & df[field_names.POVERTY_LESS_THAN_200_FPL_FIELD].isna()
        )

        # Save results to self.
        self.output_df = df
