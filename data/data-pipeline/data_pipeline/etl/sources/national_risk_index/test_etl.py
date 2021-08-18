import os
from shutil import copyfile

import pytest
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.sources.national_risk_index.etl import NationalRiskIndexETL

DIR_ROOT = settings.APP_ROOT / "etl" / "sources" / "national_risk_index"
DATA_DIR = DIR_ROOT / "test_data"
TMP_DIR = DIR_ROOT / "tmp_dir"


@pytest.fixture(scope="session")
def mock_paths(tmp_path_factory) -> tuple:
    """Creates new DATA_PATH and TMP_PATH that point to a temporary local
    file structure that can be used to mock data folder during testing
    """
    # sets location of the temp directory inside the national_risk_index folder
    os.environ["PYTEST_DEBUG_TEMPROOT"] = str(TMP_DIR)
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    # creates DATA_PATH and TMP_PATH directories in temp directory
    data_path = tmp_path_factory.mktemp("data", numbered=False)
    tmp_path = data_path / "tmp"
    tmp_path.mkdir()
    return data_path, tmp_path


@pytest.fixture
def mock_etl(monkeypatch, mock_paths) -> NationalRiskIndexETL:
    """Creates a mock version of the base ExtractTransformLoad class and resets
    global the variables for DATA_PATH and TMP_PATH to the local mock_paths
    """
    data_path, tmp_path = mock_paths
    monkeypatch.setattr(ExtractTransformLoad, "DATA_PATH", data_path)
    monkeypatch.setattr(ExtractTransformLoad, "TMP_PATH", tmp_path)
    etl = NationalRiskIndexETL()
    return etl


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
        etl = mock_etl
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

    def test_extract(self, mock_etl):
        """Tests the extract() method for NationalRiskIndexETL

        Validates the following conditions:
        - The unzipped folder is stored in self.TMP_PATH
        - There are three files in the resulting unzipped folder
        """
        # TODO: mock this test out with a locally zipped file
        # mock_etl.extract()
        assert 1

    def test_transform(self, mock_etl):
        """Tests the transform() method for NationalRiskIndexETL

        Validates the following conditions:
        - The columns have been renamed correctly
        - The values for each tract has been applied to each of the block
          groups in that tract
        """
        # setup - copy sample data into tmp_dir
        etl = mock_etl
        input_src = DATA_DIR / "input.csv"
        input_dst = etl.INPUT_CSV
        acs_src = DATA_DIR / "acs.csv"
        acs_dst = DATA_DIR / etl.BLOCK_GROUP_CSV
        for src, dst in [(input_src, input_dst), (acs_src, acs_dst)]:
            if not dst.exists():
                dst.parent.mkdir(parents=True, exist_ok=True)
                copyfile(src, dst)
                assert dst.exists()
        # setup - read in sample output as dataframe
        TRACT_COL = etl.GEOID_TRACT_FIELD_NAME
        BLOCK_COL = etl.GEOID_FIELD_NAME
        expected = pd.read_csv(
            DATA_DIR / "output.csv",
            dtype={BLOCK_COL: str, TRACT_COL: str},
        )
        # execution
        etl.transform()
        expected_dict = expected.to_dict("records")
        output_dict = etl.df.to_dict("records")
        print(type(etl.df))
        # validation
        assert etl.df.shape == (10, 6)
        assert list(etl.df.columns) == list(expected.columns)
        for i, record in enumerate(output_dict):
            assert record == expected_dict[i]

    def test_load(self, mock_etl):
        """Tests the load() method for NationalRiskIndexETL

        Validates the following conditions:
        - The transformed dataframe is written to the directory specified by
          self.OUTPUT_DIR
        - The content of the file that's written matches the data in self.df
        """
        # setup
        etl = mock_etl
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
        output = pd.read_csv(output_path, dtype={BLOCK_COL: str, TRACT_COL: str})
        # validation
        assert output_path.exists()
        assert output.equals(expected)
