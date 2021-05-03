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
    'center': [39.0458, -76.6413],
    'zoom': 7
    // 'maxBounds': marylandBounds
});
// }).fitBounds(marylandBounds);

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
//var vectorLayer = L.vectorGrid.protobuf(vectorUrl, vectorTileOptions).addTo(map);

const largeMVTOptions = {
    vectorTileLayerStyles: {
        "National Highway": {
            "stroke-color": 'red'
        }
    }
}

const largeMVTLayer = L.vectorGrid.protobuf("https://sit-tileservice.geoplatform.info/vector/ngda_nhpn/{z}/{x}/{y}.mvt", largeMVTOptions).addTo(map);
// const censusLayer = L.tileLayer.wms('https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/export?&bboxSR=EPSG%3A3857&layers=1&layerDefs=&size=256%2c256&imageSR=&format=png&transparent=true&dpi=&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&f=image').addTo(map);

largeMVTLayer.on('load', function(e) {
    performance.mark("STYLE_LOADED");
    console.log("SL");
});

map.whenReady(()=>{
    performance.mark("MAP_IDLE");
    console.log("MI");
});

