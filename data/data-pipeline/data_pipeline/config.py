from pathlib import Path
from importlib.resources import path

from dynaconf import Dynaconf

settings = Dynaconf(
    envvar_prefix="DYNACONF",
    settings_files=["settings.toml", ".secrets.toml"],
    environments=True,
)

# set root dir
with path(__package__, ".") as p:
    settings.APP_ROOT = p

# To set an environment use:
# Linux/OSX: export ENV_FOR_DYNACONF=staging
# Windows: set ENV_FOR_DYNACONF=staging
