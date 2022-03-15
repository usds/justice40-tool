# pylint: disable=protected-access,unsubscriptable-object
import copy
import os
import pathlib
from typing import Type
import pytest

import numpy as np
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.tests.sources.example.etl import ExampleETL
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestETL:
    """A base class that can be inherited by all other ETL tests.
    Note: every method that does *not* need to be reimplemented by child classes has
    the test name pattern of `test_*_base`. All other tests need to be reimplemented.
    This uses pytest-snapshot.

    To update individual snapshots: $ poetry run pytest
            data_pipeline/tests/sources/national_risk_index/test_etl.py::TestClassNameETL::<testname>
            --snapshot-update
    """

    # In every child test class, change this to the class of the ETL being tested.
    _ETL_CLASS = ExampleETL

    # The following constants do not need to be updated in child class.
    _EXTRACT_CSV_FILE_NAME = "extract.csv"
    _TRANSFORM_CSV_FILE_NAME = "transform.csv"
    _OUTPUT_CSV_FILE_NAME = "output.csv"
    _FLOAT_FORMAT = "%.10f"

    # This *does* need to be updated in the child class. It specifies where the "sample data" is
    # so that we do not have to manually copy the "sample data" when we run the tests.
    _SAMPLE_DATA_PATH = pathlib.Path(__file__).parents[0] / "data"
    _SAMPLE_DATA_FILE_NAME = "input.csv"
    _SAMPLE_DATA_ZIP_FILE_NAME = "input.zip"
    _EXTRACT_TMP_FOLDER_NAME = "ExampleETL"

    # Note: We used shared census tract IDs so that later our tests can join all the
    # ETL results together and generate a test score. This join is only possible if
    # we use the same tract IDs across fixtures.
    # The test fixtures may also contain other tract IDs that are not on this list.
    _FIXTURES_SHARED_TRACT_IDS = [
        "06007040300",
        "06001020100",
        "06007040500",
        "15001021010",
        "15001021101",
        "15007040603",
        "15007040700",
        "15009030100",
        "15009030201",
        "15001021402",
        "15001021800",
        "15009030402",
        "15009030800",
        "15003010201",
        "15007040604",
    ]

    _DATA_DIRECTORY_FOR_TEST: pathlib.PosixPath

    def setup_method(self, _method, filename=__file__):
        """Before every test, set the data directory for the test.
        Uses the directory of the test class to infer the data directory.
        pytest does not support classes with an `__init__`. Instead, we use this
        `setup_method` which pytest will run before every test method is run.
        For now, all child classes inheriting this need to reimplement this, but can
        use the same line of code regardless of the child class:
        ```
            def setup_method(self, _method, filename=__file__):
            '''Invoke `setup_method` from Parent, but using the current file name
            This code can be copied identically between all child classes.
            '''
            super().setup_method(_method=_method, filename=filename)
        ```
        """
        self._DATA_DIRECTORY_FOR_TEST = pathlib.Path(filename).parent / "data"

    def _get_instance_of_etl_class(self) -> Type[ExtractTransformLoad]:
        return self._ETL_CLASS()

    def _setup_etl_instance_and_run_extract(
        self, mock_etl, mock_paths
    ) -> ExtractTransformLoad:
        """Method to setup an ETL instance with proper upstream mocks to run extract.
        This must be re-implemented in every child class.

        This method can be used by multiple tests that need to run the same fixtures
        that need these same mocks.

        In order to re-implement this method, usually it will involve a
        decent amount of work to monkeypatch `requests` or another method that's
        used to retrieve data in order to force that method to retrieve the fixture
        data.
        """
        # When running this in child classes, make sure the child class re-implements
        # this method.
        if self._ETL_CLASS is not ExampleETL:
            raise NotImplementedError(
                "Prepare and run extract method not defined for this class."
            )

        # The rest of this method applies for `ExampleETL` only.
        etl = self._get_instance_of_etl_class()
        etl.extract()

        return etl

    def test_init_base(self, mock_etl, mock_paths):
        """Test whether class has appropriate parameters set.
        Can be run without modification for all child classes.
        """
        # Setup
        etl = self._get_instance_of_etl_class()
        data_path, tmp_path = mock_paths

        assert etl.DATA_PATH == data_path
        assert etl.TMP_PATH == tmp_path

        # Also make sure all parameters that need to be non-null are non-null
        assert etl.NAME is not None
        assert etl.LAST_UPDATED_YEAR is not None
        assert etl.SOURCE_URL is not None
        assert etl.GEO_LEVEL is not None
        assert etl.COLUMNS_TO_KEEP is not None
        assert len(etl.COLUMNS_TO_KEEP) > 0
        # No duplicate columns to keep
        assert len(etl.COLUMNS_TO_KEEP) == len(set(etl.COLUMNS_TO_KEEP))

        # Check certain parameters are set.
        assert etl.EXPECTED_MAX_CENSUS_BLOCK_GROUPS == 250000
        assert etl.EXPECTED_MAX_CENSUS_TRACTS == 74160
        assert etl.EXPECTED_CENSUS_TRACTS_CHARACTER_LENGTH == 11
        assert etl.EXPECTED_CENSUS_BLOCK_GROUPS_CHARACTER_LENGTH == 13

    def test_get_output_file_path_base(self, mock_etl, mock_paths):
        """Test file path method.
        Can be run without modification for all child classes,
        except those that do not produce usa.csv files.
        """
        etl = self._get_instance_of_etl_class()
        data_path, tmp_path = mock_paths

        actual_file_path = etl._get_output_file_path()

        expected_file_path = (
            data_path
            / "dataset"
            / f"{etl.NAME}_{etl.LAST_UPDATED_YEAR}"
            / "usa.csv"
        )

        logger.info(f"Expected: {expected_file_path}")

        assert actual_file_path == expected_file_path

    def test_fixtures_contain_shared_tract_ids_base(self, mock_etl, mock_paths):
        """Check presence of necessary shared tract IDs.
        Note: We used shared census tract IDs so that later our tests can join all the
        ETL results together and generate a test score. This join is only possible if
        we use the same tract IDs across fixtures.
        Can be run without modification for all child classes.
        """
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )
        etl.transform()

        # These tests work differently based on the ValidGeoLevel of the ETL class.
        if etl.GEO_LEVEL == ValidGeoLevel.CENSUS_TRACT:
            missing_tract_ids = np.setdiff1d(
                self._FIXTURES_SHARED_TRACT_IDS,
                etl.output_df[ExtractTransformLoad.GEOID_TRACT_FIELD_NAME],
            )

            if len(missing_tract_ids) > 0:
                assert False, (
                    "Fixture data is missing the following necessary tract "
                    f"IDs: {missing_tract_ids}"
                )
        else:
            raise NotImplementedError("This geo level not tested yet.")

    def test_sample_data_exists(self):
        """This will test that the sample data exists where it's supposed to as it's supposed to
        As per conversation with Jorge, here we can *just* test that the zip file exists.
        """
        assert (
            self._SAMPLE_DATA_PATH / self._SAMPLE_DATA_ZIP_FILE_NAME
        ).exists()

    def test_extract_unzips_base(self, mock_etl, mock_paths):
        """Tests the extract method.

        As per conversation with Jorge, no longer includes snapshot. Instead, verifies that the
        file was unzipped from a "fake" downloaded zip (located in data) in a  temporary path.
        """
        tmp_path = mock_paths[1]

        _ = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )
        assert (
            tmp_path
            / self._EXTRACT_TMP_FOLDER_NAME
            / self._SAMPLE_DATA_FILE_NAME
        ).exists()

    def test_extract_produces_valid_data(self, snapshot, mock_etl, mock_paths):
        """Tests the extract method.

        Here we are verifying that the data that we extract is "readable". I added a snapshot to be thorough,
        but @Jorge -- do you think this is necessary?
        """
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl,
            mock_paths=mock_paths,
        )
        tmp_df = pd.read_csv(
            etl.get_tmp_path() / self._SAMPLE_DATA_FILE_NAME,
            dtype={etl.GEOID_TRACT_FIELD_NAME: str},
        )
        snapshot.snapshot_dir = self._DATA_DIRECTORY_FOR_TEST
        snapshot.assert_match(
            tmp_df.to_csv(index=False, float_format=self._FLOAT_FORMAT),
            self._EXTRACT_CSV_FILE_NAME,
        )

    def test_transform_base(self, snapshot, mock_etl, mock_paths):
        """Tests the transform method.

        This verifies that when we extract the data, we can then read it in"""
        # setup - copy sample data into tmp_dir
        etl = self._setup_etl_instance_and_run_extract(mock_etl, mock_paths)
        etl.transform()

        snapshot.snapshot_dir = self._DATA_DIRECTORY_FOR_TEST
        snapshot.assert_match(
            etl.output_df.to_csv(index=False, float_format=self._FLOAT_FORMAT),
            self._TRANSFORM_CSV_FILE_NAME,
        )

    def test_transform_sets_output_df_base(self, mock_etl, mock_paths):
        """This test ensures that the transform step sets its results to `output_df`.
        Can be run without modification for all child classes.
        """
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )
        etl.transform()

        assert etl.output_df is not None

        # Assert it has some rows
        assert etl.output_df.shape[0] > 0

        # Check that it has all columns
        for col in etl.COLUMNS_TO_KEEP:
            assert col in etl.output_df.columns, f"{col} is missing from output"

    def test_load_base(self, snapshot, mock_etl, mock_paths):
        """Test load method.
        Can be run without modification for all child classes.
        """
        # setup - input variables
        etl = self._get_instance_of_etl_class()

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

    def test_validate_base(self, mock_etl, mock_paths):
        """Every ETL class should have proper validation.
        Can be run without modification for all child classes.
        """
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )
        etl.transform()

        # Transform is guaranteed to set a dataframe on etl.output_df.
        # We can modify this data frame to test validation steps.
        actual_output_df = etl.output_df

        # These tests work differently based on the ValidGeoLevel of the ETL class.
        if etl.GEO_LEVEL == ValidGeoLevel.CENSUS_TRACT:
            # Remove geo field and make sure error occurs.
            etl_without_geo_field = copy.deepcopy(etl)
            columns_to_keep = [
                column_to_keep
                for column_to_keep in actual_output_df.columns
                if column_to_keep != ExtractTransformLoad.GEOID_TRACT_FIELD_NAME
            ]
            etl_without_geo_field.output_df = actual_output_df[columns_to_keep]

            with pytest.raises(ValueError) as error:
                etl_without_geo_field.validate()
            assert str(error.value).startswith("Missing column:")

            # Make sure too many rows throws error.
            etl_with_too_many_rows = copy.deepcopy(etl)
            etl_with_too_many_rows.EXPECTED_MAX_CENSUS_TRACTS = (
                actual_output_df.shape[0] - 1
            )
            with pytest.raises(ValueError) as error:
                etl_with_too_many_rows.validate()
            assert str(error.value).startswith("Too many rows:")

            # Make sure multiple geo field character length throws error.
            etl_with_multiple_char_lengths = copy.deepcopy(etl)
            etl_with_multiple_char_lengths.output_df = actual_output_df.copy(
                deep=True
            )
            etl_with_multiple_char_lengths.output_df.loc[
                0, ExtractTransformLoad.GEOID_TRACT_FIELD_NAME
            ] = "060070403001"

            with pytest.raises(ValueError) as error:
                etl_with_multiple_char_lengths.validate()
            assert str(error.value).startswith("Multiple character lengths")

            # Make sure wrong geo field character length throws error.
            etl_with_wrong_geo_field_character_length = copy.deepcopy(etl)
            etl_with_wrong_geo_field_character_length.output_df = (
                actual_output_df.copy(deep=True)
            )
            etl_with_wrong_geo_field_character_length.output_df[
                ExtractTransformLoad.GEOID_TRACT_FIELD_NAME
            ] = "060070403001"

            with pytest.raises(ValueError) as error:
                etl_with_wrong_geo_field_character_length.validate()
            assert str(error.value).startswith("Wrong character length")

            # Make duplicate tract IDs throws error.
            etl_with_duplicate_geo_field = copy.deepcopy(etl)
            etl_with_duplicate_geo_field.output_df = actual_output_df.copy(
                deep=True
            )
            etl_with_duplicate_geo_field.output_df.loc[
                0:1, ExtractTransformLoad.GEOID_TRACT_FIELD_NAME
            ] = "06007040300"
            with pytest.raises(ValueError) as error:
                etl_with_duplicate_geo_field.validate()
            assert str(error.value).startswith("Duplicate values:")

        elif etl.GEO_LEVEL == ValidGeoLevel.CENSUS_BLOCK_GROUP:
            # Remove geo field and make sure error occurs.
            etl_without_geo_field = copy.deepcopy(etl)
            columns_to_keep = [
                column_to_keep
                for column_to_keep in actual_output_df.columns
                if column_to_keep != ExtractTransformLoad.GEOID_FIELD_NAME
            ]
            etl_without_geo_field.output_df = actual_output_df[columns_to_keep]

            with pytest.raises(ValueError) as error:
                etl_without_geo_field.validate()
            assert str(error.value).startswith("Missing column:")

            # Make sure too many rows throws error.
            etl_with_too_many_rows = copy.deepcopy(etl)
            etl_with_too_many_rows.EXPECTED_MAX_CENSUS_BLOCK_GROUPS = (
                actual_output_df.shape[0] - 1
            )
            with pytest.raises(ValueError) as error:
                etl_with_too_many_rows.validate()
            assert str(error.value).startswith("Too many rows:")

            # Make sure multiple geo field character length throws error.
            etl_with_multiple_char_lengths = copy.deepcopy(etl)
            etl_with_multiple_char_lengths.output_df = actual_output_df.copy(
                deep=True
            )
            etl_with_multiple_char_lengths.output_df.loc[
                0, ExtractTransformLoad.GEOID_FIELD_NAME
            ] = "06007040300123"

            with pytest.raises(ValueError) as error:
                etl_with_multiple_char_lengths.validate()
            assert str(error.value).startswith("Multiple character lengths")

            # Make sure wrong geo field character length throws error.
            etl_with_wrong_geo_field_character_length = copy.deepcopy(etl)
            etl_with_wrong_geo_field_character_length.output_df = (
                actual_output_df.copy(deep=True)
            )
            etl_with_wrong_geo_field_character_length.output_df[
                ExtractTransformLoad.GEOID_FIELD_NAME
            ] = "06007040300123"

            with pytest.raises(ValueError) as error:
                etl_with_wrong_geo_field_character_length.validate()
            assert str(error.value).startswith("Wrong character length")

            # Make duplicate block group IDs throws error.
            etl_with_duplicate_geo_field = copy.deepcopy(etl)
            etl_with_duplicate_geo_field.output_df = actual_output_df.copy(
                deep=True
            )
            etl_with_duplicate_geo_field.output_df.loc[
                0:1, ExtractTransformLoad.GEOID_FIELD_NAME
            ] = "0600704030012"
            with pytest.raises(ValueError) as error:
                etl_with_duplicate_geo_field.validate()
            assert str(error.value).startswith("Duplicate values:")

        else:
            raise NotImplementedError("This geo level not tested yet.")

        # Remove another column to keep and make sure error occurs.
        etl_with_missing_column = copy.deepcopy(etl)
        columns_to_keep = actual_output_df.columns[:-1]
        etl_with_missing_column.output_df = actual_output_df[columns_to_keep]
        with pytest.raises(ValueError) as error:
            etl_with_missing_column.validate()
        assert str(error.value).startswith("Missing column:")

        # Test that validation on the original ETL works fine.
        etl.validate()

    def test_full_etl_base(self, mock_etl, mock_paths):
        """Every ETL class should be able to run end-to-end.
        Run extract, transform, validate, load, and get without error.
        Can be run without modification for all child classes.
        """
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )
        etl.transform()
        etl.validate()
        etl.load()
        etl.get_data_frame()

    def test_get_data_frame_base(self, mock_etl, mock_paths):
        """Every ETL class should be able to return its data frame.
        Can be run without modification for all child classes.
        """
        etl = self._setup_etl_instance_and_run_extract(
            mock_etl=mock_etl, mock_paths=mock_paths
        )

        # TODO: look into moving this file deletion to a setup/teardown method that
        #  applies to all methods. I struggled to get that to work because I couldn't
        #  pass `mock_etl` and `mock_paths`
        # Delete output file.
        output_file_path = etl._get_output_file_path()
        if os.path.exists(output_file_path):
            logger.info("Deleting output file created by other tests.")
            os.remove(output_file_path)

        # Run more steps to generate test data.
        etl.transform()
        etl.validate()

        # At this point, `get_data_frame` should error since file hasn't been written.
        with pytest.raises(ValueError) as error:
            etl.get_data_frame()
        assert str(error.value).startswith("Make sure to run ETL")

        # Run `load` step to write it to disk.
        etl.load()

        output_df = etl.get_data_frame()

        # Check that all columns are present
        for column_to_keep in etl.COLUMNS_TO_KEEP:
            assert (
                column_to_keep in output_df.columns
            ), f"Missing column: `{column_to_keep}` is missing from output"

        # Make sure geo fields are read in as strings:
        if etl.GEO_LEVEL == ValidGeoLevel.CENSUS_TRACT:
            assert pd.api.types.is_string_dtype(
                output_df[ExtractTransformLoad.GEOID_TRACT_FIELD_NAME]
            )

        elif etl.GEO_LEVEL == ValidGeoLevel.CENSUS_BLOCK_GROUP:
            assert pd.api.types.is_string_dtype(
                output_df[ExtractTransformLoad.GEOID_FIELD_NAME]
            )

        else:
            raise NotImplementedError("This geo level not tested yet.")
