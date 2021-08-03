from pathlib import Path
import os
from subprocess import call

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
    cmd += "--minimum-zoom=5 --maximum-zoom=11 --layer=blocks "
    cmd += "--output=" + str(high_tile_path) + "/usa_high.mbtiles "
    cmd += str(score_geojson_dir / "usa-high.json")
    call(cmd, shell=True)

    # generate high mvts
    logger.info(f"Generating USA High mvt folders and files")
    cmd = "tippecanoe "
    cmd += "--minimum-zoom=5 --maximum-zoom=11 --no-tile-compression "
    cmd += "--output-to-directory=" + str(high_tile_path) + " "
    cmd += str(score_geojson_dir / "usa-high.json")
    call(cmd, shell=True)

    # generate low mbtiles file
    logger.info(f"Generating USA Low mbtiles file")
    cmd = "tippecanoe "
    cmd += "--minimum-zoom=0 --maximum-zoom=7 --layer=blocks "
    cmd += "--output=" + str(low_tile_path) + "/usa_low.mbtiles "
    cmd += str(score_geojson_dir / "usa-low.json")
    call(cmd, shell=True)

    # generate low mvts
    logger.info(f"Generating USA Low mvt folders and files")
    cmd = "tippecanoe --minimum-zoom=0 --maximum-zoom=7 --no-tile-compression "
    cmd += "--output-to-directory=" + str(low_tile_path) + " "
    cmd += str(score_geojson_dir / "usa-low.json")
    call(cmd, shell=True)
