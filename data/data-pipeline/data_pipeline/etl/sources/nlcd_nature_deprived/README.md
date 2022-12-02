# Nature deprived communities data

The following dataset was compiled by TPL (Trust for Public Lands) using NCLD data. We define as: AREA - [CROPLAND] - [IMPERVIOUS SURFACES].

## Codebook
- GEOID10 – Census tract ID
- SF – State Name
- CF – County Name
- P200_PFS – Percent of individuals below 200% Federal Poverty Line (from CEJST source data).
- CA_LT20 – Percent higher ed enrollment rate is less than 20% (from CEJST source data).
- TractAcres – Acres of tract calculated from ALAND10 field (area land/meters) in 2010 census tracts.
    - CAVEAT: Some census tracts in the CEJST source file extend into open water. ALAND10 area was used to constrain percent calculations (e.g. cropland area) to land only.
- AcresCrops – Acres crops calculated by summing all cells in the NLCD Cropland Data Layer crop classes.
- PctCrops – Formula: AcresCrops/TractAcres*100.
- PctImperv – Mean imperviousness for each census tract.
    - CAVEAT: Where tracts extend into open water, mean imperviousness may be underestimated.
- __TO USE__ PctNatural – Formula: 100 – PctCrops – PctImperv.
- PctNat90 – Tract in or below 10th percentile for PctNatural. 1 = True,  0 = False.
    - PctNatural 10th percentile = 28.6439%
- ImpOrCrop – If tract >= 90th percentile for PctImperv OR PctCrops. 1 = True,  0 = False.
    - PctImperv 90th percentile = 67.4146 %
    - PctCrops 90th percentile = 27.8116 %
- LowInAndEd – If tract >= 65th percentile for P200_PFS AND CA_LT20.
    - P200_PFS 65th percentile = 64.0%
- NatureDep – ImpOrCrp = 1 AND LowInAndEd = 1.

We added `GEOID10_TRACT` before converting shapefile to csv.

## Instructions to recreate

### Creating Impervious plus Cropland Attributes for Census Tracts

The Cropland Data Layer and NLCD Impervious layer were too big to put on our OneDrive, but you can download them here:
   CDL:  https://www.nass.usda.gov/Research_and_Science/Cropland/Release/datasets/2021_30m_cdls.zip
   Impervious:  https://s3-us-west-2.amazonaws.com/mrlc/nlcd_2019_impervious_l48_20210604.zip


#### Crops

Add an attribute called TractAcres (or similar) to the census tracts to hold a value representing acres covered by the census tract.
Calculate the TractAcres field for each census tract by using the Calculate Geometry tool (set the Property to Area (geodesic), and the Units to Acres).
From the Cropland Data Layer (CDL), extract only the pixels representing crops, using the Extract by Attributes tool in ArcGIS Spatial Analyst toolbox.
a. The attribute table tells you the names of each type of land cover. Since the CDL also contains NLCD classes and empty classes, the actual crop classes must be extracted.
From the crops-only raster extracted from the CDL, run the Reclassify tool to create a binary layer where all crops = 1, and everything else is Null.
Run the Tabulate Area tool:
a. Zone data = census tracts
b. Input raster data = the binary crops layer
c. This will produce a table with the square meters of crops in each census tract contained in an attribute called VALUE_1
Run the Join Field tool to join the table to the census tracts, with the VALUE_1 field as the Transfer Field, to transfer the VALUE_1 field (square meters of crops) to the census tracts.
Add a field to the census tracts called AcresCrops (or similar) to hold the acreage of crops in each census tract.
Calculate the AcresCrops field by multiplying the VALUE_1 field by 0.000247105 to produce acres of crops in each census tracts.
a. You can delete the VALUE_1 field.
Add a field called PctCrops (or similar) to hold the percent of each census tract occupied by crops.
Calculate the PctCrops field by dividing the AcresCrops field by the TractAcres field, and multiply by 100 to get the percent.
Impervious

Run the Zonal Statistics as Table tool:
a. Zone data = census tracts
b. Input raster data = impervious data raster layer
c. Statistics type = Mean
d. This will produce a table with the percent of each census tract occupied by impervious surfaces, contained in an attribute called MEAN

Run the Join Field tool to join the table to the census tracts, with the MEAN field as the Transfer Field, to transfer the MEAN field (percent impervious) to the census tracts.

Add a field called PctImperv (or similar) to hold the percent impervious value.

Calculate the PctImperv field by setting it equal to the MEAN field.
a. You can delete the MEAN field.
Combine the Crops and Impervious Data

Open the census tracts attribute table and add a field called PctNatural (or similar). Calculate this field using this equation: 100 – PctCrops – PctImperv . This produces a value that tells you the percent of each census tract covered in natural land cover.

Define the census tracts that fall in the 90th percentile of non-natural land cover:
a. Add a field called PctNat90 (or similar)
b. Right-click on the PctNatural field, and click Sort Ascending (lowest PctNatural values on top)
c. Select the top 10 percent of rows after the sort
d. Click on Show Selected Records in the attribute table
e. Calculate the PctNat90 field for the selected records = 1
f. Clear the selection
g. The rows that now have a value of 1 for PctNat90 are the most lacking for natural land cover, and can be symbolized accordingly in a map
