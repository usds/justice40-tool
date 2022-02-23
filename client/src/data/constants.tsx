
import {LngLatBoundsLike} from 'maplibre-gl';
import {isMobile as isMobileReactDeviceDetect} from 'react-device-detect';

export const isMobile = isMobileReactDeviceDetect;

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

// Staging links for testing:
// export const FEATURE_TILE_HIGH_ZOOM_URL = `https://justice40-data.s3.amazonaws.com/data-pipeline-staging/1297/deee14dd93b783c8d366434dc8438a281b5c89df/data/score/tiles/high/${XYZ_SUFFIX}`;
// export const FEATURE_TILE_LOW_ZOOM_URL = `https://justice40-data.s3.amazonaws.com/data-pipeline-staging/1297/deee14dd93b783c8d366434dc8438a281b5c89df/data/score/tiles/low/${XYZ_SUFFIX}`;


// Performance markers
export const PERFORMANCE_MARKER_MAP_IDLE = 'MAP_IDLE';

// ******* PROPERTIES FROM TILE SERVER **************
export type J40Properties = { [key: string]: any };

// Properties
export const SCORE_PROPERTY_HIGH = 'SM_PFS';
export const SCORE_PROPERTY_LOW = 'M_SCORE';
export const GEOID_PROPERTY = 'GEOID10';
export const SIDE_PANEL_STATE = 'UI_EXP';
export const SIDE_PANEL_STATE_VALUES = {
  NATION: 'Nation',
  PUERTO_RICO: 'Puerto Rico',
  ISLAND_AREAS: 'Island Areas',
};

export const THRHLD = 'TERRITORY_THRESHOLD';

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
export const HIGHER_ED_PERCENTILE = 'CA';

export const ISLAND_AREAS_UNEMPLOYMENT_LOW_HS_EDU_PERCENTILE_FIELD= 'IAULHSE_PFS';
export const ISLAND_AREAS_POVERTY_LOW_HS_EDU_PERCENTILE_FIELD= 'IAPLHSE_PFS';
export const ISLAND_AREAS_LOW_MEDIAN_INCOME_LOW_HS_EDU_PERCENTILE_FIELD= 'IALMILHSE_PFS';
export const ISLAND_AREAS_LOW_HS_EDU_PERCENTILE_FIELD= 'IALHE_PFS';
export const ISLAND_AREAS_HS_EDU_PERCENTAGE_FIELD= 'IAHSEF';

// Category booleans (disadvantaged or not):
export const IS_CLIMATE_FACTOR_DISADVANTAGED_M = 'M_CLT';
export const IS_ENERGY_FACTOR_DISADVANTAGED_M = 'M_ENY';
export const IS_TRANSPORT_FACTOR_DISADVANTAGED_M = 'M_TRN';
export const IS_HOUSING_FACTOR_DISADVANTAGED_M = 'M_HSG';
export const IS_POLLUTION_FACTOR_DISADVANTAGED_M = 'M_PLN';
export const IS_WATER_FACTOR_DISADVANTAGED_M = 'M_WTR';
export const IS_HEALTH_FACTOR_DISADVANTAGED_M = 'M_HLTH';
export const IS_WORKFORCE_FACTOR_DISADVANTAGED_M = 'M_WKFC';

export const IS_CLIMATE_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_CLT_EOMI';
export const IS_CLIMATE_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_CLT_EBSI';
export const IS_ENERGY_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_ENY_EOMI';
export const IS_ENERGY_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_ENY_EBSI';
export const IS_TRANSPORT_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_TRN_EOMI';
export const IS_TRANSPORT_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_TRN_EBSI';
export const IS_HOUSING_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_HSG_EOMI';
export const IS_HOUSING_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_HSG_EBSI';
export const IS_POLLUTION_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_PLN_EOMI';
export const IS_POLLUTION_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_PLN_EBSI';
export const IS_WATER_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_WTR_EOMI';
export const IS_WATER_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_WTR_EBSI';
export const IS_HEALTH_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_HLTH_EOMI';
export const IS_HEALTH_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_HLTH_EBSI';
export const IS_WORKFORCE_EXCEED_ONE_OR_MORE_INDICATORS_M = 'M_WKFC_EOMI';
export const IS_WORKFORCE_EXCEED_BOTH_SOCIO_INDICATORS_M = 'M_WKFC_EBSI';

// Total indicators values:
export const TOTAL_NUMBER_OF_DISADVANTAGE_INDICATORS = 'TC';
export const TOTAL_NUMBER_OF_INDICATORS = 'THRHLD';

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
export const IS_HIGHER_ED_PERCENTILE = 'CA_LT20';
export const TOTAL_THRESHOLD_CRITERIA = 'TC';
export const IS_GTE_90_ISLAND_AREA_UNEMPLOYMENT_AND_IS_LOW_HS_EDU_2009 = 'IAULHSE';
export const IS_GTE_90_ISLAND_AREA_BELOW_100_POVERTY_AND_IS_LOW_HS_EDU_2009 = 'IAPLHSE';
export const IS_GTE_90_ISLAND_AREA_LOW_MEDIAN_INCOME_AND_IS_LOW_HS_EDU_2009 = 'IALMILHSE';
export const ISLAND_AREA_LOW_HS_EDU = 'IALHE';
export const IS_LOW_HS_EDUCATION_LOW_HIGHER_ED_PRIORITIZED = 'LHE';

// The name of the layer within the tiles that contains the score
export const SCORE_SOURCE_LAYER = 'blocks';


// ********** MAP CONSTANTS ***************

// Source name constants
export const BASE_MAP_SOURCE_NAME = 'base-map-source-name';
export const HIGH_ZOOM_SOURCE_NAME = 'high-zoom-source-name';
export const LOW_ZOOM_SOURCE_NAME = 'low-zoom-source-name';

// Layer ID constants
export const BASE_MAP_LAYER_ID = 'base-map-layer-id';
export const HIGH_ZOOM_LAYER_ID = 'high-zoom-layer-id';
export const PRIORITIZED_HIGH_ZOOM_LAYER_ID = 'prioritized-high-zoom-layer-id';
export const LOW_ZOOM_LAYER_ID = 'low-zoom-layer-id';
export const FEATURE_BORDER_LAYER_ID = 'feature-border-layer-id';
export const SELECTED_FEATURE_BORDER_LAYER_ID = 'selected-feature-border-layer-id';

// Zoom
export const GLOBAL_MIN_ZOOM = 3;
export const GLOBAL_MAX_ZOOM = 22;
export const GLOBAL_MIN_ZOOM_LOW = 3;
export const GLOBAL_MAX_ZOOM_LOW = 7;
export const GLOBAL_MIN_ZOOM_HIGH = 7;
export const GLOBAL_MAX_ZOOM_HIGH = 11;
export const GLOBAL_MIN_ZOOM_FEATURE_BORDER = 8;
export const GLOBAL_MAX_ZOOM_FEATURE_BORDER = 22;

// Opacity
export const FEATURE_BORDER_OPACITY = 0.5;
export const HIGH_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY = 0.3;
export const LOW_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY = 0.6;
export const NON_PRIORITIZED_FEATURE_FILL_OPACITY = 0;

// Colors
export const FEATURE_BORDER_COLOR = '#4EA5CF';
export const SELECTED_FEATURE_BORDER_COLOR = '#1A4480';
export const PRIORITIZED_FEATURE_FILL_COLOR = '#768FB3';

// Widths
export const FEATURE_BORDER_WIDTH = 0.8;
export const SELECTED_FEATURE_BORDER_WIDTH = 5.0;

/**
 * This threshold will determine if the feature is prioritized
 * or not. Currently all values are railed to 0 or 1 so this value
 * doesn't really matter.
 */
export const SCORE_BOUNDARY_THRESHOLD = 0.6;

// Bounds - these bounds can be obtained by using the getCurrentMapBoundingBox() function in the map
export const GLOBAL_MAX_BOUNDS: LngLatBoundsLike = [
  [-180.118306, 5.499550],
  [-65.0, 83.162102],
];

export const LOWER_48_BOUNDS: LngLatBoundsLike = [
  [-134.943542, 1.301806],
  [-60.060729, 57.050462],
];

export const ALASKA_BOUNDS: LngLatBoundsLike = [
  [-183.856888, 50.875311],
  [-140.932617, 71.958797],
];

export const HAWAII_BOUNDS: LngLatBoundsLike = [
  [-161.174534, 17.652170],
  [-154.218940, 23.603623],
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
  [-172.589874, -15.548699],
  [-169.6433, -12.046934],
];

export const US_VIRGIN_ISLANDS_BOUNDS: LngLatBoundsLike = [
  [-65.5782239, 17.6739145],
  [-64.2704123, 18.7495796],
];

export const DEFAULT_CENTER = [33.4687126, -97.502136];


// USWDS Breakpoints
export const USWDS_BREAKPOINTS = {
  MOBILE_LG: 480,
  DESKTOP: 1024,
};
