import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {Fill, Style} from 'ol/style.js';
import {fromLonLat} from 'ol/proj';
import getColor from './utils';



const xyzSource = new VectorTileSource({
  format: new MVT(),
  url: 'http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt'
});

var vtLayer = new VectorTileLayer({
  declutter: false,
  source: xyzSource,
  style: function(feature) {
      const data = feature.get('lowincpct');
      return new Style({
          fill: new Fill({
            color: getColor(data)
          }),
        });
   }
});

var cartoLayer = new TileLayer({
  source: new XYZ({
    url: 'http://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
  })
});

const map = new Map({
  target: 'map',
  view: new View({
    center: fromLonLat([-76.6413, 39.0458]),
    zoom: 8,
  })
});

map.addLayer(cartoLayer);
map.addLayer(vtLayer);

map.once('rendercomplete', ()=>{
  performance.mark("MAP_IDLE");
 // console.log("OL IS IDLE");
});

xyzSource.once('tileloadend', function () {
  performance.mark("STYLE_LOADED");
  // console.log("STYLE LOADED");
});
