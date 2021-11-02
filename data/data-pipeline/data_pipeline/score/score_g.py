import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreG(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score G")

        high_school_cutoff_threshold = 0.05

        # Score G is now modified NMTC
        self.df[field_names.SCORE_G_COMMUNITIES] = (
            (self.df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (
                self.df[field_names.HIGH_SCHOOL_ED_FIELD]
                > high_school_cutoff_threshold
            )
        ) | (
            (self.df[field_names.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.20)
            & (
                self.df[field_names.HIGH_SCHOOL_ED_FIELD]
                > high_school_cutoff_threshold
            )
        )
        self.df[field_names.SCORE_G] = self.df[
            field_names.SCORE_G_COMMUNITIES
        ].astype(int)
        self.df["Score G (percentile)"] = self.df[field_names.SCORE_G]

        return self.df
