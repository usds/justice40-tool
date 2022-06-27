from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional


class FieldType(Enum):
    STRING = "string"
    INT64 = "int64"
    BOOL = "bool"
    FLOAT = "float"
    PERCENTAGE = "percentage"
    LOSS_RATE_PERCENTAGE = "loss_rate_percentage"


@dataclass
class DatasetsConfig:
    @dataclass
    class Dataset:
        """A class that defines a dataset and its load variables.

        Attributes:
            long_name (str): A human readable title for the dataset.
            short_name (str): used to compose the short variable names for tiles/arcgis. All short variable names will be prepended
            with the short name of the data set it comes from, i.e. `nri__ex_loss`.
            module_name (str): A string that matches both the Python module name for the dataset and the `NAME` property on the ETL class.
            description (str): A human readable description of the dataset.
            load_fields (LoadField): A list of type LoadField that will drive the score ETL and side effects (tiles, downloadables).
        """

        @dataclass
        class LoadField:
            """A class to define the fields to be saved on the dataset's output.

            These fields will be then imported by the score generation ETL.

            Attributes:
                short_name (str): Used in conjunction with the dataset's `short_name` for files where short names are needed.
                df_field_name (str): Name for the field in the etl class.
                long_name (str): Column name for the dataset's output csv.
                field_type (FieldType): An enum that dictates what type of field this is. This will be used on the `etl_score_post`
                for the data manipulation.
                The `by_value` metadata prop will load the field type's Enum value instead of the index, i.e. "string" and not STRING
                reverse_percentile (Optional bool): An optional bool to denote this field to be a reverse_percentile.
                TODO: data/data-pipeline/data_pipeline/etl/score/etl_score.py:477
                include_in_tiles (bool): Include this field on the tile export.
                include_in_csv (bool): Include this field on the CSV export.
                include_in_excel (bool): Include this field on the Excel export.
            """

            short_name: str
            df_field_name: str
            long_name: str
            field_type: FieldType = field(metadata={"by_value": True})
            reverse_percentile: Optional[bool]
            include_in_tiles: bool
            include_in_csv: bool
            include_in_excel: bool

        long_name: str
        short_name: str
        module_name: str
        description: str
        input_geoid_tract_field_name: str
        load_fields: List[LoadField]

    datasets: List[Dataset]
