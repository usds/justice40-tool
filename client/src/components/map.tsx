import React, {useState, useEffect, useRef} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature, {FeatureLike} from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import * as styles from './map.module.scss';
import olms from 'ol-mapbox-style';
import Overlay from 'ol/Overlay';
// import {Table} from '@trussworks/react-uswds';

// @ts-ignore
import zoomIcon from '/node_modules/uswds/dist/img/usa-icons/zoom_in.svg';

const mapConfig = {
  'version': 8,
  'cursor': 'pointer',
  'sources': {
    'carto-light': {
      'type': 'raster',
      'tiles': [
        'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      ],
    },
    'custom': {
      'type': 'vector',
      'tiles': [
        'http://usds-geoplatform-justice40-website.s3-website-us-east-1.amazonaws.com/0624_demo/{z}/{x}/{y}.pbf',
        // For local development, use:
        // 'http://localhost:8080/data/tl_2010_bg_with_data/{z}/{x}/{y}.pbf',
      ],
    },
    'labels': {
      'type': 'raster',
      'tiles': [
        'https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://cartodb-basemaps-b.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://cartodb-basemaps-c.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
        'https://cartodb-basemaps-d.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}@2x.png',
      ],
    },
  },
  'layers': [
    {
      'id': 'carto-light-layer',
      'source': 'carto-light',
      'type': 'raster',
      'minzoom': 0,
      'maxzoom': 22,
    },
    {
      'id': 'blocks',
      'type': 'fill',
      'source': 'custom',
      'source-layer': 'blocks',
      'minzoom': 0,
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
      },
      // 01=AL, 30=MT, 34=NJ, 35=NM, 36=NY
      'filter': ['in', 'STATEFP10', '01', '30', '34', '35', '36'],
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['to-number', [
            'get',
            'Score C (percentile)',
          ]],
          0.0,
          'white',
          1,
          'blue',
        ],
        'fill-opacity': 0.75,
      },
    },
    {
      'id': 'labels-only',
      'type': 'raster',
      'source': 'labels',
      'minzoom': 0,
      'maxzoom': 22,
    },
  ],
};

interface IMapWrapperProps {
  features: Feature<Geometry>[],
};

// The below adapted from
// https://taylor.callsen.me/using-openlayers-with-react-functional-components/
const MapWrapper = ({features}: IMapWrapperProps) => {
  const [map, setMap] = useState<Map>();
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>();
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>();
  const [selectedFeature, setSelectedFeature] = useState<FeatureLike>();
  const [currentZoom, setCurrentZoom] = useState<number>(0);

  const mapElement = useRef() as
    React.MutableRefObject<HTMLInputElement>;

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef() as React.MutableRefObject<Map>;
  if (map) {
    mapRef.current = map;
  }

  const popupContainer = React.useRef<HTMLDivElement>(null);
  const popupCloser = React.useRef<HTMLAnchorElement>(null);
  const popupContent = React.useRef<HTMLDivElement>(null);

  const overlayRef = useRef() as React.MutableRefObject<Overlay>;
  overlayRef.current = currentOverlay!;

  useEffect( () => {
    // create and add initial vector source layer, to be replaced layer
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    if (!popupCloser || !popupContainer) {
      return;
    }

    popupCloser.current!.onclick = function() {
      overlay.setPosition(undefined);
      popupCloser.current!.blur();
      return false;
    };

    const overlay = new Overlay({
      // Using the non-null assertion operator as we check for null above
      element: popupContainer.current!,
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
      controls: [],
      overlays: [overlay],
    });
    const currentZoom = Math.floor(initialMap.getView().getZoom());

    initialMap.on('moveend', handleMoveEnd);
    initialMap.on('click', handleMapClick);
    setMap(initialMap);
    setCurrentZoom(currentZoom);
    setCurrentOverlay(overlay);
    setFeaturesLayer(initialFeaturesLayer);
    olms(initialMap, mapConfig);
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
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    mapRef.current.forEachFeatureAtPixel(event.pixel, (feature) => {
      setSelectedFeature(feature);
      return true;
    });

    overlayRef.current.setPosition(clickedCoord);
  };

  const handleMoveEnd = () => {
    const newZoom = Math.floor(mapRef.current.getView().getZoom()!);
    if (currentZoom != newZoom) {
      setCurrentZoom(newZoom);
    }
  };

  const readablePercent = (percent: number) => {
    return `${(percent * 100).toFixed(2)}%`;
  };

  let properties;
  if (selectedFeature) {
    properties = selectedFeature.getProperties();
  }

  const getCategorization = (percentile: number) => {
    let categorization = '';
    if (percentile >= 0.75 ) {
      categorization = 'Prioritized';
    } else if (0.60 <= percentile && percentile < 0.75) {
      categorization = 'Threshold';
    } else {
      categorization = 'Non-prioritized';
    }
    return categorization;
  };

  const getTitleContent = (properties: { [key: string]: any; }) => {
    const blockGroup = properties['GEOID10'];
    const score = properties['Score C (percentile)'];
    return (
      <table className={styles.popupHeaderTable}>
        <tbody>
          <tr>
            <td><strong>Census Block Group:</strong></td>
            <td>{blockGroup}</td>
          </tr>
          <tr>
            <td><strong>Just Progress Categorization:</strong></td>
            <td>{getCategorization(score)}</td>
          </tr>
          <tr>
            <td><strong>Cumulative Index Score:</strong></td>
            <td>{readablePercent(score)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  // const propertyTest = (propertyName:string) => {
  //   // Filter out properties in all caps
  //   return !propertyName.match(/^[A-Z0-9]+$/);
  // };

  return (
    <div className={styles.mapWrapperContainer}>
      <div ref={mapElement} className={styles.mapContainer} />

      <div ref={popupContainer} className={styles.popupContainer}>
        <a href="#" ref={popupCloser} className={styles.popupCloser}></a>
        <div ref={popupContent} className={styles.popupContent}>
          {(selectedFeature && properties) ?
              <div>
                {getTitleContent(properties)}
                {/* <Table bordered={false}>
                  <thead>
                    <tr>
                      <th scope="col">Indicator</th>
                      <th scope="col">Percentile(0-100)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(properties).map((key, index) => (
                        (propertyTest(key)) &&
                        <tr key={key} >
                          <td>{key}</td>
                          <td>{properties[key]}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table> */}
              </div> :
              ''}
        </div>
      </div>

      { currentZoom < 5 ?
      <div className={styles.zoomWarning}>
        <img
          src={zoomIcon} alt={'zoom icon'}/>
          Zoom in to the state or regional level to see prioritized communities on the map.
      </div> :
      ''
      }
    </div>
  );
};

export default MapWrapper;
