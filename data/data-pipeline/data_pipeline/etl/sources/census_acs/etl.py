from collections import namedtuple
import os
import pandas as pd
import geopandas as gpd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census_acs.etl_utils import (
    retrieve_census_acs_data,
)
from data_pipeline.etl.sources.census_acs.etl_imputations import (
    calculate_income_measures,
)

from data_pipeline.utils import get_module_logger, unzip_file_from_url
from data_pipeline.score import field_names

logger = get_module_logger(__name__)

# because now there is a requirement for the us.json, this will port from
# AWS when a local copy does not exist.
CENSUS_DATA_S3_URL = settings.AWS_JUSTICE40_DATASOURCES_URL + "/census.zip"


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
        self.TWO_OR_MORE_RACES_FIELD_NAME = "Two or more races"
        self.NON_HISPANIC_WHITE_FIELD_NAME = "White"
        self.HISPANIC_FIELD_NAME = "Hispanic or Latino"
        self.OTHER_RACE_FIELD_NAME = "Other Races"

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

        self.STATE_GEOID_FIELD_NAME = "GEOID2"

        self.COLUMNS_TO_KEEP = (
            [
                self.GEOID_TRACT_FIELD_NAME,
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
            + [
                field_names.POVERTY_LESS_THAN_200_FPL_FIELD,
                field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD,
            ]
        )

        self.df: pd.DataFrame

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

        # Here we join the geometry of the US to the dataframe so that we can impute
        # The income of neighbors. first this looks locally; if there's no local
        # geojson file for all of the US, this will read it off of S3
        logger.info("Reading in geojson for the country")
        if not os.path.exists(
            self.DATA_PATH / "census" / "geojson" / "us.json"
        ):
            logger.info("Fetching Census data from AWS S3")
            unzip_file_from_url(
                CENSUS_DATA_S3_URL,
                self.DATA_PATH / "tmp",
                self.DATA_PATH,
            )

        geo_df = gpd.read_file(
            self.DATA_PATH / "census" / "geojson" / "us.json"
        )
        df = self._merge_geojson(
            df=df,
            usa_geo_df=geo_df,
        )
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
            },
            errors="raise",
        )

        # Calculate demographics as percent
        df[field_names.PERCENT_PREFIX + field_names.BLACK_FIELD_NAME] = (
            df["B02001_003E"] / df["B02001_001E"]
        )
        df[
            field_names.PERCENT_PREFIX + field_names.AMERICAN_INDIAN_FIELD_NAME
        ] = (df["B02001_004E"] / df["B02001_001E"])
        df[field_names.PERCENT_PREFIX + field_names.ASIAN_FIELD_NAME] = (
            df["B02001_005E"] / df["B02001_001E"]
        )
        df[field_names.PERCENT_PREFIX + field_names.HAWAIIAN_FIELD_NAME] = (
            df["B02001_006E"] / df["B02001_001E"]
        )
        df[
            field_names.PERCENT_PREFIX
            + field_names.TWO_OR_MORE_RACES_FIELD_NAME
        ] = (df["B02001_008E"] / df["B02001_001E"])
        df[
            field_names.PERCENT_PREFIX
            + field_names.NON_HISPANIC_WHITE_FIELD_NAME
        ] = (df["B03002_003E"] / df["B03002_001E"])
        df[field_names.PERCENT_PREFIX + field_names.HISPANIC_FIELD_NAME] = (
            df["B03003_003E"] / df["B03003_001E"]
        )
        df[field_names.PERCENT_PREFIX + field_names.OTHER_RACE_FIELD_NAME] = (
            df["B02001_007E"] / df["B03003_001E"]
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
        logger.info("Imputing income information")
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
        )

        logger.info("Calculating with imputed values")

        df[
            self.ADJUSTED_AND_IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME
        ] = (
            df[self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME].fillna(
                df[self.IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME]
            )
            - df[self.COLLEGE_ATTENDANCE_FIELD].fillna(
                df[self.IMPUTED_COLLEGE_ATTENDANCE_FIELD]
            )
        ).clip(
            lower=0
        )

        # All values should have a value at this point
        assert (
            df[
                self.ADJUSTED_AND_IMPUTED_POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME
            ]
            .isna()
            .sum()
            == 0
        ), "Error: not all values were filled..."

        logger.info("Renaming columns...")
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

        # Strip columns and save results to self.
        self.df = df[self.COLUMNS_TO_KEEP]

    def load(self) -> None:
        logger.info("Saving Census ACS Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
