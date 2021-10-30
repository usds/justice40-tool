from data_pipeline.score.score import *

class ScoreD(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Scores D and E")
        fields_to_use_in_score = [
            FN.UNEMPLOYMENT_FIELD,
            FN.LINGUISTIC_ISO_FIELD,
            FN.HOUSING_BURDEN_FIELD,
            FN.POVERTY_FIELD,
            FN.HIGH_SCHOOL_ED_FIELD,
        ]

        fields_min_max = [
            f"{field}{FN.MIN_MAX_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]
        fields_percentile = [
            f"{field}{FN.PERCENTILE_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]

        # Calculate "Score D", which uses min-max normalization
        # and calculate "Score E", which uses percentile normalization for the same fields
        self.df["Score D"] = self.df[fields_min_max].mean(axis=1)
        self.df["Score E"] = self.df[fields_percentile].mean(axis=1)

        return self.df
