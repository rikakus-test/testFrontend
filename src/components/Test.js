import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Switch, Button } from "antd";
import AxiosRequest from "../helper/AxiosRequest";

const AddDataModal = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [form] = Form.useForm();

        useEffect(() => {
            props.showModal()
                }, [visible]);

  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);
  const handleSubmit = () => {
    form.validateFields().then((a) => {
      console.log("Submitted Data:", a);
            AxiosRequest.PostAxiosRequest("/items", { ...a, status: a.status == true ? 1 : 0 })
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                form.resetFields()
                setVisible(false);
              });
            });
    };

  return (
    <div>
        <Button type="primary" onClick={showModal}>
        Add Data
      </Button>
      <Modal
        title="Add Data"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: "10px" }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddDataModal;