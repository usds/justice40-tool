"""
This script is a 'starter' for parameterized work pertaining to generating comparisons.
Here, we only compare  DAC lists that operate at the tract level. We can change/expand this as we move forward.

Why papermill? Papermill is an easy way to parameterize notebooks. While doing comparison work,
I often had to do a lot of one-off analysis in a notebook that would then get discarded. With parametrized notebooks,
we can run each type of analysis and then store it for posterity. The first template is just for agencies, but you could
imagine generating interactive outputs for many types of analysis, like demographic work.

To see more: https://buildmedia.readthedocs.org/media/pdf/papermill/latest/papermill.pdf

To run:
` $ python src/run_tract_comparison.py --template_notebook=TEMPLATE.ipynb --parameter_yaml=PARAMETERS.yaml`
"""
import argparse
import datetime
import os

import papermill as pm
import yaml


def _read_param_file(param_file: str) -> dict:
    """Reads params and enforces a few constraints:

    1. There's a defined output path
    2. Change all relative paths to absolute paths
    """
    with open(param_file, "r", encoding="utf8") as param_stream:
        param_dict = yaml.safe_load(param_stream)
    assert (
        "OUTPUT_DATA_PATH" in param_dict
    ), "Error: you need to specify an output data path"
    # convert any paths to absolute paths
    updated_param_dict = {}
    for variable, value in param_dict.items():
        if ("PATH" in variable) or ("FILE" in variable):
            updated_param_dict[variable] = os.path.abspath(value)
        else:
            updated_param_dict[variable] = value
    # configure output name
    updated_param_dict["OUTPUT_NAME"] = updated_param_dict[
        "OUTPUT_DATA_PATH"
    ].split("/")[-1]

    return updated_param_dict


def _configure_output(updated_param_dict: dict, input_template: str) -> str:
    """Configures output directory and creates output path"""
    if not os.path.exists(updated_param_dict["OUTPUT_DATA_PATH"]):
        os.mkdir(updated_param_dict["OUTPUT_DATA_PATH"])

    output_notebook_path = os.path.join(
        updated_param_dict["OUTPUT_DATA_PATH"],
        updated_param_dict["OUTPUT_NAME"]
        + f"__{input_template.replace('template', datetime.datetime.now().strftime('%Y-%m-%d'))}",
    )
    return output_notebook_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--template_notebook",
        help="Please specify which notebook to run",
        required=True,
    )
    parser.add_argument(
        "--parameter_yaml",
        help="Please specify which parameter file to use",
        required=True,
    )
    args = parser.parse_args()
    updated_param_dict = _read_param_file(args.parameter_yaml)
    notebook_name = args.template_notebook.split("/")[-1]
    output_notebook_path = _configure_output(updated_param_dict, notebook_name)
    pm.execute_notebook(
        args.template_notebook,
        output_notebook_path,
        parameters=updated_param_dict,
    )
