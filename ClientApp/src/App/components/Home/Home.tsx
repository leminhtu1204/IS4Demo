import React, { Component } from "react";
import Configuration from "../../constants/Configuration";
export class Home extends Component {
  render() {
    const login = () => {
      var authorizationUrl = Configuration.AUTH_URL;
      var client_id = Configuration.CLIENT_ID;
      var redirect_uri = Configuration.REDIRECT_URI;
      var response_type = Configuration.RESPONSE_TYPE;
      var scope = Configuration.SCOPE;
      var state = Configuration.STATE;
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
