# Suffixes
PERCENTILE_FIELD_SUFFIX = " (percentile)"
MIN_MAX_FIELD_SUFFIX = " (min-max normalized)"

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
PERCENTILE = 90

# Poverty / Income
POVERTY_FIELD = "Poverty (Less than 200% of federal poverty line)"
POVERTY_LESS_THAN_200_FPL_FIELD = (
    "Percent of individuals < 200% Federal Poverty Line"
)
POVERTY_LESS_THAN_150_FPL_FIELD = (
    "Percent of individuals < 150% Federal Poverty Line"
)
POVERTY_LESS_THAN_100_FPL_FIELD = (
    "Percent of individuals < 100% Federal Poverty Line"
)
MEDIAN_INCOME_PERCENT_AMI_FIELD = "Median household income (% of AMI)"
STATE_MEDIAN_INCOME_FIELD = (
    "Median household income (State; 2019 inflation-adjusted dollars)"
)
MEDIAN_INCOME_FIELD = "Median household income in the past 12 months"
MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD = (
    "Median household income (% of state median household income)"
)
MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD = "Median household income (% of AMI)"
PERSISTENT_POVERTY_FIELD = "Persistent Poverty Census Tract"
AMI_FIELD = "Area Median Income (State or metropolitan)"

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
DIESEL_FIELD = "Diesel particulate matter"
PM25_FIELD = "Particulate matter (PM2.5)"
OZONE_FIELD = "Ozone"
TRAFFIC_FIELD = "Traffic proximity and volume"
LEAD_PAINT_FIELD = "Percent pre-1960s housing (lead paint indicator)"
WASTEWATER_FIELD = "Wastewater discharge"
AGGREGATION_POLLUTION_FIELD = "Pollution Burden"
RMP_FIELD = "Proximity to Risk Management Plan (RMP) facilities"
TSDF_FIELD = "Proximity to TSDF sites"
NPL_FIELD = "Proximity to NPL sites"
AIR_TOXICS_CANCER_RISK_FIELD = "Air toxics cancer risk"

# Housing
HOUSING_BURDEN_FIELD = "Housing burden (percent)"
HT_INDEX_FIELD = (
    "Housing + Transportation Costs % Income for the Regional Typical Household"
)

# Energy
ENERGY_BURDEN_FIELD = "Energy burden"

# Health
DIABETES_FIELD = "Diagnosed diabetes among adults aged >=18 years"
ASTHMA_FIELD = "Current asthma among adults aged >=18 years"
HEART_DISEASE_FIELD = "Coronary heart disease among adults aged >=18 years"
LIFE_EXPECTANCY_FIELD = "Life expectancy (years)"
RESPITORY_HAZARD_FIELD = "Respiratory hazard index"
CANCER_FIELD = "Cancer (excluding skin cancer) among adults aged >=18 years"
HEALTH_INSURANCE_FIELD = (
    "Current lack of health insurance among adults aged 18-64 years"
)
PHYS_HEALTH_NOT_GOOD_FIELD = (
    "Physical health not good for >=14 days among adults aged >=18 years"
)

# Other Demographics
TOTAL_POP_FIELD = "Total population"
UNEMPLOYMENT_FIELD = "Unemployed civilians (percent)"
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
CENSUS_DECENNIAL_AREA_MEDIAN_INCOME_PERCENT_FIELD_2009 = (
    "Median household income as a percent of territory median income in 2009"
)
CENSUS_DECENNIAL_POVERTY_LESS_THAN_100_FPL_FIELD_2009 = (
    "Percentage households below 100% of federal poverty line in 2009"
)
CENSUS_DECENNIAL_HIGH_SCHOOL_ED_FIELD_2009 = "Percent individuals age 25 or over with less than high school degree in 2009"
CENSUS_DECENNIAL_UNEMPLOYMENT_FIELD_2009 = (
    "Unemployed civilians (percent) in 2009"
)
CENSUS_DECENNIAL_TOTAL_POPULATION_FIELD_2009 = "Total population in 2009"

# Fields from 2010 ACS (loaded for comparison with the territories)
CENSUS_UNEMPLOYMENT_FIELD_2010 = "Unemployed civilians (percent) in 2010"
CENSUS_POVERTY_LESS_THAN_100_FPL_FIELD_2010 = (
    "Percent of individuals < 100% Federal Poverty Line in 2010"
)

# Combined fields that merge island areas and states data
COMBINED_CENSUS_TOTAL_POPULATION_2010 = (
    "Total population in 2009 (island areas) and 2019 (states and PR)"
)
COMBINED_UNEMPLOYMENT_2010 = "Unemployed civilians (percent) in 2009 (island areas) and 2010 (states and PR)"
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


# Climate Change
EXPECTED_POPULATION_LOSS_RATE_LOW_INCOME_FIELD = f"At or above the {PERCENTILE}th percentile for expected population loss rate and is low income"
EXPECTED_AGRICULTURE_LOSS_RATE_LOW_INCOME_FIELD = f"At or above the {PERCENTILE}th percentile for expected agriculture loss rate and is low income"
EXPECTED_BUILDING_LOSS_RATE_LOW_INCOME_FIELD = f"At or above the {PERCENTILE}th percentile for expected building loss rate and is low income"

# Clean energy and efficiency
PM25_LOW_INCOME = "PM2.5 exposure and is low income"
ABOVE_90TH_FOR_ENERGY_BURDEN_LOW_INCOME = f"At or above the {PERCENTILE}th percentile for energy burden and is low income"
# Clean transportation
DIESEL_PARTICULATE_MATTER_LOW_INCOME = f"At or above the {PERCENTILE}th percentile for diesel particulate matter and is low income"
TRAFFIC_PROXIMITY_MATTER_LOW_INCOME = "Traffic Proximity and is low income"
# Affordable and Sustainable Housing
LEAD_PAINT_MEDIAN_HOME_VALUE = f"At or above the {PERCENTILE}th percentile for lead paint and the median house value is less than 90th percentile"
HOUSING_BURDEN_LOW_INCOME = f"At or above the {PERCENTILE}th percentile for housing burden and is low income"
# Remediation and Reduction of Legacy Pollution
RMP_LOW_INCOME = f"At or above the {PERCENTILE}th percentile for proximity to RMP sites and is low income"
SUPERFUND_LOW_INCOME = f"At or above {PERCENTILE}th percentile for proximity to superfund sites and is low income"
HAZARDOUS_WASTE_LOW_INCOME = f"At or above above {PERCENTILE}th percentile for proximity to hazardous waste facilities and is low income"
# Critical Clean Water and Waste Infrastructure
WASTEWATER_DISCHARGE_LOW_INCOME = f"At or above above {PERCENTILE}th percentile for wastewater discharge and is low income"
# Health Burden
DIABETES_LOW_INCOME = (
    f"At or above the {PERCENTILE}th percentile for diabetes and is low income"
)
ASTHMA_LOW_INCOME = (
    f"At or above the {PERCENTILE}th percentile for asthma and is low income"
)
HEART_DISEASE_LOW_INCOME = f"At or above the {PERCENTILE}th percentile for heart disease and is low income"
LIFE_EXPECTANCY_INCOME = f"At or above the {PERCENTILE}th percentile for life expectancy and is low income"

ACHIEVEMENT_TEMPLATE_FOR_WORKFORCE = """and where the high school degree achievement
rate for adults 25 years and older is less than """

# Workforce
UNEMPLOYMENT_LOW_HS_EDUCATION = f"""At or above the {PERCENTILE}th percentile for unemployment"
   {ACHIEVEMENT_TEMPLATE_FOR_WORKFORCE} {PERCENTILE}%"""

LINGUISTIC_ISOLATION_LOW_HS_EDUCATION = f"""At or above the {PERCENTILE}th percentile
    for linguistic isolation {ACHIEVEMENT_TEMPLATE_FOR_WORKFORCE} {PERCENTILE}%"""

POVERTY_LOW_HS_EDUCATION = f"""At or above the {PERCENTILE}th percentile for households
    at or below 100 percent of federal poverty level {ACHIEVEMENT_TEMPLATE_FOR_WORKFORCE} {PERCENTILE}%"""

MEDIAN_INCOME_LOW_HS_EDUCATION = f"""At or below the {PERCENTILE}th percentile for median
    income {ACHIEVEMENT_TEMPLATE_FOR_WORKFORCE} {PERCENTILE}%"""

THRESHOLD_COUNT = "Total threshold criteria exceeded"

FPL_200_SERIES = "Is low income"
