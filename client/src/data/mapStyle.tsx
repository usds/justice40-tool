import {Style, FillPaint} from 'mapbox-gl';
import chroma from 'chroma-js';
import * as constants from '../data/constants';

// eslint-disable-next-line require-jsdoc
function hexToHSLA(hex:string, alpha:number) {
  return chroma(hex).alpha(alpha).css('hsl');
}

/**
 * `MakePaint` generates a zoom-faded Mapbox style formatted layer given a set of parameters.
 *
 * @param {string} field : the field within the data to consult
 * @param {number} minRamp : the minimum value this can assume
 * @param {number} medRamp : the medium value this can assume
 * @param {number} maxRamp : the maximum value this can assume
 * @param {boolean} high : whether this is a "high" or "low" layer
 * @return {FillPaint} a mapboxgl fill layer
 **/
function makePaint({
  field,
  minRamp,
  medRamp,
  maxRamp,
  high,
}: {
    field: string;
    minRamp: number;
    medRamp: number;
    maxRamp: number;
    high: boolean;
  }): FillPaint {
  const minColor = 'white'; // '232, 88%, 100%';
  const medColor = '#D1DAE6';
  const maxColor = '#768FB3'; // '0, 98%, 56%';
  return {
    'fill-color': [
      'interpolate',
      ['linear'],
      ['zoom'],
        high ? 9 : 0,
        [
          'step',
          ['get', field],
          hexToHSLA(minColor, high ? 0 : 0.5 ),
          minRamp,
          hexToHSLA(minColor, high ? 0 : 0.5 ),
          medRamp,
          hexToHSLA(medColor, high ? 0 : 0.5 ),
          maxRamp,
          hexToHSLA(maxColor, high ? 0 : 0.5 ),
        ],
        high ? 11 : 9,
        [
          'step',
          ['get', field],
          hexToHSLA(minColor, high ? 0.5 : 0.5 ),
          minRamp,
          hexToHSLA(minColor, high ? 0.5 : 0.5 ),
          medRamp,
          hexToHSLA(medColor, high ? 0.5 : 0.5 ),
          maxRamp,
          hexToHSLA(maxColor, high ? 0.5 : 0.5 ),
        ],
        high ? 22 : 11,
        [
          'step',
          ['get', field],
          hexToHSLA(minColor, high ? 0.5 : 0 ),
          minRamp,
          hexToHSLA(minColor, high ? 0.5 : 0 ),
          medRamp,
          hexToHSLA(medColor, high ? 0.5 : 0 ),
          maxRamp,
          hexToHSLA(maxColor, high ? 0.5 : 0 ),
        ],
    ],
  };
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
    'custom': {
      'type': 'vector',
      'tiles': [
        'https://d2zjid6n5ja2pt.cloudfront.net/0629_demo/{z}/{x}/{y}.pbf',
        // For local development, use:
        // 'http://localhost:8080/data/tl_2010_bg_with_data/{z}/{x}/{y}.pbf',
      ],
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
      'minzoom': 3,
      'maxzoom': 11,
    },
    {
      'id': 'geo',
      'source': 'geo',
      'type': 'raster',
      'minzoom': 3,
      'maxzoom': 11,
      'layout': {
        // Make the layer visible by default.
        'visibility': 'none',
      },
    },
    {
      'id': 'score-low',
      'source': 'custom',
      'source-layer': 'blocks',
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
        high: false,
      }),
    },
    {
      'id': 'score-high',
      'source': 'custom',
      'source-layer': 'blocks',
      'type': 'fill',
      'filter': ['all',
        ['>', constants.SCORE_PROPERTY, 0.6],
        // ['in', 'STATEFP10', '01', '30', '34', '35', '36'],
      ],
      'paint': makePaint({
        field: constants.SCORE_PROPERTY,
        minRamp: 0,
        medRamp: 0.6,
        maxRamp: 1.0,
        high: true,
      }),
    },
    {
      'id': 'labels-only',
      'type': 'raster',
      'source': 'labels',
      'minzoom': 4,
      'maxzoom': 11,
    },
  ],
};

export default mapStyle;
