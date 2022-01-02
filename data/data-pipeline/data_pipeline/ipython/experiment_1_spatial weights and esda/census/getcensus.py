# Description: Download tract-level census variables from the API
import requests
import numpy as np
import pandas as pd


def get_census_variable_descriptions(dataset, year, variables):
    """
    Download descriptions of census variables from the API
    """
    url_template = "https://api.census.gov/data/{year}/{dataset}/profile/variables/{variable}.json"
    variable_descriptions = {}

    for variable in variables:
        url = url_template.format(year=year, dataset=dataset, variable=variable)
        response = requests.get(url)
        data = response.json()
        variable_descriptions[variable] = {
            "concept": data["concept"],
            "label": data["label"],
        }

    return variable_descriptions


def get_census_tracts_data(
    tract_fips, api_key, dataset, year, variables, max_tracts=1000, clean=False
):
    """
    Download census variables (given some year and dataset) for a series of tracts

    limit the max number tracts to download data for in a single api request
    """

    # convert vars to string to send to api
    variables_str = ",".join(variables)

    # census dataframe called cd
    cd = pd.DataFrame()

    states_counties_tracts = get_states_counties_tracts(tract_fips=tract_fips)
    for state in states_counties_tracts:
        for county in states_counties_tracts[state]:

            tracts = states_counties_tracts[state][county]

            # if we pass it too many tracts at once, the census api chokes, so
            # break up counties with > max_tracts number of tracts into chunks
            for tracts_chunk in chunks(tracts, max_tracts):

                # convert tracts to string to send to api
                tracts_str = ",".join(tracts_chunk)
                print(
                    "Downloading {} census vars in {}{} for {} tracts.".format(
                        len(variables), state, county, len(tracts_chunk)
                    )
                )

                # get census vars for these tracts and append them to df
                df_tmp = get_tracts_census_vars(
                    api_key=api_key,
                    dataset=dataset,
                    variables=variables_str,
                    state=state,
                    county=county,
                    tracts=tracts_str,
                    year=year,
                    clean=clean,
                )

                df_tmp["state"] = state
                df_tmp["county"] = county
                cd = cd.append(df_tmp)
    return cd


def get_states_counties_tracts(tract_fips):
    """
    turn a list of tract fips codes into a nested dict keyed by state,
    then keyed by county, finally with tract as the value
    """

    if not isinstance(tract_fips, pd.Series):
        raise TypeError("tract_fips must be a pandas series")

    df = pd.DataFrame()
    df["state"] = tract_fips.str.slice(0, 2)
    df["county"] = tract_fips.str.slice(2, 5)
    df["tract"] = tract_fips.str.slice(5)
    grouped = df[["state", "county", "tract"]].groupby(["state", "county"])

    states_counties_tracts = {}
    for (state, county), group in grouped:
        if state not in states_counties_tracts:
            states_counties_tracts[state] = {}
        states_counties_tracts[state][county] = group["tract"].tolist()

    return states_counties_tracts


def parse_tract_fips(tract_fips):
    """
    turn a full tract fips code into a tuple of state, county, tract
    """

    return tract_fips[:2], tract_fips[2:5], tract_fips[5:]


def get_tract_ids(fips_codes):
    """
    convert a list of full tract fips codes into just tract fips only
    """

    tracts = []
    for fips_code in fips_codes:
        _, _, tract_fips = parse_tract_fips(fips_code)
        tracts.append(tract_fips)
    return tracts


def get_tracts_census_vars(
    api_key, dataset, variables, state, county, tracts, year, clean
):
    """
    download a set of census variables for a state + county + tracts
    """

    url_template = (
        "https://api.census.gov/data/{year}/{dataset}/profile?"
        "get={variables}&for=tract:{tracts}&key={api_key}&in=state:{state}+county:{county}"
    )

    url = url_template.format(
        api_key=api_key,
        dataset=dataset,
        variables=variables,
        state=state,
        county=county,
        tracts=tracts,
        year=year,
    )

    try:
        response = requests.get(url, timeout=30)
        json_data = response.json()
    except Exception as e:
        print(e, response.status_code, response.text, response.url)

    # load as dataframe and index by geoid (state+county+tract)
    df = pd.DataFrame(json_data)
    df = df.rename(columns=df.iloc[0]).drop(df.index[0])
    df["GEOID10"] = df.apply(
        lambda row: "{}{}{}".format(row["state"], row["county"], row["tract"]),
        axis="columns",
    )
    df = df.set_index("GEOID10").drop(
        ["state", "county", "tract"], axis="columns"
    )

    if clean:
        df = clean_census_data(df)

    return df


def clean_census_data(df):
    """
    Clean up the census data results from the API. By default, the census data often
    includes non-numeric characters as annotations or missing values.

    # see https://www.census.gov/data/developers/data-sets/acs-5year/data-notes.html
    # for estimate and annotation values

    # A '+' following a median estimate means the median falls in the upper interval
    # of an open-ended distribution.

    # A '-' entry in the estimate column indicates that either no sample observations
    # or too few sample observations were available to compute an estimate, or a ratio
    # of medians cannot be calculated because one or both of the median estimates falls
    # in the lowest interval or upper interval of an open-ended distribution.

    # An 'N' entry in the estimate and margin of error columns indicates that data for
    # this geographic area cannot be displayed because the number of sample cases is too
    # small.

    # An '(X)' means that the estimate is not applicable or not available.
    """

    # clean up any non-numeric strings, column by column
    df = df.astype(str)
    bad_strings = ["-", "N", "(X)", "*"]
    for col in df.columns:

        # replace any cell with '-' or 'N' or '(X)' or '*' in this column with NaN
        df[col] = df[col].map(
            lambda value: np.nan
            if any(s in value for s in bad_strings)
            else value
        )

        # if every result in this col was replaced by nans, then col is now of type
        # float and we can skip the following cleaning step
        if not df[col].dtype == np.float64:
            # strip out any '+' or ',' or '*'
            df[col] = df[col].str.replace("+", "").str.replace(",", "")

    # convert data to floats, assert uniqueness, and return
    def convert_float(value):
        try:
            return float(value)
        except:
            print("error", value, "\n", df)
            return np.nan

    df = df.applymap(convert_float)

    assert df.index.is_unique

    return df


def chunks(l, n):
    """
    yield successive n-sized chunks from list l
    """
    for i in range(0, len(l), n):
        yield l[i : i + n]
