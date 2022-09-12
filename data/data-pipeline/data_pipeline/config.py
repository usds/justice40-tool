import pathlib

from dynaconf import Dynaconf

import data_pipeline

settings = Dynaconf(
    envvar_prefix="DYNACONF",
    settings_files=["settings.toml", ".secrets.toml"],
    environments=True,
)

# set root dir
settings.APP_ROOT = pathlib.Path(data_pipeline.__file__).resolve().parent
settings.DATA_PATH = settings.APP_ROOT / "data"
settings.REQUESTS_DEFAULT_TIMOUT = 3600
# To set an environment use:
# Linux/OSX: export ENV_FOR_DYNACONF=staging
# Windows: set ENV_FOR_DYNACONF=staging
