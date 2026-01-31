import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";

const AddEditHomeModal = ({
  open,
  mode = "add", // "add" | "edit"
  initialData = null, // { id, name }
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  // Set form value saat edit
  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.setFieldsValue({
        name: initialData.name,
      });
    } else {
      form.resetFields();
    }
  }, [mode, initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (mode === "add") {
        await AxiosRequest.PostAxiosRequest("/home", values);
      } else {
        await AxiosRequest.PutAxiosRequest(`/home`, {
          id: initialData.id,
          name: values.name,
        });
      }

      form.resetFields();
      onSuccess?.();
      onCancel();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title={mode === "add" ? "Tambah Home" : "Edit Home"}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nama Home"
          name="name"
          rules={[{ required: true, message: "Nama Home wajib diisi" }]}
        >
          <Input placeholder="Masukkan nama home" />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Batal
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            {mode === "add" ? "Tambah" : "Simpan"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditHomeModal;
