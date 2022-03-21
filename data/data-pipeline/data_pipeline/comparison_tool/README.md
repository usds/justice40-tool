# Score comparisons

## Comparison tool

## Single comparator score comparisons

The goal of this directory is to create interactive 1-to-1 dac list:cejst comparisons. 

To run:
` $ python src/run_tract_comparison.py --template_notebook=TEMPLATE.ipynb --parameter_yaml=PARAMETERS.yaml`

__What is the template notebook?__

This gets filled in by the parameters in the yaml file and then executed. Even after execution, it is run-able and interactive. 

__What parameters go in the yaml file?__

- ADDITIONAL_DEMO_COLUMNS: list, demographic columns from the score file that you want to run analyses on
- COMPARATOR_COLUMN: the name of the column that has a boolean for whether or not the tract is prioritized
- DEMOGRAPHIC_COLUMNS: list, demographic columns from acs
- DEMOGRAPHIC_FILE: the file that has the census demographic information
- GEOID_COLUMN: this should always be `GEOID10_TRACT`
- OUTPUT_DATA_PATH: where you want the output to be. Convention: output + folder named of data source. Note that the folder name of the data source gets read as the "data name"
- SCORE_COLUMN: CEJST score boolean name
- SCORE_FILE: CEJST full score file
- TOTAL_POPULATION_COLUMN: column name for total population
- OTHER_COMPARATOR_COLUMNS: list, other columns from the comparator file you might want to read in for analysis. This is an optional argument. 
- KEEP_MISSING_VALUES_FOR_SEGMENTATION: whether or not to fill NaNs. True keeps missing, false fills them.

__Cleaning data__

Comparator data here lives in flat csvs. Right now, each agency has a folder in `data` that contains a notebook to clean the data (this is because the data is often quirky and so live inspection is easier), the `raw` data, and the `clean` data. We can also point the `yaml` to an `ETL` output, for files in which there are multiple important columns. When you point to an `ETL` class's output, the following constraints are already true. When you make your own output for comparison, make sure to follow the steps below. 

When you clean the data, it's important that you:
1. Ensure the tract level id is named the same as the field name in score M (`field_names.)
2. Ensure the identification column is a `bool`
