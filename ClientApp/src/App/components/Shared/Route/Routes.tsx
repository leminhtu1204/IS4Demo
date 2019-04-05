import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "../../Home/Home";
import UsersListContainer from "../../../Views/AccountManagement/UserManagement/containers/UsersListContainer";
import PrivateRoute from "./PrivateRoute";
import Logout from '../../../Views/Authentication/components/Logout'

interface RouteProps {
  isAuthenticated: boolean;
}

const Routes = (props: RouteProps) => {
  const { isAuthenticated } = props;
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Home} />
        <PrivateRoute exact
          isAuthenticated={isAuthenticated}
          path="/user-list"
          component={UsersListContainer}
        />
        <PrivateRoute exact
          isAuthenticated={isAuthenticated}
          path="/logout"
          component={Logout}
        />
      </Switch>
    </>
  );
};

export default Routes;
