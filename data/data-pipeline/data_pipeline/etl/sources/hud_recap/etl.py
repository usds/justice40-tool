import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import FileDataSource
from data_pipeline.utils import get_module_logger


logger = get_module_logger(__name__)


class HudRecapETL(ExtractTransformLoad):
    def __init__(self):

        # fetch
        if settings.DATASOURCE_RETRIEVAL_FROM_AWS:
            self.hud_recap_csv_url = (
                f"{settings.AWS_JUSTICE40_DATASOURCES_URL}/raw-data-sources/"
                "hud_recap/Racially_or_Ethnically_Concentrated_Areas_of_Poverty__R_ECAPs_.csv"
            )
        else:
            self.hud_recap_csv_url = (
                "https://opendata.arcgis.com/api/v3/datasets/"
                "56de4edea8264fe5a344da9811ef5d6e_0/downloads/data?format=csv&spatialRefId=4326"
            )

        # input
        self.hud_recap_source = (
            self.get_sources_path()
            / "Racially_or_Ethnically_Concentrated_Areas_of_Poverty__R_ECAPs_.csv"
        )

        # output
        self.CSV_PATH = self.DATA_PATH / "dataset" / "hud_recap"

        # Defining some variable names
        self.HUD_RECAP_PRIORITY_COMMUNITY_FIELD_NAME = (
            "hud_recap_priority_community"
        )

        self.df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            FileDataSource(
                source=self.hud_recap_csv_url, destination=self.hud_recap_source
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        # Load comparison index (CalEnviroScreen 4)
        self.df = pd.read_csv(self.hud_recap_source, dtype={"GEOID": "string"})

    def transform(self) -> None:

        self.df.rename(
            columns={
                "GEOID": self.GEOID_TRACT_FIELD_NAME,
                # Interestingly, there's no data dictionary for the RECAP data that I could find.
                # However, this site (http://www.schousing.com/library/Tax%20Credit/2020/QAP%20Instructions%20(2).pdf)
                # suggests:
                # "If RCAP_Current for the tract in which the site is located is 1, the tract is an R/ECAP. If RCAP_Current is 0, it is not."
                "RCAP_Current": self.HUD_RECAP_PRIORITY_COMMUNITY_FIELD_NAME,
            },
            inplace=True,
        )

        # Convert to boolean
        self.df[self.HUD_RECAP_PRIORITY_COMMUNITY_FIELD_NAME] = self.df[
            self.HUD_RECAP_PRIORITY_COMMUNITY_FIELD_NAME
        ].astype("bool")

        self.df[self.HUD_RECAP_PRIORITY_COMMUNITY_FIELD_NAME].value_counts()

        self.df.sort_values(by=self.GEOID_TRACT_FIELD_NAME, inplace=True)

    def load(self) -> None:
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "usa.csv", index=False)
