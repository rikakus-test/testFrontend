import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Card, Button, Row, Col, Switch,List, Modal, Spin } from 'antd';
import { UserOutlined, SettingOutlined, PoweroffOutlined, PlusOutlined, HomeOutlined, LaptopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AxiosRequest from '../helper/AxiosRequest';

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

const settingMenu = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
  </Menu>
);

const data = [
  { id: 1, name: 'Item 1', status: true },
  { id: 2, name: 'Item 2', status: false },
  { id: 3, name: 'Item 3', status: true },
  { id: 4, name: 'Item 4', status: false },
];

const Test = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

    const getData = () => {
      // setIsLoading(true);
      AxiosRequest.GetAxiosRequest("/items")
        .then((res) => {
          if (res.status === 200) {
            setDataSource(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // setIsLoading(false);
        });
    };

      useEffect(() => {
        getData();
        console.log(props)
      }, []);

  const toggleStatus = (a) => {
    setIsLoading(true);

    setDataSource(dataSource.map(item => item.id === a.id ? { ...item, status: item.status == 0 ? 1 : 0 } : item));
          AxiosRequest.PutAxiosRequest("/itemstatus/"+a.id, { ...a, status: a.status == 0 ? 1 : 0 })
            .then((res) => {
              console.log(res)

            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
              getData();

            });
  };
  const deleteData = (id) => {
            AxiosRequest.DeleteAxiosRequest("/items/" + id)
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                // setIsLoading(false);
              });
  }
  const testr = true

  return (

        <Content style={{ padding: '20px' }}>
                <Modal open={IsLoading} footer={null} closable={false} centered>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
          <p>Loading, please wait...</p>
        </div>
      </Modal>
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
                      <Dropdown overlay={settingMenu} placement="bottomLeft">
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

export default Test;
