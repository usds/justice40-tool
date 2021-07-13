// URLS
export const FEATURE_TILE_BASE_URL = 'https://d2zjid6n5ja2pt.cloudfront.net';
const XYZ_SUFFIX = '{z}/{x}/{y}.pbf';
export const FEATURE_TILE_HIGH_ZOOM_URL = `${FEATURE_TILE_BASE_URL}/0629_demo/${XYZ_SUFFIX}`;
export const FEATURE_TILE_LOW_ZOOM_URL = `${FEATURE_TILE_BASE_URL}/tiles_low/${XYZ_SUFFIX}`;


// Performance markers
export const PERFORMANCE_MARKER_MAP_IDLE = 'MAP_IDLE';

// Properties
export const SCORE_PROPERTY_HIGH = 'Score D (percentile)';
export const SCORE_PROPERTY_LOW = 'D_SCORE';
export const GEOID_PROPERTY = 'GEOID10';
export const HIGH_SCORE_SOURCE_NAME = 'score-high';
export const HIGH_SCORE_LAYER_NAME = 'score-high-layer';
export const LOW_SCORE_SOURCE_NAME = 'score-low';
export const LOW_SCORE_LAYER_NAME = 'score-low-layer';
export const SELECTED_PROPERTY = 'selected';

// The name of the layer within the tiles that contains the score
export const SCORE_SOURCE_LAYER = 'blocks';

export type J40Properties = { [key: string]: any };


// Zoom
export const GLOBAL_MIN_ZOOM = 3;
export const GLOBAL_MAX_ZOOM = 22;
export const GLOBAL_MIN_ZOOM_LOW = 3;
export const GLOBAL_MAX_ZOOM_LOW = 7;
export const GLOBAL_MIN_ZOOM_HIGHLIGHT = 9;
export const GLOBAL_MAX_ZOOM_HIGHLIGHT = 22;
export const GLOBAL_MIN_ZOOM_HIGH = 7;
export const GLOBAL_MAX_ZOOM_HIGH = 11;

// Bounds
export const GLOBAL_MAX_BOUNDS = [
  [-180.118306, 5.499550],
  [-65.0, 83.162102],
];

export const LOWER_48_BOUNDS = [
  [-124.7844079, 24.7433195],
  [-66.9513812, 49.3457868],
];

export const ALASKA_BOUNDS = [
  [-183.856888, 50.875311],
  [-140.932617, 71.958797],
];

export const HAWAII_BOUNDS = [
  [-168.118306, 18.748115],
  [-154.757881, 22.378413],
];

export const PUERTO_RICO_BOUNDS = [
  [-67.945404, 17.88328],
  [-65.220703, 18.515683],
];

export const GUAM_BOUNDS = [
  [-215.389709, 13.225909],
  [-215.040894, 13.663335],
];

export const MARIANA_ISLAND_BOUNDS = [
  [-215.313449, 14.007801],
  [-213.742404, 19.750326],
];

export const AMERICAN_SAMOA_BOUNDS = [
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

// Widths
export const HIGHLIGHT_BORDER_WIDTH = 5.0;

// Score boundaries
export const SCORE_BOUNDARY_LOW = 0.0;
export const SCORE_BOUNDARY_THRESHOLD = 0.6;
export const SCORE_BOUNDARY_PRIORITIZED = 0.75;

export const isMobile = typeof window !== 'undefined' && (window.innerWidth < 400);
