/* eslint-disable no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import {LngLatBoundsLike,
  Map,
  NavigationControl,
  PopupOptions,
  Popup,
  LngLatLike} from 'mapbox-gl';
import mapStyle from '../data/mapStyle';
import ZoomWarning from './zoomWarning';
import PopupContent from './popupContent';
import * as styles from './mapboxMap.module.scss';
import * as constants from '../data/constants';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

type ClickEvent = mapboxgl.MapMouseEvent & mapboxgl.EventData;

const MapboxMap = () => {
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
      layers: ['score'],
    });

    if (features.length && features[0].properties) {
      const placeholder = document.createElement('div');
      ReactDOM.render(<PopupContent properties={features[0].properties} />, placeholder);
      const options : PopupOptions = {
        offset: [0, 0],
        className: styles.j40Popup,
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
      <p>{zoom}</p>
      <div ref={mapContainer} className={styles.mapContainer}/>
      <ZoomWarning zoomLevel={zoom} />
    </div>
  );
};

export default MapboxMap;
