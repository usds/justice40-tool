import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import MVT from 'ol/format/MVT.js';
import TileSource from 'ol/source/Tile';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {Fill, Stroke, Style} from 'ol/style.js';
import {schemeCategory10} from 'd3-scale-chromatic';


var styleFunction = function(feature) {
  let colors = schemeCategory10;
  let stroke = new Stroke({ color: 'yellow', width: 1 });
  let randomIndex = Math.floor( Math.random() * 9 );
  let fill = new Fill({ color: colors[randomIndex] });
  let style = new Style({ stroke: stroke, fill: fill }); 
  return style;
}


var vtLayer = new VectorTileLayer({
  declutter: false,
  source: new VectorTileSource({
    format: new MVT(),
    url: 'http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt'
  }),
  style: new Style({
    stroke: new Stroke({
      color: 'black',
      width: 1
    }),
    fill: new Fill({
      color: [
        'interpolate',
        ['linear'],
        ['get', 'lowincpct'],
        0,
        'white',
        1,
        'black' ]
      })
    })
});
  // new Style({
  //     stroke: new Stroke({
  //       color: 'red',
  //       width: 1
  //     })
  // })

var tLayer = new TileLayer({
      source: new OSM()
    });

var cartoLayer = new TileLayer({
  source: new XYZ({
    url: 'http://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
  })
});

var esriLayer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.mvt'
  })
});

const map = new Map({
  target: 'map',
  layers: [
    tLayer,
    //esriLayer,
    vtLayer
  ],
  view: new View({
    center: [-50.999, 540],
    zoom: 5,
    bounds: [
      [-75.0450, 39.7425],
      [-79.4938, 37.8713]
    ],
  })
});

