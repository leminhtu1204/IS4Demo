import React, { Component } from "react";
import { withApollo } from "react-apollo";
import BaseProps from "../../../../types/BaseProps";

import * as ActionCreators from "../actions/Account/User";
import * as AuthenActionCreators from "../../../Authentication/actions/AuthenticationAction";
import * as ModalActionCreators from "../../../../actions/Modal";
import UsersListState from "../types/UsersListState";
import UserCell from "./UserCell";
import UserServices from "../services/UserServices";
import RoleServices from "../services/RoleServices";
import UserAdd from "./UserAdd";
import { ApolloClient } from "apollo-boost";

interface UserListProps extends BaseProps {
  usersListState: UsersListState;
  retrievedUsers: typeof ActionCreators.retrievedUsers;
  loadUsers: typeof ActionCreators.loadUsers;
  openModal: typeof ModalActionCreators.openModal;
  closeModal: typeof ModalActionCreators.hideModal;
  saveUser: typeof ActionCreators.saveNewUser;
  saveUpdateUser: typeof ActionCreators.saveUpdateUser;
  saveDelUser: typeof ActionCreators.saveDelUser;
  logout: typeof AuthenActionCreators.logout;
  client: ApolloClient<any>;
}

class UsersList extends Component<UserListProps> {
  userService: UserServices;
  roleService: RoleServices;
  constructor(props: UserListProps) {
    super(props);
    const { client } = this.props;
    this.userService = new UserServices(client);
    this.roleService = new RoleServices(client);
  }

  componentDidMount() {
    this.loadUsers();
  }

  private loadUsers() {
    this.props.loadUsers(this.userService);
  }

  removeToken = () => {
    window.location.href = "/logout";
  };

  render() {
    const { openModal } = this.props;
    const { users } = this.props.usersListState;
    const { roles } = this.props.usersListState;
    const { closeModal } = this.props;
    const { saveUser } = this.props;
    const { saveDelUser } = this.props;
    const { saveUpdateUser } = this.props;
    const modalAddBody = (
      <UserAdd
        closeModal={closeModal}
        roles={roles}
        saveUser={saveUser}
        userService={this.userService}
      />
    );
    const usersList = users.map((user, i) => {
      return (
        <UserCell
          key={i}
          openModal={openModal}
          closeModal={closeModal}
          user={user}
          roles={roles}
          userService={this.userService}
          saveDelUser={saveDelUser}
          saveUpdateUser={saveUpdateUser}
        />
      );
    });

    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => openModal("User Add", modalAddBody)}
          style={{ marginRight: "5px" }}
        >
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>{usersList}</tbody>
        </table>
        <button onClick={this.removeToken}>LOGOUT</button>
      </div>
    );
  }
}

export default withApollo(UsersList);
