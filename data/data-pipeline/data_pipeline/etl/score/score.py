import collections
import functools
from pathlib import Path
from typing import Dict, List
import pandas as pd

from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)

class Score():
    def __init__(self, df: pd.DataFrame) -> None:
        pass

    def columns(self):
        pass
