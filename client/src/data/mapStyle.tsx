import {Style, FillPaint} from 'maplibre-gl';
import chroma from 'chroma-js';
import * as constants from '../data/constants';

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

const mapStyle : Style = {
  'version': 8,
  'sources': {
    'carto': {
      'type': 'raster',
      'tiles': [
        'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      ],
    },
    'geo': {
      'type': 'raster',
      'tiles': [
        'https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
      ],
    },
    'score': {
      'type': 'vector',
      // Our current tippecanoe command does not set an id.
      // The below line promotes the GEOID10 property to the ID
      'promoteId': 'GEOID10',
      'tiles': [
        `${constants.FEATURE_TILE_BASE_URL}/{z}/{x}/{y}.pbf`,
        // For local development, use:
        // 'http://localhost:8080/data/tl_2010_bg_with_data/{z}/{x}/{y}.pbf',
      ],

      // Seeting maxzoom here enables 'overzooming'
      // e.g. continued zooming beyond the max bounds.
      // More here: https://docs.mapbox.com/help/glossary/overzoom/
      'maxzoom': constants.GLOBAL_MAX_ZOOM_HIGH,
    },
    'labels': {
      'type': 'raster',
      'tiles': [
        'https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://cartodb-basemaps-b.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://cartodb-basemaps-c.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://cartodb-basemaps-d.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
      ],
    },
  },
  'layers': [
    {
      'id': 'carto',
      'source': 'carto',
      'type': 'raster',
      'minzoom': constants.GLOBAL_MIN_ZOOM - 1,
    },
    {
      'id': 'geo',
      'source': 'geo',
      'type': 'raster',
      'minzoom': constants.GLOBAL_MIN_ZOOM - 1,
      'layout': {
        // Make the layer visible by default.
        'visibility': 'none',
      },
    },
    {
      'id': 'score',
      'source': constants.SCORE_SOURCE_NAME,
      'source-layer': constants.SCORE_SOURCE_LAYER,
      'type': 'fill',
      'filter': ['all',
        ['>', constants.SCORE_PROPERTY, 0.6],
        // ['in', 'STATEFP10', '01', '30', '34', '35', '36'],
      ],
      'paint': makePaint({
        field: constants.SCORE_PROPERTY,
        minRamp: 0,
        medRamp: 0.6,
        maxRamp: 0.75,
      }),
      'minzoom': constants.GLOBAL_MIN_ZOOM,
      'maxzoom': constants.GLOBAL_MAX_ZOOM,
    },
    {
      'id': 'score-highlights',
      'source': 'score',
      'source-layer': constants.SCORE_SOURCE_LAYER,
      'type': 'line',
      'minzoom': constants.GLOBAL_MIN_ZOOM_HIGH,
      'layout': {
        'visibility': 'visible',
        'line-join': 'round',
        'line-cap': 'round',
      },
      'paint': {
        'line-color': constants.DEFAULT_OUTLINE_COLOR,
        'line-width': 0.8,
        'line-opacity': 0.5,
      },
    },
    {
      // This layer queries the feature-state property "selected" and
      // highlights the border of the selected region if true
      'id': 'score-border-highlight',
      'type': 'line',
      'source': 'score',
      'source-layer': constants.SCORE_SOURCE_LAYER,
      'layout': {},
      'paint': {
        'line-color': constants.BORDER_HIGHLIGHT_COLOR,
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          5.0,
          0,
        ],
      },
    },
    {
      'id': 'labels-only',
      'type': 'raster',
      'source': 'labels',
      'minzoom': constants.GLOBAL_MIN_ZOOM,
    },
  ],
};

export default mapStyle;
