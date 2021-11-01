from data_pipeline.score.score import Score, FN, pd, logger


class ScoreA(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score A")
        self.df["Score A"] = self.df[
            [
                FN.POVERTY_PERCENTILE_FIELD,
                FN.HIGH_SCHOOL_ED_PERCENTILE_FIELD,
            ]
        ].mean(axis=1)
        return self.df
