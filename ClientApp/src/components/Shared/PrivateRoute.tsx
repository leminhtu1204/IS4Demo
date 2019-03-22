import React, { Component } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export default class PrivateRoute extends Route<PrivateRouteProps> {
  render() {
    const { component: Component, ...rest }: PrivateRouteProps = this.props;
    const renderComponent: RenderComponent = props =>
        localStorage.getItem("ACCESS_TOKEN") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );

    return <Route {...rest} render={renderComponent} />;
  }
}
