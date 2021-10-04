import json
import requests

import pandas as pd
import censusdata

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class CensusDecETL(ExtractTransformLoad):
    def __init__(self):
        self.ISLAND_TERRITORIES = [
            'as',
            'gu',
            'mp',
            'vi',
        ]
        self.DEC_YEAR = 2010
        self.OUTPUT_PATH = (
            self.DATA_PATH / "dataset" / f"census_dec_{self.DEC_YEAR}"
        )

        self.MEDIAN_INCOME_FIELD = "PBG049001"
        self.MEDIAN_INCOME_FIELD_NAME = (
            "MEDIAN HOUSEHOLD INCOME IN 2009 (DOLLARS)"
        )
        self.MEDIAN_INCOME_URL = "https://api.census.gov/data/{}/dec/{}?get=NAME,{}" + "&for=block%20group:*&in=state:*%20county:*"

        self.HIGH_SCHOOL_ED_FIELDS = [
            "PBG026001",  # Total; SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER
            "PBG026005",  # Total!!Male!!High school graduate, GED, or alternative; SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER
            "PBG026012",  # Total!!Female!!High school graduate, GED, or alternative; SEX BY EDUCATIONAL ATTAINMENT FOR THE POPULATION 25 YEARS AND OVER
        ]

        self.df: pd.DataFrame


    def extract(self) -> None:
        dfs = []
        for island in self.ISLAND_TERRITORIES:
            logger.info(
                f"Downloading data for state/territory {island}"
            )

            download = requests.get(self.MEDIAN_INCOME_URL.format(self.DEC_YEAR, island, self.MEDIAN_INCOME_FIELD), verify=False)
            median_incomes = json.loads(download.content)

            dfs.append(median_incomes)

        self.df = pd.concat(dfs)

        self.df[self.GEOID_FIELD_NAME] = self.df.index.to_series().apply(
            func=self._fips_from_censusdata_censusgeo
        )

    def transform(self) -> None:
        logger.info("Starting Census Dec Transform")

        # Rename median income
        self.df[self.MEDIAN_INCOME_FIELD_NAME] = self.df[
            self.MEDIAN_INCOME_FIELD
        ]

        # Handle null values for CBG median income, which are `-666666666`.
        missing_value_count = sum(
            self.df[self.MEDIAN_INCOME_FIELD_NAME] == -666666666
        )
        logger.info(
            f"There are {missing_value_count} ({int(100*missing_value_count/self.df[self.MEDIAN_INCOME_FIELD_NAME].count())}%) values of "
            + f"`{self.MEDIAN_INCOME_FIELD_NAME}` being marked as null values."
        )
        self.df[self.MEDIAN_INCOME_FIELD_NAME] = self.df[
            self.MEDIAN_INCOME_FIELD_NAME
        ].replace(to_replace=-666666666, value=None)


    def load(self) -> None:
        logger.info("Saving Census ACS Data")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        columns_to_include = [
            self.GEOID_FIELD_NAME,
            self.MEDIAN_INCOME_FIELD_NAME,
        ]

        self.df[columns_to_include].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )

    def validate(self) -> None:
        logger.info("Validating Census ACS Data")

        pass
