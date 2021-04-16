import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';

const MapboxMap = () => {
    const [viewport, setViewport] = useState({
        latitude: 39.289444,
        longitude: -76.615278,
        zoom: 8
      });
    
      return (
        <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
          width="100%"
          height="400px"
          onViewportChange={(viewport) => setViewport(viewport)}
        />
      );
}

export default MapboxMap;