from data_pipeline.etl.score.score import Score

class ScoreB(Score):
    def columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score B")
        df["Score B"] = (
            self.df[
                "Poverty (Less than 200% of federal poverty line) (percentile)"
            ]
            * self.df[
                "Percent individuals age 25 or over with less than high school degree (percentile)"
            ]
        )
        return df