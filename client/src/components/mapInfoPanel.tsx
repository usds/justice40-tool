import React from 'react';
import AreaDetail from './AreaDetail';
import SidePanelInfo from './SidePanelInfo';

interface IMapInfoPanelProps {
    className: string,
    featureProperties: { [key:string]: string | number } | undefined,
    selectedFeatureId: string | number | undefined
    hash: string[],
  }

const MapInfoPanel = ({
  className,
  featureProperties,
  selectedFeatureId,
  hash,
}:IMapInfoPanelProps) => {
  return (
    <div className={className} >
      {/*
      The tertiary conditional statement below will control the side panel state. Currently
      there are two states, namely showing the AreaDetail or SidePanelInfo. When a feature
      is selected, show the AreaDetail. When not selected show SidePanelInfo
       */}
      {(featureProperties && selectedFeatureId) ?
          <AreaDetail
            properties={featureProperties}
            hash={hash}
          /> :
          <SidePanelInfo />
      }
    </div>
  );
};

export default MapInfoPanel;
