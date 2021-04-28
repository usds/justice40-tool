# Simple Proof of Concept Clients

## Background

This directory provides a simple, [parcel](https://parceljs.org/)-based implementation of each of four client visualization libraries, for the purpose of measuring a realistic performance scenario, a [choropleth](https://en.wikipedia.org/wiki/Choropleth_map) map of the counties of Maryland.

The following client libraries are represented:

- OpenLayers
- OpenLayers+Mapbox-GL-styles
- Mapbox-GL JS
- Leaflet

## Running

1. Run a pg_tileserv server
2. Run `npm start` within the `client` directory, which in turn uses `parcel` for basic bundling and serving
