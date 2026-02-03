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
  Divider,
} from "antd";
import { SettingOutlined, PoweroffOutlined } from "@ant-design/icons";
import AxiosRequest from "../helper/AxiosRequest";
import AddEditHomeModal from "../components/Modal/Home";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Meta } = Card;

const HomeRelated = ({ visible, isGrid, menuItems, setMenuItems }) => {
  const [homes, setHomes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedHome, setSelectedHome] = useState(null);

  /* ===================== API ===================== */
  const getHomes = async () => {
    setIsLoading(true);
    const loc = window.location.pathname;
    try {
      const res = await AxiosRequest.GetAxiosRequest("/home/expanded" + loc);
      if (res.status === 200 && res.data.code !== 404) {
        setHomes(res.data.data);
      } else {
        setHomes({});
      }
    } catch (err) {
      console.error(err);
      setHomes({});
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
    console.log("ini log di home");
    console.log(menuItems.length);
    if (menuItems.length == 0) {
      setMenuItems([...menuItems, home]);
    } else {
      menuItems.map((items) => {
        if (items.id == home.id) {
          navigate("/" + home.id);
        } else {
          console.log("inikalan");

          setMenuItems([...menuItems, home]);
        }
      });
    }
    console.log(menuItems);
  };
  const Section = ({ title, children }) => (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );

  /* ===================== RENDER ===================== */
  return (
    <Content style={{ padding: 20 }}>
      {/* <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openAdd}>
          Add Home
        </Button>
      </Space> */}

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
      <Card style={{ width: "100%" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <strong>{homes.name}</strong>
          <div style={{ display: "flex", gap: 6 }}>
            <Button size="small" onClick={() => openEdit(homes)}>
              Edit
            </Button>
            <Button size="small" danger onClick={() => deleteHome(homes.id)}>
              Delete
            </Button>
          </div>
        </div>

        {/* USERS */}
        <Section title="Users">
          {homes.users?.length ? (
            homes.users.map((u) => (
              <div key={u.id} style={{ fontSize: 13 }}>
                • {u.username}
              </div>
            ))
          ) : (
            <span style={{ color: "#999" }}>No users</span>
          )}
        </Section>

        {/* ARDUINO */}
        {homes.arduino?.length ? (
          homes.arduino.map((a) => (
            <>
            <Divider></Divider>
              <Section title="Arduino">
                <div
                  key={a.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                  }}
                >
                  <span>{a.name}</span>
                  <Switch size="small" checked={a.status === 1} disabled />
                </div>
              </Section>

              <Section title="Device">
                {a?.devices?.length ? (
                  a.devices.map((a) => (
                    <>
                      <div
                        key={a.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 13,
                        }}
                      >
                        <span>{a.name}</span>
                        <Switch
                          size="small"
                          checked={a.status === 1}
                          disabled
                        />
                      </div>
                    </>
                  ))
                ) : (
                  <span style={{ color: "#999" }}>No device</span>
                )}
              </Section>
            </>
          ))
        ) : (
          <span style={{ color: "#999" }}>No arduino</span>
        )}
      </Card>
    </Content>
  );
};

export default HomeRelated;
