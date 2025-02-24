import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "https://lh3.googleusercontent.com/d/1Tx4Au6bwR3sWfl-gXyuxMzjU8oB3kpaP=w1000?authuser=0"
        }}
      >
        <h1 style={{ fontWeight: "bolder" }}>Hello Diven</h1>
        <h3 style={{ fontWeight: "bold" }}>balik lu anjg</h3>
        {/* <Link to="/">Back To Home</Link> */}
      </div>
    );
  }
}
