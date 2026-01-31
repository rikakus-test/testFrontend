import React, { useEffect } from "react";
import { Modal, Form, Input, Switch, Button } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";

const AddEditArduinoModal = ({
  open,
  mode = "add", // "add" | "edit"
  initialData = null,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.setFieldsValue({
        home_id: initialData.home_id,
        name: initialData.name,
        status: initialData.status === 1,
      });
    } else {
      form.resetFields();
    }
  }, [mode, initialData, form]);

    const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        home_id: values.home_id,
        name: values.name,
        status: values.status ? 1 : 0,
      };

      if (mode === "add") {
        await AxiosRequest.PostAxiosRequest("/arduino", payload);
      } else {
          await AxiosRequest.PutAxiosRequest(`/arduino`, {
            ...payload,
            id: initialData.id,
          });
      }

      form.resetFields();
      onSuccess && onSuccess();
      onCancel();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={open}
      title={mode === "add" ? "Add Arduino" : "Edit Arduino"}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Home ID"
          name="home_id"
          rules={[{ required: true, message: "Home ID wajib diisi" }]}
        >
          <Input placeholder="Masukkan Home ID" />
        </Form.Item>

        <Form.Item
          label="Arduino Name"
          name="name"
          rules={[{ required: true, message: "Nama Arduino wajib diisi" }]}
        >
          <Input placeholder="Masukkan nama Arduino" />
        </Form.Item>

        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit}>
              {mode === "add" ? "Submit" : "Update"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditArduinoModal;
