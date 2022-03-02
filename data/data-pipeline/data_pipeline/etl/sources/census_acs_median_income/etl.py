import json
from pathlib import Path
import numpy as np
import pandas as pd
import requests

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings
from data_pipeline.utils import unzip_file_from_url, download_file_from_url

logger = get_module_logger(__name__)


class CensusACSMedianIncomeETL(ExtractTransformLoad):
    def __init__(self):
        self.ACS_YEAR: int = 2019
        self.OUTPUT_PATH: Path = (
            self.DATA_PATH
            / "dataset"
            / f"census_acs_median_income_{self.ACS_YEAR}"
        )

        # Set constants for Geocorr MSAs data.
        self.PLACE_FIELD_NAME: str = "Census Place Name"
        self.COUNTY_FIELD_NAME: str = "County Name"
        self.STATE_ABBREVIATION_FIELD_NAME: str = "State Abbreviation"
        self.MSA_FIELD_NAME: str = (
            "Metropolitan/Micropolitan Statistical Area Name"
        )
        self.MSA_ID_FIELD_NAME: str = "MSA ID"
        self.MSA_TYPE_FIELD_NAME: str = "MSA Type"
        self.POPULATION_FIELD_NAME: str = "pop10"
        self.TEMPORARY_SORT_FIELD: str = "temporary sort field"

        # Set constants for MSA median incomes
        self.MSA_MEDIAN_INCOME_URL: str = (
            f"https://api.census.gov/data/{self.ACS_YEAR}/acs/acs5?get=B19013_001E"
            + "&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area"
        )
        self.MSA_INCOME_FIELD_NAME: str = f"Median household income in the past 12 months (MSA; {self.ACS_YEAR} inflation-adjusted dollars)"

        # Set constants for state median incomes
        self.STATE_MEDIAN_INCOME_URL: str = f"https://api.census.gov/data/{self.ACS_YEAR}/acs/acs5?get=B19013_001E&for=state"
        self.STATE_GEOID_FIELD_NAME: str = "GEOID2"
        self.STATE_MEDIAN_INCOME_FIELD_NAME: str = f"Median household income (State; {self.ACS_YEAR} inflation-adjusted dollars)"

        # List of Puerto Rico tracts
        self.PUERTO_RICO_S3_LINK: str = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/PR_census_tracts.csv"
        )

        # Constants for output
        self.AMI_REFERENCE_FIELD_NAME: str = "AMI Reference"
        self.AMI_FIELD_NAME: str = "Area Median Income (State or metropolitan)"
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.PLACE_FIELD_NAME,
            self.COUNTY_FIELD_NAME,
            self.STATE_ABBREVIATION_FIELD_NAME,
            self.MSA_FIELD_NAME,
            self.MSA_ID_FIELD_NAME,
            self.MSA_TYPE_FIELD_NAME,
            self.MSA_INCOME_FIELD_NAME,
            self.STATE_GEOID_FIELD_NAME,
            self.STATE_MEDIAN_INCOME_FIELD_NAME,
            self.AMI_REFERENCE_FIELD_NAME,
            self.AMI_FIELD_NAME,
        ]

        # Remaining definitions
        self.output_df: pd.DataFrame
        self.raw_geocorr_df: pd.DataFrame
        self.msa_median_incomes: dict
        self.state_median_incomes: dict
        self.pr_tracts: pd.DataFrame

    def _transform_geocorr(self) -> pd.DataFrame:
        # Transform the geocorr data
        geocorr_df = self.raw_geocorr_df

        # Strip the unnecessary period from the tract ID:
        geocorr_df["tract"] = geocorr_df["tract"].str.replace(
            ".", "", regex=False
        )

        # Create the full GEOID out of the component parts.
        geocorr_df[self.GEOID_TRACT_FIELD_NAME] = (
            geocorr_df["county"] + geocorr_df["tract"]
        )

        # QA the combined field:
        tract_values = (
            geocorr_df[self.GEOID_TRACT_FIELD_NAME].str.len().unique()
        )
        if any(tract_values != [11]):
            print(tract_values)
            raise ValueError(
                "Some of the census tract data has the wrong length."
            )

        # Rename some fields
        geocorr_df.rename(
            columns={
                "placenm": self.PLACE_FIELD_NAME,
                "cbsaname10": self.MSA_FIELD_NAME,
                "cntyname": self.COUNTY_FIELD_NAME,
                "stab": self.STATE_ABBREVIATION_FIELD_NAME,
                "cbsa10": self.MSA_ID_FIELD_NAME,
                "cbsatype10": self.MSA_TYPE_FIELD_NAME,
            },
            inplace=True,
            errors="raise",
        )

        # Remove duplicated rows.
        # Some rows appear more than once: once for the population within a tract that's also within a census place,
        # and once for the population that's within a tract that's *not* within a census place.
        # Sort based on the following rule:
        # Assign the place name to the tract that has the highest population of any row with a non-blank place name.
        #
        # Therefore if there are three place name entries for a tract, the tract
        # will be labeled with the place name that has the highest population.
        # E.g., for the following (real) data:
        #
        #     | tract       | Place Name          | Population |
        #     |-------------|---------------------|------------|
        #     | 01001020802 | Pine Level CDP, AL  | 2642       |
        #     | 01001020802 | Prattville city, AL | 2347       |
        #     | 01001020802 |                     | 5302       |
        #     |-------------|---------------------|------------|
        #
        # The largest percent of population in this tract lives in a place that has no name.
        # The largest percent of population in a tract with a name is `Pine Level CDP, AL`.
        # Therefore the tract should be identified as `Pine Level CDP, AL`.

        # Sort field. This is created purely as a convenience function for sorting purposes.
        # This field is as follows:
        #     | tract       | Place Name          | Population | Temporary Sort Field |
        #     |-------------|---------------------|------------|------------|
        #     | 01001020802 | Pine Level CDP, AL  | 2642       | 102642       |
        #     | 01001020802 | Prattville city, AL | 2347       | 102347       |
        #     | 01001020802 |                     | 5302       | 5302       |
        #     |-------------|---------------------|------------|------------|
        #
        geocorr_df[self.TEMPORARY_SORT_FIELD] = np.where(
            geocorr_df[self.PLACE_FIELD_NAME].str.strip() != "",
            # Give place names a major bonus in ranking.
            100000 + geocorr_df[self.POPULATION_FIELD_NAME],
            # Otherwise just use population.
            geocorr_df[self.POPULATION_FIELD_NAME],
        )

        # Sort by whether the place has a place name:
        geocorr_df.sort_values(
            # Sort by sort field descending, so the highest entry is first.
            by=self.TEMPORARY_SORT_FIELD,
            axis=0,
            ascending=False,
            inplace=True,
        )

        # Drop all the duplicated rows except for the first one (which will have the place name):
        rows_to_drop = geocorr_df.duplicated(
            keep="first", subset=[self.GEOID_TRACT_FIELD_NAME]
        )

        # Keep everything that's *not* a row to drop:
        geocorr_df = geocorr_df[~rows_to_drop]

        # Sort by GEOID again to put the dataframe back to original order:
        # Note: avoiding using inplace because of unusual `SettingWithCopyWarning` warning.
        geocorr_df = geocorr_df.sort_values(
            by=self.GEOID_TRACT_FIELD_NAME,
            axis=0,
            ascending=True,
            inplace=False,
        )

        if len(geocorr_df) > self.EXPECTED_MAX_CENSUS_TRACTS:
            raise ValueError("Too many tracts.")

        return geocorr_df

    def _transform_msa_median_incomes(self) -> pd.DataFrame:
        # Remove first list entry, which is the column names.
        column_names = self.msa_median_incomes.pop(0)

        msa_median_incomes_df = pd.DataFrame(
            data=self.msa_median_incomes, columns=column_names
        )
        msa_median_incomes_df.rename(
            columns={
                "B19013_001E": self.MSA_INCOME_FIELD_NAME,
                "metropolitan statistical area/micropolitan statistical area": self.MSA_ID_FIELD_NAME,
            },
            inplace=True,
            errors="raise",
        )

        # Convert MSA ID to str
        msa_median_incomes_df[self.MSA_ID_FIELD_NAME] = msa_median_incomes_df[
            self.MSA_ID_FIELD_NAME
        ].astype(str)

        return msa_median_incomes_df

    def _transform_state_median_incomes(self) -> pd.DataFrame:
        # Remove first list entry, which is the column names.
        column_names = self.state_median_incomes.pop(0)
        state_median_incomes_df = pd.DataFrame(
            data=self.state_median_incomes, columns=column_names
        )

        state_median_incomes_df.rename(
            columns={
                "B19013_001E": self.STATE_MEDIAN_INCOME_FIELD_NAME,
                "state": self.STATE_GEOID_FIELD_NAME,
            },
            inplace=True,
            errors="raise",
        )
        return state_median_incomes_df

    def extract(self) -> None:
        logger.info("Starting four separate downloads.")
        # Load and clean GEOCORR data
        # Note: this data is generated by https://mcdc.missouri.edu/applications/geocorr2014.html, at the advice of the Census.
        # The specific query used is the following, which takes a couple of minutes to run:
        # https://mcdc.missouri.edu/cgi-bin/broker?_PROGRAM=apps.geocorr2014.sas&_SERVICE=MCDC_long&_debug=0&state=Mo29&state=Al01&state=Ak02&state=Az04&state=Ar05&state=Ca06&state=Co08&state=Ct09&state=De10&state=Dc11&state=Fl12&state=Ga13&state=Hi15&state=Id16&state=Il17&state=In18&state=Ia19&state=Ks20&state=Ky21&state=La22&state=Me23&state=Md24&state=Ma25&state=Mi26&state=Mn27&state=Ms28&state=Mt30&state=Ne31&state=Nv32&state=Nh33&state=Nj34&state=Nm35&state=Ny36&state=Nc37&state=Nd38&state=Oh39&state=Ok40&state=Or41&state=Pa42&state=Ri44&state=Sc45&state=Sd46&state=Tn47&state=Tx48&state=Ut49&state=Vt50&state=Va51&state=Wa53&state=Wv54&state=Wi55&state=Wy56&g1_=state&g1_=county&g1_=placefp&g1_=tract&g2_=cbsa10&g2_=cbsatype10&wtvar=pop10&nozerob=1&title=&csvout=1&namoptf=b&listout=1&lstfmt=html&namoptr=b&oropt=&counties=&metros=&places=&latitude=&longitude=&locname=&distance=&kiloms=0&nrings=&r1=&r2=&r3=&r4=&r5=&r6=&r7=&r8=&r9=&r10=&lathi=&latlo=&longhi=&longlo=
        #
        # That query was constructed from the website https://mcdc.missouri.edu/applications/geocorr2014.html,
        # with the "source geographies" selected being:
        # - State
        # - County
        # - Place (City, Town, Village, CDP, etc)
        # - Census Tract
        # and with the "target geographies" selected being:
        # - Core based statistical area (CBSA)
        # - CBSA Type (Metro or Micro)
        logger.info("Starting download of 1.5MB Geocorr information.")

        unzip_file_from_url(
            file_url=settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/geocorr2014_all_states_tracts_only.csv.zip",
            download_path=self.get_tmp_path(),
            unzipped_file_path=self.get_tmp_path() / "geocorr",
        )

        self.raw_geocorr_df = pd.read_csv(
            filepath_or_buffer=self.get_tmp_path()
            / "geocorr"
            / "geocorr2014_all_states_tracts_only.csv",
            # Skip second row, which has descriptions.
            skiprows=[1],
            # The following need to remain as strings for all of their digits, not get converted to numbers.
            dtype={
                "tract": "string",
                "county": "string",
                "state": "string",
                "bg": "string",
                "cbsa10": "string",
            },
            low_memory=False,
        )

        logger.info("Pulling PR tract list down.")
        # This step is necessary because PR is not in geocorr at the level that gets joined
        pr_file = self.get_tmp_path() / "pr_tracts" / "pr_tracts.csv"
        download_file_from_url(
            file_url=self.PUERTO_RICO_S3_LINK, download_file_name=pr_file
        )
        self.pr_tracts = pd.read_csv(
            filepath_or_buffer=self.get_tmp_path()
            / "pr_tracts"
            / "pr_tracts.csv",
            # The following need to remain as strings for all of their digits, not get converted to numbers.
            dtype={"GEOID10_TRACT": str},
            low_memory=False,
        )
        self.pr_tracts["State Abbreviation"] = "PR"

        # Download MSA median incomes
        logger.info("Starting download of MSA median incomes.")
        download = requests.get(self.MSA_MEDIAN_INCOME_URL, verify=None)
        self.msa_median_incomes = json.loads(download.content)

        # Download state median incomes
        logger.info("Starting download of state median incomes.")
        download_state = requests.get(self.STATE_MEDIAN_INCOME_URL, verify=None)
        self.state_median_incomes = json.loads(download_state.content)
        ## NOTE we already have PR's MI here

    def transform(self) -> None:
        logger.info("Starting transforms.")

        # Run transforms:
        geocorr_df = self._transform_geocorr()
        msa_median_incomes_df = self._transform_msa_median_incomes()
        state_median_incomes_df = self._transform_state_median_incomes()

        # Adds 945 PR tracts to the geocorr dataframe
        geocorr_df_plus_pr = geocorr_df.merge(self.pr_tracts, how="outer")

        # Join tracts on MSA incomes
        merged_df = geocorr_df_plus_pr.merge(
            msa_median_incomes_df, on=self.MSA_ID_FIELD_NAME, how="left"
        )

        # Merge state income with tracts
        merged_df[self.STATE_GEOID_FIELD_NAME] = (
            merged_df[self.GEOID_TRACT_FIELD_NAME].astype(str).str[0:2]
        )

        # outer join adds PR back
        merged_with_state_income_df = merged_df.merge(
            state_median_incomes_df,
            how="outer",
            on=self.STATE_GEOID_FIELD_NAME,
        )

        if len(merged_with_state_income_df) > self.EXPECTED_MAX_CENSUS_TRACTS:
            raise ValueError("Too many tracts in join.")

        # Choose reference income: MSA if MSA type is Metro, otherwise use State.
        merged_with_state_income_df[self.AMI_REFERENCE_FIELD_NAME] = [
            "MSA" if msa_type == "Metro" else "State"
            for msa_type in merged_with_state_income_df[
                self.MSA_TYPE_FIELD_NAME
            ]
        ]

        # Populate reference income: MSA income if reference income is MSA, state income if reference income is state.
        merged_with_state_income_df[
            self.AMI_FIELD_NAME
        ] = merged_with_state_income_df.apply(
            lambda x: x[self.MSA_INCOME_FIELD_NAME]
            if x[self.AMI_REFERENCE_FIELD_NAME] == "MSA"
            else x[self.STATE_MEDIAN_INCOME_FIELD_NAME],
            axis=1,
        )

        self.output_df = merged_with_state_income_df

    def load(self) -> None:
        logger.info("Saving Census ACS Median Income CSV")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
