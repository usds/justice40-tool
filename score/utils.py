from pathlib import Path
import os
import logging
import shutil
import requests
import zipfile


def get_module_logger(module_name):
    """
    To use this, do logger = get_module_logger(__name__)
    """
    logger = logging.getLogger(module_name)
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        "%(asctime)s [%(name)-12s] %(levelname)-8s %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)
    return logger


logger = get_module_logger(__name__)


def remove_files_from_dir(files_path: Path, extension: str = None) -> None:
    for file in os.listdir(files_path):
        if extension:
            if not file.endswith(extension):
                continue
        else:
            # don't rempove __init__ files as they conserve dir structure
            if file == "__init__.py":
                continue
        os.remove(files_path / file)
        logger.info(f"Removing {file}")


def remove_all_from_dir(files_path: Path) -> None:
    for file in os.listdir(files_path):
        # don't rempove __init__ files as they conserve dir structure
        if file == "__init__.py":
            continue
        if os.path.isfile(files_path / file):
            os.remove(files_path / file)
        else:
            shutil.rmtree(files_path / file)
        logger.info(f"Removing {file}")


def remove_all_dirs_from_dir(dir_path: Path) -> None:
    for filename in os.listdir(dir_path):
        file_path = os.path.join(dir_path, filename)
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)
            logging.info(f"Removing directory {file_path}")


def unzip_file_from_url(
    file_url: str, download_path: Path, zip_file_directory: Path, verify: bool = False
) -> None:
    logger.info(f"Downloading {file_url}")
    download = requests.get(file_url, verify=verify)
    file_contents = download.content
    zip_file_path = download_path / "downloaded.zip"
    zip_file = open(zip_file_path, "wb")
    zip_file.write(file_contents)
    zip_file.close()

    logger.info(f"Extracting {zip_file_path}")
    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
        zip_ref.extractall(zip_file_directory)

    # cleanup temporary file
    os.remove(zip_file_path)
