from pathlib import Path

import pandas as pd
from data_pipeline.config import settings

# Base Paths
DATA_PATH = Path(settings.APP_ROOT) / "data"
TMP_PATH = DATA_PATH / "tmp"

# Remote Paths
CENSUS_COUNTIES_ZIP_URL = "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/Gaz_counties_national.zip"

# Local Paths
CENSUS_COUNTIES_FILE_NAME = TMP_PATH / "Gaz_counties_national.txt"

# Census paths
DATA_CENSUS_DIR = DATA_PATH / "census"
DATA_CENSUS_CSV_DIR = DATA_CENSUS_DIR / "csv"
DATA_CENSUS_CSV_FILE_PATH = DATA_CENSUS_CSV_DIR / "us.csv"
DATA_CENSUS_CSV_STATE_FILE_PATH = DATA_CENSUS_CSV_DIR / "fips_states_2010.csv"


# Score paths
DATA_SCORE_DIR = DATA_PATH / "score"

## Score CSV Paths
DATA_SCORE_CSV_DIR = DATA_SCORE_DIR / "csv"
DATA_SCORE_CSV_FULL_DIR = DATA_SCORE_CSV_DIR / "full"
DATA_SCORE_CSV_FULL_FILE_PATH = DATA_SCORE_CSV_FULL_DIR / "usa.csv"
FULL_SCORE_CSV_FULL_PLUS_COUNTIES_FILE_PATH = (
    DATA_SCORE_CSV_FULL_DIR / "usa_counties.csv"
)

## Score Tile paths
DATA_SCORE_TILES_DIR = DATA_SCORE_DIR / "tiles"
DATA_SCORE_TILES_FILE_PATH = DATA_SCORE_TILES_DIR / "usa.csv"

# Downloadable paths
SCORE_DOWNLOADABLE_DIR = DATA_SCORE_DIR / "downloadable"
SCORE_DOWNLOADABLE_CSV_FILE_PATH = SCORE_DOWNLOADABLE_DIR / "usa.csv"
SCORE_DOWNLOADABLE_EXCEL_FILE_PATH = SCORE_DOWNLOADABLE_DIR / "usa.xlsx"
SCORE_DOWNLOADABLE_ZIP_FILE_PATH = SCORE_DOWNLOADABLE_DIR / "Screening Tool Data.zip"

# Column subsets
CENSUS_COUNTIES_COLUMNS = ["USPS", "GEOID", "NAME"]
TILES_SCORE_COLUMNS = [
    "GEOID10",
    "State Name",
    "County Name",
    "Total population",
    "Score D (percentile)",
    "Score D (top 25th percentile)",
    "Score E (percentile)",
    "Score E (top 25th percentile)",
    "Poverty (Less than 200% of federal poverty line) (percentile)",
    "Percent individuals age 25 or over with less than high school degree (percentile)",
    "Linguistic isolation (percent) (percentile)",
    "Unemployed civilians (percent) (percentile)",
    "Housing burden (percent) (percentile)",
]

# columns to round floats to 2 decimals
TILES_SCORE_FLOAT_COLUMNS = [
    "Score D (percentile)",
    "Score D (top 25th percentile)",
    "Score E (percentile)",
    "Score E (top 25th percentile)",
    "Poverty (Less than 200% of federal poverty line)",
    "Percent individuals age 25 or over with less than high school degree",
    "Linguistic isolation (percent)",
    "Unemployed civilians (percent)",
    "Housing burden (percent)",
]
TILES_ROUND_NUM_DECIMALS = 2

DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_BASIC = [
    "Percent individuals age 25 or over with less than high school degree",
    "Linguistic isolation (percent)",
    "Poverty (Less than 200% of federal poverty line)",
    "Unemployed civilians (percent)",
    "Housing burden (percent)",
    "Respiratory hazard index",
    "Diesel particulate matter",
    "Particulate matter (PM2.5)",
    "Traffic proximity and volume",
    "Proximity to RMP sites",
    "Wastewater discharge",
    "Percent pre-1960s housing (lead paint indicator)",
    "Total population",
]

# For every indicator above, we want to include percentile and min-max normalized variants also
DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_FULL = list(
    pd.core.common.flatten(
        [
            [p, f"{p} (percentile)", f"{p} (min-max normalized)"]
            for p in DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_BASIC
        ]
    )
)

# Finally we augment with the GEOID10, county, and state
DOWNLOADABLE_SCORE_COLUMNS = [
    "GEOID10",
    "County Name",
    "State Name",
    *DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_FULL,
]
