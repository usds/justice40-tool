# Michigan EJSCREEN
<!-- markdown-link-check-disable -->
The Michigan EJSCREEN description and publication can be found [here](https://deepblue.lib.umich.edu/bitstream/handle/2027.42/149105/AssessingtheStateofEnvironmentalJusticeinMichigan_344.pdf).
<!-- markdown-link-check-enable-->

#### Some notes about the input source data column fields:

There are two pertinent columns used - `EJ_Score_Cal_Min` and `Pct_CalMin` that are referenced in the source codebase. To our knowledge, these columns reflect the adoption and the comparative quantitative analysis from two different approaches. The "Cal" prefix reflects CalEPA's CalEnviroScreen that omits racial and ethnic data. The "Min" abbreviation reflects Minnesota Pollution Control Agency’s (MPCA) approach to including this data. Please see pages 37 - 39 in the above reference for further details. Briefly, the authors adopted a combination of both the CalEnviroScreen's methodology and the MCPA's methodology. The scores and percentile rankings in the input data source sheet are the same as those reflected in the cited report, included in Appendix I and in the latest version of the mapping [tool](https://www.arcgis.com/apps/webappviewer/index.html?id=dc4f0647dda34959963488d3f519fd24).

#### Additional information on the adoption of the methodology from CalEnviroScreen and MCPA

Both CalEPA's CalEnviroScreen and the Minnesota Pollution Control Agency’s (MPCA) methodology are adopted and used for both comparative purposes and for the identification of areas of concern. The latter, in particular, is used to identify tribal areas. According to the authors, to make permitting decisions, MPCA assesses whether the community, measured at the census tract level, fits at least one of the following criteria:

* Percent of the non-white population is at least 50%
* "More than 40% of the households have a household income of less than 185% of the federal
poverty level (FPL)”
* If the facility is within the boundaries of a “tribal community” (MPCA 2015).

Furthermore, the authors state that the MCPA methodology included data on tribal community boundaries, as defined by the US Census Bureau, and data on poverty, race, and ethnicity. However, the authors also note that the MCPA's methodology does not rank any census tracts.

In addition, although the CalEPA does not analyze data on race and ethnicity in CalEnviroScreen, the researchers incorporated race and ethnicity data in their assessment of environmental justice in Michigan. To justify the incorporation of race and ethnic data, the team compared the tract rankings with and without the data.

A Spearman's rank-order correlation was calculated for the 2,741 census tracts within Michigan with the two variables being environmental justice scores using the CalEPA methodology 1) without racial and ethnic data and 2) with racial and ethnic data. These scores were then ranked and the Spearman rank-order correlation was calculated. These statistics are not included in the output of this ETL process. Please see Chapter 5 and Chapter 6 for further details.

Finally, please see pages 104 -106 for details on the justification and details for the applicability of the upper quartile as a means to identify communities in Michigan with the potential for environmental justice concerns. It should also be noted that, according to the authors, that CalEPA also designates the top 25% scoring tracts as “disadvantaged communities".

Sources:

* Minnesota Pollution Control Agency. (2015, December 15). Environmental Justice Framework Report.
Retrieved from https://www.pca.state.mn.us/sites/default/files/p-gen5-05.pdf.

* Faust, J., L. August, K. Bangia, V. Galaviz, J. Leichty, S. Prasad… and L. Zeise. (2017, January). Update to the California Communities Environmental Health Screening Tool CalEnviroScreen 3.0. Retrieved from OEHHA website: https://oehha.ca.gov/media/downloads/calenviroscreen/report/ces3report.pdf