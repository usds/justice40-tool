import functools
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score.score_runner import ScoreRunner
from data_pipeline.score import field_names
from data_pipeline.etl.score import constants

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class ScoreETL(ExtractTransformLoad):
    def __init__(self):
        # Define some global parameters

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

    def extract(self) -> None:
        logger.info("Loading data sets from disk.")

        # EJSCreen csv Load
        ejscreen_csv = (
            constants.DATA_PATH / "dataset" / "ejscreen_2019" / "usa.csv"
        )
        self.ejscreen_df = pd.read_csv(
            ejscreen_csv, dtype={"ID": "string"}, low_memory=False
        )
        # TODO move to EJScreen ETL
        self.ejscreen_df.rename(
            columns={
                "ID": self.GEOID_FIELD_NAME,
                "ACSTOTPOP": field_names.TOTAL_POP_FIELD,
                "CANCER": field_names.AIR_TOXICS_CANCER_RISK_FIELD,
                "RESP": field_names.RESPITORY_HAZARD_FIELD,
                "DSLPM": field_names.DIESEL_FIELD,
                "PM25": field_names.PM25_FIELD,
                "OZONE": field_names.OZONE_FIELD,
                "PTRAF": field_names.TRAFFIC_FIELD,
                "PRMP": field_names.RMP_FIELD,
                "PTSDF": field_names.TSDF_FIELD,
                "PNPL": field_names.NPL_FIELD,
                "PWDIS": field_names.WASTEWATER_FIELD,
                "LINGISOPCT": field_names.HOUSEHOLDS_LINGUISTIC_ISO_FIELD,
                "LOWINCPCT": field_names.POVERTY_FIELD,
                "LESSHSPCT": field_names.HIGH_SCHOOL_ED_FIELD,
                "OVER64PCT": field_names.OVER_64_FIELD,
                "UNDER5PCT": field_names.UNDER_5_FIELD,
                "PRE1960PCT": field_names.LEAD_PAINT_FIELD,
            },
            inplace=True,
        )

        # Load census data
        census_csv = (
            constants.DATA_PATH / "dataset" / "census_acs_2019" / "usa.csv"
        )
        self.census_df = pd.read_csv(
            census_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load housing and transportation data
        housing_and_transportation_index_csv = (
            constants.DATA_PATH
            / "dataset"
            / "housing_and_transportation_index"
            / "usa.csv"
        )
        self.housing_and_transportation_df = pd.read_csv(
            housing_and_transportation_index_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )
        # TODO move to HT Index ETL
        self.housing_and_transportation_df.rename(
            columns={"ht_ami": field_names.HT_INDEX_FIELD}, inplace=True
        )

        # Load HUD housing data
        hud_housing_csv = (
            constants.DATA_PATH / "dataset" / "hud_housing" / "usa.csv"
        )
        self.hud_housing_df = pd.read_csv(
            hud_housing_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load CDC Places data
        cdc_places_csv = (
            constants.DATA_PATH / "dataset" / "cdc_places" / "usa.csv"
        )
        self.cdc_places_df = pd.read_csv(
            cdc_places_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load census AMI data
        census_acs_median_incomes_csv = (
            constants.DATA_PATH
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
            constants.DATA_PATH / "dataset" / "cdc_life_expectancy" / "usa.csv"
        )
        self.cdc_life_expectancy_df = pd.read_csv(
            cdc_life_expectancy_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load DOE energy burden data
        doe_energy_burden_csv = (
            constants.DATA_PATH / "dataset" / "doe_energy_burden" / "usa.csv"
        )
        self.doe_energy_burden_df = pd.read_csv(
            doe_energy_burden_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load FEMA national risk index data
        national_risk_index_csv = (
            constants.DATA_PATH
            / "dataset"
            / "national_risk_index_2020"
            / "usa.csv"
        )
        self.national_risk_index_df = pd.read_csv(
            national_risk_index_csv,
            dtype={self.GEOID_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load GeoCorr Urban Rural Map
        geocorr_urban_rural_csv = (
            constants.DATA_PATH / "dataset" / "geocorr" / "usa.csv"
        )
        self.geocorr_urban_rural_df = pd.read_csv(
            geocorr_urban_rural_csv,
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
        )

        # Load persistent poverty
        persistent_poverty_csv = (
            constants.DATA_PATH / "dataset" / "persistent_poverty" / "usa.csv"
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
    def _prepare_initial_df(self) -> pd.DataFrame:
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
        df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD] = (
            df[field_names.MEDIAN_INCOME_FIELD]
            / df[field_names.STATE_MEDIAN_INCOME_FIELD]
        )

        # Calculate the income of the block group as a fraction of the AMI (either state or metropolitan, depending on reference).
        df[field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD] = (
            df[field_names.MEDIAN_INCOME_FIELD] / df[field_names.AMI_FIELD]
        )

        numeric_columns = [
            field_names.HOUSING_BURDEN_FIELD,
            field_names.TOTAL_POP_FIELD,
            field_names.MEDIAN_INCOME_AS_PERCENT_OF_STATE_FIELD,
            field_names.ASTHMA_FIELD,
            field_names.HEART_DISEASE_FIELD,
            field_names.CANCER_FIELD,
            field_names.HEALTH_INSURANCE_FIELD,
            field_names.DIABETES_FIELD,
            field_names.PHYS_HEALTH_NOT_GOOD_FIELD,
            field_names.POVERTY_LESS_THAN_100_FPL_FIELD,
            field_names.POVERTY_LESS_THAN_150_FPL_FIELD,
            field_names.POVERTY_LESS_THAN_200_FPL_FIELD,
            field_names.AMI_FIELD,
            field_names.MEDIAN_INCOME_AS_PERCENT_OF_AMI_FIELD,
            field_names.MEDIAN_INCOME_FIELD,
            field_names.LIFE_EXPECTANCY_FIELD,
            field_names.ENERGY_BURDEN_FIELD,
            field_names.FEMA_RISK_FIELD,
            field_names.FEMA_EXPECTED_ANNUAL_LOSS_RATE_FIELD,
            field_names.URBAN_HERUISTIC_FIELD,
            field_names.AIR_TOXICS_CANCER_RISK_FIELD,
            field_names.RESPITORY_HAZARD_FIELD,
            field_names.DIESEL_FIELD,
            field_names.PM25_FIELD,
            field_names.OZONE_FIELD,
            field_names.TRAFFIC_FIELD,
            field_names.RMP_FIELD,
            field_names.TSDF_FIELD,
            field_names.NPL_FIELD,
            field_names.WASTEWATER_FIELD,
            field_names.LEAD_PAINT_FIELD,
            field_names.UNDER_5_FIELD,
            field_names.OVER_64_FIELD,
            field_names.LINGUISTIC_ISO_FIELD,
            field_names.HOUSEHOLDS_LINGUISTIC_ISO_FIELD,
            field_names.POVERTY_FIELD,
            field_names.HIGH_SCHOOL_ED_FIELD,
            field_names.UNEMPLOYMENT_FIELD,
            field_names.HT_INDEX_FIELD,
        ]

        non_numeric_columns = [
            self.GEOID_FIELD_NAME,
            field_names.PERSISTENT_POVERTY_FIELD,
        ]

        columns_to_keep = non_numeric_columns + numeric_columns
        df = df[columns_to_keep]

        # Convert all columns to numeric and do math
        for col in numeric_columns:
            df[col] = pd.to_numeric(df[col])
            # Calculate percentiles
            df[f"{col}{field_names.PERCENTILE_FIELD_SUFFIX}"] = df[col].rank(
                pct=True
            )

            # Min-max normalization:
            # (
            #     Observed value
            #     - minimum of all values
            # )
            # divided by
            # (
            #    Maximum of all values
            #     - minimum of all values
            # )
            min_value = df[col].min(skipna=True)

            max_value = df[col].max(skipna=True)

            logger.info(
                f"For data set {col}, the min value is {min_value} and the max value is {max_value}."
            )

            df[f"{col}{field_names.MIN_MAX_FIELD_SUFFIX}"] = (
                df[col] - min_value
            ) / (max_value - min_value)

        return df

    def transform(self) -> None:
        logger.info("Transforming Score Data")

        # prepare the df with the right CBG/tract IDs, column names/types, and percentiles
        self.df = self._prepare_initial_df()

        # calculate scores
        self.df = ScoreRunner(df=self.df).calculate_scores()

    def load(self) -> None:
        logger.info("Saving Score CSV")
        constants.DATA_SCORE_CSV_FULL_DIR.mkdir(parents=True, exist_ok=True)

        self.df.to_csv(constants.DATA_SCORE_CSV_FULL_FILE_PATH, index=False)
