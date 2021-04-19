import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, FeatureGroup } from 'react-leaflet'
import geojson from "../data/maryland.json";
import Layout from '../components/layout';

const LeafletMap = () => {
    return (
        <MapContainer
            center={[39.0458, -76.6413]}
            zoom={8}
            style={{ height: "400px" }}
        >
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
            />

            <FeatureGroup 
            pathOptions={{ weight:0.1, 
                            color: 'black', 
                            fillColor: 'grey',  
                            "fill-opacity": 0.5 }}
            >
            <GeoJSON data={geojson}></GeoJSON>
            </FeatureGroup>
            

            <Marker position={[51.505, -0.09]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    );
};

const LeafletPage = () => {
    return (
        <Layout>
          <LeafletMap  />
        </Layout>
    );
};

export default LeafletPage