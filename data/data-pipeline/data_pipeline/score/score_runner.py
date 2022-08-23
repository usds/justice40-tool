import pandas as pd
from data_pipeline.score.score_m import ScoreM
from data_pipeline.score.score_narwhal import ScoreNarwhal

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreRunner:
    def __init__(self, df: pd.DataFrame):
        # Define some global parameters
        self.df = df

    def calculate_scores(self) -> pd.DataFrame:
        self.df = ScoreNarwhal(df=self.df).add_columns()

        return self.df
