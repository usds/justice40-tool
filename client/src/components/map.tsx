import React, {useState, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import * as styles from './map.module.scss';
import olms from 'ol-mapbox-style';

interface IMapWrapperProps {
  features: Feature<Geometry>[],
};

const mapConfig = {
  'version': 8,
  'cursor': 'pointer',
  'sources': {
    'carto-light': {
      'type': 'raster',
      'tiles': [
        'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
        'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
      ],
    },
    'custom': {
      'type': 'vector',
      'tiles': [
        'http://localhost:8080/data/tl_2010_bg_with_data/{z}/{x}/{y}.pbf',
      ],
    },
  },
  'layers': [
    {
      'id': 'carto-light-layer',
      'source': 'carto-light',
      'type': 'raster',
      'minzoom': 0,
      'maxzoom': 22,
    },
    {
      'id': 'blocks',
      'type': 'fill',
      'source': 'custom',
      'source-layer': 'blocks',
      'minzoom': 0,
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
      },
      // 01=AL, 30=MT, 34=NJ, 36=NY
      'filter': ['in', 'STATEFP10', '01', '30', '34', '36'],
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['to-number', [
            'get',
            'Score C (percentile)',
          ]],
          0.0,
          'white',
          1,
          'blue',
        ],
        'fill-opacity': 0.75,
      },
    },
  ],
};


// The below adapted from
// https://taylor.callsen.me/using-openlayers-with-react-functional-components/
const MapWrapper = ({features}: IMapWrapperProps) => {
  const [map, setMap] = useState<Map>();
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>();

  const mapElement = useRef() as
        React.MutableRefObject<HTMLInputElement>;

  useEffect( () => {
    // create and add initial vector source layer, to be replaced layer
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const initialMap = new Map({
      target: mapElement.current,
      view: new View({
        center: fromLonLat([-86.502136, 32.4687126]),
        zoom: 4,
      }),
      controls: [],
    });

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);
    olms(initialMap, mapConfig);
  }, []);


  // update map if features prop changes
  useEffect( () => {
    if (features.length) { // may be empty on first render
      // set features to map
      featuresLayer?.setSource(
          new VectorSource({
            features: features,
          }),
      );
      const extent = featuresLayer?.getSource().getExtent();
      if (extent != null) {
        // fit map to feature extent (with 100px of padding)
        map?.getView().fit(extent, {
          padding: [100, 100, 100, 100],
        });
      }
    }
  }, [features]);

  return (
    <div ref={mapElement} className={styles.mapContainer}></div>
  );
};

export default MapWrapper;
