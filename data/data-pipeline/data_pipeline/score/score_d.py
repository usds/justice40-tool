import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreD(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Scores D and E")
        fields_to_use_in_score = [
            field_names.UNEMPLOYMENT_FIELD,
            field_names.LINGUISTIC_ISO_FIELD,
            field_names.HOUSING_BURDEN_FIELD,
            field_names.POVERTY_FIELD,
            field_names.HIGH_SCHOOL_ED_FIELD,
        ]

        fields_min_max = [
            f"{field}{field_names.MIN_MAX_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]
        fields_percentile = [
            f"{field}{field_names.PERCENTILE_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]

        # Calculate "Score D", which uses min-max normalization
        # and calculate "Score E", which uses percentile normalization for the same fields
        self.df[field_names.SCORE_D] = self.df[fields_min_max].mean(axis=1)
        self.df[field_names.SCORE_E] = self.df[fields_percentile].mean(axis=1)

        return self.df
