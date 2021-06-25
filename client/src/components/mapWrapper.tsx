import * as React from 'react';
import {useFlags} from '../contexts/FlagContext';
import MapboxMap from './mapboxMap';
import OpenLayersMap from './openlayersMap';

const MapWrapper = () => {
  const flags = useFlags();
  return (
    <div>
      {
            flags.includes('mb') ?
            <MapboxMap /> :
            <OpenLayersMap features={[]}/>
      }
    </div>
  );
};


export default MapWrapper;
