// react
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {Fill, Style} from 'ol/style.js';
import {fromLonLat} from 'ol/proj';
import colormap from 'colormap';

import * as styles from "./ol-map-wrapper.module.css";

const min = 0; 
const max = 1; 
const steps = 10;
const ramp = colormap({
    colormap: 'freesurface-blue',
    nshades: steps
  });

 function clamp(value, low, high) {
   return Math.max(low, Math.min(value, high));
 }

function getColor(data) {
   const f = Math.pow(clamp((data - min) / (max - min), 0, 1), 1 / 2);
   const index = Math.round(f * (steps - 1));
   return ramp[index];
}

function OlMapWrapper() {
  // set intial state
  const [ map, setMap ] = useState()

  // pull refs
  const mapElement = useRef()
  const mapRef = useRef()
  mapRef.current = map

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect( () => {
    const xyzSource = new VectorTileSource({
      format: new MVT(),
      url: 'http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt'
    });
    
    var vtLayer = new VectorTileLayer({
      declutter: false,
      source: xyzSource,
      style: function(feature) {
          const data = feature.get('lowincpct');
          return new Style({
              fill: new Fill({
                color: getColor(data)
              }),
            });
       }
    });
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          })
        }),
        vtLayer
      ],
      view: new View({
        center: fromLonLat([-76.6413, 39.0458]),
        zoom: 7,
      }),
      controls: []
    })

    setMap(initialMap)
    
    initialMap.once('rendercomplete', ()=>{
      performance.mark("MAP_IDLE");
     console.log("OL IS IDLE");
    });
    
    vtLayer.once('tileloadend', function () {
      performance.mark("STYLE_LOADED");
      console.log("STYLE LOADED");
    });

  },[])
  // render component
  return (      
    <div ref={mapElement} className={styles.map}></div>
  ) 
}


export default OlMapWrapper