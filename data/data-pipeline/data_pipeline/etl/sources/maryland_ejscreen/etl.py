from glob import glob
import geopandas as gpd
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger
from data_pipeline.score import field_names
from data_pipeline.config import settings

logger = get_module_logger(__name__)


class MarylandEJScreenETL(ExtractTransformLoad):
    """Maryland EJSCREEN class that ingests dataset represented
    here: https://p1.cgis.umd.edu/mdejscreen/help.html
    Please see the README in this module for further details.
    """

    def __init__(self):
        self.MARYLAND_EJSCREEN_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/MD_EJScreen.zip"
        )

        self.SHAPE_FILES_PATH = self.TMP_PATH / "mdejscreen"
        self.OUTPUT_CSV_PATH = self.DATA_PATH / "dataset" / "maryland_ejscreen"

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.MARYLAND_EJSCREEN_TRACT_25_PERCENTILE_FIELD,
            field_names.MARYLAND_EJSCREEN_TRACT_50_PERCENTILE_FIELD,
            field_names.MARYLAND_EJSCREEN_TRACT_75_PERCENTILE_FIELD,
            field_names.MARYLAND_EJSCREEN_TRACT_90_PERCENTILE_FIELD,
            field_names.MARYLAND_EJSCREEN_SCORE_FIELD,
            field_names.MARYLAND_EJSCREEN_BURDENED_THRESHOLD_FIELD,
        ]

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Downloading Maryland EJSCREEN Data")
        super().extract(
            self.MARYLAND_EJSCREEN_URL,
            self.TMP_PATH,
        )

    def transform(self) -> None:
        logger.info("Transforming Maryland EJSCREEN Data")

        list_of_files = list(glob(str(self.SHAPE_FILES_PATH) + "/*.shp"))

        # Ignore counties becauses this is not the level of measurement
        # that is consistent with our current scoring and ranking methodology.
        dfs_list = [
            gpd.read_file(f)
            for f in list_of_files
            if not f.endswith("CountiesEJScore.shp")
        ]

        # Set the Census tract as the index and drop the geometry column
        # that produces the census tract boundaries.
        # The latter is because Geopandas raises an exception if there
        # are duplicate geometry columns.
        # Moreover, since the unit of measurement is at the tract level
        # we can consistantly merge this with other datasets
        dfs_list = [
            df.set_index("Census_Tra").drop("geometry", axis=1)
            for df in dfs_list
        ]
        # pylint: disable=unsubscriptable-object
        combined_df = gpd.GeoDataFrame(pd.concat(dfs_list, axis=1))

        # Reset index so that we no longer have the tract as our index
        combined_df = combined_df.reset_index()
        # coerce into integer into
        # pylint: disable=unsupported-assignment-operation, unsubscriptable-object
        combined_df["Census_Tra"] = (combined_df["Census_Tra"]).astype(int)

        # Drop the 10 census tracts that are zero: please see here:
        # https://github.com/usds/justice40-tool/issues/239#issuecomment-995821572
        combined_df = combined_df[combined_df["Census_Tra"] != 0]

        # Set our class instance variable after conversions in lines 50-81
        self.df = combined_df.copy()

        # Rename columns
        self.df.rename(
            columns={
                "Census_Tra": self.GEOID_TRACT_FIELD_NAME,
                "EJScore": field_names.MARYLAND_EJSCREEN_SCORE_FIELD,
            },
            inplace=True,
        )

        # This computational step will be used to establish a
        # threshold for burden (line 104)
        self.df[
            field_names.MARYLAND_EJSCREEN_SCORE_FIELD
            + field_names.PERCENTILE_FIELD_SUFFIX
        ] = self.df[field_names.MARYLAND_EJSCREEN_SCORE_FIELD].rank(
            pct=True, ascending=True
        )

        # An arbitrarily chosen threshold is used in the comparison tool output
        self.df[field_names.MARYLAND_EJSCREEN_BURDENED_THRESHOLD_FIELD] = (
            self.df[
                field_names.MARYLAND_EJSCREEN_SCORE_FIELD
                + field_names.PERCENTILE_FIELD_SUFFIX
            ]
            >= 0.75
        )

        # Baseline Comparisons with some quartiles and the 90th percent OF EJ Score
        # Interpretation: The score is greater than or equal to N% of the tracts in the state.
        # Please see the README for details on the EJScore interpretation
        self.df[field_names.MARYLAND_EJSCREEN_TRACT_25_PERCENTILE_FIELD] = (
            self.df[field_names.MARYLAND_EJSCREEN_SCORE_FIELD] >= 0.25
        )
        self.df[field_names.MARYLAND_EJSCREEN_TRACT_50_PERCENTILE_FIELD] = (
            self.df[field_names.MARYLAND_EJSCREEN_SCORE_FIELD] >= 0.50
        )
        self.df[field_names.MARYLAND_EJSCREEN_TRACT_75_PERCENTILE_FIELD] = (
            self.df[field_names.MARYLAND_EJSCREEN_SCORE_FIELD] >= 0.75
        )
        self.df[field_names.MARYLAND_EJSCREEN_TRACT_90_PERCENTILE_FIELD] = (
            self.df[field_names.MARYLAND_EJSCREEN_SCORE_FIELD] >= 0.90
        )

    def load(self) -> None:
        logger.info("Saving Maryland EJSCREEN CSV")
        # write maryland tracts to csv
        self.OUTPUT_CSV_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            self.OUTPUT_CSV_PATH / "maryland.csv", index=False
        )
