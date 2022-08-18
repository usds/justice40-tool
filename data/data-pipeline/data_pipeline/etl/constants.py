DATASET_LIST = [
    {
        "name": "cdc_places",
        "module_dir": "cdc_places",
        "class_name": "CDCPlacesETL",
        "is_memory_intensive": False,
    },
    {
        "name": "national_risk_index",
        "module_dir": "national_risk_index",
        "class_name": "NationalRiskIndexETL",
        "is_memory_intensive": False,
    },
    {
        "name": "travel_composite",
        "module_dir": "dot_travel_composite",
        "class_name": "TravelCompositeETL",
        "is_memory_intensive": False,
    },
    {
        "name": "tree_equity_score",
        "module_dir": "tree_equity_score",
        "class_name": "TreeEquityScoreETL",
        "is_memory_intensive": False,
    },
    {
        "name": "census_decennial",
        "module_dir": "census_decennial",
        "class_name": "CensusDecennialETL",
        "is_memory_intensive": False,
    },
    {
        "name": "housing_and_transportation",
        "module_dir": "housing_and_transportation",
        "class_name": "HousingTransportationETL",
        "is_memory_intensive": False,
    },
    {
        "name": "mapping_for_ej",
        "module_dir": "mapping_for_ej",
        "class_name": "MappingForEJETL",
        "is_memory_intensive": False,
    },
    {
        "name": "fsf_flood_risk",
        "module_dir": "fsf_flood_risk",
        "class_name": "FloodRiskETL",
        "is_memory_intensive": False,
    },
    {
        "name": "fsf_wildfire_risk",
        "module_dir": "fsf_wildfire_risk",
        "class_name": "WildfireRiskETL",
        "is_memory_intensive": False,
    },
    {
        "name": "ejscreen",
        "module_dir": "ejscreen",
        "class_name": "EJSCREENETL",
        "is_memory_intensive": False,
    },
    {
        "name": "hud_housing",
        "module_dir": "hud_housing",
        "class_name": "HudHousingETL",
        "is_memory_intensive": False,
    },
    {
        "name": "nlcd_nature_deprived",
        "module_dir": "nlcd_nature_deprived",
        "class_name": "NatureDeprivedETL",
        "is_memory_intensive": False,
    },
    {
        "name": "census_acs_median_income",
        "module_dir": "census_acs_median_income",
        "class_name": "CensusACSMedianIncomeETL",
        "is_memory_intensive": False,
    },
    {
        "name": "cdc_life_expectancy",
        "module_dir": "cdc_life_expectancy",
        "class_name": "CDCLifeExpectancy",
        "is_memory_intensive": False,
    },
    {
        "name": "doe_energy_burden",
        "module_dir": "doe_energy_burden",
        "class_name": "DOEEnergyBurden",
        "is_memory_intensive": False,
    },
    {
        "name": "geocorr",
        "module_dir": "geocorr",
        "class_name": "GeoCorrETL",
        "is_memory_intensive": False,
    },
    {
        "name": "child_opportunity_index",
        "module_dir": "child_opportunity_index",
        "class_name": "ChildOpportunityIndex",
        "is_memory_intensive": False,
    },
    {
        "name": "mapping_inequality",
        "module_dir": "mapping_inequality",
        "class_name": "MappingInequalityETL",
        "is_memory_intensive": False,
    },
    {
        "name": "persistent_poverty",
        "module_dir": "persistent_poverty",
        "class_name": "PersistentPovertyETL",
        "is_memory_intensive": False,
    },
    {
        "name": "ejscreen_areas_of_concern",
        "module_dir": "ejscreen_areas_of_concern",
        "class_name": "EJSCREENAreasOfConcernETL",
        "is_memory_intensive": False,
    },
    {
        "name": "calenviroscreen",
        "module_dir": "calenviroscreen",
        "class_name": "CalEnviroScreenETL",
        "is_memory_intensive": False,
    },
    {
        "name": "hud_recap",
        "module_dir": "hud_recap",
        "class_name": "HudRecapETL",
        "is_memory_intensive": False,
    },
    {
        "name": "epa_rsei",
        "module_dir": "epa_rsei",
        "class_name": "EPARiskScreeningEnvironmentalIndicatorsETL",
        "is_memory_intensive": False,
    },
    {
        "name": "energy_definition_alternative_draft",
        "module_dir": "energy_definition_alternative_draft",
        "class_name": "EnergyDefinitionAlternativeDraft",
        "is_memory_intensive": False,
    },
    {
        "name": "michigan_ejscreen",
        "module_dir": "michigan_ejscreen",
        "class_name": "MichiganEnviroScreenETL",
        "is_memory_intensive": False,
    },
    {
        "name": "cdc_svi_index",
        "module_dir": "cdc_svi_index",
        "class_name": "CDCSVIIndex",
        "is_memory_intensive": False,
    },
    {
        "name": "maryland_ejscreen",
        "module_dir": "maryland_ejscreen",
        "class_name": "MarylandEJScreenETL",
        "is_memory_intensive": False,
    },
    {
        "name": "historic_redlining",
        "module_dir": "historic_redlining",
        "class_name": "HistoricRedliningETL",
        "is_memory_intensive": False,
    },
    # This has to come after us.json exists
    {
        "name": "census_acs",
        "module_dir": "census_acs",
        "class_name": "CensusACSETL",
        "is_memory_intensive": False,
    },
    {
        "name": "census_acs_2010",
        "module_dir": "census_acs_2010",
        "class_name": "CensusACS2010ETL",
        "is_memory_intensive": False,
    },
    {
        "name": "us_army_fuds",
        "module_dir": "us_army_fuds",
        "class_name": "USArmyFUDS",
        "is_memory_intensive": True,
    },
    {
        "name": "eamlis",
        "module_dir": "eamlis",
        "class_name": "AbandonedMineETL",
        "is_memory_intensive": True,
    },
]

CENSUS_INFO = {
    "name": "census",
    "module_dir": "census",
    "class_name": "CensusETL",
    "is_memory_intensive": False,
}

TRIBAL_INFO = {
    "name": "tribal",
    "module_dir": "tribal",
    "class_name": "TribalETL",
    "is_memory_intensive": False,
}
