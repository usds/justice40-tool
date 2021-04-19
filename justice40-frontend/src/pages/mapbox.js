import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout';
import ReactMapGL, {Layer, Source} from 'react-map-gl';
import * as mapboxStyles from "./mapbox.module.css";


const xyzSource = {
  name: "public.maryland",
  scheme: 'xyz',
  tilejson: "2.0.0",
  minzoom: 0,
  maxzoom: 22,
  prefetchable: true,
  tiles: ["http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt"],
  type: 'vector'
};

const layerStyle = {
  id: 'public.maryland.MultiPolygon.fill',
  type: 'fill',
  source: "public.maryland",
  "source-layer": "public.maryland",
  paint: {
    "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "lowincpct"],
        0,
        "white",
        1,
        "rgb(0,94,162)"
    ],
    "fill-opacity": 0.5
  }
};

const mapStyle = {
  'version': 8,
  'sources': {
    'carto-light': {
      'type': 'raster',
      'tiles': [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
      ]
    }
  },
  'layers': [{
    'id': 'carto-light-layer',
    'source': 'carto-light',
    'type': 'raster',
    'minzoom': 0,
    'maxzoom': 22
  }]
};

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
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle={mapStyle}
        >
          <Source type="vector" {...xyzSource}>
           <Layer {...layerStyle} />
          </Source>
        </ReactMapGL>
      );
}

const MapboxPage = () => {
    return (
        <Layout>
          <div class={mapboxStyles.mapContainer}>
            <MapboxMap  />
          </div>
        </Layout>
    );
};

export default MapboxPage
