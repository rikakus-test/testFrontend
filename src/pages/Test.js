import React from "react";
import { Result, Button } from "antd";
import { ToolOutlined } from "@ant-design/icons";

const Test = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Result
        icon={<ToolOutlined style={{ color: "#faad14" }} />}
        title="Maintenance"
        subTitle="Halaman ini sedang dalam perbaikan. Silakan kembali lagi nanti."
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        }
      />
    </div>
  );
};

export default Test;
