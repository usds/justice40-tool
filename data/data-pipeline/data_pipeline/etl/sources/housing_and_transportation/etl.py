import pandas as pd
from pandas.errors import EmptyDataError

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class HousingTransportationETL(ExtractTransformLoad):
    def __init__(self):
        self.HOUSING_FTP_URL = (
            "https://htaindex.cnt.org/download/download.php?focus=tract&geoid="
        )
        self.OUTPUT_PATH = (
            self.DATA_PATH / "dataset" / "housing_and_transportation_index"
        )
        self.df: pd.DataFrame

    def extract(self) -> None:
        # Download each state / territory individually
        dfs = []
        zip_file_dir = self.get_tmp_path() / "housing_and_transportation_index"
        for fips in get_state_fips_codes(self.DATA_PATH):
            logger.info(
                f"Downloading housing data for state/territory with FIPS code {fips}"
            )

            unzip_file_from_url(
                f"{self.HOUSING_FTP_URL}{fips}",
                self.get_tmp_path(),
                zip_file_dir,
            )

            # New file name:
            tmp_csv_file_path = (
                zip_file_dir / f"htaindex_data_tracts_{fips}.csv"
            )

            try:
                tmp_df = pd.read_csv(filepath_or_buffer=tmp_csv_file_path)
            except EmptyDataError:
                logger.error(
                    f"Could not read Housing and Transportation data for state/territory with FIPS code {fips}"
                )

            dfs.append(tmp_df)

        self.df = pd.concat(dfs)

    def transform(self) -> None:
        logger.info("Transforming Housing and Transportation Data")

        # Rename and reformat tract ID
        self.df.rename(
            columns={"tract": self.GEOID_TRACT_FIELD_NAME}, inplace=True
        )
        self.df[self.GEOID_TRACT_FIELD_NAME] = self.df[
            self.GEOID_TRACT_FIELD_NAME
        ].str.replace('"', "")

    def load(self) -> None:
        logger.info("Saving Housing and Transportation Data")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
