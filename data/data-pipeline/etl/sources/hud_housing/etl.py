import pandas as pd

from etl.base import ExtractTransformLoad
from etl.sources.census.etl_utils import get_state_fips_codes
from utils import get_module_logger, unzip_file_from_url, remove_all_from_dir

logger = get_module_logger(__name__)


class HudHousingETL(ExtractTransformLoad):
    def __init__(self):
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "hud_housing"
        self.GEOID_TRACT_FIELD_NAME = "GEOID10_TRACT"
        self.HOUSING_FTP_URL = (
            "https://www.huduser.gov/portal/datasets/cp/2012thru2016-140-csv.zip"
        )
        self.HOUSING_ZIP_FILE_DIR = self.TMP_PATH / "hud_housing"

        # We measure households earning less than 80% of HUD Area Median Family Income by county
        # and paying greater than 30% of their income to housing costs.
        self.HOUSING_BURDEN_FIELD_NAME = "Housing burden (percent)"
        self.HOUSING_BURDEN_NUMERATOR_FIELD_NAME = "HOUSING_BURDEN_NUMERATOR"
        self.HOUSING_BURDEN_DENOMINATOR_FIELD_NAME = "HOUSING_BURDEN_DENOMINATOR"

        # Note: some variable definitions.
        # HUD-adjusted median family income (HAMFI).
        # The four housing problems are: incomplete kitchen facilities, incomplete plumbing facilities, more than 1 person per room, and cost burden greater than 30%.
        # Table 8 is the desired table.

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info(f"Extracting HUD Housing Data")
        super().extract(
            self.HOUSING_FTP_URL,
            self.HOUSING_ZIP_FILE_DIR,
        )

    def transform(self) -> None:
        logger.info(f"Transforming HUD Housing Data")

        # New file name:
        tmp_csv_file_path = (
            self.HOUSING_ZIP_FILE_DIR
            / "2012thru2016-140-csv"
            / "2012thru2016-140-csv"
            / "140"
            / "Table8.csv"
        )
        self.df = pd.read_csv(
            filepath_or_buffer=tmp_csv_file_path,
            encoding="latin-1",
        )

        # Rename and reformat block group ID
        self.df.rename(columns={"geoid": self.GEOID_TRACT_FIELD_NAME}, inplace=True)

        # The CHAS data has census tract ids such as `14000US01001020100`
        # Whereas the rest of our data uses, for the same tract, `01001020100`.
        #  the characters before `US`:
        self.df[self.GEOID_TRACT_FIELD_NAME] = self.df[
            self.GEOID_TRACT_FIELD_NAME
        ].str.replace(r"^.*?US", "", regex=True)

        # Calculate housing burden
        # This is quite a number of steps. It does not appear to be accessible nationally in a simpler format, though.
        # See "CHAS data dictionary 12-16.xlsx"

        # Owner occupied numerator fields
        OWNER_OCCUPIED_NUMERATOR_FIELDS = [
            # Key: Column Name	Line_Type	Tenure	Household income	Cost burden	Facilities
            # T8_est7	Subtotal	Owner occupied	less than or equal to 30% of HAMFI	greater than 30% but less than or equal to 50%	All
            "T8_est7",
            # T8_est10	Subtotal	Owner occupied	less than or equal to 30% of HAMFI	greater than 50%	All
            "T8_est10",
            # T8_est20	Subtotal	Owner occupied	greater than 30% but less than or equal to 50% of HAMFI	greater than 30% but less than or equal to 50%	All
            "T8_est20",
            # T8_est23	Subtotal	Owner occupied	greater than 30% but less than or equal to 50% of HAMFI	greater than 50%	All
            "T8_est23",
            # T8_est33	Subtotal	Owner occupied	greater than 50% but less than or equal to 80% of HAMFI	greater than 30% but less than or equal to 50%	All
            "T8_est33",
            # T8_est36	Subtotal	Owner occupied	greater than 50% but less than or equal to 80% of HAMFI	greater than 50%	All
            "T8_est36",
        ]

        # These rows have the values where HAMFI was not computed, b/c of no or negative income.
        OWNER_OCCUPIED_NOT_COMPUTED_FIELDS = [
            # Key: Column Name	Line_Type	Tenure	Household income	Cost burden	Facilities
            # T8_est13	Subtotal	Owner occupied	less than or equal to 30% of HAMFI	not computed (no/negative income)	All
            "T8_est13",
            # T8_est26	Subtotal	Owner occupied	greater than 30% but less than or equal to 50% of HAMFI	not computed (no/negative income)	All
            "T8_est26",
            # T8_est39	Subtotal	Owner occupied	greater than 50% but less than or equal to 80% of HAMFI	not computed (no/negative income)	All
            "T8_est39",
            # T8_est52	Subtotal	Owner occupied	greater than 80% but less than or equal to 100% of HAMFI	not computed (no/negative income)	All
            "T8_est52",
            # T8_est65	Subtotal	Owner occupied	greater than 100% of HAMFI	not computed (no/negative income)	All
            "T8_est65",
        ]

        # T8_est2	Subtotal	Owner occupied	All	All	All
        OWNER_OCCUPIED_POPULATION_FIELD = "T8_est2"

        # Renter occupied numerator fields
        RENTER_OCCUPIED_NUMERATOR_FIELDS = [
            # Key: Column Name	Line_Type	Tenure	Household income	Cost burden	Facilities
            # T8_est73	Subtotal	Renter occupied	less than or equal to 30% of HAMFI	greater than 30% but less than or equal to 50%	All
            "T8_est73",
            # T8_est76	Subtotal	Renter occupied	less than or equal to 30% of HAMFI	greater than 50%	All
            "T8_est76",
            # T8_est86	Subtotal	Renter occupied	greater than 30% but less than or equal to 50% of HAMFI	greater than 30% but less than or equal to 50%	All
            "T8_est86",
            # T8_est89	Subtotal	Renter occupied	greater than 30% but less than or equal to 50% of HAMFI	greater than 50%	All
            "T8_est89",
            # T8_est99	Subtotal	Renter occupied	greater than 50% but less than or equal to 80% of HAMFI	greater than 30% but less than or equal to 50%	All
            "T8_est99",
            # T8_est102	Subtotal	Renter occupied	greater than 50% but less than or equal to 80% of HAMFI	greater than 50%	All
            "T8_est102",
        ]

        # These rows have the values where HAMFI was not computed, b/c of no or negative income.
        RENTER_OCCUPIED_NOT_COMPUTED_FIELDS = [
            # Key: Column Name	Line_Type	Tenure	Household income	Cost burden	Facilities
            # T8_est79	Subtotal	Renter occupied	less than or equal to 30% of HAMFI	not computed (no/negative income)	All
            "T8_est79",
            # T8_est92	Subtotal	Renter occupied	greater than 30% but less than or equal to 50% of HAMFI	not computed (no/negative income)	All
            "T8_est92",
            # T8_est105	Subtotal	Renter occupied	greater than 50% but less than or equal to 80% of HAMFI	not computed (no/negative income)	All
            "T8_est105",
            # T8_est118	Subtotal	Renter occupied	greater than 80% but less than or equal to 100% of HAMFI	not computed (no/negative income)	All
            "T8_est118",
            # T8_est131	Subtotal	Renter occupied	greater than 100% of HAMFI	not computed (no/negative income)	All
            "T8_est131",
        ]

        # T8_est68	Subtotal	Renter occupied	All	All	All
        RENTER_OCCUPIED_POPULATION_FIELD = "T8_est68"

        # Math:
        # (
        #     # of Owner Occupied Units Meeting Criteria
        #     + # of Renter Occupied Units Meeting Criteria
        # )
        # divided by
        # (
        #     Total # of Owner Occupied Units
        #     + Total # of Renter Occupied Units
        #     - # of Owner Occupied Units with HAMFI Not Computed
        #     - # of Renter Occupied Units with HAMFI Not Computed
        # )

        self.df[self.HOUSING_BURDEN_NUMERATOR_FIELD_NAME] = self.df[
            OWNER_OCCUPIED_NUMERATOR_FIELDS
        ].sum(axis=1) + self.df[RENTER_OCCUPIED_NUMERATOR_FIELDS].sum(axis=1)

        self.df[self.HOUSING_BURDEN_DENOMINATOR_FIELD_NAME] = (
            self.df[OWNER_OCCUPIED_POPULATION_FIELD]
            + self.df[RENTER_OCCUPIED_POPULATION_FIELD]
            - self.df[OWNER_OCCUPIED_NOT_COMPUTED_FIELDS].sum(axis=1)
            - self.df[RENTER_OCCUPIED_NOT_COMPUTED_FIELDS].sum(axis=1)
        )

        # TODO: add small sample size checks
        self.df[self.HOUSING_BURDEN_FIELD_NAME] = self.df[
            self.HOUSING_BURDEN_NUMERATOR_FIELD_NAME
        ].astype(float) / self.df[self.HOUSING_BURDEN_DENOMINATOR_FIELD_NAME].astype(
            float
        )

    def load(self) -> None:
        logger.info(f"Saving HUD Housing Data")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

        # Drop unnecessary fields
        self.df[
            [
                self.GEOID_TRACT_FIELD_NAME,
                self.HOUSING_BURDEN_NUMERATOR_FIELD_NAME,
                self.HOUSING_BURDEN_DENOMINATOR_FIELD_NAME,
                self.HOUSING_BURDEN_FIELD_NAME,
            ]
        ].to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
