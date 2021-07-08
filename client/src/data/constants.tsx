// Properties
export const SCORE_PROPERTY = 'Score D (percentile)';
export const GEOID_PROPERTY = 'GEOID10';
export const SCORE_LAYER = 'score';
export type J40Properties = { [key: string]: any };

// Zoom
export const GLOBAL_MIN_ZOOM = 3;
export const GLOBAL_MAX_ZOOM = 22;
export const GLOBAL_MIN_ZOOM_LOW = 3;
export const GLOBAL_MAX_ZOOM_LOW = 9;
export const GLOBAL_MIN_ZOOM_HIGH = 9;
export const GLOBAL_MAX_ZOOM_HIGH = 12;

// Bounds
export const GLOBAL_MAX_BOUNDS = [
  [-168.118306, 5.499550],
  [-66.950000, 83.162102],
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
