import React, { useRef, useEffect, useCallback, useState } from 'react';
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
      const [hoverInfo, setHoverInfo] = useState(null);

      const onHover = useCallback(event => {
        const {
          features,
          srcEvent: {offsetX, offsetY}
        } = event;
        const hoveredFeature = features && features[0];
      
        setHoverInfo(
          hoveredFeature
            ? {
                feature: hoveredFeature,
                x: offsetX,
                y: offsetY
              }
            : null
        );
      }, []);

      return (
        <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.GATSBY_MAPBOX_ACCESS_TOKEN}
          width="100%"
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle={mapStyle}
          onHover={onHover}
        >
          <Source type="vector" {...xyzSource}>
           <Layer {...layerStyle} />
          </Source>
          {hoverInfo && (
            <div className={mapboxStyles.tooltip} style={{left: hoverInfo.x, top: hoverInfo.y}}>
              <div>ID: {hoverInfo.feature.properties.id}</div>
              <div>Percent Low Income: {parseFloat(hoverInfo.feature.properties.lowincpct * 100).toFixed(2)+"%"}</div>
            </div>
          )}
        </ReactMapGL>
      );
}

const MapboxPage = () => {
    return (
        <Layout>
          <div className={mapboxStyles.mapContainer}>
            <MapboxMap  />
          </div>
        </Layout>
    );
};

export default MapboxPage
