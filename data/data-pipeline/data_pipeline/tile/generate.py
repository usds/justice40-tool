import os
from pathlib import Path
from subprocess import call

from data_pipeline.utils import get_module_logger, remove_all_from_dir

logger = get_module_logger(__name__)


def generate_tiles(data_path: Path) -> None:

    score_tiles_path = data_path / "score" / "tiles"
    high_tile_path = score_tiles_path / "high"
    low_tile_path = score_tiles_path / "low"
    score_geojson_dir = data_path / "score" / "geojson"

    USA_HIGH_MIN_ZOOM = 5
    USA_HIGH_MAX_ZOOM = 11
    USA_LOW_MIN_ZOOM = 0
    USA_LOW_MAX_ZOOM = 7

    # remove existing mbtiles file
    remove_all_from_dir(score_tiles_path)

    # create dirs
    os.mkdir(high_tile_path)
    os.mkdir(low_tile_path)

    # generate high mbtiles file
    logger.info("Generating USA High mbtiles file")
    cmd = "tippecanoe "
    cmd += f"--minimum-zoom={USA_HIGH_MIN_ZOOM} --maximum-zoom={USA_HIGH_MAX_ZOOM} --layer=blocks "
    cmd += f"--output={high_tile_path}/usa_high.mbtiles "
    cmd += str(score_geojson_dir / "usa-high.json")
    call(cmd, shell=True)

    # generate high mvts
    logger.info("Generating USA High mvt folders and files")
    cmd = "tippecanoe "
    cmd += f"--minimum-zoom={USA_HIGH_MIN_ZOOM} --maximum-zoom={USA_HIGH_MAX_ZOOM} --no-tile-compression "
    cmd += "--drop-densest-as-needed "
    cmd += f"--output-to-directory={high_tile_path} --layer=blocks "
    cmd += str(score_geojson_dir / "usa-high.json")
    call(cmd, shell=True)

    # generate low mbtiles file
    logger.info("Generating USA Low mbtiles file")
    cmd = "tippecanoe "
    cmd += f"--minimum-zoom={USA_LOW_MIN_ZOOM} --maximum-zoom={USA_LOW_MAX_ZOOM} --layer=blocks "
    cmd += f"--output={low_tile_path}/usa_low.mbtiles "
    cmd += str(score_geojson_dir / "usa-low.json")
    call(cmd, shell=True)

    # generate low mvts
    logger.info("Generating USA Low mvt folders and files")
    cmd = "tippecanoe "
    cmd += f"--minimum-zoom={USA_LOW_MIN_ZOOM} --maximum-zoom={USA_LOW_MAX_ZOOM} --no-tile-compression "
    cmd += "--drop-densest-as-needed "
    cmd += f"--output-to-directory={low_tile_path} --layer=blocks "
    cmd += str(score_geojson_dir / "usa-low.json")
    call(cmd, shell=True)
