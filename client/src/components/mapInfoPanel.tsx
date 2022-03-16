import React from 'react';
import AreaDetail from './AreaDetail';
import SidePanelInfo from './SidePanelInfo';

interface IMapInfoPanelProps {
    className: string,
    featureProperties: { [key:string]: string | number } | undefined,
    selectedFeatureId: string | number | undefined
  }

const MapInfoPanel = ({className, featureProperties, selectedFeatureId}:IMapInfoPanelProps) => {
  return (
    <div className={className} >
      {(featureProperties && selectedFeatureId ) ?
          <AreaDetail properties={featureProperties} /> :
          <SidePanelInfo />
      }
    </div>
  );
};

export default MapInfoPanel;
