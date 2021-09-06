from pathlib import Path

import yaml
import pytest
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad

TEST_DIR = settings.APP_ROOT / "tests" / "base"
DATA_DIR = TEST_DIR / "data"


class TemplateETL(ExtractTransformLoad):
    def __init__(self, config_path: Path) -> None:
        super().__init__(config_path, is_dataset=True)
        self.EXTRACTED_CSV: Path = DATA_DIR / "output.csv"
        self.df: pd.DataFrame = None


class TestInit:
    def test_init(self, mock_paths, mock_etl):
        # setup
        data_path, tmp_path = mock_paths
        config_path = TEST_DIR / "config.yaml"
        etl = TemplateETL(config_path)
        # validation
        etl.NAME == "Template"
        etl.SOURCE_URL == "https://github.com/usds/justice40-tool/"
        etl.GEO_COL == "GEO COL"
        etl.GEO_LEVEL == "Census Block Group"
        etl.SCORE_COLS == ["COL 1", "COL 2", "COL 3"]
        etl.OUTPUT_PATH == data_path / "dataset" / "template"

    def test_init_missing_config(self, mock_etl):
        # setup
        config_path = settings.APP_ROOT / "fake_path"
        assert config_path.exists() is False
        # execute
        with pytest.raises(FileNotFoundError):
            TemplateETL(config_path)

    def test_init_bad_config(self, mock_etl):
        # setup
        config_path = TEST_DIR / "invalid_config.yaml"
        assert config_path.exists()
        # execute
        with pytest.raises(yaml.YAMLError):
            TemplateETL(config_path)


class TestValidateOutput:
    def validate_output_success(self, mock_etl):
        assert 1
