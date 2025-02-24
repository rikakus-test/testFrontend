import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../assets/styles/auth.css";
import { Button, Checkbox, Form, Input, Select, TimePicker } from "antd";
import moment from "moment";
import AxiosRequest from "../../../helper/AxiosRequest";
const { Option } = Select;

export default function KirimPesan(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setForm] = useState({
    nomor: "",
    pesan: "",
  });

  useEffect(() => {
    form.setFieldsValue({
      nomor: "",
      pesan: "",
    });
  }, [props.hidden]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(formData);
    AxiosRequest.PostAxiosRequest("/send", formData)
      .then((res) => {
        if (res.data.status === "failed") {
          setErrors([
            { msg: res.data.message },
            { msg: "Cek Koneksi WhatsApp" },
          ]);
        } else if (res.data.status === "success") {
          Swal.fire({
            title: "Berhasil Kirim Pesan",
            text: `Silahkan Cek Pesan Di Nomor Yang Dituju!`,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#066A19",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              props.setHidden(true);
              form.setFieldsValue({
                idPenguna: "",
                nama: "",
                estimasi: "",
                antrian: "",
                done: null,
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
                name="nomor"
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
                    setForm({ ...formData, nomor: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                label="Pesan"
                name="pesan"
                rules={[{ required: true, message: "Tolong Masukan Pesan!" }]}
              >
                <Input
                  onChange={(e) =>
                    setForm({ ...formData, pesan: e.target.value })
                  }
                />
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
