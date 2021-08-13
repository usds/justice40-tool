import {LngLatBoundsLike} from 'maplibre-gl';
import {isMobile as isMobileReactDeviceDetect} from 'react-device-detect';
import {defineMessages} from 'react-intl';

// URLS
export const DOWNLOAD_ZIP_URL = 'https://justice40-data.s3.amazonaws.com/data-pipeline/data/score/downloadable/Screening+Tool+Data.zip';

// This is the URL for the CDN that delivers the tile data
export const FEATURE_TILE_BASE_URL = 'https://d3jqyw10j8e7p9.cloudfront.net';
const FEATURE_TILE_PATH = 'data-pipeline/data/score/tiles';

// This is the URL for the CDN that delivers the application
// const APP_BASE_URL = 'https://d2zjid6n5ja2pt.cloudfront.net';
const XYZ_SUFFIX = '{z}/{x}/{y}.pbf';

export const featureURLForTilesetName = (tilesetName :string ) : string => {
  return `${FEATURE_TILE_BASE_URL}/${FEATURE_TILE_PATH}/${tilesetName}/${XYZ_SUFFIX}`;
};
export const FEATURE_TILE_HIGH_ZOOM_URL = featureURLForTilesetName('high');
export const FEATURE_TILE_LOW_ZOOM_URL = featureURLForTilesetName('low');


// Performance markers
export const PERFORMANCE_MARKER_MAP_IDLE = 'MAP_IDLE';

// Properties
export const SCORE_PROPERTY_HIGH = 'Score E (percentile)';
export const SCORE_PROPERTY_LOW = 'E_SCORE';
export const GEOID_PROPERTY = 'GEOID10';
export const HIGH_SCORE_SOURCE_NAME = 'score-high';
export const HIGH_SCORE_LAYER_NAME = 'score-high-layer';
export const LOW_SCORE_SOURCE_NAME = 'score-low';
export const LOW_SCORE_LAYER_NAME = 'score-low-layer';
export const SELECTED_PROPERTY = 'selected';
export const CURRENTLY_SELECTED_FEATURE_HIGHLIGHT_LAYER_NAME = 'currently-selected-feature-highlight-layer';
export const BLOCK_GROUP_BOUNDARY_LAYER_NAME = 'block-group-boundary-layer';


// Properties
export const POVERTY_PROPERTY_PERCENTILE = 'Poverty (Less than 200% of federal poverty line)';
export const HOUSING_BURDEN_PROPERTY_PERCENTILE = 'Housing burden (percent)';
export const LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE = 'Linguistic isolation (percent)';
export const UNEMPLOYMENT_PROPERTY_PERCENTILE = 'Unemployed civilians (percent)';
export const TOTAL_POPULATION = 'Total population';
export const EDUCATION_PROPERTY_PERCENTILE = 'Percent individuals age 25 or over with less than high school degree';
export const COUNTY_NAME = 'County Name';
export const STATE_NAME = 'State Name';


// The name of the layer within the tiles that contains the score
export const SCORE_SOURCE_LAYER = 'blocks';

export type J40Properties = { [key: string]: any };

// Zoom
export const GLOBAL_MIN_ZOOM = 3;
export const GLOBAL_MAX_ZOOM = 22;
export const GLOBAL_MIN_ZOOM_LOW = 3;
export const GLOBAL_MAX_ZOOM_LOW = 7;
export const GLOBAL_MIN_ZOOM_HIGHLIGHT = 8;
export const GLOBAL_MAX_ZOOM_HIGHLIGHT = 22;
export const GLOBAL_MIN_ZOOM_HIGH = 7;
export const GLOBAL_MAX_ZOOM_HIGH = 11;

// Bounds
export const GLOBAL_MAX_BOUNDS : LngLatBoundsLike = [
  [-180.118306, 5.499550],
  [-65.0, 83.162102],
];

export const LOWER_48_BOUNDS : LngLatBoundsLike = [
  [-124.7844079, 24.7433195],
  [-66.9513812, 49.3457868],
];

export const ALASKA_BOUNDS : LngLatBoundsLike = [
  [-183.856888, 50.875311],
  [-140.932617, 71.958797],
];

export const HAWAII_BOUNDS : LngLatBoundsLike = [
  [-168.118306, 18.748115],
  [-154.757881, 22.378413],
];

export const PUERTO_RICO_BOUNDS : LngLatBoundsLike = [
  [-67.945404, 17.88328],
  [-65.220703, 18.515683],
];

export const GUAM_BOUNDS : LngLatBoundsLike = [
  [-215.389709, 13.225909],
  [-215.040894, 13.663335],
];

export const MARIANA_ISLAND_BOUNDS : LngLatBoundsLike = [
  [-215.313449, 14.007801],
  [-213.742404, 19.750326],
];

export const AMERICAN_SAMOA_BOUNDS : LngLatBoundsLike = [
  [-171.089874, -14.548699],
  [-168.1433, -11.046934],
];

export const DEFAULT_CENTER = [32.4687126, -86.502136];

// Opacity
export const DEFAULT_LAYER_OPACITY = 0.6;

// Colors
export const DEFAULT_OUTLINE_COLOR = '#4EA5CF';
export const MIN_COLOR = '#FFFFFF';
export const MED_COLOR = '#D1DAE6';
export const MAX_COLOR = '#768FB3';
export const BORDER_HIGHLIGHT_COLOR = '#00BDE3';
export const CURRENTLY_SELECTED_FEATURE_LAYER_OPACITY = 0.5;

// Widths
export const HIGHLIGHT_BORDER_WIDTH = 5.0;
export const CURRENTLY_SELECTED_FEATURE_LAYER_WIDTH = 0.8;

// Score boundaries
export const SCORE_BOUNDARY_LOW = 0.0;
export const SCORE_BOUNDARY_THRESHOLD = 0.6;
export const SCORE_BOUNDARY_PRIORITIZED = 0.75;


// Explore the Tool:
export const EXPLORE_TOOL_PAGE_TEXT = defineMessages({
  PRIORITY_LABEL: {
    id: 'legend.info.priority.label',
    defaultMessage: 'Prioritized community',
    description: 'the label of the prioritized community legend',
  },
  THRESHOLD_LABEL: {
    id: 'legend.info.threshold.label',
    defaultMessage: 'Threshold community',
    description: 'the label of the threshold community legend',
  },
  LEGEND_LABEL: {
    id: 'legend.colorkey.label',
    defaultMessage: 'COLOR KEY',
    description: 'the label of the key in the legend',
  },
});

export const isMobile = isMobileReactDeviceDetect;
