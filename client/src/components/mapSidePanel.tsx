import React from 'react';
import MapIntroduction from './mapIntroduction';
import AreaDetail from './areaDetail';

interface IMapSidePanelProps {
    className: string,
    featureProperties: { [key:string]: string | number } | undefined,
    selectedFeatureId: string | number | undefined
  }

const MapSidePanel = ({className, featureProperties, selectedFeatureId}:IMapSidePanelProps) => {
  return (
    <div className={className} >
      {(featureProperties && selectedFeatureId ) ?
          <AreaDetail properties={featureProperties} /> :
          <MapIntroduction />
      }
    </div>
  );
};

export default MapSidePanel;
