import typing
from typing import List

import geopandas as gpd
import numpy as np
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.etl.sources.geo_utils import (
    add_tracts_for_geometries,
    get_tribal_geojson,
    get_tract_geojson,
)
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class GeoCorrAlternativesETL(ExtractTransformLoad):
    """Calculates overlap between Census tracts & various alternative geographies."""

    # Metadata for the baseclass
    NAME = "geocorr_alternatives"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    INPUT_GEOCORR_TRACT_FIELD = "tract"
    INPUT_GEOCORR_COUNTY_FIELD = "county"
    INPUT_GEOCORR_ZIP_FIELD = "zcta5"
    INPUT_GEOCORR_ALLOCATION_FIELD = "afact"

    # GeoCorr downloads have a field definition in the second row of the CSV.
    # This parameter skips the second row for pandas `read_csv`.
    GEOCORR_SKIP_ROWS: typing.List[int] = [1]

    # GeoCorr 2010 Zip Codes (Zip Code Tabulation Area 5, ZCTA5) -> 2010 Tracts
    # This file was generated in the UI at https://mcdc.missouri.edu/.
    # The network request to generate it is:
    # https://mcdc.missouri.edu/cgi-bin/broker?_PROGRAM=apps.geocorr2018.sas&_SERVICE=MCDC_long&_debug=0&state=Mo29&state=Al01&state=Ak02&state=Az04&state=Ar05&state=Ca06&state=Co08&state=Ct09&state=De10&state=Dc11&state=Fl12&state=Ga13&state=Hi15&state=Id16&state=Il17&state=In18&state=Ia19&state=Ks20&state=Ky21&state=La22&state=Me23&state=Md24&state=Ma25&state=Mi26&state=Mn27&state=Ms28&state=Mt30&state=Ne31&state=Nv32&state=Nh33&state=Nj34&state=Nm35&state=Ny36&state=Nc37&state=Nd38&state=Oh39&state=Ok40&state=Or41&state=Pa42&state=Ri44&state=Sc45&state=Sd46&state=Tn47&state=Tx48&state=Ut49&state=Vt50&state=Va51&state=Wa53&state=Wv54&state=Wi55&state=Wy56&g1_=zcta5&g2_=tract&wtvar=pop10&nozerob=1&title=&csvout=1&namoptf=b&listout=1&lstfmt=html&namoptr=b&oropt=&counties=&metros=&places=&latitude=&longitude=&locname=&distance=&kiloms=0&nrings=&r1=&r2=&r3=&r4=&r5=&r6=&r7=&r8=&r9=&r10=&lathi=&latlo=&longhi=&longlo=
    ZIP_CODES_TO_TRACTS_PATH = (
        settings.AWS_JUSTICE40_DATASOURCES_URL
        + "/geocorr2018_zcta5_to_tracts.csv.zip"
    )

    COLUMNS_TO_KEEP = [
        ExtractTransformLoad.GEOID_TRACT_FIELD_NAME,
        field_names.ZIP_CODE,
        field_names.PERCENT_OF_ZIP_CODE_IN_TRACT,
    ]

    # Define these for easy code completion
    def __init__(self):
        self.ZIP_CODES_TO_TRACTS_CSV = (
            self.get_tmp_path() / "geocorr2018_zcta5_to_tracts.csv"
        )

        self.output_df: pd.DataFrame

    def extract(self) -> None:
        # Load the tracts to zip codes data.
        unzip_file_from_url(
            file_url=self.ZIP_CODES_TO_TRACTS_PATH,
            download_path=self.get_tmp_path(),
            unzipped_file_path=self.get_tmp_path(),
            verify=True,
        )

    def transform(self) -> None:
        logger.info("Starting GeoCorr alternatives transforms.")
        zip_codes_to_tracts_df = pd.read_csv(
            filepath_or_buffer=self.ZIP_CODES_TO_TRACTS_CSV,
            dtype={
                self.INPUT_GEOCORR_TRACT_FIELD: "string",
                self.INPUT_GEOCORR_COUNTY_FIELD: "string",
                self.INPUT_GEOCORR_ZIP_FIELD: "string",
            },
            skiprows=self.GEOCORR_SKIP_ROWS,
        )

        zip_codes_to_tracts_df = zip_codes_to_tracts_df.rename(
            columns={
                self.INPUT_GEOCORR_ALLOCATION_FIELD: field_names.PERCENT_OF_ZIP_CODE_IN_TRACT,
                self.INPUT_GEOCORR_ZIP_FIELD: field_names.ZIP_CODE,
            },
            errors="raise",
        )

        # Create the tract ID by combining fields from GeoCorr.
        zip_codes_to_tracts_df[self.GEOID_TRACT_FIELD_NAME] = (
            zip_codes_to_tracts_df[self.INPUT_GEOCORR_COUNTY_FIELD]
            + zip_codes_to_tracts_df[self.INPUT_GEOCORR_TRACT_FIELD]
        )
        # Remove unnecessary periods.
        zip_codes_to_tracts_df[
            self.GEOID_TRACT_FIELD_NAME
        ] = zip_codes_to_tracts_df[self.GEOID_TRACT_FIELD_NAME].str.replace(
            ".", "", regex=False
        )

        logger.info(zip_codes_to_tracts_df.head())

        self.output_df = zip_codes_to_tracts_df

    # TODO: DELETE
    def validate(self) -> None:
        pass
