import {Style, FillPaint} from 'maplibre-gl';
import chroma from 'chroma-js';
import * as constants from '../data/constants';
import {FlagContainer} from '../contexts/FlagContext';

// eslint-disable-next-line require-jsdoc
function hexToHSLA(hex:string, alpha:number) {
  return chroma(hex).alpha(alpha).css('hsl');
}

/**
 * `MakePaint` generates a zoom-faded Maplibre style formatted layer given a set of parameters.
 *
 * @param {string} field : the field within the data to consult
 * @param {number} minRamp : the minimum value this can assume
 * @param {number} medRamp : the medium value this can assume
 * @param {number} maxRamp : the maximum value this can assume
 * @return {FillPaint} a maplibregl fill layer
 **/
function makePaint({
  field,
  minRamp,
  medRamp,
  maxRamp,
}: {
    field: string;
    minRamp: number;
    medRamp: number;
    maxRamp: number;
  }): FillPaint {
  const paintDescriptor : FillPaint = {
    'fill-color': [
      'step',
      ['get', field],
      hexToHSLA(constants.MIN_COLOR, constants.DEFAULT_LAYER_OPACITY ),
      minRamp,
      hexToHSLA(constants.MIN_COLOR, constants.DEFAULT_LAYER_OPACITY ),
      medRamp,
      hexToHSLA(constants.MED_COLOR, constants.DEFAULT_LAYER_OPACITY ),
      maxRamp,
      hexToHSLA(constants.MAX_COLOR, constants.DEFAULT_LAYER_OPACITY ),
    ],
  };
  return paintDescriptor;
}

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
        // 'tiles': baseMapLayer.noLabels,
        'tiles': getBaseMapLayer(),
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
     */
    'layers': 'remove-label-layer' in flagContainer ? [
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

      // High zoom layer
      {
        'id': constants.HIGH_SCORE_LAYER_NAME,
        'source': constants.HIGH_SCORE_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        'type': 'fill',
        'paint': makePaint({
          field: constants.SCORE_PROPERTY_HIGH,
          minRamp: constants.SCORE_BOUNDARY_LOW,
          medRamp: constants.SCORE_BOUNDARY_THRESHOLD,
          maxRamp: constants.SCORE_BOUNDARY_PRIORITIZED,
        }),
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      },

      // Low zoom layer
      {
        'id': constants.LOW_SCORE_LAYER_NAME,
        'source': constants.LOW_SCORE_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        'type': 'fill',
        'filter': ['all',
          ['>', constants.SCORE_PROPERTY_LOW, constants.SCORE_BOUNDARY_THRESHOLD],
        ],
        'paint': makePaint({
          field: constants.SCORE_PROPERTY_LOW,
          minRamp: constants.SCORE_BOUNDARY_LOW,
          medRamp: constants.SCORE_BOUNDARY_THRESHOLD,
          maxRamp: constants.SCORE_BOUNDARY_PRIORITIZED,
        }),
        'minzoom': constants.GLOBAL_MIN_ZOOM_LOW,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_LOW,
      },
    ] :
    [
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

      // High zoom layer
      {
        'id': constants.HIGH_SCORE_LAYER_NAME,
        'source': constants.HIGH_SCORE_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        'type': 'fill',
        'paint': makePaint({
          field: constants.SCORE_PROPERTY_HIGH,
          minRamp: constants.SCORE_BOUNDARY_LOW,
          medRamp: constants.SCORE_BOUNDARY_THRESHOLD,
          maxRamp: constants.SCORE_BOUNDARY_PRIORITIZED,
        }),
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      },

      // Low zoom layer
      {
        'id': constants.LOW_SCORE_LAYER_NAME,
        'source': constants.LOW_SCORE_SOURCE_NAME,
        'source-layer': constants.SCORE_SOURCE_LAYER,
        'type': 'fill',
        'filter': ['all',
          ['>', constants.SCORE_PROPERTY_LOW, constants.SCORE_BOUNDARY_THRESHOLD],
        ],
        'paint': makePaint({
          field: constants.SCORE_PROPERTY_LOW,
          minRamp: constants.SCORE_BOUNDARY_LOW,
          medRamp: constants.SCORE_BOUNDARY_THRESHOLD,
          maxRamp: constants.SCORE_BOUNDARY_PRIORITIZED,
        }),
        'minzoom': constants.GLOBAL_MIN_ZOOM_LOW,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_LOW,
      },

      // A layer for labels only
      {
        'id': 'labels-only-layer',
        'type': 'raster',
        'source': 'labels',
        'layout': {
          'visibility': 'visible',
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
    ],
  };
};

