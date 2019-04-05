import React from "react";
import User from "../types/User";

export interface ModalContentProps {
  closeModal: any;
  user: User;
  saveDelUser: any;
  userService: any;
}

class UserDelete extends React.Component<ModalContentProps> {
  constructor(props: ModalContentProps) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser = () => {
    const { userService } = this.props;
    const { user } = this.props;
    this.props.saveDelUser(user.id, userService);
    this.props.closeModal();
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <form>
          <div className="alert alert-danger" role="alert">
            Do you want to delete user name: {user.userName} ?
          </div>
        </form>
        <div className="modal-footer">
          <button style={{ marginRight: "5px" }}
            type="button"
            className="btn btn-primary"
            onClick={this.deleteUser}
          >
            OK
          </button>
          <button style={{ marginRight: "5px" }}
            type="button"
            className="btn btn-primary"
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </div>
      </>
    );
  }
}

export default UserDelete;
