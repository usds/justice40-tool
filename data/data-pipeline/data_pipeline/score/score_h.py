from data_pipeline.score.score import *

class ScoreH(Score):
    def add_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score H")

        high_school_cutoff_threshold = 0.06

        df["Score H (communities)"] = (
            (df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (df[FN.POVERTY_LESS_THAN_200_FPL_FIELD] > 0.40)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )
        df["Score H"] = df["Score H (communities)"].astype(int)

        return df
