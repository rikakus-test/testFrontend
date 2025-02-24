import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Card, Button, Row, Col, Switch } from 'antd';
import { UserOutlined, SettingOutlined, EditOutlined, PoweroffOutlined, DeleteOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Logout</Menu.Item>
  </Menu>
);

const settingMenu = (
  <Menu>
    <Menu.Item key="1"><Button icon={<EditOutlined />}>Update</Button>
    </Menu.Item>
    <Menu.Item key="2"><Button icon={<DeleteOutlined />}>Delete</Button>
    </Menu.Item>
  </Menu>
);

const data = [
  { id: 1, name: 'Item 1', status: true },
  { id: 2, name: 'Item 2', status: false },
  { id: 3, name: 'Item 3', status: true },
  { id: 4, name: 'Item 4', status: false },
];

const Test = () => {
  const [items, setItems] = useState(data);

  const toggleStatus = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, status: !item.status } : item));
  };

  return (
    <Layout>
      {/* Header */}
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529', padding: '0 20px' }}>
        <h2 style={{ color: 'white' }}>Dashboard</h2>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      
      {/* Content */}
      <Content style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
          {items.map(item => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Card title={item.name} bordered>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Switch
                    checked={item.status}
                    onChange={() => toggleStatus(item.id)}
                    checkedChildren={<PoweroffOutlined />}
                    unCheckedChildren={<PoweroffOutlined />}
                    style={{ transform: 'scale(1.5)' }}
                  />
                  <Dropdown overlay={settingMenu} placement="bottomLeft">
                    <Button icon={<SettingOutlined />}>Settings</Button>
                  </Dropdown>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default Test;
