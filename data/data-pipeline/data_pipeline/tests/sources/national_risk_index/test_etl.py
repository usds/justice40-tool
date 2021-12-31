from unittest import mock

import filecmp
import pandas as pd
import requests

from data_pipeline.config import settings
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.tests.conftest import copy_data_files
from data_pipeline.etl.sources.national_risk_index.etl import (
    NationalRiskIndexETL,
)

DATA_DIR = (
    settings.APP_ROOT / "tests" / "sources" / "national_risk_index" / "data"
)

"""
Set UPDATE_TEST_FIXTURES to `True` temporarily to allow you to quickly update the test
fixtures based on intentional changes to the logic of the method.

However, note a few things first:

1. Do *not* update these fixtures if you did not expect the ETL results to change.

2. This should never be set to `True` in committed code. It should only be used
temporarily to quickly update the fixtures.

3. If the source data itself changes (e.g., the external source renames a column),
update the "furthest upstream" test fixture which, in this case, is the .zip file.
Then running `UPDATE_TEST_FIXTURES = True` will update all subsequent files.

If you're confused by any of this, ask for help, it's confusing :).
"""
UPDATE_TEST_FIXTURES = False


class TestNationalRiskIndexETL:
    def test_update_test_fixtures(self, mock_paths, mock_etl):
        """Assert that UPDATE_TEST_FIXTURES is False."""
        if UPDATE_TEST_FIXTURES:
            # When updating the test fixtures, run them in order, so that each one
            # updates the files used by the next method.
            # pylint: disable=no-value-for-parameter
            self.test_extract(mock_paths=mock_paths)
            self.test_transform(mock_etl=mock_etl)
            self.test_load(mock_etl=mock_etl)

        # UPDATE_TEST_FIXTURES should never be True outside of temporarily setting
        # it to True to quickly update the test fixtures.
        assert UPDATE_TEST_FIXTURES is False

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

        # validation
        assert etl.DATA_PATH == data_path
        assert etl.TMP_PATH == tmp_path
        assert etl.INPUT_CSV == input_csv
        assert etl.GEOID_FIELD_NAME == "GEOID10"
        assert etl.GEOID_TRACT_FIELD_NAME == "GEOID10_TRACT"
        assert etl.NAME == "national_risk_index"
        assert etl.LAST_UPDATED_YEAR == 2020
        assert (
            etl.SOURCE_URL
            == "https://hazards.fema.gov/nri/Content/StaticDocuments/DataDownload//NRI_Table_CensusTracts/NRI_Table_CensusTracts.zip"
        )
        assert etl.GEO_LEVEL == ValidGeoLevel.CENSUS_TRACT
        assert etl.COLUMNS_TO_KEEP == [
            etl.GEOID_TRACT_FIELD_NAME,
            etl.RISK_INDEX_EXPECTED_ANNUAL_LOSS_SCORE_FIELD_NAME,
            etl.EXPECTED_POPULATION_LOSS_RATE_FIELD_NAME,
            etl.EXPECTED_AGRICULTURE_LOSS_RATE_FIELD_NAME,
            etl.EXPECTED_BUILDING_LOSS_RATE_FIELD_NAME,
        ]

    def test_get_output_file_path(self, mock_etl, mock_paths):
        """Tests the right file name is returned."""
        etl = NationalRiskIndexETL()
        data_path, tmp_path = mock_paths

        output_file_path = etl._get_output_file_path()
        expected_output_file_path = (
            data_path / "dataset" / "national_risk_index_2020" / "usa.csv"
        )
        assert output_file_path == expected_output_file_path

    @mock.patch("data_pipeline.utils.requests")
    def test_extract(self, requests_mock, mock_paths):
        zip_file_fixture_src = DATA_DIR / "NRI_Table_CensusTracts.zip"
        tmp_path = mock_paths[1]

        # Create mock response.
        with open(zip_file_fixture_src, mode="rb") as file:
            file_contents = file.read()
        response_mock = requests.Response()
        response_mock.status_code = 200
        # pylint: disable=protected-access
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
        assert extracted_file_path.is_file()

        input_csv_path = DATA_DIR / "input.csv"

        # If temporarily updating test fixtures, write this extracted file as the
        # expected input file:
        if UPDATE_TEST_FIXTURES:
            copy_data_files(src=extracted_file_path, dst=input_csv_path)

        # Make sure extracted file is equal to the input fixture:
        assert filecmp.cmp(
            f1=extracted_file_path, f2=input_csv_path, shallow=False
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
        # execution
        etl.transform()
        transform_csv_path = DATA_DIR / "transform.csv"

        # If temporarily updating test fixtures, write this transformed dataframe
        # as the expected transform output file:
        if UPDATE_TEST_FIXTURES:
            etl.output_df.to_csv(path_or_buf=transform_csv_path, index=False)

        # validation
        expected = pd.read_csv(
            filepath_or_buffer=transform_csv_path,
            dtype={etl.GEOID_TRACT_FIELD_NAME: "string"},
        )

        assert etl.output_df.shape == (55, 370)
        pd.testing.assert_frame_equal(etl.output_df, expected)

    def test_load(self, mock_etl):
        """Tests the load() method for NationalRiskIndexETL

        Validates the following conditions:
        - The transformed dataframe is written to the directory specified by
          self.OUTPUT_DIR
        - The content of the file that's written matches the data in self.df
        """
        # setup - input variables
        etl = NationalRiskIndexETL()

        # setup - mock transform step
        df_transform = pd.read_csv(
            DATA_DIR / "transform.csv",
            dtype={etl.GEOID_TRACT_FIELD_NAME: "string"},
        )
        etl.output_df = df_transform

        # execution
        etl.load()
        actual_output_path = etl._get_output_file_path()
        actual_output = pd.read_csv(
            actual_output_path, dtype={etl.GEOID_TRACT_FIELD_NAME: str}
        )
        expected_output_csv_path = DATA_DIR / "output.csv"

        # If temporarily updating test fixtures, write this output data frame as the
        # expected output file:
        if UPDATE_TEST_FIXTURES:
            actual_output.to_csv(
                path_or_buf=expected_output_csv_path,
                index=False,
            )

        # setup - load expected output
        expected_output = pd.read_csv(
            filepath_or_buffer=expected_output_csv_path,
            dtype={etl.GEOID_TRACT_FIELD_NAME: str},
        )

        # validation
        assert actual_output_path.exists()
        assert actual_output.shape == (55, 5)
        pd.testing.assert_frame_equal(actual_output, expected_output)
