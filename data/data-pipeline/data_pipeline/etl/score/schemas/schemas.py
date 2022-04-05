from dataclasses import dataclass, field
from enum import Enum
from typing import List


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
        @dataclass
        class LoadField:
            short_name: str
            df_field_name: str
            long_name: str
            field_type: FieldType = field(metadata={"by_value": True})
            tile_include: bool
            csv_download: bool
            excel_download: bool

        long_name: str
        short_name: str
        module_name: str
        last_updated_year: int
        source_url: str
        extracted_file_name: str
        description: str
        input_geoid_tract_field_name: str
        null_representation: str
        load_fields: List[LoadField]

    datasets: List[Dataset]
