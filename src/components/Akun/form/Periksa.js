import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import AxiosRequest from "../../../helper/AxiosRequest";

export default function Periksa(props) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState({
    keluhan: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    const id = JSON.parse(localStorage.getItem("token")).id;
    console.log(forms);
    AxiosRequest.PostAxiosRequest("/periksa/pasien", {
      ...forms,
      idPengguna: id,
    })
      .then((res) => {
        if (res.data.status === "failed") {
          setErrors([{ msg: res.data.error }]);
        } else if (res.data.status === "success") {
          Swal.fire({
            title: "Berhasil Melakukan Periksa",
            text: "Silahkan tunggu sampai dokter selesai memeriksa!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#066A19",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              form.setFieldsValue({
                keluhan: "",
              });
              setForms({
                keluhan: "",
              });
              props.hidden();
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

  useEffect(() => {}, []);

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
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ width: "100%" }}
          initialValues={forms}
        >
          <h5>Masukan Yang Anda Rasakan</h5>
          <h6>Lebih detail lebih baik</h6>
          <Form.Item
            label="Keluhan"
            name="keluhan"
            rules={[{ required: true, message: "Tolong Masukan Keluhan!" }]}
          >
            <TextArea
              name="keluhan"
              style={{ height: "150px" }}
              value={forms.keluhan}
              onChange={(e) => {
                setForms({
                  ...forms,
                  keluhan: e.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={{ backgroundColor: "#066A19", color: "white" }}
              onClick={(e) => {
                onCheck(e);
              }}
            >
              kirim
            </Button>
          </Form.Item>
        </Form>

        {errors.length > 0 && (
          <div className="alert alert-danger mx-0" style={{ width: "100%" }}>
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
    </>
  );
}
