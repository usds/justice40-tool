import os
from importlib import reload
from pathlib import Path

import pandas as pd
import pytest
from data_pipeline import config
from data_pipeline.etl.score import etl_score_post, tests
from data_pipeline.etl.score.etl_score_post import PostScoreETL


def pytest_configure():
    pytest.SNAPSHOT_DIR = Path(__file__).parent / "snapshots"


@pytest.fixture(scope="session")
def root(tmp_path_factory):
    basetemp = Path.cwd() / "temp_dir"
    os.environ["PYTEST_DEBUG_TEMPROOT"] = str(
        basetemp
    )  # this sets the location of the temp directory inside the project folder
    basetemp.mkdir(parents=True, exist_ok=True)
    root = tmp_path_factory.mktemp("root", numbered=False)
    return root


@pytest.fixture(autouse=True)
def settings_override(monkeypatch, root):
    reload(config)

    monkeypatch.setattr(config.settings, "APP_ROOT", root)
    return config.settings


@pytest.fixture()
def etl(monkeypatch, root):
    reload(etl_score_post)

    tmp_path = root / "tmp"
    tmp_path.mkdir(parents=True, exist_ok=True)
    etl = PostScoreETL()
    monkeypatch.setattr(etl, "DATA_PATH", root)
    monkeypatch.setattr(etl, "TMP_PATH", tmp_path)
    monkeypatch.setattr(
        etl,
        "CONTENT_CONFIG",
        Path.cwd() / "data_pipeline" / "content" / "config",
    )

    return etl


@pytest.fixture(scope="session")
def sample_data_dir():
    base_dir = Path(tests.__file__).resolve().parent
    return base_dir / "sample_data"


@pytest.fixture()
def county_data_initial(sample_data_dir):
    return sample_data_dir / "county_data_initial.csv"


@pytest.fixture()
def state_data_initial(sample_data_dir):
    return sample_data_dir / "state_data_initial.csv"


@pytest.fixture()
def score_data_initial(sample_data_dir):
    return sample_data_dir / "score_data_initial.csv"


@pytest.fixture()
def score_pdf_initial(sample_data_dir):
    return sample_data_dir / "Draft_Communities_List.pdf"


@pytest.fixture()
def counties_transformed_expected():
    return pd.DataFrame.from_dict(
        data={
            "State Abbreviation": pd.Series(["AL"], dtype="string"),
            "GEOID": pd.Series(["01073"], dtype="string"),
            "County Name": pd.Series(["Jefferson County"], dtype="object"),
        },
    )


@pytest.fixture()
def states_transformed_expected():
    return pd.DataFrame.from_dict(
        data={
            "State Code": pd.Series(["01", "02", "04"], dtype="string"),
            "State/Territory": pd.Series(
                ["Alabama", "Alaska", "Arizona"], dtype="object"
            ),
            "State Abbreviation": pd.Series(["AL", "AK", "AZ"], dtype="string"),
        },
    )


@pytest.fixture()
def score_transformed_expected():
    return pd.read_pickle(
        pytest.SNAPSHOT_DIR / "score_transformed_expected.pkl"
    )


@pytest.fixture()
def national_tract_df():
    return pd.DataFrame.from_dict(
        data={
            "GEOID10_TRACT": pd.Series(
                ["01073001100", "01073001400"], dtype="string"
            ),
        },
    )


@pytest.fixture()
def score_data_expected():
    return pd.read_pickle(pytest.SNAPSHOT_DIR / "score_data_expected.pkl")


@pytest.fixture()
def tile_data_expected():
    return pd.read_pickle(pytest.SNAPSHOT_DIR / "tile_data_expected.pkl")


@pytest.fixture()
def downloadable_data_expected():
    return pd.read_pickle(
        pytest.SNAPSHOT_DIR / "downloadable_data_expected.pkl"
    )
