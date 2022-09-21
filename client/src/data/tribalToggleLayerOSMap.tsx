/**
 * This file holds the tribal layer styling for the OS map in case we want to add the toggle back.
 */
// const tribal:any = {
//   /**
//    * Tribal Source
//    */
//   'version': 8,

//   /**
//    * Map Sources
//    * */
//   'sources': {

//     /**
//      * The base map source source allows us to define where the tiles can be fetched from.
//      */
//     [constants.BASE_MAP_SOURCE_NAME]: {
//       'type': 'raster',
//       'tiles': cartoLightBaseLayer.noLabels,
//       'minzoom': constants.GLOBAL_MIN_ZOOM,
//       'maxzoom': constants.GLOBAL_MAX_ZOOM,
//     },

//     /**
//      * Tribal source
//      */
//     [constants.TRIBAL_SOURCE_NAME]: {
//       'type': 'vector',
//       'promoteId': constants.TRIBAL_ID,
//       'tiles': [tribalURL()],
//       'minzoom': constants.TRIBAL_MIN_ZOOM,
//       'maxzoom': constants.TRIBAL_MAX_ZOOM,
//     },

//     // The labels source:
//     'labels': {
//       'type': 'raster',
//       'tiles': cartoLightBaseLayer.labelsOnly,
//     },
//   },


//   /**
//    * Tribal Layers
//    */
//   'layers': [

//     // The baseMapLayer
//     {
//       'id': constants.BASE_MAP_LAYER_ID,
//       'source': constants.BASE_MAP_SOURCE_NAME,
//       'type': 'raster',
//       'minzoom': constants.GLOBAL_MIN_ZOOM,
//       'maxzoom': constants.GLOBAL_MAX_ZOOM,
//     },

//     /**
//     * Tribal layer
//     */
//     {
//       'id': constants.TRIBAL_LAYER_ID,
//       'source': constants.TRIBAL_SOURCE_NAME,
//       'source-layer': constants.TRIBAL_SOURCE_LAYER,
//       'type': 'fill',
//       'paint': {
//         'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
//         'fill-opacity': constants.HIGH_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY,
//       },
//       'minzoom': constants.TRIBAL_MIN_ZOOM,
//       'maxzoom': constants.TRIBAL_MAX_ZOOM,
//     },

//     /**
//     * Tribal layer - controls the border between features
//     */
//     {
//       'id': constants.FEATURE_BORDER_LAYER_ID,
//       'source': constants.TRIBAL_SOURCE_NAME,
//       'source-layer': constants.TRIBAL_SOURCE_LAYER,
//       'type': 'line',
//       'paint': {
//         'line-color': constants.FEATURE_BORDER_COLOR,
//         'line-width': constants.FEATURE_BORDER_WIDTH,
//         'line-opacity': constants.FEATURE_BORDER_OPACITY},
//       'minzoom': constants.TRIBAL_MIN_ZOOM,
//       'maxzoom': constants.TRIBAL_MAX_ZOOM,
//     },

//     /**
//     * Alaska layer
//     */
//     {
//       'id': constants.TRIBAL_ALASKA_POINTS_LAYER_ID,
//       'source': constants.TRIBAL_SOURCE_NAME,
//       'source-layer': constants.TRIBAL_SOURCE_LAYER,
//       'type': 'circle',
//       'filter': ['==', ['geometry-type'], 'Point'],
//       'paint': {
//         'circle-radius': constants.TRIBAL_ALASKA_CIRCLE_RADIUS,
//         'circle-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
//         'circle-opacity': constants.HIGH_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY,
//         'circle-stroke-color': constants.FEATURE_BORDER_COLOR,
//         'circle-stroke-width': constants.ALAKSA_POINTS_STROKE_WIDTH,
//         'circle-stroke-opacity': constants.FEATURE_BORDER_OPACITY,
//       },
//       'minzoom': constants.TRIBAL_MIN_ZOOM,
//       'maxzoom': constants.TRIBAL_MAX_ZOOM,
//     },
//   ],
// };
