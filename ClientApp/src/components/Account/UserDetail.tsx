import React from "react";
import User from "../../types/Account/User";

export interface ModalContentProps {
  selectedUser: User;
  closeUserDetail: any;
}

class UserDetail extends React.Component<ModalContentProps> {
  constructor(props: ModalContentProps) {
    super(props);
  }

  closeModal = () => {
    this.props.closeUserDetail();
  };

  render() {
    const selectedUser = this.props.selectedUser;
    const roleList = selectedUser.roles.map((role, i) => {
      return (
        <tr key={i}>
          <td>{role.name}</td>
        </tr>
      );
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
            <tr>
              <td>{selectedUser.id}</td>
              <td>{selectedUser.userName}</td>
            </tr>
            
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

export default UserDetail;
