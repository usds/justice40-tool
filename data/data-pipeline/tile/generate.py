from pathlib import Path
import os

from utils import remove_all_from_dir
from utils import get_module_logger

logger = get_module_logger(__name__)


def generate_tiles(data_path: Path) -> None:

    score_tiles_path = data_path / "score" / "tiles"
    high_tile_path = score_tiles_path / "high"
    low_tile_path = score_tiles_path / "low"
    score_geojson_dir = data_path / "score" / "geojson"

    # remove existing mbtiles file
    remove_all_from_dir(score_tiles_path)

    # create dirs
    os.mkdir(high_tile_path)
    os.mkdir(low_tile_path)

    # generate high mbtiles file
    logger.info(f"Generating USA High mbtiles file")
    cmd = "tippecanoe "
    cmd += "--force -Z 5 -z 11 -l usa_high "
    cmd += "-o " + str(high_tile_path) + "/usa_high.mbtiles "
    cmd += str(score_geojson_dir / "usa-high.json")
    os.system(cmd)

    # generate high mvts
    logger.info(f"Generating USA High mvt folders and files")
    cmd = "tippecanoe "
    cmd += " --drop-densest-as-needed --no-tile-compression  -zg "
    cmd += "-e " + str(high_tile_path) + " "
    cmd += str(score_geojson_dir / "usa-high.json")
    os.system(cmd)

    # generate low mbtiles file
    logger.info(f"Generating USA Low mbtiles file")
    cmd = "tippecanoe "
    cmd += "--force -Z 5 -z 11 -l usa_low "
    cmd += "-o " + str(low_tile_path) + "/usa_low.mbtiles "
    cmd += str(score_geojson_dir / "usa-low.json")
    os.system(cmd)

    # generate low mvts
    logger.info(f"Generating USA Low mvt folders and files")
    cmd = "tippecanoe "
    cmd += " --drop-densest-as-needed --no-tile-compression  -zg "
    cmd += "-e " + str(low_tile_path) + " "
    cmd += str(score_geojson_dir / "usa-low.json")
    os.system(cmd)
