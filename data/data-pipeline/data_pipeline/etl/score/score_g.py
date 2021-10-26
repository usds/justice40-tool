from data_pipeline.etl.score.score import Score

class ScoreG(Score):
    def columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score G through K")

        high_school_cutoff_threshold = 0.05
        high_school_cutoff_threshold_2 = 0.06

        # Score G is now modified NMTC
        df["Score G (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        ) | (
            (df[self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME] > 0.20)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        )
        df["Score G"] = df["Score G (communities)"].astype(int)
        df["Score G (percentile)"] = df["Score G"]

        df["Score H (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        ) | (
            (df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.40)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        )
        df["Score H"] = df["Score H (communities)"].astype(int)

        df["Score I (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.7)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        ) | (
            (df[self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME] > 0.50)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold)
        )
        df["Score I"] = df["Score I (communities)"].astype(int)
        df["Score I (percentile)"] = df["Score I"]

        df["NMTC (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
        ) | (df[self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME] > 0.20)

        df["Score K (communities)"] = (
            (df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] < 0.8)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        ) | (
            (df[self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME] > 0.20)
            & (df[self.HIGH_SCHOOL_FIELD_NAME] > high_school_cutoff_threshold_2)
        )

        return df