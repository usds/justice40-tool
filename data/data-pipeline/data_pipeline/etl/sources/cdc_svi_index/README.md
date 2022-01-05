# CDC SVI Index

For additional information on the methodology, please refer to the following paper for the [SVI Index](https://www.atsdr.cdc.gov/placeandhealth/svi/documentation/pdf/SVI2018Documentation-H.pdf)

CDC SVI Index utilizes American Community Survey (ACS), 2014-2018 (5-year) data for the following estimates (also known as themes in the [documentation](https://www.atsdr.cdc.gov/placeandhealth/svi/documentation/pdf/SVI2018Documentation-H.pdf)):

**Socioeconomic Status**
1. Below Poverty
2. Unemployed
3. Income
4. No High School Diploma

**Household Composition & Disability**
1. Aged 65 or Older
2. Aged 17 or Younger
3. Civilian with a Disability
4. Single-Parent Households

**Minority Status & Language**
1. Minority
2. Speaks English “Less than Well”

**Housing Type & Transportation**
1. Multi-Unit Structures
2. Mobile Homes
3. Crowding
4. No Vehicle
5. Group Quarters


### Rankings
 Census tracts were ranked within each state and the District of Columbia. In addition, a ranking of all tracts for the entire United States was used relative to one another. Tract rankings are based on percentiles. _Percentile ranking_ values range from 0 to 1, with higher values indicating greater vulnerability.

For each tract, a percentile rank is generated among all tracts for 1) the fifteen individual variables, 2) the four themes, and 3) its overall position.

**Theme rankings**

For each of the four themes, the percentiles for the variables comprising each theme were computed. The authors ordered the summed percentiles for each theme to determine theme-specific percentile rankings.

The four summary theme ranking variables, detailed in the Data Dictionary below, are:

* Socioeconomic - RPL_THEME1
* Household Composition & Disability - RPL_THEME2
* Minority Status & Language - RPL_THEME3
* Housing Type & Transportation - RPL_THEME4

**Overall tract rankings:**

The sums of each theme were summed, ordered the tracts, and then calculated overall percentile rankings. Please note; taking the sum of the sums for each theme is the same as summing individual variable rankings. The overall tract summary ranking variable is RPL_THEMES.

For SVI 2018, the authors also included two adjunct variables, 1) 2014-2018 ACS estimates for persons without health insurance, and 2) an estimate of the daytime population derived from LandScan 2018 estimates. These adjunct variables are excluded from SVI rankings. At this time, these are not included in the output in the current methodology.


**Important Notes**

1. Tracts with zero estimates for the total population (N = 645 for the U.S.) were removed during the ranking process. These tracts were added back to the SVI databases after ranking. 

2. The TOTPOP field value is 0, but the percentile ranking fields (RPL_THEME1, RPL_THEME2, RPL_THEME3, RPL_THEME4, and RPL_THEMES) were set to -999.

Whenever available, they use Census-calculated MOEs. If Census MOEs are unavailable, for instance when aggregating variables within a table, the authors use approximation formulas provided by the Census in Appendix A (pages A-14 through A-17) of _A Compass for Understanding and Using American Community Survey Data here_:

https://www.census.gov/content/dam/Census/library/publications/2008/acs/ACSGeneralHandbook.pdf

If more precise MOEs are required, see Census methods and data regarding Variance Replicate Tables
here: https://www.census.gov/programs-surveys/acs/technical-documentation/variance-tables.html.

For selected ACS 5-year Detailed Tables, “Users can calculate margins of error for aggregated data by using the variance replicates. Unlike available approximation formulas, this method results in an exact margin of error by using the covariance term.”

MOEs are _not_ included nor considered during this data processing nor for the scoring comparison tool.