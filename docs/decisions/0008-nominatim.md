# Use OSM/Nominatim for Geolocation

## Context and Problem Statement

We need a short-term provider of a geolocation service, that is free, open source, and usable for basic searches in our product.

## Decision Drivers

- Free
- Open Source
- Usable for basic general-purpose searches
- Capable of servicing a small number of searches

## Considered Options

- OSM/Nominatim
- Various paid alternatives: Google/Bing/Others
- Data Science Toolkit
- Census REST API

## Decision Outcome

Chosen option: OSM/Nominatim, because it is a free an open-source solution that allows for low-volume searches provided you follow straightforward restrictions.

We will monitor our traffic stats and re-evaluate if we have a large surge of people or need to otherwise account for higher traffic.

### Positive Consequences

- Free
- Open Source
- Suitable for general-purpose searches
- Able to give polygon boundaries with `polygon_geojson=1` option

### Negative Consequences

- Results are not as high quality as with some other services
- Various restrictions apply to search volume:
  - a. We must have "an absolute maximum of 1 request per second"
  - b. We must provide a valid HTTP Referer or User-Agent identifying the application
  - c. Clearly display attribution (using the AttributionControl)
  - d. We are advised to setup a proxy to enable caching of search requests.
  - e. They also have this note: "Note: periodic requests from apps are considered bulk geocoding and as such are strongly discouraged. It may be okay if your app has very few users and applies appropriate caching of results. Make sure you stay well below the API usage limits."
- Relevant result summary -- Here is the result of various kinds of relevant searches using Nominatim. About ~50% accuracy on a variety of responses:
  - St. Paul, Virginia - kind of works
  - St. Paul, VA - did not work
  - 24283 - works
  - Appalachia - did not work (not surprising)
  - St. Paul - did not work
  - Wise County - works
  - Wise County, VA - works
  - St Paul - does not work
  - Clinch river - works (surprisingly)
  - [a more rural address] 3025 4th Ave St. Paul, VA - does not work
  - 3025 4th Ave St. Paul, VA 24283 - does not work
  - 3025 4th Ave - does not work
  - Western Front Hotel - did not work
  - 3025 Fourth Avenue - does not work
  - 4th Ave and Broad St - does not work
  - Carytown - works
  - Carytown, Richmond - works
  - [a more urban address] 3109 W Cary St, Richmond, VA 23221 - works
  - Southwest Virginia - does not work
  - Richmond, VA - works

## Pros and Cons of the Options

### Paid Geocoders

There are various paid solutions which provide their own geocoding services.

You can find a general comparison of paid providers [here](https://www.geocod.io/compare/) (includes Geocodio, SmartyStreets, Google, Bing, Here, Mapbox, and TomTom)

Others providers:

- [ArcGis Online Geocoding Service](https://doc.arcgis.com/en/arcgis-online/reference/geocode.htm) :

  - [Pricing](https://developers.arcgis.com/pricing/):
    - (More on stored vs. non-stored [here](https://developers.arcgis.com/documentation/mapping-apis-and-services/search/services/geocoding-service/#stored-vs-not-stored-geocoding))
    - Stored: 20,000 Geocodes free then $0.5 per 1,000 Geocodes
    - Non-stored: $4 per 1,000 Geocodes

- [LocationIQ](https://locationiq.com/)

  - [Pricing](https://locationiq.com/pricing)
    - 5000 requests/day = free, 10K = $49, 25K = $99, 60K = $200

- [Amazon Location Service](https://aws.amazon.com/location/)
  - [Pricing](https://aws.amazon.com/location/pricing/):
    - 10K free for first three months, then non-stored = $0.50 per 1,000, stored = $4.00 per 1,000

#### Paid geocoder Trade-offs

- Pros:
  - Data quality is often much higher than free options in many cases (see detailed comparison [here](https://docs.google.com/spreadsheets/d/1I2rEVX2CN8AqkhpzUTuNwNvJy8il1exccrsd4OGwDCU/edit#gid=0), where OSM has about a 40% accuracy rate (though a small sample size) compared to other providers ).
  - Many come along with built-in / easy-to-use UI components such as [Mapbox-gl-geocoder](https://github.com/mapbox/mapbox-gl-geocoder)
  - Allows for good flexibility of both input and output
- Cons:
  - Can be expensive
  - Require a key and associated account
  - Many are not open source

### Data Science Toolkit

Data-science-oriented search framework that combines osm with geoip data.

An overall good option, but if we went down this path we would want to host ourselves -- it is notable that it does give this option.

- [Home here](http://dstk.britecorepro.com/developerdocs#googlestylegeocoder)

  - Pricing: Free
  - Limitations: "You can get started using the "http://www.datasciencetoolkit.org/" server, but for intensive use or to run behind a firewall, you'll probably want to create your own machine." ([source](http://dstk.britecorepro.com/developerdocs))
  - Sources: This API uses data from the US Census and OpenStreetMap, along with code from GeoIQ andSchuyler Erle.

#### DSTK Trade-offs

- Pros:
  - Free
  - Has a hosted version
  - Augments OSM data using geoip
- Cons:
  - Recommended that you host your own given these limitations
  - Not recommended for production use

### Census Geocoding Services

Geocoding service provided directly by the census. More info [here](https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html).

- [Example Result](https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=4600+Silver+Hill+Rd+Washington+DC&benchmark=Public_AR_Current&vintage=Current_Current&layers=10&format=json)

#### Trade-offs

- Pros:
  - Quite good results if you give a whole address
  - Ties results back directly to census block group boundaries
  - Allows for querying different layers of census data directly via `layers` property
- Cons:

  - Limited in input: Only two options available: street + city + state + zip ("address" lookup), or basically full addresses ("onelineaddress" lookup). No direct options for flexible input.
  - Limited in output: no direct polygon boundaries

## Links

- [Nominatim Results visualizer](https://nominatim.openstreetmap.org/ui/search.html)
