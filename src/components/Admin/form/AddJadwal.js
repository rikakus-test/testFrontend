import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../assets/styles/auth.css";
import { Button, Checkbox, Form, Input, Select, TimePicker } from "antd";
import moment from "moment";
import AxiosRequest from "../../../helper/AxiosRequest";
const { Option } = Select;

export default function AddJadwal(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setForm] = useState({
    nama: "",
    idDokter: "",
    masuk: moment("00:00", "HH:mm"),
    keluar: moment("00:00", "HH:mm"),
    hadir: null,
  });
  const [dokter, setDokter] = useState([]);

  useEffect(() => {
    getDaftarDokter();
  }, []);
  useEffect(() => {
    if (props.type === "add") {
      form.setFieldsValue({
        nama: "",
        idDokter: "",
        masuk: moment("00:00", "HH:mm"),
        keluar: moment("00:00", "HH:mm"),
        hadir: null,
      });
      setForm({
        nama: "",
        idDokter: "",
        masuk: moment("00:00", "HH:mm"),
        keluar: moment("00:00", "HH:mm"),
        hadir: null,
      });
    } else if (props.hidden === false) {
      props.data.masuk = moment(props.data.masuk, "HH:mm");
      props.data.keluar = moment(props.data.keluar, "HH:mm");
      props.data.hadir = props.data.hadir === true ? "Hadir" : "Tidak Hadir";

      form.setFieldsValue(props.data);
      setForm(props.data);
    } else {
      console.log("jalan 1 2");
      setForm({
        nama: "",
        idDokter: "",
        masuk: null,
        keluar: null,
        hadir: null,
      });

      form.setFieldsValue({
        nama: "",
        idDokter: "",
        masuk: null,
        keluar: null,
        hadir: null,
      });
    }
  }, [form, props.data, props.hidden, props.type]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(formData);
    formData.hadir =
      formData.hadir === "Hadir"
        ? 1
        : formData.hadir === "Tidak Hadir"
        ? 0
        : formData.hadir === 1
        ? 1
        : 0;
    formData.masuk = moment(formData.masuk).format("HH:mm");
    formData.keluar = moment(formData.keluar).format("HH:mm");

    if (props.type === "add") {
      AxiosRequest.PostAxiosRequest("/jadwal", formData)
        .then((res) => {
          if (res.data.status === "failed") {
            setErrors([{ msg: res.data.error }]);
          } else if (res.data.status === "success") {
            Swal.fire({
              title: "Berhasil Menambah Jadwal",
              text: `Jadwal Dokter ${formData.nama} Bertambah!`,
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#066A19",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                props.setHidden(true);
                form.setFieldsValue({
                  nama: "",
                  idDokter: "",
                  masuk: moment("00:00", "HH:mm"),
                  keluar: moment("00:00", "HH:mm"),
                  hadir: null,
                });
                setForm({
                  nama: "",
                  idDokter: "",
                  masuk: moment("00:00", "HH:mm"),
                  keluar: moment("00:00", "HH:mm"),
                  hadir: null,
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
      AxiosRequest.PutAxiosRequest("/jadwal", formData)
        .then((res) => {
          if (res.data.status === "failed") {
            setErrors([{ msg: res.data.error }]);
          } else if (res.data.status === "success") {
            Swal.fire({
              title: "Berhasil Ubah Jadwal",
              text: `Jadwal Dokter ${formData.nama} Berubah!`,
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#066A19",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                props.setHidden(true);
                form.setFieldsValue({
                  nama: "",
                  idDokter: "",
                  masuk: moment("00:00", "HH:mm"),
                  keluar: moment("00:00", "HH:mm"),
                  hadir: null,
                });
                setForm({
                  nama: "",
                  idDokter: "",
                  masuk: moment("00:00", "HH:mm"),
                  keluar: moment("00:00", "HH:mm"),
                  hadir: null,
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
    formData.masuk = null;
    formData.keluar = null;
  };

  const getDaftarDokter = () => {
    AxiosRequest.GetAxiosRequest("/dokter")
      .then((res) => {
        if (res.data.status === "success") {
          setDokter(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            >
              <Form.Item
                name="nama"
                label="Dokter"
                rules={[{ required: true, message: "Tolong Pilih Dokter!" }]}
              >
                <Select
                  placeholder="Pilih Dokter"
                  onChange={(e, i) => {
                    console.log(e);
                    setForm({ ...formData, nama: i.children });
                    setForm({ ...formData, idDokter: e });
                  }}
                >
                  {dokter.map((e, i) => {
                    return <Option value={e.id}>{e.nama}</Option>;
                  })}
                </Select>
              </Form.Item>
              <div className="ant-form-item css-dev-only-do-not-override-mxhywb">
                <div className="ant-row ant-form-item-row css-dev-only-do-not-override-mxhywb">
                  <div className="ant-col ant-col-4 ant-form-item-label css-dev-only-do-not-override-mxhywb">
                    <label
                      for="basic_nama"
                      className="ant-form-item-required"
                      title="Masuk"
                    >
                      Masuk
                    </label>
                  </div>
                  <div className="ant-col ant-col-16 ant-form-item-control css-dev-only-do-not-override-mxhywb">
                    <div className="ant-form-item-control-input">
                      <div className="ant-form-item-control-input-content">
                        <TimePicker
                          showNow={false}
                          allowClear={false}
                          format="HH:mm"
                          value={formData.masuk}
                          placeholder="Pilih Jam Masuk"
                          style={{ width: "100%" }}
                          onSelect={(date) => {
                            setForm({
                              ...formData,
                              masuk: moment(
                                moment(date._d).format("HH:mm"),
                                "HH:mm"
                              ),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ant-form-item css-dev-only-do-not-override-mxhywb">
                <div className="ant-row ant-form-item-row css-dev-only-do-not-override-mxhywb">
                  <div className="ant-col ant-col-4 ant-form-item-label css-dev-only-do-not-override-mxhywb">
                    <label
                      for="basic_nama"
                      className="ant-form-item-required"
                      title="Keluar"
                    >
                      Keluar
                    </label>
                  </div>
                  <div className="ant-col ant-col-16 ant-form-item-control css-dev-only-do-not-override-mxhywb">
                    <div className="ant-form-item-control-input">
                      <div className="ant-form-item-control-input-content">
                        <TimePicker
                          showNow={false}
                          allowClear={false}
                          format="HH:mm"
                          value={formData.keluar}
                          placeholder="Pilih Jam Keluar"
                          style={{ width: "100%" }}
                          onSelect={(date) => {
                            setForm({
                              ...formData,
                              keluar: moment(
                                moment(date._d).format("HH:mm"),
                                "HH:mm"
                              ),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Form.Item
                name="hadir"
                label="Hadir"
                rules={[
                  { required: true, message: "Tolong Pilih Kehadiran Dokter!" },
                ]}
              >
                <Select
                  value={formData.hadir}
                  placeholder="Pilih Kehadiran Dokter"
                  onChange={(e, i) => {
                    setForm({ ...formData, hadir: e });
                  }}
                >
                  <Option value={1}>Hadir</Option>;
                  <Option value={0}>Tidak Hadir</Option>;
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={(e) => {
                    onSubmit(e);
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
