import * as React from 'react';
import J40Map from './J40Map';
import MapLegend from '../components/mapLegend';

interface IMapWrapperProps {
  location: Location
}

const MapWrapper = ({location}: IMapWrapperProps) => {
  return (
    <>
      <h2>Explore the Tool</h2>
      <J40Map location={location}/>
      <MapLegend />
    </>
  );
};


export default MapWrapper;
