import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PlusOutlined,
  HomeOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddDataModal from "../components/Test";

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


  const showModal = () => props.setVisible();

  const toggleView = () => {
    props.setIsGrid(!props.isGrid);
  };
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/devices");
        break;
      case "3":
        navigate("/profile");
        break;
      default:
        break;
    }
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
      <AddDataModal showModal={showModal}></AddDataModal>
          <Dropdown overlay={userMenu(toggleView)} placement="bottomRight">
            <Avatar style={{ backgroundColor: "#87d068", cursor: "pointer" }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
            <Menu.Item key="2" icon={<LaptopOutlined />}>Devices</Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>Profile</Menu.Item>
          </Menu>        </Sider>
        <Content style={{ padding: "20px" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
