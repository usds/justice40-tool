import pandas as pd
import geopandas as gpd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

# from data_pipeline.config import settings

logger = get_module_logger(__name__)


class MappingForEJETL(ExtractTransformLoad):
    def __init__(self):
        self.CSV_PATH = self.DATA_PATH / "dataset" / "mapping_for_ej"

        # this is very much temporary -- I *think* I've got to upload the files to S3
        self.VA_SHP_PATH = (
            "/Users/emmausds/Downloads/mej_va_7_1/mej_virginia_7_1.shp"
        )
        self.CO_SHP_PATH = (
            "/Users/emmausds/Downloads/mej_colorado/mej_colorado_final.shp"
        )

        # self.MAPPING_FOR_EJ_URL = (
        #     settings.AWS_JUSTICE40_DATASOURCES_URL + "/VA_mej.zip"
        # )

        # self.CO_EJSCREEN_URL = (
        #     settings.AWS_JUSTICE40_DATASOURCES_URL + "/CO_mej.zip"
        # )

        # Definining some variable names -- temporary
        self.MAPPING_FOR_EJ_POPULATION_CHARACTERISTICS_RANK_FIELD = (
            "mapping_for_ej_population_rank"
        )
        self.MAPPING_FOR_EJ_POPULATION_CHARACTERISTICS_SCORE_FIELD = (
            "mapping_for_ej_population_score"
        )
        self.MAPPING_FOR_EJ_ENVIRONMENTAL_BURDEN_RANK_FIELD = (
            "mapping_for_ej_environmental_burden_rank"
        )
        self.MAPPING_FOR_EJ_ENVIRONMENTAL_BURDEN_SCORE_FIELD = (
            "mapping_for_ej_environmental_burden_score"
        )
        self.MAPPING_FOR_EJ_FINAL_RANK_FIELD = "mapping_for_ej_final_ej_rank"
        self.MAPPING_FOR_EJ_FINAL_SCORE_FIELD = "mapping_for_ej_final_ej_score"
        self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_FIELD = (
            "mapping_for_ej_priority_community"
        )

        # Choosing constants.
        # None of these numbers are final, but just for the purposes of comparison.
        self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_THRESHOLD = 75

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading Mapping for EJ Data")
        logger.info("Skipping until load...")
        # super().extract(
        #     self.MAPPING_FOR_EJ_URL,
        #     self.TMP_PATH,
        # )
        # super().extract(
        #     self.CO_EJSCREEN_URL,
        #     self.TMP_PATH,
        # )

    def transform(self) -> None:
        logger.info("Transforming Mapping for EJ Data")

        self.df = pd.concat(
            [gpd.read_file(self.VA_SHP_PATH), gpd.read_file(self.CO_SHP_PATH)]
        )
        # A few outstanding questions about VA...
        # Note that this EJScreen data is organized at the tract level (1876 unique fips tracts, 1876 rows).
        # Virginia had 1907 tracts in 2010, so some may be missing. TODO: Look into this

        # Fill Census tract to get it to be 11 digits, incl. leading 0s
        self.df[self.GEOID_TRACT_FIELD_NAME] = (
            self.df["fips_tract"].map(str).str.zfill(11)
        )  # .copy(deep=True)

        self.df.rename(
            columns={
                "fin_rank": self.MAPPING_FOR_EJ_FINAL_RANK_FIELD,
                "fin_score": self.MAPPING_FOR_EJ_FINAL_SCORE_FIELD,
                "pltn_rank": self.MAPPING_FOR_EJ_ENVIRONMENTAL_BURDEN_RANK_FIELD,
                "pltn_score": self.MAPPING_FOR_EJ_ENVIRONMENTAL_BURDEN_SCORE_FIELD,
                "pop_rank": self.MAPPING_FOR_EJ_POPULATION_CHARACTERISTICS_RANK_FIELD,
                "pop_score": self.MAPPING_FOR_EJ_POPULATION_CHARACTERISTICS_SCORE_FIELD,
            },
            inplace=True,
        )

        # Calculate the top K% of prioritized communities
        self.df[self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_FIELD] = (
            self.df[self.MAPPING_FOR_EJ_FINAL_RANK_FIELD]
            >= self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_THRESHOLD
        )

    def load(self) -> None:
        logger.info("Saving Mapping for EJ CSV")
        # write selected states csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)

        columns_to_keep = [
            self.GEOID_TRACT_FIELD_NAME,
            self.MAPPING_FOR_EJ_POPULATION_CHARACTERISTICS_RANK_FIELD,
            self.MAPPING_FOR_EJ_POPULATION_CHARACTERISTICS_SCORE_FIELD,
            self.MAPPING_FOR_EJ_ENVIRONMENTAL_BURDEN_RANK_FIELD,
            self.MAPPING_FOR_EJ_ENVIRONMENTAL_BURDEN_SCORE_FIELD,
            self.MAPPING_FOR_EJ_FINAL_RANK_FIELD,
            self.MAPPING_FOR_EJ_FINAL_SCORE_FIELD,
            self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_FIELD,
        ]
        # it's not all of USA
        self.df[columns_to_keep].to_csv(self.CSV_PATH / "usa.csv", index=False)

    def validate(self) -> None:
        logger.info("Validating Mapping For EJ Data")
        pass
