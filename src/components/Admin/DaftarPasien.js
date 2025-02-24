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
import AxiosRequest from "../../helper/AxiosRequest";
import Swal from "sweetalert2";

export default function DaftarPasien() {
  const [hidden, setHidden] = useState(true);
  const [type, setType] = useState("");

  const [dataEdit, setDataEdit] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getPasien();
  }, []);

  useEffect(() => {
    getPasien();
  }, [hidden]);

  const getPasien = () => {
    setIsLoading(true);
    AxiosRequest.GetAxiosRequest("/pasien")
      .then(async (res) => {
        if (res.data.status === "success") {
          const data = await res.data.data.map((e, i) => {
            e.jenisKelamin = e.jenis_kelamin;
            e.noHp = e.no_hp;
            return e;
          });
          setDataSource(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deletePengguna = (data) => {
    Swal.fire({
      title: "Menghapus Pasien",
      text: `Apakah Anda Yakin Menghapus Data Pasien ${data.nama}!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#066A19",
      confirmButtonText: "Oke",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        AxiosRequest.DeleteAxiosRequest("/pengguna/" + data.id)
          .then((res) => {
            if (res.data.status === "success") {
              Swal.fire({
                title: "Berhasil Hapus Pasien",
                text: `Data Pasien ${data.nama} Terhapus!`,
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#066A19",
                confirmButtonText: "Oke",
              }).then((result) => {
                if (result.isConfirmed) {
                  getPasien();
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
      title: "No KTP",
      dataIndex: "ktp",
      key: "ktp",
    },

    {
      align: "center",
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      align: "center",
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      align: "center",
      title: "Jenis Kelamin",
      dataIndex: "jenisKelamin",
      key: "jenisKelamin",
      render: (text, index) => (text === "L" ? "Laki-laki" : "Perempuan"),
    },

    {
      align: "center",
      title: "Agama",
      dataIndex: "agama",
      key: "agama",
    },

    {
      align: "center",
      title: "Tanggal Lahir",
      dataIndex: "tanggalLahir",
      key: "tanggalLahir",
      render: (text, index) => <div>{moment(text).format("DD-MM-YYYY")} </div>,
    },
    {
      align: "center",
      title: "No HP",
      dataIndex: "noHp",
      key: "noHp",
    },

    {
      align: "center",
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
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
              setDataEdit(index);
              setHidden(false);
              setType("edit");

              console.log(index);
            }}
          >
            Edit
          </Button>
          <Button
            style={{ margin: 5, backgroundColor: "red", color: "white" }}
            onClick={(e) => {
              deletePengguna(index);
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
        title={type === "add" ? "Tambah Dokter" : "Edit Dokter"}
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
    </>
  );
}
