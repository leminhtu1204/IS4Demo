import React, { Component } from "react";
import { withApollo } from "react-apollo";
import BaseProps from "../../types/BaseProps";

import * as ActionCreators from "../../actions/Account/User";
import * as ModalActionCreators from "../../actions/Common/Modal";
import UsersListState from "../../types/Account/UsersListState";
import UserCell from "./UserCell";
import UserServices from "../../services/UserService";
import User from "../../types/Account/User";
import Role from "../../types/Account/Role";

interface UserListProps extends BaseProps {
  usersListState: UsersListState;
  selectedUser: User;
  retrievedUsers: typeof ActionCreators.retrievedUsers;
  openUserDetail: typeof ModalActionCreators.openModal;
  closeModal: typeof ModalActionCreators.hideModal;
  saveUser: typeof ActionCreators.saveNewUser;
  updateUser: typeof ActionCreators.updateUser;
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
    this.userService.getUsers().then(rs => {
      const { users } = rs.data;
      this.props.retrievedUsers(users);
    });
  }

  render() {
    const { openUserDetail } = this.props;
    const { users } = this.props.usersListState;
    const { closeModal } = this.props;
    const fakeRoles: Role[] = [{ id: "111", name: "admin", isChecked:false }, { id: "222", name: "mod", isChecked:false }];
    const { saveUser } = this.props;
    const usersList = users.map((user, i) => {
      return (
        <UserCell
          saveUser={saveUser}
          key={i}
          openUserDetail={openUserDetail}
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
      </div>
    );
  }
}

export default withApollo(UsersList);
