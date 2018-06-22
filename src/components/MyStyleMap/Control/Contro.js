import { Component } from 'react';
import style from './Control.less';
import ToolLine from '../ToolPanel/ToolLine';

export default class Control extends Component {
  constructor(ps) {
    super(ps);
    this.state = {
      baseMapType: ps.baseMapType || 'vec',
      editing: ps.editing,
    };
  }
  toggleEditingState() {
    var s = this.state;
    var editing = !s.editing;
    this.setState({ editing: editing });
    this.fire('toggleEditingState', { editing: editing });
  }
  changeBaseMap() {
    var s = this.state;
    var baseMapType = s.baseMapType === 'vec' ? 'img' : 'vec';
    this.setState({ baseMapType: baseMapType });
    this.fire('changeBaseMap', { baseMapType: baseMapType });
  }

  render() {
    var s = this.state,
      ps = this.props;
    return (
      <div className={style.drawtool}>
        <ul>
          <li className="drawtool-point" data-type="point">
            点
          </li>
          <li className="drawtool-line" data-type="line">
            线
          </li>
          <li className="drawtool-polygon" data-type="polygon">
            面
          </li>
          <li className="drawtool-text" data-type="text">
            文字
          </li>
          <li onClick={e => this.toggleEditingState()}>{s.editing ? '停止编辑' : '编辑图形'}</li>
          <li onClick={() => this.changeBaseMap()}>{s.baseMapType === 'vec' ? '地图' : '影像'}</li>
          <li onClick={e => this.fire('clearLayers')}>清除</li>
          <li onClick={e => this.fire('saveMap')}>保存</li>
          <li onClick={e => this.fire('openMap')}>历史</li>
        </ul>
        <div ref={e => (this.toolPanel = e)} className={style.toolpanel}>
          <ToolLine />
        </div>
      </div>
    );
  }
}
