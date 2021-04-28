import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const xyzSource = {
    name: "public.maryland",
    scheme: 'xyz',
    tilejson: "2.0.0",
    minzoom: 0,
    maxzoom: 22,
    prefetchable: true,
    tiles: ["http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt"],
    type: 'vector'
};
    
const layerStyle = {
    id: 'public.maryland.MultiPolygon.fill',
    type: 'fill',
    source: "public.maryland",
    "source-layer": "public.maryland",
    paint: {
    "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "lowincpct"],
        0,
        "rgb(30,4,110)",
        1,
        "white"
    ],
    "fill-opacity": 0.5
    }
};
  
const initialMapStyle = {
    'version': 8,
    'cursor': 'pointer',
    'sources': {
    'carto-light': {
        'type': 'raster',
        'tiles': [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
        ]
    }
    },
    'layers': [{
    'id': 'carto-light-layer',
    'source': 'carto-light',
    'type': 'raster',
    'minzoom': 0,
    'maxzoom': 22
    }]
};

const mapConfig = {
    container: 'map',
    //bounds: [[-75.0450, 39.7425], [-79.4938, 37.8713]],
    center: [-76.6413, 39.0458],
    zoom: 7,
    style: initialMapStyle
}

const map = new mapboxgl.Map(mapConfig);
map.on("load", function() {
    map.addSource("public.maryland", xyzSource);
    map.addLayer(layerStyle);
});

map.once('style.load', (ev) => {
    //console.log("MB STYLE LOADED");
    performance.mark("STYLE_LOADED");
});

map.once('idle',function(){
    performance.mark("MAP_IDLE");
    //console.log("MAPBOX IS IDLE");
});
