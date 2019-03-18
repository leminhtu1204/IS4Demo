import React from "react";
import User from "../../types/Account/User";

interface UserProps {
  user: User;
  openUserDetail: any;
}

const UserCell = (props: UserProps) => {
  const { user } = props;
  const { openUserDetail } = props;
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => openUserDetail(user)}
          style={{ marginRight: "5px" }}
        >
          Detail
        </button>
      </td>
    </tr>
  );
};

export default UserCell;
