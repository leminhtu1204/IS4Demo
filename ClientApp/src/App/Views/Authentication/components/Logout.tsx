import React, { Component } from "react";
import Configuration from "../../../constants/Configuration";

const logout = () => {
  let token = localStorage.getItem("ACCESS_TOKEN");
  let redirect_uri = Configuration.REDIRECT_URI;
  if (!token) {
    window.location.href = redirect_uri;
  } else {
    let logoutUrl = Configuration.LOGOUT_URL;
    let url = logoutUrl + "?" + "redirect_uri=" + encodeURI(redirect_uri);
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = url;
  }
  localStorage.removeItem("ACCESS_TOKEN");
};

export default class Logout extends Component {
  componentDidMount(){
    logout();
  }
  render() {
    return <></>;
  }
}
