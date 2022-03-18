import os
from pathlib import Path
from typing import List
import censusdata
import pandas as pd

from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

CENSUS_ACS_FIPS_CODES_TO_SKIP = ["60", "66", "69", "78"]


def _fips_from_censusdata_censusgeo(censusgeo: censusdata.censusgeo) -> str:
    """Create a FIPS code from the proprietary censusgeo index."""
    fips = "".join([value for (key, value) in censusgeo.params()])
    return fips


# pylint: disable=too-many-arguments
def retrieve_census_acs_data(
    acs_year: int,
    variables: List[str],
    tract_output_field_name: str,
    data_path_for_fips_codes: Path,
    acs_type="acs5",
) -> pd.DataFrame:
    """Retrieves and combines census ACS data for a given year."""
    dfs = []
    for fips in get_state_fips_codes(data_path_for_fips_codes):
        if fips in CENSUS_ACS_FIPS_CODES_TO_SKIP:
            logger.info(
                f"Skipping download for state/territory with FIPS code {fips}"
            )
        else:
            census_api_key = ""
            if os.environ.get("CENSUS_API_KEY"):
                census_api_key = "with API key"
            logger.info(
                f"Downloading data for state/territory with FIPS code {fips} {census_api_key}"
            )

            try:
                response = censusdata.download(
                    src=acs_type,
                    year=acs_year,
                    geo=censusdata.censusgeo(
                        [("state", fips), ("county", "*"), ("tract", "*")]
                    ),
                    var=variables,
                    key=os.environ.get("CENSUS_API_KEY"),
                )
                dfs.append(response)

            except ValueError as e:
                logger.error(
                    f"Could not download data for state/territory with FIPS code {fips}"
                )
                raise e

    df = pd.concat(dfs)

    df[tract_output_field_name] = df.index.to_series().apply(
        func=_fips_from_censusdata_censusgeo
    )

    return df
