import React, { useState } from "react";
import "../../assets/styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";

export default function Forget() {
  const [form] = Form.useForm();
  const [forms, setForms] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    AxiosRequest.PostAxiosRequest("/password", forms)
      .then((res) => {
        if (res.data.status === "success") {
          navigate(
            `/password?id=${res.data.data.result[0].id}&email=${forms.email}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onCheck = async (e) => {
    try {
      const values = await form.validateFields();
      onSubmit(e);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <section className="auth"></section>
        </Col>

        <Col span={12} style={{ backgroundColor: "#848484" }}>
          <div className="hero">
            <form
              style={{
                width: "100%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: "15px",
                padding: "10px 70px 10px 70px",
              }}
            >
              <h3>Lupa Kata Sandi?</h3>
              <h6>Kirim Email Untuk Mengubah Kata Sandi</h6>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={form}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Tolong Masukan Email!" }]}
                >
                  <Input
                    onChange={(e) =>
                      setForms({ ...forms, email: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    loading={isLoading}
                    style={{ backgroundColor: "#066A19", color: "white" }}
                    onClick={(e) => {
                      onCheck(e);
                    }}
                  >
                    Kirim Email
                  </Button>
                </Form.Item>
              </Form>

              <p
                style={{
                  color: "#7E98DF",
                  textAlign: "right",
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                <Link to="/login" style={{ color: "#7E98DF" }}>
                  Kembali
                </Link>
              </p>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}
