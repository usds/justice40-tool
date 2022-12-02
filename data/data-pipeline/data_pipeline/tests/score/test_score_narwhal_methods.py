# pylint: disable=protected-access
import pandas as pd
import pytest
from data_pipeline.config import settings
from data_pipeline.etl.score.etl_score import ScoreETL
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


@pytest.fixture
def toy_score_df(scope="module"):
    return pd.read_csv(
        settings.APP_ROOT
        / "tests"
        / "score"
        / "test_utils"
        / "data"
        / "test_drop_tracts_from_percentile.csv",
        dtype={field_names.GEOID_TRACT_FIELD: str},
    )


def _helper_test_dropping_tracts(toy_score_df, drop_tracts):
    logger.info(drop_tracts)
    test_frame = toy_score_df[
        ~toy_score_df[field_names.GEOID_TRACT_FIELD].isin(drop_tracts)
    ]
    return_df = ScoreETL._add_percentiles_to_df(
        df=toy_score_df,
        input_column_name="to_rank",
        output_column_name_root="to_rank_auto",
        drop_tracts=drop_tracts,
    )

    test_frame = test_frame.assign(
        true_rank=test_frame["to_rank"].rank(pct=True)
    )

    check_frame = test_frame.merge(
        return_df[
            [
                field_names.GEOID_TRACT_FIELD,
                "to_rank_auto" + field_names.PERCENTILE_FIELD_SUFFIX,
            ]
        ],
        on=[field_names.GEOID_TRACT_FIELD],
    )

    return check_frame["true_rank"].equals(
        check_frame["to_rank_auto" + field_names.PERCENTILE_FIELD_SUFFIX]
    )


def test_drop_0_tracts(toy_score_df):
    assert _helper_test_dropping_tracts(
        toy_score_df, drop_tracts=[]
    ), "Percentile in score fails when we do not drop any tracts"


def test_drop_1_tract(toy_score_df):
    assert _helper_test_dropping_tracts(
        toy_score_df, drop_tracts=["1"]
    ), "Percentile in score fails when we do drop a single tract"


def test_drop_2_tracts(toy_score_df):
    assert _helper_test_dropping_tracts(
        toy_score_df, drop_tracts=["1", "2"]
    ), "Percentile in score fails when we drop two tracts"


def test_drop_many_tracts(toy_score_df):
    assert _helper_test_dropping_tracts(
        toy_score_df,
        drop_tracts=toy_score_df[field_names.GEOID_TRACT_FIELD].to_list()[:5],
    ), "Percentile in score fails when we drop many tracts"


def test_drop_all_tracts(toy_score_df):
    assert _helper_test_dropping_tracts(
        toy_score_df,
        drop_tracts=toy_score_df[field_names.GEOID_TRACT_FIELD].to_list(),
    ), "Percentile in score fails when we drop all tracts"
