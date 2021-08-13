import json
import zipfile
from pathlib import Path

import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, get_zip_info

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
        self.CENSUS_COUNTIES_ZIP_URL = "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/Gaz_counties_national.zip"
        self.CENSUS_COUNTIES_TXT = self.TMP_PATH / "Gaz_counties_national.txt"
        self.CENSUS_COUNTIES_COLS = ["USPS", "GEOID", "NAME"]
        self.CENSUS_USA_CSV = self.DATA_PATH / "census" / "csv" / "us.csv"
        self.SCORE_CSV_PATH = self.DATA_PATH / "score" / "csv"
        self.DOWNLOADABLE_INFO_PATH = self.DATA_PATH / "score" / "downloadable"

        self.STATE_CSV = self.DATA_PATH / "census" / "csv" / "fips_states_2010.csv"

        self.FULL_SCORE_CSV = self.SCORE_CSV_PATH / "full" / "usa.csv"
        self.FULL_SCORE_CSV_PLUS_COUNTIES = (
            self.SCORE_CSV_PATH / "full" / "usa_counties.csv"
        )

        self.TILES_SCORE_COLUMNS = [
            "GEOID10",
            "State Name",
            "County Name",
            "Total population",
            "Score E (percentile)",
            "Score E (top 25th percentile)",
            "Poverty (Less than 200% of federal poverty line) (percentile)",
            "Percent individuals age 25 or over with less than high school degree (percentile)",
            "Linguistic isolation (percent) (percentile)",
            "Unemployed civilians (percent) (percentile)",
            "Housing burden (percent) (percentile)",
        ]
        self.TILES_SCORE_CSV_PATH = self.SCORE_CSV_PATH / "tiles"
        self.TILES_SCORE_CSV = self.TILES_SCORE_CSV_PATH / "usa.csv"

        # columns to round floats to 2 decimals
        self.TILES_SCORE_FLOAT_COLUMNS = [
            "Score E (percentile)",
            "Score E (top 25th percentile)",
            "Poverty (Less than 200% of federal poverty line)",
            "Percent individuals age 25 or over with less than high school degree",
            "Linguistic isolation (percent)",
            "Unemployed civilians (percent)",
            "Housing burden (percent)",
        ]
        self.TILES_ROUND_NUM_DECIMALS = 2

        self.DOWNLOADABLE_SCORE_INDICATORS_BASIC = [
            "Percent individuals age 25 or over with less than high school degree",
            "Linguistic isolation (percent)",
            "Poverty (Less than 200% of federal poverty line)",
            "Unemployed civilians (percent)",
            "Housing burden (percent)",
            "Respiratory hazard index",
            "Diesel particulate matter",
            "Particulate matter (PM2.5)",
            "Traffic proximity and volume",
            "Proximity to RMP sites",
            "Wastewater discharge",
            "Percent pre-1960s housing (lead paint indicator)",
            "Total population",
        ]

        # For every indicator above, we want to include percentile and min-max normalized variants also
        self.DOWNLOADABLE_SCORE_INDICATORS_FULL = list(
            pd.core.common.flatten(
                [
                    [p, f"{p} (percentile)", f"{p} (min-max normalized)"]
                    for p in self.DOWNLOADABLE_SCORE_INDICATORS_BASIC
                ]
            )
        )

        # Finally we augment with the GEOID10, county, and state
        self.DOWNLOADABLE_SCORE_COLUMNS = [
            "GEOID10",
            "County Name",
            "State Name",
            *self.DOWNLOADABLE_SCORE_INDICATORS_FULL,
        ]
        self.DOWNLOADABLE_SCORE_CSV = self.DOWNLOADABLE_INFO_PATH / "usa.csv"
        self.DOWNLOADABLE_SCORE_EXCEL = self.DOWNLOADABLE_INFO_PATH / "usa.xlsx"
        self.DOWNLOADABLE_SCORE_ZIP = (
            self.DOWNLOADABLE_INFO_PATH / "Screening Tool Data.zip"
        )

        self.counties_df: pd.DataFrame
        self.states_df: pd.DataFrame
        self.score_df: pd.DataFrame
        self.score_county_state_merged: pd.DataFrame
        self.score_for_tiles: pd.DataFrame

    def extract(self) -> None:
        super().extract(
            self.CENSUS_COUNTIES_ZIP_URL,
            self.TMP_PATH,
        )

        logger.info("Reading Counties CSV")
        self.counties_df = pd.read_csv(
            self.CENSUS_COUNTIES_TXT,
            sep="\t",
            dtype={
                "GEOID": "string",
                "USPS": "string",
            },
            low_memory=False,
            encoding="latin-1",
        )

        logger.info("Reading States CSV")
        self.states_df = pd.read_csv(
            self.STATE_CSV, dtype={"fips": "string", "state_code": "string"}
        )
        self.score_df = pd.read_csv(
            self.FULL_SCORE_CSV,
            dtype={"GEOID10": "string", "Total population": "int64"},
        )

    def transform(self) -> None:
        logger.info("Transforming data sources for Score + County CSV")

        # rename some of the columns to prepare for merge
        self.counties_df = self.counties_df[["USPS", "GEOID", "NAME"]]
        self.counties_df.rename(
            columns={"USPS": "State Abbreviation", "NAME": "County Name"},
            inplace=True,
        )

        # remove unnecessary columns
        self.states_df.rename(
            columns={
                "fips": "State Code",
                "state_name": "State Name",
                "state_abbreviation": "State Abbreviation",
            },
            inplace=True,
        )
        self.states_df.drop(["region", "division"], axis=1, inplace=True)

        # add the tract level column
        self.score_df["GEOID"] = self.score_df.GEOID10.str[:5]

        # merge state with counties
        county_state_merged = self.counties_df.merge(
            self.states_df, on="State Abbreviation", how="left"
        )

        # merge state + county with score
        self.score_county_state_merged = self.score_df.merge(
            county_state_merged, on="GEOID", how="left"
        )

        # check if there are census cbgs without score
        logger.info("Removing CBG rows without score")

        ## load cbgs
        cbg_usa_df = pd.read_csv(
            self.CENSUS_USA_CSV,
            names=["GEOID10"],
            dtype={"GEOID10": "string"},
            low_memory=False,
            header=None,
        )

        # merge census cbgs with score
        merged_df = cbg_usa_df.merge(
            self.score_county_state_merged,
            on="GEOID10",
            how="left",
        )

        # recast population to integer
        merged_df["Total population"] = (
            merged_df["Total population"].fillna(0.0).astype(int)
        )

        # list the null score cbgs
        null_cbg_df = merged_df[merged_df["Score E (percentile)"].isnull()]

        # subsctract data sets
        # this follows the XOR pattern outlined here:
        # https://stackoverflow.com/a/37313953
        removed_df = pd.concat([merged_df, null_cbg_df, null_cbg_df]).drop_duplicates(
            keep=False
        )

        # set the score to the new df
        self.score_county_state_merged = removed_df

    def _save_full_csv(self):
        logger.info("Saving Full Score CSV with County Information")
        self.SCORE_CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.score_county_state_merged.to_csv(
            self.FULL_SCORE_CSV_PLUS_COUNTIES, index=False
        )

    def _save_tile_csv(self):
        logger.info("Saving Tile Score CSV")
        score_tiles = self.score_county_state_merged[self.TILES_SCORE_COLUMNS]

        decimals = pd.Series(
            [self.TILES_ROUND_NUM_DECIMALS] * len(self.TILES_SCORE_FLOAT_COLUMNS),
            index=self.TILES_SCORE_FLOAT_COLUMNS,
        )
        score_tiles = score_tiles.round(decimals)

        self.TILES_SCORE_CSV_PATH.mkdir(parents=True, exist_ok=True)
        score_tiles.to_csv(self.TILES_SCORE_CSV, index=False)

    def _save_downloadable_zip(self):
        logger.info("Saving Downloadable CSV")
        logger.info(list(self.score_county_state_merged.columns))
        logger.info(self.DOWNLOADABLE_SCORE_COLUMNS)
        downloadable_tiles = self.score_county_state_merged[
            self.DOWNLOADABLE_SCORE_COLUMNS
        ]
        self.DOWNLOADABLE_INFO_PATH.mkdir(parents=True, exist_ok=True)

        logger.info("Writing downloadable csv")
        downloadable_tiles.to_csv(self.DOWNLOADABLE_SCORE_CSV, index=False)

        logger.info("Writing downloadable excel")
        downloadable_tiles.to_excel(self.DOWNLOADABLE_SCORE_EXCEL, index=False)

        logger.info("Compressing files")
        files_to_compress = [
            self.DOWNLOADABLE_SCORE_CSV,
            self.DOWNLOADABLE_SCORE_EXCEL,
        ]
        with zipfile.ZipFile(self.DOWNLOADABLE_SCORE_ZIP, "w") as zf:
            for f in files_to_compress:
                zf.write(f, arcname=Path(f).name, compress_type=compression)
        zip_info = get_zip_info(self.DOWNLOADABLE_SCORE_ZIP)
        logger.info(json.dumps(zip_info, indent=4, sort_keys=True, default=str))

    def load(self) -> None:
        self._save_full_csv()
        self._save_tile_csv()
        self._save_downloadable_zip()
