from pathlib import Path
import json
from numpy import float64
import numpy as np
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.score.etl_utils import floor_series
from data_pipeline.utils import (
    get_module_logger,
    zip_files,
    load_yaml_dict_from_file,
    column_list_from_yaml_object_fields,
    load_dict_from_yaml_object_fields,
)
from data_pipeline.score import field_names


from data_pipeline.etl.sources.census.etl_utils import (
    check_census_data_source,
)
from . import constants

logger = get_module_logger(__name__)

# Define the DAC variable
DISADVANTAGED_COMMUNITIES_FIELD = field_names.SCORE_M_COMMUNITIES


class PostScoreETL(ExtractTransformLoad):
    """
    A class used to instantiate an ETL object to retrieve and process data from
    datasets.
    """

    STATE_CODE_COLUMN = "State Code"

    def __init__(self, data_source: str = None):
        self.DATA_SOURCE = data_source
        self.input_counties_df: pd.DataFrame
        self.input_states_df: pd.DataFrame
        self.input_score_df: pd.DataFrame
        self.input_national_tract_df: pd.DataFrame

        self.output_score_county_state_merged_df: pd.DataFrame
        self.output_score_tiles_df: pd.DataFrame
        self.output_downloadable_df: pd.DataFrame

        # Define some constants for the YAML file
        # TODO: Implement this as a marshmallow schema.
        # TODO: Ticket: https://github.com/usds/justice40-tool/issues/1327
        self.yaml_fields_type_percentage_label = "percentage"
        self.yaml_fields_type_loss_rate_percentage_label = (
            "loss_rate_percentage"
        )
        self.yaml_fields_type_float_label = "float"
        self.yaml_fields_type_string_label = "string"
        self.yaml_fields_type_boolean_label = "bool"
        self.yaml_fields_type_integer_label = "int64"
        self.yaml_excel_sheet_label = "label"
        self.yaml_global_config_rounding_num = "rounding_num"
        self.yaml_global_config_rounding_num_float = "float"
        self.yaml_global_config_sort_by_label = "sort_by_label"
        # End YAML definition constants

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
            state_path,
            dtype={"fips": "string", "state_abbreviation": "string"},
            usecols=["fips", "state_name", "state_abbreviation"],
        )

    def _extract_score(self, score_path: Path) -> pd.DataFrame:
        logger.info("Reading Score CSV")
        df = pd.read_csv(
            score_path, dtype={self.GEOID_TRACT_FIELD_NAME: "string"}
        )

        # Convert total population to an int
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
                "fips": self.STATE_CODE_COLUMN,
                "state_name": field_names.STATE_FIELD,
                "state_abbreviation": "State Abbreviation",
            }
        )
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

        logger.info("Merging county info with score info")
        score_county_merged = score_df.merge(
            # We drop state abbreviation so we don't get it twice
            counties_df[["GEOID", "County Name"]],
            on="GEOID",  # GEOID is the county ID
            how="left",
        )

        logger.info("Merging state info with county-score info")
        # Here, we need to join on a separate key, since there's no
        # entry for the island areas in the counties df (there are no
        # counties!) Thus, unless we join state separately from county,
        # when we join on GEOID, we lose information about the islands
        score_county_merged[self.STATE_CODE_COLUMN] = score_county_merged[
            self.GEOID_TRACT_FIELD_NAME
        ].str[:2]
        # TODO: For future reference, we could also refactor this code so that
        # the FIPS / State or Territory / County info gets created as an ETL
        # process and joined in etl_score, rather than added in post like this.
        # That would be a bit more consistent and automatically parallelized
        score_county_state_merged = score_county_merged.merge(
            states_df,
            left_on=self.STATE_CODE_COLUMN,
            right_on=self.STATE_CODE_COLUMN,
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
            merged_df["Total population"].fillna(0).astype(int)
        )

        de_duplicated_df = merged_df.dropna(
            subset=[DISADVANTAGED_COMMUNITIES_FIELD]
        )

        # set the score to the new df
        return de_duplicated_df

    def _create_tile_data(
        self,
        score_county_state_merged_df: pd.DataFrame,
    ) -> pd.DataFrame:

        logger.info("Rounding Decimals")
        # grab all the keys from tiles score columns
        tiles_score_column_titles = list(constants.TILES_SCORE_COLUMNS.keys())

        # filter the columns on full score
        score_tiles = score_county_state_merged_df[
            tiles_score_column_titles
        ].copy()

        # Currently, we do not want USVI or Guam on the map, so this will drop all
        # rows with the FIPS codes (first two digits of the census tract)
        logger.info(
            f"Dropping specified FIPS codes from tile data: {constants.DROP_FIPS_CODES}"
        )
        tracts_to_drop = []
        for fips_code in constants.DROP_FIPS_CODES:
            tracts_to_drop += score_tiles[
                score_tiles[field_names.GEOID_TRACT_FIELD].str.startswith(
                    fips_code
                )
            ][field_names.GEOID_TRACT_FIELD].to_list()
        score_tiles = score_tiles[
            ~score_tiles[field_names.GEOID_TRACT_FIELD].isin(tracts_to_drop)
        ]

        score_tiles[constants.TILES_SCORE_FLOAT_COLUMNS] = score_tiles[
            constants.TILES_SCORE_FLOAT_COLUMNS
        ].apply(
            func=lambda series: floor_series(
                series=series,
                number_of_decimals=constants.TILES_ROUND_NUM_DECIMALS,
            ),
            axis=0,
        )

        logger.info("Adding fields for island areas and Puerto Rico")
        # The below operation constructs variables for the front end.
        # Since the Island Areas, Puerto Rico, and the nation all have a different
        # set of available data, each has its own user experience.

        # First, we identify which user experience -- Puerto Rico, islands, or nation --
        # a row pertains to using the FIPS codes
        fips_code_series = score_tiles[field_names.GEOID_TRACT_FIELD].str[:2]
        score_tiles[constants.USER_INTERFACE_EXPERIENCE_FIELD_NAME] = np.where(
            fips_code_series.isin(constants.TILES_PUERTO_RICO_FIPS_CODE),
            constants.PUERTO_RICO_USER_EXPERIENCE,
            np.where(
                fips_code_series.isin(constants.TILES_ISLAND_AREA_FIPS_CODES),
                constants.ISLAND_AREAS_USER_EXPERIENCE,
                constants.NATION_USER_EXPERIENCE,
            ),
        )

        # Next, we determine how many thresholds the front end should show, entirely
        # based on the variable for user interface experience.
        score_tiles[constants.THRESHOLD_COUNT_TO_SHOW_FIELD_NAME] = score_tiles[
            constants.USER_INTERFACE_EXPERIENCE_FIELD_NAME
        ].map(
            {
                constants.PUERTO_RICO_USER_EXPERIENCE: constants.TILES_PUERTO_RICO_THRESHOLD_COUNT,
                constants.ISLAND_AREAS_USER_EXPERIENCE: constants.TILES_ISLAND_AREAS_THRESHOLD_COUNT,
                constants.NATION_USER_EXPERIENCE: constants.TILES_NATION_THRESHOLD_COUNT,
            }
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
        self, score_df: pd.DataFrame, fields_object: dict, config_object: dict
    ) -> pd.DataFrame:

        df = score_df[
            column_list_from_yaml_object_fields(
                yaml_object=fields_object,
                target_field="score_name",
            )
        ].copy(deep=True)

        column_type_dict = load_dict_from_yaml_object_fields(
            yaml_object=fields_object,
            object_key="score_name",
            object_value="format",
        )

        for column in df.columns:
            if (
                column_type_dict[column]
                == self.yaml_fields_type_percentage_label
            ):
                # Convert percentages from fractions between 0 and 1 to an integer
                # from 0 to 100.
                df_100 = df[column] * 100
                df_int = np.floor(
                    pd.to_numeric(df_100, errors="coerce")
                ).astype("Int64")
                df[column] = df_int

            elif (
                column_type_dict[column]
                == self.yaml_fields_type_loss_rate_percentage_label
            ):
                # Convert loss rates by multiplying by 100 (they are percents)
                # and then rounding appropriately.
                df_100 = df[column] * 100
                df[column] = floor_series(
                    series=df_100.astype(float64),
                    number_of_decimals=config_object[
                        self.yaml_global_config_rounding_num
                    ][self.yaml_fields_type_loss_rate_percentage_label],
                )

            elif column_type_dict[column] == self.yaml_fields_type_float_label:
                # Round the floats.
                df[column] = floor_series(
                    series=df[column].astype(float64),
                    number_of_decimals=config_object[
                        self.yaml_global_config_rounding_num
                    ][self.yaml_global_config_rounding_num_float],
                )

            elif column_type_dict[column] == self.yaml_fields_type_string_label:
                pass

            elif (
                column_type_dict[column] == self.yaml_fields_type_boolean_label
            ):
                pass

            elif (
                column_type_dict[column] == self.yaml_fields_type_integer_label
            ):
                pass

            else:
                raise ValueError(
                    f"Unrecognized type: `{column_type_dict[column]}`"
                )

        # rename fields
        column_rename_dict = load_dict_from_yaml_object_fields(
            yaml_object=fields_object,
            object_key="score_name",
            object_value="label",
        )
        renamed_df = df.rename(
            columns=column_rename_dict,
            inplace=False,
        )

        # sort if needed
        if config_object.get(self.yaml_global_config_sort_by_label):
            final_df = renamed_df.sort_values(
                config_object[self.yaml_global_config_sort_by_label]
            )
        else:
            final_df = renamed_df

        return final_df

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
        self.output_score_county_state_merged_df = (
            output_score_county_state_merged_df
        )

    def _load_score_csv_full(
        self, score_county_state_merged: pd.DataFrame, score_csv_path: Path
    ) -> None:
        logger.info("Saving Full Score CSV with County Information")
        score_csv_path.parent.mkdir(parents=True, exist_ok=True)
        score_county_state_merged.to_csv(
            score_csv_path,
            index=False,
            encoding="utf-8-sig",  # windows compat https://stackoverflow.com/a/43684587
        )

    def _load_excel_from_df(
        self, excel_df: pd.DataFrame, excel_path: Path
    ) -> None:

        # open excel yaml config
        excel_csv_config = load_yaml_dict_from_file(
            self.CONTENT_CONFIG / "excel.yml"
        )

        # Define Excel Columns Column Width
        num_excel_cols_width = excel_csv_config["global_config"][
            "excel_config"
        ]["default_column_width"]

        # Create a Pandas Excel writer using XlsxWriter as the engine.
        with pd.ExcelWriter(  # pylint: disable=abstract-class-instantiated
            # (https://github.com/PyCQA/pylint/issues/3060)
            excel_path,
            engine="xlsxwriter",
        ) as writer:

            for sheet in excel_csv_config["sheets"]:
                excel_df = self._create_downloadable_data(
                    score_df=self.output_score_county_state_merged_df,
                    fields_object=sheet["fields"],
                    config_object=excel_csv_config["global_config"],
                )
                # Convert the dataframe to an XlsxWriter Excel object. We also turn off the
                # index column at the left of the output dataframe.
                excel_df.to_excel(
                    writer,
                    sheet_name=sheet[self.yaml_excel_sheet_label],
                    index=False,
                )

                # Get the xlsxwriter workbook and worksheet objects.
                workbook = writer.book
                worksheet = writer.sheets[sheet[self.yaml_excel_sheet_label]]

                # set header format
                header_format = workbook.add_format(
                    {"bold": True, "text_wrap": True, "valign": "bottom"}
                )

                # write headers
                for col_num, value in enumerate(excel_df.columns.array):
                    worksheet.write(0, col_num, value, header_format)

                num_cols = len(excel_df.columns)
                worksheet.set_column(0, num_cols - 1, num_excel_cols_width)

            writer.save()

    def _load_tile_csv(
        self, score_tiles_df: pd.DataFrame, tile_score_path: Path
    ) -> None:
        logger.info("Saving Tile Score CSV")
        tile_score_path.parent.mkdir(parents=True, exist_ok=True)
        score_tiles_df.to_csv(tile_score_path, index=False, encoding="utf-8")

    def _load_downloadable_zip(self, downloadable_info_path: Path) -> None:
        logger.info("Saving Downloadable CSV")

        downloadable_info_path.mkdir(parents=True, exist_ok=True)
        csv_path = constants.SCORE_DOWNLOADABLE_CSV_FILE_PATH
        excel_path = constants.SCORE_DOWNLOADABLE_EXCEL_FILE_PATH
        zip_path = constants.SCORE_DOWNLOADABLE_ZIP_FILE_PATH
        # TODO: reinstate when PDF is added back
        # pdf_path = constants.SCORE_DOWNLOADABLE_PDF_FILE_PATH

        logger.info("Writing downloadable excel")
        self._load_excel_from_df(
            excel_df=self.output_score_county_state_merged_df,
            excel_path=excel_path,
        )

        logger.info("Writing downloadable csv")
        # open yaml config
        downloadable_csv_config = load_yaml_dict_from_file(
            self.CONTENT_CONFIG / "csv.yml"
        )
        downloadable_df = self._create_downloadable_data(
            score_df=self.output_score_county_state_merged_df,
            fields_object=downloadable_csv_config["fields"],
            config_object=downloadable_csv_config["global_config"],
        )
        downloadable_df.to_csv(csv_path, index=False)

        logger.info("Compressing files")
        files_to_compress = [
            csv_path,
            excel_path,
        ]  # add pdf_path here to include PDF
        zip_files(zip_path, files_to_compress)

    def load(self) -> None:
        self._load_score_csv_full(
            self.output_score_county_state_merged_df,
            constants.FULL_SCORE_CSV_FULL_PLUS_COUNTIES_FILE_PATH,
        )
        self._load_tile_csv(
            self.output_score_tiles_df, constants.DATA_SCORE_CSV_TILES_FILE_PATH
        )
        self._load_downloadable_zip(constants.SCORE_DOWNLOADABLE_DIR)
