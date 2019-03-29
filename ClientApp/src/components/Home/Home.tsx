import React, { Component } from "react";
import config from "react-global-configuration";
import authenticateConfig from "../../utils/Configuration";
export class Home extends Component {

  setConfiguration(){
    config.set(authenticateConfig, {
      freeze: false,
      assign: false
    });
  }

  render() {
    this.setConfiguration();
    const login = () => {
      var authorizationUrl = config.get("authorizationUrl");
      var client_id = config.get("client_id");
      var redirect_uri = config.get("redirect_uri");
      var response_type = config.get("response_type");
      var scope = config.get("scope");
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

    return (
      <>
        <h3>Login</h3>
        <button onClick={login}>LOGIN</button>
      </>
    );
  }
}
