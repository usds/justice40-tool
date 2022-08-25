from functools import lru_cache
import pandas as pd
import pytest
from data_pipeline.config import settings
import data_pipeline.score.field_names as field_names


@lru_cache
@pytest.fixture
def final_score_df():
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "full" / "usa.csv",
        dtype={field_names.GEOID_TRACT_FIELD: str},
    )
