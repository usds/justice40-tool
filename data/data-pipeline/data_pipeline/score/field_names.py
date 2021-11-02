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

# Poverty / Income
POVERTY_FIELD = "Poverty (Less than 200% of federal poverty line)"
POVERTY_PERCENTILE_FIELD = (
    "Poverty (Less than 200% of federal poverty line) (percentile)"
)
POVERTY_LESS_THAN_200_FPL_FIELD = (
    "Percent of individuals < 200% Federal Poverty Line"
)
POVERTY_LESS_THAN_200_FPL_PERCENTILE_FIELD = (
    "Percent of individuals < 200% Federal Poverty Line (percentile)"
)
POVERTY_LESS_THAN_150_FPL_FIELD = (
    "Percent of individuals < 150% Federal Poverty Line"
)
POVERTY_LESS_THAN_150_FPL_PERCENTILE_FIELD = (
    "Percent of individuals < 150% Federal Poverty Line (percentile)"
)
POVERTY_LESS_THAN_100_FPL_FIELD = (
    "Percent of individuals < 100% Federal Poverty Line"
)
POVERTY_LESS_THAN_100_FPL_PERCENTILE_FIELD = (
    "Percent of individuals < 100% Federal Poverty Line (percentile)"
)
MEDIAN_INCOME_PERCENT_AMI_FIELD = "Median household income (% of AMI)"
MEDIAN_INCOME_PERCENT_AMI_PERCENTILE_FIELD = (
    "Median household income (% of AMI) (percentile)"
)
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
FEMA_RISK_PERCENTILE_FIELD = (
    "FEMA Risk Index Expected Annual Loss Score (percentile)"
)

# Environment
DIESEL_FIELD = "Diesel particulate matter"
DIESEL_PERCENTILE_FIELD = "Diesel particulate matter (percentile)"
PM25_FIELD = "Particulate matter (PM2.5)"
PM25_PERCENTILE_FIELD = "Particulate matter (PM2.5) (percentile)"
OZONE_FIELD = "Ozone"
TRAFFIC_FIELD = "Traffic proximity and volume"
TRAFFIC_PERCENTILE_FIELD = "Traffic proximity and volume (percentile)"
LEAD_PAINT_FIELD = "Percent pre-1960s housing (lead paint indicator)"
LEAD_PAINT_PERCENTILE_FIELD = (
    "Percent pre-1960s housing (lead paint indicator) (percentile)"
)
WASTEWATER_FIELD = "Wastewater discharge"
WASTEWATER_PERCENTILE_FIELD = "Wastewater discharge (percentile)"
AGGREGATION_POLLUTION_FIELD = "Pollution Burden"
RMP_FIELD = "Proximity to RMP sites (percentile)"
RMP_PERCENTILE_FIELD = "Proximity to RMP sites (percentile)"
TSDF_FIELD = "Proximity to TSDF sites"
NPL_FIELD = "Proximity to NPL sites"
AIR_TOXICS_CANCER_RISK_FIELD = "Air toxics cancer risk"

# Housing
HOUSING_BURDEN_FIELD = "Housing burden (percent)"
HOUSING_BURDEN_PERCENTILE_FIELD = "Housing burden (percent) (percentile)"
HT_INDEX_FIELD = (
    "Housing + Transportation Costs % Income for the Regional Typical Household"
)

# Energy
ENERGY_BURDEN_FIELD = "Energy burden"
ENERGY_BURDEN_PERCENTILE_FIELD = "Energy burden (percentile)"

# Health
DIABETES_FIELD = "Diagnosed diabetes among adults aged >=18 years"
DIABETES_PERCENTILE_FIELD = (
    "Diagnosed diabetes among adults aged >=18 years (percentile)"
)
ASTHMA_FIELD = "Current asthma among adults aged >=18 years"
ASTHMA_PERCENTILE_FIELD = (
    "Current asthma among adults aged >=18 years (percentile)"
)
HEART_DISEASE_FIELD = "Coronary heart disease among adults aged >=18 years"
HEART_DISEASE_PERCENTILE_FIELD = (
    "Coronary heart disease among adults aged >=18 years (percentile)"
)
LIFE_EXPECTANCY_FIELD = "Life expectancy (years)"
LIFE_EXPECTANCY_PERCENTILE_FIELD = "Life expectancy (years) (percentile)"
RESPITORY_HAZARD_FIELD = "Respiratory hazard index"
RESPITORY_HAZARD_PERCENTILE_FIELD = "Respiratory hazard index (percentile)"
CANCER_FIELD = "Cancer (excluding skin cancer) among adults aged >=18 years"
CANCER_PERCENTILE_FIELD = (
    "Cancer (excluding skin cancer) among adults aged >=18 years (percentile)"
)
HEALTH_INSURANCE_FIELD = (
    "Current lack of health insurance among adults aged 18-64 years"
)
PHYS_HEALTH_NOT_GOOD_FIELD = (
    "Physical health not good for >=14 days among adults aged >=18 years"
)

# Other Demographics
TOTAL_POP_FIELD = "Total population"
UNEMPLOYMENT_FIELD = "Unemployed civilians (percent)"
UNEMPLOYMENT_PERCENTILE_FIELD = "Unemployed civilians (percent) (percentile)"
LINGUISTIC_ISO_FIELD = "Linguistic isolation (percent)"
LINGUISTIC_ISO_PERCENTILE_FIELD = "Linguistic isolation (percent) (percentile)"
HOUSEHOLDS_LINGUISTIC_ISO_FIELD = (
    "Percent of households in linguistic isolation"
)
HIGH_SCHOOL_ED_FIELD = (
    "Percent individuals age 25 or over with less than high school degree"
)
HIGH_SCHOOL_ED_PERCENTILE_FIELD = "Percent individuals age 25 or over with less than high school degree (percentile)"
AGGREGATION_POPULATION_FIELD = "Population Characteristics"
UNDER_5_FIELD = "Individuals under 5 years old"
OVER_64_FIELD = "Individuals over 64 years old"

# Urban Rural Map
URBAN_HERUISTIC_FIELD = "Urban Heuristic Flag"


# EJSCREEN Areas of Concern
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_70TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, National, 70th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_75TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, National, 75th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_80TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, National, 80th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_85TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, National, 85th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_90TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, National, 90th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_NATIONAL_95TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, National, 95th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_70TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, State, 70th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_75TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, State, 75th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_80TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, State, 80th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_85TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, State, 85th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_90TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, State, 90th percentile (communities)"
)
EJSCREEN_AREAS_OF_CONCERN_STATE_95TH_PERCENTILE_COMMUNITIES_FIELD_NAME = (
    "EJSCREEN Areas of Concern, State, 95th percentile (communities)"
)
