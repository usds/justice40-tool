/* eslint-disable no-unused-vars */
import React, {useState, useRef, Ref, useEffect} from 'react';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';
import PopupContent from './popupContent';
import {Map, MapboxGeoJSONFeature} from 'maplibre-gl';
import ReactMapGL, {
  MapEvent,
  ViewportProps,
  WebMercatorViewport,
  Popup,
  NavigationControl,
  MapRef,
  MapContext, LinearInterpolator} from 'react-map-gl';
import * as constants from '../data/constants';
import * as styles from './J40Map.module.scss';
import 'maplibre-gl/dist/maplibre-gl.css';
import bbox from '@turf/bbox';


declare global {
  interface Window {
    Cypress?: object;
    underlyingMap: Map;
  }
}

interface IPopupInterface {
  latitude: number
  longitude: number
  zoom: number
  properties: constants.J40Properties,
};

const J40Map = () => {
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: constants.DEFAULT_CENTER[0],
    longitude: constants.DEFAULT_CENTER[1],
    zoom: constants.GLOBAL_MIN_ZOOM,
  });
  const [popupInfo, setPopupInfo] = useState<IPopupInterface>();
  const [selectedFeature, setSelectedFeature] = useState<MapboxGeoJSONFeature>();
  const context = React.useContext(MapContext);
  const mapRef = useRef<MapRef>();

  const onClick = (event: MapEvent) => {
    const feature = event.features && event.features[0];
    if (feature) {
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      const newViewPort = new WebMercatorViewport(viewport);
      const {longitude, latitude, zoom} = newViewPort.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: 40,
          },
      );
      const map = mapRef.current.getMap();

      // If we've selected a new feature, set 'selected' to false
      if (selectedFeature && feature.id !== selectedFeature.id) {
        map.setFeatureState({
          source: selectedFeature.source,
          sourceLayer: selectedFeature.sourceLayer,
          id: selectedFeature.id,
        }, {selected: false});
      }
      map.setFeatureState({
        source: feature.source,
        sourceLayer: feature.sourceLayer,
        id: feature.id,
      }, {selected: true});
      setSelectedFeature(feature);

      // Needs refining
      // setViewport({
      //   ...viewport,
      //   longitude,
      //   latitude,
      //   zoom,
      //   transitionInterpolator: new LinearInterpolator({
      //     around: [event.offsetCenter.x, event.offsetCenter.y],
      //   }),
      //   transitionDuration: 1000,
      // });

      const popupInfo = {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
        properties: feature.properties,
      };
      setPopupInfo(popupInfo);
    }
  };

  const onLoad = () => {
    if (window.Cypress) {
      window.underlyingMap = mapRef.current.getMap();
    }
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        className={styles.mapContainer}
        mapStyle={mapStyle}
        minZoom={constants.GLOBAL_MIN_ZOOM}
        maxZoom={constants.GLOBAL_MAX_ZOOM}
        mapOptions={{hash: true}}
        width="90vw"
        height="52vw"
        dragRotate={false}
        touchRotate={false}
        interactiveLayerIds={[constants.SCORE_LAYER]}
        onViewportChange={setViewport}
        onClick={onClick}
        onLoad={onLoad}
        ref={mapRef}
      >
        {popupInfo && (
          <Popup
            className={styles.j40Popup}
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={true}
            onClose={setPopupInfo}
          >
            <PopupContent properties={popupInfo.properties} />
          </Popup>
        )}

        <NavigationControl
          showCompass={false}
          className={styles.navigationControls}
        />
      </ReactMapGL>
      <ZoomWarning zoomLevel={viewport.zoom!} />
    </>
  );
};

export default J40Map;
