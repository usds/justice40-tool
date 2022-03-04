from typing import List
import datetime
import json
import logging
import os
import sys
import shutil
import zipfile
from pathlib import Path
import urllib3
import requests
import yaml

from data_pipeline.config import settings


## zlib is not available on all systems
try:
    import zlib  # noqa # pylint: disable=unused-import

    compression = zipfile.ZIP_DEFLATED
except (ImportError, AttributeError):
    compression = zipfile.ZIP_STORED


def get_module_logger(module_name: str) -> logging.Logger:
    """Instantiates a logger object on stdout

    Args:
        module_name (str): Name of the module outputting the logs

    Returns:
        logger (Logging.logger): A logger object

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


def remove_files_from_dir(
    files_path: Path, extension: str = None, exception_list: list = None
) -> None:
    """Removes all files from a specific directory with the exception of __init__.py
    files or files with a specific extension

    Args:
        files_path (pathlib.Path): Name of the directory where the files will be deleted
        extension (str): Extension of the file pattern to delete, example "json" (optional)
        exception_list (list): List of files to not remove (optional)

    Returns:
        None

    """
    for file in os.listdir(files_path):
        # don't remove __init__ files as they conserve dir structure
        if file == "__init__.py":
            continue

        if exception_list:
            if file in exception_list:
                continue
        elif extension:
            if not file.endswith(extension):
                continue
        os.remove(files_path / file)
        logger.info(f"Removing {file}")


def remove_all_from_dir(files_path: Path) -> None:
    """Removes all files and directories from a specific directory, except __init__.py files

    Args:
        files_path (pathlib.Path): Name of the directory where the files and directories will be deleted

    Returns:
        None

    """
    if os.path.exists(files_path):
        for file in os.listdir(files_path):
            # don't rempove __init__ files as they conserve dir structure
            if file == "__init__.py":
                continue
            if os.path.isfile(files_path / file):
                os.remove(files_path / file)
            else:
                shutil.rmtree(files_path / file)
            logger.info(f"Removing {file}")
    else:
        logger.info(f"The following path does not exist: `{files_path}`.")


def remove_all_dirs_from_dir(dir_path: Path) -> None:
    """Removes all directories from a speficic directory

    Args:
        dir_path (pathlib.Path): Name of the directory where the directories will be deleted

    Returns:
        None

    """
    for filename in os.listdir(dir_path):
        file_path = os.path.join(dir_path, filename)
        if os.path.isdir(file_path):
            shutil.rmtree(file_path)
            logging.info(f"Removing directory {file_path}")


def download_file_from_url(
    file_url: str,
    download_file_name: Path,
    verify: bool = True,
) -> str:
    """Downloads a file from a remote URL location and returns the file location.

    Args:
        file_url (str): URL where the zip file is located
        download_file_name (pathlib.Path): file path where the file will be downloaded (called downloaded.zip by default)
        verify (bool): A flag to check if the certificate is valid. If truthy, an invalid certificate will throw an error (optional, default to False)

    Returns:
        None

    """
    # disable https warning
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    if not os.path.isdir(download_file_name.parent):
        os.mkdir(download_file_name.parent)

    logger.info(f"Downloading {file_url}")
    response = requests.get(file_url, verify=verify)
    if response.status_code == 200:
        file_contents = response.content
    else:
        sys.exit(
            f"HTTP response {response.status_code} from url {file_url}. Info: {response.content}"
        )

    # Write the contents to disk.
    file = open(download_file_name, "wb")
    file.write(file_contents)
    file.close()

    return download_file_name


def unzip_file_from_url(
    file_url: str,
    download_path: Path,
    unzipped_file_path: Path,
    verify: bool = True,
) -> None:
    """Downloads a zip file from a remote URL location and unzips it in a specific directory, removing the temporary file after

    Args:
        file_url (str): URL where the zip file is located
        download_path (pathlib.Path): directory where the temporary file will be downloaded (called downloaded.zip by default)
        unzipped_file_path (pathlib.Path): directory and name of the extracted file
        verify (bool): A flag to check if the certificate is valid. If truthy, an invalid certificate will throw an error (optional, default to False)

    Returns:
        None

    """
    zip_file_path = download_file_from_url(
        file_url=file_url,
        download_file_name=download_path / "downloaded.zip",
        verify=verify,
    )

    logger.info(f"Extracting {zip_file_path}")
    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
        zip_ref.extractall(unzipped_file_path)

    # cleanup temporary file
    os.remove(zip_file_path)


def data_folder_cleanup() -> None:
    """Remove all files and directories from the local data/dataset path"""

    data_path = settings.APP_ROOT / "data"

    logger.info("Initializing all dataset directoriees")
    remove_all_from_dir(data_path / "dataset")


def score_folder_cleanup() -> None:
    """Remove all files and directories from the local data/score path"""

    data_path = settings.APP_ROOT / "data"

    logger.info("Initializing all score data")
    remove_all_from_dir(data_path / "score" / "csv")
    remove_all_from_dir(data_path / "score" / "geojson")
    remove_all_from_dir(data_path / "score" / "tiles")
    downloadable_cleanup()


def downloadable_cleanup() -> None:
    """Remove all files from downloadable directory in the local data/score path"""

    data_path = settings.APP_ROOT / "data"
    remove_all_from_dir(data_path / "score" / "downloadable")


def temp_folder_cleanup() -> None:
    """Remove all files and directories from the local data/tmp temporary path"""

    data_path = settings.APP_ROOT / "data"

    logger.info("Initializing all temp directories")
    remove_all_from_dir(data_path / "tmp")


def check_first_run() -> bool:
    """Checks if a local flag file has been set and returns False
    if it hasn't"""

    data_path = settings.APP_ROOT / "data"
    file = "first_run.txt"

    if not os.path.isfile(data_path / file):
        return True

    return False


def get_zip_info(archive_path: Path) -> list:
    """
    Returns information about a provided archive

    Args:
        archive_path (pathlib.Path): Path of the archive to be inspected

    Returns:
        a list of information about every file in the zipfile

    """
    zf = zipfile.ZipFile(archive_path)
    info_list = []
    for info in zf.infolist():
        info_dict = {}
        info_dict["Filename"] = info.filename
        info_dict["Comment"] = info.comment.decode("utf8")
        info_dict["Modified"] = datetime.datetime(*info.date_time).isoformat()
        info_dict["System"] = f"{info.create_system} (0 = Windows, 3 = Unix)"
        info_dict["ZIP version"] = info.create_version
        info_dict["Compressed"] = f"{info.compress_size} bytes"
        info_dict["Uncompressed"] = f"{info.file_size} bytes"
        info_list.append(info_dict)
    return info_list


def zip_files(zip_file_path: Path, files_to_compress: List[Path]):
    """
    Zips a list of files in a path

    Args:
        zip_file_path (pathlib.Path): Path of the zip file where files are compressed

    Returns:
        None
    """
    with zipfile.ZipFile(zip_file_path, "w") as zf:
        for f in files_to_compress:
            zf.write(f, arcname=Path(f).name, compress_type=compression)
    zip_info = get_zip_info(zip_file_path)
    logger.info(json.dumps(zip_info, indent=4, sort_keys=True, default=str))


def zip_directory(
    origin_zip_directory: Path, destination_zip_directory: Path
) -> None:
    """
    Zips a whole directory

    Args:
        path (pathlib.Path): Path of the directory to be archived
    Returns:
        None

    """

    def zipdir(origin_directory: Path, ziph: zipfile.ZipFile):
        for root, dirs, files in os.walk(origin_directory):
            for file in files:
                logger.info(f"Compressing file: {file}")
                ziph.write(
                    os.path.join(root, file),
                    os.path.relpath(
                        os.path.join(root, file),
                        os.path.join(origin_directory, ".."),
                    ),
                    compress_type=compression,
                )

    logger.info(f"Compressing {Path(origin_zip_directory).name} directory")
    zip_file_name = f"{Path(origin_zip_directory).name}.zip"

    # start archiving
    zipf = zipfile.ZipFile(
        destination_zip_directory / zip_file_name, "w", zipfile.ZIP_DEFLATED
    )
    zipdir(f"{origin_zip_directory}/", zipf)
    zipf.close()

    logger.info(
        f"Completed compression of {Path(origin_zip_directory).name} directory"
    )


def load_yaml_dict_from_file(yaml_file_path: Path) -> dict:
    """Load a YAML file specified in path into a Python dictionary.

    Args:
        yaml_file_path (int): the path to the YAML file

    Returns:
        dict: the parsed YAML object as a Python dictionary
    """
    with open(yaml_file_path, encoding="UTF-8") as file:
        yaml_dict = yaml.load(file, Loader=yaml.FullLoader)
    return yaml_dict


def column_list_from_yaml_object_fields(
    yaml_object: dict, target_field: str
) -> list:
    """Creates a list of the columns from a YAML score configuration file fields list.

    Args:
        yaml_object (dict): raw dictionary returned from reading the YAML score configuration file
        target_field (str): the dict field to extract

    Returns:
        list: a list of all the fields that match the target field
    """
    yaml_list = []
    for field in yaml_object:
        yaml_list.append(field[target_field])
    return yaml_list


def load_dict_from_yaml_object_fields(
    yaml_object: dict, object_key: str, object_value: str
) -> dict:
    """Creates a dictionary with a configurable key and value from a YAML score configuration file fields list.

    Args:
        yaml_object (dict): raw dictionary returned from reading the YAML score configuratio nfile
        object_key (str): key for the dictionary
        object_value (str): value for the dictionary

    Returns:
        dict: a dict with the specified keys and values
    """
    yaml_dict = {}
    for field in yaml_object:
        yaml_dict[field[object_key]] = field[object_value]
    return yaml_dict


def get_excel_column_name(index: int) -> str:
    """Map a numeric index to the appropriate column in Excel. E.g., column #95 is "CR".
    Only works for the first 1000 columns.

    Args:
        index (int): the index of the column

    Returns:
        str: the excel column name
    """
    excel_column_names = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "AA",
        "AB",
        "AC",
        "AD",
        "AE",
        "AF",
        "AG",
        "AH",
        "AI",
        "AJ",
        "AK",
        "AL",
        "AM",
        "AN",
        "AO",
        "AP",
        "AQ",
        "AR",
        "AS",
        "AT",
        "AU",
        "AV",
        "AW",
        "AX",
        "AY",
        "AZ",
        "BA",
        "BB",
        "BC",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BK",
        "BL",
        "BM",
        "BN",
        "BO",
        "BP",
        "BQ",
        "BR",
        "BS",
        "BT",
        "BU",
        "BV",
        "BW",
        "BX",
        "BY",
        "BZ",
        "CA",
        "CB",
        "CC",
        "CD",
        "CE",
        "CF",
        "CG",
        "CH",
        "CI",
        "CJ",
        "CK",
        "CL",
        "CM",
        "CN",
        "CO",
        "CP",
        "CQ",
        "CR",
        "CS",
        "CT",
        "CU",
        "CV",
        "CW",
        "CX",
        "CY",
        "CZ",
        "DA",
        "DB",
        "DC",
        "DD",
        "DE",
        "DF",
        "DG",
        "DH",
        "DI",
        "DJ",
        "DK",
        "DL",
        "DM",
        "DN",
        "DO",
        "DP",
        "DQ",
        "DR",
        "DS",
        "DT",
        "DU",
        "DV",
        "DW",
        "DX",
        "DY",
        "DZ",
        "EA",
        "EB",
        "EC",
        "ED",
        "EE",
        "EF",
        "EG",
        "EH",
        "EI",
        "EJ",
        "EK",
        "EL",
        "EM",
        "EN",
        "EO",
        "EP",
        "EQ",
        "ER",
        "ES",
        "ET",
        "EU",
        "EV",
        "EW",
        "EX",
        "EY",
        "EZ",
        "FA",
        "FB",
        "FC",
        "FD",
        "FE",
        "FF",
        "FG",
        "FH",
        "FI",
        "FJ",
        "FK",
        "FL",
        "FM",
        "FN",
        "FO",
        "FP",
        "FQ",
        "FR",
        "FS",
        "FT",
        "FU",
        "FV",
        "FW",
        "FX",
        "FY",
        "FZ",
        "GA",
        "GB",
        "GC",
        "GD",
        "GE",
        "GF",
        "GG",
        "GH",
        "GI",
        "GJ",
        "GK",
        "GL",
        "GM",
        "GN",
        "GO",
        "GP",
        "GQ",
        "GR",
        "GS",
        "GT",
        "GU",
        "GV",
        "GW",
        "GX",
        "GY",
        "GZ",
        "HA",
        "HB",
        "HC",
        "HD",
        "HE",
        "HF",
        "HG",
        "HH",
        "HI",
        "HJ",
        "HK",
        "HL",
        "HM",
        "HN",
        "HO",
        "HP",
        "HQ",
        "HR",
        "HS",
        "HT",
        "HU",
        "HV",
        "HW",
        "HX",
        "HY",
        "HZ",
        "IA",
        "IB",
        "IC",
        "ID",
        "IE",
        "IF",
        "IG",
        "IH",
        "II",
        "IJ",
        "IK",
        "IL",
        "IM",
        "IN",
        "IO",
        "IP",
        "IQ",
        "IR",
        "IS",
        "IT",
        "IU",
        "IV",
        "IW",
        "IX",
        "IY",
        "IZ",
        "JA",
        "JB",
        "JC",
        "JD",
        "JE",
        "JF",
        "JG",
        "JH",
        "JI",
        "JJ",
        "JK",
        "JL",
        "JM",
        "JN",
        "JO",
        "JP",
        "JQ",
        "JR",
        "JS",
        "JT",
        "JU",
        "JV",
        "JW",
        "JX",
        "JY",
        "JZ",
        "KA",
        "KB",
        "KC",
        "KD",
        "KE",
        "KF",
        "KG",
        "KH",
        "KI",
        "KJ",
        "KK",
        "KL",
        "KM",
        "KN",
        "KO",
        "KP",
        "KQ",
        "KR",
        "KS",
        "KT",
        "KU",
        "KV",
        "KW",
        "KX",
        "KY",
        "KZ",
        "LA",
        "LB",
        "LC",
        "LD",
        "LE",
        "LF",
        "LG",
        "LH",
        "LI",
        "LJ",
        "LK",
        "LL",
        "LM",
        "LN",
        "LO",
        "LP",
        "LQ",
        "LR",
        "LS",
        "LT",
        "LU",
        "LV",
        "LW",
        "LX",
        "LY",
        "LZ",
        "MA",
        "MB",
        "MC",
        "MD",
        "ME",
        "MF",
        "MG",
        "MH",
        "MI",
        "MJ",
        "MK",
        "ML",
        "MM",
        "MN",
        "MO",
        "MP",
        "MQ",
        "MR",
        "MS",
        "MT",
        "MU",
        "MV",
        "MW",
        "MX",
        "MY",
        "MZ",
        "NA",
        "NB",
        "NC",
        "ND",
        "NE",
        "NF",
        "NG",
        "NH",
        "NI",
        "NJ",
        "NK",
        "NL",
        "NM",
        "NN",
        "NO",
        "NP",
        "NQ",
        "NR",
        "NS",
        "NT",
        "NU",
        "NV",
        "NW",
        "NX",
        "NY",
        "NZ",
        "OA",
        "OB",
        "OC",
        "OD",
        "OE",
        "OF",
        "OG",
        "OH",
        "OI",
        "OJ",
        "OK",
        "OL",
        "OM",
        "ON",
        "OO",
        "OP",
        "OQ",
        "OR",
        "OS",
        "OT",
        "OU",
        "OV",
        "OW",
        "OX",
        "OY",
        "OZ",
        "PA",
        "PB",
        "PC",
        "PD",
        "PE",
        "PF",
        "PG",
        "PH",
        "PI",
        "PJ",
        "PK",
        "PL",
        "PM",
        "PN",
        "PO",
        "PP",
        "PQ",
        "PR",
        "PS",
        "PT",
        "PU",
        "PV",
        "PW",
        "PX",
        "PY",
        "PZ",
        "QA",
        "QB",
        "QC",
        "QD",
        "QE",
        "QF",
        "QG",
        "QH",
        "QI",
        "QJ",
        "QK",
        "QL",
        "QM",
        "QN",
        "QO",
        "QP",
        "QQ",
        "QR",
        "QS",
        "QT",
        "QU",
        "QV",
        "QW",
        "QX",
        "QY",
        "QZ",
        "RA",
        "RB",
        "RC",
        "RD",
        "RE",
        "RF",
        "RG",
        "RH",
        "RI",
        "RJ",
        "RK",
        "RL",
        "RM",
        "RN",
        "RO",
        "RP",
        "RQ",
        "RR",
        "RS",
        "RT",
        "RU",
        "RV",
        "RW",
        "RX",
        "RY",
        "RZ",
        "SA",
        "SB",
        "SC",
        "SD",
        "SE",
        "SF",
        "SG",
        "SH",
        "SI",
        "SJ",
        "SK",
        "SL",
        "SM",
        "SN",
        "SO",
        "SP",
        "SQ",
        "SR",
        "SS",
        "ST",
        "SU",
        "SV",
        "SW",
        "SX",
        "SY",
        "SZ",
        "TA",
        "TB",
        "TC",
        "TD",
        "TE",
        "TF",
        "TG",
        "TH",
        "TI",
        "TJ",
        "TK",
        "TL",
        "TM",
        "TN",
        "TO",
        "TP",
        "TQ",
        "TR",
        "TS",
        "TT",
        "TU",
        "TV",
        "TW",
        "TX",
        "TY",
        "TZ",
        "UA",
        "UB",
        "UC",
        "UD",
        "UE",
        "UF",
        "UG",
        "UH",
        "UI",
        "UJ",
        "UK",
        "UL",
        "UM",
        "UN",
        "UO",
        "UP",
        "UQ",
        "UR",
        "US",
        "UT",
        "UU",
        "UV",
        "UW",
        "UX",
        "UY",
        "UZ",
        "VA",
        "VB",
        "VC",
        "VD",
        "VE",
        "VF",
        "VG",
        "VH",
        "VI",
        "VJ",
        "VK",
        "VL",
        "VM",
        "VN",
        "VO",
        "VP",
        "VQ",
        "VR",
        "VS",
        "VT",
        "VU",
        "VV",
        "VW",
        "VX",
        "VY",
        "VZ",
        "WA",
        "WB",
        "WC",
        "WD",
        "WE",
        "WF",
        "WG",
        "WH",
        "WI",
        "WJ",
        "WK",
        "WL",
        "WM",
        "WN",
        "WO",
        "WP",
        "WQ",
        "WR",
        "WS",
        "WT",
        "WU",
        "WV",
        "WW",
        "WX",
        "WY",
        "WZ",
        "XA",
        "XB",
        "XC",
        "XD",
        "XE",
        "XF",
        "XG",
        "XH",
        "XI",
        "XJ",
        "XK",
        "XL",
        "XM",
        "XN",
        "XO",
        "XP",
        "XQ",
        "XR",
        "XS",
        "XT",
        "XU",
        "XV",
        "XW",
        "XX",
        "XY",
        "XZ",
        "YA",
        "YB",
        "YC",
        "YD",
        "YE",
        "YF",
        "YG",
        "YH",
        "YI",
        "YJ",
        "YK",
        "YL",
        "YM",
        "YN",
        "YO",
        "YP",
        "YQ",
        "YR",
        "YS",
        "YT",
        "YU",
        "YV",
        "YW",
        "YX",
        "YY",
        "YZ",
        "ZA",
        "ZB",
        "ZC",
        "ZD",
        "ZE",
        "ZF",
        "ZG",
        "ZH",
        "ZI",
        "ZJ",
        "ZK",
        "ZL",
        "ZM",
        "ZN",
        "ZO",
        "ZP",
        "ZQ",
        "ZR",
        "ZS",
        "ZT",
        "ZU",
        "ZV",
        "ZW",
        "ZX",
        "ZY",
        "ZZ",
        "AAA",
        "AAB",
        "AAC",
        "AAD",
        "AAE",
        "AAF",
        "AAG",
        "AAH",
        "AAI",
        "AAJ",
        "AAK",
        "AAL",
        "AAM",
        "AAN",
        "AAO",
        "AAP",
        "AAQ",
        "AAR",
        "AAS",
        "AAT",
        "AAU",
        "AAV",
        "AAW",
        "AAX",
        "AAY",
        "AAZ",
        "ABA",
        "ABB",
        "ABC",
        "ABD",
        "ABE",
        "ABF",
        "ABG",
        "ABH",
        "ABI",
        "ABJ",
        "ABK",
        "ABL",
        "ABM",
        "ABN",
        "ABO",
        "ABP",
        "ABQ",
        "ABR",
        "ABS",
        "ABT",
        "ABU",
        "ABV",
        "ABW",
        "ABX",
        "ABY",
        "ABZ",
        "ACA",
        "ACB",
        "ACC",
        "ACD",
        "ACE",
        "ACF",
        "ACG",
        "ACH",
        "ACI",
        "ACJ",
        "ACK",
        "ACL",
        "ACM",
        "ACN",
        "ACO",
        "ACP",
        "ACQ",
        "ACR",
        "ACS",
        "ACT",
        "ACU",
        "ACV",
        "ACW",
        "ACX",
        "ACY",
        "ACZ",
        "ADA",
        "ADB",
        "ADC",
        "ADD",
        "ADE",
        "ADF",
        "ADG",
        "ADH",
        "ADI",
        "ADJ",
        "ADK",
        "ADL",
        "ADM",
        "ADN",
        "ADO",
        "ADP",
        "ADQ",
        "ADR",
        "ADS",
        "ADT",
        "ADU",
        "ADV",
        "ADW",
        "ADX",
        "ADY",
        "ADZ",
        "AEA",
        "AEB",
        "AEC",
        "AED",
        "AEE",
        "AEF",
        "AEG",
        "AEH",
        "AEI",
        "AEJ",
        "AEK",
        "AEL",
        "AEM",
        "AEN",
        "AEO",
        "AEP",
        "AEQ",
        "AER",
        "AES",
        "AET",
        "AEU",
        "AEV",
        "AEW",
        "AEX",
        "AEY",
        "AEZ",
        "AFA",
        "AFB",
        "AFC",
        "AFD",
        "AFE",
        "AFF",
        "AFG",
        "AFH",
        "AFI",
        "AFJ",
        "AFK",
        "AFL",
        "AFM",
        "AFN",
        "AFO",
        "AFP",
        "AFQ",
        "AFR",
        "AFS",
        "AFT",
        "AFU",
        "AFV",
        "AFW",
        "AFX",
        "AFY",
        "AFZ",
        "AGA",
        "AGB",
        "AGC",
        "AGD",
        "AGE",
        "AGF",
        "AGG",
        "AGH",
        "AGI",
        "AGJ",
        "AGK",
        "AGL",
        "AGM",
        "AGN",
        "AGO",
        "AGP",
        "AGQ",
        "AGR",
        "AGS",
        "AGT",
        "AGU",
        "AGV",
        "AGW",
        "AGX",
        "AGY",
        "AGZ",
        "AHA",
        "AHB",
        "AHC",
        "AHD",
        "AHE",
        "AHF",
        "AHG",
        "AHH",
        "AHI",
        "AHJ",
        "AHK",
        "AHL",
        "AHM",
        "AHN",
        "AHO",
        "AHP",
        "AHQ",
        "AHR",
        "AHS",
        "AHT",
        "AHU",
        "AHV",
        "AHW",
        "AHX",
        "AHY",
        "AHZ",
        "AIA",
        "AIB",
        "AIC",
        "AID",
        "AIE",
        "AIF",
        "AIG",
        "AIH",
        "AII",
        "AIJ",
        "AIK",
        "AIL",
        "AIM",
        "AIN",
        "AIO",
        "AIP",
        "AIQ",
        "AIR",
        "AIS",
        "AIT",
        "AIU",
        "AIV",
        "AIW",
        "AIX",
        "AIY",
        "AIZ",
        "AJA",
        "AJB",
        "AJC",
        "AJD",
        "AJE",
        "AJF",
        "AJG",
        "AJH",
        "AJI",
        "AJJ",
        "AJK",
        "AJL",
        "AJM",
        "AJN",
        "AJO",
        "AJP",
        "AJQ",
        "AJR",
        "AJS",
        "AJT",
        "AJU",
        "AJV",
        "AJW",
        "AJX",
        "AJY",
        "AJZ",
        "AKA",
        "AKB",
        "AKC",
        "AKD",
        "AKE",
        "AKF",
        "AKG",
        "AKH",
        "AKI",
        "AKJ",
        "AKK",
        "AKL",
        "AKM",
        "AKN",
        "AKO",
        "AKP",
        "AKQ",
        "AKR",
        "AKS",
        "AKT",
        "AKU",
        "AKV",
        "AKW",
        "AKX",
        "AKY",
        "AKZ",
        "ALA",
        "ALB",
        "ALC",
        "ALD",
        "ALE",
        "ALF",
        "ALG",
        "ALH",
        "ALI",
        "ALJ",
        "ALK",
    ]

    return excel_column_names[index]
