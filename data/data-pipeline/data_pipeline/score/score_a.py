from data_pipeline.score.score import *

class ScoreA(Score):
    def add_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score A")
        df["Score A"] = df[
            [
                FN.POVERTY_PERCENTILE_FIELD,
                FN.HIGH_SCHOOL_ED_PERCENTILE_FIELD,
            ]
        ].mean(axis=1)
        return df
