import shutil
from pathlib import Path

import yaml
import pytest
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad

TEST_DIR = settings.APP_ROOT / "tests" / "base"
DATA_DIR = TEST_DIR / "data"
CONFIG_PATH = TEST_DIR / "config.yaml"
OUTPUT_SRC = DATA_DIR / "output.csv"


def remove_output(etl):
    """Clears output.csv if it is exists"""
    etl = TemplateETL(CONFIG_PATH)
    if etl.OUTPUT_PATH.exists():
        etl.OUTPUT_PATH.unlink()
    assert etl.OUTPUT_PATH.exists() is False


def load_output_source(etl):
    """Loads output csv so that it can be modified"""
    df = pd.read_csv(
        OUTPUT_SRC,
        dtype={
            etl.GEOID_FIELD_NAME: "string",
            etl.GEOID_TRACT_FIELD_NAME: "string",
        }
    )
    return df


class TemplateETL(ExtractTransformLoad):
    """Mock ETL class that inherits from the base ETL"""

    def __init__(self, config_path: Path) -> None:
        super().__init__(config_path)
        self.EXTRACTED_CSV: Path = DATA_DIR / "output.csv"
        self.df: pd.DataFrame = None


class TestInit:
    """Tests the super.init() method in a class that inherits from
    ExtractTransformLoad"""

    def test_init(self, mock_paths, mock_etl):
        """Tests that the init method executes successfully

        Validates the following conditions:
        - The class was instantiated with no errors
        - All of the class attributes were set correctly by _get_yaml_config()
        """
        # setup
        data_path, tmp_path = mock_paths
        etl = TemplateETL(CONFIG_PATH)
        # validation
        assert etl.NAME == "Template"
        assert etl.SOURCE_URL == "https://github.com/usds/justice40-tool/"
        assert etl.GEOID_COL == "GEO COL"
        assert etl.GEO_LEVEL == "Census Block Group"
        assert etl.SCORE_COLS == ["COL 1", "COL 2", "COL 3"]
        assert etl.OUTPUT_PATH == data_path / "dataset" / "template"
        assert etl.CENSUS_CSV.exists()

    def test_init_missing_config(self, mock_etl):
        """Tests that FileNotFoundError is raised when the class is instantiated
        with a path to a config.yaml file that doesn't exist
        """
        # setup
        config_path = settings.APP_ROOT / "fake_path"
        assert config_path.exists() is False
        # execute
        with pytest.raises(FileNotFoundError):
            TemplateETL(config_path)

    def test_init_bad_config(self, mock_etl):
        """Tests that YAMLError is raised when the class is instantiated with
        a yaml file that has errors in it
        """
        # setup
        config_path = TEST_DIR / "invalid_config.yaml"
        assert config_path.exists()
        # execute
        with pytest.raises(yaml.YAMLError):
            TemplateETL(config_path)


class TestValidateOutput:
    """Tests the ExtractTransformLoad.validate_output() method"""

    def test_validate_output_success(self, mock_etl):
        """Tests that validate_output() runs successfully with valid output"""
        # setup - instantiate etl class
        etl = TemplateETL(CONFIG_PATH)
        # setup - load output file
        shutil.copyfile(OUTPUT_SRC, etl.OUTPUT_PATH)
        # validation
        etl.validate_output()

    def test_validate_output_missing_output(self, mock_etl):
        """Tests that validate_output() fails if the output isn't written to
        the location at self.OUTPUT_PATH
        """
        # setup - remove output file
        etl = TemplateETL(CONFIG_PATH)
        remove_output(etl)
        # validation
        with pytest.raises(AssertionError):
            etl.validate_output()

    def test_validate_missing_geoid_col(self, mock_etl):
        """Tests that validate_output() fails if the output is missing one of
        census fips codes columns
        """
        # setup - remove output file
        etl = TemplateETL(CONFIG_PATH)
        remove_output(etl)
        # setup - delete GEOID10 col from output
        df = load_output_source(etl)
        df.drop(etl.GEOID_FIELD_NAME, axis=1, inplace=True)
        assert etl.GEOID_FIELD_NAME not in df.columns
        df.to_csv(etl.OUTPUT_PATH)
        # validation
        with pytest.raises(KeyError):
            etl.validate_output()

    def test_validate_missing_census_block_group(self, mock_etl):
        """Tests that validate_output() fails if the output is missing one of
        census block group rows
        """
        # setup - remove output file
        etl = TemplateETL(CONFIG_PATH)
        remove_output(etl)
        # setup - remove the first Census Block Group
        df = load_output_source(etl)
        df.drop(index=df.index[0], axis=0, inplace=True)  # delete row 1
        assert len(df) == 9
        df.to_csv(etl.OUTPUT_PATH)
        # validation
        with pytest.raises(AssertionError):
            etl.validate_output()

    def test_validate_missing_score_col(self, mock_etl):
        """Tests that validate_output() fails if the output is missing one of
        the columns used in the score
        """
        # setup - remove output file
        etl = TemplateETL(CONFIG_PATH)
        remove_output(etl)
        # setup - delete one of the score columns
        df = load_output_source(etl)
        df.drop("COL 1", axis=1, inplace=True)
        assert "COL 1" not in df.columns
        df.to_csv(etl.OUTPUT_PATH)
        # validation
        with pytest.raises(AssertionError):
            etl.validate_output()
