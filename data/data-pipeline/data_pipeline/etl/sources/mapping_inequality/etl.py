from collections import namedtuple
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import download_file_from_url, get_module_logger

logger = get_module_logger(__name__)


class MappingInequalityETL(ExtractTransformLoad):
    """Load Mapping Inequality data.

    Information on the source data is available at
    https://dsl.richmond.edu/panorama/redlining/.

    Information on the mapping of this data to census tracts is available at
    https://github.com/americanpanorama/Census_HOLC_Research.

    """

    def __init__(self):
        self.MAPPING_INEQUALITY_CSV_URL = (
            "https://raw.githubusercontent.com/americanpanorama/Census_HOLC_Research/"
            "main/2010_Census_Tracts/holc_tract_lookup.csv"
        )
        self.MAPPING_INEQUALITY_CSV = self.TMP_PATH / "holc_tract_lookup.csv"
        self.CSV_PATH = self.DATA_PATH / "dataset" / "mapping_inequality"

        # Some input field names. From documentation: 'Census Tracts were intersected
        # with HOLC Polygons. Census information can be joined via the "geoid" field.
        # There are two field "holc_prop" and "tract_prop" which give the proportion
        # of the HOLC polygon in the Census Tract and the proportion of Census Tract
        # in the HOLC Polygon respectively.'
        # https://github.com/americanpanorama/Census_HOLC_Research/blob/main/2010_Census_Tracts/README.md
        self.TRACT_INPUT_FIELD: str = "geoid"
        self.TRACT_PROPORTION_FIELD: str = "tract_prop"
        self.HOLC_GRADE_AND_ID_FIELD: str = "holc_id"

        self.HOLC_GRADE_FIELD: str = "HOLC Grade"

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading Mapping Inequality Data")
        download_file_from_url(
            file_url=self.MAPPING_INEQUALITY_CSV_URL,
            download_file_name=self.MAPPING_INEQUALITY_CSV,
        )

    def transform(self) -> None:
        logger.info("Transforming Mapping Inequality Data")
        df = pd.read_csv(
            self.MAPPING_INEQUALITY_CSV,
            dtype={self.TRACT_INPUT_FIELD: "string"},
            low_memory=False,
        )

        # rename Tract ID
        df.rename(
            columns={
                self.TRACT_INPUT_FIELD: self.GEOID_TRACT_FIELD_NAME,
            },
            inplace=True,
        )

        # Keep the first character, which is the HOLC grade (A, B, C, D).
        df[self.HOLC_GRADE_FIELD] = df[self.HOLC_GRADE_AND_ID_FIELD].str[0:1]

        # Remove nonsense when the field has no grade or invalid grades.
        valid_grades = ["A", "B", "C", "D"]
        df.loc[
            ~df[self.HOLC_GRADE_FIELD].isin(valid_grades), self.HOLC_GRADE_FIELD
        ] = None

        # Some data needs to be manually mapped to its grade.
        ManualHolcGrade = namedtuple(
            typename="ManualHolcGrade",
            field_names=["city", "holc_ids", "grade"],
        )

        manual_holc_grades = [
            ManualHolcGrade(
                city="Providence", holc_ids=["25", "26"], grade="D"
            ),
            ManualHolcGrade(
                city="Oklahoma City",
                holc_ids=[
                    "46R",
                    "47R",
                    "48R",
                    "49R",
                    "50R",
                    "51R",
                    "52R",
                    "53R",
                    "54R",
                    "55R",
                    "56R",
                    "57R",
                    "58R",
                    "59R",
                    "60R",
                    "61R",
                    "62B",
                    "63R",
                    "64R",
                    "65R",
                    "66R",
                    "67R",
                    "68R",
                    "69R",
                    "70R",
                    "80R",
                    "81R",
                    "85R",
                    "86R",
                    "87R",
                    "88R",
                    "89R",
                    "90R",
                ],
                grade="D",
            ),
        ]

        logger.info(df[self.HOLC_GRADE_FIELD].unique())

        self.df = df

    def load(self) -> None:
        logger.info("Saving Mapping Inequality CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "usa.csv", index=False)
