from data_pipeline.score.score import *

class ScoreB(Score):
    def add_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score B")
        df["Score B"] = (
            df[
                FN.POVERTY_PERCENTILE_FIELD
            ]
            * df[
                FN.HIGH_SCHOOL_ED_PERCENTILE_FIELD
            ]
        )
        return df
