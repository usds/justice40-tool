import React, {useState, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import TileLayer from 'ol/layer/Tile';
import VectorTileSource from 'ol/source/VectorTile';
import VectorTileLayer from 'ol/layer/VectorTile';
import MVT from 'ol/format/MVT';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import * as styles from './map.module.scss';


interface IMapWrapperProps {
  features: Feature<Geometry>[],
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

    const censusBlockGroupTileLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url: 'https://gis.data.census.gov/arcgis/rest/services/Hosted/VT_2019_150_00_PY_D1/VectorTileServer/tile/{z}/{y}/{x}.mvt',
      }),
    });

    const initialMap = new Map({
      target: mapElement.current,
      layers: [

        new TileLayer({
          source: new XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
          }),
        }),
        censusBlockGroupTileLayer,
        initialFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([-95.7129, 37.0902]),
        zoom: 3,
      }),
      controls: [],
    });

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);
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
