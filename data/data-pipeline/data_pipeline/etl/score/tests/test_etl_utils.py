import pandas as pd
import numpy as np
import pytest

from data_pipeline.etl.score.etl_utils import floor_series


def test_floor_series():
    # test examples
    series = pd.Series(data=[None, 1, 0.324534, 1.2341])
    series_of_nan_values = pd.Series(data=[None, None, None, None, None])
    series_empty = pd.Series(data=[])

    floored_series_1 = floor_series(series, number_of_decimals=2)
    floored_series_2 = floor_series(series, number_of_decimals=3)
    floored_series_0 = floor_series(series, number_of_decimals=1)
    floored_series_nan = floor_series(
        series_of_nan_values, number_of_decimals=10
    )
    # expected fixtures
    expected_1 = np.array([None, 1.0, 0.32, 1.23])
    expected_2 = np.array([None, 1.00, 0.324, 1.234])
    expected_3 = np.array([None, 1.0, 0.3, 1.2])
    expected_4 = np.array([None, None, None, None, None])

    # Test for expected value with 2 decimal places
    # Elewentwise comparison to ensure all values are equal
    all_elements_are_equal_two = np.equal(expected_1, floored_series_1)
    assert all_elements_are_equal_two.all()

    # Test for expected value with 3 decimal places
    # Elewentwise comparison to ensure all values are equal
    all_elements_are_equal_3 = np.equal(expected_2, floored_series_2)
    assert all_elements_are_equal_3.all()

    # Test for expected value with 1 decimal place
    # Elewentwise comparison to ensure all values are equal
    all_elements_are_equal_1 = np.equal(expected_3, floored_series_0)
    assert all_elements_are_equal_1.all()

    # Test for expected value for some arbitrary decimal place
    # Elewentwise comparison to ensure all values are equal for NaN
    all_elements_are_equal_nan = np.equal(expected_4, floored_series_nan)
    assert all_elements_are_equal_nan.all()

    # Test for empty series - should raise an exception
    with pytest.raises(ValueError, match="Empty series provided"):
        floored_series_empty = floor_series(series_empty, number_of_decimals=2)
