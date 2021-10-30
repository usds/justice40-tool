from pathlib import Path
from typing import Dict, List
import pandas as pd
import field_names as FN

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

class Score():
    def __init__(self, df: pd.DataFrame) -> None:
        pass

    def columns(self) -> pd.DataFrame:
        pass
