import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Card, Button, Row, Col, Switch,List, Modal, Spin } from 'antd';
import { UserOutlined, SettingOutlined, PoweroffOutlined, PlusOutlined, HomeOutlined, LaptopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AxiosRequest from '../helper/AxiosRequest';
import AddDataModal from '../components/Test';

const { Header, Content, Sider } = Layout;

const menu = (toggleView) => (
  <Menu>
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Logout</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={toggleView}>
      Toggle View
    </Menu.Item>
  </Menu>
);

const Admin = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

    const getData = () => {
      setIsLoading(true);
      AxiosRequest.GetAxiosRequest("/arduinos")
        .then((res) => {
          if (res.status === 200) {
            setDataSource(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setDataSource([]);

        })
        .finally(() => {
          setIsLoading(false);
        });
    };

      useEffect(() => {
        getData();
        console.log(props)
      }, []);
      useEffect(() => {
        if(!props.visible){
          getData();
        }
      }, [props.visible]);
  const toggleStatus = (a) => {
    setIsLoading(true);
    setDataSource(dataSource.map(item => item.id === a.id ? { ...item, status: item.status == 0 ? 1 : 0 } : item));
          AxiosRequest.PutAxiosRequest("/itemstatus/"+a.id, { ...a, status: a.status == 0 ? 1 : 0 })
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              setDataSource(dataSource.map(item => item.id === a.id ? { ...item, status: item.status == 0 ? 1 : 0 } : item));
              console.log(err);
            })
            .finally(() => {
              getData();
            });
  };
  const deleteData = (id) => {
    setIsLoading(true);
            AxiosRequest.DeleteAxiosRequest("/items/" + id)
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                getData();

              });
  }
  const testr = true
  const settingMenu= (item) => (
    <Menu>
      <Menu.Item key="1"><Button onClick={()=>deleteData(item.id)}>Delete</Button></Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );
  return (

        <Content style={{ padding: '20px' }}>
      {IsLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999,
          }}
        >
          <Spin size="large" />
        </div>
      )}
          { props.isGrid ? (
            <Row gutter={[16, 16]}>
              {dataSource.map(item => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                  <Card title={item.name} bordered>
                    <div style={{ display: 'flex', aligndataSource: 'center', gap: '16px' }}>
                      <Switch
                        checked={item.status}
                        onChange={() => toggleStatus(item)}
                        checkedChildren={<PoweroffOutlined />}
                        unCheckedChildren={<PoweroffOutlined />}
                        style={{ transform: 'scale(1.5)' }}
                      />
                      <Dropdown overlay={()=>settingMenu(item)} placement="bottomLeft">
                        <Button icon={<SettingOutlined />}>Settings</Button>
                      </Dropdown>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <List
              dataSource={dataSource}
              renderItem={item => (
                <List.Item>
                  <Card title={item.name} bordered style={{ width: '100%' }}>
                    <div style={{ display: 'flex', aligndataSource: 'center', gap: '16px' }}>
                      <Switch
                        checked={item.status}
                        onChange={() => toggleStatus(item.id)}
                        checkedChildren={<PoweroffOutlined />}
                        unCheckedChildren={<PoweroffOutlined />}
                        style={{ transform: 'scale(1.5)' }}
                      />
                      <Dropdown overlay={settingMenu} placement="bottomLeft">
                        <Button icon={<SettingOutlined />}>Settings</Button>
                      </Dropdown>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Content>

  );
};

export default Admin;
