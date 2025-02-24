import React, { useEffect, useState } from "react";
import "../../assets/styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";
import Swal from "sweetalert2";

export default function NewPasswword() {
  const [form] = Form.useForm();
  const [forms, setForms] = useState({
    token: "",
    password: "",
    confirm: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    const id = new URLSearchParams(window.location.search).get("id");
    console.log(forms);
    AxiosRequest.PostAxiosRequest("/forgot", { ...forms, id })
      .then((res) => {
        console.log(res.data.status === "success");
        if (res.data.status === "failed") {
          setErrors([{ msg: res.data.error }]);
        } else if (res.data.status === "success") {
          Swal.fire({
            title: "Berhasil",
            text: "Kata Sandi Berhasil Diubah!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#066A19",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      navigate("/");
    } else {
      const token = new URLSearchParams(window.location.search).get("token");
      if (token) {
        form.setFieldsValue({ token: token });
        setForms({
          ...forms,
          token: token,
        });
        console.log(form.getFieldValue("token"));
      }
    }
  }, []);
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
                // autoComplete="off"
              >
                <Form.Item
                  label="Token"
                  name="token"
                  valuePropName="token"
                  rules={[{ required: true, message: "Tolong Masukan Token!" }]}
                >
                  <Input
                    name="token"
                    value={forms.token}
                    onChange={(e) => {
                      console.log("jalan");
                      if (e.target.value.length < 7) {
                        console.log("jalam 2");
                        form.setFieldValue({ token: e.target.value });
                        setForms({
                          ...forms,
                          token: e.target.value,
                        });
                      }
                    }}
                  />{" "}
                </Form.Item>

                <Form.Item
                  label="New Password"
                  name="password"
                  rules={[
                    { required: true, message: "Tolong Masukan Kata Sandi!" },
                    {
                      min: 8,
                      message: "Kata Sandi minimal 8 Karakter",
                    },
                    {
                      pattern: new RegExp(
                        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                      ),
                      message:
                        "Kata Sandi harus Berisi Setidaknya Satu Huruf Kecil, Huruf Besar, dan Spesial Karakter",
                    },
                  ]}
                >
                  <Input.Password
                    onChange={(e) => {
                      setForms({
                        ...forms,
                        password: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Konfirmasi"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Tolong Masukan Kata Sandi!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Kata Sandi Harus Sama!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    onChange={(e) => {
                      setForms({
                        ...forms,
                        confirm: e.target.value,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    loading={isLoading}
                    type="primary"
                    style={{ backgroundColor: "#066A19", color: "white" }}
                    onClick={(e) => {
                      onCheck(e);
                    }}
                  >
                    Kirim
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
                <Link to="/forget" style={{ color: "#7E98DF" }}>
                  Kembali
                </Link>
              </p>
              {errors.length > 0 && (
                <div
                  className="alert alert-danger mx-0"
                  style={{ width: "100%" }}
                >
                  <ul className="m-0">
                    {errors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}
