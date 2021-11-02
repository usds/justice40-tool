import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreA(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score A")
        self.df[field_names.SCORE_A] = self.df[
            [
                field_names.POVERTY_PERCENTILE_FIELD,
                field_names.HIGH_SCHOOL_ED_PERCENTILE_FIELD,
            ]
        ].mean(axis=1)
        return self.df
