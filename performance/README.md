# Performance Testing

## Background

This directory represents a [puppeteer](https://pptr.dev/)-based automation solution that gathers performance statistics using the [Performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance) interface.

These stats are intended to be run against minimal, html-based implementations of four libraries/library versions:

- OpenLayers
- OpenLayers+Mapbox-GL-styles
- Mapbox-GL JS
- Leaflet

## Running

To run:

1. Run a pg_tileserv server
2. Run `npm start` within the `client` directory
3. Run `node map_perf.js` within the `performance` directory to get statistics against the running version
