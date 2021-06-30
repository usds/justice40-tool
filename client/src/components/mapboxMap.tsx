/* eslint-disable no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import {LngLatBoundsLike,
  Map,
  NavigationControl,
  PopupOptions,
  Popup} from 'mapbox-gl';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';
import PopupContent from './popupContent';
import * as styles from './mapboxMap.module.scss';
import * as constants from '../data/constants';
import ReactDOM from 'react-dom';

type ClickEvent = mapboxgl.MapMouseEvent & mapboxgl.EventData;

const MapboxMap = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = useRef<Map>() as React.MutableRefObject<Map>;
  const [lat, setLat] = useState(constants.DEFAULT_CENTER[0]);
  const [lng, setLng] = useState(constants.DEFAULT_CENTER[1]);
  const [zoom, setZoom] = useState(constants.GLOBAL_MIN_ZOOM);

  useEffect(() => {
    // Only initialize once
    if (map.current && mapContainer.current) return;

    const initialMap = new Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom,
      minZoom: constants.GLOBAL_MIN_ZOOM,
      maxZoom: constants.GLOBAL_MAX_ZOOM,
      maxBounds: constants.GLOBAL_MAX_BOUNDS as LngLatBoundsLike,
    });
    initialMap.on('click', handleClick);
    initialMap.addControl(new NavigationControl());
    map.current = initialMap;
  });

  const handleClick = (e: ClickEvent) => {
    const map = e.target;
    const clickedCoord = e.point;
    const features = map.queryRenderedFeatures(clickedCoord, {
      layers: ['score-low'],
    });

    if (features.length && features[0].properties) {
      const placeholder = document.createElement('div');
      ReactDOM.render(<PopupContent properties={features[0].properties} />, placeholder);
      const options : PopupOptions = {
        offset: [0, 0],
        className: styles.mapboxglPopup,
      };
      new Popup(options)
          .setLngLat(e.lngLat)
          .setDOMContent(placeholder)
          .setMaxWidth('300px')
          .addTo(map);
    }
  };

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng);
      setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom());
    });
  });

  return (
    <div>
      <div className={styles.sidebar}>
            Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <div ref={mapContainer} className={styles.mapContainer}/>
      <ZoomWarning zoomLevel={zoom} />
    </div>
  );
};

export default MapboxMap;
