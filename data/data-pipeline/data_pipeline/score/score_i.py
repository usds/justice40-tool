import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreI(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score I")

        high_school_cutoff_threshold = 0.05

        self.df[field_names.SCORE_I_COMMUNITIES] = (
            (self.df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.7)
            & (
                self.df[field_names.HIGH_SCHOOL_ED_FIELD]
                > high_school_cutoff_threshold
            )
        ) | (
            (self.df[field_names.POVERTY_LESS_THAN_200_FPL_FIELD] > 0.50)
            & (
                self.df[field_names.HIGH_SCHOOL_ED_FIELD]
                > high_school_cutoff_threshold
            )
        )
        self.df[field_names.SCORE_I] = self.df[
            field_names.SCORE_I_COMMUNITIES
        ].astype(int)
        self.df["Score I (percentile)"] = self.df[field_names.SCORE_I]

        return self.df
