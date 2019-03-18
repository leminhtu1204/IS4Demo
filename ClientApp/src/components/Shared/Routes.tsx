import React from "react";
import { Route } from "react-router";
import { Home } from "../Home/Home";
import UsersListContainer from "../../containers/Account/UsersListContainer";

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/user-list" component={UsersListContainer} />
    </>
  );
};

export default Routes;
