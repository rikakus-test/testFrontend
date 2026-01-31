import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../assets/styles/auth.css";
import { Button, Select, Col, Form, Input, Row, DatePicker } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";

const { Option } = Select;

export default function Register() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [forms, setForms] = useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(forms);
    AxiosRequest.PostAxiosRequest("/register", {
      home_id: "rumah-" + forms.username,
      pass: forms.password,
      username: forms.username,
      email: forms.email,
      role: "",
      token: "898989",
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "failed") {
          setErrors([{ msg: res.data.error }]);
        } else if (res.data.status === "success") {
          Swal.fire({
            title: "Berhasil Mendaftar",
            text: "Silahkan Login!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#066A19",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");

              // navigate(
              //   `/aktivasi?id=${res.data.data.id}&email=${forms.email}`
              // );
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

  return (
    <>
      <Row style={{ minHeight: "100vh" }}>
        {/* LEFT BANNER – HIDDEN DI MOBILE */}
        <Col xs={0} md={12} className="auth" />

        {/* FORM */}
        <Col
          xs={24}
          md={12}
          style={{
            backgroundColor: "#848484",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            className="hero"
            style={{
              width: "100%",
              maxWidth: 420,
              backgroundColor: "white",
              borderRadius: 16,
              padding: "30px 24px",
            }}
          >
            <h3>Daftar</h3>
            <h6>Hi, Selamat Mendaftar!</h6>
            <h6>Silahkan Isi Data!</h6>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              <h2 style={{ textAlign: "center", marginBottom: 8 }}>Daftar</h2>
              <p style={{ textAlign: "center", marginBottom: 24 }}>
                Buat akun baru
              </p>

              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Username wajib diisi" }]}
              >
                <Input
                  placeholder="Username"
                  onChange={(e) =>
                    setForms({ ...forms, username: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email wajib diisi" },
                  { type: "email", message: "Email tidak valid" },
                ]}
              >
                <Input
                  placeholder="Email"
                  onChange={(e) =>
                    setForms({ ...forms, email: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password wajib diisi" },
                  { min: 8, message: "Minimal 8 karakter" },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password"
                  onChange={(e) =>
                    setForms({ ...forms, password: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Konfirmasi Password"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Konfirmasi password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Password tidak sama"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Ulangi password"
                  onChange={(e) =>
                    setForms({ ...forms, confirmPassword: e.target.value })
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{
                  backgroundColor: "#066A19",
                  color: "white",
                  height: 44,
                }}
                onClick={(e) => {
                  onSubmit(e);
                }}
              >
                Masuk
              </Button>
            </Form>

            <p style={{ textAlign: "center", width: "100%" }}>
              Sudah Punya Akun?
              <Link
                to="/login"
                style={{ paddingLeft: "10px", color: "#7E98DF" }}
              >
                Masuk{" "}
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
          </div>
        </Col>
      </Row>
    </>
  );
}
