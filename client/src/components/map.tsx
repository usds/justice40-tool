import React, {useState, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import * as styles from './map.module.scss';
// import olms from 'ol-mapbox-style';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import {Fill, Style} from 'ol/style.js';
import XYZ from 'ol/source/XYZ';
import * as d3 from 'd3';
import {transform} from 'ol/proj';
import {toStringXY} from 'ol/coordinate';


interface IMapWrapperProps {
  features: Feature<Geometry>[],
};

// The below adapted from
// https://taylor.callsen.me/using-openlayers-with-react-functional-components/
const MapWrapper = ({features}: IMapWrapperProps) => {
  const [map, setMap] = useState<Map>();
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>();
  const [selectedFeature, setSelectedFeature] = useState<Feature>();
  const [selectedCoord, setSelectedCoord] = useState();

  const mapElement = useRef() as
        React.MutableRefObject<HTMLInputElement>;

  const mapRef = useRef() as
    React.MutableRefObject<HTMLInputElement>;
  mapRef.current = map;

  useEffect( () => {
    // create and add initial vector source layer, to be replaced layer
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const j40source = new VectorTileSource({
      'format': new MVT(),
      // 'url': 'http://localhost:8080/data/block2010/{z}/{x}/{y}.pbf',
      'url': 'http://usds-geoplatform-justice40-website.s3-website-us-east-1.amazonaws.com/nm/{z}/{x}/{y}.pbf',
    });

    const colors = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, 1]); // d3.scaleOrdinal(d3.interpolateBlues);

    const j40Layer = new VectorTileLayer({
      declutter: false,
      source: j40source,
      style: function(feature) {
        const data = feature.get('score_a_percentile');
        let colorString;
        if (data) {
          const rgb = colors(data);
          const rbgArr = rgb.slice(
              rgb.indexOf('(') + 1,
              rgb.indexOf(')'),
          ).split(', ');
          colorString = `rgba(${rbgArr[0]}, ${rbgArr[1]}, ${rbgArr[2]}, 0.5)`;
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
    });

    initialMap.on('click', handleMapClick);
    initialMap.on('pointermove', handlePointerMove);
    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);
    // olms(initialMap, mapConfig);
  }, []);


  // update map if features prop changes
  useEffect( () => {
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
    const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');

    // set React state
    setSelectedCoord( transformedCoord );
  };

  const handlePointerMove = (event: { pixel: any; }) => {
    if (selectedFeature !== undefined) {
      selectedFeature?.setStyle(undefined);
      setSelectedFeature(undefined);
    }

    mapRef.current.forEachFeatureAtPixel(event.pixel, (feature) => {
      setSelectedFeature(feature);
      return true;
    });
  };

  return (
    <>
      <div ref={mapElement} className={styles.mapContainer}></div>
      <div className="clicked-coord-label">
        <p>{ (selectedFeature) ? selectedFeature.properties_['score_a_percentile'] : '' }</p>
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>
    </>
  );
};

export default MapWrapper;
