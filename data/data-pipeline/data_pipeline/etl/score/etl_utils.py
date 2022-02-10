import os
import sys
from pathlib import Path
import numpy as np
import pandas as pd


from data_pipeline.config import settings
from data_pipeline.utils import (
    download_file_from_url,
    get_module_logger,
)

logger = get_module_logger(__name__)


def check_score_data_source(
    score_csv_data_path: Path,
    score_data_source: str,
) -> None:
    """Checks if census data is present, and exits gracefully if it doesn't exist. It will download it from S3
       if census_data_source is set to "aws"

    Args:
        score_csv_data_path (str): Path for local Score CSV data
        score_data_source (str): Source for the score data
                                  Options:
                                  - local: fetch census data from the local data directory
                                  - aws: fetch census from AWS S3 J40 data repository

    Returns:
        None

    """
    TILE_SCORE_CSV_S3_URL = (
        settings.AWS_JUSTICE40_DATAPIPELINE_URL
        + "/data/score/csv/tiles/usa.csv"
    )
    TILE_SCORE_CSV = score_csv_data_path / "tiles" / "usa.csv"

    # download from s3 if census_data_source is aws
    if score_data_source == "aws":
        logger.info("Fetching Score Tile data from AWS S3")
        download_file_from_url(
            file_url=TILE_SCORE_CSV_S3_URL, download_file_name=TILE_SCORE_CSV
        )
    else:
        # check if score data is found locally
        if not os.path.isfile(TILE_SCORE_CSV):
            logger.info(
                "No local score tiles data found. Please use '-s aws` to fetch from AWS"
            )
            sys.exit()


def floor_series(series: pd.Series, number_of_decimals: int) -> pd.Series:
    """Floors all non-null numerical values to a specific number of decimal points

    Args:
        series (pd.Series): Input pandas series
        number_of_decimals (int): Number of decimal points to floor all numerical values to
    Returns:
        floored_series (pd.Series): A Pandas Series of numerical values with appropriate number of decimal points
    """

    # we perform many operations using the division operator
    # as well as elementwise multiplication. The result of such
    # operations can introduce such values, below, due to numerical
    # instability. This results in unsafe type inference for numpy
    # float types - exacerbated by panda's type inference engine.
    # Hence, to handle such offending values we default to None
    # Please see the reference, below, on nullable integer types for more details
    unacceptable_values = [-np.inf, np.inf, "None", np.nan]
    mapping = {
        unacceptable_value: None for unacceptable_value in unacceptable_values
    }

    # ensure we are working with a numpy array (which is really what a pandas series is)
    if not isinstance(series, pd.Series):
        raise TypeError(
            f"Argument series must be of type pandas series, not of type {type(series).__name__}."
        )

    # raise exception for handling empty series
    if series.empty:
        raise ValueError("Empty series provided.")

    # if we have any values, just replace them with None
    if series.isin(unacceptable_values).any():
        series.replace(mapping, regex=False, inplace=True)

    multiplication_factor = 10 ** number_of_decimals

    # In order to safely cast NaNs
    # First coerce series to float type: series.astype(float)
    # Please see here:
    # https://pandas.pydata.org/pandas-docs/stable/user_guide/integer_na.html#nullable-integer-data-type
    product_for_numerator = np.floor(
        series.astype(float) * multiplication_factor
    )

    floored_series = np.where(
        series.isnull(),
        # For all null values default to null
        None,
        # The other default condition - floor non-null values
        product_for_numerator / multiplication_factor,
    )

    return floored_series
