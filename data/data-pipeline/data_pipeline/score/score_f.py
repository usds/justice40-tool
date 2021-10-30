from data_pipeline.score.score import *

class ScoreF(Score):
    # TODO Make variables and constants clearer (meaning and type)

    def add_columns(self) -> pd.DataFrame:
        logger.info("Adding Score F")
        ami_and_high_school_field = "Low AMI, Low HS graduation"
        meets_socio_field = "Meets socioeconomic criteria"
        meets_burden_field = "Meets burden criteria"

        self.df[ami_and_high_school_field] = (
            self.df[FN.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD] < 0.80
        ) & (self.df[FN.HIGH_SCHOOL_ED_FIELD] > 0.2)

        self.df[meets_socio_field] = (
            self.df[ami_and_high_school_field]
            | (self.df[FN.POVERTY_FIELD] > 0.40)
            | (self.df[FN.LINGUISTIC_ISO_FIELD] > 0.10)
            | (self.df[FN.HIGH_SCHOOL_ED_FIELD] > 0.4)
        )

        self.df[meets_burden_field] = (
            (self.df[FN.PM25_PERCENTILE_FIELD] > 0.9)
            | (self.df[FN.RESPITORY_HAZARD_PERCENTILE_FIELD] > 0.9)
            | (self.df[FN.TRAFFIC_PERCENTILE_FIELD] > 0.9)
            | (
                self.df[
                    FN.LEAD_PAINT_PERCENTILE_FIELD
                ]
                > 0.9
            )
            | (self.df[FN.RMP_PERCENTILE_FIELD] > 0.9)
            | (
                self.df[FN.ASTHMA_PERCENTILE_FIELD]
                > 0.9
            )
            | (
                self.df[
                    FN.HEART_DISEASE_PERCENTILE_FIELD
                ]
                > 0.9
            )
            | (
                self.df[
                    FN.CANCER_PERCENTILE_FIELD
                ]
                > 0.9
            )
            | (
                self.df[
                    FN.DIABETES_PERCENTILE_FIELD
                ]
                > 0.9
            )
        )

        self.df["Score F (communities)"] = (
            self.df[meets_socio_field] & self.df[meets_burden_field]
        )

        return self.df
