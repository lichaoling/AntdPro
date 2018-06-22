import { Component } from 'react';
import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import style from './Mapboxgl3D.less';

export default class Mapboxgl3D extends Component {
  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibGljaGFvbGluZyIsImEiOiJjamllNnA2M3YwNWk5M3BtcXFxYnpucG9vIn0.OLQogaz-U5zui_-MpHJzoQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 14,
      center: [121.02058410644533, 30.697563734811315],
    });
    map.on('load', function() {
      map.addLayer(
        {
          id: 'wms-test-layer',
          type: 'raster',
          source: {
            type: 'raster',
            tiles: [
              // 'https://geodata.state.nj.us/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=Natural2015',
              'http://t0.tianditu.com/vec_w/wmts?LAYER=vec&tileMatrixSet=w&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
              'http://t0.tianditu.com/cva_w/wmts?LAYER=cva&tileMatrixSet=w&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
            ],
            tileSize: 256,
          },
          paint: {},
        },
        'aeroway-taxiway'
      );
    });

    // this.map.on('click', function () {
    //     var map = this.map;
    //     debugger;
    // }.bind(this));

    // this.map.on('zoom', function () {
    //     var map = this.map;
    //     if (map.getZoom() <= 15)
    //         map.setLayoutProperty('3d-buildings', 'visibility', 'none');
    //     else
    //         map.setLayoutProperty('3d-buildings', 'visibility', 'visible');
    // }.bind(this));

    // this.map.on('load', function () {
    //     // Insert the layer beneath any symbol layer.
    //     var map = this.map;
    //     var layers = map.getStyle().layers;
    //     var labelLayerId;
    //     for (var i = 0; i < layers.length; i++) {
    //         if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {   //如果是标注，且标注有字
    //             labelLayerId = layers[i].id;
    //             break;
    //         }
    //     }

    //     map.addLayer({
    //         'id': '3d-buildings',
    //         'source': 'composite',
    //         'source-layer': 'building',
    //         'filter': ['==', 'extrude', 'true'],
    //         'type': 'fill-extrusion',
    //         'minzoom': 15,
    //         'paint': {
    //             'fill-extrusion-color': '#fff',
    //             // use an 'interpolate' expression to add a smooth transition effect to the
    //             // buildings as the user zooms in
    //             'fill-extrusion-height': [
    //                 "interpolate", ["linear"], ["zoom"],
    //                 15, 0,
    //                 15.05, ["get", "height"]
    //             ],
    //             'fill-extrusion-base': [
    //                 "interpolate", ["linear"], ["zoom"],
    //                 15, 0,
    //                 15.05, ["get", "min_height"]
    //             ],
    //             'fill-extrusion-opacity': .6
    //         }
    //     }, labelLayerId);
    // }.bind(this));
  }
  render() {
    return (
      <div className={style.content}>
        <div id="map" className={style.map} />
      </div>
    );
  }
}
