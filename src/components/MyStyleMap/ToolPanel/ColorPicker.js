import { Component } from 'react';
import style from './ColorPicker.less';

export default class ColorPicker extends Component {
  constructor(ps) {
    super(ps);
    this.colors = [
      '#F44336',
      '#FFFFFF',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFEB3B',
      '#FFC107',
      '#FF9800',
      '#FF5722',
      '#795548',
      '#607D8B',
    ];
  }

  getColors() {
    var colors = [];
    for (var i = 0; i < this.colors.length; i++) {
      let color = this.colors[i];
      colors.push(
        <div
          key={i}
          style={{ background: color }}
          onClick={e => this.props.setColor(color)}
          className={this.props.color === color ? style.active : ''}
        />
      );
    }
    return colors;
  }
  render() {
    return <div className={style.colorpicker}>{this.getColors()}</div>;
  }
}
