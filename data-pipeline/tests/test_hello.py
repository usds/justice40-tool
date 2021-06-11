import pytest

from data_pipeline.hello import hello


@pytest.mark.parametrize(
    "name, expected",
    [
        ("World", "Hello, World!"),
        ("Joe", "Hello, Joe!"),
        ("Kamala", "Hello, Kamala!"),
    ],
)
def test_hello(name, expected):
    """Tests that the function hello() returns the expected output"""
    # execution
    output = hello(name)
    # validation
    assert output == expected
