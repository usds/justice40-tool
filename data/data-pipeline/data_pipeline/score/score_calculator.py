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
        # TODO refactor to return dataframe of only new columns and merge with initial df
        self.df = ScoreA().add_columns(df=self.df)
        self.df = ScoreB().add_columns(df=self.df)
        self.df = ScoreC().add_columns(df=self.df)
        self.df = ScoreD().add_columns(df=self.df)
        self.df = ScoreF().add_columns(df=self.df)
        self.df = ScoreG().add_columns(df=self.df)
        self.df = ScoreH().add_columns(df=self.df)
        self.df = ScoreI().add_columns(df=self.df)
        self.df = ScoreK().add_columns(df=self.df)
        self.df = ScoreL().add_columns(df=self.df)

        # TODO do this with each score instead of in a bundle
        # Create percentiles for these index scores
        self.df = self._add_score_percentiles(df=self.df)
        
        return self.df   

    def _add_score_percentiles(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score Percentiles")
        for score_field in [
            "Score A",
            "Score B",
            "Score C",
            "Score D",
            "Score E",
        ]:
            df[f"{score_field}{FN.PERCENTILE_FIELD_SUFFIX}"] = df[
                score_field
            ].rank(pct=True)

            for threshold in [0.25, 0.3, 0.35, 0.4]:
                fraction_converted_to_percent = int(100 * threshold)
                df[
                    f"{score_field} (top {fraction_converted_to_percent}th percentile)"
                ] = (
                    df[f"{score_field}{FN.PERCENTILE_FIELD_SUFFIX}"]
                    >= 1 - threshold
                )
        return df
