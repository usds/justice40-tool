from data_pipeline.etl.score.score import Score

class ScoreA(Score):
    def columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score A")
        df["Score A"] = df[
            [
                "Poverty (Less than 200% of federal poverty line) (percentile)",
                "Percent individuals age 25 or over with less than high school degree (percentile)",
            ]
        ].mean(axis=1)
        return df