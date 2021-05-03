import ReactDOM from 'react-dom';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactMapGL, {Layer, Source} from 'react-map-gl';


const xyzSource = {
  name: "public.maryland",
  scheme: 'xyz',
  tilejson: "2.0.0",
  minzoom: 0,
  maxzoom: 22,
  prefetchable: true,
  tiles: ["http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt"],
  type: 'vector',
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
  'cursor': 'pointer',
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

const censusSource = {
  'type': 'raster',
  'tiles': [
      'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=EPSG%3A3857&layers=1&layerDefs=&size=256%2c256&imageSR=&format=png&transparent=true&dpi=&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&f=image'
  ],
  'tileSize': 256
};

const censusLayer = {
  'id': 'wms-test-layer',
  'type': 'raster',
  'source': 'wms-test-source',
  'paint': {}
}

const MapboxMap = () => {
    const [viewport, setViewport] = useState({
        latitude: 39.289444,
        longitude: -76.615278,
        zoom: 6
      });
      const [hoverInfo, setHoverInfo] = useState(null);

    const onLoad = useCallback(event => {
        const map = event.target;

        let largeMVTSource = {
        'tiles': [
          'https://sit-tileservice.geoplatform.info/vector/ngda_nhpn/{z}/{x}/{y}.mvt'
        ],
        'type': 'vector',
        'minzoom': 0,
        'maxzoom': 22
    };

	let largeMVTLayer = {
    'id': 'National Highway',
    'type': 'line',
    'source': 'ngda_nhpn',
    'source-layer': 'national_highway',
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-opacity': 0.8,
      'line-color': 'red',
    }
	};
  map.addSource('ngda_nhpn', largeMVTSource);
  map.addLayer(largeMVTLayer);
        performance.mark("STYLE_LOADED")
        // console.log("STYLE LOADED");

        map.once('idle',function(){
            performance.mark("MAP_IDLE");
            // console.log("MAPBOX IS IDLE");
        });
      }, []);



      return (
        <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoibmF0aGlsbGFyZHVzZHMiLCJhIjoiY2ttd2cycHQyMDFnMDJycWtiaXd4bDZtMiJ9.zyr-vdNDGjVMikkPDL6bYA"
          width="100%"
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle={mapStyle}
        //   onHover={onHover}
          onLoad={onLoad}
        >
          <Source type="vector" {...censusSource}>
           <Layer {...censusLayer} />
          </Source>
          {hoverInfo && (
            <div style={{left: hoverInfo.x, top: hoverInfo.y}}>
              <div>ID: {hoverInfo.feature.properties.id}</div>
              <div>Percent Low Income: {parseFloat(hoverInfo.feature.properties.lowincpct * 100).toFixed(2)+"%"}</div>
            </div>
          )}
        </ReactMapGL>
      );
}

ReactDOM.render(
    <MapboxMap />,
    document.getElementById('map')
);