import pandas as pd
from data_pipeline.score.score_a import ScoreA
from data_pipeline.score.score_b import ScoreB
from data_pipeline.score.score_c import ScoreC
from data_pipeline.score.score_d import ScoreD
from data_pipeline.score.score_f import ScoreF
from data_pipeline.score.score_g import ScoreG
from data_pipeline.score.score_h import ScoreH
from data_pipeline.score.score_i import ScoreI
from data_pipeline.score.score_k import ScoreK
from data_pipeline.score.score_l import ScoreL
from data_pipeline.score.score_m import ScoreM
from data_pipeline.score.score_narwhal import ScoreNarwhal
from data_pipeline.score import field_names

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreRunner:
    def __init__(self, df: pd.DataFrame):
        # Define some global parameters
        self.df = df

    def calculate_scores(self) -> pd.DataFrame:
        # Index scores
        self.df = ScoreA(df=self.df).add_columns()
        self.df = ScoreB(df=self.df).add_columns()
        self.df = ScoreC(df=self.df).add_columns()
        self.df = ScoreF(df=self.df).add_columns()
        self.df = ScoreG(df=self.df).add_columns()
        self.df = ScoreH(df=self.df).add_columns()
        self.df = ScoreI(df=self.df).add_columns()
        self.df = ScoreK(df=self.df).add_columns()
        self.df = ScoreL(df=self.df).add_columns()
        self.df = ScoreM(df=self.df).add_columns()
        self.df = ScoreNarwhal(df=self.df).add_columns()

        return self.df
