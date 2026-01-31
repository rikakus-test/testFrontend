import React, { useEffect } from "react";
import { Modal, Form, Input, Switch, Button } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";

const AddEditDeviceModal = ({
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
        arduino_id: initialData.arduino_id,
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
        arduino_id: values.arduino_id,
        name: values.name,
        status: values.status ? 1 : 0,
      };

      if (mode === "add") {
        await AxiosRequest.PostAxiosRequest("/device", payload);
      } else {
        await AxiosRequest.PutAxiosRequest(`/device`, {
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
      title={mode === "add" ? "Add Device" : "Edit Device"}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Arduino ID"
          name="arduino_id"
          rules={[{ required: true, message: "Arduino ID wajib diisi" }]}
        >
          <Input placeholder="Masukkan Arduino ID" />
        </Form.Item>

        <Form.Item
          label="Device Name"
          name="name"
          rules={[{ required: true, message: "Nama Device wajib diisi" }]}
        >
          <Input placeholder="Masukkan nama Device" />
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

export default AddEditDeviceModal;
