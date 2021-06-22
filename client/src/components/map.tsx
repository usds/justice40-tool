import React, {useState, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import * as styles from './map.module.scss';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import {Fill, Style} from 'ol/style.js';
import XYZ from 'ol/source/XYZ';
import * as d3 from 'd3';

import Overlay from 'ol/Overlay';


interface IMapWrapperProps {
  features: Feature<Geometry>[],
};

// The below adapted from
// https://taylor.callsen.me/using-openlayers-with-react-functional-components/
const MapWrapper = ({features}: IMapWrapperProps) => {
  const [map, setMap] = useState<Map>();
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>();
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>();
  const [selectedFeature, setSelectedFeature] = useState<Feature>();
  const [hoveredFeature, setHoveredFeature] = useState<Feature>();

  const mapElement = useRef() as
    React.MutableRefObject<HTMLInputElement>;
  const mapRef = useRef() as React.MutableRefObject<Map>;


  const popupContainer = React.useRef<HTMLDivElement>(null);
  const popupCloser = React.useRef<HTMLDivElement>(null);
  const popupContent = React.useRef<HTMLDivElement>(null);

  const overlayRef = useRef() as React.MutableRefObject<Map>;
  mapRef.current = map;
  overlayRef.current = currentOverlay;

  useEffect(() => {
    // create and add initial vector source layer, to be replaced layer
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const j40source = new VectorTileSource({
      'format': new MVT(),
      // Use the below for local development:
      // 'url': 'http://localhost:8080/data/block2010/{z}/{x}/{y}.pbf',
      'url': 'http://usds-geoplatform-justice40-website.s3-website-us-east-1.amazonaws.com/nm/{z}/{x}/{y}.pbf',
    });

    const colors = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, 1]); // d3.scaleOrdinal(d3.interpolateBlues);

    const colorWithAlpha = (data: number, alpha:number ) => {
      const rgb = colors(data);
      const rbgArr = rgb.slice(
          rgb.indexOf('(') + 1,
          rgb.indexOf(')'),
      ).split(', ');
      return `rgba(${rbgArr[0]}, ${rbgArr[1]}, ${rbgArr[2]}, ${alpha})`;
    };

    const j40Layer = new VectorTileLayer({
      declutter: false,
      source: j40source,
      style: function(feature) {
        const data = feature.get('score_a_percentile');
        let colorString;
        if (data) {
          colorString = colorWithAlpha(data, 0.3);
        } else {
          colorString = 'white';
        }
        // const inOrOut = feature.get('score_a_top_percentile_25');
        return new Style({
          fill: new Fill({
            color: colorString, // inOrOut == 'True' ? 'blue' : 'white',
          }),
        });
      },
    });


    popupCloser.current.onclick = function() {
      overlay.setPosition(undefined);
      popupCloser.current.blur();
      return false;
    };

    const overlay = new Overlay({
      element: popupContainer.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    const initialMap = new Map({
      target: mapElement.current,
      view: new View({
        center: fromLonLat([-86.502136, 32.4687126]),
        zoom: 4,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
          }),
        }),
        j40Layer,
      ],
      controls: [],
      overlays: [overlay],
    });


    initialMap.on('click', handleMapClick);
    initialMap.on('pointermove', handlePointerMove);
    setMap(initialMap);
    setCurrentOverlay(overlay);
    setFeaturesLayer(initialFeaturesLayer);
    // olms(initialMap, mapConfig);
  }, []);


  // update map if features prop changes
  useEffect(() => {
    if (features.length) { // may be empty on first render
      // set features to map
      featuresLayer?.setSource(
          new VectorSource({
            features: features,
          }),
      );

      const extent = featuresLayer?.getSource().getExtent();
      if (extent != null) {
        // fit map to feature extent (with 100px of padding)
        map?.getView().fit(extent, {
          padding: [100, 100, 100, 100],
        });
      }
    }
  }, [features]);

  const handleMapClick = (event: { pixel: any; }) => {
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    // const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');

    // set React state
    // setSelectedCoord( transformedCoord );
    mapRef.current.forEachFeatureAtPixel(event.pixel, (feature) => {
      setSelectedFeature(feature);
      return true;
    });

    overlayRef.current.setPosition(clickedCoord);
  };

  const handlePointerMove = (event: { pixel: any; }) => {
    if (hoveredFeature !== undefined) {
      hoveredFeature?.setStyle(undefined);
      setHoveredFeature(undefined);
    }

    mapRef.current.forEachFeatureAtPixel(event.pixel, (feature) => {
      setHoveredFeature(feature);
      return true;
    });
  };
  const readablePercent = (percent: number) => {
    return `${parseFloat(percent * 100).toFixed(2)}%`;
  };

  return (
    <>
      <div ref={mapElement} className={styles.mapContainer}></div>
      <div className="clicked-coord-label">
        <p>{(hoveredFeature) ? readablePercent(hoveredFeature.properties_['score_a_percentile']) : ''}</p>
        <div ref={popupContainer} className={styles.popupContainer}>
          <a href="#" ref={popupCloser} className={styles.popupCloser}></a>
          <div ref={popupContent} className={styles.popupContent}>
            {(selectedFeature) ?
              <div>
                <h2>Cumulative Index Score:</h2>
                <h3>{readablePercent(selectedFeature.properties_['score_a_percentile'])}</h3>
                {/* // this will eventually populate a sidebar
                <dl>
                    {
                      Object.keys(selectedFeature.getProperties()).map((key, index) => (
                        <>
                          <dt>{key}</dt>
                          <dd>{selectedFeature.properties_[key]}</dd>
                        </>
                      ))
                    }
                  </dl> */}
              </div> :
              ''}

          </div>
        </div>
      </div>
    </>
  );
};

export default MapWrapper;
