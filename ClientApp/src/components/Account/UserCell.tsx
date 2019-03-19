import React from "react";
import User from "../../types/Account/User";
import UserDetail from "./UserDetail";

interface UserProps {
  user: User;
  openUserDetail: any;
  closeUserDetail: any; 
}

const UserCell = (props: UserProps) => {
  const { user } = props;
  const { openUserDetail } = props;
  const { closeUserDetail } = props;
  const modalBody = (
    <UserDetail selectedUser={user} closeUserDetail={closeUserDetail} />
  );
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.userName}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => openUserDetail("User details", modalBody)}
          style={{ marginRight: "5px" }}
        >
          Detail
        </button>
      </td>
    </tr>
  );
};

export default UserCell;
