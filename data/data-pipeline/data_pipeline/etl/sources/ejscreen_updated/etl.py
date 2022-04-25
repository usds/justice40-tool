import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

ejscreen_columns_to_compute = [
    "ACSTOTPOP",
    "CANCER",
    "RESP",
    "DSLPM",
    "PM25",
    "OZONE",
    "PTRAF",
    "PRMP",
    "PTSDF",
    "PNPL",
    "PWDIS",
    "LINGISOPCT",
    "LOWINCPCT",
    "OVER64PCT",
    "UNDER5PCT",
    "PRE1960PCT",
]


class EJSCREENUpdatedETL(ExtractTransformLoad):
    """Load 2021 EJSCREEN data."""

    def __init__(self):
        ## To be updated once data is all posted to s3
        # self.EJSCREEN_FTP_URL = "https://edap-arcgiscloud-data-commons.s3.amazonaws.com/EJSCREEN2020/EJSCREEN_Tract_2020_USPR.csv.zip"
        # self.EJSCREEN_CSV = self.get_tmp_path() / "EJSCREEN_Tract_2020_USPR.csv"
        self.CSV_PATH = self.DATA_PATH / "dataset" / "ejscreen_updated"
        # self.GEO_CROSSWALK_PATH = (
        #     self.DATA_PATH / "crosswalks" / "tab20_tract20_tract10_natl.txt"
        # )
        self.df: pd.DataFrame

        self.RENAME_DICTIONARY = {
            "ID": self.GEOID_TRACT_FIELD_NAME,
            "ACSTOTPOP": field_names.TOTAL_POP_FIELD,
            "CANCER": field_names.AIR_TOXICS_CANCER_RISK_FIELD,
            "RESP": field_names.RESPIRATORY_HAZARD_FIELD,
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
            "OVER64PCT": field_names.OVER_64_FIELD,
            "UNDER5PCT": field_names.UNDER_5_FIELD,
            "PRE1960PCT": field_names.LEAD_PAINT_FIELD,
        }

        self.COLUMNS_TO_KEEP = list(self.RENAME_DICTIONARY.values())

    def extract(self) -> None:
        pass
        # logger.info("Downloading EJScreen Data")
        # super().extract(
        #     self.EJSCREEN_FTP_URL,
        #     self.get_tmp_path(),
        #     verify=False,  # EPA EJScreen end point has certificate issues often
        # )

    # def _compute_and_convert_to_2010_boundaries(self):
    #     """Compute the data for 2010 boundaries, weighted by area"""

    #     # Read and join the 2010-2020 census crosswalk
    #     census_crosswalk = pd.read_csv(
    #         self.GEO_CROSSWALK_PATH,
    #         delimiter="|",
    #         dtype={"GEOID_TRACT_20": str, "GEOID_TRACT_10": str},
    #     )
    #     logger.info(
    #         f"There are {census_crosswalk['GEOID_TRACT_20'].nunique()} unique census tracts for 2020"
    #     )
    #     joined_epa = census_crosswalk.merge(
    #         self.df, left_on=["GEOID_TRACT_10"], right_on=["ID"]
    #     )

    #     # Calculate each 2020 tract's share for 2010 boundary, weighted by land area
    #     joined_epa["tract_share"] = joined_epa.groupby("GEOID_TRACT_10")[
    #         "AREALAND_TRACT_10"
    #     ].transform(lambda x: x / x.sum())

    #     # Compute weighted average for each EJScreen field
    #     for field_name in ejscreen_columns_to_compute:
    #         joined_epa["tmp_weight"] = (
    #             joined_epa[field_name] * joined_epa["tract_share"]
    #         )

    #         joined_epa[f"{field_name}_WEIGHTED"] = joined_epa.groupby(
    #             "GEOID_TRACT_10"
    #         )["tmp_weight"].transform(sum)

    #     # Drop all duplicate rows
    #     self.df = joined_epa.drop_duplicates(
    #         subset=["GEOID_TRACT_10"] + list(self.RENAME_DICTIONARY.keys())
    #     )
    #     logger.info(
    #         f"Remaining: {self.df['GEOID_TRACT_10'].nunique()} unique census tracts for 2010 in the data"
    #     )
    #     # Check for errors in join and drop
    #     assert (
    #         self.df["GEOID_TRACT_10"].nunique() == self.df.shape[0]
    #     ), "Error: Duplicate rows per census tract"

    def transform(self) -> None:
        logger.info("Transforming EJScreen Data")
        ## temporary
        self.df = pd.read_csv(
            "~/Desktop/EJSCREEN_2021_USPR_Tracts.csv",
            dtype={"ID": "string"},
            na_values=["None"],
            low_memory=False,
        )

        # crosswalk to 2010 boundaries
        # self._compute_and_convert_to_2010_boundaries()

        # rename columns
        self.df = self.df.rename(columns=self.RENAME_DICTIONARY)

    def load(self) -> None:
        logger.info("Saving EJScreen 2021 CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            self.CSV_PATH / "usa_2021.csv", index=False
        )
