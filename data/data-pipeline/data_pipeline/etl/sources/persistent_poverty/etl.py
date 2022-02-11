import functools
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import (
    get_module_logger,
    unzip_file_from_url,
)

logger = get_module_logger(__name__)


class PersistentPovertyETL(ExtractTransformLoad):
    """Persistent poverty data.

    Loaded from `https://s4.ad.brown.edu/Projects/Diversity/Researcher/LTDB.htm`.

    Codebook: `https://s4.ad.brown.edu/Projects/Diversity/Researcher/LTBDDload/Dfiles/codebooks.pdf`.
    """

    def __init__(self):
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "persistent_poverty"

        # Need to change hyperlink to S3
        # self.GEOCORR_PLACES_URL = "https://justice40-data.s3.amazonaws.com/data-sources/persistent_poverty_urban_rural.csv.zip"
        self.GEOID_TRACT_INPUT_FIELD_NAME_1 = "TRTID10"
        self.GEOID_TRACT_INPUT_FIELD_NAME_2 = "tractid"
        # self.URBAN_HEURISTIC_FIELD_NAME = "Urban Heuristic Flag"

        self.POVERTY_PREFIX = "Individuals in Poverty (percent)"
        self.PERSISTENT_POVERTY_FIELD = "Persistent Poverty Census Tract"

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            f"{self.POVERTY_PREFIX} (1990)",
            f"{self.POVERTY_PREFIX} (2000)",
            f"{self.POVERTY_PREFIX} (2010)",
            self.PERSISTENT_POVERTY_FIELD,
        ]

        self.df: pd.DataFrame

    def _join_input_dfs(self, dfs: list) -> pd.DataFrame:
        df = functools.reduce(
            lambda df_a, df_b: pd.merge(
                left=df_a,
                right=df_b,
                # All data frames will now have this field for tract.
                on=self.GEOID_TRACT_FIELD_NAME,
                how="outer",
            ),
            dfs,
        )

        # Left-pad the tracts with 0s
        expected_length_of_census_tract_field = 11
        df[self.GEOID_TRACT_FIELD_NAME] = (
            df[self.GEOID_TRACT_FIELD_NAME]
            .astype(str)
            .apply(lambda x: x.zfill(expected_length_of_census_tract_field))
        )

        # Sanity check the join.
        if len(df[self.GEOID_TRACT_FIELD_NAME].str.len().unique()) != 1:
            raise ValueError(
                f"One of the input CSVs uses {self.GEOID_TRACT_FIELD_NAME} with a different length."
            )

        if len(df) > self.EXPECTED_MAX_CENSUS_TRACTS:
            raise ValueError(f"Too many rows in the join: {len(df)}")

        return df

    def extract(self) -> None:
        logger.info("Starting to download 86MB persistent poverty file.")

        unzipped_file_path = self.get_tmp_path() / "persistent_poverty"

        unzip_file_from_url(
            file_url=settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/LTDB_Std_All_Sample.zip",
            download_path=self.get_tmp_path(),
            unzipped_file_path=unzipped_file_path,
        )

        file_names = [
            "ltdb_std_1990_sample.csv",
            "ltdb_std_2000_sample.csv",
            "ltdb_std_2010_sample.csv",
        ]

        temporary_input_dfs = []

        for file_name in file_names:
            temporary_input_df = pd.read_csv(
                filepath_or_buffer=unzipped_file_path
                / f"ltdb_std_all_sample/{file_name}",
                dtype={
                    self.GEOID_TRACT_INPUT_FIELD_NAME_1: "string",
                    self.GEOID_TRACT_INPUT_FIELD_NAME_2: "string",
                },
                low_memory=False,
                encoding="latin1",
            )

            # Some CSVs have self.GEOID_TRACT_INPUT_FIELD_NAME_1 as the name of the tract field,
            # and some have self.GEOID_TRACT_INPUT_FIELD_NAME_2. Rename them both to the same tract name.
            temporary_input_df.rename(
                columns={
                    self.GEOID_TRACT_INPUT_FIELD_NAME_1: self.GEOID_TRACT_FIELD_NAME,
                    self.GEOID_TRACT_INPUT_FIELD_NAME_2: self.GEOID_TRACT_FIELD_NAME,
                },
                inplace=True,
                # Ignore errors b/c of the different field names in different CSVs.
                errors="ignore",
            )

            temporary_input_dfs.append(temporary_input_df)

        self.df = self._join_input_dfs(temporary_input_dfs)

    def transform(self) -> None:
        logger.info("Starting persistent poverty transform")
        transformed_df = self.df

        # Note: the fields are defined as following.
        # dpovXX Description: persons for whom poverty status is determined
        # npovXX Description: persons in poverty
        transformed_df[f"{self.POVERTY_PREFIX} (1990)"] = (
            transformed_df["NPOV90"] / transformed_df["DPOV90"]
        )
        transformed_df[f"{self.POVERTY_PREFIX} (2000)"] = (
            transformed_df["NPOV00"] / transformed_df["DPOV00"]
        )
        # Note: for 2010, they use ACS data ending in 2012 that has 2010 as its midpoint year.
        transformed_df[f"{self.POVERTY_PREFIX} (2010)"] = (
            transformed_df["npov12"] / transformed_df["dpov12"]
        )

        poverty_threshold = 0.2

        transformed_df[self.PERSISTENT_POVERTY_FIELD] = (
            (
                transformed_df[f"{self.POVERTY_PREFIX} (1990)"]
                >= poverty_threshold
            )
            & (
                transformed_df[f"{self.POVERTY_PREFIX} (2000)"]
                >= poverty_threshold
            )
            & (
                transformed_df[f"{self.POVERTY_PREFIX} (2010)"]
                >= poverty_threshold
            )
        )

        self.df = transformed_df

    def load(self) -> None:
        logger.info("Saving persistent poverty data.")

        # mkdir census
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
