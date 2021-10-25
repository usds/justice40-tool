import collections
import functools
from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.score.score_calculator import ScoreCalculator

logger = get_module_logger(__name__)


class ScoreETL(ExtractTransformLoad):
    def __init__(self):
        # Define some global parameters
        self.BUCKET_SOCIOECONOMIC: str = "Socioeconomic Factors"
        self.BUCKET_SENSITIVE: str = "Sensitive populations"
        self.BUCKET_ENVIRONMENTAL: str = "Environmental effects"
        self.BUCKET_EXPOSURES: str = "Exposures"
        self.BUCKETS: str = [
            self.BUCKET_SOCIOECONOMIC,
            self.BUCKET_SENSITIVE,
            self.BUCKET_ENVIRONMENTAL,
            self.BUCKET_EXPOSURES,
        ]
        self.SCORE_CSV_PATH: Path = self.DATA_PATH / "score" / "csv" / "full"

        # dataframes
        self.df: pd.DataFrame
        self.ejscreen_df: pd.DataFrame
        self.census_df: pd.DataFrame
        self.housing_and_transportation_df: pd.DataFrame
        self.hud_housing_df: pd.DataFrame
        self.cdc_places_df: pd.DataFrame
        self.census_acs_median_incomes_df: pd.DataFrame
        self.cdc_life_expectancy_df: pd.DataFrame
        self.doe_energy_burden_df: pd.DataFrame
        self.national_risk_index_df: pd.DataFrame
        self.geocorr_urban_rural_df: pd.DataFrame
        self.persistent_poverty_df: pd.DataFrame

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
            DataSet(
                input_field=self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME,
                renamed_field=self.POVERTY_LESS_THAN_100_FPL_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.POVERTY_LESS_THAN_150_FPL_FIELD_NAME,
                renamed_field=self.POVERTY_LESS_THAN_150_FPL_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME,
                renamed_field=self.POVERTY_LESS_THAN_200_FPL_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.AMI_FIELD_NAME,
                renamed_field=self.AMI_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME,
                renamed_field=self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.MEDIAN_INCOME_FIELD_NAME,
                renamed_field=self.MEDIAN_INCOME_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.LIFE_EXPECTANCY_FIELD_NAME,
                renamed_field=self.LIFE_EXPECTANCY_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.ENERGY_BURDEN_FIELD_NAME,
                renamed_field=self.ENERGY_BURDEN_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_FIELD_NAME,
                renamed_field=self.RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.URBAN_HERUISTIC_FIELD_NAME,
                renamed_field=self.URBAN_HERUISTIC_FIELD_NAME,
                bucket=None,
            ),
            DataSet(
                input_field=self.PERSISTENT_POVERTY_FIELD,
                renamed_field=self.PERSISTENT_POVERTY_FIELD,
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
        census_acs_median_incomes_csv = (
            self.DATA_PATH
            / "dataset"
            / "census_acs_median_income_2019"
            / "usa.csv"
        )
        self.census_acs_median_incomes_df = pd.read_csv(
            census_acs_median_incomes_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load CDC life expectancy data
        cdc_life_expectancy_csv = (
            self.DATA_PATH / "dataset" / "cdc_life_expectancy" / "usa.csv"
        )
        self.cdc_life_expectancy_df = pd.read_csv(
            cdc_life_expectancy_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load DOE energy burden data
        doe_energy_burden_csv = (
            self.DATA_PATH / "dataset" / "doe_energy_burden" / "usa.csv"
        )
        self.doe_energy_burden_df = pd.read_csv(
            doe_energy_burden_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load FEMA national risk index data
        national_risk_index_csv = (
            self.DATA_PATH / "dataset" / "national_risk_index_2020" / "usa.csv"
        )
        self.national_risk_index_df = pd.read_csv(
            national_risk_index_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load GeoCorr Urban Rural Map
        geocorr_urban_rural_csv = (
            self.DATA_PATH / "dataset" / "geocorr" / "usa.csv"
        )
        self.geocorr_urban_rural_df = pd.read_csv(
            geocorr_urban_rural_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load persistent poverty
        persistent_poverty_csv = (
            self.DATA_PATH / "dataset" / "persistent_poverty" / "usa.csv"
        )
        self.persistent_poverty_df = pd.read_csv(
            persistent_poverty_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
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

    # TODO Move a lot of this to the ETL part of the pipeline
    def _prepare_initial_df(self, data_sets: list) -> pd.DataFrame:
        logger.info("Preparing initial dataframe")

        # Join all the data sources that use census block groups
        census_block_group_dfs = [
            self.ejscreen_df,
            self.census_df,
            self.housing_and_transportation_df,
            self.census_acs_median_incomes_df,
            self.national_risk_index_df,
        ]
        census_block_group_df = self._join_cbg_dfs(census_block_group_dfs)

        # Join all the data sources that use census tracts
        census_tract_dfs = [
            self.hud_housing_df,
            self.cdc_places_df,
            self.cdc_life_expectancy_df,
            self.doe_energy_burden_df,
            self.geocorr_urban_rural_df,
            self.persistent_poverty_df,
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
            raise ValueError(
                f"Too many rows in the join: {len(census_block_group_df)}"
            )

        # Calculate median income variables.
        # First, calculate the income of the block group as a fraction of the state income.
        df[self.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD_NAME] = (
            df[self.MEDIAN_INCOME_FIELD_NAME]
            / df[self.STATE_MEDIAN_INCOME_FIELD_NAME]
        )

        # Calculate the income of the block group as a fraction of the AMI (either state or metropolitan, depending on reference).
        df[self.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD_NAME] = (
            df[self.MEDIAN_INCOME_FIELD_NAME] / df[self.AMI_FIELD_NAME]
        )

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
            # Skip `PERSISTENT_POVERTY_FIELD` because it's a straight pass-through.
            if data_set.renamed_field in (
                self.GEOID_FIELD_NAME,
                self.PERSISTENT_POVERTY_FIELD,
            ):
                continue

            df[data_set.renamed_field] = pd.to_numeric(
                df[data_set.renamed_field]
            )

        # calculate percentiles
        for data_set in data_sets:
            df[f"{data_set.renamed_field}{self.PERCENTILE_FIELD_SUFFIX}"] = df[
                data_set.renamed_field
            ].rank(pct=True)

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

        # calculate scores
        self.df = ScoreCalculator(df=self.df).calculate_scores()


    def load(self) -> None:
        logger.info("Saving Score CSV")
        self.SCORE_CSV_PATH.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(self.SCORE_CSV_PATH / "usa.csv", index=False)
