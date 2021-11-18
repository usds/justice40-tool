import pandas as pd
import censusdata

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

        self.STATE_GEOID_FIELD_NAME = "GEOID2"
        self.df: pd.DataFrame

    def _fips_from_censusdata_censusgeo(
        self, censusgeo: censusdata.censusgeo
    ) -> str:
        """Create a FIPS code from the proprietary censusgeo index."""
        fips = "".join([value for (key, value) in censusgeo.params()])
        return fips

    def extract(self) -> None:
        dfs = []
        for fips in get_state_fips_codes(self.DATA_PATH):
            logger.info(
                f"Downloading data for state/territory with FIPS code {fips}"
            )

            try:
                response = censusdata.download(
                    src="acs5",
                    year=self.ACS_YEAR,
                    geo=censusdata.censusgeo(
                        [("state", fips), ("county", "*"), ("tract", "*")]
                    ),
                    var=[
                        # Emploment fields
                        "B23025_005E",
                        "B23025_003E",
                        # Income field
                        self.MEDIAN_INCOME_FIELD,
                        # House value
                        self.MEDIAN_HOUSE_VALUE_FIELD,
                    ]
                    + self.LINGUISTIC_ISOLATION_FIELDS
                    + self.POVERTY_FIELDS,
                )
            except ValueError:
                logger.error(
                    f"Could not download data for state/territory with FIPS code {fips}"
                )

            dfs.append(response)

        self.df = pd.concat(dfs)

        self.df[self.GEOID_TRACT_FIELD_NAME] = self.df.index.to_series().apply(
            func=self._fips_from_censusdata_censusgeo
        )

    def transform(self) -> None:
        logger.info("Starting Census ACS Transform")

        # Rename two fields.
        self.df = self.df.rename(
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
            missing_value_count = sum(self.df[field] == -666666666)
            logger.info(
                f"There are {missing_value_count} ({int(100*missing_value_count/self.df[field].count())}%) values of "
                + f"`{field}` being marked as null values."
            )
            self.df[field] = self.df[field].replace(
                to_replace=-666666666, value=None
            )

        # Calculate percent unemployment.
        # TODO: remove small-sample data that should be `None` instead of a high-variance fraction.
        self.df[self.UNEMPLOYED_FIELD_NAME] = (
            self.df.B23025_005E / self.df.B23025_003E
        )

        # Calculate linguistic isolation.
        individual_limited_english_fields = [
            "C16002_004E",
            "C16002_007E",
            "C16002_010E",
            "C16002_013E",
        ]

        self.df[self.LINGUISTIC_ISOLATION_TOTAL_FIELD_NAME] = self.df[
            individual_limited_english_fields
        ].sum(axis=1, skipna=True)
        self.df[self.LINGUISTIC_ISOLATION_FIELD_NAME] = (
            self.df[self.LINGUISTIC_ISOLATION_TOTAL_FIELD_NAME].astype(float)
            / self.df["C16002_001E"]
        )

        # Calculate percent at different poverty thresholds
        self.df[self.POVERTY_LESS_THAN_100_PERCENT_FPL_FIELD_NAME] = (
            self.df["C17002_002E"] + self.df["C17002_003E"]
        ) / self.df["C17002_001E"]

        self.df[self.POVERTY_LESS_THAN_150_PERCENT_FPL_FIELD_NAME] = (
            self.df["C17002_002E"]
            + self.df["C17002_003E"]
            + self.df["C17002_004E"]
            + self.df["C17002_005E"]
        ) / self.df["C17002_001E"]

        self.df[self.POVERTY_LESS_THAN_200_PERCENT_FPL_FIELD_NAME] = (
            self.df["C17002_002E"]
            + self.df["C17002_003E"]
            + self.df["C17002_004E"]
            + self.df["C17002_005E"]
            + self.df["C17002_006E"]
            + self.df["C17002_007E"]
        ) / self.df["C17002_001E"]

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
        ]

        self.df[columns_to_include].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )

    def validate(self) -> None:
        logger.info("Validating Census ACS Data")

        pass
