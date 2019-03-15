import React, { Component }  from 'react';
import {withApollo} from 'react-apollo';
import BaseProps from '../../types/BaseProps';

import * as ActionCreators from '../../actions/Account/User';
import UsersListState from '../../types/Account/UsersListState';
import UserCell from './UserCell';
import UserServices from '../../services/UserService';

interface UserListProps extends BaseProps {
    usersListState: UsersListState;
    selectUser: typeof ActionCreators.SelectUser;
    retrievedUsers: typeof ActionCreators.RetrievedUsers;
    loadUsers: typeof ActionCreators.LoadUsers;
}

class UsersList extends Component <UserListProps> {
  userService: UserServices;
  constructor(props: UserListProps) {
    super(props);
    const {client} = this.props;
    this.userService = new UserServices(client);
  }

  componentDidMount(){
    this.userService.getUsers().then(rs => {
      const {users} = rs.data;
      this.props.retrievedUsers(users);
    })
  }
  
  render() {
    const usersList = this.props.usersListState;
    const users = usersList.users.map((user, i) => {
      return (
        <UserCell key={user.id}
          user={user} />
      )
    })
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
        <p>Number of user: {users.length}</p>
      </div>
    );
  }
}

export default withApollo(UsersList);
