import React, { Component } from 'react';
import { Button, notification, Card } from 'antd';
import { connect } from 'dva';
// import { stringify } from 'qs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

@connect(({ user, Test }) => ({
  currentUser: user.currentUser,
  myUsers: user.myUsers,
  myTestUsers: Test.myTestUsers,
}))
export default class Page1 extends Component {
  state = {
    value: 'test',
  };

  clickHandler = () => {
    this.props.dispatch({
      type: 'user/fetchMy',
    });
  };

  //如何在获取数据之后再执行通知显示
  prompt = () => {
    this.props
      .dispatch({
        type: 'Test/fetchMyWords',
        words: this.state.value,
      })
      .then(() =>
        notification.open({
          message: 'We got value:',
          description: (
            <span dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.myTestUsers) }} />
          ),
        })
      );
  };
  handleChange = value => {
    this.setState({
      value,
    });
  };

  render() {
    var myUsers = this.props.myUsers;
    var myTestUsers = this.props.myTestUsers;

    return (
      <div>
        <Button type="primary" onClick={() => this.clickHandler()}>
          click
        </Button>
        <div>{JSON.stringify(myUsers)}</div>
        <Card title="富文本编辑器">
          <ReactQuill value={this.state.value} onChange={this.handleChange} />
          <Button style={{ marginTop: 16 }} onClick={this.prompt}>
            Prompt
          </Button>
          <div>{JSON.stringify(myTestUsers)}</div>
        </Card>
      </div>
    );
  }
}
