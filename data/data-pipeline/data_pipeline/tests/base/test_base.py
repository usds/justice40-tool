import shutil
from pathlib import Path

import yaml
import pytest
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad

TEST_DIR = settings.APP_ROOT / "tests" / "base"
DATA_DIR = TEST_DIR / "data"


class TemplateETL(ExtractTransformLoad):
    """Mock ETL class that inherits from the base ETL"""

    def __init__(self, config_path: Path) -> None:
        super().__init__(config_path, is_dataset=True)
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
        config_path = TEST_DIR / "config.yaml"
        etl = TemplateETL(config_path)
        # validation
        etl.NAME == "Template"
        etl.SOURCE_URL == "https://github.com/usds/justice40-tool/"
        etl.GEOID_COL == "GEO COL"
        etl.GEO_LEVEL == "Census Block Group"
        etl.SCORE_COLS == ["COL 1", "COL 2", "COL 3"]
        etl.OUTPUT_PATH == data_path / "dataset" / "template"

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
        config_path = TEST_DIR / "config.yaml"
        etl = TemplateETL(config_path)
        # setup - load output file
        output_src = DATA_DIR / "output.csv"
        etl.OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(output_src, etl.OUTPUT_PATH)
        # setup - load csv file
        census_src = DATA_DIR / "census.csv"
        etl.CENSUS_CSV.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(census_src, etl.CENSUS_CSV)
        # validation
        etl.validate_output()
