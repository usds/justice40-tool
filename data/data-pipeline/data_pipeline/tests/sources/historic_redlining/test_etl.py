# pylint: disable=protected-access
import pathlib

import pandas as pd
from data_pipeline.etl.sources.historic_redlining.etl import (
    HistoricRedliningETL,
)
from data_pipeline.tests.sources.example.test_etl import TestETL


class TestHistoricRedliningETL(TestETL):
    _ETL_CLASS = HistoricRedliningETL

    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "HRS_2010.xlsx"
    _SAMPLE_DATA_ZIP_FILE_NAME = "HRS_2010.zip"
    _EXTRACT_TMP_FOLDER_NAME = "HistoricRedliningETL"

    def setup_method(self, _method, filename=__file__):
        """Invoke `setup_method` from Parent, but using the current file name.

        This code can be copied identically between all child classes.
        """
        super().setup_method(_method=_method, filename=filename)

    def test_extract_produces_valid_data(self, snapshot, mock_etl, mock_paths):
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )
        tmp_df = pd.read_excel(
            etl.get_sources_path() / self._SAMPLE_DATA_FILE_NAME,
            dtype={etl.GEOID_TRACT_FIELD_NAME: str},
        )
        assert tmp_df.shape == (15, 5)

    def test_load_base(self, snapshot, mock_etl, mock_paths):
        """Test load method.
        We need to run transform here for real to add
        the dynamic cols to keep
        """
        # setup - input variables
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )
        etl.transform()
        etl.load()

        # Make sure it creates the file.
        actual_output_path = etl._get_output_file_path()
        assert actual_output_path.exists()

        # Check COLUMNS_TO_KEEP remain
        actual_output = pd.read_csv(
            actual_output_path, dtype={etl.GEOID_TRACT_FIELD_NAME: str}
        )

        for col in etl.COLUMNS_TO_KEEP:
            assert col in actual_output.columns, f"{col} is missing from output"

        # Check the snapshots
        snapshot.snapshot_dir = self._DATA_DIRECTORY_FOR_TEST
        snapshot.assert_match(
            actual_output.to_csv(index=False, float_format=self._FLOAT_FORMAT),
            self._OUTPUT_CSV_FILE_NAME,
        )
