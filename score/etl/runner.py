import importlib


def etl_runner() -> None:
    # this list comes from YAMLs
    dataset_list = [
        {"module_dir": "census_acs", "class_name": "CensusACSETL"},
        {"module_dir": "ejscreen", "class_name": "EJScreenETL"},
        {
            "module_dir": "housing_and_transportation",
            "class_name": "HousingTransportationETL",
        },
        {"module_dir": "hud_housing", "class_name": "HudHousingETL"},
    ]

    # Run the ETLs for the dataset_list
    for dataset in dataset_list:
        etl_module = importlib.import_module(f"etl.sources.{dataset['module_dir']}.etl")
        etl_class = getattr(etl_module, dataset["class_name"])
        etl_instance = etl_class()

        # run extract
        etl_instance.extract()

        # run transform
        etl_instance.transform()

        # run load
        etl_instance.load()

        # cleanup
        etl_instance.cleanup()

    # Recalculate score
    pass

    # update the front end JSON/CSV of list of data sources
    pass
