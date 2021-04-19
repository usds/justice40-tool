import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import GeoJSON from 'ol/format/GeoJSON'
import OlMapWrapper from '../components/ol-map-wrapper'
import geojson from "../data/maryland.json";

const OpenLayersPage = () => {
    // set intial state
    const [ features, setFeatures ] = useState([])

    // initialization - retrieve GeoJSON features  
    useEffect( () => {
        // parse fetched geojson into OpenLayers features
        //  use options to convert feature from EPSG:4326 to EPSG:3857
        const wktOptions = {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }
        const parsedFeatures = new GeoJSON().readFeatures(geojson, wktOptions)
        setFeatures(parsedFeatures)
  },[])

    return (
      <>
      <Layout>
        <SEO title="OpenLayers" />
        <h1 className="margin-left-9">OpenLayers</h1>
        
        <OlMapWrapper features={features} />
  
      </Layout>
      </>
      
    )
  }
  
  export default OpenLayersPage
  