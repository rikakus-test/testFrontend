import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
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
        }}
      >
        <h1 style={{ fontWeight: "bolder" }}>404</h1>
        <h3 style={{ fontWeight: "bold" }}>Page Not Found</h3>
        <Link to="/">Back To Home</Link>
      </div>
    );
  }
}
