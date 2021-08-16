import pandas as pd
import censusdata

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

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
            "C16002_001E",
            "C16002_004E",
            "C16002_007E",
            "C16002_010E",
            "C16002_013E",
        ]
        self.MEDIAN_INCOME_FIELD = "B19013_001E"
        self.MEDIAN_INCOME_FIELD_NAME = (
            "Median household income in the past 12 months"
        )
        self.MEDIAN_INCOME_STATE_FIELD_NAME = "Median household income (State)"
        self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME = (
            "Median household income (% of state median household income)"
        )
        self.STATE_GEOID_FIELD_NAME = "GEOID2"
        self.df: pd.DataFrame
        self.state_median_income_df: pd.DataFrame

        self.STATE_MEDIAN_INCOME_FTP_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/2014_to_2019_state_median_income.zip"
        )
        self.STATE_MEDIAN_INCOME_FILE_PATH = (
            self.TMP_PATH / "2014_to_2019_state_median_income.csv"
        )

    def _fips_from_censusdata_censusgeo(
        self, censusgeo: censusdata.censusgeo
    ) -> str:
        """Create a FIPS code from the proprietary censusgeo index."""
        fips = "".join([value for (key, value) in censusgeo.params()])
        return fips

    def extract(self) -> None:
        # Extract state median income
        super().extract(
            self.STATE_MEDIAN_INCOME_FTP_URL,
            self.TMP_PATH,
        )
        dfs = []
        for fips in get_state_fips_codes(self.DATA_PATH):
            logger.info(
                f"Downloading data for state/territory with FIPS code {fips}"
            )

            dfs.append(
                censusdata.download(
                    src="acs5",
                    year=self.ACS_YEAR,
                    geo=censusdata.censusgeo(
                        [("state", fips), ("county", "*"), ("block group", "*")]
                    ),
                    var=[
                        # Emploment fields
                        "B23025_005E",
                        "B23025_003E",
                        self.MEDIAN_INCOME_FIELD,
                    ]
                    + self.LINGUISTIC_ISOLATION_FIELDS,
                )
            )

        self.df = pd.concat(dfs)

        self.df[self.GEOID_FIELD_NAME] = self.df.index.to_series().apply(
            func=self._fips_from_censusdata_censusgeo
        )

        self.state_median_income_df = pd.read_csv(
            # TODO: Replace with reading from S3.
            filepath_or_buffer=self.STATE_MEDIAN_INCOME_FILE_PATH,
            dtype={self.STATE_GEOID_FIELD_NAME: "string"},
        )

    def transform(self) -> None:
        logger.info("Starting Census ACS Transform")

        # Rename median income
        self.df[self.MEDIAN_INCOME_FIELD_NAME] = self.df[
            self.MEDIAN_INCOME_FIELD
        ]

        # TODO: handle null values for CBG median income, which are `-666666666`.

        # Join state data on CBG data:
        self.df[self.STATE_GEOID_FIELD_NAME] = (
            self.df[self.GEOID_FIELD_NAME].astype(str).str[0:2]
        )
        self.df = self.df.merge(
            self.state_median_income_df,
            how="left",
            on=self.STATE_GEOID_FIELD_NAME,
        )

        # Calculate the income of the block group as a fraction of the state income:
        self.df[self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME] = (
            self.df[self.MEDIAN_INCOME_FIELD_NAME]
            / self.df[self.MEDIAN_INCOME_STATE_FIELD_NAME]
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

        self.df[self.LINGUISTIC_ISOLATION_FIELD_NAME].describe()

    def load(self) -> None:
        logger.info("Saving Census ACS Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        columns_to_include = [
            self.GEOID_FIELD_NAME,
            self.UNEMPLOYED_FIELD_NAME,
            self.LINGUISTIC_ISOLATION_FIELD_NAME,
            self.MEDIAN_INCOME_FIELD_NAME,
            self.MEDIAN_INCOME_STATE_FIELD_NAME,
            self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME,
        ]

        self.df[columns_to_include].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )

    def validate(self) -> None:
        logger.info("Validating Census ACS Data")

        pass
