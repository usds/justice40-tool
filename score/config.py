from dynaconf import Dynaconf

settings = Dynaconf(
    envvar_prefix="DYNACONF",
    settings_files=["settings.toml", ".secrets.toml"],
    environments=True,
)

# To set an environment use:
# Linux/OSX: export ENV_FOR_DYNACONF=staging
# Windows: set ENV_FOR_DYNACONF=staging
