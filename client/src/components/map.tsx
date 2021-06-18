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
      'projection': 'EPSG:3857',
      'type': 'vector',
      'tiles': [
        'https://gis.data.census.gov/arcgis/rest/services/Hosted/VT_2019_150_00_PY_D1/VectorTileServer/tile/{z}/{y}/{x}.mvt',
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
      'type': 'line',
      'source': 'custom',
      'source-layer': 'BlockGroup',
      'minzoom': 0,
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
      },

      'paint': {
        'line-opacity': 0.6,
        'line-color': 'red',
        'line-width': 1,
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
