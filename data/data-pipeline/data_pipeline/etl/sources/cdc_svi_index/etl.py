import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names
from data_pipeline.config import settings


logger = get_module_logger(__name__)


class CDCSVIINDEX(ExtractTransformLoad):
    """CDC SVI Index class ingests 2018 dataset located
    here: https://www.atsdr.cdc.gov/placeandhealth/svi/index.html
    Please see the README in this module for further details.
    """

    def __init__(self):
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "cdc_svi_index"

        self.CDC_SVI_INDEX_S3_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/SVI2018_US.zip"
        )

        self.CDC_RPL_THEMES_THRSHOLD = 0.90

        self.CDC_SVI_INDEX_ZIP_FILE_DIR = self.TMP_PATH / "cdc_svi_index"

        self.CDC_SVI_INDEX_TRACTS_FIPS_CODE = "FIPS"

        self.COVARIATE_COLUMNS = [
            "AREA_SQMI",  # Tract area in square miles
            "E_TOTPOP",  # Population estimate, 2014-2018 ACS S0601_C01_001 E
            "E_HU",  # Housing units estimate, DP04_0001E
            "E_HH",  # Households estimate, DP02_0001E
            # E_PCI has fewer rows than other variables - joined to Census 2016 tracts. Contains null cells (i.e. -999).
            "E_PCI",  # Per capita income estimate, 2014-2018 ACS, B19301_001E
            "E_AGE65",  # Persons aged 65 and older estimate, 2014-2018 ACS, S0101_C01_030 E
            "E_DISABL",  # Civilian noninstitutionalized population with a disability estimate, 2014 -2018 ACS, DP02_0071E
            "E_SNGPNT",  # Single parent household with children under 18 estimate MOE, 2014 -2018 ACS, (DP02_0007E + DP02_0009E)
            "E_CROWD",  # At household level (occupied housing units), more people than rooms estimate for 2014 -2018 ACS, (DP04_0078E + DP04_0079E)
        ]

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.CDC_SVI_INDEX_SE_THEME_PERCENTILE_FIELD,  # SE prefix references "socioeconomic"
            field_names.CDC_SVI_INDEX_HOUSEHOLD_THEME_PERCENTILE_COMPOSITION_FIELD,
            field_names.CDC_SVI_INDEX_LANGUAGE_THEME_PERCENTILE_FIELD,
            field_names.CDC_SVI_INDEX_HOUSING_TRANSPORTATION_PERCENTILE_FIELD,
            field_names.CDC_RPL_THEMES_OVERALL_PERCENTILE_FIELD,
            # Sum of series fields
            field_names.CDC_SVI_INDEX_SE_THEME_SOS_FIELD,
            field_names.CDC_SVI_INDEX_HOUSEHOLD_THEME_SOS_FIELD,
            field_names.CDC_SVI_INDEX_LANGUAGE_THEME_SOS_FIELD,
            field_names.CDC_SVI_INDEX_HOUSING_TRANSPORTATION_SOS_FIELD,
            field_names.CDC_SVI_INDEX_THEMES_OVERALL_SOS_FIELD,
            # Derived columns
            field_names.CDC_SVI_INDEX_THEMES_OVERALL_TOTAL_FIELD,
            field_names.CDC_SVI_INDEX_THEMES_PRIORITY_COMMUNITY,
        ] + self.COVARIATE_COLUMNS

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Extracting 43 MB CDC SVI INDEX")
        super().extract(
            self.CDC_SVI_INDEX_S3_URL,
            self.CDC_SVI_INDEX_ZIP_FILE_DIR,
        )

    def transform(self) -> None:
        logger.info("Starting CDC SVI INDEX transform")

        # New file name
        tmp_svi_csv_file_path = (
            self.CDC_SVI_INDEX_ZIP_FILE_DIR / "SVI2018_US.csv"
        )

        self.df = pd.read_csv(
            filepath_or_buffer=tmp_svi_csv_file_path,
            dtype={self.CDC_SVI_INDEX_TRACTS_FIPS_CODE: object},
        )

        # Note: In this dataset all US census tracts are ranked against one another.
        # Puerto Rico is not included in this dataset
        self.df.rename(
            columns={
                self.CDC_SVI_INDEX_TRACTS_FIPS_CODE: self.GEOID_TRACT_FIELD_NAME,
                "RPL_THEME1": field_names.CDC_SVI_INDEX_SE_THEME_PERCENTILE_FIELD,
                "RPL_THEME2": field_names.CDC_SVI_INDEX_HOUSEHOLD_THEME_PERCENTILE_COMPOSITION_FIELD,
                "RPL_THEME3": field_names.CDC_SVI_INDEX_LANGUAGE_THEME_PERCENTILE_FIELD,
                "RPL_THEME4": field_names.CDC_SVI_INDEX_HOUSING_TRANSPORTATION_PERCENTILE_FIELD,
                "RPL_THEMES": field_names.CDC_RPL_THEMES_OVERALL_PERCENTILE_FIELD,
                "SPL_THEME1": field_names.CDC_SVI_INDEX_SE_THEME_SOS_FIELD,
                "SPL_THEME2": field_names.CDC_SVI_INDEX_HOUSEHOLD_THEME_SOS_FIELD,
                "SPL_THEME3": field_names.CDC_SVI_INDEX_LANGUAGE_THEME_SOS_FIELD,
                "SPL_THEME4": field_names.CDC_SVI_INDEX_HOUSING_TRANSPORTATION_SOS_FIELD,
                "SPL_THEMES": field_names.CDC_SVI_INDEX_THEMES_OVERALL_SOS_FIELD,
                "F_TOTAL": field_names.CDC_SVI_INDEX_THEMES_OVERALL_TOTAL_FIELD,
            },
            inplace=True,
            errors="raise",
        )

        #  At or above 90 for percentile rank
        self.df[field_names.CDC_SVI_INDEX_THEMES_PRIORITY_COMMUNITY] = (
            self.df[field_names.CDC_RPL_THEMES_OVERALL_PERCENTILE_FIELD]
            >= self.CDC_RPL_THEMES_THRSHOLD
        )

        expected_census_tract_field_length = 11
        if (
            not self.df[self.GEOID_TRACT_FIELD_NAME]
            .apply(lambda x: len(str(x)))
            .eq(expected_census_tract_field_length)
            .all()
        ):
            raise ValueError(
                f"GEOID Tract must be length of {expected_census_tract_field_length}"
            )

    def load(self) -> None:
        logger.info("Saving CDC SVI Index Data")

        # The F-prefixed variables symbolize a flag (as defined in the documentation)
        # Tracts in the top 10%, i.e., at the 90th percentile of values, are given a value of 1 to indicate high vulnerability.
        # Tracts below the 90th percentile are given a value of 0.
        # For a given theme, the flag value is the number of flags for variables comprising the theme. The overall
        # flag value is calculated for each tract as the number of all variable flags (F_TOTAL)
        list_of_flag_columns = [
            x for x in self.df.columns if str(x).startswith("F_")
        ]

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        self.df[self.COLUMNS_TO_KEEP + list_of_flag_columns].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
