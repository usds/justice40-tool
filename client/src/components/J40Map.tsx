/* eslint-disable no-unused-vars */
// External Libs:
import React, {MouseEvent, useRef, useState} from 'react';
import {Map, MapboxGeoJSONFeature, LngLatBoundsLike} from 'maplibre-gl';
import ReactMapGL, {
  MapEvent,
  ViewportProps,
  WebMercatorViewport,
  NavigationControl,
  GeolocateControl,
  Popup,
  FlyToInterpolator,
  FullscreenControl,
  MapRef} from 'react-map-gl';
import bbox from '@turf/bbox';
import * as d3 from 'd3-ease';
import {isMobile} from 'react-device-detect';

// Contexts:
import {useFlags} from '../contexts/FlagContext';

// Components:
import TerritoryFocusControl from './territoryFocusControl';
import MapInfoPanel from './mapInfoPanel';
import AreaDetail from './areaDetail';

// Styles and constants
import {makeMapStyle} from '../data/mapStyle';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as constants from '../data/constants';
import * as styles from './J40Map.module.scss';


declare global {
  interface Window {
    Cypress?: object;
    underlyingMap: Map;
  }
}


export interface IDetailViewInterface {
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

  const [selectedFeature, setSelectedFeature] = useState<MapboxGeoJSONFeature>();
  const [detailViewData, setDetailViewData] = useState<IDetailViewInterface>();
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [geolocationInProgress, setGeolocationInProgress] = useState<boolean>(false);
  const [isMobileMapState, setIsMobileMapState] = useState<boolean>(false);

  const mapRef = useRef<MapRef>(null);
  const flags = useFlags();

  const onClick = (event: MapEvent) => {
    const feature = event.features && event.features[0];
    if (feature) {
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      const newViewPort = new WebMercatorViewport({height: viewport.height!, width: viewport.width!});
      const {longitude, latitude, zoom} = newViewPort.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: 40,
          },
      );

      // If we've selected a new feature, set 'selected' to false
      if (selectedFeature && feature.id !== selectedFeature.id) {
        setMapSelected(selectedFeature, false);
      }
      setMapSelected(feature, true);
      const popupInfo = {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
        properties: feature.properties,
      };
      goToPlace([
        [minLng, minLat],
        [maxLng, maxLat],
      ]);
      setDetailViewData(popupInfo);
    }
  };


  const onLoad = () => {
    if (typeof window !== 'undefined' && window.Cypress && mapRef.current) {
      window.underlyingMap = mapRef.current.getMap();
    }

    if (isMobile) setIsMobileMapState(true);
  };


  const goToPlace = (bounds: LngLatBoundsLike ) => {
    const {longitude, latitude, zoom} = new WebMercatorViewport({height: viewport.height!, width: viewport.width!})
        .fitBounds(bounds as [[number, number], [number, number]], {
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


  const setMapSelected = (feature:MapboxGeoJSONFeature, isSelected:boolean) : void => {
    // The below can be confirmed during debug with:
    // mapRef.current.getFeatureState({"id":feature.id, "source":feature.source, "sourceLayer":feature.sourceLayer})
    mapRef.current && mapRef.current.getMap().setFeatureState({
      source: feature.source,
      sourceLayer: feature.sourceLayer,
      id: feature.id,
    }, {[constants.SELECTED_PROPERTY]: isSelected});
    if (isSelected) {
      setSelectedFeature(feature);
    } else {
      setSelectedFeature(undefined);
    }
  };


  const onClickTerritoryFocusButton = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonID = event.target && (event.target as HTMLElement).id;

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

  const onTransitionStart = () => {
    setTransitionInProgress(true);
  };

  const onTransitionEnd = () => {
    setTransitionInProgress(false);
  };

  const onGeolocate = () => {
    setGeolocationInProgress(false);
  };

  const onClickGeolocate = () => {
    setGeolocationInProgress(true);
  };

  return (
    <div className={styles.mapAndInfoPanelContainer}>
      <ReactMapGL
        {...viewport}
        mapStyle={makeMapStyle(flags)}
        minZoom={constants.GLOBAL_MIN_ZOOM}
        maxZoom={constants.GLOBAL_MAX_ZOOM}
        mapOptions={{hash: true}}
        width="100%"
        height={isMobileMapState ? '44vh' : '100%'}
        dragRotate={false}
        touchRotate={false}
        interactiveLayerIds={[constants.HIGH_SCORE_LAYER_NAME]}
        onViewportChange={setViewport}
        onClick={onClick}
        onLoad={onLoad}
        onTransitionStart={onTransitionStart}
        onTransitionEnd={onTransitionEnd}
        ref={mapRef}
        data-cy={'reactMapGL'}
      >
        {('fs' in flags && detailViewData && !transitionInProgress) && (
          <Popup
            className={styles.j40Popup}
            tipSize={5}
            anchor="top"
            longitude={detailViewData.longitude!}
            latitude={detailViewData.latitude!}
            closeOnClick={true}
            onClose={setDetailViewData}
            captureScroll={true}
          >
            <AreaDetail properties={detailViewData.properties} />
          </Popup>
        )}
        <NavigationControl
          showCompass={false}
          className={styles.navigationControl}
        />
        {'gl' in flags ? <GeolocateControl
          className={styles.geolocateControl}
          positionOptions={{enableHighAccuracy: true}}
          onGeolocate={onGeolocate}
          // @ts-ignore // Types have not caught up yet, see https://github.com/visgl/react-map-gl/issues/1492
          onClick={onClickGeolocate}
        /> : ''}
        {geolocationInProgress ? <div>Geolocation in progress...</div> : ''}
        <TerritoryFocusControl onClickTerritoryFocusButton={onClickTerritoryFocusButton}/>
        {'fs' in flags ? <FullscreenControl className={styles.fullscreenControl}/> :'' }
      </ReactMapGL>
      <MapInfoPanel
        className={styles.mapInfoPanel}
        featureProperties={detailViewData?.properties}
        selectedFeatureId={selectedFeature?.id}
      />
    </div>
  );
};

export default J40Map;
