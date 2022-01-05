import pandas as pd
import numpy as np
import pytest

from data_pipeline.etl.score.etl_utils import floor_series


def test_floor_series():
    # test examples
    series = pd.Series(data=[None, 1, 0.324534, 1.2341], dtype="float64")
    series_exponentiated = pd.Series(
        data=[
            -np.inf,
            np.inf,
            "None",
            -0.131321313123123,
            5.62322441e-15,
            1.2341123131313131312e12,
        ]
    )
    series_of_nan_values = pd.Series(data=[None, None, None, None, None])
    series_empty = pd.Series(data=[], dtype="float64")
    # list of randomly generated values
    invalid_type = list(np.random.uniform(1, 1000000, size=15))

    floored_series_1 = floor_series(series, number_of_decimals=2)
    floored_series_2 = floor_series(series, number_of_decimals=3)
    floored_series_3 = floor_series(series, number_of_decimals=1)
    floored_series_4 = floor_series(series_of_nan_values, number_of_decimals=10)
    floored_series_5 = floor_series(series_exponentiated, number_of_decimals=1)
    # expected fixtures
    expected_1 = np.array([None, 1.0, 0.32, 1.23])
    expected_2 = np.array([None, 1.00, 0.324, 1.234])
    expected_3 = np.array([None, 1.0, 0.3, 1.2])
    expected_4 = np.array([None, None, None, None, None])
    expected_5 = np.array([None, None, None, -0.2, 0.0, 1234112313131.3])

    # Test for expected value with 2 decimal places
    # Elewentwise comparison to ensure all values are equal
    all_elements_are_equal_one = np.equal(expected_1, floored_series_1)
    assert all_elements_are_equal_one.all()

    # Test for expected value with 3 decimal places
    # Elewentwise comparison to ensure all values are equal
    all_elements_are_equal_two = np.equal(expected_2, floored_series_2)
    assert all_elements_are_equal_two.all()

    # Test for expected value with 1 decimal place
    # Elewentwise comparison to ensure all values are equal
    all_elements_are_equal_three = np.equal(expected_3, floored_series_3)
    assert all_elements_are_equal_three.all()

    # Test for expected value for some arbitrary decimal place
    # Elewentwise comparison to ensure all values are equal for NaN
    all_elements_are_equal_four = np.equal(expected_4, floored_series_4)
    assert all_elements_are_equal_four.all()
    # Test for expected value for some arbitrary decimal place
    # Elewentwise comparison to ensure all floating point imprecision
    # is clamped to a certain number of decimal points
    all_elements_are_equal_five = np.equal(expected_5, floored_series_5)
    assert all_elements_are_equal_five.all()

    # Test for empty series - should raise a ValueError exception
    with pytest.raises(ValueError, match="Empty series provided."):
        floor_series(series_empty, number_of_decimals=2)

    # Test for invalid type - should raise a TypeError exception
    with pytest.raises(
        TypeError,
        match="Argument series must be of type pandas series, not of type list.",
    ):
        floor_series(invalid_type, number_of_decimals=3)
