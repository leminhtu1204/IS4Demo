import React, { Component } from "react";
import { withApollo } from "react-apollo";
import BaseProps from "../../types/BaseProps";

import * as ActionCreators from "../../actions/Account/User";
import UsersListState from "../../types/Account/UsersListState";
import UserCell from "./UserCell";
import UserServices from "../../services/UserService";
import UserDetail from "./UserDetail";
import User from "../../types/Account/User";

interface UserListProps extends BaseProps {
  usersListState: UsersListState;
  selectedUser: User;
  retrievedUsers: typeof ActionCreators.RetrievedUsers;
  openUserDetail: typeof ActionCreators.OpenUserDetail;
  closeUserDetail: typeof ActionCreators.CloseUserModal;
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
    const { isOpen, user, users } = this.props.usersListState;
    const { closeUserDetail } = this.props;
    const usersList = users.map((user, i) => {
      return (
        <UserCell key={user.id} openUserDetail={openUserDetail} user={user} />
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
        <UserDetail
          isOpen={isOpen}
          selectedUser={user}
          closeUserDetail={closeUserDetail}
        />
      </div>
    );
  }
}

export default withApollo(UsersList);
