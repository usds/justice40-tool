import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class HudHousingETL(ExtractTransformLoad):
    NAME = "hud_housing"
    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT

    def __init__(self):
        self.GEOID_TRACT_FIELD_NAME = "GEOID10_TRACT"

        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            self.HOUSING_FTP_URL = (
                f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/"
                "hud_housing/2014thru2018-140-csv.zip"
            )
        else:
            self.HOUSING_FTP_URL = "https://www.huduser.gov/portal/datasets/cp/2014thru2018-140-csv.zip"

        self.HOUSING_ZIP_FILE_DIR = self.get_tmp_path()

        # We measure households earning less than 80% of HUD Area Median Family Income by county
        # and paying greater than 30% of their income to housing costs.
        self.HOUSING_BURDEN_FIELD_NAME = "Housing burden (percent)"
        self.HOUSING_BURDEN_NUMERATOR_FIELD_NAME = "HOUSING_BURDEN_NUMERATOR"
        self.HOUSING_BURDEN_DENOMINATOR_FIELD_NAME = (
            "HOUSING_BURDEN_DENOMINATOR"
        )
        self.NO_KITCHEN_OR_INDOOR_PLUMBING_FIELD_NAME = (
            "Share of homes with no kitchen or indoor plumbing (percent)"
        )
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.HOUSING_BURDEN_NUMERATOR_FIELD_NAME,
            self.HOUSING_BURDEN_DENOMINATOR_FIELD_NAME,
            self.HOUSING_BURDEN_FIELD_NAME,
            self.NO_KITCHEN_OR_INDOOR_PLUMBING_FIELD_NAME,
            "DENOM INCL NOT COMPUTED",
        ]

        # Note: some variable definitions.
        # HUD-adjusted median family income (HAMFI).
        # The four housing problems are:
        #   - incomplete kitchen facilities,
        #   - incomplete plumbing facilities,
        #   - more than 1 person per room,
        #   - cost burden greater than 30%.
        # Table 8 is the desired table for housing burden
        # Table 3 is the desired table for no kitchen or indoor plumbing

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Extracting 1.09 GB HUD Housing Data")
        super().extract(
            self.HOUSING_FTP_URL,
            self.HOUSING_ZIP_FILE_DIR,
        )

    def _read_chas_table(self, file_name):
        # New file name:
        tmp_csv_file_path = self.HOUSING_ZIP_FILE_DIR / "140" / file_name
        tmp_df = pd.read_csv(
            filepath_or_buffer=tmp_csv_file_path,
            encoding="latin-1",
        )

        # The CHAS data has census tract ids such as `14000US01001020100`
        # Whereas the rest of our data uses, for the same tract, `01001020100`.
        # This reformats and renames this field.
        tmp_df[self.GEOID_TRACT_FIELD_NAME] = tmp_df["geoid"].str.replace(
            r"^.*?US", "", regex=True
        )

        return tmp_df

    def transform(self) -> None:
        logger.info("Transforming HUD Housing Data")

        table_8 = self._read_chas_table("Table8.csv")
        table_3 = self._read_chas_table("Table3.csv")

        self.df = table_8.merge(
            table_3, how="outer", on=self.GEOID_TRACT_FIELD_NAME
        )

        # Calculate share that lacks indoor plumbing or kitchen
        # This is computed as
        # (
        #       owner occupied without plumbing + renter occupied without plumbing
        # ) / (
        #       total of owner and renter occupied
        # )
        self.df[self.NO_KITCHEN_OR_INDOOR_PLUMBING_FIELD_NAME] = (
            # T3_est3: owner-occupied lacking complete plumbing or kitchen facilities for all levels of income
            # T3_est46: subtotal: renter-occupied lacking complete plumbing or kitchen facilities for all levels of income
            # T3_est2: subtotal: owner-occupied for all levels of income
            # T3_est45: subtotal: renter-occupied for all levels of income
            self.df["T3_est3"]
            + self.df["T3_est46"]
        ) / (self.df["T3_est2"] + self.df["T3_est45"])

        # Calculate housing burden
        # See "CHAS data dictionary 12-16.xlsx"

        # Owner occupied numerator fields
        OWNER_OCCUPIED_NUMERATOR_FIELDS = [
            "T8_est7",  # Owner, less than or equal to 30% of HAMFI, greater than 30% but less than or equal to 50%
            "T8_est10",  # Owner, less than or equal to 30% of HAMFI, greater than 50%
            "T8_est20",  # Owner, greater than 30% but less than or equal to 50% of HAMFI, greater than 30% but less than or equal to 50%
            "T8_est23",  # Owner, greater than 30% but less than or equal to 50% of HAMFI, greater than 50%
            "T8_est33",  # Owner, greater than 50% but less than or equal to 80% of HAMFI, greater than 30% but less than or equal to 50%
            "T8_est36",  # Owner, greater than 50% but less than or equal to 80% of HAMFI, greater than 50%
        ]

        # These rows have the values where HAMFI was not computed, b/c of no or negative income.
        # They are in the same order as the rows above
        OWNER_OCCUPIED_NOT_COMPUTED_FIELDS = [
            "T8_est13",
            "T8_est26",
            "T8_est39",
            "T8_est52",
            "T8_est65",
        ]

        # This represents all owner-occupied housing units
        OWNER_OCCUPIED_POPULATION_FIELD = "T8_est2"

        # Renter occupied numerator fields
        RENTER_OCCUPIED_NUMERATOR_FIELDS = [
            # Column Name
            #   Line_Type
            #   Tenure
            #   Household income
            #   Cost burden
            #   Facilities
            "T8_est73",
            #   Subtotal
            #   Renter occupied
            #   less than or equal to 30% of HAMFI
            #   greater than 30% but less than or equal to 50%
            #   All
            "T8_est76",
            #   Subtotal
            #   Renter occupied
            #   less than or equal to 30% of HAMFI
            #   greater than 50%
            #   All
            "T8_est86",
            #   Subtotal
            #   Renter occupied
            #   greater than 30% but less than or equal to 50% of HAMFI
            #   greater than 30% but less than or equal to 50%
            #   All
            "T8_est89",
            #   Subtotal
            #   Renter occupied
            #   greater than 30% but less than or equal to 50% of HAMFI
            #   greater than 50%
            #   All
            "T8_est99",
            #   Subtotal
            #   Renter occupied	greater than 50% but less than or equal to 80% of HAMFI
            #   greater than 30% but less than or equal to 50%
            #   All
            "T8_est102",
            #   Subtotal
            #   Renter occupied
            #   greater than 50% but less than or equal to 80% of HAMFI
            #   greater than 50%
            #   All
        ]

        # These rows have the values where HAMFI was not computed, b/c of no or negative income.
        RENTER_OCCUPIED_NOT_COMPUTED_FIELDS = [
            # Column Name
            #   Line_Type
            #   Tenure
            #   Household income
            #   Cost burden
            #   Facilities
            "T8_est79",
            #   Subtotal
            #   Renter occupied	less than or equal to 30% of HAMFI
            #   not computed (no/negative income)
            #   All
            "T8_est92",
            #   Subtotal
            #   Renter occupied	greater than 30% but less than or equal to 50% of HAMFI
            #   not computed (no/negative income)
            #   All
            "T8_est105",
            #   Subtotal
            #   Renter occupied
            #   greater than 50% but less than or equal to 80% of HAMFI
            #   not computed (no/negative income)
            #   All
            "T8_est118",
            #   Subtotal
            #   Renter occupied	greater than 80% but less than or equal to 100% of HAMFI
            #   not computed (no/negative income)
            #   All
            "T8_est131",
            #   Subtotal
            #   Renter occupied
            #   greater than 100% of HAMFI
            #   not computed (no/negative income)
            #   All
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

        self.df["DENOM INCL NOT COMPUTED"] = (
            self.df[OWNER_OCCUPIED_POPULATION_FIELD]
            + self.df[RENTER_OCCUPIED_POPULATION_FIELD]
        )

        # TODO: add small sample size checks
        self.df[self.HOUSING_BURDEN_FIELD_NAME] = self.df[
            self.HOUSING_BURDEN_NUMERATOR_FIELD_NAME
        ].astype(float) / self.df[
            self.HOUSING_BURDEN_DENOMINATOR_FIELD_NAME
        ].astype(
            float
        )

        self.output_df = self.df
