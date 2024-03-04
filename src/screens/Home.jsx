import React from 'react';
import { View } from "@aws-amplify/ui-react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
   (icon, index) => ({
     key: String(index + 1),
     icon: React.createElement(icon),
     label: `nav ${index + 1}`,
   }),
 );
function Home(props) {
   const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
   return (
      <>
      <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
         <Header style={{ padding: 0, background: colorBgContainer }}>Module Stuff</Header>
         <Content style={{ margin: '24px 16px 0' }}>
         <div>
            <h2>Header</h2>
            <Button type="primary">Button</Button>
            <p>I'm a paragraph!</p>
         </div>
         </Content>
         </Layout>
      </Layout>
      </>
   )
}

export default Home;