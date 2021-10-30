from data_pipeline.score.score import *


class ScoreK(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score K")

        high_school_cutoff_threshold = 0.06

        self.df["NMTC (communities)"] = (
            (self.df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
        ) | (self.df[FN.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.20)

        self.df["Score K (communities)"] = (
            (self.df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (self.df[FN.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.20)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )

        return self.df
