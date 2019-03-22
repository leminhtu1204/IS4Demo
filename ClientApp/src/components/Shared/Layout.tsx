import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from './Routes';
import RootModal from '../Modal/RootModal';

const Layout = (props: any) => {
  console.log(props);
  
  const {isOpen, body} = props.modalState;
  
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

      <Routes/>
      <RootModal isOpen={isOpen} children={body}/>
  </div>
  );
}

export default Layout;