import pandas as pd
import requests

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class HudRecapETL(ExtractTransformLoad):
    def __init__(self):
        # pylint: disable=line-too-long
        self.HUD_RECAP_CSV_URL = "https://opendata.arcgis.com/api/v3/datasets/56de4edea8264fe5a344da9811ef5d6e_0/downloads/data?format=csv&spatialRefId=4326"  # noqa: E501
        self.HUD_RECAP_CSV = (
            self.get_tmp_path()
            / "Racially_or_Ethnically_Concentrated_Areas_of_Poverty__R_ECAPs_.csv"
        )
        self.CSV_PATH = self.DATA_PATH / "dataset" / "hud_recap"

        # Definining some variable names
        self.HUD_RECAP_PRIORITY_COMMUNITY_FIELD_NAME = (
            "hud_recap_priority_community"
        )

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading HUD Recap Data")
        download = requests.get(self.HUD_RECAP_CSV_URL, verify=None)
        file_contents = download.content
        csv_file = open(self.HUD_RECAP_CSV, "wb")
        csv_file.write(file_contents)
        csv_file.close()

    def transform(self) -> None:
        logger.info("Transforming HUD Recap Data")

        # Load comparison index (CalEnviroScreen 4)
        self.df = pd.read_csv(self.HUD_RECAP_CSV, dtype={"GEOID": "string"})

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
        logger.info("Saving HUD Recap CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "usa.csv", index=False)
