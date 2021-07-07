/* eslint-disable no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import maplibregl, {LngLatBoundsLike,
  Map,
  NavigationControl,
  PopupOptions,
  Popup,
  LngLatLike} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';
import PopupContent from './popupContent';
import * as constants from '../data/constants';
import ReactDOM from 'react-dom';
import * as styles from './J40Map.module.scss';
import 'maplibre-gl/dist/maplibre-gl.css';


declare global {
  interface Window {
    Cypress?: object;
    underlyingMap: Map;
  }
}
type ClickEvent = maplibregl.MapMouseEvent & maplibregl.EventData;

const J40Map = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = useRef<Map>() as React.MutableRefObject<Map>;
  const [zoom, setZoom] = useState(constants.GLOBAL_MIN_ZOOM);

  useEffect(() => {
    // Only initialize once
    if (map.current && mapContainer.current) return;

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
    map.current = initialMap;
  });

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
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setZoom(map.current.getZoom());
    });
    map.current.on('mouseenter', 'score', () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });
    map.current.on('mouseleave', 'score', () => {
      map.current.getCanvas().style.cursor = '';
    });
  });

  return (
    <div>
      <div ref={mapContainer} className={styles.mapContainer}/>
      <ZoomWarning zoomLevel={zoom} />
    </div>
  );
};

export default J40Map;
