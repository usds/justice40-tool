import warnings
import geopandas as gpd
import numpy as np
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad, ValidGeoLevel
from data_pipeline.etl.sources.geo_utils import (
    add_tracts_for_geometries,
    get_tribal_geojson,
    get_tract_geojson,
)
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TribalOverlapETL(ExtractTransformLoad):
    """Calculates the overlap between Census tracts and Tribal boundaries."""

    # Metadata for the baseclass
    NAME = "tribal_overlap"
    GEO_LEVEL = ValidGeoLevel.CENSUS_TRACT

    PUERTO_RICO_EXPECTED_IN_DATA = False
    ALASKA_AND_HAWAII_EXPECTED_IN_DATA = True
    EXPECTED_MISSING_STATES = [
        "10",
        "11",
        "13",
        "15",
        "17",
        "18",
        "21",
        "24",
        "33",
        "34",
        "39",
        "50",
        "51",
        "54",
    ]

    # A Tribal area that requires some special processing.
    ANNETTE_ISLAND_TRIBAL_NAME = "Annette Island LAR"

    # Define these for easy code completion
    def __init__(self):
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.COUNT_OF_TRIBAL_AREAS_IN_TRACT,
            field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT,
            field_names.NAMES_OF_TRIBAL_AREAS_IN_TRACT,
        ]

        self.output_df: pd.DataFrame
        self.census_tract_gdf: gpd.GeoDataFrame
        self.tribal_gdf: gpd.GeoDataFrame

    @staticmethod
    def _create_string_from_list(series: pd.Series) -> str:
        """Helper method that creates a sorted string list (for tribal names)."""
        str_list = series.tolist()
        str_list = sorted(str_list)
        return ", ".join(str_list)

    def extract(self) -> None:
        self.census_tract_gdf = get_tract_geojson()
        self.tribal_gdf = get_tribal_geojson()

    def transform(self) -> None:
        logger.info("Starting tribal overlap transforms.")

        # First, calculate whether tracts include any areas from the Tribal areas,
        # for both the points in AK and the polygons in the continental US (CONUS).
        tribal_overlap_with_tracts = add_tracts_for_geometries(
            df=self.tribal_gdf, tract_data=self.census_tract_gdf
        )

        tribal_overlap_with_tracts = tribal_overlap_with_tracts.groupby(
            [self.GEOID_TRACT_FIELD_NAME]
        ).agg(
            {
                field_names.TRIBAL_ID: "count",
                field_names.TRIBAL_LAND_AREA_NAME: self._create_string_from_list,
            }
        )

        tribal_overlap_with_tracts = tribal_overlap_with_tracts.reset_index()

        tribal_overlap_with_tracts = tribal_overlap_with_tracts.rename(
            columns={
                field_names.TRIBAL_ID: field_names.COUNT_OF_TRIBAL_AREAS_IN_TRACT,
                field_names.TRIBAL_LAND_AREA_NAME: field_names.NAMES_OF_TRIBAL_AREAS_IN_TRACT,
            }
        )

        # Second, calculate percentage overlap.
        # Drop the points from the Tribal data (because these cannot be joined to a
        # (Multi)Polygon tract data frame)
        tribal_gdf_without_points = self.tribal_gdf[
            self.tribal_gdf.geom_type != "Point"
        ]

        # Create a measure for the entire census tract area
        with warnings.catch_warnings():
            # Note: geopandas will (helpfully) warn that area is not a useful metric
            # without being converted to a CRS. However, since we are simply using a
            # percentage, dividing two area values from the same CRS, this warning is
            # not relevant. Therefore we suppress it.
            warnings.simplefilter("ignore", UserWarning)
            self.census_tract_gdf["area_tract"] = self.census_tract_gdf.area

            # Performing overlay funcion
            gdf_joined = gpd.overlay(
                self.census_tract_gdf,
                tribal_gdf_without_points,
                how="intersection",
            )
            # Calculating the areas of the newly-created overlapping geometries
            gdf_joined["area_joined"] = gdf_joined.area

        # Calculating the areas of the newly-created geometries in relation
        # to the original tract geometries
        gdf_joined[field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT] = (
            gdf_joined["area_joined"] / gdf_joined["area_tract"]
        )

        # Aggregate the results
        percentage_results = gdf_joined.groupby(
            [self.GEOID_TRACT_FIELD_NAME]
        ).agg({field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT: "sum"})

        percentage_results = percentage_results.reset_index()

        # Merge the two results.
        merged_output_df = tribal_overlap_with_tracts.merge(
            right=percentage_results,
            how="outer",
            on=self.GEOID_TRACT_FIELD_NAME,
        )

        # Finally, fix one unique error.
        # There is one unique Tribal area (self.ANNETTE_ISLAND_TRIBAL_NAME) that is a polygon in
        # Alaska. All other Tribal areas in Alaska are points.
        # For tracts that *only* contain that Tribal area, leave percentage as is.
        # For tracts that include that Tribal area AND Alaska Native villages,
        # null the percentage, because we cannot calculate the percent of the tract
        # this is within Tribal areas.

        # Create state FIPS codes.
        merged_output_df_state_fips_code = merged_output_df[
            self.GEOID_TRACT_FIELD_NAME
        ].str[0:2]

        # Start by testing for Annette Island exception, to make sure data is as
        # expected
        alaskan_non_annette_matches = (
            # Data from Alaska
            (merged_output_df_state_fips_code == "02")
            # Where the Tribal areas do *not* include Annette
            & (
                ~merged_output_df[
                    field_names.NAMES_OF_TRIBAL_AREAS_IN_TRACT
                ].str.contains(self.ANNETTE_ISLAND_TRIBAL_NAME)
            )
            # But somehow percentage is greater than zero.
            & (
                merged_output_df[field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT]
                > 0
            )
        )

        # There should be none of these matches.
        if sum(alaskan_non_annette_matches) > 0:
            raise ValueError(
                "Data has changed. More than one Alaskan Tribal Area has polygon "
                "boundaries. You'll need to refactor this ETL. \n"
                f"Data:\n{merged_output_df[alaskan_non_annette_matches]}"
            )

        # Now, fix the exception that is already known.
        merged_output_df[
            field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT
        ] = np.where(
            # For tracts inside Alaska
            (merged_output_df_state_fips_code == "02")
            # That are not only represented by Annette Island
            & (
                merged_output_df[field_names.NAMES_OF_TRIBAL_AREAS_IN_TRACT]
                != self.ANNETTE_ISLAND_TRIBAL_NAME
            ),
            # Set the value to `None` for tracts with more than just Annette.
            None,
            # Otherwise, set the value to what it was.
            merged_output_df[field_names.PERCENT_OF_TRIBAL_AREA_IN_TRACT],
        )

        self.output_df = merged_output_df
