import { Button, Card, Col, Empty, Image, Modal, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import AxiosRequest from "../../helper/AxiosRequest";
import Swal from "sweetalert2";
import KirimPesan from "../Akun/form/KirimPesan";

export default function KoneksiWa() {
  const [data, setData] = useState();
  const [isLoadingQr, setIsLoadingQr] = useState(false);
  const [hidden, setHidden] = useState(true);

  const getQr = () => {
    setIsLoadingQr(true);
    AxiosRequest.GetAxiosRequest("/qr")
      .then((res) => {
        console.log(res);
        //  if (res.data.status === "success") {
        setData(res.data.data);
        //  }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingQr(false);
        setTimeout(() => {
          setData();
        }, 240000);
      });
  };

  const getKoneksi = () => {
    AxiosRequest.GetAxiosRequest("/cek")
      .then((res) => {
        Swal.fire({
          title: "Koneksi Whatsapp",
          text: `${
            res.data.data === null ? "Belum Terkoneksi" : "Terkoneksi"
          }!`,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#066A19",
          confirmButtonText: "Oke",
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const disconnect = () => {
    AxiosRequest.GetAxiosRequest("/disconnect")
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          Swal.fire({
            title: "Keluar Berhasil",
            text: `${res.data.data}!`,
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#066A19",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              setData();
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    // getQr();
  }, []);
  return (
    <section>
      <Row>
        <Col span={18}>
          <Row>
            <Col span={24}>
              <Card>
                <Button
                  style={{ margin: 5 }}
                  type="primary"
                  onClick={(e) => {
                    getQr();
                  }}
                >
                  Dapatkan kode QR
                </Button>
                <Button
                  style={{ margin: 5 }}
                  type="primary"
                  onClick={(e) => {
                    getKoneksi();
                  }}
                >
                  Cek Koneksi
                </Button>
                <Button
                  style={{ margin: 5 }}
                  type="primary"
                  onClick={(e) => {
                    setHidden(false);
                  }}
                >
                  Kirim Pesan
                </Button>
                <Button
                  style={{ margin: 5 }}
                  type="primary"
                  onClick={(e) => {
                    disconnect();
                  }}
                >
                  Keluar
                </Button>
              </Card>
            </Col>
            <Col span={24}>{/* <Card>Cek Data terakhir kirim</Card> */}</Col>
          </Row>
        </Col>
        <Col span={6}>
          <Card>
            {isLoadingQr ? (
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            ) : data ? (
              <Image loading={isLoadingQr} src={data} />
            ) : (
              <>
                <Empty />
              </>
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        width={"50%"}
        title="Kirim Pesan"
        open={!hidden}
        onCancel={(e) => setHidden(true)}
        footer={[]}
      >
        <KirimPesan hidden={hidden} setHidden={(e) => setHidden(true)} />
      </Modal>
    </section>
  );
}
