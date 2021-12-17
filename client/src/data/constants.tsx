
import {LngLatBoundsLike} from 'maplibre-gl';
import {isMobile as isMobileReactDeviceDetect} from 'react-device-detect';

const XYZ_SUFFIX = '{z}/{x}/{y}.pbf';
export const featureURLForTilesetName = (tilesetName: string): string => {
  // The feature tile base URL and path can either point locally or the CDN.
  // This is selected based on the DATA_SOURCE env variable.
  const featureTileBaseURL = process.env.DATA_SOURCE === 'local' ?
    process.env.GATSBY_LOCAL_TILES_BASE_URL :
    process.env.GATSBY_CDN_TILES_BASE_URL;

  const featureTilePath = process.env.DATA_SOURCE === 'local' ?
  process.env.GATSBY_DATA_PIPELINE_SCORE_PATH_LOCAL :
  process.env.GATSBY_DATA_PIPELINE_SCORE_PATH;

  return [
    featureTileBaseURL,
    featureTilePath,
    process.env.GATSBY_MAP_TILES_PATH,
    tilesetName,
    XYZ_SUFFIX,
  ].join('/');
};
export const FEATURE_TILE_HIGH_ZOOM_URL = featureURLForTilesetName('high');
export const FEATURE_TILE_LOW_ZOOM_URL = featureURLForTilesetName('low');


// Performance markers
export const PERFORMANCE_MARKER_MAP_IDLE = 'MAP_IDLE';

// Properties
export const SCORE_PROPERTY_HIGH = 'SL_PFS';
export const SCORE_PROPERTY_LOW = 'L_SCORE';
export const GEOID_PROPERTY = 'GEOID10';
export const HIGH_SCORE_SOURCE_NAME = 'score-high';
export const HIGH_SCORE_LAYER_NAME = 'score-high-layer';
export const LOW_SCORE_SOURCE_NAME = 'score-low';
export const LOW_SCORE_LAYER_NAME = 'score-low-layer';
export const SELECTED_PROPERTY = 'selected';
export const CURRENTLY_SELECTED_FEATURE_HIGHLIGHT_LAYER_NAME = 'currently-selected-feature-highlight-layer';
export const BLOCK_GROUP_BOUNDARY_LAYER_NAME = 'block-group-boundary-layer';


// Indicator values:
export const ASTHMA_PERCENTILE = 'AF_PFS';
export const COUNTY_NAME = 'CF';
export const DIABETES_PERCENTILE = 'DF_PFS';
export const DIESEL_MATTER_PERCENTILE = 'DSF_PFS';
export const ENERGY_PERCENTILE = 'EBF_PFS';
export const HEART_PERCENTILE = 'HDF_PFS';
export const HIGH_SCHOOL_PROPERTY_PERCENTILE = `HSEF`;
export const HOUSING_BURDEN_PROPERTY_PERCENTILE = 'HBF_PFS';
export const LEAD_PAINT_PERCENTILE = 'LPF_PFS';
export const LIFE_PERCENTILE = 'LLEF_PFS';
export const LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE = 'LIF_PFS';
export const LOW_MEDIAN_INCOME_PERCENTILE = 'LMI_PFS';
export const PM25_PERCENTILE = 'PM25F_PFS';
export const POVERTY_PROPERTY_PERCENTILE = 'P200_PFS';
export const STATE_NAME = 'SF';
export const TOTAL_POPULATION = 'TPF';
export const TRAFFIC_PERCENTILE = 'TF_PFS';
export const UNEMPLOYMENT_PROPERTY_PERCENTILE = 'UF_PFS';
export const WASTEWATER_PERCENTILE = 'WF_PFS';
export const EXP_AGRICULTURE_LOSS_PERCENTILE = 'EALR_PFS';
export const EXP_BUILDING_LOSS_PERCENTILE = 'EBLR_PFS';
export const EXP_POPULATION_LOSS_PERCENTILE = 'EPLR_PFS';
export const MEDIAN_HOME_VALUE_PERCENTILE = 'MHVF_PFS';
export const POVERTY_BELOW_100_PERCENTILE = 'P100_PFS';
export const POVERTY_BELOW_200_PERCENTILE = 'P200_PFS';
export const PROXIMITY_NPL_SITES_PERCENTILE = 'NPL_PFS';
export const PROXIMITY_RMP_SITES_PERCENTILE = 'RMP_PFS';
export const PROXIMITY_TSDF_SITES_PERCENTILE = 'TSDF_PFS';

// Category booleans (disadvantaged or not):
export const IS_CLIMATE_FACTOR_DISADVANTAGED_L = 'L_CLT';
export const IS_ENERGY_FACTOR_DISADVANTAGED_L = 'L_ENY';
export const IS_TRANSPORT_FACTOR_DISADVANTAGED_L = 'L_TRN';
export const IS_HOUSING_FACTOR_DISADVANTAGED_L = 'L_HSG';
export const IS_POLLUTION_FACTOR_DISADVANTAGED_L = 'L_PLN';
export const IS_WATER_FACTOR_DISADVANTAGED_L = 'L_WTR';
export const IS_HEALTH_FACTOR_DISADVANTAGED_L = 'L_HLTH';
export const IS_WORKFORCE_FACTOR_DISADVANTAGED_L = 'L_WKFC';

// Total indicators values:
export const TOTAL_NUMBER_OF_DISADVANTAGE_INDICATORS = 'TC';
export const TOTAL_NUMBER_OF_INDICATORS = 24;

// Indicator booleans (disadvangted or not): (GTE = greater than or equal)
export const IS_GTE_90_EXP_POP_LOSS_AND_IS_LOW_INCOME = 'EPLRLI';
export const IS_GTE_90_EXP_AGR_LOSS_AND_IS_LOW_INCOME = 'EALRLI';
export const IS_GTE_90_EXP_BLD_LOSS_AND_IS_LOW_INCOME = 'EBLRLI';
export const IS_GTE_90_PM25_AND_IS_LOW_INCOME = 'PM25LI';
export const IS_GTE_90_ENERGY_BURDEN_AND_IS_LOW_INCOME = 'EBLI';
export const IS_GTE_90_DIESEL_PM_AND_IS_LOW_INCOME = 'DPMLI';
export const IS_GTE_90_TRAFFIC_PROX_AND_IS_LOW_INCOME = 'TPLI';
export const IS_GTE_90_LEAD_PAINT_AND_MEDIAN_HOME_VAL_AND_IS_LOW_INCOME = 'LPMHVLI';
export const IS_GTE_90_HOUSE_BURDEN_AND_IS_LOW_INCOME = 'HBLI';
export const IS_GTE_90_RMP_AND_IS_LOW_INCOME = 'RMPLI';
export const IS_GTE_90_SUPERFUND_AND_IS_LOW_INCOME = 'SFLI';
export const IS_GTE_90_HAZARD_WASTE_AND_IS_LOW_INCOME = 'HWLI';
export const IS_GTE_90_WASTEWATER_AND_IS_LOW_INCOME = 'WDLI';
export const IS_GTE_90_DIABETES_AND_IS_LOW_INCOME = 'DLI';
export const IS_GTE_90_ASTHMA_AND_IS_LOW_INCOME = 'ALI';
export const IS_GTE_90_HEART_DISEASE_AND_IS_LOW_INCOME = 'HDLI';
export const IS_GTE_90_LOW_LIFE_EXP_AND_IS_LOW_INCOME = 'LLELI';
export const IS_GTE_90_LINGUISITIC_ISO_AND_IS_LOW_INCOME = 'LILHSE';
export const IS_GTE_90_BELOW_100_POVERTY_AND_LOW_HIGH_SCHOOL_EDU = 'PLHSE';
export const IS_GTE_90_LOW_MEDIAN_INCOME_AND_LOW_HIGH_SCHOOL_EDU = 'LMILHSE';
export const IS_GTE_90_UNEMPLOYMENT_AND_LOW_HIGH_SCHOOL_EDU = 'ULHSE';
export const IS_FEDERAL_POVERTY_LEVEL_200 = 'FPL200S';
export const TOTAL_THRESHOLD_CRITERIA = 'TC';
export const IS_GTE_90_ISLAND_AREA_UNEMPLOYMENT_AND_IS_LOW_HS_EDU_2009 = 'IAULHSE';
export const IS_GTE_90_ISLAND_AREA_BELOW_100_POVERTY_AND_IS_LOW_HS_EDU_2009 = 'ISPLHSE';
export const IS_GTE_90_ISLAND_AREA_LOW_MEDIAN_INCOME_AND_IS_LOW_HS_EDU_2009 = 'IALMILHSE';
export type J40Properties = { [key: string]: any };

// The name of the layer within the tiles that contains the score
export const SCORE_SOURCE_LAYER = 'blocks';

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
export const GLOBAL_MAX_BOUNDS: LngLatBoundsLike = [
  [-180.118306, 5.499550],
  [-65.0, 83.162102],
];

export const LOWER_48_BOUNDS: LngLatBoundsLike = [
  [-124.7844079, 24.7433195],
  [-66.9513812, 49.3457868],
];

export const ALASKA_BOUNDS: LngLatBoundsLike = [
  [-183.856888, 50.875311],
  [-140.932617, 71.958797],
];

export const HAWAII_BOUNDS: LngLatBoundsLike = [
  [-168.118306, 18.748115],
  [-154.757881, 22.378413],
];

export const PUERTO_RICO_BOUNDS: LngLatBoundsLike = [
  [-67.945404, 17.88328],
  [-65.220703, 18.515683],
];

export const GUAM_BOUNDS: LngLatBoundsLike = [
  [-215.389709, 13.225909],
  [-215.040894, 13.663335],
];

export const MARIANA_ISLAND_BOUNDS: LngLatBoundsLike = [
  [-215.313449, 14.007801],
  [-213.742404, 19.750326],
];

export const AMERICAN_SAMOA_BOUNDS: LngLatBoundsLike = [
  [-171.089874, -14.548699],
  [-168.1433, -11.046934],
];

export const US_VIRGIN_ISLANDS_BOUNDS: LngLatBoundsLike = [
  [-65.5782239, 17.6739145],
  [-64.2704123, 18.7495796],
];

export const DEFAULT_CENTER = [32.4687126, -86.502136];

// Opacity
export const DEFAULT_LAYER_OPACITY = 0.6;

// Colors
export const DEFAULT_OUTLINE_COLOR = '#4EA5CF';
export const MIN_COLOR = '#FFFFFF';
export const MED_COLOR = '#D1DAE6';
export const MAX_COLOR = '#768FB3';
export const BORDER_HIGHLIGHT_COLOR = '#1A4480';
export const CURRENTLY_SELECTED_FEATURE_LAYER_OPACITY = 0.5;

// Widths
export const HIGHLIGHT_BORDER_WIDTH = 5.0;
export const CURRENTLY_SELECTED_FEATURE_LAYER_WIDTH = 0.8;

// Score boundaries
export const SCORE_BOUNDARY_LOW = 0.0;
export const SCORE_BOUNDARY_THRESHOLD = 0.6;
export const SCORE_BOUNDARY_PRIORITIZED = 0.75;

export const isMobile = isMobileReactDeviceDetect;
