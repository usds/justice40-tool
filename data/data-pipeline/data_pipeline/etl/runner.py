import importlib
import concurrent.futures

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


def run_etl_single_dataset(dataset: str = None) -> str:
    """Runs a specific dataset

    Args:
        dataset (str): A specific dataset eligible for a specific ETL process.

    Returns:
        None
    """
    etl_module = importlib.import_module(
        f"data_pipeline.etl.sources.{dataset['module_dir']}.etl"
    )
    etl_class = getattr(etl_module, dataset["class_name"])
    etl_instance = etl_class()

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

    message = f"Finished ETL for {dataset}"

    return message


def etl_runner(dataset_to_run: str = None) -> None:
    """Runs all etl processes or a specific one

    Args:
        dataset_to_run (str): Run a specific ETL process. If missing, runs all processes (optional)

    Returns:
        None
    """
    dataset_list = get_datasets_to_run(dataset_to_run)
    number_of_threads = 10
    futures_list = []
    results = []

    with concurrent.futures.ThreadPoolExecutor(
        max_workers=number_of_threads
    ) as executor:
        for dataset in dataset_list:
            futures = executor.submit(
                # manually create Future object
                # this allows us to manage exceptions
                # and callbacks more thoughtfully
                run_etl_single_dataset,
                dataset,
            )
            futures_list.append(futures)

        for future in futures_list:
            try:
                # emprically tested timeout to accomdate
                # 1) NRI; 2) Tree-equity; 3) census
                # datasets. Specifically, these
                # three datasets contribute to most of
                # i/o resource consumption and network latency
                result = future.result(timeout=300)
                results.append(result)
            # this catches any exception for that given dataset
            # one could customize this to specify which dataset
            # but we perform so much logging that this may be
            # corroborating evidence
            except Exception:
                results.append(None)

        # sanity check to ensure all of our datasets
        # returned successfully (even though not in any
        # particular order)
        for result in results:
            print(f"Result from future: {result}")

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
