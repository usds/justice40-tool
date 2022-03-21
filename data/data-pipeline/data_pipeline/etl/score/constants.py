from pathlib import Path
import datetime
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
DATA_SCORE_JSON_INDEX_FILE_PATH = (
    DATA_SCORE_CSV_TILES_PATH / "tile_indexes.json"
)

## Tile path
DATA_SCORE_TILES_DIR = DATA_SCORE_DIR / "tiles"

# Downloadable paths
current_dt = datetime.datetime.now()
timestamp_str = current_dt.strftime("%Y-%m-%d-%H%MGMT")
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

# Drop FIPS codes from map
DROP_FIPS_CODES = ["66", "78"]

# Drop FIPS codes from incrementing
DROP_FIPS_FROM_NON_WTD_THRESHOLDS = "72"

# Percent prefixes for rounding
PERCENT_PREFIXES_SUFFIXES = [
    "Percent",
    "percent",
    "Percentage",
    "Energy burden",
    "greater than or equal to 18 years",
    field_names.PERCENTILE_FIELD_SUFFIX,
]
TILES_ROUND_NUM_DECIMALS = 2

# The following constants and fields get used by the front end to change the side panel.
# The islands, Puerto Rico and the nation all have different
# data available, and as a consequence, show a different number of fields.

# Controlling Tile user experience columns
THRESHOLD_COUNT_TO_SHOW_FIELD_NAME = "THRHLD"
TILES_ISLAND_AREAS_THRESHOLD_COUNT = 3
TILES_PUERTO_RICO_THRESHOLD_COUNT = 4
TILES_NATION_THRESHOLD_COUNT = 21

# Note that the FIPS code is a string
# The FIPS codes listed are:
# 60: American Samoa, 66: Guam, 69: N. Mariana Islands, 78: US Virgin Islands
TILES_ISLAND_AREA_FIPS_CODES = ["60", "66", "69", "78"]
TILES_PUERTO_RICO_FIPS_CODE = ["72"]

# Constant to reflect UI Experience version
# "Nation" referring to 50 states and DC is from Census
USER_INTERFACE_EXPERIENCE_FIELD_NAME = "UI_EXP"
NATION_USER_EXPERIENCE = "Nation"
PUERTO_RICO_USER_EXPERIENCE = "Puerto Rico"
ISLAND_AREAS_USER_EXPERIENCE = "Island Areas"

# FEMA rounding columns
FEMA_ROUND_NUM_COLUMNS = [
    field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD,
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD,
    field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD,
]

TILES_FEMA_ROUND_NUM_DECIMALS = 4

# Tiles data: full field name, tile index name
TILES_SCORE_COLUMNS = {
    field_names.GEOID_TRACT_FIELD: "GTF",
    field_names.STATE_FIELD: "SF",
    field_names.COUNTY_FIELD: "CF",
    field_names.DIABETES_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "DF_PFS",
    field_names.ASTHMA_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "AF_PFS",
    field_names.HEART_DISEASE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "HDF_PFS",
    field_names.DIESEL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "DSF_PFS",
    field_names.ENERGY_BURDEN_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "EBF_PFS",
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "EALR_PFS",
    field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "EBLR_PFS",
    field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "EPLR_PFS",
    field_names.HOUSING_BURDEN_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "HBF_PFS",
    field_names.LOW_LIFE_EXPECTANCY_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "LLEF_PFS",
    field_names.LINGUISTIC_ISO_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "LIF_PFS",
    field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "LMI_PFS",
    field_names.MEDIAN_HOUSE_VALUE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "MHVF_PFS",
    field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "PM25F_PFS",
    field_names.HIGH_SCHOOL_ED_FIELD: "HSEF",
    field_names.POVERTY_LESS_THAN_100_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "P100_PFS",
    field_names.POVERTY_LESS_THAN_200_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "P200_PFS",
    field_names.LEAD_PAINT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "LPF_PFS",
    field_names.NPL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "NPL_PFS",
    field_names.RMP_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "RMP_PFS",
    field_names.TSDF_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "TSDF_PFS",
    field_names.TOTAL_POP_FIELD: "TPF",
    field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "TF_PFS",
    field_names.UNEMPLOYMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "UF_PFS",
    field_names.WASTEWATER_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "WF_PFS",
    field_names.M_WATER: "M_WTR",
    field_names.M_WORKFORCE: "M_WKFC",
    field_names.M_CLIMATE: "M_CLT",
    field_names.M_ENERGY: "M_ENY",
    field_names.M_TRANSPORTATION: "M_TRN",
    field_names.M_HOUSING: "M_HSG",
    field_names.M_POLLUTION: "M_PLN",
    field_names.M_HEALTH: "M_HLTH",
    field_names.SCORE_M_COMMUNITIES: "SM_C",
    field_names.SCORE_M + field_names.PERCENTILE_FIELD_SUFFIX: "SM_PFS",
    field_names.EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "EPLRLI",
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "EALRLI",
    field_names.EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "EBLRLI",
    field_names.PM25_EXPOSURE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "PM25LI",
    field_names.ENERGY_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD: "EBLI",
    field_names.DIESEL_PARTICULATE_MATTER_LOW_INCOME_LOW_HIGHER_ED_FIELD: "DPMLI",
    field_names.TRAFFIC_PROXIMITY_LOW_INCOME_LOW_HIGHER_ED_FIELD: "TPLI",
    field_names.LEAD_PAINT_MEDIAN_HOUSE_VALUE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "LPMHVLI",
    field_names.HOUSING_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD: "HBLI",
    field_names.RMP_LOW_INCOME_LOW_HIGHER_ED_FIELD: "RMPLI",
    field_names.SUPERFUND_LOW_INCOME_LOW_HIGHER_ED_FIELD: "SFLI",
    field_names.HAZARDOUS_WASTE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "HWLI",
    field_names.WASTEWATER_DISCHARGE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "WDLI",
    field_names.DIABETES_LOW_INCOME_LOW_HIGHER_ED_FIELD: "DLI",
    field_names.ASTHMA_LOW_INCOME_LOW_HIGHER_ED_FIELD: "ALI",
    field_names.HEART_DISEASE_LOW_INCOME_LOW_HIGHER_ED_FIELD: "HDLI",
    field_names.LOW_LIFE_EXPECTANCY_LOW_INCOME_LOW_HIGHER_ED_FIELD: "LLELI",
    field_names.LINGUISTIC_ISOLATION_LOW_HS_LOW_HIGHER_ED_FIELD: "LILHSE",
    field_names.POVERTY_LOW_HS_LOW_HIGHER_ED_FIELD: "PLHSE",
    field_names.LOW_MEDIAN_INCOME_LOW_HS_LOW_HIGHER_ED_FIELD: "LMILHSE",
    field_names.UNEMPLOYMENT_LOW_HS_LOW_HIGHER_ED_FIELD: "ULHSE",
    field_names.THRESHOLD_COUNT: "TC",
    field_names.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD: "IAULHSE",
    field_names.ISLAND_AREAS_POVERTY_LOW_HS_EDUCATION_FIELD: "IAPLHSE",
    field_names.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD: "IALMILHSE",
    field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD: "IALHE",
    # Percentiles for Island areas' workforce columns
    field_names.LOW_CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009
    + field_names.PERCENTILE_FIELD_SUFFIX: "IALMILHSE_PFS",
    field_names.CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009
    + field_names.ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "IAPLHSE_PFS",
    field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009
    + field_names.ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "IAULHSE_PFS",
    field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD: "LHE",
    # Percentage of HS Degree completion for Islands
    field_names.CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009: "IAHSEF",
    field_names.COLLEGE_ATTENDANCE_FIELD: "CA",
    field_names.COLLEGE_NON_ATTENDANCE_FIELD: "NCA",
    # This is logically equivalent to "non-college greater than 80%"
    field_names.COLLEGE_ATTENDANCE_LESS_THAN_20_FIELD: "CA_LT20",
    field_names.LOW_INCOME_THRESHOLD: "FPL200S",
    # Booleans for the front end about the types of thresholds exceeded
    field_names.CLIMATE_THRESHOLD_EXCEEDED: "M_CLT_EOMI",
    field_names.ENERGY_THRESHOLD_EXCEEDED: "M_ENY_EOMI",
    field_names.TRAFFIC_THRESHOLD_EXCEEDED: "M_TRN_EOMI",
    field_names.HOUSING_THREHSOLD_EXCEEDED: "M_HSG_EOMI",
    field_names.POLLUTION_THRESHOLD_EXCEEDED: "M_PLN_EOMI",
    field_names.WATER_THRESHOLD_EXCEEDED: "M_WTR_EOMI",
    field_names.HEALTH_THRESHOLD_EXCEEDED: "M_HLTH_EOMI",
    field_names.WORKFORCE_THRESHOLD_EXCEEDED: "M_WKFC_EOMI",
    # These are the booleans for socioeconomic indicators
    ## Low high school and low higher ed for t&wd
    field_names.WORKFORCE_SOCIO_INDICATORS_EXCEEDED: "M_WKFC_EBSI",
    ## FPL 200 and low higher ed for all others
    field_names.FPL_200_AND_COLLEGE_ATTENDANCE_SERIES: "M_EBSI",
}

# columns to round floats to 2 decimals
# TODO refactor to use much smaller subset of fields we DON'T want to round
TILES_SCORE_FLOAT_COLUMNS = [
    field_names.DIABETES_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ASTHMA_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HEART_DISEASE_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.DIESEL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ENERGY_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HOUSING_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LOW_LIFE_EXPECTANCY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LINGUISTIC_ISO_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.MEDIAN_HOUSE_VALUE_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_LESS_THAN_100_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_LESS_THAN_200_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LEAD_PAINT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.NPL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.RMP_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.TSDF_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.UNEMPLOYMENT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    # Percentiles for Island areas' workforce columns
    # To be clear: the island areas pull from 2009 census. PR does not.
    field_names.LOW_CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009
    + field_names.ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009
    + field_names.ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    # Island areas HS degree attainment rate
    field_names.CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009,
    field_names.LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD,
    field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD,
    field_names.WASTEWATER_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.SCORE_M + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.COLLEGE_NON_ATTENDANCE_FIELD,
    field_names.COLLEGE_ATTENDANCE_FIELD,
]
