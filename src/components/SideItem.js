import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

export default function SideItem(props) {
  const { link, isCollapse, title, icon } = props;
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Row>
        <Col span={24}>
          <Title
            level={4}
            style={{
              color: "white",
              marginTop: "10px",
            }}
          >
            {title}
          </Title>
        </Col>
      </Row>
    </Link>
  );
}
