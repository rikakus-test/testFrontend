import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Button,
  Row,
  Col,
  Switch,
  List,
  Dropdown,
  Menu,
  Spin,
  Space,
} from "antd";
import {
  SettingOutlined,
  PoweroffOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import AxiosRequest from "../helper/AxiosRequest";
import AddEditArduinoModal from "../components/Modal/Arduino";

const { Content } = Layout;
const { Meta } = Card;

const Arduino = ({ visible, isGrid, setIsGrid }) => {
  /* ===================== STATE ===================== */
  const [arduinos, setArduinos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedArduino, setSelectedArduino] = useState(null);

  /* ===================== API ===================== */
  const fetchArduinos = async () => {
    setLoading(true);
    try {
      const res = await AxiosRequest.GetAxiosRequest("/arduino");
      if (res.status === 200) {
        setArduinos(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setArduinos([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (arduino) => {
    const newStatus = arduino.status === 1 ? 0 : 1;

    // optimistic UI
    setArduinos((prev) =>
      prev.map((item) =>
        item.id === arduino.id ? { ...item, status: newStatus } : item
      )
    );

    try {
      await AxiosRequest.PutAxiosRequest(`/arduino`, {
        ...arduino,
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
      fetchArduinos(); // rollback aman
    }
  };

  const deleteArduino = async (id) => {
    setLoading(true);
    try {
      await AxiosRequest.DeleteAxiosRequest(`/arduino/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      fetchArduinos();
    }
  };

  /* ===================== EFFECT ===================== */
  useEffect(() => {
    fetchArduinos();
  }, []);

  useEffect(() => {
    if (!visible) fetchArduinos();
  }, [visible]);

  /* ===================== UI HANDLER ===================== */
  const openAdd = () => {
    setModalMode("add");
    setSelectedArduino(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setModalMode("edit");
    setSelectedArduino(item);
    setModalOpen(true);
  };

  const settingMenu = (item) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => openEdit(item)}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" danger onClick={() => deleteArduino(item.id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  /* ===================== RENDER ===================== */
  return (
    <Content style={{ padding: 20 }}>
      {/* Header Action */}
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openAdd}>
          Add Arduino
        </Button>
      </Space>

      {/* Modal */}
      <AddEditArduinoModal
        open={modalOpen}
        mode={modalMode}
        initialData={selectedArduino}
        onCancel={() => setModalOpen(false)}
        onSuccess={fetchArduinos}
      />

      {/* Loader */}
      {loading && (
        <div className="fullscreen-loader">
          <Spin size="large" />
        </div>
      )}

      {/* Grid View */}
      {isGrid ? (
        <Row gutter={[16, 16]}>
          {arduinos.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Card
                actions={[
                  <Switch
                    checked={item.status === 1}
                    onChange={() => toggleStatus(item)}
                    checkedChildren={<PoweroffOutlined />}
                    unCheckedChildren={<PoweroffOutlined />}
                  />,
                  <Button onClick={() => openEdit(item)}>Edit</Button>,
                  <Button danger onClick={() => deleteArduino(item.id)}>
                    Delete
                  </Button>,
                ]}
              >
                <Meta title={item.name} description={item.tab_ip || "-"} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        /* List View */
        <List
          dataSource={arduinos}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Nama */}
                  <span style={{ fontWeight: 500 }}>{item.name}</span>

                  {/* Button group */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <Switch
                      checked={item.status === 1}
                      onChange={() => toggleStatus(item)}
                      checkedChildren={<PoweroffOutlined />}
                      unCheckedChildren={<PoweroffOutlined />}
                    />
                    ,
                    <Button size="small" onClick={() => openEdit(item)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      danger
                      onClick={() => deleteArduino(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </Content>
  );
};

export default Arduino;
