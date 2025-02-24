import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../assets/styles/auth.css";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";

export default function Login() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState({
    email: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(forms);
    AxiosRequest.PostAxiosRequest("/login", forms)
      .then((res) => {
        if (res.data.status === "failed") {
          setErrors([{ msg: res.data.error }]);
        } else if (res.data.status === "success") {
          localStorage.setItem("token", JSON.stringify(res.data.data));
          navigate("/");
        }
        console.log(res.data);
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
              <h3>Masuk</h3>
              <h6>Hi, Selamat Masuk!</h6>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
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

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Tolong Masukan Password!" },
                  ]}
                >
                  <Input.Password
                    onChange={(e) =>
                      setForms({ ...forms, password: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    style={{ backgroundColor: "#066A19", color: "white" }}
                    onClick={(e) => {
                      onCheck(e);
                    }}
                  >
                    Masuk
                  </Button>
                </Form.Item>
              </Form>
              <p style={{ textAlign: "center", width: "100%" }}>
                Belum Punya Akun?
                <Link
                  to="/register"
                  style={{ paddingLeft: "10px", color: "#7E98DF" }}
                >
                  Daftar
                </Link>
              </p>
              <p
                style={{
                  color: "#7E98DF",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Link to="/forget" style={{ color: "#7E98DF" }}>
                  Lupa Kata Sandi?
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
              {isLoading ? (
                <button
                  className="btn btn-success btn-lg ms-2"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Loading...
                </button>
              ) : (
                " "
                // <Button type="submit" title="Login" />
              )}
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}
