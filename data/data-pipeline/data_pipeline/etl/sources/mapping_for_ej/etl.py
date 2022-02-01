import pandas as pd
import geopandas as gpd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class MappingForEJETL(ExtractTransformLoad):
    def __init__(self):
        self.CSV_PATH = self.DATA_PATH / "dataset" / "mapping_for_ej"

        self.MAPPING_FOR_EJ_VA_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/VA_mej.zip"
        )
        self.MAPPING_FOR_EJ_CO_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/CO_mej.zip"
        )
        self.VA_SHP_FILE_PATH = self.TMP_PATH / "mej_virginia_7_1.shp"
        self.CO_SHP_FILE_PATH = self.TMP_PATH / "mej_colorado_final.shp"

        # Defining variables
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.MAPPING_FOR_EJ_FINAL_PERCENTILE_FIELD,
            field_names.MAPPING_FOR_EJ_FINAL_SCORE_FIELD,
            field_names.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_FIELD,
        ]

        # Choosing constants.
        # In our current score implementation, about 17% of CO and 20% of VA tracts are
        # identified as disadvantaged. Consequently, the rank-based threshold is 20%.
        # Using the scores to calculate which are priority communities doesn't quite track
        # with this distribution, and so I've opted to choose roughly 20% of both states.
        self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_PERCENTILE_THRESHOLD = 80

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading Mapping for EJ Data")
        super().extract(
            self.MAPPING_FOR_EJ_VA_URL,
            self.TMP_PATH,
        )
        super().extract(
            self.MAPPING_FOR_EJ_CO_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        logger.info("Transforming Mapping for EJ Data")

        # TEMPORARY until the S3 data is added...
        self.df = pd.concat(
            [
                gpd.read_file(self.VA_SHP_FILE_PATH),
                gpd.read_file(self.CO_SHP_FILE_PATH),
            ]
        )

        # Fill Census tract to get it to be 11 digits, incl. leading 0s
        self.df[self.GEOID_TRACT_FIELD_NAME] = (
            self.df["fips_tract"].map(str).str.zfill(11)
        )

        self.df.rename(
            columns={
                "fin_rank": field_names.MAPPING_FOR_EJ_FINAL_PERCENTILE_FIELD,
                "fin_score": field_names.MAPPING_FOR_EJ_FINAL_SCORE_FIELD,
            },
            inplace=True,
        )

        # Calculate prioritized communities based on percentile
        self.df[field_names.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_FIELD] = (
            self.df[field_names.MAPPING_FOR_EJ_FINAL_PERCENTILE_FIELD]
            >= self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_PERCENTILE_THRESHOLD
        )

    def load(self) -> None:
        logger.info("Saving Mapping for EJ CSV")
        # write selected states csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            self.CSV_PATH / "co_va.csv", index=False
        )

    def validate(self) -> None:
        logger.info("Validating Mapping For EJ Data")
        pass
