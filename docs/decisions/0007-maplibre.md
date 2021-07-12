# Use MapLibre for Map Visualization

## Context and Problem Statement

Styling a map with a large number of features, in a performant way, is difficult. With 200,000+ block groups, our project needs this performance for a smooth user experience. Our current mapping approach, using OpenLayers, is insufficient for this task. We propose switching to MapLibre as a free and open source way to improve the performance and user experience of our map.

## Decision Drivers

- Free and Open Source
- Good performance in rendering a large number of features
- Good performance in zooming and panning
- Easy map styling

## Considered Options

- MapLibre GL JS 1.15.0
- Mapbox GL JS 2.3.1
- Mapbox GL JS 1.13.0
- OpenLayers 6.4.3

## Decision Outcome

Chosen option: [MapLibre 1.15.0](https://github.com/maplibre/maplibre-gl-js), a free and open-source library with good performance and standard map styling capabilities, and continued development lifecycle.

### Positive Consequences

- MapLibre is free and open source
- Performance is preferable to OpenLayers, as seen in this video: [MapLibre Performance](./0007-files/MapComparison.mp4)
- MapLibre is under continued development

### Negative Consequences

- The MapLibre project is still relatively new
  - Mitigation: if we need to revert we can go back to Mapbox 1.13.0
- We need to change variable and class names to change "mapbox" references to "maplibre"
  - Mitigation: this is a relatively small change
- There might be other incompatibilities with mapbox and/or backwards incompatibilities as the Maplibre framework evolves
  - Mitigation: we will follow the progress of MapLibre as it evolves

## Pros and Cons of the Options

### Mapbox-GL JS 2.3.1

The latest released version of [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/)

- Pro: performance is quite good and improving
- Con: as of December of last year, Mapbox has moved to a proprietary license
- Con: requires key, payment, even for self-hosted version and tiles

### Mapbox-GL JS 1.13.0

The last pre-license change version of [Mapbox](https://github.com/mapbox/mapbox-gl-js/releases/tag/v1.13.0)

- Pro: Perf still good
- Pro: License permissive, no required key
- Con: Not under current active development

### OpenLayers 6.4.3

This option is sticking with our current choice, the latest released version of the [OpenLayers](https://github.com/openlayers/openlayers), an alternative open source framework.

- Pro: No change necessary vs. current setup
- Con: Without WebGL support, performance is inferior to these other options

## Links

- [Improving the Performance of Mapbox GL JS Maps](https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/) - a general overview of the concerns related to mapping performance
