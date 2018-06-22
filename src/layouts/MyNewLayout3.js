import React, { Fragment } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { getMenuData } from '../common/menu';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import NotFound from '../routes/Exception/404';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import style from './MyNewLayout.less';
import GlobalFooter from '../components/GlobalFooter';

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
getMenuData().forEach(getRedirect);

class MyNewLayout3 extends React.PureComponent {
  constructor(ps) {
    super(ps);
    this.state = {
      nav: 'nav1',
      // defaultSelectedKeys: ['1'],
      // defaultOpenKeys: ['nav1_subnav1']
    };
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
  clickHeaderMenu = (item, key, keyPath) => {
    this.setState({ nav: item.key });
    // switch (item.key) {
    //     case 'nav1':
    //         this.setState({ nav: item.key, defaultSelectedKeys: ['1'], defaultOpenKeys: ['nav1_subnav1'] });
    //         break;
    //     case 'nav2':
    //         this.setState({ nav: item.key, defaultSelectedKeys: ['7'], defaultOpenKeys: ['nav2_subnav1'] });
    //         break;
    //     case 'nav3':
    //         this.setState({ nav: item.key, defaultSelectedKeys: ['13'], defaultOpenKeys: ['nav3_subnav1'] });
    //         break;
    //     default:
    //         break;
    // }
    //模拟点击nav2_subnav1的option1选项
  };
  // testClick = () => {
  //     debugger;
  //     switch (this.state.nav) {
  //         case 'nav1':
  //             this.setState({ defaultSelectedKeys: ['1'], defaultOpenKeys: ['nav1_subnav1'] });
  //             break;
  //         case 'nav2':
  //             this.setState({ defaultSelectedKeys: ['7'], defaultOpenKeys: ['nav2_subnav1'] });
  //             break;
  //         case 'nav3':
  //             this.setState({ defaultSelectedKeys: ['13'], defaultOpenKeys: ['nav3_subnav1'] });
  //             break;
  //         default:
  //             break;
  //     }
  // }
  render() {
    const { routerData, match } = this.props;
    const bashRedirect = this.getBashRedirect();

    // const SiderMenu1 = <Menu
    //     mode="inline"
    //     defaultSelectedKeys={['1']}
    //     defaultOpenKeys={['nav1_subnav1']}
    //     style={{ height: '100%', borderRight: 0 }}
    // >
    //     <SubMenu key="nav1_subnav1" title={<span><Icon type="user" />nav1_subnav1</span>}>
    //         <Menu.Item key="1"><Link to="/mynew/nav1/subnav1/option1">option1</Link></Menu.Item>
    //         <Menu.Item key="2"><Link to="/mynew/nav1/subnav1/option2">option2</Link></Menu.Item>
    //     </SubMenu>
    //     <SubMenu key="nav1_subnav2" title={<span><Icon type="laptop" />nav1_subnav2</span>}>
    //         <Menu.Item key="3"><Link to="/mynew/nav1/subnav2/option3">option3</Link></Menu.Item>
    //         <Menu.Item key="4"><Link to="/mynew/nav1/subnav2/option4">option4</Link></Menu.Item>
    //     </SubMenu>
    //     <SubMenu key="nav1_subnav3" title={<span><Icon type="notification" />nav1_subnav3</span>}>
    //         <Menu.Item key="5"><Link to="/mynew/nav1/subnav3/option5">option5</Link></Menu.Item>
    //         <Menu.Item key="6"><Link to="/mynew/nav1/subnav3/option6">option6</Link></Menu.Item>
    //     </SubMenu>
    // </Menu>;
    // const SiderMenu2 = <Menu
    //     mode="inline"
    //     defaultSelectedKeys={['7']}
    //     defaultOpenKeys={['nav2_subnav1']}
    //     style={{ height: '100%', borderRight: 0 }}
    // >
    //     <SubMenu key="nav2_subnav1" title={<span><Icon type="user" />nav2_subnav1</span>}>
    //         <Menu.Item key="7"><Link to="/mynew/nav2/subnav1/option1">option1</Link></Menu.Item>
    //         <Menu.Item key="8"><Link to="/mynew/nav2/subnav1/option2">option2</Link></Menu.Item>
    //     </SubMenu>
    //     <SubMenu key="nav2_subnav2" title={<span><Icon type="laptop" />nav2_subnav2</span>}>
    //         <Menu.Item key="9"><Link to="/mynew/nav2/subnav2/option3">option3</Link></Menu.Item>
    //         <Menu.Item key="10"><Link to="/mynew/nav2/subnav2/option4">option4</Link></Menu.Item>
    //     </SubMenu>
    //     <SubMenu key="nav2_subnav3" title={<span><Icon type="notification" />nav2_subnav3</span>}>
    //         <Menu.Item key="11"><Link to="/mynew/nav2/subnav3/option5">option5</Link></Menu.Item>
    //         <Menu.Item key="12"><Link to="/mynew/nav2/subnav3/option6">option6</Link></Menu.Item>
    //     </SubMenu>
    // </Menu>;
    const SiderMenu3 = (
      <Menu
        mode="inline"
        defaultSelectedKeys={['13']}
        defaultOpenKeys={['nav3_subnav1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key="nav3_subnav1"
          title={
            <span>
              <Icon type="user" />nav3_subnav1
            </span>
          }
        >
          <Menu.Item key="13">
            <Link to="/mynew3/nav3/subnav1/option1">option1</Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link to="/mynew3/nav3/subnav1/option2">option2</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="nav3_subnav2"
          title={
            <span>
              <Icon type="laptop" />nav3_subnav2
            </span>
          }
        >
          <Menu.Item key="15">
            <Link to="/mynew3/nav3/subnav2/option3">option3</Link>
          </Menu.Item>
          <Menu.Item key="16">
            <Link to="/mynew3/nav3/subnav2/option4">option4</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="nav3_subnav3"
          title={
            <span>
              <Icon type="notification" />nav3_subnav3
            </span>
          }
        >
          <Menu.Item key="17">
            <Link to="/mynew3/nav3/subnav3/option5">option5</Link>
          </Menu.Item>
          <Menu.Item key="18">
            <Link to="/mynew3/nav3/subnav3/option6">option6</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );

    return (
      <Layout>
        <Header className="header" style={{ background: '#002140' }}>
          <div key="logo" className={style.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1>Ant Design Pro</h1>
            </Link>
          </div>
          {/* <button onClick={this.testClick} style={{position:'absolute',left:'40px'}}>测试按钮</button> */}
          <Menu
            className={style.nav}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['nav3']}
            style={{ lineHeight: '64px', background: '#002140' }}
            onClick={this.clickHeaderMenu}
          >
            <Menu.Item key="nav1">
              <Link to="/mynew1/nav1/subnav1/option1">nav1</Link>
            </Menu.Item>
            <Menu.Item key="nav2">
              <Link to="/mynew2/nav2/subnav1/option1">nav2</Link>
            </Menu.Item>
            <Menu.Item key="nav3">
              <Link to="/mynew3/nav3/subnav1/option1">nav3</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            {SiderMenu3}
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 20, minHeight: 280 }}>
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
export default MyNewLayout3;
