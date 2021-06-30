import * as React from 'react';
import {useFlags} from '../contexts/FlagContext';
import MapboxMap from './mapboxMap';
import OpenLayersMap from './openlayersMap';
import * as constants from '../data/constants';

const MapWrapper = () => {
  const flags = useFlags();
  return (
    <div>
      {
            flags.includes('mb') ?
            <MapboxMap /> :
            <OpenLayersMap features={[]}/>
      }
      <p>Current Score Property: {constants.SCORE_PROPERTY}</p>
    </div>
  );
};


export default MapWrapper;
