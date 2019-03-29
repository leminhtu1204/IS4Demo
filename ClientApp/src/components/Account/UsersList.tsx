import React, { Component } from "react";
import { withApollo } from "react-apollo";
import BaseProps from "../../types/BaseProps";

import * as ActionCreators from "../../actions/Account/User";
import * as AuthenActionCreators from "../../actions/Authentication/AuthenticationAction";
import * as ModalActionCreators from "../../actions/Common/Modal";
import UsersListState from "../../types/Account/UsersListState";
import UserCell from "./UserCell";
import UserServices from "../../services/AccountService/UserService";
import Role from "../../types/Account/Role";

interface UserListProps extends BaseProps {
  usersListState: UsersListState;
  retrievedUsers: typeof ActionCreators.retrievedUsers;
  loadUsers: typeof ActionCreators.loadUsers;
  openModal: typeof ModalActionCreators.openModal;
  closeModal: typeof ModalActionCreators.hideModal;
  saveUser: typeof ActionCreators.saveNewUser;
  updateUser: typeof ActionCreators.updateUser;
  logout: typeof AuthenActionCreators.logout;
}

class UsersList extends Component<UserListProps> {
  userService: UserServices;
  constructor(props: UserListProps) {
    super(props);
    const { client } = this.props;
    this.userService = new UserServices(client);
  }

  componentDidMount() {
    this.loadUsers();
  }

  private loadUsers() {
    this.props.loadUsers(this.userService);
  }

  removeToken = () =>{
    this.props.logout();
  }

  render() {
    const { openModal } = this.props;
    const { users } = this.props.usersListState;
    const { closeModal } = this.props;
    const fakeRoles: Role[] = [{ id: "111", name: "admin", isChecked:false }, { id: "222", name: "mod", isChecked:false }];
    const { saveUser } = this.props;
    const usersList = users.map((user, i) => {
      return (
        <UserCell
          saveUser={saveUser}
          key={i}
          openModal={openModal}
          closeModal={closeModal}
          user={user}
          roles={fakeRoles}
        />
      );
    });

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
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
