import json
import zipfile
from pathlib import Path

import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, get_zip_info

from . import constants

## zlib is not available on all systems
try:
    import zlib  # noqa # pylint: disable=unused-import

    compression = zipfile.ZIP_DEFLATED
except (ImportError, AttributeError):
    compression = zipfile.ZIP_STORED


logger = get_module_logger(__name__)


class PostScoreETL(ExtractTransformLoad):
    """
    A class used to instantiate an ETL object to retrieve and process data from
    datasets.
    """

    def __init__(self):
        self.input_counties_df: pd.DataFrame
        self.input_states_df: pd.DataFrame
        self.input_score_df: pd.DataFrame
        self.input_national_cbg_df: pd.DataFrame

        self.output_score_county_state_merged_df: pd.DataFrame
        self.output_score_tiles_df: pd.DataFrame
        self.output_downloadable_df: pd.DataFrame

    def _extract_counties(self, county_path: Path) -> pd.DataFrame:
        logger.info("Reading Counties CSV")
        return pd.read_csv(
            county_path,
            sep="\t",
            dtype={
                "GEOID": "string",
                "USPS": "string",
            },
            low_memory=False,
            encoding="latin-1",
        )

    def _extract_states(self, state_path: Path) -> pd.DataFrame:
        logger.info("Reading States CSV")
        return pd.read_csv(
            state_path, dtype={"fips": "string", "state_abbreviation": "string"}
        )

    def _extract_score(self, score_path: Path) -> pd.DataFrame:
        logger.info("Reading Score CSV")
        df = pd.read_csv(score_path, dtype={"GEOID10": "string"})

        # Convert total population to an int:
        df["Total population"] = df["Total population"].astype(
            int, errors="ignore"
        )

        return df

    def _extract_national_cbg(self, national_cbg_path: Path) -> pd.DataFrame:
        logger.info("Reading national CBG")
        return pd.read_csv(
            national_cbg_path,
            names=["GEOID10"],
            dtype={"GEOID10": "string"},
            low_memory=False,
            header=None,
        )

    def extract(self) -> None:
        logger.info("Starting Extraction")
        super().extract(
            constants.CENSUS_COUNTIES_ZIP_URL,
            constants.TMP_PATH,
        )
        self.input_counties_df = self._extract_counties(
            constants.CENSUS_COUNTIES_FILE_NAME
        )
        self.input_states_df = self._extract_states(
            constants.DATA_CENSUS_CSV_STATE_FILE_PATH
        )
        self.input_score_df = self._extract_score(
            constants.DATA_SCORE_CSV_FULL_FILE_PATH
        )
        self.input_national_cbg_df = self._extract_national_cbg(
            constants.DATA_CENSUS_CSV_FILE_PATH
        )

    def _transform_counties(
        self, initial_counties_df: pd.DataFrame
    ) -> pd.DataFrame:
        """
        Necessary modifications to the counties dataframe
        """
        # Rename some of the columns to prepare for merge
        new_df = initial_counties_df[constants.CENSUS_COUNTIES_COLUMNS]
        new_df.rename(
            columns={"USPS": "State Abbreviation", "NAME": "County Name"},
            inplace=True,
        )
        return new_df

    def _transform_states(
        self, initial_states_df: pd.DataFrame
    ) -> pd.DataFrame:
        """
        Necessary modifications to the states dataframe
        """
        # remove unnecessary columns
        new_df = initial_states_df.rename(
            columns={
                "fips": "State Code",
                "state_name": "State Name",
                "state_abbreviation": "State Abbreviation",
            }
        )
        new_df.drop(["region", "division"], axis=1, inplace=True)
        return new_df

    def _transform_score(self, initial_score_df: pd.DataFrame) -> pd.DataFrame:
        """
        Necessary modifications to the score dataframe
        """
        # Add the tract level column
        new_df = initial_score_df.copy()
        new_df["GEOID"] = initial_score_df.GEOID10.str[:5]
        return new_df

    def _create_score_data(
        self,
        national_cbg_df: pd.DataFrame,
        counties_df: pd.DataFrame,
        states_df: pd.DataFrame,
        score_df: pd.DataFrame,
    ) -> pd.DataFrame:

        # merge state with counties
        logger.info("Merging state with county info")
        county_state_merged = counties_df.merge(
            states_df, on="State Abbreviation", how="left"
        )

        # merge state + county with score
        score_county_state_merged = score_df.merge(
            county_state_merged, on="GEOID", how="left"
        )

        # check if there are census cbgs without score
        logger.info("Removing CBG rows without score")

        # merge census cbgs with score
        merged_df = national_cbg_df.merge(
            score_county_state_merged, on="GEOID10", how="left"
        )

        # recast population to integer
        score_county_state_merged["Total population"] = (
            merged_df["Total population"].fillna(0.0).astype(int)
        )

        # list the null score cbgs
        null_cbg_df = merged_df[merged_df["Score E (percentile)"].isnull()]

        # subtract data sets
        # this follows the XOR pattern outlined here:
        # https://stackoverflow.com/a/37313953
        de_duplicated_df = pd.concat(
            [merged_df, null_cbg_df, null_cbg_df]
        ).drop_duplicates(keep=False)

        # set the score to the new df
        return de_duplicated_df

    def _create_tile_data(
        self, score_county_state_merged_df: pd.DataFrame
    ) -> pd.DataFrame:
        logger.info("Rounding Decimals")
        score_tiles = score_county_state_merged_df[
            constants.TILES_SCORE_COLUMNS
        ]
        decimals = pd.Series(
            [constants.TILES_ROUND_NUM_DECIMALS]
            * len(constants.TILES_SCORE_FLOAT_COLUMNS),
            index=constants.TILES_SCORE_FLOAT_COLUMNS,
        )

        return score_tiles.round(decimals)

    def _create_downloadable_data(
        self, score_county_state_merged_df: pd.DataFrame
    ) -> pd.DataFrame:
        return score_county_state_merged_df[
            constants.DOWNLOADABLE_SCORE_COLUMNS
        ]

    def transform(self) -> None:
        logger.info("Transforming data sources for Score + County CSVs")

        transformed_counties = self._transform_counties(self.input_counties_df)
        transformed_states = self._transform_states(self.input_states_df)
        transformed_score = self._transform_score(self.input_score_df)

        output_score_county_state_merged_df = self._create_score_data(
            self.input_national_cbg_df,
            transformed_counties,
            transformed_states,
            transformed_score,
        )
        self.output_score_tiles_df = self._create_tile_data(
            output_score_county_state_merged_df
        )
        self.output_downloadable_df = self._create_downloadable_data(
            output_score_county_state_merged_df
        )
        self.output_score_county_state_merged_df = (
            output_score_county_state_merged_df
        )

    def _load_score_csv(
        self, score_county_state_merged: pd.DataFrame, score_csv_path: Path
    ) -> None:
        logger.info("Saving Full Score CSV with County Information")
        score_csv_path.parent.mkdir(parents=True, exist_ok=True)
        score_county_state_merged.to_csv(
            score_csv_path, index=False, encoding="utf-8"
        )

    def _load_tile_csv(
        self, score_tiles_df: pd.DataFrame, tile_score_path: Path
    ) -> None:
        logger.info("Saving Tile Score CSV")
        tile_score_path.parent.mkdir(parents=True, exist_ok=True)
        score_tiles_df.to_csv(tile_score_path, index=False, encoding="utf-8")

    def _load_downloadable_zip(
        self, downloadable_df: pd.DataFrame, downloadable_info_path: Path
    ) -> None:
        logger.info("Saving Downloadable CSV")

        downloadable_info_path.mkdir(parents=True, exist_ok=True)
        csv_path = constants.SCORE_DOWNLOADABLE_CSV_FILE_PATH
        excel_path = constants.SCORE_DOWNLOADABLE_EXCEL_FILE_PATH
        zip_path = constants.SCORE_DOWNLOADABLE_ZIP_FILE_PATH

        logger.info("Writing downloadable csv")
        downloadable_df.to_csv(csv_path, index=False)

        logger.info("Writing downloadable excel")
        downloadable_df.to_excel(excel_path, index=False)

        logger.info("Compressing files")
        files_to_compress = [csv_path, excel_path]
        with zipfile.ZipFile(zip_path, "w") as zf:
            for f in files_to_compress:
                zf.write(f, arcname=Path(f).name, compress_type=compression)
        zip_info = get_zip_info(zip_path)
        logger.info(json.dumps(zip_info, indent=4, sort_keys=True, default=str))

    def load(self) -> None:
        self._load_score_csv(
            self.output_score_county_state_merged_df,
            constants.FULL_SCORE_CSV_FULL_PLUS_COUNTIES_FILE_PATH,
        )
        self._load_tile_csv(
            self.output_score_tiles_df, constants.DATA_SCORE_CSV_TILES_FILE_PATH
        )
        self._load_downloadable_zip(
            self.output_downloadable_df, constants.SCORE_DOWNLOADABLE_DIR
        )
