from data_pipeline.etl.score.score import Score

class ScoreD(Score):
    def columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Scores D and E")
        fields_to_use_in_score = [
            self.UNEMPLOYED_FIELD_NAME,
            self.LINGUISTIC_ISOLATION_FIELD_NAME,
            self.HOUSING_BURDEN_FIELD_NAME,
            self.POVERTY_FIELD_NAME,
            self.HIGH_SCHOOL_FIELD_NAME,
        ]

        fields_min_max = [
            f"{field}{self.MIN_MAX_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]
        fields_percentile = [
            f"{field}{self.PERCENTILE_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]

        # Calculate "Score D", which uses min-max normalization
        # and calculate "Score E", which uses percentile normalization for the same fields
        df["Score D"] = self.df[fields_min_max].mean(axis=1)
        df["Score E"] = self.df[fields_percentile].mean(axis=1)
        return df