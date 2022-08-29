import pandas as pd
import pytest
from data_pipeline.config import settings
from data_pipeline.score import field_names


@pytest.fixture(scope="session")
def final_score_df():
    return pd.read_csv(
        settings.APP_ROOT / "data" / "score" / "csv" / "full" / "usa.csv",
        dtype={field_names.GEOID_TRACT_FIELD: str},
        low_memory=False,
    )
