import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj';
import {apply, getLayer, getLayers} from 'ol-mapbox-style';


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
       "public.maryland":{
          "scheme":"xyz",
          "tilejson":"2.0.0",
          "minzoom":0,
          "maxzoom":22,
          "prefetchable":true,
          "tiles":[
             "http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt"
          ],
          "type":"vector"
       }
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
          "id":"public.maryland.MultiPolygon.fill",
          "type":"fill",
          "source":"public.maryland",
          "source-layer":"public.maryland",
          "paint":{
             "fill-color":[
                "interpolate",
                [
                   "linear"
                ],
                [
                   "get",
                   "lowincpct"
                ],
                0,
                "white",
                1,
                "rgb(0,94,162)"
             ],
             "fill-opacity":0.5
          }
       }
    ]
};

const map = new Map({
    target: 'map',
    view: new View({
        center: fromLonLat([-76.6413, 39.0458]),
        zoom: 8,
    })
});

(async () => {
   const loadedMap = await apply(map, mapConfig);
   loadedMap.once('rendercomplete', ()=>{
      performance.mark("MAP_IDLE");
      const layer = getLayer(loadedMap, "public.maryland.MultiPolygon.fill");
      const source = layer.get('source');
      source.once('tileloadend', function () {
         window.performance.mark("STYLE_LOADED");
      });
   });
})();




 