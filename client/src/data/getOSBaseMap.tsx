import {Style} from 'maplibre-gl';
import * as constants from '../data/constants';
import {featureURLForTilesetName} from '../components/J40Map';

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


// Utility function to get OpenSource base maps that are in accordance to JSON spec of MapBox
// https://docs.mapbox.com/mapbox-gl-js/style-spec/
export const getOSBaseMap = () : Style => {
  return {
    'version': 8,

    /**
     * Map Sources
     * */
    'sources': {

      /**
       * The base map source source allows us to define where the tiles can be fetched from.
       */
      [constants.BASE_MAP_SOURCE_NAME]: {
        'type': 'raster',
        'tiles': cartoLightBaseLayer.noLabels,
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },

      // The High zoom source:
      [constants.HIGH_ZOOM_SOURCE_NAME]: {
      // It is only shown at high zoom levels to avoid performance issues at lower zooms
        'type': 'vector',
        // Our current tippecanoe command does not set an id.
        // The below line promotes the GEOID10 property to the ID
        'promoteId': constants.GEOID_PROPERTY,
        'tiles': [featureURLForTilesetName('high')],
        // Setting maxzoom here enables 'overzooming'
        // e.g. continued zooming beyond the max bounds.
        // More here: https://docs.mapbox.com/help/glossary/overzoom/
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_HIGH,
      },

      // The Low zoom source:
      [constants.LOW_ZOOM_SOURCE_NAME]: {
      // "Score-low" represents a tileset at the level of bucketed tracts.
      // census block group information is `dissolve`d into tracts, then
      // each tract is `dissolve`d into one of ten buckets. It is meant
      // to give us a favorable tradeoff between performance and fidelity.
        'type': 'vector',
        'promoteId': constants.GEOID_PROPERTY,
        'tiles': [featureURLForTilesetName('low')],
        'minzoom': constants.GLOBAL_MIN_ZOOM_LOW,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_LOW,
      },

      // The labels source:
      'labels': {
        'type': 'raster',
        'tiles': cartoLightBaseLayer.labelsOnly,
      },
    },

    /**
     * Each object in the layers array references it's source via the source key.
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

      /**
       * High zoom layer - non-prioritized features only
       */
      {
        'id': constants.HIGH_ZOOM_LAYER_ID,
        'source': constants.HIGH_ZOOM_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        /**
         * This shows features where the high score < score boundary threshold.
         * In other words, this filter out prioritized features
         */
        'filter': ['all',
          ['<', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD],
        ],

        'type': 'fill',
        'paint': {
          'fill-opacity': constants.NON_PRIORITIZED_FEATURE_FILL_OPACITY,
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      },

      /**
       * High zoom layer - prioritized features only
       */
      {
        'id': constants.PRIORITIZED_HIGH_ZOOM_LAYER_ID,
        'source': constants.HIGH_ZOOM_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        /**
         * This shows features where the high score > score boundary threshold.
         * In other words, this filter out non-prioritized features
         */
        'filter': ['all',
          ['>', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD],
        ],

        'type': 'fill',
        'paint': {
          'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
          'fill-opacity': constants.HIGH_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY,
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      },


      /**
       * Low zoom layer - prioritized features only
       */
      {
        'id': constants.LOW_ZOOM_LAYER_ID,
        'source': constants.LOW_ZOOM_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        /**
         * This shows features where the low score > score boundary threshold.
         * In other words, this filter out non-prioritized features
         */
        'filter': ['all',
          ['>', constants.SCORE_PROPERTY_LOW, constants.SCORE_BOUNDARY_THRESHOLD],
        ],

        'type': 'fill',
        'paint': {
          'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
          'fill-opacity': constants.LOW_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY,
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
          'visibility': 'visible',
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
    ],
  };
};

