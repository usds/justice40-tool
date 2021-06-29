from pathlib import Path
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
        self.GEOID_FIELD_NAME = "GEOID10"
        self.UNEMPLOYED_FIELD_NAME = "Unemployed Civilians (fraction)"
        self.LINGUISTIC_ISOLATION_FIELD_NAME = "Linguistic isolation (percent)"
        self.LINGUISTIC_ISOLATION_TOTAL_FIELD_NAME = "Linguistic isolation (total)"
        self.LINGUISTIC_ISOLATION_FIELDS = [
            "C16002_001E",
            "C16002_004E",
            "C16002_007E",
            "C16002_010E",
            "C16002_013E",
        ]

    def _fips_from_censusdata_censusgeo(self, censusgeo: censusdata.censusgeo) -> str:
        """Create a FIPS code from the proprietary censusgeo index."""
        fips = "".join([value for (key, value) in censusgeo.params()])
        return fips

    def extract(self):
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

        df = pd.concat(dfs)

        df[self.GEOID_FIELD_NAME] = df.index.to_series().apply(
            func=self._fips_from_censusdata_censusgeo
        )

        print(df.head())
