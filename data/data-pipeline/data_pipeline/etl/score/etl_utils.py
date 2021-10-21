import os
import sys
from pathlib import Path

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
        + "/data-pipeline/data/score/tiles/usa.csv"
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
                "No local score tiles data found. Please use '-d aws` to fetch from AWS"
            )
            sys.exit()
