import React from 'react';
import * as ActionCreators from '../../actions/Account/User';
import UsersListState from '../../types/Account/UsersListState';

interface UserListProps {
    usersListState: UsersListState;
    selectUser: typeof ActionCreators.SelectUser;
}

const UsersList = (props: UserListProps) => {
    const { usersListState } = props;
    const { selectUser } = props;

    const users = usersListState.users.map((user, i) => {
        return (
            <li key={i} onClick={() => selectUser(user.id)}>{user.name}</li>
        )
    })
    return (
        <div>
            <ul>{users}</ul>
            <p>Selected User: {usersListState.userId}</p>
        </div>
    );
}

export default UsersList;