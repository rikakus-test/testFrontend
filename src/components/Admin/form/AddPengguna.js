import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../assets/styles/auth.css";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import AxiosRequest from "../../../helper/AxiosRequest";
const { Option } = Select;

export default function AddPengguna(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
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

  useEffect(() => {
    if (props.type === "add") {
      form.setFieldsValue({
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
    } else if (props.hidden === false) {
      console.log("jalan 1");
      props.data.tanggalLahir = moment(props.data.tanggalLahir);
      form.setFieldsValue(props.data);
      setForms(props.data);
    } else {
      console.log("jalan 1 2");
      form.setFieldsValue({
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
    }
  }, [form, props.data, props.hidden, props.type]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(forms);
    if (props.type === "add") {
      AxiosRequest.PostAxiosRequest("/pengguna", { ...forms, role: props.role })
        .then((res) => {
          if (res.data.status === "failed") {
            setErrors([{ msg: res.data.error }]);
          } else if (res.data.status === "success") {
            Swal.fire({
              title: "Berhasil Menambah Pengguna",
              text: `Pengguna Dengan Nama : ${forms.nama} Bertambah!`,
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#066A19",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                props.setHidden(true);
                form.setFieldsValue({
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
                setForms({
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
    } else {
      AxiosRequest.PutAxiosRequest("/pengguna", forms)
        .then((res) => {
          if (res.data.status === "failed") {
            setErrors([{ msg: res.data.error }]);
          } else if (res.data.status === "success") {
            Swal.fire({
              title: "Berhasil Mengedit Pengguna",
              text: `Pengguna Dengan Nama : ${forms.nama} Berubah!`,
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#066A19",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                props.setHidden(true);
                form.setFieldsValue({
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
                setForms({
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
    }
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
      <section className="" hidden={props.hidden}>
        <div className="">
          <form style={{ width: "100%" }}>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: "100%" }}
              initialValues={form}
              // onFinish={(fieldsValue) => {
              //   const values = {
              //     ...fieldsValue,
              //     masuk: fieldsValue["masuk"].format("HH:mm:ss"),
              //   };
              //   console.log("Received values of form: ", values);
              // }}
              // autoComplete="on"
            >
              <Form.Item
                label="No KTP"
                name="ktp"
                rules={[{ required: true, message: "Tolong Masukan No KTP!" }]}
              >
                <Input
                  onChange={(e) => setForms({ ...forms, ktp: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                label="Nama"
                name="nama"
                rules={[{ required: true, message: "Tolong Masukan Nama!" }]}
              >
                <Input
                  onChange={(e) => setForms({ ...forms, nama: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                name="noHp"
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
                  onChange={(e) => setForms({ ...forms, noHp: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                name="jenisKelamin"
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

              {props.type === "add" && props.role === "1" ? (
                <>
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
                </>
              ) : (
                <></>
              )}

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={(e) => {
                    onCheck(e);
                  }}
                >
                  Simpan
                </Button>
              </Form.Item>
            </Form>

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
          {/* <Line title="Login with" />
          <Button type="google" /> */}
        </div>
      </section>
    </>
  );
}
