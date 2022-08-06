import React from 'react';
import AreaDetail from './AreaDetail';
import SidePanelInfo from './SidePanelInfo';

interface IMapInfoPanelProps {
    className: string,
    featureProperties: { [key:string]: string | number } | undefined,
    selectedFeatureId: string | number | undefined
    hash: string[],
    isCensusLayerSelected: boolean,
    layerToggled: boolean, // indicates if census layer or tribal layer has been toggled
  }

const MapInfoPanel = ({
  className,
  featureProperties,
  selectedFeatureId,
  hash,
  isCensusLayerSelected,
  layerToggled,
}:IMapInfoPanelProps) => {
  return (
    <div className={className} >
      {/* The tertiary conditional statement below will control the side panel state. Currently
      there are two states, namely showing the AreaDetail or SidePanelInfo. When a feature
      is selected, on - for example - the census tract layer, and if the Tribal Layer is the selected
      the Side Panel should revert back to the SidePanelInfo.

      A new boolean called layerToggle captures that a layer has been selected and to render
      the SidePanelInfo component */}
      {(featureProperties && selectedFeatureId && !layerToggled) ?
          <AreaDetail
            properties={featureProperties}
            hash={hash}
            isCensusLayerSelected={isCensusLayerSelected}
          /> :
          <SidePanelInfo />
      }
    </div>
  );
};

export default MapInfoPanel;
