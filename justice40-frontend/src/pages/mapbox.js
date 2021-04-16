import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout';
import MapboxMap from '../components/mapboxmap'
import * as mapboxStyles from "./mapbox.module.css";

// mapboxgl.workerClass = MapboxWorker;

// markup
const MapboxPage = () => {
    // const mapContainer = useRef();
    // const [lng, setLng] = useState(-76.615278);
    // const [lat, setLat] = useState(39.289444);
    // const [zoom, setZoom] = useState(9);
    
    // useEffect(() => {
    //     const map = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [lng, lat],
    //         zoom: zoom
    //     });

    //     map.on('load', () => {
    //         map.resize();
    //     });
         
    //     map.on('load', () => {
    //         map.on("load", function() {
    //             map.addSource("public.maryland", {
    //               "type": "vector",
    //               "tiles": ["http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt"],
    //               "minzoom": 0,
    //               "maxzoom": 22
    //             });
          
    //             map.addLayer({
    //               "id": "public.maryland.MultiPolygon.fill",
    //               "source": "public.maryland",
    //               "source-layer": "public.maryland",
    //               "type": "fill",
    //               "paint": {
    //                 "fill-color": [
    //                             "interpolate",
    //                             ["linear"],
    //                             ["get", "lowincpct"],
    //                             0,
    //                             "white",
    //                             1,
    //                             "black"
    //                 ],
    //                 "fill-opacity": 0.5
    //               }
    //             });
    //         });
    //     });
         
    //     return () => map.remove();
    // }, []);
         
    return (
        <Layout>
            <MapboxMap class={mapboxStyles.mapContainer} />
        </Layout>
    );
    
};

export default MapboxPage
