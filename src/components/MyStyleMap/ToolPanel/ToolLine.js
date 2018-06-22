import { Component } from 'react';
import style from './ToolLine.less';
import ColorPicker from './ColorPicker';

export default class ToolLine extends Component {
  constructor(ps) {
    super(ps);
    this.state = {
      color: '#F44336',
    };
  }
  setColor = color => {
    this.setState({ color: color });
  };
  render() {
    return (
      <div data-type="line" ref={e => (this.root = e)} className={style.toolline}>
        <ColorPicker setColor={this.setColor} color={this.state.color} />
      </div>
    );
  }
}
