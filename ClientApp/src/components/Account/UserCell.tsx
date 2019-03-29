import React from "react";
import User from "../../types/Account/User";
import UserDetail from "./UserDetail";
import Role from "../../types/Account/Role";
import UserAdd from "./UserAdd";
import UserUpdate from "./UserUpdate";

interface UserProps {
  user: User;
  openModal: any;
  closeModal: any;
  roles: Role[];
  saveUser: any;
}

const UserCell = (props: UserProps) => {
  const { user } = props;
  const { openModal } = props;
  const { closeModal } = props;
  const { roles } = props;
  const { saveUser } = props;
  const modalDetailBody = (
    <UserDetail selectedUser={user} closeModal={closeModal} />
  );

  const modalAddBody = (
    <UserAdd
    closeModal={closeModal}
      roles={roles}
      saveUser={saveUser}
    />
  );

  const modalUpdateBody = (
    <UserUpdate
    selectedUser = {user}
    closeModal={closeModal}
      roles={roles}
      saveUser={saveUser}
    />
  );
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.userName}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => openModal("User details", modalDetailBody)}
          style={{ marginRight: "5px" }}
        >
          Detail
        </button>
        <button
          className="btn btn-primary"
          onClick={() => openModal("User Add", modalAddBody)}
          style={{ marginRight: "5px" }}
        >
          Add
        </button>
        <button
          className="btn btn-primary"
          onClick={() => openModal("User Update", modalUpdateBody)}
          style={{ marginRight: "5px" }}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default UserCell;
