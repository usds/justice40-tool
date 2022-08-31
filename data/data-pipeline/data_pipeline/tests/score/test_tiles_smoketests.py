# flake8: noqa: W0613,W0611,F811
from dataclasses import dataclass
from typing import Optional
import pandas as pd
import numpy as np
import pytest
from data_pipeline.config import settings
from data_pipeline.etl.score import constants
from data_pipeline.score import field_names
from data_pipeline.etl.score.constants import (
    TILES_SCORE_COLUMNS,
    THRESHOLD_COUNT_TO_SHOW_FIELD_NAME,
    USER_INTERFACE_EXPERIENCE_FIELD_NAME,
)
from .fixtures import final_score_df  # pylint: disable=unused-import

pytestmark = pytest.mark.smoketest


@pytest.fixture
def tiles_df(scope="session"):
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "tiles" / "usa.csv",
        dtype={"GTF": str},
        low_memory=False,
    )


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


def test_count_of_fips_codes(tiles_df, final_score_df):
    final_score_state_count = (
        final_score_df[field_names.GEOID_TRACT_FIELD].str[:2].nunique()
    )
    assert (
        tiles_df["GTF"].str[:2].nunique() == final_score_state_count
    ), "Some states are missing from tiles"
    pfs_columns = tiles_df.filter(like="PFS").columns.to_list()
    assert (
        tiles_df.dropna(how="all", subset=pfs_columns)["GTF"].str[:2].nunique()
        == 56
    ), "Some states do not have any percentile data"


def test_column_presence(tiles_df):
    expected_column_names = set(TILES_SCORE_COLUMNS.values()) | {
        THRESHOLD_COUNT_TO_SHOW_FIELD_NAME,
        USER_INTERFACE_EXPERIENCE_FIELD_NAME,
    }
    actual_column_names = set(tiles_df.columns)
    extra_columns = actual_column_names - expected_column_names
    missing_columns = expected_column_names - expected_column_names
    assert not (
        extra_columns
    ), f"tiles/usa.csv has columns not specified in TILE_SCORE_COLUMNS: {extra_columns}"
    assert not (
        missing_columns
    ), f"tiles/usa.csv is missing columns from TILE_SCORE_COLUMNS: {missing_columns}"


def test_tract_equality(tiles_df, final_score_df):
    assert tiles_df.shape[0] == final_score_df.shape[0]


@dataclass
class ColumnValueComparison:
    final_score_column: pd.Series
    tiles_column: pd.Series
    col_name: str

    def __post_init__(self):
        self._is_dtype_ok = (
            self.final_score_column.dtype == self.tiles_column.dtype
        )
        self._is_value_ok = False
        if self._is_dtype_ok:
            if self.final_score_column.dtype == np.dtype("float64"):
                self._is_value_ok = np.allclose(
                    self.final_score_column,
                    self.tiles_column,
                    atol=float(f"1e-{constants.TILES_ROUND_NUM_DECIMALS}"),
                    equal_nan=True,
                )
            else:
                self._is_value_ok = (
                    self.final_score_column.dropna()
                    == self.tiles_column.dropna()
                ).all()

    def __bool__(self) -> bool:
        return self._is_dtype_ok and bool(self._is_value_ok)

    @property
    def error_message(self) -> Optional[str]:
        if not self._is_dtype_ok:
            return (
                f"Column {self.col_name} dtype mismatch: "
                f"score_df: {self.final_score_column.dtype}, "
                f"tile_df: {self.tiles_column.dtype}"
            )
        if not self._is_value_ok:
            return f"Column {self.col_name} value mismatch"
        return None


def test_for_column_fidelitiy_from_score(tiles_df, final_score_df):
    # Verify the following:
    # * Shape and tracts match between score csv and tile csv
    # * If you rename score CSV columns, you are able to make the tile csv
    # * The dtypes and values of every renamed score column is "equal" to
    #   every tile column
    #   * Because tiles use rounded floats, we use close with a tolerance
    assert (
        set(TILES_SCORE_COLUMNS.values()) - set(tiles_df.columns) == set()
    ), "Some TILES_SCORE_COLUMNS are missing from the tiles dataframe"

    # Keep only the tiles score columns in the final score data
    final_score_df = final_score_df.rename(columns=TILES_SCORE_COLUMNS).drop(
        final_score_df.columns.difference(TILES_SCORE_COLUMNS.values()),
        axis=1,
        errors="ignore",
    )

    # Drop the UI-specific fields from the tiles dataframe
    tiles_df = tiles_df.drop(
        columns=[
            "SF",  # State field, added at geoscore
            "CF",  # County field, added at geoscore,
            constants.THRESHOLD_COUNT_TO_SHOW_FIELD_NAME,
            constants.USER_INTERFACE_EXPERIENCE_FIELD_NAME,
        ]
    )
    errors = []

    # Are the dataframes the same shape truly
    assert tiles_df.shape == final_score_df.shape
    assert tiles_df["GTF"].equals(final_score_df["GTF"])
    assert sorted(tiles_df.columns) == sorted(final_score_df.columns)

    # Are all the dtypes and values the same?
    comparisons = []
    for col_name in final_score_df.columns:
        value_comparison = ColumnValueComparison(
            final_score_df[col_name], tiles_df[col_name], col_name
        )
        comparisons.append(value_comparison)
    errors = [comp for comp in comparisons if not comp]
    error_message = "\n".join(error.error_message for error in errors)
    assert not errors, error_message


def test_for_state_names(tiles_df):
    states = tiles_df["SF"].value_counts(dropna=False).index
    assert np.nan not in states
    assert states.all()
