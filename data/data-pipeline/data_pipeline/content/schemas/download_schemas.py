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
class RoundingNum:
    float: int
    loss_rate_percentage: int


@dataclass
class Field:
    score_name: str
    label: str
    format: FieldType = field(metadata={"by_value": True})


@dataclass
class CSVConfig:
    @dataclass
    class GlobalConfig:
        sort_by_label: str
        rounding_num: RoundingNum

    global_config: GlobalConfig
    fields: List[Field]


@dataclass
class ExcelConfig:
    @dataclass
    class GlobalConfig:
        @dataclass
        class ExcelGlobalConfig:
            default_column_width: int

        sort_by_label: str
        rounding_num: RoundingNum
        excel_config: ExcelGlobalConfig

    @dataclass
    class SheetItem:
        label: str
        fields: List[Field]

    global_config: GlobalConfig
    sheets: List[SheetItem]


@dataclass
class CodebookConfig:
    @dataclass
    class Field:
        score_name: str
        notes: Optional[str]
        category: Optional[str]

    fields: List[Field]
