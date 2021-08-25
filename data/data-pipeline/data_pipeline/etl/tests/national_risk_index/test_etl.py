from pathlib import Path
from shutil import copyfile

import pytest
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.sources.national_risk_index.etl import (
    NationalRiskIndexETL,
)

DATA_DIR = settings.APP_ROOT / "etl" / "tests" / "national_risk_index" / "data"


def copy_data_files(src: Path, dst: Path) -> None:
    """Copies test data from src Path to dst Path for use in testing

    Args
        src: pathlib.Path instance. The location of the source data file.
        dst: pathlib.Path instance. Where to copy the source data file to.

    Returns
        None. This is a void function
    """
    if not dst.exists():
        dst.parent.mkdir(parents=True, exist_ok=True)
        copyfile(src, dst)
        assert dst.exists()


class TestNationalRiskIndexETL:
    def test_init(self, mock_etl, mock_paths):
        """Tests that the mock NationalRiskIndexETL class instance was
        initiliazed correctly.

        Validates the following conditions:
        - self.DATA_PATH points to the "data" folder in the temp directory
        - self.TMP_PATH points to the "data/tmp" folder in the temp directory
        - self.INPUT_PATH points to the correct path in the temp directory
        - self.OUTPUT_PATH points to the correct path in the temp directory
        """
        # setup
        etl = NationalRiskIndexETL()
        data_path, tmp_path = mock_paths
        input_csv = tmp_path / "NRI_Table_CensusTracts.csv"
        output_dir = data_path / "dataset" / "national_risk_index_2020"
        # validation
        assert etl.DATA_PATH == data_path
        assert etl.TMP_PATH == tmp_path
        assert etl.INPUT_CSV == input_csv
        assert etl.OUTPUT_DIR == output_dir
        assert etl.GEOID_FIELD_NAME == "GEOID10"
        assert etl.GEOID_TRACT_FIELD_NAME == "GEOID10_TRACT"

    def test_transform(self, mock_etl):
        """Tests the transform() method for NationalRiskIndexETL

        Validates the following conditions:
        - The columns have been renamed correctly
        - The values for each tract has been applied to each of the block
          groups in that tract
        """
        # setup - copy sample data into tmp_dir
        etl = NationalRiskIndexETL()
        input_src = DATA_DIR / "input.csv"
        input_dst = etl.INPUT_CSV
        acs_src = DATA_DIR / "acs.csv"
        acs_dst = DATA_DIR / etl.BLOCK_GROUP_CSV
        for src, dst in [(input_src, input_dst), (acs_src, acs_dst)]:
            copy_data_files(src, dst)
        # setup - read in sample output as dataframe
        TRACT_COL = etl.GEOID_TRACT_FIELD_NAME
        BLOCK_COL = etl.GEOID_FIELD_NAME
        expected = pd.read_csv(
            DATA_DIR / "output.csv",
            dtype={BLOCK_COL: "string", TRACT_COL: "string"},
        )
        # execution
        etl.transform()
        # validation
        assert etl.df.shape == (10, 6)
        assert etl.df.equals(expected)

    def test_load(self, mock_etl):
        """Tests the load() method for NationalRiskIndexETL

        Validates the following conditions:
        - The transformed dataframe is written to the directory specified by
          self.OUTPUT_DIR
        - The content of the file that's written matches the data in self.df
        """
        # setup
        etl = NationalRiskIndexETL()
        output_path = etl.OUTPUT_DIR / "usa.csv"
        TRACT_COL = etl.GEOID_TRACT_FIELD_NAME
        BLOCK_COL = etl.GEOID_FIELD_NAME
        expected = pd.read_csv(
            DATA_DIR / "output.csv",
            dtype={BLOCK_COL: str, TRACT_COL: str},
        )
        etl.df = expected
        # execution
        etl.load()
        output = pd.read_csv(
            output_path, dtype={BLOCK_COL: str, TRACT_COL: str}
        )
        # validation
        assert output_path.exists()
        assert output.equals(expected)
