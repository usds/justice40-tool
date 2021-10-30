from data_pipeline.score.score import *


class ScoreC(Score):
    def __init__(self, df: pd.DataFrame) -> None:
        self.BUCKET_SOCIOECONOMIC = {
            "name": "Socioeconomic Factors",
            "fields": [
                FN.HOUSEHOLDS_LINGUISTIC_ISO_FIELD,
                FN.POVERTY_FIELD,
                FN.HIGH_SCHOOL_ED_FIELD,
                FN.UNEMPLOYMENT_FIELD,
                FN.HT_INDEX_FIELD,
            ],
        }
        self.BUCKET_SENSITIVE = {
            "name": "Sensitive populations",
            "fields": [
                FN.UNDER_5_FIELD,
                FN.OVER_64_FIELD,
                FN.LINGUISTIC_ISO_FIELD,
            ],
        }
        self.BUCKET_ENVIRONMENTAL = {
            "name": "Environmental effects",
            "fields": [
                FN.RMP_FIELD,
                FN.TSDF_FIELD,
                FN.NPL_FIELD,
                FN.WASTEWATER_FIELD,
                FN.LEAD_PAINT_FIELD,
            ],
        }
        self.BUCKET_EXPOSURES = {
            "name": "Exposures",
            "fields": [
                FN.AIR_TOXICS_CANCER_RISK_FIELD,
                FN.RESPITORY_HAZARD_FIELD,
                FN.DIESEL_FIELD,
                FN.PM25_FIELD,
                FN.OZONE_FIELD,
                FN.TRAFFIC_FIELD,
            ],
        }
        super().__init__(df)

    # "CalEnviroScreen for the US" score
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score C")
        # Average all the percentile values in each bucket into a single score for each of the four buckets.
        buckets = [
            self.BUCKET_SOCIOECONOMIC,
            self.BUCKET_SENSITIVE,
            self.BUCKET_ENVIRONMENTAL,
            self.BUCKET_EXPOSURES,
        ]
        # TODO just use the percentile fields in the list instead
        for bucket in buckets:
            fields_to_average = []
            for field in bucket["fields"]:
                fields_to_average.append(f"{field}{FN.PERCENTILE_FIELD_SUFFIX}")

            name = bucket["name"]
            self.df[f"{name}"] = self.df[fields_to_average].mean(axis=1)

        # Combine the score from the two Exposures and Environmental Effects buckets
        # into a single score called "Pollution Burden".
        # The math for this score is:
        # (1.0 * Exposures Score + 0.5 * Environment Effects score) / 1.5.
        self.df[FN.AGGREGATION_POLLUTION_FIELD] = (
            1.0 * self.df[self.BUCKET_EXPOSURES["name"]]
            + 0.5 * self.df[self.BUCKET_ENVIRONMENTAL["name"]]
        ) / 1.5

        # Average the score from the two Sensitive populations and
        # Socioeconomic factors buckets into a single score called
        # "Population Characteristics".
        self.df[FN.AGGREGATION_POPULATION_FIELD] = self.df[
            [self.BUCKET_SENSITIVE["name"], self.BUCKET_SOCIOECONOMIC["name"]]
        ].mean(axis=1)

        # Multiply the "Pollution Burden" score and the "Population Characteristics"
        # together to produce the cumulative impact score.
        self.df["Score C"] = (
            self.df[FN.AGGREGATION_POLLUTION_FIELD]
            * self.df[FN.AGGREGATION_POPULATION_FIELD]
        )
        return self.df
