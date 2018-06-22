import React, { Fragment } from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar, Tag } from 'antd';
import { Route, Redirect, Switch } from 'dva/router';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import NotFound from '../routes/Exception/404';
import { Link } from 'react-router-dom';
import style from './MyNewLayout.less';
import GlobalFooter from '../components/GlobalFooter';
import NoticeIcon from '../components/NoticeIcon';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import { connect } from 'dva';
import logo from '../assets/logo.svg';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};

class MyNewLayout1 extends React.PureComponent {
  constructor(ps) {
    super(ps);
    this.state = {};
  }

  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData } = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      );
      return authorizedPath;
    }
    return redirect;
  };
  getNoticeData = () => {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  onNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  render() {
    const { currentUser = {}, fetchingNotices, routerData, match } = this.props;

    const bashRedirect = this.getBashRedirect();

    const SiderMenu1 = (
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['nav1_subnav1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key="nav1_subnav1"
          title={
            <span>
              <Icon type="user" />Map
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/mynew1/nav1/subnav1/option1">Tools</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/mynew1/nav1/subnav1/option2">option2</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="nav1_subnav2"
          title={
            <span>
              <Icon type="laptop" />nav1_subnav2
            </span>
          }
        >
          <Menu.Item key="3">
            <Link to="/mynew1/nav1/subnav2/option3">option3</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/mynew1/nav1/subnav2/option4">option4</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="nav1_subnav3"
          title={
            <span>
              <Icon type="notification" />nav1_subnav3
            </span>
          }
        >
          <Menu.Item key="5">
            <Link to="/mynew1/nav1/subnav3/option5">option5</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/mynew1/nav1/subnav3/option6">option6</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );

    var menu = (
      <Menu style={{ marginTop: 20, width: 200 }}>
        <Menu.Item>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );

    const noticeData = this.getNoticeData();

    return (
      <Layout>
        <Header className="header" style={{ background: '#002140' }}>
          <div key="logo" className={style.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1>Ant Design Pro</h1>
            </Link>
          </div>
          {/* <div className={logo.logo} /> */}
          <Menu
            className={style.nav}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['nav1']}
            style={{ lineHeight: '64px', background: '#002140' }}
          >
            <Menu.Item key="nav1">
              <Link to="/mynew1/nav1/subnav1/option1">首页</Link>
            </Menu.Item>
            <Menu.Item key="nav2">
              <Link to="/mynew2/nav2/subnav1/option1">nav2</Link>
            </Menu.Item>
            <Menu.Item key="nav3">
              <Link to="/mynew3/nav3/subnav1/option1">nav3</Link>
            </Menu.Item>
          </Menu>
          <div className={style.userHeader}>
            <NoticeIcon
              className={style.notice}
              onPopupVisibleChange={this.onNoticeVisibleChange}
              count={currentUser.notifyCount}
              loading={fetchingNotices}
              onItemClick={(item, tabProps) => {
                console.log(item, tabProps); // eslint-disable-line
              }}
              popupAlign={{ offset: [20, -16] }}
            >
              <NoticeIcon.Tab
                list={noticeData['通知']}
                title="通知"
                emptyText="你已查看所有通知"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
              />
              <NoticeIcon.Tab
                list={noticeData['消息']}
                title="消息"
                emptyText="您已读完所有消息"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
              />
              <NoticeIcon.Tab
                list={noticeData['待办']}
                title="待办"
                emptyText="你已完成所有待办"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
              />
            </NoticeIcon>
            <Dropdown overlay={menu}>
              <span>
                <Avatar
                  style={{ backgroundColor: '#ffbf00', verticalAlign: 'middle', marginRight: 10 }}
                  size="middle"
                >
                  管
                </Avatar>
                <span style={{ color: 'white' }}>你好，管理员</span>
              </span>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            {SiderMenu1}
          </Sider>
          <Layout style={{ padding: '0' }}>
            <Content className={style.layoutContent}>
              <Switch>
                {/* 默认生成的路由列表，不包含 /list/search/projects */}
                {redirectData.map(item => (
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                ))}
                {getRoutes(match.path, routerData).map(item => (
                  <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="/exception/403"
                  />
                ))}
                <Route
                  exact
                  path="/list/search/projects"
                  component={routerData['/list/search/projects'].component}
                />
                <Redirect exact from="/" to={bashRedirect} />
                <Route render={NotFound} />
              </Switch>
            </Content>
            <Footer style={{ padding: 0 }}>
              <GlobalFooter
                className={style.footer}
                copyright={
                  <Fragment>
                    Copyright <Icon type="copyright" /> 嘉兴市规划设计研究院有限公司
                  </Fragment>
                }
              />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(MyNewLayout1);
