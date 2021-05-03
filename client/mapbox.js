import mapboxgl from "mapbox-gl";

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
        "white",
        1,
        "rgb(0,94,162)"
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

const largeMVTSource = {
    name: "largeMVT",
    // scheme: 'xyz',
    // tilejson: "2.0.0",
    minzoom: 0,
    maxzoom: 22,
    // prefetchable: true,
    tiles: ["https://sit-tileservice.geoplatform.info/vector/ngda_nhpn/{z}/{x}/{y}.mvt"],
    type: 'vector'
};

const largeMVTLayer = {
    id: 'largeMVT',
    source: 'largeMVT',
    "source-layer": "largeMVT",
    type: 'line',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
        },
    paint: {
        'line-opacity': 0.6,
        'line-color': 'rgb(53, 175, 109)',
        'line-width': 3
    }
}

const mapConfig = {
    container: 'map',
    //bounds: [[-75.0450, 39.7425], [-79.4938, 37.8713]],
    center: [-76.6413, 39.0458],
    zoom: 6,
    style: 'mapbox://styles/mapbox/streets-v11'//initialMapStyle
}

mapboxgl.accessToken = 'pk.eyJ1IjoibmF0aGlsbGFyZHVzZHMiLCJhIjoiY2ttd2cycHQyMDFnMDJycWtiaXd4bDZtMiJ9.zyr-vdNDGjVMikkPDL6bYA';
const map = new mapboxgl.Map(mapConfig);
map.on("load", function() {
    // map.addSource("largeMVT", largeMVTSource);
    // map.addLayer(largeMVTLayer);

    let largeMVTSource = {
        'tiles': [
          'https://sit-tileservice.geoplatform.info/vector/ngda_nhpn/{z}/{x}/{y}.mvt'
        ],
        'type': 'vector',
        'minzoom': 0,
        'maxzoom': 22
    };

	let largeMVTLayer = {
    'id': 'National Highway',
    'type': 'line',
    'source': 'ngda_nhpn',
    'source-layer': 'national_highway',
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-opacity': 1,
      'line-color': 'red',
    }
	};
  
  map.addSource('ngda_nhpn', largeMVTSource);
  map.addLayer(largeMVTLayer);

    // map.addSource("public.maryland", xyzSource);
    // map.addLayer(layerStyle);

    // map.addSource('wms-test-source', {
    //     'type': 'raster',
    //     // use the tiles option to specify a WMS tile source URL
    //     // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
    //     'tiles': [
    //         'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=EPSG%3A3857&layers=1&layerDefs=&size=256%2c256&imageSR=&format=png&transparent=true&dpi=&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&f=image'
    //     ],
    //     'tileSize': 256
    // });
    // map.addLayer(
    //     {
    //     'id': 'wms-test-layer',
    //     'type': 'raster',
    //     'source': 'wms-test-source',
    //     'paint': {}
    //     },
    //     'aeroway-line'
    // );
});

map.once('style.load', (ev) => {
    console.log("MB STYLE LOADED");
    performance.mark("STYLE_LOADED");
});

map.once('idle',function(){
    performance.mark("MAP_IDLE");
    console.log("MAPBOX IS IDLE");
});
