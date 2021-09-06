import React from 'react';
import MapIntroduction from './mapIntroduction';
import AreaDetail from './AreaDetail';

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
          <MapIntroduction />
      }
    </div>
  );
};

export default MapInfoPanel;
