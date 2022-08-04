import React from 'react';
import {Source, Layer} from 'react-map-gl';

import * as constants from '../../data/constants';

/**
 * This function will determine the URL for the tribal tiles.
 * @return {string}
 */
export const tribalURL = (): string => {
  const XYZ_SUFFIX = '{z}/{x}/{y}.pbf';

  return [
    process.env.GATSBY_CDN_TILES_BASE_URL,
    process.env.GATSBY_DATA_PIPELINE_TRIBAL_PATH,
    process.env.GATSBY_MAP_TILES_PATH,
    XYZ_SUFFIX,
  ].join('/');
};

const MapTribalLayer = () => {
  return (
    <Source
      id={constants.TRIBAL_SOURCE_NAME}
      type="vector"
      promoteId={constants.TRIBAL_ID}
      tiles={[tribalURL()]}
      minzoom={constants.TRIBAL_MIN_ZOOM}
      maxzoom={constants.TRIBAL_MAX_ZOOM}
    >

      {/* Low zoom layer - prioritized features only */}
      <Layer
        id={constants.TRIBAL_LAYER_ID}
        source-layer={constants.TRIBAL_SOURCE_LAYER}
        //   filter={['>', constants.SCORE_PROPERTY_LOW, constants.SCORE_BOUNDARY_THRESHOLD]}
        type='fill'
        paint={{
          'fill-color': constants.TRIBAL_FILL_COLOR,
          'fill-opacity': constants.TRIBAL_FEATURE_FILL_OPACITY}}
        minzoom={constants.TRIBAL_MIN_ZOOM}
        maxzoom={constants.TRIBAL_MAX_ZOOM}
      />

      {/* Tribal layer - controls the border between features */}
      <Layer
        id={constants.FEATURE_BORDER_LAYER_ID}
        source-layer={constants.SCORE_SOURCE_LAYER}
        type='line'
        paint={{
          'line-color': constants.TRIBAL_BORDER_COLOR,
          'line-width': constants.FEATURE_BORDER_WIDTH,
          'line-opacity': constants.FEATURE_BORDER_OPACITY,
        }}
        minzoom={constants.TRIBAL_MIN_ZOOM}
        maxzoom={constants.TRIBAL_MAX_ZOOM}
      />

      {/* Tribal layer - border styling around the selected feature */}
      <Layer
        id={constants.SELECTED_FEATURE_BORDER_LAYER_ID}
        source-layer={constants.TRIBAL_SOURCE_NAME}
        type='line'
        paint={{
          'line-color': constants.SELECTED_FEATURE_BORDER_COLOR,
          'line-width': constants.SELECTED_FEATURE_BORDER_WIDTH,
        }}
        minzoom={constants.TRIBAL_MIN_ZOOM}
      />
    </Source>
  );
};

export default MapTribalLayer;
//
