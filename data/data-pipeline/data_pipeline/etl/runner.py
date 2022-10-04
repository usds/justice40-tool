import concurrent.futures
import importlib
import typing

from data_pipeline.etl.score.etl_score import ScoreETL
from data_pipeline.etl.score.etl_score_geo import GeoScoreETL
from data_pipeline.etl.score.etl_score_post import PostScoreETL
from data_pipeline.utils import get_module_logger

from . import constants

logger = get_module_logger(__name__)


def _get_datasets_to_run(dataset_to_run: str) -> typing.List[dict]:
    """Returns a list of appropriate datasets to run given input args

    Args:
        dataset_to_run (str): Run a specific ETL process. If missing, runs all processes (optional)

    Returns:
        None
    """
    dataset_list = constants.DATASET_LIST
    etls_to_search = (
        dataset_list + [constants.CENSUS_INFO] + [constants.TRIBAL_INFO]
    )

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


def _run_one_dataset(dataset: dict) -> None:
    """Runs one etl process."""
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

    # run validate
    etl_instance.validate()

    # cleanup
    etl_instance.cleanup()

    logger.info(f"Finished `etl-run` for dataset `{dataset['name']}`.")


def etl_runner(dataset_to_run: str = None) -> None:
    """Runs all etl processes or a specific one

    Args:
        dataset_to_run (str): Run a specific ETL process. If missing, runs all processes (optional)

    Returns:
        None
    """
    dataset_list = _get_datasets_to_run(dataset_to_run)

    # Because we are memory constrained on our infrastructure,
    # we split datasets into those that are not memory intensive
    # (is_memory_intensive == False) and thereby can be safely
    # run in parallel, and those that require more RAM and thus
    # should be run sequentially. The is_memory_intensive_flag is
    # set manually in constants.py based on experience running
    # the pipeline
    concurrent_datasets = [
        dataset
        for dataset in dataset_list
        if not dataset["is_memory_intensive"]
    ]
    high_memory_datasets = [
        dataset for dataset in dataset_list if dataset["is_memory_intensive"]
    ]

    if concurrent_datasets:
        logger.info("Running concurrent jobs")
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {
                executor.submit(_run_one_dataset, dataset=dataset)
                for dataset in concurrent_datasets
            }

            for fut in concurrent.futures.as_completed(futures):
                # Calling result will raise an exception if one occurred.
                # Otherwise, the exceptions are silently ignored.
                fut.result()

    # Note: these high-memory datasets also usually require the Census geojson to be
    # generated, and one of them requires the Tribal geojson to be generated.
    if high_memory_datasets:
        logger.info("Running high-memory jobs")
        for dataset in high_memory_datasets:
            _run_one_dataset(dataset=dataset)


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


def score_post(data_source: str = "local") -> None:
    """Posts the score files to the local directory

    Args:
        data_source (str): Source for the census data (optional)
                           Options:
                           - local (default): fetch census data from the local data directory
                           - aws: fetch census from AWS S3 J40 data repository

    Returns:
        None
    """
    # Post Score Processing
    score_post = PostScoreETL(data_source=data_source)
    score_post.extract()
    score_post.transform()
    score_post.load()
    score_post.cleanup()


def score_geo(data_source: str = "local") -> None:
    """Generates the geojson files with score data baked in

    Args:
        data_source (str): Source for the census data (optional)
                           Options:
                           - local (default): fetch census data from the local data directory
                           - aws: fetch census from AWS S3 J40 data repository

    Returns:
        None
    """

    # Score Geo
    score_geo = GeoScoreETL(data_source=data_source)
    score_geo.extract()
    score_geo.transform()
    score_geo.load()


def _find_dataset_index(dataset_list, key, value):
    for i, element in enumerate(dataset_list):
        if element[key] == value:
            return i
    return -1
