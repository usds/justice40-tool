import importlib

from data_pipeline.etl.score.etl_score import ScoreETL
from data_pipeline.etl.score.etl_score_geo import GeoScoreETL
from data_pipeline.etl.score.etl_score_post import PostScoreETL

from . import constants


def get_datasets_to_run(dataset_to_run: str):
    """Returns a list of appropriate datasets to run given input args

    Args:
        dataset_to_run (str): Run a specific ETL process. If missing, runs all processes (optional)

    Returns:
        None
    """
    dataset_list = constants.DATASET_LIST
    etls_to_search = dataset_list + [constants.CENSUS_INFO]

    if dataset_to_run:
        dataset_element = next(
            (item for item in etls_to_search if item["name"] == dataset_to_run),
            None,
        )
        if not dataset_element:
            raise ValueError("Invalid dataset name")
        else:
            # reset the list to just the dataset
            dataset_list = [dataset_element]
    return dataset_list


def etl_runner(dataset_to_run: str = None) -> None:
    """Runs all etl processes or a specific one

    Args:
        dataset_to_run (str): Run a specific ETL process. If missing, runs all processes (optional)

    Returns:
        None
    """
    dataset_list = get_datasets_to_run(dataset_to_run)

    # Run the ETLs for the dataset_list
    for dataset in dataset_list:
        etl_module = importlib.import_module(
            f"data_pipeline.etl.sources.{dataset['module_dir']}.etl"
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
    score_gen = ScoreETL()
    score_gen.extract()
    score_gen.transform()
    score_gen.load()

    # Post Score Processing
    # TODO: uncomment
    # score_post = PostScoreETL()
    # score_post.extract()
    # score_post.transform()
    # score_post.load()
    # score_post.cleanup()


def score_geo() -> None:
    """Generates the geojson files with score data baked in

    Args:
        None

    Returns:
        None
    """

    # Score Geo
    score_geo = GeoScoreETL()
    score_geo.extract()
    score_geo.transform()
    score_geo.load()


def _find_dataset_index(dataset_list, key, value):
    for i, element in enumerate(dataset_list):
        if element[key] == value:
            return i
    return -1
