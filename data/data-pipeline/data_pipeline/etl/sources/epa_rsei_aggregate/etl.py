from pathlib import Path
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class EPARiskScreeningEnvironmentalIndicatorsETL(ExtractTransformLoad):
    """Class for 2019 Census Tract RSEI Aggregated micro-data

    Data source overview: Page 20 in this document:
    https://www.epa.gov/sites/default/files/2017-01/documents/rsei-documentation-geographic-microdata-v235.pdf

    Disaggregated and aggregated datasets for 2019 is documented here:
    https://github.com/usds/justice40-tool/issues/1070#issuecomment-1005604014

    """

    def __init__(self):
        self.AGGREGATED_RSEI_SCORE_FILE_URL = "http://abt-rsei.s3.amazonaws.com/microdata2019/census_agg/CensusMicroTracts2019_2019_aggregated.zip"

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH
            / "dataset"
            / "epa_rsei_aggregated_risk_environmental_indicators"
        )
        self.EPA_RSEI_SCORE_THRESHOLD_CUTOFF = 0.75
        self.TRACT_INPUT_COLUMN_NAME = "GEOID10"
        self.NUMBER_FACILITIES_INPUT_FIELD = "NUMFACS"
        self.NUMBER_RELEASES_INPUT_FIELD = "NUMRELEASES"
        self.NUMBER_CHEMICALS_INPUT_FIELD = "NUMCHEMS"
        self.AVERAGE_TOXICITY_INPUT_FIELD = "TOXCONC"
        self.SCORE_INPUT_FIELD = "SCORE"
        self.POPULATION_INPUT_FIELD = "POP"
        self.CSCORE_INPUT_FIELD = "CSCORE"
        self.NCSCORE_INPUT_FIELD = "NSCORE"

        # References to the columns that will be output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            field_names.EPA_RSEI_NUMBER_FACILITIES_OUTPUT_FIELD,
            field_names.EPA_RSEI_NUMBER_RELEASES_OUTPUT_FIELD,
            field_names.EPA_RSEI_NUMBER_CHEMICALS_OUTPUT_FIELD,
            field_names.EPA_RSEI_AVERAGE_TOXICITY_OUTPUT_FIELD,
            field_names.EPA_RSEI_SCORE_OUTPUT_FIELD,
            field_names.EPA_RSEI_CSCORE_OUTPUT_FIELD,
            field_names.EPA_RSEI_NCSCORE_OUTPUT_FIELD,
            field_names.EPA_RSEI_POPULATION_OUTPUT_FIELD,
            field_names.EPA_RSEI_SCORE_PERCENTILE_RANK_FIELD,
            field_names.EPA_RSEI_SCORE_THRESHOLD_FIELD,
        ]

        self.df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting 2.5 MB data download.")

        unzip_file_from_url(
            file_url=self.AGGREGATED_RSEI_SCORE_FILE_URL,
            download_path=self.TMP_PATH,
            unzipped_file_path=self.TMP_PATH
            / "epa_rsei_aggregated_risk_environmental_indicators",
        )

        self.df = pd.read_csv(
            filepath_or_buffer=self.TMP_PATH
            / "epa_rsei_aggregated_risk_environmental_indicators"
            / "CensusMicroTracts2019_2019_aggregated.csv",
            # The following need to remain as strings for all of their digits, not get
            # converted to numbers.
            low_memory=False,
            header=0,
        )

    def transform(self) -> None:
        logger.info("Starting transforms.")

        # the column headers from the above dataset are actually a census tract's data at this point
        # We will use this data structure later
        input_columns = [
            self.TRACT_INPUT_COLUMN_NAME,
            self.NUMBER_FACILITIES_INPUT_FIELD,
            self.NUMBER_RELEASES_INPUT_FIELD,
            self.NUMBER_CHEMICALS_INPUT_FIELD,
            self.AVERAGE_TOXICITY_INPUT_FIELD,
            self.SCORE_INPUT_FIELD,
            self.POPULATION_INPUT_FIELD,
            self.CSCORE_INPUT_FIELD,
            self.NCSCORE_INPUT_FIELD,
        ]
        # The subsequent step make the current columns the first row
        # of the dataframe and adds it as an individual sample
        first_row = dict(zip(input_columns, self.df.columns))
        self.df.columns = input_columns
        # add first row to dataframe
        row_df = pd.DataFrame(first_row, index=[0]).reset_index(drop=True)
        # simply concatenate both dataframes
        self.df = pd.concat([row_df, self.df])

        score_columns = [x for x in self.df.columns if "SCORE" in x]

        # coerce dataframe type to perform correct next steps
        self.df[score_columns] = self.df[score_columns].astype(float)

        self.df.rename(
            columns={
                self.TRACT_INPUT_COLUMN_NAME: self.GEOID_TRACT_FIELD_NAME,
                self.NUMBER_FACILITIES_INPUT_FIELD: field_names.EPA_RSEI_NUMBER_FACILITIES_OUTPUT_FIELD,
                self.NUMBER_RELEASES_INPUT_FIELD: field_names.EPA_RSEI_NUMBER_RELEASES_OUTPUT_FIELD,
                self.NUMBER_CHEMICALS_INPUT_FIELD: field_names.EPA_RSEI_NUMBER_CHEMICALS_OUTPUT_FIELD,
                self.AVERAGE_TOXICITY_INPUT_FIELD: field_names.EPA_RSEI_AVERAGE_TOXICITY_OUTPUT_FIELD,
                self.SCORE_INPUT_FIELD: field_names.EPA_RSEI_SCORE_OUTPUT_FIELD,
                self.CSCORE_INPUT_FIELD: field_names.EPA_RSEI_CSCORE_OUTPUT_FIELD,
                self.NCSCORE_INPUT_FIELD: field_names.EPA_RSEI_NCSCORE_OUTPUT_FIELD,
                self.POPULATION_INPUT_FIELD: field_names.EPA_RSEI_POPULATION_OUTPUT_FIELD,
            },
            inplace=True,
        )

        # Please note this: https://www.epa.gov/rsei/understanding-rsei-results#what
        # Section: "What does a high RSEI Score mean?"
        # Produce percentile rank for overall risk score
        # This was created for the sole purpose to be used in the current
        # iteration of Score L
        self.df[field_names.EPA_RSEI_SCORE_PERCENTILE_RANK_FIELD] = self.df[
            field_names.EPA_RSEI_SCORE_OUTPUT_FIELD
        ].rank(
            ascending=True,
            pct=True,
        )

        # This threshold was arbitrarily chosen.
        # It would make sense to enrich this with facilities, industries, or chemical
        # that would enable some additional form of sub-stratification when examining
        # different percentile ranges that are derived above.
        self.df[field_names.EPA_RSEI_SCORE_THRESHOLD_FIELD] = (
            self.df[field_names.EPA_RSEI_SCORE_PERCENTILE_RANK_FIELD]
            > self.EPA_RSEI_SCORE_THRESHOLD_CUTOFF
        )

        expected_census_tract_field_length = 11
        self.df[self.GEOID_TRACT_FIELD_NAME] = (
            self.df[self.GEOID_TRACT_FIELD_NAME]
            .astype(str)
            .apply(lambda x: x.zfill(expected_census_tract_field_length))
        )

        if (
            not self.df[self.GEOID_TRACT_FIELD_NAME]
            .apply(lambda x: len(str(x)))
            .eq(expected_census_tract_field_length)
            .all()
        ):
            raise ValueError(
                f"GEOID Tract must be length of {expected_census_tract_field_length}"
            )

    def validate(self) -> None:
        logger.info("Validating data.")

        pass

    def load(self) -> None:
        logger.info("Saving CSV")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )
