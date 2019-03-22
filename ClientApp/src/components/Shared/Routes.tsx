import React from "react";
import { Route, Redirect } from "react-router";
import { Home } from "../Home/Home";
import UsersListContainer from "../../containers/Account/UsersListContainer";
import PrivateRoute from '../Shared/PrivateRoute';

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

const Routes = () => {
  var token;
  if (window.location.hash) {
      token = processTokenCallback();
      localStorage.setItem('ACCESS_TOKEN', token);
      window.location.href = '/';
  }
  return (
    <>
      <Route path="/login" component={Home} />
      <PrivateRoute path="/user-list" component={UsersListContainer} />
    </>)
};

export default Routes;
