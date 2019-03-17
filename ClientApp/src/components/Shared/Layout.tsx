import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from './Routes';
export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user-list">User List</Link>
          </li>
          <li>
            <Link to="/role-list">Role List</Link>
          </li>
        </ul>

        <hr />

        <Routes/>
    </div>
    );
  }
}
