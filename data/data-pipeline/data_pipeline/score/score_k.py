from data_pipeline.score.score import *

class ScoreK(Score):
    def add_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score K")

        high_school_cutoff_threshold = 0.06

        df["NMTC (communities)"] = (
            (df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
        ) | (df[FN.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.20)

        df["Score K (communities)"] = (
            (df[FN.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] < 0.8)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        ) | (
            (df[FN.POVERTY_LESS_THAN_100_FPL_FIELD] > 0.20)
            & (df[FN.HIGH_SCHOOL_ED_FIELD] > high_school_cutoff_threshold)
        )

        return df
