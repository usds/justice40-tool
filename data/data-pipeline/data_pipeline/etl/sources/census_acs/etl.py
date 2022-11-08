import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census_acs.etl_utils import (
    retrieve_census_acs_data,
)
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names

logger = get_module_logger(__name__)


class CensusACSETL(ExtractTransformLoad):
    def __init__(self):
        self.ACS_YEAR = 2019
        self.OUTPUT_PATH = (
            self.DATA_PATH / "dataset" / f"census_acs_{self.ACS_YEAR}"
        )

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
        ]

        # Name output demographics fields.
        self.BLACK_FIELD_NAME = "Black or African American alone"
        self.AMERICAN_INDIAN_FIELD_NAME = (
            "American Indian and Alaska Native alone"
        )
        self.ASIAN_FIELD_NAME = "Asian alone"
        self.HAWAIIAN_FIELD_NAME = "Native Hawaiian and Other Pacific alone"
        self.TWO_OR_MORE_RACES_FIELD_NAME = "Two or more races"
        self.NON_HISPANIC_WHITE_FIELD_NAME = "Non-Hispanic White"
        self.HISPANIC_FIELD_NAME = "Hispanic or Latino"

        self.RE_OUTPUT_FIELDS = [
            self.BLACK_FIELD_NAME,
            self.AMERICAN_INDIAN_FIELD_NAME,
            self.ASIAN_FIELD_NAME,
            self.HAWAIIAN_FIELD_NAME,
            self.TWO_OR_MORE_RACES_FIELD_NAME,
            self.NON_HISPANIC_WHITE_FIELD_NAME,
            self.HISPANIC_FIELD_NAME,
        ]

        self.PERCENT_PREFIX = "Percent "

        self.STATE_GEOID_FIELD_NAME = "GEOID2"

        self.COLUMNS_TO_KEEP = (
            [
                self.GEOID_TRACT_FIELD_NAME,
                self.UNEMPLOYED_FIELD_NAME,
                self.LINGUISTIC_ISOLATION_FIELD_NAME,
                self.MEDIAN_INCOME_FIELD_NAME,
                self.POVERTY_LESS_THAN_100_PERCENT_FPL_FIELD_NAME,
                self.POVERTY_LESS_THAN_150_PERCENT_FPL_FIELD_NAME,
                self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME,
                self.MEDIAN_HOUSE_VALUE_FIELD_NAME,
                self.HIGH_SCHOOL_ED_FIELD,
                self.COLLEGE_ATTENDANCE_FIELD,
                self.COLLEGE_NON_ATTENDANCE_FIELD,
            ]
            + self.RE_OUTPUT_FIELDS
            + [self.PERCENT_PREFIX + field for field in self.RE_OUTPUT_FIELDS]
        )

        self.df: pd.DataFrame

    def extract(self) -> None:
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
        )

        self.df = retrieve_census_acs_data(
            acs_year=self.ACS_YEAR,
            variables=variables,
            tract_output_field_name=self.GEOID_TRACT_FIELD_NAME,
            data_path_for_fips_codes=self.DATA_PATH,
        )

    def transform(self) -> None:
        logger.info("Starting Census ACS Transform")

        df = self.df

        # Rename two fields.
        df = df.rename(
            columns={
                self.MEDIAN_HOUSE_VALUE_FIELD: self.MEDIAN_HOUSE_VALUE_FIELD_NAME,
                self.MEDIAN_INCOME_FIELD: self.MEDIAN_INCOME_FIELD_NAME,
            }
        )

        # Handle null values for various fields, which are `-666666666`.
        for field in [
            self.MEDIAN_INCOME_FIELD_NAME,
            self.MEDIAN_HOUSE_VALUE_FIELD_NAME,
        ]:
            missing_value_count = sum(df[field] == -666666666)
            logger.info(
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
        df[self.BLACK_FIELD_NAME] = df["B02001_003E"]
        df[self.AMERICAN_INDIAN_FIELD_NAME] = df["B02001_004E"]
        df[self.ASIAN_FIELD_NAME] = df["B02001_005E"]
        df[self.HAWAIIAN_FIELD_NAME] = df["B02001_006E"]
        df[self.TWO_OR_MORE_RACES_FIELD_NAME] = df["B02001_008E"]
        df[self.NON_HISPANIC_WHITE_FIELD_NAME] = df["B03002_003E"]
        df[self.HISPANIC_FIELD_NAME] = df["B03003_003E"]

        # Calculate demographics as percent
        df[self.PERCENT_PREFIX + self.BLACK_FIELD_NAME] = (
            df["B02001_003E"] / df["B02001_001E"]
        )
        df[self.PERCENT_PREFIX + self.AMERICAN_INDIAN_FIELD_NAME] = (
            df["B02001_004E"] / df["B02001_001E"]
        )
        df[self.PERCENT_PREFIX + self.ASIAN_FIELD_NAME] = (
            df["B02001_005E"] / df["B02001_001E"]
        )
        df[self.PERCENT_PREFIX + self.HAWAIIAN_FIELD_NAME] = (
            df["B02001_006E"] / df["B02001_001E"]
        )
        df[self.PERCENT_PREFIX + self.TWO_OR_MORE_RACES_FIELD_NAME] = (
            df["B02001_008E"] / df["B02001_001E"]
        )
        df[self.PERCENT_PREFIX + self.NON_HISPANIC_WHITE_FIELD_NAME] = (
            df["B03002_003E"] / df["B03002_001E"]
        )
        df[self.PERCENT_PREFIX + self.HISPANIC_FIELD_NAME] = (
            df["B03003_003E"] / df["B03003_001E"]
        )

        # Calculate college attendance:
        df[self.COLLEGE_ATTENDANCE_FIELD] = (
            df[self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PUBLIC]
            + df[self.COLLEGE_ATTENDANCE_MALE_ENROLLED_PRIVATE]
            + df[self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PUBLIC]
            + df[self.COLLEGE_ATTENDANCE_FEMALE_ENROLLED_PRIVATE]
        ) / df[self.COLLEGE_ATTENDANCE_TOTAL_POPULATION_ASKED]

        df[self.COLLEGE_NON_ATTENDANCE_FIELD] = (
            1 - df[self.COLLEGE_ATTENDANCE_FIELD]
        )

        # strip columns
        df = df[self.COLUMNS_TO_KEEP]

        # Save results to self.
        self.df = df

        # rename columns to be used in score
        rename_fields = {
            "Percent of individuals < 200% Federal Poverty Line": field_names.POVERTY_LESS_THAN_200_FPL_FIELD,
        }
        self.df.rename(
            columns=rename_fields,
            inplace=True,
            errors="raise",
        )

    def load(self) -> None:
        logger.info("Saving Census ACS Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
