from data_pipeline.etl.score.score import Score

class ScoreC(Score):
    # "CalEnviroScreen for the US" score
    def columns(self, df: pd.DataFrame, data_sets: list) -> pd.DataFrame:
        logger.info("Adding Score C")
        # Average all the percentile values in each bucket into a single score for each of the four buckets.
        for bucket in self.BUCKETS:
            fields_in_bucket = [
                f"{data_set.renamed_field}{self.PERCENTILE_FIELD_SUFFIX}"
                for data_set in data_sets
                if data_set.bucket == bucket
            ]
            df[f"{bucket}"] = df[fields_in_bucket].mean(axis=1)

        # Combine the score from the two Exposures and Environmental Effects buckets
        # into a single score called "Pollution Burden".
        # The math for this score is:
        # (1.0 * Exposures Score + 0.5 * Environment Effects score) / 1.5.
        df[self.AGGREGATION_POLLUTION_FIELD] = (
            1.0 * df[f"{self.BUCKET_EXPOSURES}"]
            + 0.5 * df[f"{self.BUCKET_ENVIRONMENTAL}"]
        ) / 1.5

        # Average the score from the two Sensitive populations and
        # Socioeconomic factors buckets into a single score called
        # "Population Characteristics".
        df[self.AGGREGATION_POPULATION_FIELD] = df[
            [f"{self.BUCKET_SENSITIVE}", f"{self.BUCKET_SOCIOECONOMIC}"]
        ].mean(axis=1)

        # Multiply the "Pollution Burden" score and the "Population Characteristics"
        # together to produce the cumulative impact score.
        df["Score C"] = (
            df[self.AGGREGATION_POLLUTION] * df[self.AGGREGATION_POPULATION]
        )
        return df