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
import AddEditDeviceModal from "../components/Modal/Device";

const { Content } = Layout;
const { Meta } = Card;

const Device = ({ visible, isGrid, setIsGrid }) => {
  /* ===================== STATE ===================== */
  const [arduinos, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedDevice, setSelectedDevice] = useState(null);

  /* ===================== API ===================== */
  const fetchDevices = async () => {
    setLoading(true);
    try {
      const res = await AxiosRequest.GetAxiosRequest("/device");
      if (res.status === 200) {
        setDevices(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setDevices([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (arduino) => {
    const newStatus = arduino.status === 1 ? 0 : 1;

    // optimistic UI
    setDevices((prev) =>
      prev.map((item) =>
        item.id === arduino.id ? { ...item, status: newStatus } : item
      )
    );

    try {
      await AxiosRequest.PutAxiosRequest(`/device`, {
        ...arduino,
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
      fetchDevices(); // rollback aman
    }
  };

  const deleteDevice = async (id) => {
    setLoading(true);
    try {
      await AxiosRequest.DeleteAxiosRequest(`/device/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      fetchDevices();
    }
  };

  /* ===================== EFFECT ===================== */
  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (!visible) fetchDevices();
  }, [visible]);

  /* ===================== UI HANDLER ===================== */
  const openAdd = () => {
    setModalMode("add");
    setSelectedDevice(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setModalMode("edit");
    setSelectedDevice(item);
    setModalOpen(true);
  };

  const settingMenu = (item) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => openEdit(item)}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" danger onClick={() => deleteDevice(item.id)}>
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
          Add Device
        </Button>
      </Space>

      {/* Modal */}
      <AddEditDeviceModal
        open={modalOpen}
        mode={modalMode}
        initialData={selectedDevice}
        onCancel={() => setModalOpen(false)}
        onSuccess={fetchDevices}
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
                  <Button danger onClick={() => deleteDevice(item.id)}>
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
                      onClick={() => deleteDevice(item.id)}
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

export default Device;
