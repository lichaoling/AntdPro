import { Component } from 'react';
import _leafletExtends_ from '../../CommonJs/__leafletExtends__';
import L from 'leaflet';
import style from './Map.less';
import 'leaflet/dist/leaflet.css';

export default class Map extends Component {
  constructor(ps) {
    super(ps);
    this.mapState = ps.mapState;
    this.state = { baseMapType: this.mapState.baseMapType };
  }
  componentDidMount() {
    _leafletExtends_();
    this.initMap();
  }
  changeBaseMap = type => {
    if (!this.baseMaps) this.initBaseMaps();
    type = type || 'vec';
    var oType = type === 'vec' ? 'img' : 'vec';
    this.baseMaps[oType].remove();
    this.baseMaps[type].addTo(this.map);
    this.setState({ baseMapType: type });
  };
  initMap = () => {
    this.initBaseMaps();
    var ms = this.mapState;
    this.map = L.map('map', {
      crs: L.CRS.EPSG4490,
      center: ms.center,
      zoom: ms.zoom,
      zoomControl: false,
      attributionControl: false,
    });
    this.changeBaseMap(ms.baseMapType);
  };
  initBaseMaps = () => {
    var vec = L.tileLayer.TDTJX({ type: 'vec' });
    var vec_anno = L.tileLayer.TDTJX({ type: 'vec_anno' });

    var img = L.tileLayer.TDTJX({ type: 'img' });
    var img_anno = L.tileLayer.TDTJX({ type: 'img_anno' });

    var vecGroup = L.layerGroup([vec, vec_anno]);
    var imgGroup = L.layerGroup([img, img_anno]);

    this.baseMaps = {
      vec: vecGroup,
      img: imgGroup,
    };
  };
  render() {
    var s = this.state,
      ps = this.props;
    return (
      <div className={style.mapcontainer}>
        <div id="map" className={style.map} />
      </div>
    );
  }
}
