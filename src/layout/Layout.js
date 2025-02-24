import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "1", icon: <UserOutlined />, label: "User" },
  { key: "2", icon: <VideoCameraOutlined />, label: "Camera" },
  { key: "3", icon: <UploadOutlined />, label: "Upload" },
];

const userMenu = (toggleView) => (
  <Menu>
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Logout</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={toggleView}>Toggle View</Menu.Item>
  </Menu>
);

export default function AntdLayoutPage(props) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setRole(token.role);
    }
    console.log(props)

  }, []);

  const toggleView = () => {
    props.setIsGrid(!props.isGrid);
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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/add")}>
            Add
          </Button>
          <Dropdown overlay={userMenu(toggleView)} placement="bottomRight">
            <Avatar style={{ backgroundColor: "#87d068", cursor: "pointer" }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={menuItems} />
        </Sider>
        <Content style={{ padding: "20px" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
