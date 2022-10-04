import numpy as np
import pandas as pd
import pytest
from data_pipeline.etl.score.etl_utils import (
    compare_to_list_of_expected_state_fips_codes,
)
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


def test_compare_to_list_of_expected_state_fips_codes():
    # Has every state/territory/DC code
    fips_codes_test_1 = [
        "01",
        "02",
        "04",
        "05",
        "06",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "53",
        "54",
        "55",
        "56",
        "60",
        "66",
        "69",
        "72",
        "78",
    ]

    # Should not raise any errors
    compare_to_list_of_expected_state_fips_codes(
        actual_state_fips_codes=fips_codes_test_1
    )

    # Should raise error because Puerto Rico is not expected
    with pytest.raises(ValueError) as exception_info:
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=fips_codes_test_1,
            puerto_rico_expected=False,
        )
    partial_expected_error_message = (
        "FIPS state codes in the data that were not expected:\n['72']\n"
    )
    assert partial_expected_error_message in str(exception_info.value)

    # Should raise error because Island Areas are not expected
    with pytest.raises(ValueError) as exception_info:
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=fips_codes_test_1,
            island_areas_expected=False,
        )
    partial_expected_error_message = (
        "FIPS state codes in the data that were not expected:\n"
        "['60', '66', '69', '78']\n"
    )
    assert partial_expected_error_message in str(exception_info.value)

    # List missing PR and Guam
    fips_codes_test_2 = [x for x in fips_codes_test_1 if x not in ["66", "72"]]

    # Should raise error because all Island Areas and PR are expected
    with pytest.raises(ValueError) as exception_info:
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=fips_codes_test_2,
        )
    partial_expected_error_message = (
        "FIPS state codes expected that are not present in the data:\n"
        "['66', '72']\n"
    )
    assert partial_expected_error_message in str(exception_info.value)

    # Missing Maine and Wisconsin
    fips_codes_test_3 = [x for x in fips_codes_test_1 if x not in ["23", "55"]]

    # Should raise error because Maine and Wisconsin are expected
    with pytest.raises(ValueError) as exception_info:
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=fips_codes_test_3,
        )
    partial_expected_error_message = (
        "FIPS state codes expected that are not present in the data:\n"
        "['23', '55']\n"
    )
    assert partial_expected_error_message in str(exception_info.value)

    # Should not raise error because Maine and Wisconsin are expected to be missing
    compare_to_list_of_expected_state_fips_codes(
        actual_state_fips_codes=fips_codes_test_3,
        additional_fips_codes_not_expected=["23", "55"],
    )

    # Missing the continental & AK/HI nation
    fips_codes_test_4 = [
        "60",
        "66",
        "69",
        "72",
        "78",
    ]

    # Should raise error because the nation is expected
    with pytest.raises(ValueError) as exception_info:
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=fips_codes_test_4,
        )

    partial_expected_error_message = (
        "FIPS state codes expected that are not present in the data:\n"
        "['01', '02', '04', '05', '06', '08', '09', '10', '11', '12', '13', '15', '16', "
        "'17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', "
        "'30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', "
        "'44', '45', '46', '47', '48', '49', '50', '51', '53', '54', '55', '56']"
    )

    assert partial_expected_error_message in str(exception_info.value)

    # Should not raise error because continental US and AK/HI is not to be missing
    compare_to_list_of_expected_state_fips_codes(
        actual_state_fips_codes=fips_codes_test_4,
        continental_us_expected=False,
        alaska_and_hawaii_expected=False,
    )

    # Missing Hawaii but not Alaska
    fips_codes_test_5 = [x for x in fips_codes_test_1 if x not in ["15"]]

    # Should raise error because both Hawaii and Alaska are expected
    with pytest.raises(ValueError) as exception_info:
        compare_to_list_of_expected_state_fips_codes(
            actual_state_fips_codes=fips_codes_test_5,
            alaska_and_hawaii_expected=True,
        )
    partial_expected_error_message = (
        "FIPS state codes expected that are not present in the data:\n"
        "['15']\n"
    )
    assert partial_expected_error_message in str(exception_info.value)

    # Should work as expected
    compare_to_list_of_expected_state_fips_codes(
        actual_state_fips_codes=fips_codes_test_5,
        alaska_and_hawaii_expected=True,
        additional_fips_codes_not_expected=["15"],
    )
