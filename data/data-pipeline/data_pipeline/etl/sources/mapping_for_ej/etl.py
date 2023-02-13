import geopandas as gpd
import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class MappingForEJETL(ExtractTransformLoad):
    def __init__(self):

        # fetch
        self.mapping_for_ej_va_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/VA_mej.zip"
        )
        self.mapping_for_ej_co_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/CO_mej.zip"
        )

        # input
        self.va_shp_file_source = (
            self.get_sources_path() / "mej_virginia_7_1.shp"
        )
        self.co_shp_file_source = (
            self.get_sources_path() / "mej_colorado_final.shp"
        )

        # output
        self.CSV_PATH = self.DATA_PATH / "dataset" / "mapping_for_ej"

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

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.mapping_for_ej_va_url,
                destination=self.get_sources_path(),
            ),
            ZIPDataSource(
                source=self.mapping_for_ej_co_url,
                destination=self.get_sources_path(),
            ),
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        # Join (here, it's just concatenating) the two dataframes from
        # CO and VA
        self.df = pd.concat(
            [
                gpd.read_file(self.va_shp_file_source),
                gpd.read_file(self.co_shp_file_source),
            ]
        )

    def transform(self) -> None:

        # Fill Census tract to get it to be 11 digits, incl. leading 0s
        # Note that VA and CO should never have leading 0s, so this isn't
        # strictly necessary, but if in the future, there are more states
        # this seems like a reasonable thing to include.
        self.df[self.GEOID_TRACT_FIELD_NAME] = (
            self.df["fips_tract"].astype(str).str.zfill(11)
        )

        # Note that there are tracts in this dataset that do not have a final ranking
        # because they are missing data. I've retained them to be consistent with other ETLs.
        self.df = self.df.rename(
            columns={
                "fin_rank": field_names.MAPPING_FOR_EJ_FINAL_PERCENTILE_FIELD,
                "fin_score": field_names.MAPPING_FOR_EJ_FINAL_SCORE_FIELD,
            }
        )

        # Calculate prioritized communities based on percentile, only
        # for tracts that have complete data
        self.df[field_names.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_FIELD] = (
            self.df[field_names.MAPPING_FOR_EJ_FINAL_PERCENTILE_FIELD]
            >= self.MAPPING_FOR_EJ_PRIORITY_COMMUNITY_PERCENTILE_THRESHOLD
        )

    def load(self) -> None:
        # write selected states csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            self.CSV_PATH / "co_va.csv", index=False
        )

    def validate(self) -> None:
        logger.debug("Skipping validation for MappingForEJETL")
