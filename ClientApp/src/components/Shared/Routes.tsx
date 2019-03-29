import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "../Home/Home";
import { NotFound } from "../Shared/NotFound";
import UsersListContainer from "../../containers/Account/UsersListContainer";
import PrivateRoute from "../Shared/PrivateRoute";

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
      </Switch>
    </>
  );
};

export default Routes;
