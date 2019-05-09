import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const IndexPage = ({content}) => {

  return (
    <Layout>
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight : '64px' }}
      >
        <Menu.Item key="data"><Link to="/data">数据</Link></Menu.Item>    
        <Menu.Item key="user"><Link to="/user">用户管理</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{margin : '16px 0', padding : '0 50px' }}>
      {content}
    </Content>
    <Footer style={{ textAlign : 'center' }}>
      Ant Design ©2018 Created by mozgh
    </Footer>
  </Layout>
  );
}

IndexPage.propTypes = {
  
};

export default connect()(IndexPage);
 