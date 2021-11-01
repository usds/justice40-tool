from data_pipeline.score.score import Score, FN, pd, logger


class ScoreG(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score G")

        high_school_cutoff_threshold = 0.05

        # Score G is now modified NMTC
        self.df["Score G (communities)"] = (
            (self.df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (self.df[FN.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.20)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )
        self.df["Score G"] = self.df["Score G (communities)"].astype(int)
        self.df["Score G (percentile)"] = self.df["Score G"]

        return self.df
