import React from 'react';
import User from '../../types/Account/User';

interface UserProps {
  user: User;
}

const UserCell = (props: UserProps) => {
  const { user } = props;

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.roles}</td>
    </tr>
  )
}

export default UserCell;
