from ast import PyCF_TYPE_COMMENTS
from asyncio import constants
from pathlib import Path
import pandas as pd
import pytest
from data_pipeline import tile
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings
from data_pipeline.etl.score import constants

logger = get_module_logger(__name__)

"""Tiles and data pipeline: The goal here is to smoke test correctness

 We should check for wrong variable ported over to the tiles by making sure the column name for each thing we want in usa.csv has the same value as 
    the column name for the tiles csv. This is NOT the same as checking that the column has been renamed. Rather, this requires looking at the 
    methodology of the tool, seeing what should be represented, and ensuring that variable is indeed represented.
    -- I think we actually have to do a lot of this by hand and in QA
 Check for USVI and Guam in tiles
 We should check that even census tracts that have NULLs for every indicator get included in the tiles and in the csv and are never dropped
    -- For this, I think we need to check on the front end? It looks like Tippecanoe will drop all nulls
"""


@pytest.fixture
def tiles_df():
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "tiles" / "usa.csv",
        dtype={"GTF": str},
    )


"""
    field_names.HIGH_SCHOOL_ED_FIELD: "HSEF",
"""

PERCENTILE_FIELDS = [
    "DF_PFS",
    "AF_PFS",
    "HDF_PFS",
    "DSF_PFS",
    "EBF_PFS",
    "EALR_PFS",
    "EBLR_PFS",
    "EPLR_PFS",
    "HBF_PFS",
    "LLEF_PFS",
    "LIF_PFS",
    "LMI_PFS",
    "MHVF_PFS",
    "PM25F_PFS",
    "P100_PFS",
    "P200_I_PFS",
    "P200_PFS",
    "LPF_PFS",
    "KP_PFS",
    "NPL_PFS",
    "RMP_PFS",
    "TSDF_PFS",
    "TF_PFS",
    "UF_PFS",
    "WF_PFS",
    "UST_PFS",
    # "IALMILHSE_PFS",
    # "IAPLHSE_PFS",
    # "IAULHSE_PFS",
]


def test_percentiles(tiles_df):
    for col in PERCENTILE_FIELDS:
        assert tiles_df[col].min() >= 0, f"Negative percentile exists for {col}"
        assert (
            tiles_df[col].max() <= 1
        ), f"Percentile over 100th exists for {col}"
        assert (tiles_df[col].median() >= 0.4) & (
            tiles_df[col].median() <= 0.6
        ), f"Percentile distribution for {col} is decidedly not uniform"
    return True


def test_count_of_fips_codes(tiles_df, states_count=56):
    assert (
        tiles_df["GTF"].str[:2].nunique() == states_count
    ), "Some states are missing from tiles"
    pfs_columns = tiles_df.filter(like="PFS").columns.to_list()
    assert (
        tiles_df.dropna(how="all", subset=pfs_columns)["GTF"].str[:2].nunique()
        == 56
    ), "Some states do not have any percentile data"


# For each data point that we visualize, we want to confirm that
# (1) the column is represented in tiles_columns
# (2) the column values are of the TYPE they are supposed to be
