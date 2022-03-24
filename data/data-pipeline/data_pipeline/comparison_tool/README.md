# Score comparisons

## Comparison tool

TODO once the comparison tool has been refactored. 

## Single comparator score comparisons

The goal of this directory is to create interactive 1-to-1 dac list:cejst comparisons. That means that, when this tool is run, you will have comparisons of two true/false classifications. 

This uses `papermill` to parameterize a jupyter notebook, and is meant to be a *lightweight* entry into this analysis. The tool as a whole creates a bunch of comparisons against CEJST data -- but after it runs, you'll have the notebook to re-run and add to if you are so inclined. 

To run:
` $ python src/run_tract_comparison.py --template_notebook=TEMPLATE.ipynb --parameter_yaml=PARAMETERS.yaml`

For example, if I am running this from the `comparison_tool` directory within the `justice40-tool` repo, I would run something like:

` $ poetry run python3 src/run_tract_comparison.py --template_notebook=src/tract_comparison__template.ipynb --parameter_yaml=src/comparison_configs.yml`

__What is the template notebook?__

This gets filled in by the parameters in the yaml file and then executed. Even after execution, it is run-able and interactive. You do not need to change anything in this (with the caveat -- depending on how you run `jupyter lab`, you might need to add `import sys` and then `sys.path.append("../../../../)` to run the notebook live). 

__What is the output?__

When you run this, you'll get back three files:
1. The filled-in parameter notebook that you can run live, with the date appended. This means if you run the script twice in one day, the notebook will get overriden, but if you run the script on two consecutive days, you will get two separate notebooks saved. 
2. A graph that shows the relative average of the specified `ADDITIONAL_DEMO_COLUMNS` and `DEMOGRAPHIC_COLUMNS` segmented by CEJST and the variable you include. This gets overridden with every run. 
3. An excel file with many tabs that has summary statistics from the comparison of the two classifications (the cejst and the comparator).

In more detail, the excel file contains the following tabs:
- `Summary`: out of all tracts (even if you keep missing), how many tracts are classified TRUE/FALSE by the comparator and CEJST, by population and number.
- `Tract level stats`: overall, for all tracts classified as TRUE for CEJST and the comparator, how do the demographics of those tracts compare? Here, we think of "demographics" loosely -- whatever columns you include in the parameter yaml will show up. For example, if my additional demographics column in the yaml included `percent of households in linguistic isolation`, I'd see the average percent of households in linguistic isolation for the comparator-identified tracts (where the comparator is TRUE) and for CEJST-identified tracts. 
- `Population level stats`: same demographic variables, looking at population within tract. Since not all tracts have the same number of people, this will be slightly different. This also includes segments of the population -- where you can investigate the disjoint set of tracts identified by a single method (e.g., you could specifically look at tracts identified by CEJST but not by the comparator.)
- `Segmented tract level stats`: segmented version of the tract-level stats. 
- (Optional -- requires not disjoint set of tracts) `Comparator and CEJST overlap`: shows the overlap from the vantage point of the comparator ("what share of the tracts that the comparator identifies are also identified in CEJST?"). Also lists the states the comparator has information for. 

__What parameters go in the yaml file?__

- ADDITIONAL_DEMO_COLUMNS: list, demographic columns from the score file that you want to run analyses on. All columns here will appear in the excel file and the graph. 
- COMPARATOR_COLUMN: the name of the column that has a boolean (*must be TRUE / FALSE*) for whether or not the tract is prioritized. You provide this! 
- DEMOGRAPHIC_COLUMNS: list, demographic columns from another file that you'd like to include in the analysis. 
- DEMOGRAPHIC_FILE: the file that has the census demographic information. This name suggests, in theory, that you've run our pipeline and are using the ACS output -- but any file with `GEOID10_TRACT` as the field with census tract IDs will work. 
- GEOID_COLUMN: this tells the code where you're storing tract IDs. It must always be in a column named `GEOID10_TRACT`
- OUTPUT_DATA_PATH: where you want the output to be. Convention: output + folder named of data source. Note that the folder name of the data source gets read as the "data name" for some of the outputs. 
- SCORE_COLUMN: CEJST score boolean name column name. 
- SCORE_FILE: CEJST full score file. This requires that you've run our pipeline, but in theory,  the downloaded file should also work, provided the columns are named appropriately. 
- TOTAL_POPULATION_COLUMN: column name for total population. We use `Total Population` currently in our pipeline. 
- OTHER_COMPARATOR_COLUMNS: list, other columns from the comparator file you might want to read in for analysis. This is an optional argument. You will keep these columns to perform analysis once you have the notebook -- this will not be included in the excel print out. 
- KEEP_MISSING_VALUES_FOR_SEGMENTATION: whether or not to fill NaNs. True keeps missing.

__Cleaning data__

Comparator data should live in a flat csv. just like the CEJST data. Right now, each comparator has a folder in `comparison_tool/data` that contains a notebook to clean the data (this is because the data is often quirky and so live inspection is easier), the `raw` data, and the `clean` data. We can also point the `yaml` to an `ETL` output, for files in which there are multiple important columns, if you want to use one of the data sources the CEJST team has already included in the pipeline. When you point to an `ETL` class's output, the following constraints are already true. When you make your own output for comparison, make sure to follow the steps below. 

When you clean the data, it's important that you:
1. Ensure the tract level id is named the same as the field name in score M (`field_names.`)
2. Ensure the identification column is a `bool`

You will provide the path to the comparator data in the parameter yaml file. 