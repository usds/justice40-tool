/* eslint-disable require-jsdoc */
// Todo VS: what is a better way around this jsdoc disabling?
// See FlagContext.tsx for how we're doing JSDOCs

import React from 'react';
import MapIntroduction from './mapIntroduction';
import {IDetailViewInterface} from '../components/J40Map';
import AreaDetail from './areaDetail';
import * as constants from '../data/constants';

interface IMapSidePanelProps {
    className: string,
    detailViewData: IDetailViewInterface | undefined,
    selectedFeatureId: string | number | undefined
  }

const MapSidePanel = ({className, detailViewData, selectedFeatureId}:IMapSidePanelProps) => {
  console.log(className);
  const indicators = [
    constants.POVERTY_PROPERTY_PERCENTILE,
    constants.EDUCATION_PROPERTY_PERCENTILE,
    constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE,
    constants.UNEMPLOYMENT_PROPERTY_PERCENTILE,
    constants.HOUSING_BURDEN_PROPERTY_PERCENTILE,
    constants.SCORE_PROPERTY_HIGH,
    constants.GEOID_PROPERTY,
    constants.TOTAL_POPULATION,
  ];

  const tempData = {
    [indicators[0]]: detailViewData?.properties[indicators[0]],
    [indicators[1]]: detailViewData?.properties[indicators[1]],
    [indicators[2]]: detailViewData?.properties[indicators[2]],
    [indicators[3]]: detailViewData?.properties[indicators[3]],
    [indicators[4]]: detailViewData?.properties[indicators[4]],
    [indicators[5]]: detailViewData?.properties[indicators[5]],
    [indicators[6]]: detailViewData?.properties[indicators[6]],
    [indicators[7]]: detailViewData?.properties[indicators[7]],
  };

  return (
    <div className={className} >
      {(detailViewData && selectedFeatureId ) ?
          <AreaDetail properties={tempData} /> :
          <MapIntroduction />
      }
    </div>
  );
};

export default MapSidePanel;
