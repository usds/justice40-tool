# Suffixes
PERCENTILE_FIELD_SUFFIX = " (percentile)"
PERCENTILE_URBAN_RURAL_FIELD_SUFFIX = " (percentile urban/rural)"
MIN_MAX_FIELD_SUFFIX = " (min-max normalized)"
TOP_25_PERCENTILE_SUFFIX = " (top 25th percentile)"
ISLAND_AREAS_PERCENTILE_ADJUSTMENT_FIELD = " for island areas"

# Geographic field names
GEOID_TRACT_FIELD = "GEOID10_TRACT"
STATE_FIELD = "State/Territory"
COUNTY_FIELD = "County Name"

# Score file field names
SCORE_A = "Score A"
SCORE_B = "Score B"
SCORE_C = "Score C"
C_SOCIOECONOMIC = "Socioeconomic Factors"
C_SENSITIVE = "Sensitive populations"
C_ENVIRONMENTAL = "Environmental effects"
C_EXPOSURES = "Exposures"
SCORE_D = "Score D"
SCORE_E = "Score E"
SCORE_F_COMMUNITIES = "Score F (communities)"
SCORE_G = "Score G"
SCORE_G_COMMUNITIES = "Score G (communities)"
SCORE_H = "Score H"
SCORE_H_COMMUNITIES = "Score H (communities)"
SCORE_I = "Score I"
SCORE_I_COMMUNITIES = "Score I (communities)"
SCORE_K = "NMTC (communities)"
SCORE_K_COMMUNITIES = "Score K (communities)"

# Definition L fields
SCORE_L = "Definition L"
SCORE_L_COMMUNITIES = "Definition L (communities)"
L_CLIMATE = "Climate Factor (Definition L)"
L_ENERGY = "Energy Factor (Definition L)"
L_TRANSPORTATION = "Transportation Factor (Definition L)"
L_HOUSING = "Housing Factor (Definition L)"
L_POLLUTION = "Pollution Factor (Definition L)"
L_WATER = "Water Factor (Definition L)"
L_HEALTH = "Health Factor (Definition L)"
L_WORKFORCE = "Workforce Factor (Definition L)"
L_NON_WORKFORCE = "Any Non-Workforce Factor (Definition L)"

# Definition M fields
SCORE_M = "Definition M"
SCORE_M_COMMUNITIES = "Definition M (communities)"
M_CLIMATE = "Climate Factor (Definition M)"
M_ENERGY = "Energy Factor (Definition M)"
M_TRANSPORTATION = "Transportation Factor (Definition M)"
M_HOUSING = "Housing Factor (Definition M)"
M_POLLUTION = "Pollution Factor (Definition M)"
M_WATER = "Water Factor (Definition M)"
M_HEALTH = "Health Factor (Definition M)"
M_WORKFORCE = "Workforce Factor (Definition M)"
M_NON_WORKFORCE = "Any Non-Workforce Factor (Definition M)"

PERCENTILE = 90
MEDIAN_HOUSE_VALUE_PERCENTILE = 90

# Boolean fields
CLIMATE_THRESHOLD_EXCEEDED = "At least one climate threshold exceeded"
ENERGY_THRESHOLD_EXCEEDED = "At least one energy threshold exceeded"
TRAFFIC_THRESHOLD_EXCEEDED = "At least one traffic threshold exceeded"
HOUSING_THREHSOLD_EXCEEDED = "At least one housing threshold exceeded"
POLLUTION_THRESHOLD_EXCEEDED = "At least one pollution threshold exceeded"
WATER_THRESHOLD_EXCEEDED = "At least one water threshold exceeded"
HEALTH_THRESHOLD_EXCEEDED = "At least one health threshold exceeded"
WORKFORCE_THRESHOLD_EXCEEDED = "At least one workforce threshold exceeded"
WORKFORCE_SOCIO_INDICATORS_EXCEEDED = (
    "Both workforce socioeconomic indicators exceeded"
)

# For now, these are not used. Will delete after following up with Vim.
POLLUTION_SOCIO_INDICATORS_EXCEEDED = (
    "Both pollution socioeconomic indicators exceeded"
)
CLIMATE_SOCIO_INDICATORS_EXCEEDED = (
    "Both climate socioeconomic indicators exceeded"
)
ENERGY_SOCIO_INDICATORS_EXCEEDED = (
    "Both energy socioeconomic indicators exceeded"
)
HOUSING_SOCIO_INDICATORS_EXCEEDED = (
    "Both housing socioeconomic indicators exceeded"
)
WATER_SOCIO_INDICATORS_EXCEEDED = "Both water socioeconomic indicators exceeded"

HEALTH_SOCIO_INDICATORS_EXCEEDED = (
    "Both health socioeconomic indicators exceeded"
)

# Poverty / Income
POVERTY_FIELD = "Poverty (Less than 200% of federal poverty line)"
POVERTY_LESS_THAN_200_FPL_FIELD = (
    "Percent of individuals below 200% Federal Poverty Line"
)
POVERTY_LESS_THAN_150_FPL_FIELD = (
    "Percent of individuals < 150% Federal Poverty Line"
)
POVERTY_LESS_THAN_100_FPL_FIELD = (
    "Percent of individuals < 100% Federal Poverty Line"
)
STATE_MEDIAN_INCOME_FIELD = (
    "Median household income (State; 2019 inflation-adjusted dollars)"
)
MEDIAN_INCOME_FIELD = "Median household income in the past 12 months"
MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD = (
    "Median household income (% of state median household income)"
)
PERSISTENT_POVERTY_FIELD = "Persistent Poverty Census Tract"
AMI_FIELD = "Area Median Income (State or metropolitan)"
COLLEGE_ATTENDANCE_FIELD = "Percent enrollment in college or graduate school"
COLLEGE_NON_ATTENDANCE_FIELD = (
    "Percent of population not currently enrolled in college or graduate school"
)
MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD = (
    "Median household income as a percent of area median income"
)
LOW_MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD = (
    "Low median household income as a percent of area median income"
)

# Climate
FEMA_RISK_FIELD = "FEMA Risk Index Expected Annual Loss Score"
EXPECTED_BUILDING_LOSS_RATE_FIELD = (
    "Expected building loss rate (Natural Hazards Risk Index)"
)
EXPECTED_AGRICULTURE_LOSS_RATE_FIELD = (
    "Expected agricultural loss rate (Natural Hazards Risk Index)"
)
EXPECTED_POPULATION_LOSS_RATE_FIELD = (
    "Expected population loss rate (Natural Hazards Risk Index)"
)

# Environment
DIESEL_FIELD = "Diesel particulate matter exposure"
PM25_FIELD = "PM2.5 in the air"
OZONE_FIELD = "Ozone"
TRAFFIC_FIELD = "Traffic proximity and volume"
LEAD_PAINT_FIELD = "Percent pre-1960s housing (lead paint indicator)"
WASTEWATER_FIELD = "Wastewater discharge"
AGGREGATION_POLLUTION_FIELD = "Pollution Burden"
RMP_FIELD = "Proximity to Risk Management Plan (RMP) facilities"
TSDF_FIELD = "Proximity to hazardous waste sites"
NPL_FIELD = "Proximity to NPL sites"
AIR_TOXICS_CANCER_RISK_FIELD = "Air toxics cancer risk"
RESPIRATORY_HAZARD_FIELD = "Respiratory hazard index"

LOW_INCOME_THRESHOLD = "Exceeds FPL200 threshold"

# Housing
HOUSING_BURDEN_FIELD = "Housing burden (percent)"
HT_INDEX_FIELD = (
    "Housing + Transportation Costs % Income for the Regional Typical Household"
)

# Energy
ENERGY_BURDEN_FIELD = "Energy burden"

# Health
DIABETES_FIELD = (
    "Diagnosed diabetes among adults aged greater than or equal to 18 years"
)
ASTHMA_FIELD = (
    "Current asthma among adults aged greater than or equal to 18 years"
)
HEART_DISEASE_FIELD = (
    "Coronary heart disease among adults aged greater than or equal to 18 years"
)
CANCER_FIELD = "Cancer (excluding skin cancer) among adults aged greater than or equal to 18 years"
HEALTH_INSURANCE_FIELD = (
    "Current lack of health insurance among adults aged 18-64 years"
)
PHYS_HEALTH_NOT_GOOD_FIELD = "Physical health not good for greater than or equal to 14 days among adults aged greater than or equal to 18 years"
LIFE_EXPECTANCY_FIELD = "Life expectancy (years)"
LOW_LIFE_EXPECTANCY_FIELD = "Low life expectancy"

# Other Demographics
TOTAL_POP_FIELD = "Total population"
UNEMPLOYMENT_FIELD = "Unemployment (percent)"
LINGUISTIC_ISO_FIELD = "Linguistic isolation (percent)"
HOUSEHOLDS_LINGUISTIC_ISO_FIELD = (
    "Percent of households in linguistic isolation"
)
HIGH_SCHOOL_ED_FIELD = (
    "Percent individuals age 25 or over with less than high school degree"
)
AGGREGATION_POPULATION_FIELD = "Population Characteristics"
UNDER_5_FIELD = "Individuals under 5 years old"
OVER_64_FIELD = "Individuals over 64 years old"

# Fields from 2010 decennial census (generally only loaded for the territories)
CENSUS_DECENNIAL_MEDIAN_INCOME_2009 = "Median household income in 2009 ($)"
CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009 = (
    "Percentage households below 100% of federal poverty line in 2009"
)
CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009 = "Percent individuals age 25 or over with less than high school degree in 2009"
CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009 = "Unemployment (percent) in 2009"
CENSUS_DECENNIAL_TOTAL_POPULATION_FIELD_2009 = "Total population in 2009"
CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009 = (
    "Median household income as a percent of territory median income in 2009"
)
LOW_CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009 = "Low median household income as a percent of territory median income in 2009"
# Fields from 2010 ACS (loaded for comparison with the territories)
CENSUS_UNEMPLOYMENT_FIELD_2010 = "Unemployment (percent) in 2010"
CENSUS_POVERTY_LESS_THAN_100_FPL_FIELD_2010 = (
    "Percent of individuals less than 100% Federal Poverty Line in 2010"
)

# RSEI Aggregated Micro-data
EPA_RSEI_NUMBER_FACILITIES_FIELD = "Number of facilities affecting the tract"
EPA_RSEI_NUMBER_RELEASES_FIELD = "Number of releases affecting the tract"
EPA_RSEI_NUMBER_CHEMICALS_FIELD = "Number of chemicals affecting the tract"
EPA_RSEI_AVERAGE_TOXICITY_FIELD = (
    "Average toxicity-weighted concentration of the cells in the tract"
)
EPA_RSEI_SCORE_FIELD = "RSEI Risk Score"
EPA_RSEI_CSCORE_FIELD = "RSEI Risk Score (Cancer toxicity weights)"
EPA_RSEI_NCSCORE_FIELD = "RSEI Risk Score (Noncancer toxicity weights)"
EPA_RSEI_POPULATION_FIELD = "Sum of the population of the cells in the tract"
EPA_RSEI_SCORE_THRESHOLD_FIELD = (
    "At or above 75 for overall percentile for the RSEI score"
)

# Combined fields that merge island areas and states data
COMBINED_CENSUS_TOTAL_POPULATION_2010 = (
    "Total population in 2009 (island areas) and 2019 (states and PR)"
)
COMBINED_UNEMPLOYMENT_2010 = (
    "Unemployment (percent) in 2009 (island areas) and 2010 (states and PR)"
)
COMBINED_POVERTY_LESS_THAN_100_FPL_FIELD_2010 = (
    "Percentage households below 100% of federal poverty line in 2009 (island areas) "
    "and 2010 (states and PR)"
)

# Urban Rural Map
URBAN_HEURISTIC_FIELD = "Urban Heuristic Flag"

# Housing value
MEDIAN_HOUSE_VALUE_FIELD = "Median value ($) of owner-occupied housing units"

# EJSCREEN Areas of Concern
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_70TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, National, 70th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_75TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, National, 75th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_80TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, National, 80th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_85TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, National, 85th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_90TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, National, 90th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_95TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, National, 95th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_70TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, State, 70th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_75TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, State, 75th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_80TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, State, 80th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_85TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, State, 85th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_90TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, State, 90th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_95TH_PERCENTILE_COMMUNITIES_FIELD = (
    "EJSCREEN Areas of Concern, State, 95th percentile (communities)"
)
# Mapping inequality data.
HOLC_GRADE_D_TRACT_PERCENT_FIELD: str = "Percent of tract that is HOLC Grade D"
HOLC_GRADE_D_TRACT_20_PERCENT_FIELD: str = "Tract is >20% HOLC Grade D"
HOLC_GRADE_D_TRACT_50_PERCENT_FIELD: str = "Tract is >50% HOLC Grade D"
HOLC_GRADE_D_TRACT_75_PERCENT_FIELD: str = "Tract is >75% HOLC Grade D"

# Michigan Environmental Screening Tool ETL Constants
MICHIGAN_EJSCREEN_SCORE_FIELD: str = "Michigan EJSCREEN Score Field"
MICHIGAN_EJSCREEN_PERCENTILE_FIELD: str = "Michigan EJSCREEN Percentile Field"
MICHIGAN_EJSCREEN_PRIORITY_COMMUNITY_FIELD: str = (
    "Michigan EJSCREEN Priority Community"
)

# CDC SVI INDEX percentile fields
CDC_SVI_INDEX_SE_THEME_FIELD: str = "SVI - Socioeconomic Index"
CDC_SVI_INDEX_HOUSEHOLD_THEME_COMPOSITION_FIELD: str = (
    "SVI - Household Composition Index"
)
CDC_SVI_INDEX_LANGUAGE_THEME_FIELD: str = "SVI- Minority Status/Language Index"
CDC_SVI_INDEX_HOUSING_TRANSPORTATION_FIELD: str = (
    "SVI- Housing Type/Transportation Index"
)
CDC_SVI_INDEX_RPL_THEMES_OVERALL_FIELD: str = (
    "Overall rank for Social Vulnerability Indices"
)
CDC_SVI_INDEX_THEMES_PRIORITY_COMMUNITY: str = "At or above 90 for overall percentile ranking according to Social Vulnerability Indices"

# Maryland EJSCREEN Data.
MARYLAND_EJSCREEN_SCORE_FIELD: str = "Maryland Environmental Justice Score"

MARYLAND_EJSCREEN_BURDENED_THRESHOLD_FIELD: str = (
    "Maryland EJSCREEN Priority Community"
)
# Child Opportunity Index data
# Summer days with maximum temperature above 90F.
EXTREME_HEAT_FIELD = "Summer days above 90F"

# Percentage households without a car located further than a half-mile from the
# nearest supermarket.
HEALTHY_FOOD_FIELD = "Percent low access to healthy food"

# Percentage impenetrable surface areas such as rooftops, roads or parking lots.
IMPENETRABLE_SURFACES_FIELD = "Percent impenetrable surface areas"

# Percentage third graders scoring proficient on standardized reading tests,
# converted to NAEP scale score points.
READING_FIELD = "Third grade reading proficiency"
LOW_READING_FIELD = "Low third grade reading proficiency"

# Alternative energy-related definition of DACs
ENERGY_RELATED_COMMUNITIES_DEFINITION_ALTERNATIVE = (
    "Energy-related alternative definition of communities"
)
COAL_EMPLOYMENT = "Coal employment"
OUTAGE_EVENTS = "Outage Events"
HOMELESSNESS = "Homelessness"
DISABLED_POPULATION = "Disabled population"
OUTAGE_DURATION = "Outage Duration"
JOB_ACCESS = "Job Access"
FOSSIL_ENERGY_EMPLOYMENT = "Fossil energy employment"
FOOD_DESERT = "Food Desert"
INCOMPLETE_PLUMBING = "Incomplete Plumbing"
NON_GRID_CONNECTED_HEATING_FUEL = "Non-grid-connected heating fuel"
PARKS = "Parks"
GREATER_THAN_30_MIN_COMMUTE = "Greater than 30 min commute"
INTERNET_ACCESS = "Internet Access"
MOBILE_HOME = "Mobile Home"
SINGLE_PARENT = "Single Parent"
TRANSPORTATION_COSTS = "Transportation Costs"

#####
# Names for individual factors being exceeded

# Climate Change
EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for expected population loss rate and is low income?"
)
EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for expected agriculture loss rate and is low income?"
)
EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for expected building loss rate and is low income?"
)
AGRICULTURAL_VALUE_BOOL_FIELD = "Contains agricultural value"

# Clean energy and efficiency
PM25_EXPOSURE_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for PM2.5 exposure and is low income?"
ENERGY_BURDEN_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for energy burden and is low income?"

# Clean transportation
DIESEL_PARTICULATE_MATTER_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for "
    "diesel particulate matter and is low income?"
)
TRAFFIC_PROXIMITY_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for traffic proximity and is low income?"

# Affordable and Sustainable Housing
LEAD_PAINT_MEDIAN_HOUSE_VALUE_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for lead paint and"
    f" the median house value is less than {MEDIAN_HOUSE_VALUE_PERCENTILE}th "
    f"percentile and is low income?"
)
HOUSING_BURDEN_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for housing burden and is low income?"

# Remediation and Reduction of Legacy Pollution
RMP_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for proximity to RMP sites and is low income?"
SUPERFUND_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for proximity to superfund sites and is low income?"
HAZARDOUS_WASTE_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for proximity to hazardous waste facilities and is low income?"
)

# Critical Clean Water and Waste Infrastructure
WASTEWATER_DISCHARGE_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for wastewater discharge and is low income?"

# Health Burdens
DIABETES_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for diabetes and is low income?"
ASTHMA_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for asthma and is low income?"
HEART_DISEASE_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for heart disease and is low income?"

LOW_LIFE_EXPECTANCY_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile "
    f"for low life expectancy and is low income?"
)

# Score M Low Income Change
SCORE_M_LOW_INCOME_SUFFIX = (
    ", is low income, and has a low percent of higher ed students"
)

COLLEGE_ATTENDANCE_LESS_THAN_20_FIELD = (
    "Percent higher ed enrollment rate is less than 20%"
)

# Climate Change
EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for expected population loss rate{SCORE_M_LOW_INCOME_SUFFIX}?"
)
EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for expected agriculture loss rate{SCORE_M_LOW_INCOME_SUFFIX}?"
)
EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for expected building loss rate{SCORE_M_LOW_INCOME_SUFFIX}?"
)

# Clean Energy and Efficiency
PM25_EXPOSURE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile "
    f"for PM2.5 exposure{SCORE_M_LOW_INCOME_SUFFIX}?"
)
ENERGY_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile "
    f"for energy burden{SCORE_M_LOW_INCOME_SUFFIX}?"
)

# Clean Transportation
DIESEL_PARTICULATE_MATTER_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for "
    f"diesel particulate matter{SCORE_M_LOW_INCOME_SUFFIX}?"
)
TRAFFIC_PROXIMITY_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for "
    f"traffic proximity{SCORE_M_LOW_INCOME_SUFFIX}?"
)

# Affordable and Sustainable Housing
LEAD_PAINT_MEDIAN_HOUSE_VALUE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for lead paint,"
    f" the median house value is less than {MEDIAN_HOUSE_VALUE_PERCENTILE}th "
    f"percentile{SCORE_M_LOW_INCOME_SUFFIX}?"
)
HOUSING_BURDEN_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile "
    f"for housing burden{SCORE_M_LOW_INCOME_SUFFIX}?"
)

# Remediation and Reduction of Legacy Pollution
RMP_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for "
    f"proximity to RMP sites{SCORE_M_LOW_INCOME_SUFFIX}?"
)
SUPERFUND_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for proximity to "
    f"superfund sites{SCORE_M_LOW_INCOME_SUFFIX}?"
)
HAZARDOUS_WASTE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile"
    f" for proximity to hazardous waste facilities{SCORE_M_LOW_INCOME_SUFFIX}?"
)

# Critical Clean Water and Waste Infrastructure
WASTEWATER_DISCHARGE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for"
    f" wastewater discharge{SCORE_M_LOW_INCOME_SUFFIX}?"
)

# Health Burdens
DIABETES_LOW_INCOME_LOW_HIGHER_ED_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for diabetes{SCORE_M_LOW_INCOME_SUFFIX}?"
ASTHMA_LOW_INCOME_LOW_HIGHER_ED_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for asthma{SCORE_M_LOW_INCOME_SUFFIX}?"
HEART_DISEASE_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile "
    f"for heart disease{SCORE_M_LOW_INCOME_SUFFIX}?"
)

LOW_LIFE_EXPECTANCY_LOW_INCOME_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile "
    f"for low life expectancy{SCORE_M_LOW_INCOME_SUFFIX}?"
)

# Workforce
UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for unemployment"
    " and has low HS education?"
)

LINGUISTIC_ISOLATION_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for households in linguistic isolation"
    " and has low HS education?"
)

POVERTY_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for households at or below 100% federal poverty level"
    " and has low HS education?"
)

LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for low median household income as a "
    f"percent of area median income and has low HS education?"
)

# Score M Workforce Variables
SCORE_M_LOW_EDUCATION_SUFFIX = (
    ", has low HS attainment, and has a low percent of higher ed students"
)

UNEMPLOYMENT_LOW_HS_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for unemployment"
    f"{SCORE_M_LOW_EDUCATION_SUFFIX}?"
)

LINGUISTIC_ISOLATION_LOW_HS_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for households in linguistic isolation"
    f"{SCORE_M_LOW_EDUCATION_SUFFIX}?"
)

POVERTY_LOW_HS_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for households at or below 100% federal poverty level"
    f"{SCORE_M_LOW_EDUCATION_SUFFIX}?"
)

LOW_MEDIAN_INCOME_LOW_HS_LOW_HIGHER_ED_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for low median household income as a "
    f"percent of area median income{SCORE_M_LOW_EDUCATION_SUFFIX}?"
)

LOW_HS_EDUCATION_FIELD = "Low high school education"
LOW_HS_EDUCATION_LOW_HIGHER_ED_FIELD = (
    "Low high school education and low percent of higher ed students"
)

# Workforce for island areas
ISLAND_AREAS_SUFFIX = " in 2009 (island areas)"
ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for unemployment"
    f" and has low HS education{ISLAND_AREAS_SUFFIX}?"
)

ISLAND_AREAS_POVERTY_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for households at or below 100% federal poverty level"
    f" and has low HS education{ISLAND_AREAS_SUFFIX}?"
)

ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for low median household income as a "
    f"percent of area median income"
    f" and has low HS education{ISLAND_AREAS_SUFFIX}?"
)

ISLAND_AREAS_LOW_HS_EDUCATION_FIELD = (
    f"Low high school education{ISLAND_AREAS_SUFFIX}"
)

# Not currently used in a factor
EXTREME_HEAT_MEDIAN_HOUSE_VALUE_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for summer days above 90F and "
    f"the median house value is less than {MEDIAN_HOUSE_VALUE_PERCENTILE}th "
    f"percentile and is low income?"
)

IMPENETRABLE_SURFACES_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for impenetrable surfaces and is low "
    f"income?"
)
AIR_TOXICS_CANCER_RISK_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for air toxics cancer risk and is low income?"
RESPIRATORY_HAZARD_LOW_INCOME_FIELD = f"Greater than or equal to the {PERCENTILE}th percentile for respiratory hazard index and is low income?"
HEALTHY_FOOD_LOW_INCOME_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for low "
    f"access to healthy food and is low income?"
)

LOW_READING_LOW_HS_EDUCATION_FIELD = (
    f"Greater than or equal to the {PERCENTILE}th percentile for low 3rd grade reading proficiency"
    " and has low HS education?"
)

THRESHOLD_COUNT = "Total threshold criteria exceeded"

FPL_200_SERIES = "Is low income?"
FPL_200_AND_COLLEGE_ATTENDANCE_SERIES = (
    "Is low income and has a low percent of higher ed students?"
)

# Mapping for Environmental Justice columns
MAPPING_FOR_EJ_FINAL_PERCENTILE_FIELD = (
    "Mapping for Environmental Justice Final Percentile"
)
MAPPING_FOR_EJ_FINAL_SCORE_FIELD = (
    "Mapping for Environmental Justice Final Score"
)
MAPPING_FOR_EJ_PRIORITY_COMMUNITY_FIELD = (
    "Mapping for Environmental Justice Priority Community"
)

# End of names for individual factors being exceeded
####
