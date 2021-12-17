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

TILES_ROUND_NUM_DECIMALS = 2
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
    field_names.L_WATER: "L_WTR",
    field_names.L_WORKFORCE: "L_WKFC",
    field_names.L_CLIMATE: "L_CLT",
    field_names.L_ENERGY: "L_ENY",
    field_names.L_TRANSPORTATION: "L_TRN",
    field_names.L_HOUSING: "L_HSG",
    field_names.L_POLLUTION: "L_PLN",
    field_names.L_HEALTH: "L_HLTH",
    field_names.SCORE_L_COMMUNITIES: "SL_C",
    field_names.SCORE_L + field_names.PERCENTILE_FIELD_SUFFIX: "SL_PFS",
    field_names.EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_FIELD: "EPLRLI",
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_FIELD: "EALRLI",
    field_names.EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_FIELD: "EBLRLI",
    field_names.PM25_EXPOSURE_LOW_INCOME_FIELD: "PM25LI",
    field_names.ENERGY_BURDEN_LOW_INCOME_FIELD: "EBLI",
    field_names.DIESEL_PARTICULATE_MATTER_LOW_INCOME_FIELD: "DPMLI",
    field_names.TRAFFIC_PROXIMITY_LOW_INCOME_FIELD: "TPLI",
    field_names.LEAD_PAINT_MEDIAN_HOUSE_VALUE_LOW_INCOME_FIELD: "LPMHVLI",
    field_names.HOUSING_BURDEN_LOW_INCOME_FIELD: "HBLI",
    field_names.RMP_LOW_INCOME_FIELD: "RMPLI",
    field_names.SUPERFUND_LOW_INCOME_FIELD: "SFLI",
    field_names.HAZARDOUS_WASTE_LOW_INCOME_FIELD: "HWLI",
    field_names.WASTEWATER_DISCHARGE_LOW_INCOME_FIELD: "WDLI",
    field_names.DIABETES_LOW_INCOME_FIELD: "DLI",
    field_names.ASTHMA_LOW_INCOME_FIELD: "ALI",
    field_names.HEART_DISEASE_LOW_INCOME_FIELD: "HDLI",
    field_names.LOW_LIFE_EXPECTANCY_LOW_INCOME_FIELD: "LLELI",
    field_names.LINGUISTIC_ISOLATION_LOW_HS_EDUCATION_FIELD: "LILHSE",
    field_names.POVERTY_LOW_HS_EDUCATION_FIELD: "PLHSE",
    field_names.LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD: "LMILHSE",
    field_names.UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD: "ULHSE",
    field_names.LOW_HS_EDUCATION_FIELD: "LHE",
    field_names.FPL_200_SERIES: "FPL200S",
    field_names.THRESHOLD_COUNT: "TC",
    field_names.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD: "IAULHSE",
    field_names.ISLAND_AREAS_POVERTY_LOW_HS_EDUCATION_FIELD: "ISPLHSE",
    field_names.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD: "IALMILHSE",
    field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD: "IALHE",
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
    field_names.LOW_HS_EDUCATION_FIELD,
    field_names.ISLAND_AREAS_LOW_HS_EDUCATION_FIELD,
    field_names.WASTEWATER_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.SCORE_L + field_names.PERCENTILE_FIELD_SUFFIX,
]

# Finally we augment with the GEOID10, county, and state
DOWNLOADABLE_SCORE_COLUMNS = [
    field_names.GEOID_TRACT_FIELD,
    field_names.COUNTY_FIELD,
    field_names.STATE_FIELD,
    field_names.SCORE_L_COMMUNITIES,
    field_names.TOTAL_POP_FIELD,
    field_names.FPL_200_SERIES,
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_FIELD,
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD,
    field_names.EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_FIELD,
    field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_FIELD,
    field_names.EXPECTED_POPULATION_LOSS_RATE_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.EXPECTED_BUILDING_LOSS_RATE_FIELD,
    field_names.ENERGY_BURDEN_LOW_INCOME_FIELD,
    field_names.ENERGY_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ENERGY_BURDEN_FIELD,
    field_names.PM25_EXPOSURE_LOW_INCOME_FIELD,
    field_names.PM25_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.PM25_FIELD,
    field_names.DIESEL_PARTICULATE_MATTER_LOW_INCOME_FIELD,
    field_names.DIESEL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.DIESEL_FIELD,
    field_names.TRAFFIC_PROXIMITY_LOW_INCOME_FIELD,
    field_names.TRAFFIC_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.TRAFFIC_FIELD,
    field_names.HOUSING_BURDEN_LOW_INCOME_FIELD,
    field_names.HOUSING_BURDEN_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HOUSING_BURDEN_FIELD,
    field_names.LEAD_PAINT_MEDIAN_HOUSE_VALUE_LOW_INCOME_FIELD,
    field_names.LEAD_PAINT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LEAD_PAINT_FIELD,
    field_names.MEDIAN_HOUSE_VALUE_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.MEDIAN_HOUSE_VALUE_FIELD,
    field_names.HAZARDOUS_WASTE_LOW_INCOME_FIELD,
    field_names.TSDF_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.TSDF_FIELD,
    field_names.SUPERFUND_LOW_INCOME_FIELD,
    field_names.NPL_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.NPL_FIELD,
    field_names.RMP_LOW_INCOME_FIELD,
    field_names.RMP_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.RMP_FIELD,
    field_names.WASTEWATER_DISCHARGE_LOW_INCOME_FIELD,
    field_names.WASTEWATER_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.WASTEWATER_FIELD,
    field_names.ASTHMA_LOW_INCOME_FIELD,
    field_names.ASTHMA_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.ASTHMA_FIELD,
    field_names.DIABETES_LOW_INCOME_FIELD,
    field_names.DIABETES_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.DIABETES_FIELD,
    field_names.HEART_DISEASE_LOW_INCOME_FIELD,
    field_names.HEART_DISEASE_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HEART_DISEASE_FIELD,
    field_names.LOW_LIFE_EXPECTANCY_LOW_INCOME_FIELD,
    field_names.LOW_LIFE_EXPECTANCY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LIFE_EXPECTANCY_FIELD,
    field_names.LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD,
    field_names.LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD,
    field_names.LINGUISTIC_ISOLATION_LOW_HS_EDUCATION_FIELD,
    field_names.LINGUISTIC_ISO_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.LINGUISTIC_ISO_FIELD,
    field_names.UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD,
    field_names.UNEMPLOYMENT_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.UNEMPLOYMENT_FIELD,
    field_names.POVERTY_LOW_HS_EDUCATION_FIELD,
    field_names.POVERTY_LESS_THAN_200_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_LESS_THAN_100_FPL_FIELD
    + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.POVERTY_LESS_THAN_200_FPL_FIELD,
    field_names.POVERTY_LESS_THAN_100_FPL_FIELD,
    field_names.HIGH_SCHOOL_ED_FIELD + field_names.PERCENTILE_FIELD_SUFFIX,
    field_names.HIGH_SCHOOL_ED_FIELD,
    field_names.COMBINED_UNEMPLOYMENT_2010,
    field_names.COMBINED_POVERTY_LESS_THAN_100_FPL_FIELD_2010,
    field_names.ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD,
    field_names.ISLAND_AREAS_POVERTY_LOW_HS_EDUCATION_FIELD,
    field_names.ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD,
    field_names.THRESHOLD_COUNT,
]
