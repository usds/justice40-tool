import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource

logger = get_module_logger(__name__)


class EJSCREENETL(ExtractTransformLoad):
    """Load updated EJSCREEN data."""

    NAME = "ejscreen"
    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT
    INPUT_GEOID_TRACT_FIELD_NAME: str = "ID"

    def __init__(self):

        # fetch
        self.ejscreen_url = "https://gaftp.epa.gov/EJSCREEN/2021/EJSCREEN_2021_USPR_Tracts.csv.zip"

        # input
        self.ejscreen_source = (
            self.get_sources_path() / "EJSCREEN_2021_USPR_Tracts.csv"
        )

        # output
        self.CSV_PATH = self.DATA_PATH / "dataset" / "ejscreen"

        self.df: pd.DataFrame

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            # pylint: disable=duplicate-code
            field_names.AIR_TOXICS_CANCER_RISK_FIELD,
            field_names.RESPIRATORY_HAZARD_FIELD,
            field_names.DIESEL_FIELD,
            field_names.PM25_FIELD,
            field_names.OZONE_FIELD,
            field_names.TRAFFIC_FIELD,
            field_names.RMP_FIELD,
            field_names.TSDF_FIELD,
            field_names.NPL_FIELD,
            field_names.WASTEWATER_FIELD,
            field_names.HOUSEHOLDS_LINGUISTIC_ISO_FIELD,
            field_names.POVERTY_FIELD,
            field_names.OVER_64_FIELD,
            field_names.UNDER_5_FIELD,
            field_names.LEAD_PAINT_FIELD,
            field_names.UST_FIELD,
        ]

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.ejscreen_url, destination=self.get_sources_path()
            )
        ]

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        self.df = pd.read_csv(
            self.ejscreen_source,
            dtype={self.INPUT_GEOID_TRACT_FIELD_NAME: str},
            # EJSCREEN writes the word "None" for NA data.
            na_values=["None"],
            low_memory=False,
        )

    def transform(self) -> None:

        # rename ID to Tract ID
        self.output_df = self.df.rename(
            columns={
                self.INPUT_GEOID_TRACT_FIELD_NAME: self.GEOID_TRACT_FIELD_NAME,
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
                "UST": field_names.UST_FIELD,  # added for 2021 update
            },
        )
