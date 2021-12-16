from glob import glob
import geopandas as gpd
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class MDEJScreenETL(ExtractTransformLoad):
    def __init__(self):
        self.MARYLAND_EJSCREEN_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/MD_EJScreen.zip"
        )

        self.SHAPE_FILES_PATH = self.TMP_PATH / "mdejscreen"

        self.CSV_PATH = self.DATA_PATH / "dataset" / "mdejscreen"

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
        # From the documentation (verbatim):
        # Each of the following categories contains a number of relevant indicators,
        # and an averaged score. The two "Pollution Burden" average scores are then
        # averaged together and the result is multiplied by the average of the
        # "Population Characteristics" categories to get the total EJ Score of each tract.
        # For each indicator, the percentile is given.
        # For example, the indicator value for  "Asthma Emergency Discharges" with 0.9 is therefore in
        # the 90th percentile, which means only 10% of tracts in Maryland have higher values.
        # EJ Scores near 1 represent areas of the greatest environmental justice concern.

        list_of_files = list(glob(str(self.SHAPE_FILES_PATH) + "/*.shp"))
        # # we ignore counties becauses this is not the level of measurement
        # # that is consistent with our current scoring and ranking methodology
        dfs_list = [
            gpd.read_file(f)
            for f in list_of_files
            if not f.endswith("CountiesEJScore.shp")
        ]

        # now we st the Census tract as the index and drop the geometry
        # geopandas raises an exception if there are duplicate geometry columns
        # Moreover, since we have the unit of measurement at the tract level
        # we can consistantly merge this with another dataset
        dfs_list = [
            df.set_index("Census_Tra").drop("geometry", axis=1)
            for df in dfs_list
        ]

        combined_df = gpd.GeoDataFrame(pd.concat(dfs_list, axis=1))

        # reset index so that we no longer have the tract as our index
        combined_df = combined_df.reset_index()
        # this looks odd at first glance
        # however we have to first coerce the floating types
        # to integers and then back into our string (object really)
        # that is consistant with
        combined_df["Census_Tra"].astype(int).astype(str)

        # drop the 10 census tracts that are zero: please see here:
        # https://github.com/usds/justice40-tool/issues/239#issuecomment-995821572
        combined_df = combined_df[combined_df["Census_Tra"] != "0"]

        self.df = combined_df.copy()

        self.df.rename(
            columns={
                "Census_Tra": self.GEOID_TRACT_FIELD_NAME,
                "EjScore": self.MDEJSCREEN_PERCENTILE_FIELD_NAME,
            },
            inplace=True,
        )

    def load(self) -> None:
        logger.info("Saving Maryland EJScreen CSV")
        # write nationwide csv
        self.CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df.to_csv(self.CSV_PATH / "marylandejscreen.csv", index=False)
