from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional


class FieldType(Enum):
    STRING = "string"
    INT64 = "int64"
    BOOL = "bool"
    FLOAT = "float"
    PERCENTAGE = "percentage"


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
            description_short (str): Description used in the side panel.
            description_long (str): Description used in the Methodology page.
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
                field_type (FieldType): An enum that dictates what type of field this is. This will be used on the `etl_score_post` for the
                    data manipulation. The `by_value` metadata prop will load the field type's Enum value instead of the index, i.e. "string"
                    and not STRING
                number_of_decimals_in_output (int): Used to represent number of decimals in side effects, like Excel.
                include_in_tiles (bool): Include this field on the tile export.
                include_in_csv (bool): Include this field on the CSV export.
                include_in_excel (bool): Include this field on the Excel export.
                column_position (float): column position in CSV and Excel files. Value can be 2.5 to include an item between 2 and 3.
                create_percentile (bool): Whether or not the backend processing should create a percentile field (ranked in ascending order) from the
                    values in this field.
                create_reverse_percentile (bool): Whether or not the backend processing should create a "reverse percentile" field (ranked in
                    descending order) from the values in this field.
                include_in_comparison_tool_as_index (Optional bool): Whether or not to include this field in the comparison tool
                    as an index used as comparison (e.g., this field might be a state or national index that identifies priority communities).
                    The field itself must be a boolean for the comparison tool to work appropriately.
                include_in_comparison_tool_as_statistical_descriptor (Optional bool): Whether or not to include this field in the comparison tool as a
                    statistical descriptor of census tracts (e.g., this field might income levels, life expectancy, etc). This will be
                    used to generate reports that produce information such as, tracts identified by Index A but not Index B have higher
                    income levels but lower life expectancy.
            """

            short_name: str
            df_field_name: str
            long_name: str
            field_type: FieldType = field(metadata={"by_value": True})
            number_of_decimals_in_output: Optional[int]
            include_in_tiles: bool
            include_in_csv: bool
            include_in_excel: bool
            column_position: float
            create_percentile: Optional[bool]
            create_reverse_percentile: Optional[bool]
            include_in_comparison_tool_as_index: Optional[bool]
            include_in_comparison_tool_as_statistical_descriptor: Optional[bool]

        long_name: str
        short_name: str
        module_name: str
        description_short: str
        description_long: str
        input_geoid_tract_field_name: str
        load_fields: List[LoadField]

    datasets: List[Dataset]
