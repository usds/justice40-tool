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
class CSVConfig:
    @dataclass
    class GlobalConfig:
        @dataclass
        class RoundingNum:
            float: int
            loss_rate_percentage: int

        sort_by_label: str
        rounding_num: RoundingNum

    @dataclass
    class Field:
        score_name: str
        label: str
        format: FieldType = field(metadata={"by_value": True})

    global_config: GlobalConfig
    fields: List[Field]
