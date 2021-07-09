/* eslint-disable no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import maplibregl, {LngLatBoundsLike,
  Map,
  NavigationControl,
  PopupOptions,
  Popup,
  LngLatLike} from 'maplibre-gl';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';
import PopupContent from './popupContent';
import * as constants from '../data/constants';
import ReactDOM from 'react-dom';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as styles from './J40Map.module.scss';

declare global {
  interface Window {
    Cypress?: object;
    underlyingMap: Map;
  }
}
type ClickEvent = maplibregl.MapMouseEvent & maplibregl.EventData;

const J40Map = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>() as React.MutableRefObject<Map>;
  const [zoom, setZoom] = useState(constants.GLOBAL_MIN_ZOOM);

  useEffect(() => {
    const initialMap = new Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: constants.DEFAULT_CENTER as LngLatLike,
      zoom: zoom,
      minZoom: constants.GLOBAL_MIN_ZOOM,
      maxBounds: constants.GLOBAL_MAX_BOUNDS as LngLatBoundsLike,
      hash: true, // Adds hash of zoom/lat/long to the url
    });
    // disable map rotation using right click + drag
    initialMap.dragRotate.disable();

    // disable map rotation using touch rotation gesture
    initialMap.touchZoomRotate.disableRotation();

    setZoom(initialMap.getZoom());

    initialMap.on('load', () => {
      if (window.Cypress) {
        window.underlyingMap = initialMap;
      }
    });

    initialMap.on('click', handleClick);
    initialMap.addControl(new NavigationControl({showCompass: false}), 'top-left');
    mapRef.current = initialMap;
  }, []);

  const handleClick = (e: ClickEvent) => {
    const map = e.target;
    const clickedCoord = e.point;
    const features = map.queryRenderedFeatures(clickedCoord, {
      layers: ['score'],
    });

    if (features.length && features[0].properties) {
      const placeholder = document.createElement('div');
      ReactDOM.render(<PopupContent properties={features[0].properties} />, placeholder);
      const options : PopupOptions = {
        offset: [0, 0],
        className: styles.j40Popup,
        focusAfterOpen: false,
      };
      new Popup(options)
          .setLngLat(e.lngLat)
          .setDOMContent(placeholder)
          .addTo(map);
    }
  };

  useEffect(() => {
    mapRef.current.on('move', () => {
      setZoom(mapRef.current.getZoom());
    });
    mapRef.current.on('mouseenter', 'score', () => {
      mapRef.current.getCanvas().style.cursor = 'pointer';
    });
    mapRef.current.on('mouseleave', 'score', () => {
      mapRef.current.getCanvas().style.cursor = '';
    });
  }, [mapRef]);

  const goToPlace = (bounds:number[][]) => {
    mapRef.current.fitBounds(bounds as LngLatBoundsLike);
  };

  const onClickTerritoryFocusButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    // currentTarget always refers to the element to which the event handler
    // has been attached, as opposed to Event.target, which identifies
    // the element on which the event occurred and which may be its descendant.
    const buttonID = event.target && event.currentTarget.id;

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
    <div>
      <div className={styles.territoryFocusContainer}>
        <button
          id={'48'}
          onClick={onClickTerritoryFocusButton}
          className={styles.territoryFocusButton}
          aria-label="Zoom to Lower 48" >
            48
        </button>
        <button
          id={'AK'}
          onClick={onClickTerritoryFocusButton}
          className={styles.territoryFocusButton}
          aria-label="Zoom to Alaska" >
            AK
        </button>
        <button
          id={'HI'}
          onClick={onClickTerritoryFocusButton}
          className={styles.territoryFocusButton}
          aria-label="Zoom to Hawaii" >
            HI
        </button>
        <button
          id={'PR'}
          onClick={onClickTerritoryFocusButton}
          className={styles.territoryFocusButton}
          aria-label="Zoom to Puerto Rico" >
            PR
        </button>
      </div>
      <div ref={mapContainer} className={styles.mapContainer}/>
      <ZoomWarning zoomLevel={zoom} />
    </div>
  );
};

export default J40Map;
