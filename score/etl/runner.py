import importlib

from etl.score.etl_score import ScoreETL
from etl.score.etl_county_state_score import CountyStateScoreETL


def etl_runner(dataset_to_run: str = None) -> None:
    """Runs all etl processes or a specific one

    Args:
        dataset_to_run (str): Run a specific ETL process. If missing, runs all processes (optional)

    Returns:
        None
    """

    # this list comes from YAMLs
    dataset_list = [
        {
            "name": "census_acs",
            "module_dir": "census_acs",
            "class_name": "CensusACSETL",
        },
        {
            "name": "ejscreen",
            "module_dir": "ejscreen",
            "class_name": "EJScreenETL",
        },
        {
            "name": "housing_and_transportation",
            "module_dir": "housing_and_transportation",
            "class_name": "HousingTransportationETL",
        },
        {
            "name": "hud_housing",
            "module_dir": "hud_housing",
            "class_name": "HudHousingETL",
        },
        {
            "name": "calenviroscreen",
            "module_dir": "calenviroscreen",
            "class_name": "CalEnviroScreenETL",
        },
        {
            "name": "hud_recap",
            "module_dir": "hud_recap",
            "class_name": "HudRecapETL",
        },
    ]

    if dataset_to_run:
        dataset_element = next(
            (item for item in dataset_list if item["name"] == dataset_to_run),
            None,
        )
        if not dataset_list:
            raise ValueError("Invalid dataset name")
        else:
            # reset the list to just the dataset
            dataset_list = [dataset_element]

    # Run the ETLs for the dataset_list
    for dataset in dataset_list:
        etl_module = importlib.import_module(
            f"etl.sources.{dataset['module_dir']}.etl"
        )
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

    # update the front end JSON/CSV of list of data sources
    pass


def score_generate() -> None:
    """Generates the score and saves it on the local data directory

    Args:
        None

    Returns:
        None
    """

    # Score Gen
    # score_gen = ScoreETL()
    # score_gen.extract()
    # score_gen.transform()
    # score_gen.load()

    # County and State Info
    score_county = CountyStateScoreETL()
    score_county.extract()
    score_county.transform()
    score_county.cleanup()


def _find_dataset_index(dataset_list, key, value):
    for i, element in enumerate(dataset_list):
        if element[key] == value:
            return i
    return -1
