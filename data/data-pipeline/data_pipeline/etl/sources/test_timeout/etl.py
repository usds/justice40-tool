"""
For testing only, an etl job that always hangs forever.
"""
import time
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TestTimeoutETL(ExtractTransformLoad):
    def __init__(self):
        pass

    def extract(self) -> None:
        time.sleep(300000)

    def transform(self) -> None:
        pass

    def load(self) -> None:
        pass
