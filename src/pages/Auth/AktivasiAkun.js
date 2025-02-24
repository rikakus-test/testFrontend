import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../assets/styles/auth.css";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import AxiosRequest from "../../helper/AxiosRequest";

export default function Aktivasi() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState({
    token: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    const id = new URLSearchParams(window.location.search).get("id");
    console.log(forms);
    AxiosRequest.PostAxiosRequest("/aktivasi", { ...forms, id })
      .then((res) => {
        console.log(res.data.status === "success");
        if (res.data.status === "failed") {
          setErrors([{ msg: res.data.error }]);
        } else if (res.data.status === "success") {
          Swal.fire({
            title: "Berhasil Aktivasi",
            text: "Silahkan Masuk!",
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
              <h3>Aktivasi</h3>
              <h6>Hi, Silahkan Masukan Token!</h6>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={forms}

                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                // autoComplete="off"
              >
                <Form.Item
                  label="Token"
                  name="token"
                  rules={[
                    { required: true, message: "Tolong Masukan Token!" },
                    { min: 6, message: "Tolong Masukan Token Yang Benar!" },
                  ]}
                >
                  <Input
                    value={forms.token}
                    type="number"
                    onChange={(e) => {
                      console.log("jalan");
                      if (e.target.value.length < 7) {
                        console.log("jalam 2");
                        setForms({
                          ...forms,
                          token: e.target.value,
                        });
                      }
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
