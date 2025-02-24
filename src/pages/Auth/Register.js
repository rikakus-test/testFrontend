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
    ktp: "",
    nama: "",
    noHp: "",
    jenisKelamin: "",
    agama: "",
    alamat: "",
    tanggalLahir: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(forms);
    AxiosRequest.PostAxiosRequest("/register", { ...forms, role: 2 })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "failed") {
          setErrors([{ msg: res.data.error }]);
        } else if (res.data.status === "success") {
          Swal.fire({
            title: "Berhasil Mendaftar",
            text: "Silahkan Cek Email Untuk Aktivasi Akun!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#066A19",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(
                `/aktivasi?id=${res.data.data.id}&email=${forms.email}`
              );
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
              <h3>Daftar</h3>
              <h6>Hi, Selamat Mendaftar!</h6>
              <h6>Silahkan Isi Data!</h6>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <Form.Item
                  label="No KTP"
                  name="ktp"
                  rules={[
                    { required: true, message: "Tolong Masukan No KTP!" },
                    {
                      max: 16,
                      message: "KTP Tidak Boleh Lebih Dari 16 Karakter",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setForms({ ...forms, ktp: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Nama"
                  name="nama"
                  rules={[{ required: true, message: "Tolong Masukan Nama!" }]}
                >
                  <Input
                    onChange={(e) =>
                      setForms({ ...forms, nama: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Nomor HP"
                  rules={[
                    {
                      required: true,
                      message: "Tolong Masukan Nomor Handphone!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={"+62"}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      setForms({ ...forms, noHp: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Jenis Kelamin"
                  rules={[
                    { required: true, message: "Tolong Pilih Jenis Kelamin!" },
                  ]}
                >
                  <Select
                    placeholder="Pilih Jenis Kelamin"
                    onChange={(e) => setForms({ ...forms, jenisKelamin: e })}
                  >
                    <Option value="L">Pria</Option>
                    <Option value="W">Perempuan</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="agama"
                  label="Agama"
                  rules={[{ required: true, message: "Tolong Pilih Agama!" }]}
                >
                  <Select
                    placeholder="Pilih Agama"
                    onChange={(e) => setForms({ ...forms, agama: e })}
                  >
                    <Option value="Islam">Islam</Option>
                    <Option value="Prostestan">Prostestan</Option>
                    <Option value="Katolik">Katolik</Option>
                    <Option value="Hindu">Hindu</Option>
                    <Option value="Buddha">Buddha</Option>
                    <Option value="Konghucu">Konghucu</Option>
                    <Option value="Lainnya">Lainnya</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="alamat"
                  label="Alamat"
                  rules={[{ required: true, message: "Tolong Masukan Alamat" }]}
                >
                  <Input.TextArea
                    showCount
                    maxLength={100}
                    onChange={(e) =>
                      setForms({ ...forms, alamat: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="tanggalLahir"
                  label="Tanggal Lahir"
                  rules={[
                    {
                      required: true,
                      message: "Tolong Masukan Tanggal Lahir!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Pilih Tanggal Lahir"
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                    onChange={(e) => setForms({ ...forms, tanggalLahir: e })}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="Email"
                  rules={[
                    { required: true, message: "Tolong Masukan Email!" },
                    {
                      required: true,
                      type: "email",
                      message: "Tolong Masukan Email Yang Benar!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setForms({ ...forms, email: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Kata Sandi"
                  name="password"
                  hasFeedback
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
                    onChange={(e) =>
                      setForms({ ...forms, password: e.target.value })
                    }
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
                    onChange={(e) =>
                      setForms({ ...forms, confirmPassword: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    style={{ backgroundColor: "#066A19", color: "white" }}
                    loading={isLoading}
                    onClick={(e) => {
                      onCheck(e);
                    }}
                  >
                    Daftar
                  </Button>
                </Form.Item>
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
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}
