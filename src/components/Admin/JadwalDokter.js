import {
  Button,
  Checkbox,
  FloatButton,
  Form,
  Input,
  Modal,
  Table,
  Tabs,
} from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddJadwal from "./form/AddJadwal";
import AxiosRequest from "../../helper/AxiosRequest";
import Swal from "sweetalert2";

export default function JadwalDokter() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("");

  const [dataEdit, setDataEdit] = useState({});
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getJadwal();
  }, []);

  useEffect(() => {
    getJadwal();
  }, [hidden]);

  const getJadwal = () => {
    setIsLoading(true);
    AxiosRequest.GetAxiosRequest("/jadwal")
      .then((res) => {
        if (res.data.status === "success") {
          setDataSource(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteJadwal = (data) => {
    Swal.fire({
      title: "Menghapus Jadwal",
      text: `Apakah Anda Yakin Menghapus Jadwal Dokter ${data.nama}!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#066A19",
      confirmButtonText: "Oke",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        AxiosRequest.DeleteAxiosRequest("/jadwal/" + data.id)
          .then((res) => {
            if (res.data.status === "success") {
              Swal.fire({
                title: "Berhasil Hapus Jadwal",
                text: `Jadwal Dokter ${data.nama} Terhapus!`,
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#066A19",
                confirmButtonText: "Oke",
              }).then((result) => {
                if (result.isConfirmed) {
                  getJadwal();
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
    });
  };

  const columns = [
    {
      align: "center",
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      align: "center",
      title: "Jadwal",
      dataIndex: "masuk",
      key: "masuk",
      render: (text, index) => (
        <div>
          Jam : {moment(index.masuk, "HH:mm:ss").format("HH:mm")} -{" "}
          {moment(index.keluar, "HH:mm:ss").format("HH:mm")}
        </div>
      ),
    },
    {
      align: "center",
      title: "Kehadiran",
      dataIndex: "hadir",
      key: "hadir",
      render: (text, index) => (text === true ? "Hadir" : "Tidak Hadir"),
    },

    {
      align: "center",
      title: "Dibuat",
      dataIndex: "create",
      key: "create",
      render: (text, index) => (
        <div>
          Tanggal : {moment(text).format("DD-MM-YYYY")} Jam :{" "}
          {moment(text).format("HH:mm")}
        </div>
      ),
    },
    {
      align: "center",
      title: "Diperbaharui",
      dataIndex: "update",
      key: "update",
      render: (text, index) => (
        <div>
          Tanggal : {moment(text).format("DD-MM-YYYY")} Jam :{" "}
          {moment(text).format("HH:mm")}
        </div>
      ),
    },
    {
      align: "center",
      title: "Menu Aksi",
      dataIndex: "menuAksi",
      key: "menuAksi",
      align: "center",
      render: (text, index, i) => (
        <div style={{ flexDirection: "row" }} key={i}>
          <Button
            // style={{ margin: 5, backgroundColor: "green", color: "white" }}
            type="primary"
            onClick={(e) => {
              setDataEdit(index);
              setHidden(false);
              setType("edit");
            }}
          >
            Edit
          </Button>
          <Button
            style={{ margin: 5, backgroundColor: "red", color: "white" }}
            // type="danger"
            onClick={(e) => {
              deleteJadwal(index);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table dataSource={isLoading ? [] : dataSource} columns={columns} />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        // onClick={() => navigate("/add/user")}
        onClick={(e) => {
          setHidden(false);
          setType("add");
        }}
      />
      <Modal
        title={type === "add" ? "Tambah Jadwal Dokter" : "Edit Jadwal Dokter"}
        open={!hidden}
        // onOk={(e) => setHidden(false)}
        onCancel={(e) => setHidden(true)}
        footer={[]}
      >
        <AddJadwal
          hidden={hidden}
          type={type}
          data={dataEdit}
          setHidden={(e) => setHidden(e)}
        />
      </Modal>
    </>
  );
}
