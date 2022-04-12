import React from 'react';
import AreaDetail from './AreaDetail';
import SidePanelInfo from './SidePanelInfo';

interface IMapInfoPanelProps {
    className: string,
    featureProperties: { [key:string]: string | number } | undefined,
    selectedFeatureId: string | number | undefined
    hash: string[],
  }

const MapInfoPanel = ({className, featureProperties, selectedFeatureId, hash}:IMapInfoPanelProps) => {
  return (
    <div className={className} >
      {(featureProperties && selectedFeatureId ) ?
          <AreaDetail properties={featureProperties} hash={hash}/> :
          <SidePanelInfo />
      }
    </div>
  );
};

export default MapInfoPanel;
