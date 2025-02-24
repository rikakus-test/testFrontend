import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import AxiosRequest from "../../../helper/AxiosRequest";
const { Option } = Select;

export default function PeriksaDokter(props) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState({
    nasihat: "",
    diagnosa: "",
    resepDokter: "",
    sudahSelesai: false,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    const id = JSON.parse(localStorage.getItem("token")).id;
    console.log(forms);
    AxiosRequest.PutAxiosRequest("/periksa/dokter", {
      ...forms,
      idDokter: id,
      id: props.data.id,
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
                nasihat: "",
                diagnosa: "",
                resepDokter: "",
              });
              setForms({
                nasihat: "",
                diagnosa: "",
                resepDokter: "",
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

  useEffect(() => {
    if (props.isHidden === false) {
      console.log("jalan 1");
      form.setFieldsValue(props.data);
      setForms(props.data);
    } else {
      console.log("jalan 1 2");
      form.setFieldsValue({
        nasihat: "",
        diagnosa: "",
        resepDokter: "",
        sudahSelesai: false,
      });
    }
  }, [form, props.data, props.isHidden]);

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
          <Form.Item
            label="Diagnosa"
            name="diagnosa"
            rules={[{ required: true, message: "Tolong Masukan Diagnosa!" }]}
          >
            <TextArea
              name="diagnosa"
              style={{ height: "150px" }}
              value={forms.diagnosa}
              onChange={(e) => {
                setForms({
                  ...forms,
                  diagnosa: e.target.value,
                });
              }}
            />
          </Form.Item>{" "}
          <Form.Item
            label="Nasihat"
            name="nasihat"
            rules={[{ required: true, message: "Tolong Masukan Nasihat!" }]}
          >
            <TextArea
              name="nasihat"
              style={{ height: "150px" }}
              value={forms.nasihat}
              onChange={(e) => {
                setForms({
                  ...forms,
                  nasihat: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Resep"
            name="resepDokter"
            rules={[
              { required: true, message: "Tolong Masukan Resep Dokter!" },
            ]}
          >
            <TextArea
              name="resepDokter"
              style={{ height: "150px" }}
              value={forms.resepDokter}
              onChange={(e) => {
                setForms({
                  ...forms,
                  resepDokter: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="sudahSelesai"
            label="Selesai"
            rules={[
              { required: true, message: "Tolong Pilih Proses Pemeriksaan!" },
            ]}
          >
            <Select
              value={forms.sudahSelesai}
              placeholder="Pilih Proses Pemeriksaan"
              onChange={(e, i) => {
                setForms({ ...forms, sudahSelesai: e });
              }}
            >
              <Option value={1}>Selesai</Option>;
              <Option value={0}>Belum Selesai</Option>;
            </Select>
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
