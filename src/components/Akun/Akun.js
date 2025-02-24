import { Button, Descriptions, Modal } from "antd";
import React, { useEffect, useState } from "react";
import AddPengguna from "../Admin/form/AddPengguna";
import AxiosRequest from "../../helper/AxiosRequest";
import moment from "moment";

export default function AkunDetail() {
  const id = JSON.parse(localStorage.getItem("token")).id;

  const [hidden, setHidden] = useState(true);
  const [type, setType] = useState("");

  const [dataEdit, setDataEdit] = useState({});
  const [data, setData] = useState({});

  const getDataPengguna = () => {
    AxiosRequest.GetAxiosRequest("/pengguna/" + id)
      .then((res) => {
        if (res.data.status === "success") {
          setData({
            ...res.data.data[0],
            jenisKelamin: res.data.data[0].jenis_kelamin,
            noHp: res.data.data[0].no_hp,
            tanggalLahir: res.data.data[0].tanggal_lahir,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getDataPengguna();
  }, [hidden]);

  useEffect(() => {
    getDataPengguna();
  }, []);

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <Descriptions title="Data Pengguna" bordered size="large">
          <Descriptions.Item span={24} label="KTP">
            {data.ktp || "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="Nama">
            {data.nama || "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="No HP">
            {data.noHp || "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="Jenis Kelamin">
            {data.jenis_kelamin === "L"
              ? "Laki - laki"
              : data.jenis_kelamin === "P"
              ? "Perempuan"
              : "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="Agama">
            {data.agama || "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="Alamat">
            {data.alamat || "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="Tanggal Lahir">
            {moment(data.tanggal_lahir, "YYYY-MM-DD").format("DD-MM-YYYY") ||
              "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="Email">
            {data.email || "-"}
          </Descriptions.Item>

          <Descriptions.Item span={24} label="">
            <Button
              style={{ margin: 5, backgroundColor: "green", color: "white" }}
              type="primary"
              onClick={(e) => {
                setDataEdit({ ...data, jenisKelamin: data });
                setHidden(false);
                setType("edit");
              }}
            >
              Edit
            </Button>{" "}
          </Descriptions.Item>
        </Descriptions>

        <Modal
          width={"50%"}
          title={type === "add" ? "Tambah Dokter" : "Edit Data"}
          open={!hidden}
          // onOk={(e) => setHidden(false)}
          onCancel={(e) => setHidden(true)}
          footer={[]}
        >
          <AddPengguna
            hidden={hidden}
            type={type}
            role="2"
            data={dataEdit}
            setHidden={(e) => setHidden(e)}
          />
        </Modal>
      </div>
    </>
  );
}
