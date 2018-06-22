import { Component } from 'react';
import style from './Index.less';
import Map from './Map/Map';
import Control from './Control/Contro';

export default class Index extends Component {
  constructor(ps) {
    super(ps);
    this.state = {
      mapState: {
        center: [30.697563734811315, 121.02058410644533],
        zoom: 14,
        baseMapType: 'vec',
      },
    };
  }
  render() {
    var s = this.state,
      ps = this.props;
    return (
      <div className={style.index}>
        <Map ref={e => (this.map = e)} mapState={s.mapState} />
        <Control ref={e => (this.toolbar = e)} baseMapType={s.mapState.baseMapType} />
      </div>
    );
  }
}
