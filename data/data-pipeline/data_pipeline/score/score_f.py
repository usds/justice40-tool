import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreF(Score):
    # TODO Make variables and constants clearer (meaning and type)

    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score F")
        ami_and_high_school_field = "Low AMI, Low HS graduation"
        meets_socio_field = "Meets socioeconomic criteria"
        meets_burden_field = "Meets burden criteria"

        self.df[ami_and_high_school_field] = (
            self.df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD] < 0.80
        ) & (self.df[field_names.HIGH_SCHOOL_ED_FIELD] > 0.2)

        self.df[meets_socio_field] = (
            self.df[ami_and_high_school_field]
            | (self.df[field_names.POVERTY_FIELD] > 0.40)
            | (self.df[field_names.LINGUISTIC_ISO_FIELD] > 0.10)
            | (self.df[field_names.HIGH_SCHOOL_ED_FIELD] > 0.4)
        )

        self.df[meets_burden_field] = (
            (self.df[field_names.PM25_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.RESPITORY_HAZARD_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.TRAFFIC_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.LEAD_PAINT_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.RMP_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.ASTHMA_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.HEART_DISEASE_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.CANCER_PERCENTILE_FIELD] > 0.9)
            | (self.df[field_names.DIABETES_PERCENTILE_FIELD] > 0.9)
        )

        self.df[field_names.SCORE_F_COMMUNITIES] = (
            self.df[meets_socio_field] & self.df[meets_burden_field]
        )

        return self.df
