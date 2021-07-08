/* eslint-disable no-unused-vars */
import React, {useState, useRef} from 'react';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';
import {Map, MapboxGeoJSONFeature} from 'maplibre-gl';
import ReactMapGL, {
  MapEvent,
  ViewportProps,
  WebMercatorViewport,
  NavigationControl,
  MapRef,
  MapContext, FlyToInterpolator} from 'react-map-gl';
import * as constants from '../data/constants';
import * as styles from './J40Map.module.scss';
import 'maplibre-gl/dist/maplibre-gl.css';
import bbox from '@turf/bbox';
import * as d3 from 'd3-ease';

declare global {
  interface Window {
    Cypress?: object;
    underlyingMap: Map;
  }
}

interface IJ40Map {
  setDetailViewData: Function
};


const J40Map = ({setDetailViewData}: IJ40Map) => {
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: constants.DEFAULT_CENTER[0],
    longitude: constants.DEFAULT_CENTER[1],
    zoom: constants.GLOBAL_MIN_ZOOM,
  });

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
      setDetailViewData(popupInfo);
    }
  };

  const onLoad = () => {
    if (window.Cypress) {
      window.underlyingMap = mapRef.current.getMap();
    }
  };

  const goToPlace = (bounds: [[number, number], [number, number]]) => {
    const {longitude, latitude, zoom} = new WebMercatorViewport(viewport)
        .fitBounds(bounds, {
          padding: 20,
          offset: [0, -100],
        });
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    });
  };
  const onClickZoomButton = (event: MapEvent) => {
    const buttonID = event.target.id;
    switch (buttonID) {
      case '48':
        goToPlace(constants.LOWER_48_BOUNDS);
        break;
      case 'AK':
        goToPlace(constants.ALASKA_BOUNDS);
        break;
      case 'HI':
        goToPlace(constants.HAWAII_BOUNDS);
        break;
      case 'PR':
        goToPlace(constants.PUERTO_RICO_BOUNDS);
        break;

      default:
        break;
    }
  };


  return (
    <>
      <ReactMapGL
        {...viewport}
        className={styles.mapContainer}
        mapStyle={mapStyle}
        // minZoom={constants.GLOBAL_MIN_ZOOM}
        // maxZoom={constants.GLOBAL_MAX_ZOOM}
        mapOptions={{hash: true}}
        width="68.4vw"
        height="52vw"
        dragRotate={false}
        touchRotate={false}
        interactiveLayerIds={[constants.SCORE_LAYER]}
        onViewportChange={setViewport}
        onClick={onClick}
        onLoad={onLoad}
        ref={mapRef}
      >
        {/* {popupInfo && (
          <Popup
            className={styles.j40Popup}
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={true}
            onClose={setPopupInfo}
          >
            <AreaDetail properties={popupInfo.properties} />
          </Popup>
        )} */}

        <NavigationControl
          showCompass={false}
          className={styles.navigationControls}
        />
      </ReactMapGL>
      <ZoomWarning zoomLevel={viewport.zoom!} />
      <div className={styles.zoomContainer}>
        <button id={'48'} onClick={onClickZoomButton} className={styles.zoomButton}>48</button>
        <button id={'AK'} onClick={onClickZoomButton} className={styles.zoomButton}>AK</button>
        <button id={'HI'} onClick={onClickZoomButton} className={styles.zoomButton}>HI</button>
        <button id={'PR'} onClick={onClickZoomButton} className={styles.zoomButton}>PR</button>
      </div>
    </>
  );
};

export default J40Map;
