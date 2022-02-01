import pytest


def pytest_addoption(parser):
    """Adds --update_snapshots as an optional flag that can be parsed from the
    command line when calling pytest
    """
    parser.addoption(
        "--update_snapshots",
        action="store_true",
        default=False,
        help="Update snapshot test fixtures",
    )


def pytest_configure(config):
    """Adds update_snapshots to list of available markers to apply to tests"""
    config.addinivalue_line(
        "markers",
        "update_snapshots: mark test as one that updates snapshot fixtures",
    )


def pytest_collection_modifyitems(config, items):
    """Applies pytest.mark.skip to all tests marked with update_snapshots
    unless the --update_snapshots flag is passed to the CLI
    """
    # if --update_snapshots passed in cli
    if config.getoption("--update_snapshots"):
        # only run the tests marked with update_snapshots
        skip = pytest.mark.skip(reason="only updating snapshots")
        for test in items:
            if "update_snapshots" not in test.keywords:
                test.add_marker(skip)
    else:
        # otherwise skip all tests marked with update_snapshots
        skip = pytest.mark.skip(reason="must pass --update_snapshots to run")
        for test in items:
            if "update_snapshots" in test.keywords:
                test.add_marker(skip)
