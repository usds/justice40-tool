from data_pipeline.score.score import *

class ScoreF(Score):
    # TODO Make variables and constants clearer (meaning and type)

    def add_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score F")
        ami_and_high_school_field = "Low AMI, Low HS graduation"
        meets_socio_field = "Meets socioeconomic criteria"
        meets_burden_field = "Meets burden criteria"

        df[ami_and_high_school_field] = (
            df[FN.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD] < 0.80
        ) & (df[FN.HIGH_SCHOOL_ED_FIELD] > 0.2)

        df[meets_socio_field] = (
            df[ami_and_high_school_field]
            | (df[FN.POVERTY_FIELD] > 0.40)
            | (df[FN.LINGUISTIC_ISO_FIELD] > 0.10)
            | (df[FN.HIGH_SCHOOL_ED_FIELD] > 0.4)
        )

        df[meets_burden_field] = (
            (df[FN.PM25_PERCENTILE_FIELD] > 0.9)
            | (df[FN.RESPITORY_HAZARD_PERCENTILE_FIELD] > 0.9)
            | (df[FN.TRAFFIC_PERCENTILE_FIELD] > 0.9)
            | (
                df[
                    FN.LEAD_PAINT_PERCENTILE_FIELD
                ]
                > 0.9
            )
            | (df[FN.RMP_PERCENTILE_FIELD] > 0.9)
            | (
                df[FN.ASTHMA_PERCENTILE_FIELD]
                > 0.9
            )
            | (
                df[
                    FN.HEART_DISEASE_PERCENTILE_FIELD
                ]
                > 0.9
            )
            | (
                df[
                    FN.CANCER_PERCENTILE_FIELD
                ]
                > 0.9
            )
            | (
                df[
                    FN.DIABETES_PERCENTILE_FIELD
                ]
                > 0.9
            )
        )

        df["Score F (communities)"] = (
            df[meets_socio_field] & df[meets_burden_field]
        )

        return df
