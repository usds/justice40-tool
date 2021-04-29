import colormap from 'colormap';
import L from 'leaflet';
import "leaflet.vectorgrid";
import getColor from './utils';

var usBounds = L.latLngBounds(
    L.latLng(5.499550, -167.276413), //Southwest
    L.latLng(83.162102, -52.233040)  //Northeast
);

var marylandBounds = L.latLngBounds(
    L.latLng(39.7425, -75.0450), //Southwest
    L.latLng(37.8713, -79.4938)  //Northeast
);

var map = L.map('map', {
    'center': [0, 0],
    'zoom': 0,
    'maxBounds': marylandBounds
}).fitBounds(marylandBounds);

const baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
   subdomains: 'abcd',
   maxZoom: 20,
   minZoom: 0
 }).addTo(map);

var vectorServer = "http://localhost:7800/";
var vectorLayerId = "public.maryland";
var vectorUrl = `${vectorServer}${vectorLayerId}/{z}/{x}/{y}.mvt`;
var vectorTileStyling = {};

// Rendering options
vectorTileStyling[vectorLayerId] = function(properties, zoom) {
    return {
        fill: true,
        fillColor: getColor(properties.lowincpct),
        fillOpacity: 0.8,
        opacity: 0.7,
        weight: 0
    }
};
var vectorTileOptions = {
    vectorTileLayerStyles: vectorTileStyling
};
var vectorLayer = L.vectorGrid.protobuf(vectorUrl, vectorTileOptions).addTo(map);

vectorLayer.on('load', function(e) {
    performance.mark("STYLE_LOADED");
});

map.whenReady(()=>{
    performance.mark("MAP_IDLE");
});

