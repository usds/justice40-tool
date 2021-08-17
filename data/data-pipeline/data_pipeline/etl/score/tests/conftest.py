import os
import textwrap
from pathlib import Path

import pandas as pd
import pytest


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
    from data_pipeline.config import settings

    monkeypatch.setattr(settings, "APP_ROOT", root)
    return settings


@pytest.fixture()
def etl(monkeypatch, root):
    from data_pipeline.etl.score.etl_score_post import PostScoreETL

    tmp_path = root / "tmp"
    tmp_path.mkdir(parents=True, exist_ok=True)
    etl = PostScoreETL()
    monkeypatch.setattr(etl, "DATA_PATH", root)
    monkeypatch.setattr(etl, "TMP_PATH", tmp_path)
    return etl


@pytest.fixture()
def county_data_initial():
    return textwrap.dedent(
        """
            USPS	GEOID	ANSICODE	NAME	POP10	HU10	ALAND	AWATER	ALAND_SQMI	AWATER_SQMI	INTPTLAT	INTPTLONG
            AL	01001	00161526	AutaugaCounty	54571	22135	1539582278	25775735	594.436	9.952	32.536382	-86.644490
            AL	01003	00161527	BaldwinCounty	182265	104061	4117521611	1133190229	1589.784	437.527	30.659218	-87.746067
        """
    )


@pytest.fixture()
def state_data_initial():
    return textwrap.dedent(
        """
            fips,state_name,state_abbreviation,region,division
            01,Alabama,AL,South,East South Central
            02,Alaska,AK,West,Pacific
            04,Arizona,AZ,West,Mountain
        """
    )


@pytest.fixture()
def score_data_initial():
    return textwrap.dedent(
        """
            GEOID10,Housing burden (percent),Total population,Air toxics cancer risk,Respiratory hazard index,Diesel particulate matter,Particulate matter (PM2.5),Ozone,Traffic proximity and volume,Proximity to RMP sites,Proximity to TSDF sites,Proximity to NPL sites,Wastewater discharge,Percent pre-1960s housing (lead paint indicator),Individuals under 5 years old,Individuals over 64 years old,Linguistic isolation (percent),Percent of households in linguistic isolation,Poverty (Less than 200% of federal poverty line),Percent individuals age 25 or over with less than high school degree,Unemployed civilians (percent),Housing + Transportation Costs % Income for the Regional Typical Household,GEOID10 (percentile),Housing burden (percent) (percentile),Total population (percentile),Air toxics cancer risk (percentile),Respiratory hazard index (percentile),Diesel particulate matter (percentile),Particulate matter (PM2.5) (percentile),Ozone (percentile),Traffic proximity and volume (percentile),Proximity to RMP sites (percentile),Proximity to TSDF sites (percentile),Proximity to NPL sites (percentile),Wastewater discharge (percentile),Percent pre-1960s housing (lead paint indicator) (percentile),Individuals under 5 years old (percentile),Individuals over 64 years old (percentile),Linguistic isolation (percent) (percentile),Percent of households in linguistic isolation (percentile),Poverty (Less than 200% of federal poverty line) (percentile),Percent individuals age 25 or over with less than high school degree (percentile),Unemployed civilians (percent) (percentile),Housing + Transportation Costs % Income for the Regional Typical Household (percentile),Housing burden (percent) (min-max normalized),Total population (min-max normalized),Air toxics cancer risk (min-max normalized),Respiratory hazard index (min-max normalized),Diesel particulate matter (min-max normalized),Particulate matter (PM2.5) (min-max normalized),Ozone (min-max normalized),Traffic proximity and volume (min-max normalized),Proximity to RMP sites (min-max normalized),Proximity to TSDF sites (min-max normalized),Proximity to NPL sites (min-max normalized),Wastewater discharge (min-max normalized),Percent pre-1960s housing (lead paint indicator) (min-max normalized),Individuals under 5 years old (min-max normalized),Individuals over 64 years old (min-max normalized),Linguistic isolation (percent) (min-max normalized),Percent of households in linguistic isolation (min-max normalized),Poverty (Less than 200% of federal poverty line) (min-max normalized),Percent individuals age 25 or over with less than high school degree (min-max normalized),Unemployed civilians (percent) (min-max normalized),Housing + Transportation Costs % Income for the Regional Typical Household (min-max normalized),Score A,Score B,Socioeconomic Factors,Sensitive populations,Environmental effects,Exposures,Pollution Burden,Population Characteristics,Score C,Score D,Score E,Score A (percentile),Score A (top 25th percentile),Score A (top 30th percentile),Score A (top 35th percentile),Score A (top 40th percentile),Score B (percentile),Score B (top 25th percentile),Score B (top 30th percentile),Score B (top 35th percentile),Score B (top 40th percentile),Score C (percentile),Score C (top 25th percentile),Score C (top 30th percentile),Score C (top 35th percentile),Score C (top 40th percentile),Score D (percentile),Score D (top 25th percentile),Score D (top 30th percentile),Score D (top 35th percentile),Score D (top 40th percentile),Score E (percentile),Score E (top 25th percentile),Score E (top 30th percentile),Score E (top 35th percentile),Score E (top 40th percentile),Poverty (Less than 200% of federal poverty line) (top 25th percentile),Poverty (Less than 200% of federal poverty line) (top 30th percentile),Poverty (Less than 200% of federal poverty line) (top 35th percentile),Poverty (Less than 200% of federal poverty line) (top 40th percentile)
            010010201001,0.15,692,49.3770316066,0.788051737456,0.2786630687,9.99813169399,40.1217287582,91.0159000855,0.0852006888915,0.0655778245369,0.0709415490545,0.0,0.29,0.0491329479769,0.0953757225434,0.0,0.04,0.293352601156,0.195011337868,0.028125,55.0,4.53858477849437e-06,0.15696279879978475,0.12089201345236528,0.9797143208291796,0.9829416396964773,0.34627219635208273,0.9086451463612172,0.28414902233020944,0.3410837232734089,0.13480504509083976,0.13460988594536452,0.5500810137382961,0.18238709002315753,0.5188510118774764,0.4494787435381899,0.25320991408459015,0.2596066814778244,0.7027453899325112,0.46606500161119757,0.7623733167523703,0.3628393561824028,0.5794871072813119,0.10909090909090909,0.013340530536705737,0.028853697167088285,0.18277886087526787,0.045859591901569303,0.5883290826337872,0.3121515260630353,0.0024222132770710053,0.004621252164336263,0.00015416214761450488,0.007893014211979786,0.0,0.29,0.09433526011570838,0.0953757225434,0.0,0.04,0.293352601156,0.195011337868,0.028125,0.2711864406779661,0.6142191591817839,0.3553155211005275,0.5747020343519587,0.3207651130335348,0.3041468093350269,0.640467674807096,0.5283607196497396,0.4477335736927467,0.23656483320764937,0.12511596962298183,0.4015694309647159,0.6357808408182161,False,False,False,True,0.6315486105122701,False,False,False,True,0.5104500914524833,False,False,False,False,0.44267994354000534,False,False,False,False,0.3517176274094212,False,False,False,False,False,False,False,False
            010010201002,0.15,1153,49.3770316066,0.788051737456,0.2786630687,9.99813169399,40.1217287582,2.61874365577,0.0737963352265,0.0604962870646,0.0643436665275,0.0,0.094623655914,0.0416305290546,0.150043365134,0.0,0.0,0.182133564614,0.039119804401,0.0287878787878787,57.0,9.07716955698874e-06,0.15696279879978475,0.42875102685480615,0.9797143208291796,0.9829416396964773,0.34627219635208273,0.9086451463612172,0.28414902233020944,0.09634507767787849,0.11004706512415299,0.1228504127842856,0.5178479846414291,0.18238709002315753,0.28270163797524656,0.3660890561105236,0.5188963977252613,0.2596066814778244,0.25592171848974055,0.2701365660159849,0.2207635715031339,0.3696173450745396,0.6379947997334159,0.10909090909090909,0.022227791486736582,0.028853697167088285,0.18277886087526787,0.045859591901569303,0.5883290826337872,0.3121515260630353,6.96928300032502e-05,0.004002684465613169,0.00014221633002379553,0.007158928457599425,0.0,0.094623655914,0.07993061578488315,0.150043365134,0.0,0.0,0.182133564614,0.039119804401,0.0287878787878787,0.2824858757062147,0.24545006875955938,0.05963631310728093,0.350886800163363,0.38153071177120307,0.2431668381096544,0.5996779005411742,0.4808408797306676,0.36620875596728303,0.17608814038438173,0.07182643137875756,0.2554173925742535,0.21102603786087423,False,False,False,False,0.2509565067420677,False,False,False,False,0.2850458170133389,False,False,False,False,0.16239056337452856,False,False,False,False,0.11055992520412285,False,False,False,False,False,False,False,False
        """  # noqa: E501
    )


@pytest.fixture()
def counties_transformed_expected():
    return pd.DataFrame.from_dict(
        data={
            "State Abbreviation": pd.Series(["AL", "AL"], dtype="string"),
            "GEOID": pd.Series(["01001", "01003"], dtype="string"),
            "County Name": pd.Series(
                ["AutaugaCounty", "BaldwinCounty"], dtype="object"
            ),
        },
    )


@pytest.fixture()
def states_transformed_expected():
    return pd.DataFrame.from_dict(
        data={
            "State Code": pd.Series(["01", "02", "04"], dtype="string"),
            "State Name": pd.Series(["Alabama", "Alaska", "Arizona"], dtype="object"),
            "State Abbreviation": pd.Series(["AL", "AK", "AZ"], dtype="string"),
        },
    )


@pytest.fixture()
def score_transformed_expected():
    return pd.read_pickle(pytest.SNAPSHOT_DIR / "score_transformed_expected.pkl")


@pytest.fixture()
def national_cbg_df():
    return pd.DataFrame.from_dict(
        data={
            "GEOID10": pd.Series(["010010201001", "010010201002"], dtype="string"),
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
    return pd.read_pickle(pytest.SNAPSHOT_DIR / "downloadable_data_expected.pkl")
