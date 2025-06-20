import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  LaptopOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default function AntdLayoutPage(props) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('/');
  const changeTheme = value => {
    setTheme(value ? 'dark' : 'light');
  };
  const userMenu = (toggleView) => (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={toggleView}>{props.isGrid ? <AppstoreOutlined /> : <MenuOutlined />}</Menu.Item>
    </Menu>
  );
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(e.key);
  };

  const toggleView = () => {
    props.setIsGrid(!props.isGrid);
  };

  const [menuItems, setMenuItems] = useState([]);
  const items =     [{
    key: '/',
    label: 'test 1',
    icon: <MailOutlined />,
  },
  {
    key: '/home',
    label: 'Home',
    icon: <HomeOutlined />,
  },
  {
    key: '/devices',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
  }
  ];
  
  // Handler hapus item
  const handleDelete = (key) => {
    console.log(window.location.href);
    console.log(current);

    setMenuItems(prev => prev.filter(item => item.home_id !== key));
    props.setMenuItems(prev => prev.filter(item => item.home_id !== key));

    if (current === `/${key}`) {
      console.log("jalan");
      
      setCurrent('/home');
      navigate('/home');
    }
  };
      useEffect(() => {
        setMenuItems(props.menuItems);
        console.log(props)
      }, [props]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#001529",
          padding: "0 20px",
        }}
      >
        <h2 style={{ color: "white" }}>Dashboard</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Dropdown overlay={userMenu(toggleView)} placement="bottomRight">
            <Avatar style={{ backgroundColor: "#87d068", cursor: "pointer" }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
  theme={theme}
  onClick={onClick}
  selectedKeys={[current]}
  mode="inline"
>
{items.map(item => (
    <Menu.Item key={item.key} icon={item.icon} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span onClick={() => navigate(item.key)}>{item.label}</span>
    </Menu.Item>
  ))}
  {menuItems.map(item => (
    <Menu.Item key={`/${item.home_id}`} icon={<HomeOutlined></HomeOutlined>} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span onClick={() => navigate("/"+item.home_id)}>{item.home_name}</span>
      <Button
        type="link"
        danger
        size="small"
        onClick={(e) => {
          e.stopPropagation(); // agar tidak trigger navigate
          handleDelete(item.home_id);
        }}
      >
        <CloseOutlined />
      </Button>
    </Menu.Item>
  ))}
</Menu>

       </Sider>
        <Content style={{ padding: "20px" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
