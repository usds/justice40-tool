# ETL source tests

This directory contains tests for the ETL sources. 

# Notes 

Please note that the directory name for the tests of an ETL class must be the same as
 the directory name for that ETL class itself. 
 
For instance, the National Risk Index ETL code is defined in `data/data-pipeline/data_pipeline/etl/sources/national_risk_index`, and its tests are 
defined in `data/data-pipeline/data_pipeline/tests/sources/national_risk_index`. Note
 that both are in a directory called `national_risk_index`.
 
This is because the commands `etl_run` and `update_test_fixtures` in 
`data/data-pipeline/data_pipeline/application.py` both reference the same directory 
defined by `DATASET_LIST` in `data/data-pipeline/data_pipeline/etl/constants.py`. 