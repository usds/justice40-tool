from pathlib import Path
import datetime

import pandas as pd
from data_pipeline.config import settings

# Base Paths
DATA_PATH = Path(settings.APP_ROOT) / "data"
TMP_PATH = DATA_PATH / "tmp"
FILES_PATH = Path(settings.APP_ROOT) / "files"

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

# Score Tile CSV source path
DATA_SCORE_CSV_TILES_PATH = DATA_SCORE_CSV_DIR / "tiles"
DATA_SCORE_CSV_TILES_FILE_PATH = DATA_SCORE_CSV_TILES_PATH / "usa.csv"

## Tile path
DATA_SCORE_TILES_DIR = DATA_SCORE_DIR / "tiles"

# Downloadable paths
current_dt = datetime.datetime.now()
timestamp_str = current_dt.strftime("%Y-%m-%d-%H%M")
SCORE_DOWNLOADABLE_DIR = DATA_SCORE_DIR / "downloadable"
SCORE_DOWNLOADABLE_PDF_FILE_NAME = "Draft_Communities_List.pdf"
SCORE_DOWNLOADABLE_PDF_FILE_PATH = FILES_PATH / SCORE_DOWNLOADABLE_PDF_FILE_NAME
SCORE_DOWNLOADABLE_CSV_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"communities-{timestamp_str}.csv"
)
SCORE_DOWNLOADABLE_EXCEL_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"communities-{timestamp_str}.xlsx"
)
SCORE_DOWNLOADABLE_ZIP_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / "Screening_Tool_Data.zip"
)

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
    "Score G (communities)",
    "Score G",
    "Definition L (communities)",
    "Definition L (percentile)",
    "Poverty (Less than 200% of federal poverty line) (percentile)",
    "Percent individuals age 25 or over with less than high school degree (percentile)",
    "Linguistic isolation (percent) (percentile)",
    "Unemployed civilians (percent) (percentile)",
    "Housing burden (percent) (percentile)",
    "Diagnosed diabetes among adults aged >=18 years (percentile)",
    "Current asthma among adults aged >=18 years (percentile)",
    "Coronary heart disease among adults aged >=18 years (percentile)",
    "Life expectancy (years) (percentile)",
    "Traffic proximity and volume (percentile)",
    "FEMA Risk Index Expected Annual Loss Score (percentile)",
    "Energy burden (percentile)",
    "Wastewater discharge (percentile)",
    "Percent pre-1960s housing (lead paint indicator) (percentile)",
    "Diesel particulate matter (percentile)",
    "Particulate matter (PM2.5) (percentile)",
    "Median household income (% of AMI) (percentile)",
    "Percent of individuals < 200% Federal Poverty Line (percentile)",
    "Expected annual loss rate (percentile)",
    "Proximity to RMP sites (percentile)",
    "Proximity to NPL sites (percentile)",
]

# columns to round floats to 2 decimals
TILES_SCORE_FLOAT_COLUMNS = [
    "Score D (percentile)",
    "Score D (top 25th percentile)",
    "Score E (percentile)",
    "Score E (top 25th percentile)",
    "Definition L (percentile)",
    "Poverty (Less than 200% of federal poverty line)",
    "Percent individuals age 25 or over with less than high school degree",
    "Linguistic isolation (percent)",
    "Unemployed civilians (percent)",
    "Housing burden (percent)",
    "Poverty (Less than 200% of federal poverty line) (percentile)",
    "Percent individuals age 25 or over with less than high school degree (percentile)",
    "Linguistic isolation (percent) (percentile)",
    "Unemployed civilians (percent) (percentile)",
    "Housing burden (percent) (percentile)",
    "Diagnosed diabetes among adults aged >=18 years (percentile)",
    "Current asthma among adults aged >=18 years (percentile)",
    "Coronary heart disease among adults aged >=18 years (percentile)",
    "Life expectancy (years) (percentile)",
    "Traffic proximity and volume (percentile)",
    "FEMA Risk Index Expected Annual Loss Score (percentile)",
    "Energy burden (percentile)",
    "Wastewater discharge (percentile)",
    "Percent pre-1960s housing (lead paint indicator) (percentile)",
    "Diesel particulate matter (percentile)",
    "Particulate matter (PM2.5) (percentile)",
    "Median household income (% of AMI) (percentile)",
    "Percent of individuals < 200% Federal Poverty Line (percentile)",
    "Proximity to Risk Management Plan (RMP) facilities (percentile)",
    "Proximity to NPL sites (percentile)",
    "Expected agricultural loss rate (Natural Hazards Risk Index) (percentile)",
    "Expected building loss rate (Natural Hazards Risk Index) (percentile)",
    "Expected population loss rate (Natural Hazards Risk Index) (percentile)"
    "Median value ($) of owner-occupied housing units (percentile)",
]
TILES_ROUND_NUM_DECIMALS = 2

DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_BASIC = [
    "Area Median Income (State or metropolitan)",
    "Percent of individuals < 100% Federal Poverty Line",
    "Percent individuals age 25 or over with less than high school degree",
    "Diagnosed diabetes among adults aged >=18 years",
    "Current asthma among adults aged >=18 years",
    "Coronary heart disease among adults aged >=18 years",
    "Life expectancy (years)",
    "Traffic proximity and volume",
    "FEMA Risk Index Expected Annual Loss Score",
    "Energy burden",
    "Housing burden (percent)",
    "Wastewater discharge",
    "Percent pre-1960s housing (lead paint indicator)",
    "Diesel particulate matter",
    "Particulate matter (PM2.5)",
    "Total population",
]

# For every indicator above, we want to include percentile and min-max normalized variants also
DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_FULL = list(
    pd.core.common.flatten(
        [
            [p, f"{p} (percentile)"]
            for p in DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_BASIC
        ]
    )
)

# Finally we augment with the GEOID10, county, and state
DOWNLOADABLE_SCORE_COLUMNS = [
    "GEOID10",
    "County Name",
    "State Name",
    "Score G (communities)",
    "Median household income (% of AMI)",
    "Median household income (% of state median household income) (percentile)",
    *DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_FULL,
]
