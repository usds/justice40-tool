import pandas as pd


class Score:
    def __init__(self, df: pd.DataFrame) -> None:
        self.df = df

    def add_columns(self) -> pd.DataFrame:
        raise NotImplementedError
