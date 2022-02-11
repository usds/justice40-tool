import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class EJSCREENETL(ExtractTransformLoad):
    """Load EJSCREEN data.

    Data dictionary:
        https://gaftp.epa.gov/EJSCREEN/2019/2019_EJSCREEN_columns_explained.csv
    """

    def __init__(self):
        self.EJSCREEN_FTP_URL = "https://edap-arcgiscloud-data-commons.s3.amazonaws.com/EJSCREEN2020/EJSCREEN_Tract_2020_USPR.csv.zip"
        self.EJSCREEN_CSV = self.get_tmp_path() / "EJSCREEN_Tract_2020_USPR.csv"
        self.CSV_PATH = self.DATA_PATH / "dataset" / "ejscreen_2019"
        self.df: pd.DataFrame

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.TOTAL_POP_FIELD,
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
        ]

    def extract(self) -> None:
        logger.info("Downloading EJScreen Data")
        super().extract(
            self.EJSCREEN_FTP_URL,
            self.get_tmp_path(),
            verify=False,  # EPA EJScreen end point has certificate issues often
        )

    def transform(self) -> None:
        logger.info("Transforming EJScreen Data")
        self.df = pd.read_csv(
            self.EJSCREEN_CSV,
            dtype={"ID": "string"},
            # EJSCREEN writes the word "None" for NA data.
            na_values=["None"],
            low_memory=False,
        )

        # rename ID to Tract ID
        self.df.rename(
            columns={
                "ID": self.GEOID_TRACT_FIELD_NAME,
                # Note: it is currently unorthodox to use `field_names` in an ETL class,
                # but I think that's the direction we'd like to move all ETL classes. - LMB
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
            },
            inplace=True,
        )

    def load(self) -> None:
        logger.info("Saving EJScreen CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            self.CSV_PATH / "usa.csv", index=False
        )
