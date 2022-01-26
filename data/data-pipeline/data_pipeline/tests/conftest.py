import os
from pathlib import Path
from shutil import copyfile

import pytest

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad

TMP_DIR = settings.APP_ROOT / "data" / "tmp" / "tests"


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
def mock_etl(monkeypatch, mock_paths) -> None:
    """Creates a mock version of the base ExtractTransformLoad class and resets
    global the variables for DATA_PATH and TMP_PATH to the local mock_paths
    """
    data_path, tmp_path = mock_paths
    monkeypatch.setattr(ExtractTransformLoad, "DATA_PATH", data_path)
    monkeypatch.setattr(ExtractTransformLoad, "TMP_PATH", tmp_path)
