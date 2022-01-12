from pathlib import Path
import json
from numpy import float64, int64
import numpy as np
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.score.etl_utils import floor_series
from data_pipeline.utils import get_module_logger, zip_files
from data_pipeline.score import field_names


from data_pipeline.etl.sources.census.etl_utils import (
    check_census_data_source,
)
from . import constants

logger = get_module_logger(__name__)


class PostScoreETL(ExtractTransformLoad):
    """
    A class used to instantiate an ETL object to retrieve and process data from
    datasets.
    """

    def __init__(self, data_source: str = None):
        self.DATA_SOURCE = data_source
        self.input_counties_df: pd.DataFrame
        self.input_states_df: pd.DataFrame
        self.input_score_df: pd.DataFrame
        self.input_national_tract_df: pd.DataFrame

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
        df = pd.read_csv(
            score_path, dtype={self.GEOID_TRACT_FIELD_NAME: "string"}
        )

        # Convert total population to an int:
        df["Total population"] = df["Total population"].astype(
            int, errors="ignore"
        )

        return df

    def _extract_national_tract(
        self, national_tract_path: Path
    ) -> pd.DataFrame:
        logger.info("Reading national tract file")
        return pd.read_csv(
            national_tract_path,
            names=[self.GEOID_TRACT_FIELD_NAME],
            dtype={self.GEOID_TRACT_FIELD_NAME: "string"},
            low_memory=False,
            header=None,
        )

    def extract(self) -> None:
        logger.info("Starting Extraction")

        # check census data
        check_census_data_source(
            census_data_path=self.DATA_PATH / "census",
            census_data_source=self.DATA_SOURCE,
        )

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
        self.input_national_tract_df = self._extract_national_tract(
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

        new_df_copy = new_df.rename(
            columns={"USPS": "State Abbreviation", "NAME": "County Name"},
            inplace=False,
        )

        return new_df_copy

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
                "state_name": field_names.STATE_FIELD,
                "state_abbreviation": "State Abbreviation",
            }
        )
        new_df.drop(["region", "division"], axis=1, inplace=True)
        return new_df

    def _transform_score(self, initial_score_df: pd.DataFrame) -> pd.DataFrame:
        """
        Add the GEOID field to the score dataframe to do the merge with counties
        """
        # add GEOID column for counties
        initial_score_df["GEOID"] = initial_score_df[
            self.GEOID_TRACT_FIELD_NAME
        ].str[:5]

        return initial_score_df

    def _create_score_data(
        self,
        national_tract_df: pd.DataFrame,
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
            county_state_merged,
            on="GEOID",  # GEOID is the county ID
            how="left",
        )

        # check if there are census tracts without score
        logger.info("Removing tract rows without score")

        # merge census tracts with score
        merged_df = national_tract_df.merge(
            score_county_state_merged,
            on=self.GEOID_TRACT_FIELD_NAME,
            how="left",
        )

        # recast population to integer
        score_county_state_merged["Total population"] = (
            merged_df["Total population"].fillna(0.0).astype(int)
        )

        # list the null score tracts
        null_tract_df = merged_df[
            merged_df[field_names.SCORE_L_COMMUNITIES].isnull()
        ]

        # subtract data sets
        # this follows the XOR pattern outlined here:
        # https://stackoverflow.com/a/37313953
        de_duplicated_df = pd.concat(
            [merged_df, null_tract_df, null_tract_df]
        ).drop_duplicates(keep=False)

        # set the score to the new df
        return de_duplicated_df

    def _create_tile_data(
        self, score_county_state_merged_df: pd.DataFrame
    ) -> pd.DataFrame:
        logger.info("Rounding Decimals")

        # grab all the keys from tiles score columns
        tiles_score_column_titles = list(constants.TILES_SCORE_COLUMNS.keys())

        # filter the columns on full score
        score_tiles = score_county_state_merged_df[
            tiles_score_column_titles
        ].copy()

        score_tiles[constants.TILES_SCORE_FLOAT_COLUMNS] = score_tiles[
            constants.TILES_SCORE_FLOAT_COLUMNS
        ].apply(
            func=lambda series: floor_series(
                series=series,
                number_of_decimals=constants.TILES_ROUND_NUM_DECIMALS,
            ),
            axis=0,
        )

        # create indexes
        score_tiles = score_tiles.rename(
            columns=constants.TILES_SCORE_COLUMNS,
            inplace=False,
        )

        # write the json map to disk
        inverse_tiles_columns = {
            v: k for k, v in constants.TILES_SCORE_COLUMNS.items()
        }  # reverse dict
        index_file_path = constants.DATA_SCORE_JSON_INDEX_FILE_PATH
        index_file_path.parent.mkdir(parents=True, exist_ok=True)
        with open(index_file_path, "w", encoding="utf-8") as fp:
            json.dump(inverse_tiles_columns, fp)

        return score_tiles

    def _create_downloadable_data(
        self, score_county_state_merged_df: pd.DataFrame
    ) -> pd.DataFrame:
        df = score_county_state_merged_df[
            constants.DOWNLOADABLE_SCORE_COLUMNS
        ].copy(deep=True)

        df_of_float_columns = df.select_dtypes(include=["float64"])

        for column in df_of_float_columns.columns:
            # TODO: create a schema for fields to make it more explicit and safe which
            #  fields are percentages.
            if any(x in column for x in constants.PERCENT_PREFIXES_SUFFIXES):
                # Convert percentages from fractions to an integer from 0 to 100.
                df[column] = pd.to_numeric(arg=
                    floor_series(
                        series=df[column] * 100,
                        number_of_decimals=0,
                    ),
                    errors="raise",
                    # Using `to_numeric` and downcast instead of `.astype(int)`
                    # because Python's `int` type does not support nulls.
                    downcast="integer",
                )
            else:
                # Round all other floats.
                df[column] = floor_series(
                    series=df[column].astype(float64),
                    number_of_decimals=constants.TILES_ROUND_NUM_DECIMALS,
                )

        return df

    def transform(self) -> None:
        logger.info("Transforming data sources for Score + County CSVs")

        transformed_counties = self._transform_counties(self.input_counties_df)
        transformed_states = self._transform_states(self.input_states_df)
        transformed_score = self._transform_score(self.input_score_df)

        output_score_county_state_merged_df = self._create_score_data(
            self.input_national_tract_df,
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
            score_csv_path,
            index=False,
            encoding="utf-8-sig",  # windows compat https://stackoverflow.com/a/43684587
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
        pdf_path = constants.SCORE_DOWNLOADABLE_PDF_FILE_PATH

        # Rename score column
        downloadable_df_copy = downloadable_df.rename(
            columns={
                field_names.SCORE_L_COMMUNITIES: "Identified as disadvantaged (v0.1)"
            },
            inplace=False,
        )

        logger.info("Writing downloadable excel")
        downloadable_df_copy.to_excel(excel_path, index=False)

        logger.info("Writing downloadable csv")
        downloadable_df_copy[self.GEOID_TRACT_FIELD_NAME] = (
            '"' + downloadable_df_copy[self.GEOID_TRACT_FIELD_NAME] + '"'
        )
        downloadable_df_copy.to_csv(csv_path, index=False)

        logger.info("Compressing files")
        files_to_compress = [csv_path, excel_path, pdf_path]
        zip_files(zip_path, files_to_compress)

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
