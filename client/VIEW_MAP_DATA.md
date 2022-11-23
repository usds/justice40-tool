# Viewing map data

This readme has the following contents:

- [Using PBF files](#using-pbf-files)
- [Troubleshooting](#troubleshooting)

A great way to understand how the map gets data by opening up the dev console and navigate to the Network tab. As the user changes the map, viewport or zooming, various PBF files are being requested. These PBFs hold the data the map is showing. Let's dive a little deeper into the PBF files.

_Note: When exploring this map data, you may see a score. This score is an experiment. It is not reflective of the justice 40 score._

## Using PBF files

The PBF (ProtocolBuffer Binary Format) files (aka map data aka tiles aka geojson) are being served from AWS. Specifically it's on an S3 (AWS's storage service) bucket which is behind CloudFront (AWS's CDN service).

The location of this CDN is specified in the [constants.tsx](https://github.com/usds/justice40-tool/blob/main/client/src/data/constants.tsx) file. The base URL will have cloudfront in it.

After [starting the app](https://github.com/usds/justice40-tool/blob/main/client/README.md#installing-and-running-the-client-site), opening up the Network Panel and filtering by _Fetch/XHR_ in the browser's dev console will show various resources. Click on any _\*.pbf_ file. Copy this address of this resource via right click => _Copy_ => _Copy link address_

Read more about PBF files [here](https://wiki.openstreetmap.org/wiki/PBF_Format).

TL;DR - the PBF file encodes the json (geojson in this case) map data. The mapping library then decodes it on-the-fly.

### Decoding a PBF file

Before decoding the PBF and seeing the map data, we have to save the PBF file locally. This can be accomplished by curling the copied address:

- `curl https://d3jqyw10j8e7p9.cloudfront.net/data-pipeline/data/score/tiles/low/3/1/3.pbf -o d3_313.pbf`

Note the output file name can be anything. In our example we specify it with the d3 (first two of the CDN's hostname), followed by the z/x/y of the URL. When you have multiple files downloaded, it's nice to know which tile they represent and where they came from! :)

This newly minted PBF file needs to be decoded to see json data of the map. This can be accomplished via tippecanoe:

- `brew install tippecanoe`

We also want to be able see the decoded pbf (json file) in pretty format so we'll install `jq`

- `brew install jq`

We can decode the saved pbf file, i.e., `d3_313.pbf` explicitly by running:

- `tippecanoe-decode [filename] [z] [x] [y]`

In our specific case:

- `tippecanoe-decode d3_313.pbf 3 1 3`

If the file is super big we can just look at the head of the file: 

- `tippecanoe-decode d3_313.pbf 3 1 3 | head -40`

In order to see the json file in a pretty format, pipe to jq:

- `tippecanoe-decode d3_313.pbf 3 1 3 | jq`

While to view just a portion of the feature tile (note we're using a high zoom tile in this example):

- `tippecanoe-decode d3_9_138_206.pbf 9 138 206 | jq .features | head -100`

This will filter the decoded pbf by the `features` key and then show the first element in the feature array.

When the map is clicked, the data (aka features - which are sets of properties in the geojson file ) of the map are able to be accessed via the MapEvent. See [j40Map.tsx](https://github.com/usds/justice40-tool/blob/main/client/src/components/J40Map.tsx)'s `onClick` method for more details.

## Troubleshooting

If the map is not loading. There are some things it could be

- [Browser caching](#browser-caching)
- [CORS Chrome extenstion](#cors-chrome-extension)
- [S3 Permissions](#s3-permissions)
- [CDN caching](#cdn-caching)
- [Geojson contract failure](#geojson-contract-failure)

### Browser caching

Disable caching in the browser and clear the cache.

### CORS Chrome extension
Turn on the CORS extension, try and refresh the page. If the map show's data, we can confidently say that the issue is
related to CORS and may not be permissions or caching.

### S3 Permissions

When the tile data is updated, its possible that the permissions on the S3 bucket may be reset to be non-publically accessible. The CDN mentioned above points to an underlying S3 bucket. Check the permissions by curling the underlying S3 bucket directly and inspecting the headers:

`curl -D - http://justice40-data.s3.amazonaws.com/data-pipeline/data/score/tiles/low/3/1/3.pbf`

If permissions are not set up correctly the underlying S3 location will not be accessible (will show a 403 via curl) or a permission XML error when accessing via the browser. This curl is done to check that the file is public, if not, there could be an issue with the map reading it. It should return 200 with a reasonble file size on the order of KB.

Note also that the browser will also need to run the localhost on http as well.
Update permissions in s3 and try again.

### CDN caching

When the S3 data is updated, it may not invalidate the cache in the CDN. You may have to invalidate the cache. There should be some existing invalidations in place to copy when having to invalidate.

#### Set app to hit S3

You can change the CDN's URL to directly go to S3. This will require going over non-ssl connection. Set your localhost to use a non-ssl protocol (http rather than https). This another way to remove the CDN to help troubleshoot.

This invalidation should be done by a GHA when the tiles are updating.

When in prod, the first thing is to check the s3 access vs CDN.

### Geojson contract failure

The frontend map (via the [constants](https://github.com/usds/justice40-tool/blob/main/client/src/data/constants.tsx) file) expects that certain properties in the geojson file:

1. exist and
2. have certain values

If these properties are missing or have different values from what's in the constants file, the map may not show the data layer.

#### Geojson data contract

Below we will show some sample geojson files. The map currently requires different data for the high zoom and low zoom levels.

The geojson shown below is for the low zoom values (when the map is first opened, it starts at zoom level 3). The comments on the
json file shows the constants in the above constants file.

```json
{
    "type":"FeatureCollection",
    "properties":{
       "zoom":3,
       "x":1,
       "y":3,
       "compressed":false
    },
    "features":[
        {
          "type":"FeatureCollection",
          "properties":{
            // SCORE_SOURCE_LAYER
             "layer":"blocks",
             "version":2,
             "extent":4096
          },
          "features":[
              {
                "type":"Feature",
                "properties":{
                    "E_SCORE":number
                },
                "geometry":{
                   "type":"Polygon",
                   "coordinates":[[number,number]]
                },
             }
            ],
       }
    ]
}
```

When zooming in (the zoom number will increase), thus aka 'high' zoom levels, the properties key in the above geojson will change to:

```json
{
    "type":"FeatureCollection",
    "properties":{
        "zoom":3,
       "x":1,
       "y":3,
       "compressed":false
    },
    "features":[
        {
            "type":"FeatureCollection",
          "properties":{
              "layer":"blocks",
             "version":2,
             "extent":4096
          },
          "features":[
              {
                  "type":"Feature",
                "properties":{
                    "GEOID10":"020160001001",
                   "State Name":"Alaska",
                   "County Name":"Aleutians West Census Area",
                   
                   // TOTAL_POPULATION
                   "Total population":975,
                   "Score E (percentile)":0.49,
                   "Score E (top 25th percentile)":false,

                   //POVERTY_PROPERTY_PERCENTILE
                   "Poverty (Less than 200% of federal poverty line) (percentile)":0.36,

                   // EDUCATION_PROPERTY_PERCENTILE
                   "Percentage of individuals age 25 or over with less than high school diploma (percentile)":0.08,

                   // LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE
                   "Linguistic isolation (percent) (percentile)":0.05, 
                   
                   // UNEMPLOYMENT_PROPERTY_PERCENTILE
                   "Unemployed civilians (percent) (percentile)":0.03, 
                   
                   // HOUSING_BURDEN_PROPERTY_PERCENTILE
                   "Housing burden (percent) (percentile)":0.18 
                   
                },
                "geometry":{
                    "type":"Polygon",
                   "coordinates":[[number,number]]
                },
             }
            ],
       }
    ]
}
```

In either case, if any contract (low or high) is not upheld, the map may not render the data layer.
