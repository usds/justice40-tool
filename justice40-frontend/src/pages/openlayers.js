import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature';

import OlMapWrapper from '../components/ol-map-wrapper'

// import OpenLayersMap from '../components/open-layers-map'
// import { fromLonLat, get } from 'ol/proj';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import XYZ from 'ol/source/XYZ';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import MVT from 'ol/format/MVT';
// import TileSource from 'ol/source/Tile';
// import VectorTileLayer from 'ol/layer/VectorTile';
// import VectorTileSource from 'ol/source/VectorTile';
// import {Fill, Stroke, Style} from 'ol/style';
// import {schemeCategory10} from 'd3-scale-chromatic';



// markup
const OpenLayersPage = () => {
    // set intial state
    const [ features, setFeatures ] = useState([])

    // initialization - retrieve GeoJSON features from Mock JSON API get features from mock 
    //  GeoJson API (read from flat .json file in public directory)
    useEffect( () => {

        fetch('/mock-geojson-api.json')
        .then(response => response.json())
        .then( (fetchedFeatures) => {

            // parse fetched geojson into OpenLayers features
            //  use options to convert feature from EPSG:4326 to EPSG:3857
            const wktOptions = {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
            }
            const parsedFeatures = new GeoJSON().readFeatures(fetchedFeatures, wktOptions)

            // set features into state (which will be passed into OpenLayers
            //  map component as props)
            setFeatures(parsedFeatures)
      })
  },[])

    return (
      <>
      <Layout>
        <SEO title="OpenLayers" />
        <h1>OpenLayers</h1>
        
        <OlMapWrapper features={features} />
  
      </Layout>
      </>
      
    )
  }
  
  export default OpenLayersPage
  