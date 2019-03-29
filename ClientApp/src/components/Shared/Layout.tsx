import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "./Routes";
import RootModal from "../Modal/RootModal";
import * as ActionCreators from "../../actions/Authentication/AuthenticationAction";
import Loading from "../Modal/LoadingModal/Loading";

function processTokenCallback() {
  var hash = window.location.hash.substr(1);
  var result = hash.split("&").reduce(function(result: any, item) {
    var parts = item.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {});

  window.history.replaceState(
    {},
    window.document.title,
    window.location.origin + window.location.pathname
  );
  if (!result.error) {
    if (result.state !== localStorage["state"]) {
    } else {
      localStorage.removeItem("state");
      return result.access_token;
    }
  }
}

interface LayoutProps {
  modalState: any;
  authenticationState: any;
  receiveLogin: typeof ActionCreators.receiveLogin;
  loadingState: any;
}

const Layout = (props: LayoutProps) => {
  const { isOpen, body } = props.modalState;
  const { isAuthenticated } = props.authenticationState;
  const { isLoading } = props.loadingState
  var token = processTokenCallback();
  if (token && !isAuthenticated) {
    props.receiveLogin(token);
    localStorage.setItem("ACCESS_TOKEN", token);
  }
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Home</Link>
        </li>
        <li>
          <Link to="/user-list">User List</Link>
        </li>
        <li>
          <Link to="/role-list">Role List</Link>
        </li>
      </ul>

      <hr />

      <Routes isAuthenticated={isAuthenticated} />
      <RootModal isOpen={isOpen} children={body} />
      <Loading isLoading = {isLoading}/>
    </div>
  );
};

export default Layout;
