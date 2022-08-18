# pylint: disable=protected-access
# flake8: noqa=F841
from pathlib import Path
from unittest import mock
from functools import partial
from contextlib import contextmanager

import pytest
import pandas as pd
from data_pipeline.score.utils import (
    calculate_tract_adjacency_scores as original_calculate_tract_adjacency_score,
)
from data_pipeline.etl.sources.geo_utils import get_tract_geojson
from data_pipeline.etl.score import field_names


@contextmanager
def patch_calculate_tract_adjacency_scores():
    tract_data = Path(__file__).parent / "data" / "us.geojson"
    get_tract_geojson_mock = partial(
        get_tract_geojson, _tract_data_path=tract_data
    )
    with mock.patch(
        "data_pipeline.score.utils.get_tract_geojson",
        new=get_tract_geojson_mock,
    ):
        yield original_calculate_tract_adjacency_score


@pytest.fixture
def score_data():
    score_csv = Path(__file__).parent / "data" / "scores.csv"
    return pd.read_csv(
        score_csv, dtype={field_names.GEOID_TRACT_FIELD: str, "included": bool}
    )


def test_all_adjacent_are_true(score_data):
    score_data["included"] = True
    score_data.loc[
        score_data.GEOID10_TRACT == "24027603004", "included"
    ] = False
    with patch_calculate_tract_adjacency_scores() as calculate_tract_adjacency_scores:
        adjancency_scores = calculate_tract_adjacency_scores(
            score_data, "included"
        )
        assert (
            adjancency_scores.loc[
                adjancency_scores.GEOID10_TRACT == "24027603004",
                "included" + field_names.ADJACENCY_INDEX_SUFFIX,
            ].iloc[0]
            == 1.0
        )


def test_all_adjacent_are_false(score_data):
    score_data["included"] = False
    score_data.loc[
        score_data.GEOID10_TRACT == "24027603004", "included"
    ] = False
    with patch_calculate_tract_adjacency_scores() as calculate_tract_adjacency_scores:
        adjancency_scores = calculate_tract_adjacency_scores(
            score_data, "included"
        )
        assert (
            adjancency_scores.loc[
                adjancency_scores.GEOID10_TRACT == "24027603004",
                "included" + field_names.ADJACENCY_INDEX_SUFFIX,
            ].iloc[0]
            == 0.0
        )
