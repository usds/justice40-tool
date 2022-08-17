import React, {useMemo} from 'react';
import {Source, Layer} from 'react-map-gl';
import {AnyLayer} from 'mapbox-gl';

import * as constants from '../../data/constants';

interface IMapTribalLayers {
  selectedFeatureId: AnyLayer,
  selectedFeature: AnyLayer,
}

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


/**
 * This component will return the appropriate source and layers for the tribal layer on the
 * map.
 *
 * There are two use cases here, eg, when the MapBox token is or isn't provided. When the token
 * is not provided, the open-source map will be rendered. When the open-source map is rendered
 * only the interactive layers are returned from this component. The reason being is that the
 * other layers are supplied by he getOSBaseMap function.
 *
 * @param {AnyLayer} selectedFeatureId
 * @param {AnyLayer} selectedFeature
 * @return {Style}
 */
const MapTribalLayer = ({
  selectedFeatureId,
  selectedFeature,
}: IMapTribalLayers) => {
  const tribalSelectionFilter = useMemo(() => ['in', constants.TRIBAL_ID, selectedFeatureId], [selectedFeature]);

  return process.env.MAPBOX_STYLES_READ_TOKEN ? (

    // In this case the MapBox token is found and ALL source(s)/layer(s) are returned.
    <Source
      id={constants.TRIBAL_SOURCE_NAME}
      type="vector"
      promoteId={constants.TRIBAL_ID}
      tiles={[tribalURL()]}
      minzoom={constants.TRIBAL_MIN_ZOOM}
      maxzoom={constants.TRIBAL_MAX_ZOOM}
    >

      {/* Tribal layer */}
      <Layer
        id={constants.TRIBAL_LAYER_ID}
        source-layer={constants.TRIBAL_SOURCE_LAYER}
        type='fill'
        paint={{
          'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
          'fill-opacity': constants.TRIBAL_FEATURE_FILL_OPACITY}}
        minzoom={constants.TRIBAL_MIN_ZOOM}
        maxzoom={constants.TRIBAL_MAX_ZOOM}
      />

      {/* Tribal layer - controls the border between features */}
      <Layer
        id={constants.FEATURE_BORDER_LAYER_ID}
        source-layer={constants.TRIBAL_SOURCE_LAYER}
        type='line'
        paint={{
          'line-color': constants.FEATURE_BORDER_COLOR,
          'line-width': constants.FEATURE_BORDER_WIDTH,
          'line-opacity': constants.FEATURE_BORDER_OPACITY,
        }}
        minzoom={constants.TRIBAL_MIN_ZOOM}
        maxzoom={constants.TRIBAL_MAX_ZOOM}
      />

      {/* Tribal layer - border styling around the selected feature */}
      <Layer
        id={constants.SELECTED_TRIBAL_FEATURE_BORDER_LAYER_ID}
        source-layer={constants.TRIBAL_SOURCE_LAYER}
        filter={tribalSelectionFilter}
        type='line'
        paint={{
          'line-color': constants.SELECTED_FEATURE_BORDER_COLOR,
          'line-width': constants.SELECTED_FEATURE_BORDER_WIDTH,
        }}
        minzoom={constants.TRIBAL_MIN_ZOOM}
      />

      {/* Alaska layer */}
      {/* // Todo: limit zoom in amount */}
      <Layer
        id={constants.TRIBAL_ALASKA_POINTS_LAYER_ID}
        source-layer={constants.TRIBAL_SOURCE_LAYER}
        filter={['==', ['geometry-type'], 'Point']}
        type='circle'
        paint={{
          'circle-radius': constants.TRIBAL_ALASKA_CIRCLE_RADIUS,
          'circle-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
        }}
        minzoom={constants.TRIBAL_MIN_ZOOM}
        maxzoom={constants.TRIBAL_MAX_ZOOM}
      />
    </Source>
  ) : (

    /**
     * In this case the MapBox token is NOT found and ONLY INTERACTIVE source(s)/layer(s) are returned.
     * In this case, the other layers (non-interactive) are provided by getOSBaseMap
     */
    <Source
      id={constants.TRIBAL_SOURCE_NAME}
      type="vector"
      promoteId={constants.TRIBAL_ID}
      tiles={[tribalURL()]}
      minzoom={constants.TRIBAL_MIN_ZOOM}
      maxzoom={constants.TRIBAL_MAX_ZOOM}
    >

      {/* Tribal layer - border styling around the selected feature */}
      <Layer
        id={constants.SELECTED_TRIBAL_FEATURE_BORDER_LAYER_ID}
        source-layer={constants.TRIBAL_SOURCE_LAYER}
        filter={tribalSelectionFilter}
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
