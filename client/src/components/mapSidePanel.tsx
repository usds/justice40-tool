/* eslint-disable require-jsdoc */
// Todo VS what is a better way around this jsdoc disabling?

import React from 'react';
import MapIntroduction from './mapIntroduction';
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
  console.log(detailViewData?.properties);
  // Todo VS: Why does this error out?
  // const {properties} = detailViewData

  interface ItempData {
    [constants.POVERTY_PROPERTY_PERCENTILE] : number | null;
    [constants.EDUCATION_PROPERTY_PERCENTILE] : number | null;
    [constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE] : number | null;
    [constants.UNEMPLOYMENT_PROPERTY_PERCENTILE] : number | null;
    [constants.HOUSING_BURDEN_PROPERTY_PERCENTILE] : number | null;
    [constants.SCORE_PROPERTY_HIGH] : string | null;
    [constants.GEOID_PROPERTY] : string | null;
    [constants.TOTAL_POPULATION] : number | null;
  }

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

  // Todo VS: Why does using indicators[n] as keys error out?
  const tempData:ItempData = {
    [constants.POVERTY_PROPERTY_PERCENTILE]: detailViewData?.properties[indicators[0]],
    [constants.EDUCATION_PROPERTY_PERCENTILE]: detailViewData?.properties[indicators[1]],
    [constants.LINGUISTIC_ISOLATION_PROPERTY_PERCENTILE]: detailViewData?.properties[indicators[2]],
    [constants.UNEMPLOYMENT_PROPERTY_PERCENTILE]: detailViewData?.properties[indicators[3]],
    [constants.HOUSING_BURDEN_PROPERTY_PERCENTILE]: detailViewData?.properties[indicators[4]],
    [constants.SCORE_PROPERTY_HIGH]: detailViewData?.properties[indicators[5]],
    [constants.GEOID_PROPERTY]: detailViewData?.properties[indicators[6]],
    [constants.TOTAL_POPULATION]: detailViewData?.properties[indicators[7]],
  };

  return (
    <div className={className} >
      {(detailViewData && isFeatureSelected ) ?
          <AreaDetail properties={tempData} /> :
          <MapIntroduction />
      }
    </div>
  );
};

export default MapSidePanel;
