from ast import PyCF_TYPE_COMMENTS
from asyncio import constants
from pathlib import Path
import pandas as pd
import pytest
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings
import data_pipeline.etl.score.constants as etl_constants

logger = get_module_logger(__name__)


@pytest.fixture
def tiles_df():
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "tiles" / "usa.csv",
        dtype={"GTF": str},
    )


@pytest.fixture
def tile_names_dictionary():
    return etl_constants.TILES_SCORE_COLUMNS


def test_count_of_fips_codes(tiles_df, states_count=56):
    assert (
        tiles_df["GTF"].str[:2].nunique() == 56
    ), "Some states are missing from tiles"


# For each data point that we visualize, we want to confirm that
# (1) the column is represented in tiles_columns
# (2) the column values are of the TYPE they are supposed to be
