import {Style} from 'maplibre-gl';
import * as constants from '../data/constants';

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

