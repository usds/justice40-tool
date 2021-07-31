import pandas as pd
import censusdata

from etl.base import ExtractTransformLoad
from etl.sources.census.etl_utils import get_state_fips_codes
from utils import get_module_logger

logger = get_module_logger(__name__)


class CensusACSETL(ExtractTransformLoad):
    def __init__(self):
        self.ACS_YEAR = 2019
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / f"census_acs_{self.ACS_YEAR}"
        self.UNEMPLOYED_FIELD_NAME = "Unemployed civilians (percent)"
        self.LINGUISTIC_ISOLATION_FIELD_NAME = "Linguistic isolation (percent)"
        self.LINGUISTIC_ISOLATION_TOTAL_FIELD_NAME = "Linguistic isolation (total)"
        self.LINGUISTIC_ISOLATION_FIELDS = [
            "C16002_001E",
            "C16002_004E",
            "C16002_007E",
            "C16002_010E",
            "C16002_013E",
        ]
        self.df: pd.DataFrame

    def _fips_from_censusdata_censusgeo(self, censusgeo: censusdata.censusgeo) -> str:
        """Create a FIPS code from the proprietary censusgeo index."""
        fips = "".join([value for (key, value) in censusgeo.params()])
        return fips

    def extract(self) -> None:
        dfs = []
        for fips in get_state_fips_codes(self.DATA_PATH):
            logger.info(f"Downloading data for state/territory with FIPS code {fips}")

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
                    ]
                    + self.LINGUISTIC_ISOLATION_FIELDS,
                )
            )

        self.df = pd.concat(dfs)

        self.df[self.GEOID_FIELD_NAME] = self.df.index.to_series().apply(
            func=self._fips_from_censusdata_censusgeo
        )

    def transform(self) -> None:
        logger.info(f"Starting Census ACS Transform")

        # Calculate percent unemployment.
        # TODO: remove small-sample data that should be `None` instead of a high-variance fraction.
        self.df[self.UNEMPLOYED_FIELD_NAME] = self.df.B23025_005E / self.df.B23025_003E

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
        logger.info(f"Saving Census ACS Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        columns_to_include = [
            self.GEOID_FIELD_NAME,
            self.UNEMPLOYED_FIELD_NAME,
            self.LINGUISTIC_ISOLATION_FIELD_NAME,
        ]

        self.df[columns_to_include].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )

    def validate(self) -> None:
        logger.info(f"Validating Census ACS Data")

        pass
