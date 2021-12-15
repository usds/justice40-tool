import pytest
from data_pipeline.etl import constants, runner


def test_get_datasets_to_run():
    assert runner.get_datasets_to_run(None) == constants.DATASET_LIST
    assert runner.get_datasets_to_run("census") == [constants.CENSUS_INFO]
    assert runner.get_datasets_to_run("all_test_etls") == constants.ALL_TEST_ETLS
    with pytest.raises(ValueError):
        runner.get_datasets_to_run("doesnt_exist")


@pytest.mark.timeout(10)
def test_etl_runner():
    # Interface if "runner.etl_runner" doesn't return anything. Probably fine unless multiple jobs
    # fail so often that we need an error object that has information on all the failing jobs.
    with pytest.raises(Exception):
        runner.etl_runner("test_failure")
    runner.etl_runner("test_success")
    # XXX: I haven't gotten tests with timeouts working, because futures doesn't actually interrupt
    # them, see
    # https://stackoverflow.com/questions/6509261/how-to-use-concurrent-futures-with-timeouts
    # with pytest.raises(Exception):
    #     runner.etl_runner("test_timeout", timeout=2)
    # with pytest.raises(Exception):
    #     runner.etl_runner("all_test_etls", timeout=2)

    # This might be the interface if we want to get fancy with error returns. The downside here is
    # that the caller has to explicitly check or the error gets missed, which I'm not a huge fan of.
    # results = runner.etl_runner("test_failure")
    # assert results.failed_etl_jobs == ["test_failure"]
    # results = runner.etl_runner("test_timeout")
    # assert results.failed_etl_jobs == ["test_timeout"]
    # results = runner.etl_runner("test_success")
    # assert results.failed_etl_jobs == []
    # results = runner.etl_runner("all_test_etls")
    # assert results.failed_etl_jobs == ["test_timeout", "test_failure"]
