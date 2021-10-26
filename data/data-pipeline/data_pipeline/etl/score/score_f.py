from data_pipeline.etl.score.score import Score

class ScoreF(Score):
    # TODO Make variables and constants clearer (meaning and type)

    def columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score F")
        ami_and_high_school_field_name = "Low AMI, Low HS graduation"
        meets_socio_field_name = "Meets socioeconomic criteria"
        meets_burden_field_name = "Meets burden criteria"

        df[ami_and_high_school_field_name] = (
            df[self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME] < 0.80
        ) & (df[self.HIGH_SCHOOL_FIELD_NAME] > 0.2)

        df[meets_socio_field_name] = (
            df[ami_and_high_school_field_name]
            | (df[self.POVERTY_FIELD_NAME] > 0.40)
            | (df[self.LINGUISTIC_ISOLATION_FIELD_NAME] > 0.10)
            | (df[self.HIGH_SCHOOL_FIELD_NAME] > 0.4)
        )

        df[meets_burden_field_name] = (
            (df["Particulate matter (PM2.5) (percentile)"] > 0.9)
            | (df["Respiratory hazard index (percentile)"] > 0.9)
            | (df["Traffic proximity and volume (percentile)"] > 0.9)
            | (
                df[
                    "Percent pre-1960s housing (lead paint indicator) (percentile)"
                ]
                > 0.9
            )
            | (df["Proximity to RMP sites (percentile)"] > 0.9)
            | (
                df["Current asthma among adults aged >=18 years (percentile)"]
                > 0.9
            )
            | (
                df[
                    "Coronary heart disease among adults aged >=18 years (percentile)"
                ]
                > 0.9
            )
            | (
                df[
                    "Cancer (excluding skin cancer) among adults aged >=18 years (percentile)"
                ]
                > 0.9
            )
            # | (
            #     self.df[
            #         "Current lack of health insurance among adults aged 18-64 years (percentile)"
            #     ]
            #     > 0.9
            # )
            | (
                df[
                    "Diagnosed diabetes among adults aged >=18 years (percentile)"
                ]
                > 0.9
            )
            # | (
            #     self.df[
            #         "Physical health not good for >=14 days among adults aged >=18 years (percentile)"
            #     ]
            #     > 0.9
            # )
        )

        df["Score F (communities)"] = (
            df[meets_socio_field_name] & df[meets_burden_field_name]
        )
        return df