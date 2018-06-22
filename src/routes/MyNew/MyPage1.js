import { Component } from 'react';
import MyStyleMap from '../../components/MyStyleMap/Index';

export default class MyPage1 extends Component {
  constructor(ps) {
    super(ps);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return <MyStyleMap />;
  }
}
