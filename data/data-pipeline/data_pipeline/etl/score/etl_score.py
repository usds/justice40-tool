import collections
import functools

import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

class ScoreETL(ExtractTransformLoad):
    def __init__(self):
        # Define some global parameters
        self.BUCKET_SOCIOECONOMIC = "Socioeconomic Factors"
        self.BUCKET_SENSITIVE = "Sensitive populations"
        self.BUCKET_ENVIRONMENTAL = "Environmental effects"
        self.BUCKET_EXPOSURES = "Exposures"
        self.BUCKETS = [
            self.BUCKET_SOCIOECONOMIC,
            self.BUCKET_SENSITIVE,
            self.BUCKET_ENVIRONMENTAL,
            self.BUCKET_EXPOSURES,
        ]

        # A few specific field names
        # TODO: clean this up, I name some fields but not others.
        self.UNEMPLOYED_FIELD_NAME = "Unemployed civilians (percent)"
        self.LINGUISTIC_ISOLATION_FIELD_NAME = "Linguistic isolation (percent)"
        self.HOUSING_BURDEN_FIELD_NAME = "Housing burden (percent)"
        self.POVERTY_FIELD_NAME = (
            "Poverty (Less than 200% of federal poverty line)"
        )
        self.HIGH_SCHOOL_FIELD_NAME = "Percent individuals age 25 or over with less than high school degree"
        self.STATE_MEDIAN_INCOME_FIELD_NAME: str = f"Median household income (State; 2019 inflation-adjusted dollars)"
        self.MEDIAN_INCOME_FIELD_NAME = (
            "Median household income in the past 12 months"
        )
        self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME = (
            "Median household income (% of state median household income)"
        )

        # There's another aggregation level (a second level of "buckets").
        self.AGGREGATION_POLLUTION = "Pollution Burden"
        self.AGGREGATION_POPULATION = "Population Characteristics"

        self.PERCENTILE_FIELD_SUFFIX = " (percentile)"
        self.MIN_MAX_FIELD_SUFFIX = " (min-max normalized)"

        self.SCORE_CSV_PATH = self.DATA_PATH / "score" / "csv" / "full"

        # dataframes
        self.df: pd.DataFrame
        self.ejscreen_df: pd.DataFrame
        self.census_df: pd.DataFrame
        self.housing_and_transportation_df: pd.DataFrame
        self.hud_housing_df: pd.DataFrame
        self.cdc_places_df: pd.DataFrame

    def data_sets(self) -> list:
        # Define a named tuple that will be used for each data set input.
        DataSet = collections.namedtuple(
            typename="DataSet",
            field_names=["input_field", "renamed_field", "bucket"],
        )

        return [
            # The following data sets have `bucket=None`, because it's not used in the bucket based score ("Score C").
            DataSet(
                input_field=self.GEOID_FIELD_NAME,
                # Use the name `GEOID10` to enable geoplatform.gov's workflow.
                renamed_field=self.GEOID_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.HOUSING_BURDEN_FIELD_NAME,
                renamed_field=self.HOUSING_BURDEN_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field="ACSTOTPOP",
                renamed_field="Total population",
                bucket=None,
            ),
            DataSet(
                input_field=self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME,
                renamed_field=self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field="Current asthma among adults aged >=18 years",
                renamed_field="Current asthma among adults aged >=18 years",
                bucket=None,
            ),
            DataSet(
                input_field="Coronary heart disease among adults aged >=18 years",
                renamed_field="Coronary heart disease among adults aged >=18 years",
                bucket=None,
            ),
            DataSet(
                input_field="Cancer (excluding skin cancer) among adults aged >=18 years",
                renamed_field="Cancer (excluding skin cancer) among adults aged >=18 years",
                bucket=None,
            ),
            DataSet(
                input_field="Current lack of health insurance among adults aged 18-64 years",
                renamed_field="Current lack of health insurance among adults aged 18-64 years",
                bucket=None,
            ),
            DataSet(
                input_field="Diagnosed diabetes among adults aged >=18 years",
                renamed_field="Diagnosed diabetes among adults aged >=18 years",
                bucket=None,
            ),
            DataSet(
                input_field="Physical health not good for >=14 days among adults aged >=18 years",
                renamed_field="Physical health not good for >=14 days among adults aged >=18 years",
                bucket=None,
            ),
            # The following data sets have buckets, because they're used in Score C
            DataSet(
                input_field="CANCER",
                renamed_field="Air toxics cancer risk",
                bucket=self.BUCKET_EXPOSURES,
            ),
            DataSet(
                input_field="RESP",
                renamed_field="Respiratory hazard index",
                bucket=self.BUCKET_EXPOSURES,
            ),
            DataSet(
                input_field="DSLPM",
                renamed_field="Diesel particulate matter",
                bucket=self.BUCKET_EXPOSURES,
            ),
            DataSet(
                input_field="PM25",
                renamed_field="Particulate matter (PM2.5)",
                bucket=self.BUCKET_EXPOSURES,
            ),
            DataSet(
                input_field="OZONE",
                renamed_field="Ozone",
                bucket=self.BUCKET_EXPOSURES,
            ),
            DataSet(
                input_field="PTRAF",
                renamed_field="Traffic proximity and volume",
                bucket=self.BUCKET_EXPOSURES,
            ),
            DataSet(
                input_field="PRMP",
                renamed_field="Proximity to RMP sites",
                bucket=self.BUCKET_ENVIRONMENTAL,
            ),
            DataSet(
                input_field="PTSDF",
                renamed_field="Proximity to TSDF sites",
                bucket=self.BUCKET_ENVIRONMENTAL,
            ),
            DataSet(
                input_field="PNPL",
                renamed_field="Proximity to NPL sites",
                bucket=self.BUCKET_ENVIRONMENTAL,
            ),
            DataSet(
                input_field="PWDIS",
                renamed_field="Wastewater discharge",
                bucket=self.BUCKET_ENVIRONMENTAL,
            ),
            DataSet(
                input_field="PRE1960PCT",
                renamed_field="Percent pre-1960s housing (lead paint indicator)",
                bucket=self.BUCKET_ENVIRONMENTAL,
            ),
            DataSet(
                input_field="UNDER5PCT",
                renamed_field="Individuals under 5 years old",
                bucket=self.BUCKET_SENSITIVE,
            ),
            DataSet(
                input_field="OVER64PCT",
                renamed_field="Individuals over 64 years old",
                bucket=self.BUCKET_SENSITIVE,
            ),
            DataSet(
                input_field=self.LINGUISTIC_ISOLATION_FIELD_NAME,
                renamed_field=self.LINGUISTIC_ISOLATION_FIELD_NAME,
                bucket=self.BUCKET_SENSITIVE,
            ),
            DataSet(
                input_field="LINGISOPCT",
                renamed_field="Percent of households in linguistic isolation",
                bucket=self.BUCKET_SOCIOECONOMIC,
            ),
            DataSet(
                input_field="LOWINCPCT",
                renamed_field=self.POVERTY_FIELD_NAME,
                bucket=self.BUCKET_SOCIOECONOMIC,
            ),
            DataSet(
                input_field="LESSHSPCT",
                renamed_field=self.HIGH_SCHOOL_FIELD_NAME,
                bucket=self.BUCKET_SOCIOECONOMIC,
            ),
            DataSet(
                input_field=self.UNEMPLOYED_FIELD_NAME,
                renamed_field=self.UNEMPLOYED_FIELD_NAME,
                bucket=self.BUCKET_SOCIOECONOMIC,
            ),
            DataSet(
                input_field="ht_ami",
                renamed_field="Housing + Transportation Costs % Income for the Regional Typical Household",
                bucket=self.BUCKET_SOCIOECONOMIC,
            ),
        ]

    def extract(self) -> None:
        logger.info("Loading data sets from disk.")
        # EJSCreen csv Load
        ejscreen_csv = self.DATA_PATH / "dataset" / "ejscreen_2019" / "usa.csv"
        self.ejscreen_df = pd.read_csv(
            ejscreen_csv, dtype={"ID": "string"}, low_memory=False
        )
        self.ejscreen_df.rename(
            columns={"ID": self.GEOID_FIELD_NAME}, inplace=True
        )

        # Load census data
        census_csv = self.DATA_PATH / "dataset" / "census_acs_2019" / "usa.csv"
        self.census_df = pd.read_csv(
            census_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load housing and transportation data
        housing_and_transportation_index_csv = (
            self.DATA_PATH
            / "dataset"
            / "housing_and_transportation_index"
            / "usa.csv"
        )
        self.housing_and_transportation_df = pd.read_csv(
            housing_and_transportation_index_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load HUD housing data
        hud_housing_csv = self.DATA_PATH / "dataset" / "hud_housing" / "usa.csv"
        self.hud_housing_df = pd.read_csv(
            hud_housing_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load CDC Places data
        cdc_places_csv = self.DATA_PATH / "dataset" / "cdc_places" / "usa.csv"
        self.cdc_places_df = pd.read_csv(
            cdc_places_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load census AMI data
        census_acs_median_incomes_csv = self.DATA_PATH / "dataset" / "census_acs_median_income_2019" / "usa.csv"
        self.census_acs_median_incomes_df = pd.read_csv(
            census_acs_median_incomes_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

    def _join_cbg_dfs(self, census_block_group_dfs: list) -> pd.DataFrame:
        logger.info("Joining Census Block Group dataframes")
        census_block_group_df = functools.reduce(
            lambda left, right: pd.merge(
                left=left, right=right, on=self.GEOID_FIELD_NAME, how="outer"
            ),
            census_block_group_dfs,
        )

        # Sanity check the join.
        if (
            len(census_block_group_df[self.GEOID_FIELD_NAME].str.len().unique())
            != 1
        ):
            raise ValueError(
                f"One of the input CSVs uses {self.GEOID_FIELD_NAME} with a different length."
            )
        return census_block_group_df

    def _join_tract_dfs(self, census_tract_dfs: list) -> pd.DataFrame:
        logger.info("Joining Census Tract dataframes")
        census_tract_df = functools.reduce(
            lambda left, right: pd.merge(
                left=left,
                right=right,
                on=self.GEOID_TRACT_FIELD_NAME,
                how="outer",
            ),
            census_tract_dfs,
        )

        # Sanity check the join.
        if (
            len(census_tract_df[self.GEOID_TRACT_FIELD_NAME].str.len().unique())
            != 1
        ):
            raise ValueError(
                f"One of the input CSVs uses {self.GEOID_TRACT_FIELD_NAME} with a different length."
            )
        return census_tract_df

    def _add_score_a(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score A")
        df["Score A"] = df[
            [
                "Poverty (Less than 200% of federal poverty line) (percentile)",
                "Percent individuals age 25 or over with less than high school degree (percentile)",
            ]
        ].mean(axis=1)
        return df

    def _add_score_b(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score B")
        df["Score B"] = (
            self.df[
                "Poverty (Less than 200% of federal poverty line) (percentile)"
            ]
            * self.df[
                "Percent individuals age 25 or over with less than high school degree (percentile)"
            ]
        )
        return df

    def _add_score_c(self, df: pd.DataFrame, data_sets: list) -> pd.DataFrame:
        logger.info("Adding Score C")
        # Average all the percentile values in each bucket into a single score for each of the four buckets.
        for bucket in self.BUCKETS:
            fields_in_bucket = [
                f"{data_set.renamed_field}{self.PERCENTILE_FIELD_SUFFIX}"
                for data_set in data_sets
                if data_set.bucket == bucket
            ]
            df[f"{bucket}"] = df[fields_in_bucket].mean(axis=1)

        # Combine the score from the two Exposures and Environmental Effects buckets
        # into a single score called "Pollution Burden".
        # The math for this score is:
        # (1.0 * Exposures Score + 0.5 * Environment Effects score) / 1.5.
        df[self.AGGREGATION_POLLUTION] = (
            1.0 * df[f"{self.BUCKET_EXPOSURES}"]
            + 0.5 * df[f"{self.BUCKET_ENVIRONMENTAL}"]
        ) / 1.5

        # Average the score from the two Sensitive populations and
        # Socioeconomic factors buckets into a single score called
        # "Population Characteristics".
        df[self.AGGREGATION_POPULATION] = df[
            [f"{self.BUCKET_SENSITIVE}", f"{self.BUCKET_SOCIOECONOMIC}"]
        ].mean(axis=1)

        # Multiply the "Pollution Burden" score and the "Population Characteristics"
        # together to produce the cumulative impact score.
        df["Score C"] = (
            df[self.AGGREGATION_POLLUTION]
            * df[self.AGGREGATION_POPULATION]
        )
        return df

    def _add_scores_d_and_e(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Scores D and E")
        fields_to_use_in_score = [
            self.UNEMPLOYED_FIELD_NAME,
            self.LINGUISTIC_ISOLATION_FIELD_NAME,
            self.HOUSING_BURDEN_FIELD_NAME,
            self.POVERTY_FIELD_NAME,
            self.HIGH_SCHOOL_FIELD_NAME,
        ]

        fields_min_max = [
            f"{field}{self.MIN_MAX_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]
        fields_percentile = [
            f"{field}{self.PERCENTILE_FIELD_SUFFIX}"
            for field in fields_to_use_in_score
        ]

        # Calculate "Score D", which uses min-max normalization
        # and calculate "Score E", which uses percentile normalization for the same fields
        df["Score D"] = self.df[fields_min_max].mean(axis=1)
        df["Score E"] = self.df[fields_percentile].mean(axis=1)
        return df

    def _add_score_percentiles(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Adding Score Percentiles")
        for score_field in [
            "Score A",
            "Score B",
            "Score C",
            "Score D",
            "Score E",
            "Poverty (Less than 200% of federal poverty line)",
        ]:
            df[f"{score_field}{self.PERCENTILE_FIELD_SUFFIX}"] = df[
                score_field
            ].rank(pct=True)

            for threshold in [0.25, 0.3, 0.35, 0.4]:
                fraction_converted_to_percent = int(100 * threshold)
                df[
                    f"{score_field} (top {fraction_converted_to_percent}th percentile)"
                ] = (
                    df[f"{score_field}{self.PERCENTILE_FIELD_SUFFIX}"]
                    >= 1 - threshold
                )
        return df

    # TODO Make variables and constants clearer (meaning and type)
    def _add_score_f(self, df: pd.DataFrame) -> pd.DataFrame:
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
                df[
                    "Current asthma among adults aged >=18 years (percentile)"
                ]
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

    def _add_score_g(self, df: pd.DataFrame) -> pd.DataFrame:
        # TODO: add scoring
        return df

    # TODO Move a lot of this to the ETL part of the pipeline
    def _prepare_initial_df(self, data_sets: list) -> pd.DataFrame:
        logger.info("Preparing initial dataframe")

        # Join all the data sources that use census block groups
        census_block_group_dfs = [
            self.ejscreen_df,
            self.census_df,
            self.housing_and_transportation_df,
            self.census_acs_median_incomes_df
        ]
        census_block_group_df = self._join_cbg_dfs(census_block_group_dfs)

        # Join all the data sources that use census tracts
        census_tract_dfs = [
            self.hud_housing_df,
            self.cdc_places_df,
        ]
        census_tract_df = self._join_tract_dfs(census_tract_dfs)

        # Calculate the tract for the CBG data.
        census_block_group_df[
            self.GEOID_TRACT_FIELD_NAME
        ] = census_block_group_df[self.GEOID_FIELD_NAME].str[0:11]

        df = census_block_group_df.merge(
            census_tract_df, on=self.GEOID_TRACT_FIELD_NAME
        )

        # If GEOID10s are read as numbers instead of strings, the initial 0 is dropped,
        # and then we get too many CBG rows (one for 012345 and one for 12345).
        if len(census_block_group_df) > self.EXPECTED_MAX_CENSUS_BLOCK_GROUPS:
            raise ValueError(f"Too many rows in the join: {len(census_block_group_df)}")

        # Calculate median income variables.
        # First, calculate the income of the block group as a fraction of the state income.
        # TODO: handle null values for CBG median income, which are `-666666666`.
        df[self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME] = (
            df[self.MEDIAN_INCOME_FIELD_NAME]
            / df[self.STATE_MEDIAN_INCOME_FIELD_NAME]
        )

        # TODO: Calculate the income of the block group as a fraction of the AMI.

        # TODO Refactor to no longer use the data_sets list and do all renaming in ETL step
        # Rename columns:
        renaming_dict = {
            data_set.input_field: data_set.renamed_field
            for data_set in data_sets
        }

        df.rename(
            columns=renaming_dict,
            inplace=True,
            errors="raise",
        )

        columns_to_keep = [data_set.renamed_field for data_set in data_sets]
        df = df[columns_to_keep]

        # Convert all columns to numeric.
        # TODO do this at the same time as calculating percentiles in future refactor
        for data_set in data_sets:
            # Skip GEOID_FIELD_NAME, because it's a string.
            if data_set.renamed_field == self.GEOID_FIELD_NAME:
                continue
            df[f"{data_set.renamed_field}"] = pd.to_numeric(
                df[data_set.renamed_field]
            )

        # calculate percentiles
        for data_set in data_sets:
            df[
                f"{data_set.renamed_field}{self.PERCENTILE_FIELD_SUFFIX}"
            ] = df[data_set.renamed_field].rank(pct=True)

        # Do some math:
        # (
        #     Observed value
        #     - minimum of all values
        # )
        # divided by
        # (
        #    Maximum of all values
        #     - minimum of all values
        # )
        for data_set in data_sets:
            # Skip GEOID_FIELD_NAME, because it's a string.
            if data_set.renamed_field == self.GEOID_FIELD_NAME:
                continue

            min_value = df[data_set.renamed_field].min(skipna=True)

            max_value = df[data_set.renamed_field].max(skipna=True)

            logger.info(
                f"For data set {data_set.renamed_field}, the min value is {min_value} and the max value is {max_value}."
            )

            df[f"{data_set.renamed_field}{self.MIN_MAX_FIELD_SUFFIX}"] = (
                df[data_set.renamed_field] - min_value
            ) / (max_value - min_value)

        return df

    def transform(self) -> None:
        ## IMPORTANT: THIS METHOD IS CLOSE TO THE LIMIT OF STATEMENTS

        logger.info("Transforming Score Data")

        # get data sets list
        data_sets = self.data_sets()

        # prepare the df with the right CBG/tract IDs, column names/types, and percentiles
        self.df = self._prepare_initial_df(data_sets)

        # Calculate score "A"
        self.df = self._add_score_a(self.df)

        # Calculate score "B"
        self.df = self._add_score_b(self.df)

        # Calculate score "C" - "CalEnviroScreen for the US" score
        self.df = self._add_score_c(self.df, data_sets)

        # Calculate scores "D" and "E"
        self.df = self._add_scores_d_and_e(self.df)

        # Create percentiles for the scores
        self.df = self._add_score_percentiles(self.df)

        # Now for binary (non index) scores.
        # Calculate "Score F", which uses "either/or" thresholds.
        self.df = self._add_score_f(self.df)

        # Calculate "Score G", which uses AMI and poverty.
        self.df = self._add_score_g(self.df)

    def load(self) -> None:
        logger.info("Saving Score CSV")
        self.SCORE_CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.SCORE_CSV_PATH / "usa.csv", index=False)
