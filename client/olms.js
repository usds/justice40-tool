import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import olms, {pply, getLayer, getLayers} from 'ol-mapbox-style';


let mapConfig = {
    "version":8,
    "cursor":"pointer",
    "sources":{
       "carto-light":{
          "type":"raster",
          "tiles":[
             "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
             "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
             "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
             "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
          ]
       },
       "ngda_nhpn": {
         'tiles': [
           'https://sit-tileservice.geoplatform.info/vector/ngda_nhpn/{z}/{x}/{y}.mvt'
         ],
         'type': 'vector',
         'minzoom': 0,
         'maxzoom': 22
      }
      //  'censusBlockGroup' : {
      //       'type': 'raster',
      //       // use the tiles option to specify a WMS tile source URL
      //       // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
      //       'tiles': [
      //          'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=EPSG%3A3857&layers=1&layerDefs=&size=256%2c256&imageSR=&format=png&transparent=true&dpi=&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&f=image'
      //       ],
      //       'tileSize': 256
      //    }
      //  "public.maryland":{
      //     "scheme":"xyz",
      //     "tilejson":"2.0.0",
      //     "minzoom":0,
      //     "maxzoom":22,
      //     "prefetchable":true,
      //     "tiles":[
      //        "http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt"
      //     ],
      //     "type":"vector"
      //  }
    },
    "layers":[
       {
          "id":"carto-light-layer",
          "source":"carto-light",
          "type":"raster",
          "minzoom":0,
          "maxzoom":22
       },
       {
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
        }
      //  {
      //    'id': 'censusBlockGroup',
      //    'type': 'raster',
      //    'source': 'censusBlockGroup',
      //    'paint': {}
      //    },
      //  {
      //     "id":"public.maryland.MultiPolygon.fill",
      //     "type":"fill",
      //     "source":"public.maryland",
      //     "source-layer":"public.maryland",
      //     "paint":{
      //        "fill-color":[
      //           "interpolate",
      //           [
      //              "linear"
      //           ],
      //           [
      //              "get",
      //              "lowincpct"
      //           ],
      //           0,
      //           "white",
      //           1,
      //           "rgb(0,94,162)"
      //        ],
      //        "fill-opacity":0.5
      //     }
      //  }
    ]
};

const map = new Map({
    target: 'map',
    view: new View({
        center: fromLonLat([-76.6413, 39.0458]),
        zoom: 7,
    })
});

(async () => {
   const loadedMap = await olms(map, mapConfig);

   const largeMVTSource = new VectorTileSource({
      format: new MVT(),
      // url: `https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/tile/{z}/{y}/{x}.pbf`
      url: "https://sit-tileservice.geoplatform.info/vector/ngda_nhpn/{z}/{x}/{y}.mvt"
    });
   const largeMVTLayer = new VectorTileLayer({
      source: largeMVTSource
   });
  // loadedMap.addLayer(largeMVTLayer);
   // largeMVTSource.once('tileloadend', function () {
   //    window.performance.mark("STYLE_LOADED");
   // });

   loadedMap.once('rendercomplete', ()=>{
      console.log("MAP IDLE");
      performance.mark("MAP_IDLE");
      window.performance.mark("STYLE_LOADED");
      const layer = getLayer(loadedMap, "National Highway");
      const source = layer.get('source');
      console.log(source);

      // Note, below source has bug
      source.once('tileloadend', function () {
         console.log("STYLE LOADED");
         window.performance.mark("STYLE_LOADED");
      });
   });
})();




 