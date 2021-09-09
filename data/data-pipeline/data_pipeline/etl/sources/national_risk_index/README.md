# FEMA National Risk Index

## Description

The [National Risk Index](https://www.fema.gov/flood-maps/products-tools/national-risk-index) is a new, online mapping application from FEMA that identifies communities most at risk to 18 natural hazards. This application visualizes natural hazard risk metrics and includes data about expected annual losses from natural hazards, social vulnerability and community resilience.

The National Risk Index's interactive web maps are at the county and Census tract level and made available via geographic information system (GIS) services for custom analyses. For this project, we've utilized the NRI data collected at the Census tract level

## Data Transformation Summary

The following transformations were applied to the NRI data during the ETL process:

- The `TRACTFIPS` column was renamed to `GEOID10_TRACT` to match the name of columns that hold the Census Tract FIPS code in other data sets
- The NRI score values for each Census tract were applied to each of the Census block groups inside of that Census tract so that the unit of analysis would match that of other datasets like the American Communities Survey
