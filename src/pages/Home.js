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
import { SettingOutlined, PoweroffOutlined } from "@ant-design/icons";
import AxiosRequest from "../helper/AxiosRequest";
import AddEditHomeModal from "../components/Modal/Home";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const { Content } = Layout;
const { Meta } = Card;

const Home = ({ visible, isGrid, menuItems, setMenuItems }) => {
  const [homes, setHomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedHome, setSelectedHome] = useState(null);

  /* ===================== API ===================== */
  const getHomes = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosRequest.GetAxiosRequest("/home");

      if (res.status === 200 && res.data.code !== 404) {
        setHomes(res.data.data);
      } else {
        setHomes([]);
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: "Silakan coba lagi beberapa saat.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.error(err);
      setHomes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (home) => {
    const newStatus = home.status === 0 ? 1 : 0;

    // optimistic update
    setHomes((prev) =>
      prev.map((item) =>
        item.id === home.id ? { ...item, status: newStatus } : item,
      ),
    );

    try {
      await AxiosRequest.PutAxiosRequest(`/home/${home.id}`, {
        ...home,
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
      // rollback
      setHomes((prev) =>
        prev.map((item) =>
          item.id === home.id ? { ...item, status: home.status } : item,
        ),
      );
    } finally {
      getHomes();
    }
  };

  const deleteHome = async (id) => {
    setIsLoading(true);
    try {
      await AxiosRequest.DeleteAxiosRequest(`/home/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      getHomes();
    }
  };

  /* ===================== EFFECT ===================== */
  useEffect(() => {
    getHomes();
    console.log("ini jalan");
    }, [window.location.pathname]);

  /* ===================== UI HANDLER ===================== */
  const openAdd = () => {
    setMode("add");
    setSelectedHome(null);
    setOpen(true);
  };

  const openEdit = (home) => {
    setMode("edit");
    setSelectedHome(home);
    setOpen(true);
  };

  const handleAddMenu = (home) => {
    const exists = menuItems.some((item) => item.id === home.id);

    if (exists) {
      navigate("/" + home.id);
      return;
    }

    setMenuItems((prev) => [...prev, home]);
    navigate("/" + home.id);
  };

  /* ===================== RENDER ===================== */
  return (
    <Content style={{ padding: 20 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openAdd}>
          Add Home
        </Button>
      </Space>

      <AddEditHomeModal
        open={open}
        mode={mode}
        initialData={selectedHome}
        onCancel={() => setOpen(false)}
        onSuccess={getHomes}
      />

      {isLoading && (
        <div className="fullscreen-loader">
          <Spin size="large" />
        </div>
      )}

      {isGrid ? (
        <Row gutter={[16, 16]}>
          {homes.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Card
                actions={[
                  <Button size="small" onClick={() => handleAddMenu(item)}>
                    Open
                  </Button>,
                  <Button size="small" onClick={() => openEdit(item)}>
                    Edit
                  </Button>,
                  <Button
                    size="small"
                    danger
                    onClick={() => deleteHome(item.id)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Meta title={item.name} description={item.tab_ip} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <List
          dataSource={homes}
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
                    <Button size="small" onClick={() => handleAddMenu(item)}>
                      Open
                    </Button>
                    <Button size="small" onClick={() => openEdit(item)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      danger
                      onClick={() => deleteHome(item.id)}
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

export default Home;
