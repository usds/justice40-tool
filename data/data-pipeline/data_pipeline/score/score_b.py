import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreB(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score B")
        self.df[field_names.SCORE_B] = (
            self.df[
                field_names.POVERTY_FIELD + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            * self.df[
                field_names.HIGH_SCHOOL_ED_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
        )
        return self.df
