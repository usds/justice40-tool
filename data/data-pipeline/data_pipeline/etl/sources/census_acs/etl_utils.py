from pathlib import Path
from typing import List
import censusdata
import pandas as pd

from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


def _fips_from_censusdata_censusgeo(
        censusgeo: censusdata.censusgeo
) -> str:
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
        raise_errors: bool = False,
) -> pd.DataFrame:
    """Retrieves and combines census ACS data for a given year."""
    dfs = []
    for fips in get_state_fips_codes(data_path_for_fips_codes):
        logger.info(
            f"Downloading data for state/territory with FIPS code {fips}"
        )

        try:
            response = censusdata.download(
                src=acs_type,
                year=acs_year,
                geo=censusdata.censusgeo(
                    [("state", fips), ("county", "*"), ("tract", "*")]
                ),
                var=variables,
            )
            dfs.append(response)

        except ValueError as e:
            logger.error(
                f"Could not download data for state/territory with FIPS code {fips}"
            )

            if raise_errors:
                raise e

    df = pd.concat(dfs)

    df[tract_output_field_name] = df.index.to_series().apply(
        func=_fips_from_censusdata_censusgeo
    )

    return df
