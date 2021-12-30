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
const cartoLightBaseLayer = {
  noLabels: [
    `https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
  ],
  withLabels: [
    `https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://cartodb-basemaps-b.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://cartodb-basemaps-c.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://cartodb-basemaps-d.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${imageSuffix}.png`,
  ],
};

// Additional layers found here: https://carto.com/help/building-maps/basemap-list/#carto-vector-basemaps
// New "voyager" base layer
const cartoVoyagerBaseLayer = {
  noLabels: [
    `https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://c.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    `https://d.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
  ],
  withLabels: [
    `https://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}${imageSuffix}.png`,
    `https://b.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}${imageSuffix}.png`,
    `https://c.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}${imageSuffix}.png`,
    `https://d.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}${imageSuffix}.png`,
  ],
};

// New "positron" base layer
const cartoPositronBaseLayer = {
  noLabels: [
    `https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=true&access_token=pk.eyJ1IjoianVzdGljZTQwIiwiYSI6ImNreGF1Z3loNjB0N3oybm9jdGpxeDZ4b3kifQ.76tMHU7C8wwn0HGsF6azjA{z}/{x}/{y}${imageSuffix}.png`,
    // `https://a.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    // `https://b.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    // `https://c.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
    // `https://d.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}${imageSuffix}.png`,
  ],
  withLabels: [
    `https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=true&access_token=pk.eyJ1IjoianVzdGljZTQwIiwiYSI6ImNreGF1Z3loNjB0N3oybm9jdGpxeDZ4b3kifQ.76tMHU7C8wwn0HGsF6azjA{z}/{x}/{y}${imageSuffix}.png`,
    // `https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}${imageSuffix}.png`,
    // `https://b.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}${imageSuffix}.png`,
    // `https://c.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}${imageSuffix}.png`,
    // `https://d.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}${imageSuffix}.png`,
  ],
};


export const makeMapStyle = (flagContainer: FlagContainer) : Style => {
  let baseLayer = {...cartoLightBaseLayer};

  if ('vy' in flagContainer) {
    baseLayer = {...cartoVoyagerBaseLayer};
  } else if ('ps' in flagContainer) {
    baseLayer = {...cartoPositronBaseLayer};
  };

  return {
    'version': 8,
    'sources': {
      'carto': {
        'type': 'raster',
        'tiles': baseLayer.noLabels,
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
      'geo': {
        'type': 'raster',
        'tiles': [
          'https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
        ],
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
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
        // Seeting maxzoom here enables 'overzooming'
        // e.g. continued zooming beyond the max bounds.
        // More here: https://docs.mapbox.com/help/glossary/overzoom/
        'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
        'maxzoom': constants.GLOBAL_MAX_ZOOM_HIGH,
      },
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
      'labels': {
        'type': 'raster',
        'tiles': cartoLightBaseLayer.withLabels,
      },
    },
    'layers': [
      {
        'id': 'carto',
        'source': 'carto',
        'type': 'raster',
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
      {
        'id': 'geo',
        'source': 'geo',
        'type': 'raster',
        'layout': {
        // Make the layer invisible by default.
          'visibility': 'none',
        },
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
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
      {
      // We put labels last to ensure prominence
        'id': 'labels-only-layer',
        'type': 'raster',
        'source': 'labels',
        'minzoom': constants.GLOBAL_MIN_ZOOM,
        'maxzoom': constants.GLOBAL_MAX_ZOOM,
      },
    ],
  };
};

