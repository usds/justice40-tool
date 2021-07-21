/* eslint-disable require-jsdoc */
// Todo VS what is a better way around this jsdoc disabling?

import React from 'react';
import DidYouKnow from './didYouKnow';
import AreaDetail from './areaDetail';
import * as constants from '../data/constants';

// Todo VS: what is a better way to define this interface given that its already been defined once?
interface IDetailViewInterface {
    latitude: number
    longitude: number
    zoom: number
    properties: constants.J40Properties,
  };


interface IMapSidePanelProps {
    className?: string,
    detailViewData: IDetailViewInterface | undefined,
    isFeatureSelected: boolean
  }

// Todo VS: Should this component be given a type, eg, functional or pure or something?
const MapSidePanel = ({className, detailViewData, isFeatureSelected}:IMapSidePanelProps) => {
  return (
    <div className={className} >
      {(detailViewData && isFeatureSelected ) ?
          <AreaDetail properties={detailViewData.properties} /> :
          <DidYouKnow />
      }
    </div>
  );
};

export default MapSidePanel;
