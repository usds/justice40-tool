from pathlib import Path

from dynaconf import Dynaconf

settings = Dynaconf(
    envvar_prefix="DYNACONF",
    settings_files=["settings.toml", ".secrets.toml"],
    environments=True,
)

# set root dir
settings.APP_ROOT = Path.cwd()

# To set an environment use:
# Linux/OSX: export ENV_FOR_DYNACONF=staging
# Windows: set ENV_FOR_DYNACONF=staging
