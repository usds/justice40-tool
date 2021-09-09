import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class NationalRiskIndexETL(ExtractTransformLoad):
    """ETL class for the FEMA National Risk Index dataset"""

    def __init__(self):
        self.NRI_FTP_URL = "https://nri-data-downloads.s3.amazonaws.com/NRI_Table_CensusTracts.zip"
        self.INPUT_CSV = self.TMP_PATH / "NRI_Table_CensusTracts.csv"
        self.OUTPUT_DIR = (
            self.DATA_PATH / "dataset" / "national_risk_index_2020"
        )
        self.BLOCK_GROUP_CSV = (
            self.DATA_PATH / "dataset" / "census_acs_2019" / "usa.csv"
        )
        self.df: pd.DataFrame

    def extract(self) -> None:
        """Unzips NRI dataset from the FEMA data source and writes the files
        to the temporary data folder for use in the transform() method
        """
        logger.info("Downloading National Risk Index Data")
        super().extract(
            self.NRI_FTP_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        """Reads the unzipped data file into memory and applies the following
        transformations to prepare it for the load() method:

        - Renames the Census Tract column to match the other datasets
        - Applies the NRI score for each Census Tract to the Census Block
          Groups inside of that Tract
        """
        logger.info("Transforming National Risk Index Data")

        NRI_TRACT_COL = "TRACTFIPS"  # Census Tract Column in NRI data
        TRACT_COL = self.GEOID_TRACT_FIELD_NAME  # Census Tract column name
        BLOCK_COL = self.GEOID_FIELD_NAME  # Census Block Group column name

        # read in the unzipped csv from NRI data source then rename the
        # Census Tract column for merging
        df_nri = pd.read_csv(
            self.INPUT_CSV,
            dtype={NRI_TRACT_COL: "string"},
            na_values=["None"],
            low_memory=False,
        )
        df_nri.rename(columns={NRI_TRACT_COL: TRACT_COL}, inplace=True)

        # get the full list of Census Block Groups from the ACS data
        # and extract the Census Tract ID from each Block Group ID
        df_acs = pd.read_csv(self.BLOCK_GROUP_CSV, dtype={BLOCK_COL: "string"})
        df_acs[TRACT_COL] = df_acs[BLOCK_COL].str[0:11]
        df_block_group = df_acs[[BLOCK_COL, TRACT_COL]]

        # merge NRI data on the Census Tract ID so that each
        # Block Group inherits the NRI score of its Census Tract
        self.df = df_block_group.merge(df_nri, how="left", on=TRACT_COL)

    def load(self) -> None:
        """Writes the NRI data as a csv to the directory at self.OUTPUT_DIR"""
        logger.info("Saving National Risk Index CSV")
        # write nationwide csv
        self.OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.OUTPUT_DIR / "usa.csv", index=False)
