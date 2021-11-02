import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreH(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score H")

        high_school_cutoff_threshold = 0.06

        self.df[field_names.SCORE_H_COMMUNITIES] = (
            (self.df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (
                self.df[field_names.HIGH_SCHOOL_ED_FIELD]
                > high_school_cutoff_threshold
            )
        ) | (
            (self.df[field_names.POVERTY_LESS_THAN_200_FPL_FIELD] > 0.40)
            & (
                self.df[field_names.HIGH_SCHOOL_ED_FIELD]
                > high_school_cutoff_threshold
            )
        )
        self.df[field_names.SCORE_H] = self.df[
            field_names.SCORE_H_COMMUNITIES
        ].astype(int)

        return self.df
