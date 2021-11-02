from collections import namedtuple
import pandas as pd

from data_pipeline.score.score import Score
import data_pipeline.score.field_names as field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreC(Score):
    def __init__(self, df: pd.DataFrame) -> None:
        Bucket = namedtuple(typename="Bucket", field_names=["name", "fields"])

        self.BUCKET_SOCIOECONOMIC = Bucket(
            field_names.C_SOCIOECONOMIC,
            [
                field_names.HOUSEHOLDS_LINGUISTIC_ISO_FIELD,
                field_names.POVERTY_FIELD,
                field_names.HIGH_SCHOOL_ED_FIELD,
                field_names.UNEMPLOYMENT_FIELD,
                field_names.HT_INDEX_FIELD,
            ],
        )
        self.BUCKET_SENSITIVE = Bucket(
            field_names.C_SENSITIVE,
            [
                field_names.UNDER_5_FIELD,
                field_names.OVER_64_FIELD,
                field_names.LINGUISTIC_ISO_FIELD,
            ],
        )
        self.BUCKET_ENVIRONMENTAL = Bucket(
            field_names.C_ENVIRONMENTAL,
            [
                field_names.RMP_FIELD,
                field_names.TSDF_FIELD,
                field_names.NPL_FIELD,
                field_names.WASTEWATER_FIELD,
                field_names.LEAD_PAINT_FIELD,
            ],
        )
        self.BUCKET_EXPOSURES = Bucket(
            field_names.C_EXPOSURES,
            [
                field_names.AIR_TOXICS_CANCER_RISK_FIELD,
                field_names.RESPITORY_HAZARD_FIELD,
                field_names.DIESEL_FIELD,
                field_names.PM25_FIELD,
                field_names.OZONE_FIELD,
                field_names.TRAFFIC_FIELD,
            ],
        )
        self.BUCKETS = [
            self.BUCKET_SOCIOECONOMIC,
            self.BUCKET_SENSITIVE,
            self.BUCKET_ENVIRONMENTAL,
            self.BUCKET_EXPOSURES,
        ]
        super().__init__(df)

    # "CalEnviroScreen for the US" score
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score C")
        # Average all the percentile values in each bucket into a single score for each of the four buckets.

        # TODO just use the percentile fields in the list instead
        for bucket in self.BUCKETS:
            fields_to_average = []
            for field in bucket.fields:
                fields_to_average.append(
                    f"{field}{field_names.PERCENTILE_FIELD_SUFFIX}"
                )

            self.df[f"{bucket.name}"] = self.df[fields_to_average].mean(axis=1)

        # Combine the score from the two Exposures and Environmental Effects buckets
        # into a single score called "Pollution Burden".
        # The math for this score is:
        # (1.0 * Exposures Score + 0.5 * Environment Effects score) / 1.5.
        self.df[field_names.AGGREGATION_POLLUTION_FIELD] = (
            1.0 * self.df[self.BUCKET_EXPOSURES.name]
            + 0.5 * self.df[self.BUCKET_ENVIRONMENTAL.name]
        ) / 1.5

        # Average the score from the two Sensitive populations and
        # Socioeconomic factors buckets into a single score called
        # "Population Characteristics".
        self.df[field_names.AGGREGATION_POPULATION_FIELD] = self.df[
            [self.BUCKET_SENSITIVE.name, self.BUCKET_SOCIOECONOMIC.name]
        ].mean(axis=1)

        # Multiply the "Pollution Burden" score and the "Population Characteristics"
        # together to produce the cumulative impact score.
        self.df[field_names.SCORE_C] = (
            self.df[field_names.AGGREGATION_POLLUTION_FIELD]
            * self.df[field_names.AGGREGATION_POPULATION_FIELD]
        )
        return self.df
