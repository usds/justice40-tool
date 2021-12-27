from unittest import mock

import filecmp
import pandas as pd
import requests

from data_pipeline.config import settings
from data_pipeline.tests.conftest import copy_data_files
from data_pipeline.etl.sources.national_risk_index.etl import (
    NationalRiskIndexETL,
)

DATA_DIR = (
    settings.APP_ROOT / "tests" / "sources" / "national_risk_index" / "data"
)


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

    @mock.patch("data_pipeline.utils.requests")
    def test_extract(self, requests_mock, mock_paths):
        zip_file_fixture_src = DATA_DIR / "NRI_Table_CensusTracts.zip"
        tmp_path = mock_paths[1]

        # Create mock response.
        with open(zip_file_fixture_src, mode="rb") as file:
            file_contents = file.read()
        response_mock = requests.Response()
        response_mock.status_code = 200
        response_mock._content = file_contents

        # Return text fixture:
        requests_mock.get = mock.MagicMock(return_value=response_mock)

        # Instantiate the ETL class.
        etl = NationalRiskIndexETL()

        # Monkey-patch the temporary directory to the one used in the test
        etl.TMP_PATH = tmp_path

        # Run the extract method.
        etl.extract()

        # Assert that we're calling the right URL.
        requests_mock.get.assert_called_with(
            "https://hazards.fema.gov/nri/Content/StaticDocuments/DataDownload//"
            "NRI_Table_CensusTracts/NRI_Table_CensusTracts.zip",
            verify=True,
        )

        # Assert that the extracted file exists
        extracted_file_path = tmp_path / "NRI_Table_CensusTracts.csv"
        assert extracted_file_path.exists()

        # Make sure extracted file is equal to the input fixture:
        assert filecmp.cmp(
            f1=extracted_file_path, f2=DATA_DIR / "input.csv", shallow=False
        )

    def test_transform(self, mock_etl):
        """Tests the transform() method for NationalRiskIndexETL

        Validates the following conditions:
        - The columns have been renamed correctly
        - The values for each tract has been applied to each of the block
          groups in that tract
        """
        # setup - copy sample data into tmp_dir
        etl = NationalRiskIndexETL()
        copy_data_files(src=DATA_DIR / "input.csv", dst=etl.INPUT_CSV)

        # setup - read in sample output as dataframe
        expected = pd.read_csv(
            DATA_DIR / "transform.csv",
            dtype={etl.GEOID_TRACT_FIELD_NAME: "string"},
        )

        # execution
        etl.transform()

        # validation
        assert etl.df.shape == (55, 370)
        pd.testing.assert_frame_equal(etl.df, expected)

    def test_load(self, mock_etl):
        """Tests the load() method for NationalRiskIndexETL

        Validates the following conditions:
        - The transformed dataframe is written to the directory specified by
          self.OUTPUT_DIR
        - The content of the file that's written matches the data in self.df
        """
        # setup - input variables
        etl = NationalRiskIndexETL()
        output_path = etl.OUTPUT_DIR / "usa.csv"

        # setup - mock transform step
        df_transform = pd.read_csv(
            DATA_DIR / "transform.csv",
            dtype={etl.GEOID_TRACT_FIELD_NAME: "string"},
        )
        etl.df = df_transform

        # setup - load expected output
        expected = pd.read_csv(DATA_DIR / "output.csv", dtype={etl.GEOID_TRACT_FIELD_NAME: str})

        # execution
        etl.load()
        output = pd.read_csv(output_path, dtype={etl.GEOID_TRACT_FIELD_NAME: str})

        # validation
        assert output_path.exists()
        assert output.shape == (55, 5)
        pd.testing.assert_frame_equal(output, expected)
