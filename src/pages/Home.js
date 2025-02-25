import React from "react";
import { Carousel, Col, Image, Row } from "antd";
import "../assets/image/ari.jpg";
import "../assets/image/diven.jpg";
import { Link } from "react-router-dom";
const diven = require("../assets/image/diven.jpg");
const ari = require("../assets/image/ari.jpg");

const Home = () => {
  return (
    <div
      style={{
        // width: "100vw",
        // height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Row gutter={24}>
        <Col>
          <Image src={diven} width={250}></Image>
        </Col>
        <Col >
          <h1 style={{ fontWeight: "bolder" }}>Kiri Diven</h1>
          <h1 style={{ fontWeight: "bolder" }}>Kanan Pak ari</h1>

          <h3 style={{ fontWeight: "bold" }}>YHAHAHAHa</h3>
          <Link to="/devices">masuk ke test</Link>
        </Col>
        <Col>
          <Image src={ari} width={250}></Image>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
