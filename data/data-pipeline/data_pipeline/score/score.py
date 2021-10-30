import pandas as pd
import data_pipeline.score.field_names as FN

from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class Score:
    def __init__(self, df: pd.DataFrame) -> None:
        self.df = df

    def add_columns(self) -> pd.DataFrame:
        pass
