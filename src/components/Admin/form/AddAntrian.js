import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../assets/styles/auth.css";
import { Button, Checkbox, Form, Input, Select, TimePicker } from "antd";
import moment from "moment";
const { Option } = Select;

export default function AddAntrian(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setForm] = useState({
    idPenguna: "",
    nama: "",
    estimasi: "",
    antrian: "",
    done: null,
  });
  const [pasien, setPasien] = useState([]);

  useEffect(() => {
    getDaftarPasien();
  }, []);

  useEffect(() => {
    if (props.type === "add") {
      form.setFieldsValue({
        idPenguna: "",
        nama: "",
        estimasi: "",
        antrian: "",
        done: null,
      });
    } else if (props.hidden === false) {
      console.log("jalan 1");
      props.data.masuk = moment(props.data.masuk, "HH:mm");
      props.data.keluar = moment(props.data.keluar, "HH:mm");
      form.setFieldsValue(props.data);
      setForm(props.data);
    } else {
      console.log("jalan 1 2");
      form.setFieldsValue({
        idPenguna: "",
        nama: "",
        estimasi: "",
        antrian: "",
        done: null,
      });
    }
  }, [form, props.data, props.hidden, props.type]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(formData);
    setIsLoading(false);
    props.setHidden(true);
    form.setFieldsValue({
      idPenguna: "",
      nama: "",
      estimasi: "",
      antrian: "",
      done: null,
    });
  };

  const getDaftarPasien = () => {
    return setPasien([
      {
        idPenguna: "123",
        nama: "ian p",
      },
    ]);
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
                name="nama"
                label="Pasien"
                rules={[{ required: true, message: "Tolong Pilih Pasien!" }]}
              >
                <Select
                  placeholder="Pilih Pasien"
                  onChange={(e, i) => {
                    console.log(i);
                    setForm({ ...formData, idDokter: i.value });
                    setForm({ ...formData, nama: i.children });
                  }}
                >
                  {pasien.map((e, i) => {
                    return <Option value={e.idDokter}>{e.nama}</Option>;
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="hadir"
                label="Kehadiran Dokter"
                rules={[
                  { required: true, message: "Tolong Pilih Kehadiran Dokter!" },
                ]}
              >
                <Select
                  placeholder="Pilih Kehadiran Dokter"
                  onChange={(e, i) => {
                    setForm({ ...formData, hadir: e });
                  }}
                >
                  <Option value={true}>Hadir</Option>;
                  <Option value={false}>Tidak Hadir</Option>;
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
