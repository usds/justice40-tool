from data_pipeline.score.score import *

class ScoreI(Score):
    def add_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score I")

        high_school_cutoff_threshold = 0.05

        df["Score I (communities)"] = (
            (df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.7)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (df[FN.POVERTY_LESS_THAN_200_FPL_FIELD] > 0.50)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )
        df["Score I"] = df["Score I (communities)"].astype(int)
        df["Score I (percentile)"] = df["Score I"]

        return df
