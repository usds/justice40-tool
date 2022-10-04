#! /bin/bash

poetry run python3 src/run_tract_comparison.py --template_notebook=src/tract_comparison__template.ipynb --parameter_yaml=src/donut_hole_dacs.yaml
