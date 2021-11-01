from data_pipeline.score.score import Score, FN, pd, logger


class ScoreB(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score B")
        self.df["Score B"] = (
            self.df[FN.POVERTY_PERCENTILE_FIELD]
            * self.df[FN.HIGH_SCHOOL_ED_PERCENTILE_FIELD]
        )
        return self.df
