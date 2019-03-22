import React, { Component } from "react";

export class Home extends Component {
  render() {
    const login = () => {
      var authorizationUrl = "http://localhost:5000/connect/authorize";
      var client_id = "mvc";
      var redirect_uri = "http://localhost:3000/login";
      var response_type = "token";
      var scope = "api01";
      var state = Date.now() + "" + Math.random();
      localStorage["state"] = state;

      var url =
        authorizationUrl +
        "?" +
        "client_id=" +
        encodeURI(client_id) +
        "&" +
        "redirect_uri=" +
        encodeURI(redirect_uri) +
        "&" +
        "response_type=" +
        encodeURI(response_type) +
        "&" +
        "scope=" +
        encodeURI(scope) +
        "&" +
        "state=" +
        encodeURI(state);
      window.location.href = url;
    };

    const removeToken = () => {
      localStorage.removeItem("ACCESS_TOKEN");
    };

    return (
      <>
        <h3>Login</h3>
        <button onClick={login}>LOGIN</button>
        <button onClick={removeToken}>LOGOUT</button>
      </>
    );
  }
}
