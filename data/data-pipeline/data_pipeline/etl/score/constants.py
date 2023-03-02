import os
from pathlib import Path

from data_pipeline.config import settings
from data_pipeline.score import field_names

## note: to keep map porting "right" fields, keeping descriptors the same.


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
if not os.environ.get("J40_VERSION_LABEL_STRING"):
    version_str = "beta"
else:
    version_str = os.environ.get("J40_VERSION_LABEL_STRING")

SCORE_DOWNLOADABLE_DIR = DATA_SCORE_DIR / "downloadable"
SCORE_DOWNLOADABLE_PDF_FILE_NAME = "draft-communities-list.pdf"
SCORE_DOWNLOADABLE_PDF_FILE_PATH = FILES_PATH / SCORE_DOWNLOADABLE_PDF_FILE_NAME
SCORE_DOWNLOADABLE_TSD_FILE_NAME = "cejst-technical-support-document.pdf"
SCORE_DOWNLOADABLE_TSD_FILE_PATH = FILES_PATH / SCORE_DOWNLOADABLE_TSD_FILE_NAME
SCORE_DOWNLOADABLE_CSV_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"{version_str}-communities.csv"
)
SCORE_DOWNLOADABLE_EXCEL_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"{version_str}-communities.xlsx"
)
SCORE_DOWNLOADABLE_CODEBOOK_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"{version_str}-codebook.csv"
)
SCORE_DOWNLOADABLE_CSV_ZIP_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"{version_str}-communities-csv.zip"
)
SCORE_DOWNLOADABLE_XLS_ZIP_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"{version_str}-communities-xls.zip"
)
SCORE_VERSIONING_DATA_DOCUMENTATION_ZIP_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"{version_str}-data-documentation.zip"
)
SCORE_VERSIONING_SHAPEFILE_CODEBOOK_FILE_PATH = (
    SCORE_DOWNLOADABLE_DIR / f"{version_str}-shapefile-codebook.zip"
)
SCORE_VERSIONING_README_FILE_NAME = f"readme-version-{version_str}.md"
SCORE_VERSIONING_README_FILE_PATH = (
    FILES_PATH / SCORE_VERSIONING_README_FILE_NAME
)

# For the codebook
CEJST_SCORE_COLUMN_NAME = "score_name"
CSV_FORMAT = "csv_format"
CSV_LABEL_FIELD = "csv_label"
EXCEL_LABEL_FIELD = "excel_label"
NOTES_FIELD = "notes"
THRESHOLD_CATEGORY_FIELD = "threshold_category"
CALCULATION_NOTES_FIELD = "calculation_notes"
CSV_FIELD_TYPE_FIELD = "csv_field_type"
CODEBOOK_COLUMNS = [
    CSV_LABEL_FIELD,
    EXCEL_LABEL_FIELD,
    CEJST_SCORE_COLUMN_NAME,
    CSV_FIELD_TYPE_FIELD,
    CALCULATION_NOTES_FIELD,
    THRESHOLD_CATEGORY_FIELD,
    NOTES_FIELD,
]
LOSS_RATE_STRING = "loss rate"
LOW_STRING = "Low "
ISLAND_STRING = "island areas"
PERCENTILE_EXPLANATION = (
    "All percentiles are floored (rounded down to the nearest percentile). "
    + "For example, 89.7th percentile is rounded down to 89 for this field."
)
LOW_PERCENTILE_EXPLANATION = "This percentile is reversed, meaning the lowest raw numbers become the highest percentiles."
ISLAND_AREAS_EXPLANATION = (
    "Because not all data is available for the Nation, Puerto Rico, "
    + "and the Island Areas, this uses different underlying data for the island areas."
)

# Column subsets
CENSUS_COUNTIES_COLUMNS = ["USPS", "GEOID", "NAME"]

# Drop FIPS codes from map
DROP_FIPS_CODES = []

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
TILES_PUERTO_RICO_THRESHOLD_COUNT = 10
TILES_NATION_THRESHOLD_COUNT = 21

# Note that the FIPS code is a string
# The FIPS codes listed are:
# 60: American Samoa, 66: Guam, 69: N. Mariana Islands, 78: US Virgin Islands
TILES_ISLAND_AREA_FIPS_CODES = ["60", "66", "69", "78"]
TILES_PUERTO_RICO_FIPS_CODE = ["72"]
TILES_ALASKA_AND_HAWAII_FIPS_CODE = ["02", "15"]
TILES_CONTINENTAL_US_FIPS_CODE = [
    "01",
    "04",
    "05",
    "06",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "53",
    "54",
    "55",
    "56",
]

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
    field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "PM25F_PFS",
    field_names.HIGH_SCHOOL_ED_FIELD: "HSEF",
    field_names.POVERTY_LESS_THAN_100_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "P100_PFS",
    field_names.POVERTY_LESS_THAN_200_FPL_IMPUTED_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "P200_I_PFS",
    field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED_DONUTS: "AJDLI_ET",
    field_names.LEAD_PAINT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "LPF_PFS",
    field_names.NO_KITCHEN_OR_INDOOR_PLUMBING_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "KP_PFS",
    field_names.NPL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "NPL_PFS",
    field_names.RMP_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "RMP_PFS",
    field_names.TSDF_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "TSDF_PFS",
    field_names.TOTAL_POP_FIELD: "TPF",
    field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "TF_PFS",
    field_names.UNEMPLOYMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "UF_PFS",
    field_names.WASTEWATER_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "WF_PFS",
    field_names.UST_FIELD + field_names.PERCENTILE_FIELD_SUFFIX: "UST_PFS",
    field_names.N_WATER: "N_WTR",
    field_names.N_WORKFORCE: "N_WKFC",
    field_names.N_CLIMATE: "N_CLT",
    field_names.N_ENERGY: "N_ENY",
    field_names.N_TRANSPORTATION: "N_TRN",
    field_names.N_HOUSING: "N_HSG",
    field_names.N_POLLUTION: "N_PLN",
    field_names.N_HEALTH: "N_HLTH",
    # temporarily update this so that it's the Narwhal score that gets visualized on the map
    # The NEW final score value INCLUDES the adjacency index.
    field_names.FINAL_SCORE_N_BOOLEAN: "SN_C",
    field_names.IS_TRIBAL_DAC: "SN_T",
    field_names.DIABETES_LOW_INCOME_FIELD: "DLI",
    field_names.ASTHMA_LOW_INCOME_FIELD: "ALI",
    field_names.POVERTY_LOW_HS_EDUCATION_FIELD: "PLHSE",
    field_names.LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD: "LMILHSE",
    field_names.UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD: "ULHSE",
    # new booleans only for the environmental factors
    field_names.EXPECTED_POPULATION_LOSS_EXCEEDS_PCTILE_THRESHOLD: "EPL_ET",
    field_names.EXPECTED_AGRICULTURAL_LOSS_EXCEEDS_PCTILE_THRESHOLD: "EAL_ET",
    field_names.EXPECTED_BUILDING_LOSS_EXCEEDS_PCTILE_THRESHOLD: "EBL_ET",
    field_names.ENERGY_BURDEN_EXCEEDS_PCTILE_THRESHOLD: "EB_ET",
    field_names.PM25_EXCEEDS_PCTILE_THRESHOLD: "PM25_ET",
    field_names.DIESEL_EXCEEDS_PCTILE_THRESHOLD: "DS_ET",
    field_names.TRAFFIC_PROXIMITY_PCTILE_THRESHOLD: "TP_ET",
    field_names.LEAD_PAINT_PROXY_PCTILE_THRESHOLD: "LPP_ET",
    field_names.HISTORIC_REDLINING_SCORE_EXCEEDED: "HRS_ET",
    field_names.NO_KITCHEN_OR_INDOOR_PLUMBING_PCTILE_THRESHOLD: "KP_ET",
    field_names.HOUSING_BURDEN_PCTILE_THRESHOLD: "HB_ET",
    field_names.RMP_PCTILE_THRESHOLD: "RMP_ET",
    field_names.NPL_PCTILE_THRESHOLD: "NPL_ET",
    field_names.TSDF_PCTILE_THRESHOLD: "TSDF_ET",
    field_names.WASTEWATER_PCTILE_THRESHOLD: "WD_ET",
    field_names.UST_PCTILE_THRESHOLD: "UST_ET",
    field_names.DIABETES_PCTILE_THRESHOLD: "DB_ET",
    field_names.ASTHMA_PCTILE_THRESHOLD: "A_ET",
    field_names.HEART_DISEASE_PCTILE_THRESHOLD: "HD_ET",
    field_names.LOW_LIFE_EXPECTANCY_PCTILE_THRESHOLD: "LLE_ET",
    field_names.UNEMPLOYMENT_PCTILE_THRESHOLD: "UN_ET",
    field_names.LINGUISTIC_ISOLATION_PCTILE_THRESHOLD: "LISO_ET",
    field_names.POVERTY_PCTILE_THRESHOLD: "POV_ET",
    field_names.LOW_MEDIAN_INCOME_PCTILE_THRESHOLD: "LMI_ET",
    field_names.ISLAND_LOW_MEDIAN_INCOME_PCTILE_THRESHOLD: "IA_LMI_ET",
    field_names.ISLAND_UNEMPLOYMENT_PCTILE_THRESHOLD: "IA_UN_ET",
    field_names.ISLAND_POVERTY_PCTILE_THRESHOLD: "IA_POV_ET",
    field_names.THRESHOLD_COUNT: "TC",
    field_names.CATEGORY_COUNT: "CC",
    field_names.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD: "IAULHSE",
    field_names.ISLAND_AREAS_POVERTY_LOW_HS_EDUCATION_FIELD: "IAPLHSE",
    field_names.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD: "IALMILHSE",
    # Percentiles for Island areas' workforce columns
    field_names.LOW_CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009
    + field_names.PERCENTILE_FIELD_SUFFIX: "IALMILHSE_PFS",
    field_names.CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009
    + field_names.ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "IAPLHSE_PFS",
    field_names.CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009
    + field_names.ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "IAULHSE_PFS",
    field_names.LOW_HS_EDUCATION_FIELD: "LHE",
    field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD: "IALHE",
    # Percentage of HS Degree completion for Islands
    field_names.CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009: "IAHSEF",
    # Booleans for the front end about the types of thresholds exceeded
    field_names.CLIMATE_THRESHOLD_EXCEEDED: "N_CLT_EOMI",
    field_names.ENERGY_THRESHOLD_EXCEEDED: "N_ENY_EOMI",
    field_names.TRAFFIC_THRESHOLD_EXCEEDED: "N_TRN_EOMI",
    field_names.HOUSING_THREHSOLD_EXCEEDED: "N_HSG_EOMI",
    field_names.POLLUTION_THRESHOLD_EXCEEDED: "N_PLN_EOMI",
    field_names.WATER_THRESHOLD_EXCEEDED: "N_WTR_EOMI",
    field_names.HEALTH_THRESHOLD_EXCEEDED: "N_HLTH_EOMI",
    field_names.WORKFORCE_THRESHOLD_EXCEEDED: "N_WKFC_EOMI",
    # These are the booleans for socioeconomic indicators
    ## this measures low income boolean
    field_names.FPL_200_SERIES_IMPUTED_AND_ADJUSTED: "FPL200S",
    ## Low high school for t&wd
    field_names.WORKFORCE_SOCIO_INDICATORS_EXCEEDED: "N_WKFC_EBSI",
    field_names.DOT_BURDEN_PCTILE_THRESHOLD: "TD_ET",
    field_names.DOT_TRAVEL_BURDEN_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "TD_PFS",
    field_names.FUTURE_FLOOD_RISK_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "FLD_PFS",
    field_names.FUTURE_WILDFIRE_RISK_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX: "WFR_PFS",
    field_names.HIGH_FUTURE_FLOOD_RISK_FIELD: "FLD_ET",
    field_names.HIGH_FUTURE_WILDFIRE_RISK_FIELD: "WFR_ET",
    field_names.ADJACENT_TRACT_SCORE_ABOVE_DONUT_THRESHOLD: "ADJ_ET",
    field_names.TRACT_PERCENT_NON_NATURAL_FIELD_NAME
    + field_names.PERCENTILE_FIELD_SUFFIX: "IS_PFS",
    field_names.NON_NATURAL_PCTILE_THRESHOLD: "IS_ET",  # NON_NATURAL_LOW_INCOME_FIELD_NAME
    field_names.AML_BOOLEAN_FILLED_IN: "AML_ET",
    field_names.ELIGIBLE_FUDS_BINARY_FIELD_NAME: "FUDS_RAW",
    field_names.ELIGIBLE_FUDS_FILLED_IN_FIELD_NAME: "FUDS_ET",
    field_names.IMPUTED_INCOME_FLAG_FIELD_NAME: "IMP_FLG",
    ## FPL 200 and low higher ed for all others should no longer be M_EBSI, but rather
    ## FPL_200 (there is no higher ed in narwhal)
    field_names.PERCENT_BLACK_FIELD_NAME: "DM_B",
    field_names.PERCENT_AMERICAN_INDIAN_FIELD_NAME: "DM_AI",
    field_names.PERCENT_ASIAN_FIELD_NAME: "DM_A",
    field_names.PERCENT_HAWAIIAN_FIELD_NAME: "DM_HI",
    field_names.PERCENT_TWO_OR_MORE_RACES_FIELD_NAME: "DM_T",
    field_names.PERCENT_NON_HISPANIC_WHITE_FIELD_NAME: "DM_W",
    field_names.PERCENT_HISPANIC_FIELD_NAME: "DM_H",
    field_names.PERCENT_OTHER_RACE_FIELD_NAME: "DM_O",
    field_names.PERCENT_AGE_UNDER_10: "AGE_10",
    field_names.PERCENT_AGE_10_TO_64: "AGE_MIDDLE",
    field_names.PERCENT_AGE_OVER_64: "AGE_OLD",
    field_names.COUNT_OF_TRIBAL_AREAS_IN_TRACT_AK: "TA_COUNT_AK",
    field_names.COUNT_OF_TRIBAL_AREAS_IN_TRACT_CONUS: "TA_COUNT_C",
    field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT: "TA_PERC",
    field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT_DISPLAY: "TA_PERC_FE",
}
