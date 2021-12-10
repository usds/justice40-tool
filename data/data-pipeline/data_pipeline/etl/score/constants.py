from pathlib import Path
import datetime

import pandas as pd
from data_pipeline.config import settings

from data_pipeline.score import field_names

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
    field_names.GEOID_TRACT_FIELD,
    field_names.STATE_FIELD,
    field_names.COUNTY_FIELD,
    field_names.TOTAL_POP_FIELD,
    field_names.SCORE_D + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.SCORE_D + field_names.TOP_25_PERCENTILE_SUFFIX,
    field_names.SCORE_E + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.SCORE_E + field_names.TOP_25_PERCENTILE_SUFFIX,
    field_names.SCORE_G_COMMUNITIES,
    field_names.SCORE_G,
    field_names.SCORE_L_COMMUNITIES,
    field_names.SCORE_L + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HIGH_SCHOOL_ED_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LINGUISTIC_ISO_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.UNEMPLOYMENT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HOUSING_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.DIABETES_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ASTHMA_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HEART_DISEASE_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LOW_LIFE_EXPECTANCY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.FEMA_RISK_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ENERGY_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.WASTEWATER_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LEAD_PAINT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.DIESEL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_LESS_THAN_200_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
]

# columns to round floats to 2 decimals
TILES_SCORE_FLOAT_COLUMNS = [
    field_names.SCORE_D + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.SCORE_D + field_names.TOP_25_PERCENTILE_SUFFIX,
    field_names.SCORE_E + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.SCORE_E + field_names.TOP_25_PERCENTILE_SUFFIX,
    field_names.SCORE_L + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_FIELD,
    field_names.HIGH_SCHOOL_ED_FIELD,
    field_names.LINGUISTIC_ISO_FIELD,
    field_names.UNEMPLOYMENT_FIELD,
    field_names.HOUSING_BURDEN_FIELD,
    field_names.POVERTY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HIGH_SCHOOL_ED_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LINGUISTIC_ISO_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.UNEMPLOYMENT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HOUSING_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.DIABETES_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ASTHMA_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HEART_DISEASE_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LOW_LIFE_EXPECTANCY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.FEMA_RISK_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ENERGY_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.WASTEWATER_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LEAD_PAINT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.DIESEL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_LESS_THAN_200_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
]
TILES_ROUND_NUM_DECIMALS = 2

DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_BASIC = [
    field_names.AMI_FIELD,
    field_names.POVERTY_LESS_THAN_100_FPL_FIELD,
    field_names.HIGH_SCHOOL_ED_FIELD,
    field_names.DIABETES_FIELD,
    field_names.ASTHMA_FIELD,
    field_names.HEART_DISEASE_FIELD,
    field_names.TRAFFIC_FIELD,
    field_names.FEMA_RISK_FIELD,
    field_names.ENERGY_BURDEN_FIELD,
    field_names.HOUSING_BURDEN_FIELD,
    field_names.WASTEWATER_FIELD,
    field_names.LEAD_PAINT_FIELD,
    field_names.DIESEL_FIELD,
    field_names.PM25_FIELD,
    field_names.TOTAL_POP_FIELD,
]

# For every indicator above, we want to include percentile also.
DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_FULL = list(
    pd.core.common.flatten(
        [
            [p, f"{p}{field_names.PERCENTILE_FIELD_SUFFIX}"]
            for p in DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_BASIC
        ]
    )
)

# Finally we augment with the GEOID10, county, and state
DOWNLOADABLE_SCORE_COLUMNS = [
    field_names.GEOID_TRACT_FIELD,
    field_names.COUNTY_FIELD,
    field_names.STATE_FIELD,
    field_names.SCORE_G_COMMUNITIES,
    # Note: the reverse percentile fields get moved down here because
    # we put the raw value in the download along with the *reversed* percentile.
    # All other fields we put in f"{field_name}" and
    # f"{field_name}{field_names.PERCENTILE_FIELD_SUFFIX}", which doesn't work for the
    # reversed percentile fields.
    field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD,
    field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LIFE_EXPECTANCY_FIELD,
    field_names.LOW_LIFE_EXPECTANCY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    *DOWNLOADABLE_SCORE_INDICATOR_COLUMNS_FULL,
]
