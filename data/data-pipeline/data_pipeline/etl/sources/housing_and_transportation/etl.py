import pandas as pd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger
from data_pipeline.utils import unzip_file_from_url
from pandas.errors import EmptyDataError

logger = get_module_logger(__name__)


class HousingTransportationETL(ExtractTransformLoad):

    def __init__(self):

        self.OUTPUT_PATH = (
            self.DATA_PATH / "dataset" / "housing_and_transportation_index"
        )
        self.df: pd.DataFrame


    def get_data_sources(self) -> [DataSource]:
        
        self.housing_url = (
            "https://htaindex.cnt.org/download/download.php?focus=tract&geoid="
        )
        
        sources = []
        
        for fips in get_state_fips_codes(self.DATA_PATH):
            sources.append(ZIPDataSource(self.__class__.__name__, source=f"{self.housing_url}{fips}", download=self.get_tmp_path(), destination=self.get_sources_path()))
            
        return sources


    def extract(self) -> None:
        # Download each state / territory individually
        dfs = []
        for fips in get_state_fips_codes(self.DATA_PATH):

            csv_source = (
                self.get_sources_path() / f"htaindex2019_data_tracts_{fips}.csv"
            )

            try:
                tmp_df = pd.read_csv(filepath_or_buffer=csv_source)
            except EmptyDataError:
                logger.error(
                    f"Could not read Housing and Transportation data for state/territory with FIPS code {fips}"
                )

            dfs.append(tmp_df)

        self.df = pd.concat(dfs)


    def transform(self) -> None:
        # Rename and reformat tract ID
        self.df.rename(
            columns={"tract": self.GEOID_TRACT_FIELD_NAME}, inplace=True
        )
        self.df[self.GEOID_TRACT_FIELD_NAME] = self.df[
            self.GEOID_TRACT_FIELD_NAME
        ].str.replace('"', "")

    def load(self) -> None:
        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False)
