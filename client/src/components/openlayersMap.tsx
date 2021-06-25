import React, {useState, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature, {FeatureLike} from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import olms from 'ol-mapbox-style';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';
import MapPopup from './mapPopup';
import * as styles from './openlayersMap.module.scss';

const DEFAULT_ZOOM = 4;
const DEFAULT_US_CENTER = [-86.502136, 32.4687126];

interface IMapWrapperProps {
  features: Feature<Geometry>[],
}

// The below adapted from
// https://taylor.callsen.me/using-openlayers-with-react-functional-components/
const MapWrapper = ({features}: IMapWrapperProps) => {
  const [map, setMap] = useState<Map>();
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>();
  const [selectedFeature, setSelectedFeature] = useState<FeatureLike>();
  const [currentZoom, setCurrentZoom] = useState<number>(4);
  const [currentOverlayPosition, setCurrentOverlayPosition] = useState<Coordinate>([]);

  const mapElement = useRef() as
    React.MutableRefObject<HTMLInputElement>;

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef() as React.MutableRefObject<Map>;
  if (map) {
    mapRef.current = map;
  }

  useEffect( () => {
    const view = new View({
      center: fromLonLat(DEFAULT_US_CENTER),
      zoom: 4,
    });

    // create and add initial vector source layer, to be replaced layer
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const initialMap = new Map({
      target: mapElement.current,
      view: view,
      controls: [],
    });
    const currentZoom = Math.floor(initialMap.getView().getZoom() || DEFAULT_ZOOM);

    initialMap.on('moveend', handleMoveEnd);
    initialMap.on('click', handleMapClick);
    setMap(initialMap);
    setCurrentZoom(currentZoom);
    setFeaturesLayer(initialFeaturesLayer);
    olms(initialMap, mapStyle);
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
      if (extent) {
        // fit map to feature extent (with 100px of padding)
        map?.getView().fit(extent, {
          padding: [100, 100, 100, 100],
        });
      }
    }
  }, [features]);

  const handleMapClick = (event: { pixel: any }) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    mapRef.current.forEachFeatureAtPixel(event.pixel, (feature) => {
      setSelectedFeature(feature);
      return true;
    });

    setCurrentOverlayPosition(clickedCoord);
  };

  const handleMoveEnd = () => {
    const newZoom = Math.floor(mapRef.current.getView().getZoom() || DEFAULT_ZOOM);
    if (currentZoom != newZoom) {
      setCurrentZoom(newZoom);
    }
  };

  return (
    <>
      <div ref={mapElement} className={styles.mapContainer}/>
      {map?
        <MapPopup selectedFeature={selectedFeature!} map={map!} position={currentOverlayPosition} /> :
        ''
      }
      <ZoomWarning zoomLevel={currentZoom} />
    </>
  );
};

export default MapWrapper;
