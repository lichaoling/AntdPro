import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  const NewLayout = routerData['/new'].component;
  const MyNewLayout1 = routerData['/mynew1'].component;
  const MyNewLayout2 = routerData['/mynew2'].component;
  const MyNewLayout3 = routerData['/mynew3'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <AuthorizedRoute
            path="/mynew1"
            render={props => <MyNewLayout1 {...props} />}
            authority={['admin', 'user', 'me']}
            redirectPath="/mynew1/mypage1"
          />
          <AuthorizedRoute
            path="/mynew2"
            render={props => <MyNewLayout2 {...props} />}
            authority={['admin', 'user', 'me']}
            redirectPath="/mynew2/mypage2"
          />
          <AuthorizedRoute
            path="/mynew3"
            render={props => <MyNewLayout3 {...props} />}
            authority={['admin', 'user', 'me']}
            redirectPath="/mynew3/mypage3"
          />
          <Route path="/new" render={props => <NewLayout {...props} />} />
          <Route path="/user" component={UserLayout} />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user', 'me']}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
