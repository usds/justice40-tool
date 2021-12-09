/* eslint-disable no-unused-vars */
// External Libs:
import React, {useRef, useState, useMemo} from 'react';
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
  MapRef, Source, Layer} from 'react-map-gl';
import bbox from '@turf/bbox';
import * as d3 from 'd3-ease';
import {isMobile} from 'react-device-detect';
import {Grid} from '@trussworks/react-uswds';
import {useWindowSize} from 'react-use';

// Contexts:
import {useFlags} from '../contexts/FlagContext';

// Components:
import AreaDetail from './AreaDetail';
import MapInfoPanel from './mapInfoPanel';
import MapSearch from './MapSearch';
import TerritoryFocusControl from './territoryFocusControl';

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

interface IJ40Interface {
  location: Location;
};


export interface IDetailViewInterface {
  latitude: number
  longitude: number
  zoom: number
  properties: constants.J40Properties,
};


const J40Map = ({location}: IJ40Interface) => {
  // Hash portion of URL is of the form #zoom/lat/lng
  const [zoom, lat, lng] = location.hash.slice(1).split('/');
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: lat && parseFloat(lat) || constants.DEFAULT_CENTER[0],
    longitude: lng && parseFloat(lng) || constants.DEFAULT_CENTER[1],
    zoom: zoom && parseFloat(zoom) || constants.GLOBAL_MIN_ZOOM,
  });

  const [selectedFeature, setSelectedFeature] = useState<MapboxGeoJSONFeature>();
  const [detailViewData, setDetailViewData] = useState<IDetailViewInterface>();
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [geolocationInProgress, setGeolocationInProgress] = useState<boolean>(false);
  const [isMobileMapState, setIsMobileMapState] = useState<boolean>(false);
  const {width: windowWidth} = useWindowSize();

  const mapRef = useRef<MapRef>(null);
  const flags = useFlags();

  const selectedFeatureId = (selectedFeature && selectedFeature.id) || '';
  const filter = useMemo(() => ['in', constants.GEOID_PROPERTY, selectedFeatureId], [selectedFeature]);

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
      if (feature.id !== selectedFeatureId) {
        setSelectedFeature(feature);
        console.log(feature.properties);
      } else {
        setSelectedFeature(undefined);
      }
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
    <>
      <Grid col={12} desktop={{col: 9}}>

        {/*
          The MapSearch component is wrapped in a div in order for MapSearch to render correctly in a production build.

          When the MapSearch component is placed behind a feature flag without a div wrapping
          MapSearch, the production build will inject CSS due to the null in the false conditional
          case. Any changes to this (ie, changes to MapSearch or removing feature flag, etc), should
          be tested with a production build via:

          npm run clean && npm run build && npm run serve

          to ensure the production build works and that MapSearch and the map (ReactMapGL) render correctly.
        */}
        <div>
          {'sr' in flags ? <MapSearch goToPlace={goToPlace}/> : null}
        </div>

        <ReactMapGL
          {...viewport}
          mapStyle={makeMapStyle(flags)}
          minZoom={constants.GLOBAL_MIN_ZOOM}
          maxZoom={constants.GLOBAL_MAX_ZOOM}
          mapOptions={{hash: true}}
          width="100%"
          height={windowWidth < 1024 ? '44vh' : '100%'}
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
          <Source
            id={constants.HIGH_SCORE_SOURCE_NAME}
            type="vector"
            promoteId={constants.GEOID_PROPERTY}
            tiles={[constants.FEATURE_TILE_HIGH_ZOOM_URL]}
            maxzoom={constants.GLOBAL_MIN_ZOOM_HIGH}
            minzoom={constants.GLOBAL_MAX_ZOOM_HIGH}
          >
            <Layer
              id={constants.CURRENTLY_SELECTED_FEATURE_HIGHLIGHT_LAYER_NAME}
              source-layer={constants.SCORE_SOURCE_LAYER}
              type='line'
              paint={{
                'line-color': constants.DEFAULT_OUTLINE_COLOR,
                'line-width': constants.CURRENTLY_SELECTED_FEATURE_LAYER_WIDTH,
                'line-opacity': constants.CURRENTLY_SELECTED_FEATURE_LAYER_OPACITY,
              }}
              minzoom={constants.GLOBAL_MIN_ZOOM_HIGHLIGHT}
              maxzoom={constants.GLOBAL_MAX_ZOOM_HIGHLIGHT}
            />

            <Layer
              id={constants.BLOCK_GROUP_BOUNDARY_LAYER_NAME}
              type='line'
              source-layer={constants.SCORE_SOURCE_LAYER}
              paint={{
                'line-color': constants.BORDER_HIGHLIGHT_COLOR,
                'line-width': constants.HIGHLIGHT_BORDER_WIDTH,
              }}
              filter={filter}
              minzoom={constants.GLOBAL_MIN_ZOOM_HIGH}
            />
          </Source>
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
          <TerritoryFocusControl goToPlace={goToPlace}/>
          {'fs' in flags ? <FullscreenControl className={styles.fullscreenControl}/> :'' }

        </ReactMapGL>
      </Grid>

      <Grid col={12} desktop={{col: 3}} className={styles.mapInfoPanel}>
        <MapInfoPanel
          className={styles.mapInfoPanel}
          featureProperties={detailViewData?.properties}
          selectedFeatureId={selectedFeature?.id}
        />
      </Grid>
    </>
  );
};

export default J40Map;
