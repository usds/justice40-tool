from glob import glob
import geopandas as gpd
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings
from data_pipeline.score import field_names


logger = get_module_logger(__name__)


class MDEJScreenETL(ExtractTransformLoad):
    def __init__(self):
        self.MARYLAND_EJSCREEN_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/MD_EJScreen.zip"
        )

        self.SHAPE_FILES_PATH = self.TMP_PATH / "mdejscreen"
        self.OUTPUT_CSV_PATH = self.DATA_PATH / "dataset" / "mdejscreen"
        self.MDEJSCREEN_PERCENTILE_FIELD_NAME = "mdejscreen_percentile"

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading Maryland EJScreen Data")
        super().extract(
            self.MARYLAND_EJSCREEN_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        logger.info("Transforming Maryland EJScreen Data")

        # Load comparison shape files that comprise Maryland EJScreen
        # https://p1.cgis.umd.edu/mdejscreen/help.html
        # From the documentation:
        # Each of the following categories contains a number of relevant indicators,
        # and an averaged score. The two "Pollution Burden" average scores are then
        # averaged together and the result is multiplied by the average of the
        # "Population Characteristics" categories to get the total EJ Score of each tract.
        # For each indicator, the percentile is given.
        # For example, the indicator value for "Asthma Emergency Discharges" with 0.9 is therefore in
        # the 90th percentile, which means only 10% of tracts in Maryland have higher values.
        # EJ Scores near 1 represent areas of the greatest environmental justice concern.

        list_of_files = list(glob(str(self.SHAPE_FILES_PATH) + "/*.shp"))
        # # ignore counties becauses this is not the level of measurement
        # # that is consistent with our current scoring and ranking methodology

        dfs_list = [
            gpd.read_file(f)
            for f in list_of_files
            if not f.endswith("CountiesEJScore.shp")
        ]

        # set the Census tract as the index and drop the geometry column
        # that produces the census tract boundaries
        # geopandas raises an exception if there are duplicate geometry columns
        # Moreover, since the unit of measurement is at the tract level
        # we can consistantly merge this with another dataset
        dfs_list = [
            df.set_index("Census_Tra").drop("geometry", axis=1)
            for df in dfs_list
        ]
        # pylint: disable=unsubscriptable-object
        combined_df = gpd.GeoDataFrame(pd.concat(dfs_list, axis=1))

        # reset index so that we no longer have the tract as our index
        combined_df = combined_df.reset_index()
        # coerce into integer into
        # pylint: disable=unsupported-assignment-operation, unsubscriptable-object
        combined_df["Census_Tra"] = (combined_df["Census_Tra"]).astype(int)

        # drop the 10 census tracts that are zero: please see here:
        # https://github.com/usds/justice40-tool/issues/239#issuecomment-995821572
        combined_df = combined_df[combined_df["Census_Tra"] != 0]

        self.df = combined_df.copy()

        self.df.rename(
            columns={
                "Census_Tra": self.GEOID_TRACT_FIELD_NAME,
                "EJScore": self.MDEJSCREEN_PERCENTILE_FIELD_NAME,
            },
            inplace=True,
        )

        # Baseline Comparisons at quartiles and the 90th percentile
        # Interpretation: The score is greater than
        # N% of the tracts in the state
        self.df[field_names.MDEjSCREEN_TRACT_25_PERCENT_FIELD] = (
            self.df[self.MDEJSCREEN_PERCENTILE_FIELD_NAME] > 0.25
        )
        self.df[field_names.MDEjSCREEN_TRACT_50_PERCENT_FIELD] = (
            self.df[self.MDEJSCREEN_PERCENTILE_FIELD_NAME] > 0.50
        )
        self.df[field_names.MDEjSCREEN_TRACT_75_PERCENT_FIELD] = (
            self.df[self.MDEJSCREEN_PERCENTILE_FIELD_NAME] > 0.75
        )
        self.df[field_names.MDEjSCREEN_TRACT_90_PERCENT_FIELD] = (
            self.df[self.MDEJSCREEN_PERCENTILE_FIELD_NAME] > 0.90
        )

    def load(self) -> None:
        logger.info("Saving Maryland EJScreen CSV")
        # write maryland tracts to csv
        self.OUTPUT_CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(
            self.OUTPUT_CSV_PATH / "marylandejscreen.csv", index=False
        )
