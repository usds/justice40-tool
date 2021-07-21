/* eslint-disable require-jsdoc */
// Todo VS what is a better way around this jsdoc disabling?

import React from 'react';
import AreaDetail from './areaDetail';
import DidYouKnow from './didYouKnow';
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
    transitionInProgress: boolean,
  }

// Todo VS: Should this component be given a type, eg, FC, PC ?
const MapSidePanel = ({className, detailViewData, transitionInProgress}:IMapSidePanelProps) => {
  return (
    <div className={className}>
      {(detailViewData && !transitionInProgress) ?
          <AreaDetail properties={detailViewData.properties} /> :
          <DidYouKnow />
      }
    </div>
  );
};

export default MapSidePanel;
