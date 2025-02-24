import React, { Component, useEffect, useState } from "react";
import { Row, Col, Button, Layout, Image } from "antd";
import SideItem from "../components/SideItem";
import bg from "../assets/image/bg.jpg";
import { Header } from "antd/es/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/image/puskesmas.png";

const { Content, Sider } = Layout;

export default function SideBar(props) {
  const navigate = useNavigate();
  const { children } = props;
  const [isCollapse, setIsCollapse] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setRole(token.role);
    }
    console.log(token);
  }, []);
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "dark",
  };

  return (
    <Layout>
      <Layout>
        <Header>
          <Row>
            <Col
              span={4}
              style={{ ...style, paddingTop: "10px" }}
              onClick={() => navigate("/")}
            >
              <img src={logo} width={40} alt="Logo"></img>
            </Col>
            {role === 0 ? (
              <>
                <Col span={6} style={style}>
                  <SideItem link="/" title="Beranda" />
                </Col>
                <Col span={6} style={style}>
                  <SideItem link="/admin" title="Admin" />
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "dark",
                  }}
                >
                  <Button
                    style={{ border: "none" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Keluar
                  </Button>
                </Col>
              </>
            ) : role === 1 ? (
              <>
                <Col span={4} style={style}>
                  <SideItem link="/" title="Beranda" />
                </Col>
                <Col span={4} style={style}>
                  <SideItem link="/periksa" title="Periksa" />
                </Col>
                <Col span={4} style={style}>
                  <SideItem link="/detail" title="Akun" />
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "dark",
                  }}
                >
                  <Button
                    style={{ border: "none" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Keluar
                  </Button>
                </Col>
              </>
            ) : role === 2 ? (
              <>
                <Col span={6} style={style}>
                  <SideItem link="/" title="Beranda" />
                </Col>
                <Col span={6} style={style}>
                  <SideItem link="/detail" title="Akun" />
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "dark",
                  }}
                >
                  <Button
                    style={{ border: "none" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Keluar
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col span={6} style={style}>
                  <SideItem link="/" title="Beranda" />
                </Col>
                <Col
                  span={14}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "dark",
                  }}
                >
                  <Button
                    style={{ border: "none" }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Masuk
                  </Button>
                  <Button
                    style={{ border: "none", marginLeft: "5px" }}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Daftar
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Header>
        <Content
          style={{
            // padding: "20px",
            height: "93vh",
            overflow: "auto",
            // backgroundImage: bg,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
