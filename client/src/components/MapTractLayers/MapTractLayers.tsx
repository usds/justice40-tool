import React, {useMemo} from 'react';
import {Source, Layer} from 'react-map-gl';
import {AnyLayer} from 'mapbox-gl';

// Contexts:
import {useFlags} from '../../contexts/FlagContext';

import * as constants from '../../data/constants';
import * as COMMON_COPY from '../../data/copy/common';

interface IMapTractLayers {
    selectedFeatureId: AnyLayer,
    selectedFeature: AnyLayer,
}

/**
 * This function will determine the URL for the map tiles. It will read in a string that will designate either
 * high or low tiles. It will allow to overide the URL to the pipeline staging tile URL via feature flag.
 * Lastly, it allows to set the tiles to be local or via the CDN as well.
 *
 * @param {string} tilesetName
 * @return {string}
 */
export const featureURLForTilesetName = (tilesetName: string): string => {
  const flags = useFlags();

  const pipelineStagingBaseURL = `https://justice40-data.s3.amazonaws.com/data-pipeline-staging`;
  const XYZ_SUFFIX = '{z}/{x}/{y}.pbf';

  if ('stage_hash' in flags) {
    // Check if the stage_hash is valid
    const regex = /^[0-9]{4}\/[a-f0-9]{40}$/;
    if (!regex.test(flags['stage_hash'])) {
      console.error(COMMON_COPY.CONSOLE_ERROR.STAGE_URL);
    }

    return `${pipelineStagingBaseURL}/${flags['stage_hash']}/data/score/tiles/${tilesetName}/${XYZ_SUFFIX}`;
  } else {
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
  }
};

const MapTractLayers = ({
  selectedFeatureId,
  selectedFeature,
}: IMapTractLayers) => {
  const filter = useMemo(() => ['in', constants.GEOID_PROPERTY, selectedFeatureId], [selectedFeature]);

  return (
    <>
      <Source
        id={constants.LOW_ZOOM_SOURCE_NAME}
        type="vector"
        promoteId={constants.GEOID_PROPERTY}
        tiles={[featureURLForTilesetName('low')]}
        maxzoom={constants.GLOBAL_MAX_ZOOM_LOW}
        minzoom={constants.GLOBAL_MIN_ZOOM_LOW}
      >

        {/* Low zoom layer - prioritized features only */}
        <Layer
          id={constants.LOW_ZOOM_LAYER_ID}
          source-layer={constants.SCORE_SOURCE_LAYER}
          filter={['>', constants.SCORE_PROPERTY_LOW, constants.SCORE_BOUNDARY_THRESHOLD]}
          type='fill'
          paint={{
            'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
            'fill-opacity': constants.LOW_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY}}
          maxzoom={constants.GLOBAL_MAX_ZOOM_LOW}
          minzoom={constants.GLOBAL_MIN_ZOOM_LOW}
        />
      </Source>

      {/**
     * The high zoom source
    */}
      <Source
        id={constants.HIGH_ZOOM_SOURCE_NAME}
        type="vector"
        promoteId={constants.GEOID_PROPERTY}
        tiles={[featureURLForTilesetName('high')]}
        maxzoom={constants.GLOBAL_MAX_ZOOM_HIGH}
        minzoom={constants.GLOBAL_MIN_ZOOM_HIGH}
      >

        {/* High zoom layer - non-prioritized features only */}
        <Layer
          id={constants.HIGH_ZOOM_LAYER_ID}
          source-layer={constants.SCORE_SOURCE_LAYER}
          filter={['<', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD]}
          type='fill'
          paint={{
            'fill-opacity': constants.NON_PRIORITIZED_FEATURE_FILL_OPACITY,
          }}
          minzoom={constants.GLOBAL_MIN_ZOOM_HIGH}
        />

        {/* High zoom layer - prioritized features only */}
        <Layer
          id={constants.PRIORITIZED_HIGH_ZOOM_LAYER_ID}
          source-layer={constants.SCORE_SOURCE_LAYER}
          filter={['>', constants.SCORE_PROPERTY_HIGH, constants.SCORE_BOUNDARY_THRESHOLD]}
          type='fill'
          paint={{
            'fill-color': constants.PRIORITIZED_FEATURE_FILL_COLOR,
            'fill-opacity': constants.HIGH_ZOOM_PRIORITIZED_FEATURE_FILL_OPACITY,
          }}
          minzoom={constants.GLOBAL_MIN_ZOOM_HIGH}
        />

        {/* High zoom layer - controls the border between features */}
        <Layer
          id={constants.FEATURE_BORDER_LAYER_ID}
          source-layer={constants.SCORE_SOURCE_LAYER}
          type='line'
          paint={{
            'line-color': constants.FEATURE_BORDER_COLOR,
            'line-width': constants.FEATURE_BORDER_WIDTH,
            'line-opacity': constants.FEATURE_BORDER_OPACITY,
          }}
          maxzoom={constants.GLOBAL_MAX_ZOOM_FEATURE_BORDER}
          minzoom={constants.GLOBAL_MIN_ZOOM_FEATURE_BORDER}
        />

        {/* High zoom layer - border styling around the selected feature */}
        <Layer
          id={constants.SELECTED_FEATURE_BORDER_LAYER_ID}
          source-layer={constants.SCORE_SOURCE_LAYER}
          filter={filter} // This filter filters out all other features except the selected feature.
          type='line'
          paint={{
            'line-color': constants.SELECTED_FEATURE_BORDER_COLOR,
            'line-width': constants.SELECTED_FEATURE_BORDER_WIDTH,
          }}
          minzoom={constants.GLOBAL_MIN_ZOOM_HIGH}
        />
      </Source>
    </>
  );
};

export default MapTractLayers;
