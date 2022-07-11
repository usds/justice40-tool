from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class TribalETL(ExtractTransformLoad):
    def __init__(self):
        self.GEOJSON_BASE_PATH = self.DATA_PATH / "tribal" / "geojson"
        self.CSV_BASE_PATH = self.DATA_PATH / "tribal" / "csv"

    def extract(self) -> None:
        """Extract the tribal geojson zip files from Justice40 S3 data folder

        Returns:
            None
        """
        logger.info("Downloading Tribal Data")
        pass

    def transform(self) -> None:
        """Transform the tribal geojson zip files to generate national CSVs and GeoJSONs

        Returns:
            None
        """
        logger.info("Transforming Tribal Data")
        pass

    def load(self) -> None:
        """Create tribal national CSV and GeoJSON

        Returns:
            None
        """
        logger.info("Saving Tribal CSV and GeoJson")
        pass
