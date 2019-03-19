import React, { Component } from "react";
import { withApollo } from "react-apollo";
import BaseProps from "../../types/BaseProps";

import * as ActionCreators from "../../actions/Account/User";
import * as ModalActionCreators from "../../actions/Common/Modal";
import UsersListState from "../../types/Account/UsersListState";
import UserCell from "./UserCell";
import UserServices from "../../services/UserService";
import User from "../../types/Account/User";
import UserModalContent from "./UserDetail";

interface UserListProps extends BaseProps {
  usersListState: UsersListState;
  selectedUser: User;
  retrievedUsers: typeof ActionCreators.RetrievedUsers;
  openUserDetail: typeof ModalActionCreators.openModal;
  closeUserDetail: typeof ModalActionCreators.hideModal;
}

class UsersList extends Component<UserListProps> {
  userService: UserServices;
  constructor(props: UserListProps) {
    super(props);
    const { client } = this.props;
    this.userService = new UserServices(client);
  }

  componentDidMount() {
    this.userService.getUsers().then(rs => {
      const { users } = rs.data;
      this.props.retrievedUsers(users);
    });
  }

  render() {
    const { openUserDetail } = this.props;
    const { users } = this.props.usersListState;
    const { closeUserDetail } = this.props;
    const usersList = users.map((user, i) => {
      return (
        <UserCell key={i} openUserDetail={openUserDetail} closeUserDetail={closeUserDetail} user={user} />
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
