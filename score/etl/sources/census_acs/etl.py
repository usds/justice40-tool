from etl.base import Etl
from etl.sources.census.etl_utils import get_state_fips_codes, unzip_file_from_url


class CensusACS(Etl):
    def __init__(self):
        self.ACS_YEAR = 2019
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / f"census_acs_{ACS_YEAR}"
        self.GEOID_FIELD_NAME = "GEOID10"
        self.UNEMPLOYED_FIELD_NAME = "Unemployed Civilians (fraction)"

    @staticmethod
    def extract(source_url: str, extract_path: Path):
        unzip_file_from_url(source_url, TMP_PATH, extract_path)
