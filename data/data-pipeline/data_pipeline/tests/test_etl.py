# pylint: disable=protected-access
import pytest
from data_pipeline.etl import constants, runner


def test_get_datasets_to_run():
    assert runner._get_datasets_to_run(None) == constants.DATASET_LIST
    assert runner._get_datasets_to_run("census") == [constants.CENSUS_INFO]
    with pytest.raises(ValueError):
        runner._get_datasets_to_run("doesnt_exist")
