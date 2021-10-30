from data_pipeline.score.score import *

class ScoreG(Score):
    def add_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score G")

        high_school_cutoff_threshold = 0.05

        # Score G is now modified NMTC
        df["Score G (communities)"] = (
            (df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (df[FN.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.20)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )
        df["Score G"] = df["Score G (communities)"].astype(int)
        df["Score G (percentile)"] = df["Score G"]

        return df
