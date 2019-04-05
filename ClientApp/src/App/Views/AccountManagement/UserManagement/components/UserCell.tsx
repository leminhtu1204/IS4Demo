import React from "react";
import User from "../types/User";
import UserDetail from "./UserDetail";
import Role from "../types/Role";
import UserUpdate from "./UserUpdate";
import UserDelete from "./UserDelete";

interface UserProps {
  user: User;
  openModal: any;
  closeModal: any;
  roles: Role[];
  userService: any;
  saveDelUser: any;
  saveUpdateUser: any;
}

const UserCell = (props: UserProps) => {
  const { user } = props;
  const { openModal } = props;
  const { closeModal } = props;
  const { roles } = props;
  const { userService } = props;
  const { saveDelUser } = props;
  const { saveUpdateUser } = props;

  const modalDeleteBody = (
    <UserDelete
      closeModal={closeModal}
      saveDelUser={saveDelUser}
      userService={userService}
      user={user}
    />
  );

  const modalUpdateBody = (
    <UserUpdate
      selectedUser={user}
      closeModal={closeModal}
      roles={roles}
      saveUpdateUser={saveUpdateUser}
      userService={userService}
    />
  );
  return (
    <tr>
      <td>{user.userName}</td>
      <td>{user.address}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.email}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => openModal("User Update", modalUpdateBody)}
          style={{ marginRight: "5px" }}
        >
          Update
        </button>
        <button
          className="btn btn-primary"
          onClick={() => openModal("Delete User", modalDeleteBody)}
          style={{ marginRight: "5px" }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserCell;
