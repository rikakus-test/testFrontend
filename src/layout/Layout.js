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
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Grid } from "antd";

const { Header, Sider, Content } = Layout;

export default function AntdLayoutPage(props) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("/");

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md; // md ke bawah dianggap mobile

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const userMenu = (toggleView) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          console.log(current);
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={toggleView}>
        {props.isGrid ? <AppstoreOutlined /> : <MenuOutlined />}
      </Menu.Item>
    </Menu>
  );
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.key);
  };

  const toggleView = () => {
    props.setIsGrid(!props.isGrid);
  };

  const [menuItems, setMenuItems] = useState([]);
  const items = [
    {
      key: "/",
      label: "dashboard",
      icon: <MailOutlined />,
    },
    {
      key: "/home",
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      key: "/arduino",
      label: "Arduino",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/devices",
      label: "Device",
      icon: <AppstoreOutlined />,
    },
  ];

  // Handler hapus item
  const handleDelete = (key) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== key));
    props.setMenuItems((prev) => prev.filter((item) => item.id !== key));

    if (current === `/${key}`) {
      setCurrent("/home");
      navigate("/home");
    }
  };

  useEffect(() => {
    setMenuItems(props.menuItems);
  }, [props]);

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);

  const renderMenuItems = () => (
    <>
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}

      {menuItems.map((item) => (
        <Menu.Item key={`/${item.id}`} icon={<HomeOutlined />}>
          <span>{item.name}</span>
          <Button
            type="link"
            danger
            size="small"
            style={{
              position: "absolute",
              top: 5,
              right: 0,
              border: "white",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
          >
            <CloseOutlined />
          </Button>
        </Menu.Item>
      ))}
    </>
  );

  const BottomNavbar = ({ items, current, onNavigate }) => {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "#fff",
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          zIndex: 1000,
        }}
      >
        {items.map((item) => {
          const isActive = current === item.key;

          return (
            <div
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: isActive ? "#1677ff" : "#666",
                fontSize: 12,
                transition: "color 0.2s ease",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 2 }}>{item.icon}</div>
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>
    );
  };

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
            <Avatar
              style={{ backgroundColor: "#87d068", cursor: "pointer" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      </Header>
      <Layout>
        {!isMobile && (
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Menu
              theme={theme}
              mode="inline"
              selectedKeys={[current]}
              onClick={onClick}
            >
              {renderMenuItems()}
            </Menu>
          </Sider>
        )}
        {isMobile && (
          <BottomNavbar
            items={items}
            current={current}
            onNavigate={(key) => {
              setCurrent(key);
              navigate(key);
            }}
          />
        )}

        <Content
          style={{
            padding: isMobile ? "0" : "20px",
            paddingBottom: isMobile ? "80px" : "20px",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
