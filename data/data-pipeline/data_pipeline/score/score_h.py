from data_pipeline.score.score import *

class ScoreH(Score):
    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score H")

        high_school_cutoff_threshold = 0.06

        self.df["Score H (communities)"] = (
            (self.df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (self.df[FN.POVERTY_LESS_THAN_200_FPL_FIELD] > 0.40)
            & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )
        self.df["Score H"] = self.df["Score H (communities)"].astype(int)

        return self.df
