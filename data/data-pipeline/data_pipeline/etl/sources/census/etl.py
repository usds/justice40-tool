import csv
import json
import subprocess
from enum import Enum
from pathlib import Path

import geopandas as gpd
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, unzip_file_from_url

from data_pipeline.etl.sources.census.etl_utils import get_state_fips_codes

logger = get_module_logger(__name__)


class GeoFileType(Enum):
    SHP = 1
    GEOJSON = 2
    CSV = 3


class CensusETL(ExtractTransformLoad):
    def __init__(self):
        self.SHP_BASE_PATH = self.DATA_PATH / "census" / "shp"
        self.GEOJSON_BASE_PATH = self.DATA_PATH / "census" / "geojson"
        self.CSV_BASE_PATH = self.DATA_PATH / "census" / "csv"
        # the fips_states_2010.csv is generated from data here
        # https://www.census.gov/geographies/reference-files/time-series/geo/tallies.html
        self.STATE_FIPS_CODES = get_state_fips_codes(self.DATA_PATH)
        self.GEOJSON_PATH = self.DATA_PATH / "census" / "geojson"
        self.TRACT_PER_STATE: dict = {}  # in-memory dict per state
        self.TRACT_NATIONAL: list = []  # in-memory global list
        self.NATIONAL_TRACT_CSV_PATH = self.CSV_BASE_PATH / "us.csv"
        self.NATIONAL_TRACT_JSON_PATH = self.GEOJSON_BASE_PATH / "us.json"
        self.GEOID_TRACT_FIELD_NAME: str = "GEOID10_TRACT"

    def _path_for_fips_file(
        self, fips_code: str, file_type: GeoFileType
    ) -> Path:
        """Get paths for associated geospatial files for the provided FIPS code

        Args:
            fips_code (str): the FIPS code for the region of interest
            file_type (GeoFileType): the geo file type of interest

        Returns:
            Path on disk to the file_type file corresponding to this FIPS
        """
        file_path: Path
        if file_type == GeoFileType.SHP:
            file_path = Path(
                self.SHP_BASE_PATH
                / fips_code
                / f"tl_2010_{fips_code}_tract10.shp"
            )
        elif file_type == GeoFileType.GEOJSON:
            file_path = Path(self.GEOJSON_BASE_PATH / f"{fips_code}.json")
        elif file_type == GeoFileType.CSV:
            file_path = Path(self.CSV_BASE_PATH / f"{fips_code}.csv")
        return file_path

    def _extract_shp(self, fips_code: str) -> None:
        """Download the SHP file for the provided FIPS code

        Args:
            fips_code (str): the FIPS code for the region of interest

        Returns:
            None
        """
        shp_file_path = self._path_for_fips_file(fips_code, GeoFileType.SHP)
        logger.info(f"Checking if {fips_code} shp file exists")

        # check if file exists
        if not shp_file_path.is_file():
            logger.info(
                f"{fips_code} shp file does not exist. Downloading and extracting shape file"
            )

            tract_state_url = f"https://www2.census.gov/geo/tiger/TIGER2010/TRACT/2010/tl_2010_{fips_code}_tract10.zip"
            unzip_file_from_url(
                tract_state_url,
                self.TMP_PATH,
                self.DATA_PATH / "census" / "shp" / fips_code,
            )

    def extract(self) -> None:
        logger.info("Downloading Census Data")
        for fips_code in self.STATE_FIPS_CODES:
            self._extract_shp(fips_code)

    def _transform_to_geojson(self, fips_code: str) -> None:
        """Convert the downloaded SHP file for the associated FIPS to geojson

        Returns:
            None
        """
        shp_file_path = self._path_for_fips_file(fips_code, GeoFileType.SHP)
        geojson_file_path = self._path_for_fips_file(
            fips_code, GeoFileType.GEOJSON
        )
        logger.info(f"Checking if {fips_code} geoJSON file exists ")
        if not geojson_file_path.is_file():
            logger.info(
                f"GeoJSON file {fips_code} does not exist. Converting shp to geoJSON"
            )
            cmd = [
                "ogr2ogr",
                "-f",
                "GeoJSON",
                str(geojson_file_path),
                str(shp_file_path),
            ]
            subprocess.run(cmd, check=True)

    def _generate_tract_table(self) -> None:
        """Generate Tract CSV table for pandas, load in memory

        Returns:
            None
        """
        for file in self.GEOJSON_BASE_PATH.iterdir():
            if file.suffix == ".json":
                logger.info(f"Ingesting geoid10 for file {file}")
                with open(self.GEOJSON_BASE_PATH / file, encoding="utf-8") as f:
                    geojson = json.load(f)
                    for feature in geojson["features"]:
                        tractid10 = feature["properties"]["GEOID10"]
                        self.TRACT_NATIONAL.append(str(tractid10))
                        tractid10_state_id = tractid10[:2]
                        if not self.TRACT_PER_STATE.get(tractid10_state_id):
                            self.TRACT_PER_STATE[tractid10_state_id] = []
                        self.TRACT_PER_STATE[tractid10_state_id].append(
                            tractid10
                        )

    def transform(self) -> None:
        """Download all census shape files from the Census FTP and extract the geojson
        to generate national and by state Census tract CSVs and GeoJSONs

        Returns:
            None
        """
        logger.info("Transforming Census Data")
        for fips_code in self.STATE_FIPS_CODES:
            self._transform_to_geojson(fips_code)
        self._generate_tract_table()

    def _load_into_state_csvs(self, fips_code: str) -> None:
        """Load state CSVS into individual CSV files

        Args:
            fips_code (str): the FIPS code for the region of interest

        Returns:
            None
        """
        ## write to individual state csv
        tractid10_list = self.TRACT_PER_STATE[fips_code]
        csv_path = self._path_for_fips_file(fips_code, GeoFileType.CSV)
        with open(
            csv_path, mode="w", newline="", encoding="utf-8"
        ) as cbg_csv_file:
            tract_csv_file_writer = csv.writer(
                cbg_csv_file,
                delimiter=",",
                quotechar='"',
                quoting=csv.QUOTE_MINIMAL,
            )

            for tractid10 in tractid10_list:
                tract_csv_file_writer.writerow(
                    [
                        tractid10,
                    ]
                )

    def _load_national_csv(self):
        """Write national-level csv combining

        Returns:
            None
        """
        logger.info("Writing national us.csv file")

        if not self.NATIONAL_TRACT_CSV_PATH.is_file():
            logger.info(f"Creating {self.NATIONAL_TRACT_CSV_PATH}")
            with open(
                self.NATIONAL_TRACT_CSV_PATH,
                mode="w",
                newline="",
                encoding="utf-8",
            ) as cbg_csv_file:
                cbg_csv_file_writer = csv.writer(
                    cbg_csv_file,
                    delimiter=",",
                    quotechar='"',
                    quoting=csv.QUOTE_MINIMAL,
                )
                for geoid10 in self.TRACT_NATIONAL:
                    cbg_csv_file_writer.writerow(
                        [
                            geoid10,
                        ]
                    )

    def _load_national_geojson(self):
        """Create national geojson

        Returns:
            None
        """
        logger.info("Generating national geojson file")

        usa_df = gpd.GeoDataFrame()

        for file_name in self.GEOJSON_BASE_PATH.rglob("*.json"):
            logger.info(f"Ingesting {file_name}")
            state_gdf = gpd.read_file(file_name)
            usa_df = usa_df.append(state_gdf)

        usa_df = usa_df.to_crs(
            "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
        )
        logger.info("Writing national geojson file")
        usa_df.to_file(self.NATIONAL_TRACT_JSON_PATH, driver="GeoJSON")

        logger.info("Census tract downloading complete")

    def load(self) -> None:
        """Create state CSVs, National CSV, and National GeoJSON

        Returns:
            None
        """
        logger.info("Saving Census CSV")
        for fips_code in self.TRACT_PER_STATE:
            self._load_into_state_csvs(fips_code)
        self._load_national_csv()
        self._load_national_geojson()
