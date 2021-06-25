/* eslint-disable no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import {Map, NavigationControl, Popup, MapLayerMouseEvent, Coordinate} from 'mapbox-gl';
import * as styles from './mapboxMap.module.scss';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';

const MapboxMap = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = useRef<Map>() as React.MutableRefObject<Map>; ;
  const [lng, setLng] = useState(-86.502136);
  const [lat, setLat] = useState(32.4687126);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    // Only initialize once
    if (map.current && mapContainer.current) return;

    const initialMap = new Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom,
    });

    initialMap.addControl(new NavigationControl());
    map.current = initialMap;
  });

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
