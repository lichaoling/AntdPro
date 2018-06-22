import { Component } from 'react';
import style from './MyPage2.less';
import echarts from 'echarts';
import echartsgl from 'echarts-gl';

export default class MyPage2 extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className={style.content} id="main">
        Page2
      </div>
    );
  }
}
