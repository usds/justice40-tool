import pandas as pd
import numpy as np

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names

logger = get_module_logger(__name__)


class CDCSVIIndex(ExtractTransformLoad):
    """CDC SVI Index class ingests 2018 dataset located
    here: https://www.atsdr.cdc.gov/placeandhealth/svi/index.html
    Please see the README in this module for further details.
    """

    def __init__(self):
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "cdc_svi_index"

        self.CDC_SVI_INDEX_URL = "https://svi.cdc.gov/Documents/Data/2018_SVI_Data/CSV/SVI2018_US.csv"

        self.CDC_RPL_THEMES_THRESHOLD = 0.90

        self.CDC_SVI_INDEX_TRACTS_FIPS_CODE = "FIPS"

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.CDC_SVI_INDEX_SE_THEME_FIELD
            + field_names.PERCENTILE_FIELD_SUFFIX,  # SE prefix references "socioeconomic"
            field_names.CDC_SVI_INDEX_HOUSEHOLD_THEME_COMPOSITION_FIELD
            + field_names.PERCENTILE_FIELD_SUFFIX,
            field_names.CDC_SVI_INDEX_LANGUAGE_THEME_FIELD
            + field_names.PERCENTILE_FIELD_SUFFIX,
            field_names.CDC_SVI_INDEX_HOUSING_TRANSPORTATION_FIELD
            + field_names.PERCENTILE_FIELD_SUFFIX,
            field_names.CDC_SVI_INDEX_RPL_THEMES_OVERALL_FIELD
            + field_names.PERCENTILE_FIELD_SUFFIX,
            # Derived columns
            field_names.CDC_SVI_INDEX_THEMES_PRIORITY_COMMUNITY,
        ]

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading 43 MB CDC SVI INDEX")
        self.df = pd.read_csv(
            filepath_or_buffer=self.CDC_SVI_INDEX_URL,
            dtype={self.CDC_SVI_INDEX_TRACTS_FIPS_CODE: "string"},
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Starting CDC SVI INDEX transform")
        # Note: In this dataset all US census tracts are ranked against one another.
        # Puerto Rico is not included in this dataset
        self.df.rename(
            columns={
                self.CDC_SVI_INDEX_TRACTS_FIPS_CODE: self.GEOID_TRACT_FIELD_NAME,
                "RPL_THEME1": field_names.CDC_SVI_INDEX_SE_THEME_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX,
                "RPL_THEME2": field_names.CDC_SVI_INDEX_HOUSEHOLD_THEME_COMPOSITION_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX,
                "RPL_THEME3": field_names.CDC_SVI_INDEX_LANGUAGE_THEME_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX,
                "RPL_THEME4": field_names.CDC_SVI_INDEX_HOUSING_TRANSPORTATION_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX,
                "RPL_THEMES": field_names.CDC_SVI_INDEX_RPL_THEMES_OVERALL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX,
            },
            inplace=True,
            errors="raise",
        )

        # From page 2 in the documentation:
        # Tracts with zero estimates for total population (N = 645 for the U.S.) were removed during the ranking
        # process. These tracts were added back to the SVI databases after ranking. The TOTPOP field value is 0,
        # but the percentile ranking fields (RPL_THEME1, RPL_THEME2, RPL_THEME3, RPL_THEME4, and
        # RPL_THEMES) were set to -999.
        # ▪ For tracts with > 0 TOTPOP, a value of -999 in any field either means the value was unavailable from the
        # original census data or we could not calculate a derived value because of unavailable census data.
        # ▪ Any cells with a -999 were not used for further calculations. For example, total flags do not include fields
        # with a -999 value.
        self.df = self.df.replace(-999, np.nan)

        #  At or above 90 for percentile rank
        self.df[field_names.CDC_SVI_INDEX_THEMES_PRIORITY_COMMUNITY] = (
            self.df[
                field_names.CDC_SVI_INDEX_RPL_THEMES_OVERALL_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= self.CDC_RPL_THEMES_THRESHOLD
        )
        expected_census_tract_field_length = 11
        self.df[self.GEOID_TRACT_FIELD_NAME] = (
            self.df[self.GEOID_TRACT_FIELD_NAME]
            .astype(str)
            .apply(lambda x: x.zfill(expected_census_tract_field_length))
        )

        if len(self.df[self.GEOID_TRACT_FIELD_NAME].str.len().unique()) != 1:
            raise ValueError(
                f"GEOID Tract must be length of {expected_census_tract_field_length}"
            )

    def load(self) -> None:
        logger.info("Saving CDC SVI Index Data")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
