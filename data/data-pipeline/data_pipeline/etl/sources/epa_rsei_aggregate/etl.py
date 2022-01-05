from pathlib import Path
import math
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.score import field_names
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class EPARSEISCOREETL(ExtractTransformLoad):
    """Class for 2019 Census Tract Aggregated micro-data

    Data source overview: Page 20 in this document:
    https://www.epa.gov/sites/default/files/2017-01/documents/rsei-documentation-geographic-microdata-v235.pdf

    Disaggregated and aggregated datasets for 2019 is documented here:
    https://github.com/usds/justice40-tool/issues/1070#issuecomment-1005604014

    """

    def __init__(self):
        self.AGGREGATED_RSEI_SCORE_FILE_URL = "http://abt-rsei.s3.amazonaws.com/microdata2019/census_agg/CensusMicroTracts2019_2019_aggregated.zip"

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "epa_rsei_aggregated_microdata"
        )

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
            field_names.EPA_RSEI_SCORE_PERCENTILE_LABEL_FIELD,
            field_names.EPA_RSEI_NCSCORE_PERCENTILE_LABEL_FIELD,
            field_names.EPA_RSEI_CSCORE_PERCENTILE_LABEL_FIELD,
            field_names.EPA_RSEI_SCORE_PERCENTILE_RANK_FIELD,
            field_names.EPA_RSEI_SCORE_THRESHOLD_FIELD,
        ]

        self.df: pd.DataFrame

    def _custom_percentile(self, data, percentile):
        """Custom percentile function for any univariate distribution
        Args:
            data (pd.Series): Sample distribution and the percentile that we want to calculate
            percentile (float): The percentile to compute
        Returns:
            output (float): Value for the percentile
        """
        if percentile == 100:
            raise ValueError("Percentile cannot be 100")

        n = len(data)
        p = n * percentile / 100
        output = None
        # if integer search for the p-th values in our distribution (sorted in ascending order)
        if p.is_integer():
            output = sorted(data)[int(p)]
        # if this else clause is not added one will get an error
        # that says that the index value of the list should be an integer number
        else:
            output = sorted(data)[int(math.ceil(p)) - 1]
        return output

    def extract(self) -> None:
        logger.info("Starting 2.5 MB data download.")

        unzip_file_from_url(
            file_url=self.AGGREGATED_RSEI_SCORE_FILE_URL,
            download_path=self.TMP_PATH,
            unzipped_file_path=self.TMP_PATH / "epa_rsei_aggregated_microdata",
        )

        self.df = pd.read_csv(
            filepath_or_buffer=self.TMP_PATH
            / "epa_rsei_aggregated_microdata"
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

        # 5th, 25th, 50th, 75th and 99th percentiles for each score column
        # this will yield n - 1 categorical variables where n = 5 percentiles specified
        index = [5, 25, 50, 75, 99]
        # Parameter for Cut function
        labels_for_cut_function = [
            "5 - 25 percentile values for score",
            "25 - 50 percentile value for score",
            "50 - 75 percentile value for score",
            "75 - 99 percentile value for score",
        ]

        # Generate percentile values specified by index above
        # Each is specific to the three different scores
        perc_func_overall_risk_score = [
            self._custom_percentile(
                self.df[field_names.EPA_RSEI_SCORE_OUTPUT_FIELD].values, i
            )
            for i in index
        ]

        perc_func_cancer_score = [
            self._custom_percentile(
                self.df[field_names.EPA_RSEI_CSCORE_OUTPUT_FIELD].values, i
            )
            for i in index
        ]

        perc_func_non_cancer_score = [
            self._custom_percentile(
                self.df[field_names.EPA_RSEI_NCSCORE_OUTPUT_FIELD].values, i
            )
            for i in index
        ]

        # The rationale for creating these is located here https://www.epa.gov/rsei/understanding-rsei-results#what
        # Section: "What does a high RSEI Score mean?"

        # The cut function creates equispaced bins but frequency of samples is unequal in each bin
        # It is certainly possible to apply qcut. qcut is a quantile based function to create bins
        # Quantile is to divide the data into equal number of subgroups or probability distributions of
        # equal probability into continuous interval. I opted for cut as it offers greater flexibility in
        # creating percentile bins.
        #
        # The result produces a cateogrical variable that affords easier stratification
        # when performing more advanced statistical analyses of each component of the distribution. This is pertienent
        # if we seek to combine this data with population characteristics and demographics - for example, ACS and CDC SVI Index -
        # in order to chracterize each section of the "higher scoring" tracts for cancer-related and non-cancer related toxicity
        self.df[field_names.EPA_RSEI_SCORE_PERCENTILE_LABEL_FIELD] = pd.cut(
            self.df[field_names.EPA_RSEI_SCORE_OUTPUT_FIELD],
            right=True,  # include right-most interval
            bins=perc_func_overall_risk_score,
            labels=labels_for_cut_function,
            ordered=True,
        )

        self.df[field_names.EPA_RSEI_CSCORE_PERCENTILE_LABEL_FIELD] = pd.cut(
            self.df[field_names.EPA_RSEI_CSCORE_OUTPUT_FIELD],
            right=True,
            bins=perc_func_cancer_score,
            labels=labels_for_cut_function,
            ordered=True,
        )

        self.df[field_names.EPA_RSEI_NCSCORE_PERCENTILE_LABEL_FIELD] = pd.cut(
            self.df[field_names.EPA_RSEI_NCSCORE_OUTPUT_FIELD],
            right=True,
            bins=perc_func_non_cancer_score,
            labels=labels_for_cut_function,
            ordered=True,
        )

        self.df[field_names.EPA_RSEI_SCORE_PERCENTILE_RANK_FIELD] = self.df[
            field_names.EPA_RSEI_SCORE_OUTPUT_FIELD
        ].rank(
            ascending=True,
            pct=True,
        )

        # This threshold was arbitrarily chosen. After all,
        # RSEI Scores are only meaningful in comparison to other RSEI Scores.
        # It would make sense to enrich this with facilities, industries, or chemical
        # that would enable some additional form of sub-stratification when examining
        # different percentile ranges that are derived above.
        self.df[field_names.EPA_RSEI_SCORE_THRESHOLD_FIELD] = (
            self.df[field_names.EPA_RSEI_SCORE_PERCENTILE_RANK_FIELD] > 0.90
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
