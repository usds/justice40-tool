import pandas as pd

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

class ScoreCalculator():
    def __init__(self, df: pd.DataFrame):
        # Define some global parameters
        self.df = df
        self.LOW_INCOME_THRESHOLD = 0.60

    def calculate_scores(self) -> pd.DataFrame:
        # Index scores
        self.df = self._add_columns_a(self.df)
        self.df = self._add_score_b(self.df)
        self.df = self._add_score_c(self.df, data_sets)
        self.df = self._add_scores_d_e(self.df)

        # TODO do this with each score instead of in a bundle
        # Create percentiles for these index scores
        self.df = self._add_score_percentiles(self.df)

        # Binary (non index) scores (cannot be percentiled)
        self.df = self._add_score_f(self.df)
        self.df = self._add_score_g_k(self.df)
        self.df = self._add_score_l_factors(self.df)        

    def _add_score_percentiles(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score Percentiles")
        for score_field in [
            "Score A",
            "Score B",
            "Score C",
            "Score D",
            "Score E",
            "Poverty (Less than 200% of federal poverty line)",
        ]:
            df[f"{score_field}{self.PERCENTILE_FIELD_SUFFIX}"] = df[
                score_field
            ].rank(pct=True)

            for threshold in [0.25, 0.3, 0.35, 0.4]:
                fraction_converted_to_percent = int(100 * threshold)
                df[
                    f"{score_field} (top {fraction_converted_to_percent}th percentile)"
                ] = (
                    df[f"{score_field}{self.PERCENTILE_FIELD_SUFFIX}"]
                    >= 1 - threshold
                )
        return df

    
        
