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
import data_pipeline.score.field_names as FN

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

class ScoreCalculator():
    def __init__(self, df: pd.DataFrame):
        # Define some global parameters
        self.df = df
        self.LOW_INCOME_THRESHOLD = 0.60

    def calculate_scores(self) -> pd.DataFrame:
        # Index scores
        self.df = ScoreA(df=self.df).add_columns()
        self.df = ScoreB(df=self.df).add_columns()
        self.df = ScoreC(df=self.df).add_columns()
        self.df = ScoreD(df=self.df).add_columns()
        self.df = ScoreF(df=self.df).add_columns()
        self.df = ScoreG(df=self.df).add_columns()
        self.df = ScoreH(df=self.df).add_columns()
        self.df = ScoreI(df=self.df).add_columns()
        self.df = ScoreK(df=self.df).add_columns()
        self.df = ScoreL(df=self.df).add_columns()

        # TODO do this with each score instead of in a bundle
        # Create percentiles for these index scores
        self.df = self._add_score_percentiles()
        
        return self.df   

    def _add_score_percentiles(self) -> pd.DataFrame:
        logger.info("Adding Score Percentiles")
        for score_field in [
            "Score A",
            "Score B",
            "Score C",
            "Score D",
            "Score E",
        ]:
            self.df[f"{score_field}{FN.PERCENTILE_FIELD_SUFFIX}"] = self.df[
                score_field
            ].rank(pct=True)

            for threshold in [0.25, 0.3, 0.35, 0.4]:
                fraction_converted_to_percent = int(100 * threshold)
                self.df[
                    f"{score_field} (top {fraction_converted_to_percent}th percentile)"
                ] = (
                    self.df[f"{score_field}{FN.PERCENTILE_FIELD_SUFFIX}"]
                    >= 1 - threshold
                )
        return self.df
