/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
// External Libs:
import React, {useRef, useState} from 'react';
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
import {Grid} from '@trussworks/react-uswds';
import {useWindowSize} from 'react-use';

// Contexts:
import {useFlags} from '../contexts/FlagContext';

// Components:
import AreaDetail from './AreaDetail';
import MapInfoPanel from './mapInfoPanel';
import MapSearch from './MapSearch';
import MapTractLayers from './MapTractLayers/MapTractLayers';
import LayerSelector from './LayerSelector';
import TerritoryFocusControl from './territoryFocusControl';
import {getOSBaseMap} from '../data/getOSBaseMap';

// Styles and constants
import 'maplibre-gl/dist/maplibre-gl.css';
import * as constants from '../data/constants';
import * as styles from './J40Map.module.scss';
import MapTribalLayer from './MapTribalLayer/MapTribalLayer';
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
  /**
   * Initializes the zoom, and the map's center point (lat, lng) via the URL hash #{z}/{lat}/{long}
   * where
   *  @TODO: These values do not update when zooming in/out. Could explain a number of cypress bugs
   *  reference to ticket #1550
   *
   *    z = zoom
   *    lat = map center's latitude
   *    long = map center's longitude
   */
  const [zoom, lat, lng] = location.hash.slice(1).split('/');

  /**
   * If the URL has no #{z}/{lat}/{long} specified in the hash, then set the map's intial viewport state
   * to use constants. This is so that we can load URLs with certain zoom/lat/long specified:
   */
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: lat && parseFloat(lat) ? parseFloat(lat) : constants.DEFAULT_CENTER[0],
    longitude: lng && parseFloat(lng) ? parseFloat(lng) : constants.DEFAULT_CENTER[1],
    zoom: zoom && parseFloat(zoom) ? parseFloat(zoom) : constants.GLOBAL_MIN_ZOOM,
  });

  const [selectedFeature, setSelectedFeature] = useState<MapboxGeoJSONFeature>();
  const [detailViewData, setDetailViewData] = useState<IDetailViewInterface>();
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [geolocationInProgress, setGeolocationInProgress] = useState<boolean>(false);
  const [isMobileMapState, setIsMobileMapState] = useState<boolean>(false);
  const [censusSelected, setCensusSelected] = useState(true);
  const {width: windowWidth} = useWindowSize();

  const mapRef = useRef<MapRef>(null);
  const flags = useFlags();

  const selectedFeatureId = (selectedFeature && selectedFeature.id) || '';

  const zoomLatLngHash = mapRef.current?.getMap()._hash._getCurrentHash();


  /**
   * This function will return the bounding box of the current map. Comment in when needed.
   *  {
   *    _ne: {lng:number, lat:number}
   *    _sw: {lng:number, lat:number}
   *  }
   * @returns {LngLatBounds}
   */
  // const getCurrentMapBoundingBox = () => {
  //   return mapRef.current ? console.log('mapRef getBounds(): ', mapRef.current.getMap().getBounds()) : null;
  // };


  /**
 * This onClick event handler will listen and handle clicks on the map. It will listen for clicks on the
 * territory controls and it will listen to clicks on the map.
 *
 * It will NOT listen to clicks into the search field or the zoom controls. These clickHandlers are
 * captured in their own respective components.
 */
  const onClick = (event: MapEvent | React.MouseEvent<HTMLButtonElement>) => {
    // Stop all propagation / bubbling / capturing
    event.preventDefault();
    event.stopPropagation();

    // Check if the click is for territories. Given the territories component's design, it can be
    // guaranteed that each territory control will have an id. We use this ID to determine
    // if the click is coming from a territory control
    if (event.target && (event.target as HTMLElement).id) {
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
        case 'GU':
          goToPlace(constants.GUAM_BOUNDS);
          break;
        case 'AS':
          goToPlace(constants.AMERICAN_SAMOA_BOUNDS);
          break;
        case 'MP':
          goToPlace(constants.MARIANA_ISLAND_BOUNDS);
          break;
        case 'VI':
          goToPlace(constants.US_VIRGIN_ISLANDS_BOUNDS);
          break;

        default:
          break;
      }
    } else {
      // This else clause will fire when the ID is null or empty. This is the case where the map is clicked
      // @ts-ignore
      const feature = event.features && event.features[0];
      console.log(feature);
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

  const mapBoxBaseLayer = 'tl' in flags ? `mapbox://styles/justice40/cl2qimpi2000014qeb1egpox8` : `mapbox://styles/mapbox/streets-v11`;

  return (
    <>
      <Grid desktop={{col: 9}} className={styles.j40Map}>

        {/**
         * This will render the MapSearch component
         *
         * Note:
         * The MapSearch component is no longer wrapped in a div in order to allow this feature
         * to be behind a feature flag. This was causing a bug for MapSearch to render
         * correctly in a production build. Leaving this comment here in case future flags are
         * needed in this component.
         *
         * When the MapSearch component is placed behind a feature flag without a div wrapping
         * MapSearch, the production build will inject CSS due to the null in the false conditional
         * case. Any changes to this (ie, changes to MapSearch or removing feature flag, etc), should
         * be tested with a production build via:
         *   - npm run clean && npm run build && npm run serve
         *
         * to ensure the production build works and that MapSearch and the map (ReactMapGL) render correctly.
         */}
        <MapSearch goToPlace={goToPlace}/>


        {/* This will allow to select between the census tract layer and the tribal lands layer */}
        <LayerSelector censusSelected={censusSelected} setCensusSelected={setCensusSelected}/>

        {/**
         * The ReactMapGL component's props are grouped by the API's documentation. The component also has
         * some children.
         */}
        <ReactMapGL
          // ****** Initialization props: ******
          // access token is j40StylesReadToken
          mapboxApiAccessToken={
            process.env.MAPBOX_STYLES_READ_TOKEN ?
            process.env.MAPBOX_STYLES_READ_TOKEN : ''}

          // ****** Map state props: ******
          // http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map#map-state
          {...viewport}
          mapStyle={process.env.MAPBOX_STYLES_READ_TOKEN ? mapBoxBaseLayer : getOSBaseMap(censusSelected)}
          width="100%"
          // Ajusting this height with a conditional statement will not render the map on staging.
          // The reason for this issue is unknown. Consider styling the parent container via SASS.
          height="100%"
          mapOptions={{hash: true}}


          // ****** Interaction option props: ******
          // http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map#interaction-options
          maxZoom={constants.GLOBAL_MAX_ZOOM}
          minZoom={constants.GLOBAL_MIN_ZOOM}
          dragRotate={false}
          touchRotate={false}
          // eslint-disable-next-line max-len
          interactiveLayerIds={censusSelected ? [constants.HIGH_ZOOM_LAYER_ID, constants.PRIORITIZED_HIGH_ZOOM_LAYER_ID] : [constants.TRIBAL_LAYER_ID]}


          // ****** Callback props: ******
          // http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map#callbacks
          onViewportChange={setViewport}
          onClick={onClick}
          onLoad={onLoad}
          onTransitionStart={onTransitionStart}
          onTransitionEnd={onTransitionEnd}

          ref={mapRef}
          data-cy={'reactMapGL'}
        >

          {/* Load either the Tribal layer or census layer */}
          {
           censusSelected ?
           <MapTractLayers selectedFeature={selectedFeature} selectedFeatureId={selectedFeatureId}/> :
            <MapTribalLayer />
          }

          {/* Enable fullscreen behind a feature flag */}
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
              <AreaDetail properties={detailViewData.properties} hash={zoomLatLngHash}/>
            </Popup>
          )}

          {/* This will add the navigation controls of the zoom in and zoom out buttons */}
          { windowWidth > constants.USWDS_BREAKPOINTS.MOBILE_LG && <NavigationControl
            showCompass={false}
            className={styles.navigationControl}
          /> }

          {/* This places Geolocation behind a feature flag */}
          {'gl' in flags ? <GeolocateControl
            className={styles.geolocateControl}
            positionOptions={{enableHighAccuracy: true}}
            onGeolocate={onGeolocate}
            // @ts-ignore
            onClick={onClickGeolocate}
          /> : ''}
          {geolocationInProgress ? <div>Geolocation in progress...</div> : ''}

          {/* This will show shortcut buttons to pan/zoom to US territories */}
          <TerritoryFocusControl onClick={onClick}/>

          {'fs' in flags ? <FullscreenControl className={styles.fullscreenControl}/> :'' }

        </ReactMapGL>
      </Grid>

      <Grid desktop={{col: 3}}>
        <MapInfoPanel
          className={styles.mapInfoPanel}
          featureProperties={detailViewData?.properties}
          selectedFeatureId={selectedFeature?.id}
          hash={zoomLatLngHash}
        />
      </Grid>
    </>
  );
};

export default J40Map;
