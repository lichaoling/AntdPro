import { Component } from 'react';
import st from '../../components/NewPage/Iconfont/iconfont.css';
import Result from 'ant-design-pro/lib/Result';
import Exception from 'ant-design-pro/lib/Exception';
import { Button } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import MyException from '../Exception/404';

export default class Page3 extends Component {
  render() {
    return (
      <div>
        <i className={'iconfont icon-dayu'} />
        <i className={`${st.iconfont} ${st['icon-dayu']}`} />
        <Result type="success" />
        <Result
          type="error"
          title="提交失败"
          description="请核对并修改以下信息后，再重新提交。"
          actions={
            <Button size="large" type="primary">
              返回修改
            </Button>
          }
        />
        <Exception type="404" />
        <MyException />
      </div>
    );
  }
}
