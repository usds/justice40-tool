import {Style} from 'maplibre-gl';
import * as constants from '../data/constants';

// This file is no longer used, however keeping in case we have to revert to explicit styling. There was a
// gradient function that in this file's commit history which could prove useful in the future.

// *********** BASE MAP SOURCES  ***************
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


// Utility function to make map styles according to JSON spec of MapBox
// https://docs.mapbox.com/mapbox-gl-js/style-spec/
export const makeMapStyle = () : Style => {
  return {
    'version': 8,

    /**
     * Removing any sources, removes the map from rendering, since the layers key is depenedent on these
     * sources.
     *
     * - base map source: This source control the base map.
     * - geo: currently not being used
     * - high zoom source: comes from our tile server for high zoom tiles
     * - low zoom source: comes from our tile server for low zoom tiles
     * - labels source: currently using carto's label-only source
     * */
    'sources': {

      /**
       * The base map source source allows us to define where the tiles can be fetched from.
       * Currently we are evaluating carto, MapTiler, Geoampify and MapBox for viable base maps.
       */
      [constants.BASE_MAP_SOURCE_NAME]: {
        'type': 'raster',
        'tiles': cartoLightBaseLayer.noLabels,

        /**
         * Attempting to place a direct call to mapbox URL:
         */
        // 'type': 'raster',
        // 'tiles': [`mapbox://styles/mapbox/streets-v11`],

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
      // 'geo': {
      //   'type': 'raster',
      //   'tiles': [
      //     'https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
      //   ],
      //   'minzoom': constants.GLOBAL_MIN_ZOOM,
      //   'maxzoom': constants.GLOBAL_MAX_ZOOM,
      // },

      // The High zoom source:
      // [constants.HIGH_ZOOM_SOURCE_NAME]: {
      // // It is only shown at high zoom levels to avoid performance issues at lower zooms
      //   'type': 'vector',
      //   // Our current tippecanoe command does not set an id.
      //   // The below line promotes the GEOID10 property to the ID
      //   'promoteId': constants.GEOID_PROPERTY,
      //   'tiles': [
      //     'high_tiles' in flagContainer ?
      //     constants.featureURLForTilesetName(flagContainer['high_tiles']) :
      //     constants.FEATURE_TILE_HIGH_ZOOM_URL,
      //   ],
      //   // Setting maxzoom here enables 'overzooming'
      //   // e.g. continued zooming beyond the max bounds.
      //   // More here: https://docs.mapbox.com/help/glossary/overzoom/
      //   'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      //   'maxzoom': constants.GLOBAL_MAX_ZOOM_HIGH,
      // },

      // The Low zoom source:
      // [constants.LOW_ZOOM_SOURCE_NAME]: {
      // // "Score-low" represents a tileset at the level of bucketed tracts.
      // // census block group information is `dissolve`d into tracts, then
      // // each tract is `dissolve`d into one of ten buckets. It is meant
      // // to give us a favorable tradeoff between performance and fidelity.
      //   'type': 'vector',
      //   'promoteId': constants.GEOID_PROPERTY,
      //   'tiles': [
      //     'low_tiles' in flagContainer ?
      //     constants.featureURLForTilesetName(flagContainer['low_tiles']) :
      //     constants.FEATURE_TILE_LOW_ZOOM_URL,
      //   // For local development, use:
      //   // 'http://localhost:8080/data/tl_2010_bg_with_data/{z}/{x}/{y}.pbf',
      //   ],
      //   'minzoom': constants.GLOBAL_MIN_ZOOM_LOW,
      //   'maxzoom': constants.GLOBAL_MAX_ZOOM_LOW,
      // },

      // The labels source:
      'labels': {
        'type': 'raster',
        'tiles': cartoLightBaseLayer.labelsOnly,
      },
    },

    /**
     * Each object in the layers array references it's source via the source key.
     * Each layer stacks upon the previous layer in the array of layers.
     *
     *  - baseMapLayer: the base layer without labels
     *  - geo: a geographical layer that is not being used
     *  - high zoom layer - non-prioritized features only
     *  - high zoom layer - prioritized features only
     *  - low zoom layer - prioritized features only
     *  - labels only layer
     */
    'layers': [
      // The baseMapLayer
      {
        'id': constants.BASE_MAP_LAYER_ID,
        'source': constants.BASE_MAP_SOURCE_NAME,
        'type': 'raster',
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },

      // The Geo layer adds a geographical layer like mountains and rivers
      // {
      //   'id': 'geo',
      //   'source': 'geo',
      //   'type': 'raster',
      //   'layout': {
      //     // Place visibility behind flag:
      //     'visibility': 'geo' in flagContainer ? 'visible' : 'none',
      //   },
      //   'minzoom': constants.GLOBAL_MIN_ZOOM,
      //   'maxzoom': constants.GLOBAL_MAX_ZOOM,
      // },

      /**
       * High zoom layer - non-prioritized features only
       */
      // {
      //   'id': constants.HIGH_ZOOM_LAYER_ID,
      //   'source': constants.HIGH_ZOOM_SOURCE_NAME,
      //   'source-layer': constants.SCORE_SOURCE_LAYER,
      //   /**
      //    * This shows features where the high score < score boundary threshold.
      //    * In other words, this filter out prioritized features
      //    */
      //   'filter': ['all',
      //     ['<', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD],
      //   ],

      //   'type': 'fill',
      //   'paint': {
      //     'fill-opacity': constants.NON_PRIORITIZED_FEATURE_FILL_OPACITY,
      //   },
      //   'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      // },

      /**
       * High zoom layer - prioritized features only
       */
      // {
      //   'id': constants.PRIORITIZED_HIGH_ZOOM_LAYER_ID,
      //   'source': constants.HIGH_ZOOM_SOURCE_NAME,
      //   'source-layer': constants.SCORE_SOURCE_LAYER,
      //   /**
      //    * This shows features where the high score > score boundary threshold.
      //    * In other words, this filter out non-prioritized features
      //    */
      //   'filter': ['all',
      //     ['>', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD],
      //   ],

      //   'type': 'fill',
      //   'paint': {
      //     'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
      //     'fill-opacity': constants.HIGH_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY,
      //   },
      //   'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      // },


      /**
       * Low zoom layer - prioritized features only
       */
      // {
      //   'id': constants.LOW_ZOOM_LAYER_ID,
      //   'source': constants.LOW_ZOOM_SOURCE_NAME,
      //   'source-layer': constants.SCORE_SOURCE_LAYER,
      //   /**
      //    * This shows features where the low score > score boundary threshold.
      //    * In other words, this filter out non-prioritized features
      //    */
      //   'filter': ['all',
      //     ['>', constants.SCORE_PROPERTY_LOW, constants.SCORE_BOUNDARY_THRESHOLD],
      //   ],

      //   'type': 'fill',
      //   'paint': {
      //     'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
      //     'fill-opacity': constants.LOW_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY,
      //   },
      //   'minzoom': constants.GLOBAL_MIN_ZOOM_LOW,
      //   'maxzoom': constants.GLOBAL_MAX_ZOOM_LOW,
      // },

      // A layer for labels only
      {
        'id': 'labels-only-layer',
        'source': 'labels',
        'type': 'raster',
        'layout': {
          'visibility': 'visible',
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
    ],
  };
};
