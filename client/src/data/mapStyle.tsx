import {Style} from 'maplibre-gl';
import * as constants from '../data/constants';
import {FlagContainer} from '../contexts/FlagContext';

const imageSuffix = constants.isMobile ? '' : '@2x';

// Original "light" Base layer
// Additional layers found here: https://carto.com/help/building-maps/basemap-list/#carto-vector-basemaps
const cartoLightBaseLayer = {
  noLabels: [
    `https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
  ],
  labelsOnly: [
    `https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://cartodb-basemaps-b.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://cartodb-basemaps-c.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://cartodb-basemaps-d.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
  ],
};

// Todo move API_KEY to env
const getMapTilerBaseLayer = (name:string, API_KEY='KMA4bawPDNtR6zNIAfUH') => {
  return [
    `https://api.maptiler.com/maps/${name}/{z}/{x}/{y}${imageSuffix}.png?key=${API_KEY}`,
  ];
};

export const makeMapStyle = (flagContainer: FlagContainer) : Style => {
  const getBaseMapLayer = () => {
    if ('mt-streets' in flagContainer) {
      return getMapTilerBaseLayer('streets');
    } else if ('mt-bright' in flagContainer) {
      return getMapTilerBaseLayer('bright');
    } else if ('mt-voyager' in flagContainer) {
      return getMapTilerBaseLayer('voyager');
    } else if ('mt-osm' in flagContainer) {
      return getMapTilerBaseLayer('osm-standard');
    } else {
      return cartoLightBaseLayer.noLabels;
    };
  };


  return {
    'version': 8,

    /**
     * Removing any sources, removes the map from rendering, since the layers key is depenedent on these
     * sources. The layers key below refers to these sources by id.
     *  - baseMapLayer: the base layer without labels
     *  - geo: a geographical layer that is not being used
     *  - high zoom: the source of the high zoom tiles
     *  - low zoom: the source of the low zoom source
     *  - labels: the source of a base layers with labels only
     *
     * The reason the base layers were split into "no labels" and "labels only" was to make the labels
     * more prominent.
     * */
    'sources': {

      /**
       * The baseMapLayer source allows us to define where the tiles can be fetched from. This baseMapLayer
       * will load various baseMapLayer sources depending on the feature flag
       */
      'baseMapLayer': {
        'type': 'raster',
        'tiles': getBaseMapLayer(),

        /**
         * This MapBox Raster seems to work, however the tileset curently available in MapBox
         * is the "satellite" tileset. Messaged Mikel on more options.
         */
        // 'type': 'raster',
        // 'tiles': [
        //   `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianVzdGljZTQwIiwiYSI6ImNreGF1Z3loNjB0N3oybm9jdGpxeDZ4b3kifQ.76tMHU7C8wwn0HGsF6azjA`,
        // ],

        /**
         * This MapBox Vector does not work, attempting to place this in the main component as
         * a <Source> and <Layer> component also did not work.
         */
        // 'type': 'vector',
        // 'tiles': [
        //   `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoianVzdGljZTQwIiwiYSI6ImNreGF1Z3loNjB0N3oybm9jdGpxeDZ4b3kifQ.76tMHU7C8wwn0HGsF6azjA`,
        // ],

        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },

      // In the layer (below) where the geo source is used, the layer is invisible
      'geo': {
        'type': 'raster',
        'tiles': [
          'https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
        ],
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },

      // The High zoom source:
      [constants.HIGH_SCORE_SOURCE_NAME]: {
      // "Score-high" represents the full set of data
      // at the census block group level. It is only shown
      // at high zoom levels to avoid performance issues at lower zooms
        'type': 'vector',
        // Our current tippecanoe command does not set an id.
        // The below line promotes the GEOID10 property to the ID
        'promoteId': constants.GEOID_PROPERTY,
        'tiles': [
          'high_tiles' in flagContainer ?
          constants.featureURLForTilesetName(flagContainer['high_tiles']) :
          constants.FEATURE_TILE_HIGH_ZOOM_URL,
        ],
        // Setting maxzoom here enables 'overzooming'
        // e.g. continued zooming beyond the max bounds.
        // More here: https://docs.mapbox.com/help/glossary/overzoom/
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_HIGH,
      },

      // The Low zoom source:
      [constants.LOW_SCORE_SOURCE_NAME]: {
      // "Score-low" represents a tileset at the level of bucketed tracts.
      // census block group information is `dissolve`d into tracts, then
      // each tract is `dissolve`d into one of ten buckets. It is meant
      // to give us a favorable tradeoff between performance and fidelity.
        'type': 'vector',
        'promoteId': constants.GEOID_PROPERTY,
        'tiles': [
          'low_tiles' in flagContainer ?
          constants.featureURLForTilesetName(flagContainer['low_tiles']) :
          constants.FEATURE_TILE_LOW_ZOOM_URL,
        // For local development, use:
        // 'http://localhost:8080/data/tl_2010_bg_with_data/{z}/{x}/{y}.pbf',
        ],
        'minzoom': constants.GLOBAL_MIN_ZOOM_LOW,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_LOW,
      },

      // The labels source:
      'labels': {
        'type': 'raster',
        // 'tiles': baseMapLayer.labelsOnly,
        'tiles': cartoLightBaseLayer.labelsOnly,
      },
    },

    /**
     * Each layer in the layer array corresponds to a source above and is referenced by
     * the id key using the value of sources.[name]. Each layer stacks upon the previous
     * layer in the array of layers.
     *
     * Todo: rename constants and move constants to constants file
     */
    'layers': [
      // The baseMapLayer
      {
        'id': 'baseMapLayer',
        'source': 'baseMapLayer',
        'type': 'raster',
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },

      // The Geo layer adds a geographical layer like mountains and rivers
      {
        'id': 'geo',
        'source': 'geo',
        'type': 'raster',
        'layout': {
          // Place visibility behind flag:
          'visibility': 'geo' in flagContainer ? 'visible' : 'none',
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },

      /**
       * High zoom layer
       * Todo: rename constants
       */
      {
        'id': 'someId',
        'source': constants.HIGH_SCORE_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        /**
               * This shows features where the high score < score boundary threshold.
               * In other words, this filter will only show the non-prioritized features
               */
        'filter': ['all',
          ['<', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD],
        ],

        'type': 'fill',
        'paint': {
          'fill-opacity': 0,
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      },

      /**
       * High zoom layer
       * Todo: rename constants
       */
      {
        'id': constants.HIGH_SCORE_LAYER_NAME,
        'source': constants.HIGH_SCORE_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        /**
         * This shows features where the high score > score boundary threshold.
         * In other words, this filter will only show the prioritized features
         */
        'filter': ['all',
          ['>', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD],
        ],

        'type': 'fill',
        'paint': {
          'fill-color': constants.MAX_COLOR,
          'fill-opacity': constants.DEFAULT_LAYER_OPACITY,
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      },


      /**
       * Low zoom layer with non-prioritized filtered out
       */
      {
        'id': constants.LOW_SCORE_LAYER_NAME,
        'source': constants.LOW_SCORE_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        /**
         * This shows features where the low score > score boundary threshold, which
         * will only show the prioritized features
         */
        'filter': ['all',
          ['>', constants.SCORE_PROPERTY_LOW, constants.SCORE_BOUNDARY_THRESHOLD],
        ],

        'type': 'fill',
        'paint': {
          'fill-color': constants.MAX_COLOR,
          'fill-opacity': constants.DEFAULT_LAYER_OPACITY,
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM_LOW,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_LOW,
      },

      // A layer for labels only
      {
        'id': 'labels-only-layer',
        'source': 'labels',
        'type': 'raster',
        'layout': {
          'visibility': 'remove-label-layer' in flagContainer ? 'none' : 'visible',
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
    ],
  };
};

