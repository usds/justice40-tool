import censusdata
import pandas as pd
from typing import List

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger

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
        self.UNEMPLOYED_FIELD_NAME = "Unemployed civilians (percent)"

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

        self.STATE_GEOID_FIELD_NAME = "GEOID2"

        self.df: pd.DataFrame

    @classmethod
    def _fips_from_censusdata_censusgeo(
        cls, censusgeo: censusdata.censusgeo
    ) -> str:
        """Create a FIPS code from the proprietary censusgeo index."""
        fips = "".join([value for (key, value) in censusgeo.params()])
        return fips

    @classmethod
    def retrieve_census_data(
        cls, acs_year: int, variables: List[str], raise_errors: bool = False
    ) -> pd.DataFrame:
        """Retrieves and combines census ACS data for a given year."""
        dfs = []
        for fips in get_state_fips_codes(cls.DATA_PATH):
            logger.info(
                f"Downloading data for state/territory with FIPS code {fips}"
            )

            try:
                response = censusdata.download(
                    src="acs5",
                    year=acs_year,
                    geo=censusdata.censusgeo(
                        [("state", fips), ("county", "*"), ("tract", "*")]
                    ),
                    var=variables,
                )
                dfs.append(response)

            except ValueError as e:
                logger.error(
                    f"Could not download data for state/territory with FIPS code {fips}"
                )

                if raise_errors:
                    raise e

            # TODO: remove
            break

        df = pd.concat(dfs)

        df[cls.GEOID_TRACT_FIELD_NAME] = df.index.to_series().apply(
            func=cls._fips_from_censusdata_censusgeo
        )

        return df

    def extract(self) -> None:
        # Define the variables to retrieve
        variables = (
            [
                # Income field
                self.MEDIAN_INCOME_FIELD,
                # House value
                self.MEDIAN_HOUSE_VALUE_FIELD,
            ]
            + self.EMPLOYMENT_FIELDS
            + self.LINGUISTIC_ISOLATION_FIELDS
            + self.POVERTY_FIELDS
            + self.EDUCATIONAL_FIELDS
        )

        self.df = self.retrieve_census_data(
            acs_year=self.ACS_YEAR, variables=variables
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

        # Save results to self.
        self.df = df

    def load(self) -> None:
        logger.info("Saving Census ACS Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        columns_to_include = [
            self.GEOID_TRACT_FIELD_NAME,
            self.UNEMPLOYED_FIELD_NAME,
            self.LINGUISTIC_ISOLATION_FIELD_NAME,
            self.MEDIAN_INCOME_FIELD_NAME,
            self.POVERTY_LESS_THAN_100_PERCENT_FPL_FIELD_NAME,
            self.POVERTY_LESS_THAN_150_PERCENT_FPL_FIELD_NAME,
            self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME,
            self.MEDIAN_HOUSE_VALUE_FIELD_NAME,
            self.HIGH_SCHOOL_ED_FIELD,
        ]

        self.df[columns_to_include].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )

    def validate(self) -> None:
        logger.info("Validating Census ACS Data")

        pass
