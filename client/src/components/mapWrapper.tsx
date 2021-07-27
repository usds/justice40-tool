import * as React from 'react';
import J40Map from './J40Map';
import MapLegend from '../components/mapLegend';

const MapWrapper = () => {
  return (
    <section>
      <h2>Explore the Tool</h2>
      <J40Map />
      <MapLegend />
    </section>
  );
};


export default MapWrapper;
