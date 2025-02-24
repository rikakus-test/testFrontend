import {
  Button,
  Card,
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
import AxiosRequest from "../../helper/AxiosRequest";

const columns = [
  [
    {
      align: "center",
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      align: "center",
      title: "Keluhan",
      dataIndex: "keluhan",
      key: "keluhan",
    },

    {
      align: "center",
      title: "Nasihat",
      dataIndex: "nasihat",
      key: "nasihat",
    },

    {
      align: "center",
      title: "Diagnosa",
      dataIndex: "diagnosa",
      key: "diagnosa",
    },

    {
      align: "center",
      title: "Resep Dokter",
      dataIndex: "resepDokter",
      key: "resepDokter",
    },

    {
      align: "center",
      title: "Nama Dokter",
      dataIndex: "namaDokter",
      key: "namaDokter",
    },

    {
      align: "center",
      title: "Proses",
      dataIndex: "sudahSelesai",
      key: "sudahSelesai",
      render: (text, index) =>
        text === 1 ? "Sudah Diperiksa" : "Belum Diperiksa",
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
  ],
  [
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
  ],
];

export default function Riwayat() {
  const id = JSON.parse(localStorage.getItem("token")).id;
  const role = JSON.parse(localStorage.getItem("token")).role;

  const [dataSourceAntrian, setDataSourceAntrian] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSourcePeriksa, setDataSourcePeriksa] = useState([]);

  const getAntrian = () => {
    setIsLoading(true);
    AxiosRequest.GetAxiosRequest("/antrian/pasien/" + id)
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.data);
          setDataSourceAntrian(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getPeriksa = () => {
    setIsLoading(true);
    AxiosRequest.GetAxiosRequest(
      role === 1 ? "/periksa/dokter/" + id : "/periksa/pasien/" + id
    )
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.data);
          setDataSourcePeriksa(res.data.data);
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
    getAntrian();
    getPeriksa();
  }, []);
  return (
    <>
      <Card>
        <h4>Riwayat Periksa</h4>
        <Table
          loading={isLoading}
          dataSource={dataSourcePeriksa}
          columns={columns[0]}
          pagination={{ pageSize: 5 }}
        />
        {role === 2 ? (
          <>
            <h4>Riwayat Antrian</h4>
            <Table
              loading={isLoading}
              dataSource={dataSourceAntrian}
              columns={columns[1]}
              pagination={{ pageSize: 5 }}
            />
          </>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
