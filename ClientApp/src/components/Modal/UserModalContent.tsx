import React from "react";
import User from "../../types/Account/User";

export interface ModalContentProps {
  selectedUser: User;
  closeUserDetail: any;
}

class UserModalContent extends React.Component<ModalContentProps> {
  constructor(props: ModalContentProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal = () => {
    this.props.closeUserDetail();
  };

  render() {
    const SelectedUser = this.props.selectedUser;
    const roleList = SelectedUser.roles.map((role, i) => {
      return <td>{role.name}</td>;
    });
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <td>{SelectedUser.id}</td>
            <td>{SelectedUser.name}</td>
          </tbody>
        </table>
        <h1>roles</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>{roleList}</tbody>
        </table>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.closeModal}
          >
            Close
          </button>
        </div>
      </>
    );
  }
}

export default UserModalContent;
