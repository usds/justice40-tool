from data_pipeline.score.score import *


class ScoreI(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score I")

        high_school_cutoff_threshold = 0.05

        self.df["Score I (communities)"] = (
            (self.df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.7)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD] > 0.50)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )
        self.df["Score I"] = self.df["Score I (communities)"].astype(int)
        self.df["Score I (percentile)"] = self.df["Score I"]

        return self.df
