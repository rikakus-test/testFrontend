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
import AddPengguna from "./form/AddPengguna";
import { PlusOutlined } from "@ant-design/icons";
import AddAntrian from "./form/AddAntrian";
import Swal from "sweetalert2";
import AxiosRequest from "../../helper/AxiosRequest";

const columns = [
  {
    align: "center",
    title: "Nama",
    dataIndex: "nama",
    key: "nama",
  },
  {
    align: "center",
    title: "Antrian",
    dataIndex: "antrian",
    key: "antrian",
  },
  {
    align: "center",
    title: "Estimasi",
    dataIndex: "estimasi",
    key: "estimas",
    render: (text, index) => (
      <div>
        Tanggal : {moment(text).format("DD-MM-YYYY")} Jam :{" "}
        {moment(text).format("HH:mm")}
      </div>
    ),
  },

  {
    align: "center",
    title: "Diproses",
    dataIndex: "antrian",
    key: "antrian",
    render: (text, index) =>
      text === true ? "Sudah Diperiksa" : "Belum Diperiksa",
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
    render: (text, index) => (
      <div style={{ flexDirection: "row" }}>
        <Button
          // style={{ margin: 5, backgroundColor: "green", color: "white" }}
          type="primary"
          onClick={(e) => {
            // setDataEdit(index);
            // setHidden(false);
            console.log(index);
          }}
        >
          Edit
        </Button>
        <Button
          style={{ margin: 5, backgroundColor: "red", color: "white" }}
          // type="danger"
        >
          Delete
        </Button>
      </div>
    ),
  },
];

export default function DaftarAntrian() {
  const [hidden, setHidden] = useState(true);
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [dataEdit, setDataEdit] = useState({});
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getAntrian();
  }, []);

  useEffect(() => {
    getAntrian();
  }, [hidden]);

  const getAntrian = () => {
    setIsLoading(true);
    AxiosRequest.GetAxiosRequest("/antrian")
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.data);
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

  const deleteAntrian = (data) => {
    Swal.fire({
      title: "Menghapus Antrian",
      text: `Apakah Anda Yakin Menghapus Antrian Pasien ${data.nama}!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#066A19",
      confirmButtonText: "Oke",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        AxiosRequest.DeleteAxiosRequest("/antrian/" + data.id)
          .then((res) => {
            if (res.data.status === "success") {
              Swal.fire({
                title: "Berhasil Hapus Antrian",
                text: `Antrian Pasien ${data.nama} Terhapus!`,
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#066A19",
                confirmButtonText: "Oke",
              }).then((result) => {
                if (result.isConfirmed) {
                  getAntrian();
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
      title: "Antrian",
      dataIndex: "antrian",
      key: "antrian",
    },
    {
      align: "center",
      title: "Estimasi",
      dataIndex: "estimasi",
      key: "estimas",
      render: (text, index) => (
        <div>
          Tanggal : {moment(text).format("DD-MM-YYYY")} Jam :{" "}
          {moment(text).format("HH:mm")}
        </div>
      ),
    },

    {
      align: "center",
      title: "Diproses",
      dataIndex: "antrian",
      key: "antrian",
      render: (text, index) =>
        text === true ? "Sudah Diperiksa" : "Belum Diperiksa",
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
      title: "Menu Aksi",
      dataIndex: "menuAksi",
      key: "menuAksi",
      align: "center",
      render: (text, index) => (
        <div style={{ flexDirection: "row" }}>
          <Button
            style={{ margin: 5, backgroundColor: "red", color: "white" }}
            onClick={(e) => {
              deleteAntrian(index);
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
      <Table dataSource={dataSource} columns={columns} />
      {/* <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        // onClick={() => navigate("/add/user")}
        onClick={(e) => {
          setHidden(false);
          setType("add");
        }}
      /> */}
      <Modal
        width={"50%"}
        title={type === "add" ? "Tambah Antrian" : "Edit Antrian"}
        open={!hidden}
        // onOk={(e) => setHidden(false)}
        onCancel={(e) => setHidden(true)}
        footer={[]}
      >
        <AddAntrian
          hidden={hidden}
          type={type}
          data={dataEdit}
          setHidden={(e) => setHidden(e)}
        />
      </Modal>
    </>
  );
}
