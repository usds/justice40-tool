# pylint: disable=protected-access
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
from data_pipeline.tests.sources.test_etl_base import TestETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestNationalRiskIndexETL(TestETL):
    _ETL_CLASS = NationalRiskIndexETL
    _DATA_DIRECTORY_FOR_TEST = (
        settings.APP_ROOT / "tests" / "sources" / "national_risk_index" / "data"
    )

    def _setup_etl_instance_and_run_extract(self, mock_etl, mock_paths):
        with mock.patch("data_pipeline.utils.requests") as requests_mock:
            zip_file_fixture_src = (
                self._DATA_DIRECTORY_FOR_TEST / "NRI_Table_CensusTracts.zip"
            )
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

        return etl

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

    # TODO: Add a flag to make this run only when pytest is run with an argument.
    def test_update_test_fixtures(self, mock_etl, mock_paths):
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )

        # After running extract, write the results as the "input.csv" in the test
        # directory.
        copy_data_files(
            src=etl.INPUT_CSV,
            dst=self._DATA_DIRECTORY_FOR_TEST / self._INPUT_CSV_FILE_NAME,
        )

        # After running transform, write the results as the "transform.csv" in the test
        # directory.
        etl.transform()
        etl.output_df.to_csv(
            path_or_buf=self._DATA_DIRECTORY_FOR_TEST
            / self._TRANSFORM_CSV_FILE_NAME,
            index=False,
        )

        # After running load, write the results as the "output.csv" in the test
        # directory.
        etl.load()
        copy_data_files(
            src=etl._get_output_file_path(),
            dst=self._DATA_DIRECTORY_FOR_TEST / self._OUTPUT_CSV_FILE_NAME,
        )

    def test_extract(self, mock_etl, mock_paths):
        tmp_path = mock_paths[1]
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )

        # Assert that the extracted file exists
        extracted_file_path = tmp_path / "NRI_Table_CensusTracts.csv"
        assert extracted_file_path.is_file()

        input_csv_path = (
            self._DATA_DIRECTORY_FOR_TEST / self._INPUT_CSV_FILE_NAME
        )

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
        copy_data_files(
            src=self._DATA_DIRECTORY_FOR_TEST / self._INPUT_CSV_FILE_NAME,
            dst=etl.INPUT_CSV,
        )

        # setup - read in sample output as dataframe
        # execution
        etl.transform()

        transform_csv_path = (
            self._DATA_DIRECTORY_FOR_TEST / self._TRANSFORM_CSV_FILE_NAME
        )

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
            self._DATA_DIRECTORY_FOR_TEST / self._TRANSFORM_CSV_FILE_NAME,
            dtype={etl.GEOID_TRACT_FIELD_NAME: "string"},
        )
        etl.output_df = df_transform

        # execution
        etl.load()

        # Make sure it creates the file.
        actual_output_path = etl._get_output_file_path()
        assert actual_output_path.exists()

        actual_output = pd.read_csv(
            actual_output_path, dtype={etl.GEOID_TRACT_FIELD_NAME: str}
        )
        expected_output_csv_path = (
            self._DATA_DIRECTORY_FOR_TEST / self._OUTPUT_CSV_FILE_NAME
        )

        # setup - load expected output
        expected_output = pd.read_csv(
            filepath_or_buffer=expected_output_csv_path,
            dtype={etl.GEOID_TRACT_FIELD_NAME: str},
        )

        # validation
        assert actual_output.shape == (55, 5)
        pd.testing.assert_frame_equal(actual_output, expected_output)
