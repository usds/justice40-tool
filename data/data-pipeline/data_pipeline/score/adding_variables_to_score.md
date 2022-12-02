# How to add variables to a score

So, there's a variable you want to add to the score! Once you have the data source created in `etl/sources`, what should you do? There are 6 steps across a minimum of 7 files.

__Updating `field_names.py`__
Per indicator, you need to make (usually) three variables to get used in other files.
- raw variable: this is the name of the variable's raw data, not scaled into a percentile
- variable with threshold exceeded: this is a boolean for whether the tract meets the threshold for the indicator alone
- variable with threshold exceeded and socioeconomic criterion exceeded: this is whether the tract will be a DAC based on the socioeconomic criterion and the indicator

__Updating `etl_score.py`__
- add the dataframe from the source to the ScoreETL constructor and add a line to read the dataframe into memory
- then, add the dataframe into the list of `census_tract_dfs`
- finally, add columns you want to include as percentiles to the  `numeric_columns` list

__Updating `score_narwhal.py`__ (or whatever the score file is)
- per factor, add the columns that show the threshold and socioeconomic criterion is exceeded to the `eligibility_columns` list
- construct all columns specified in `field_names`, using the factor method as a guide

__Updating `constants.py`__
- add the columns' shortnames to the tiles dictionary (using Vim's UI sheet to guide short names)
- add the floats to the list of floats

__Updating `csv.yml` and `excel.yml`__
- make sure each column you want to be in the downloadable files is listed here

__Update the fixtures__
Follow the instructions on the repo to modify tiles so that `test_etl_post.py` doesn't fail. Then, confirm results.
