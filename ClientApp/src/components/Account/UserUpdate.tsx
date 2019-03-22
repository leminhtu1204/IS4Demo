import React from "react";
import Role from "../../types/Account/Role";
import User from "../../types/Account/User";

export interface ModalContentProps {
  closeModal: any;
  roles: Role[];
  saveUser: any;
  selectedUser: User;
}

export interface ModalContentState {
  is_checked: boolean;
  form: UpdateUserForm;
}

export interface UpdateUserForm {
  user: User;
  roles: Role[];
}

class UserUpdate extends React.Component<ModalContentProps, ModalContentState> {
  constructor(props: ModalContentProps) {
    super(props);
    this.state = {
      is_checked: false,
      form: {
        user: props.selectedUser,
        roles: this.loadCheckState(props.selectedUser, props.roles)
      }
    };
    this.saveUser = this.saveUser.bind(this);
  }

  handleInputChange = (event: any) => {
    const value = event.target.value;
    const form = {
      ...this.state.form
    };
    form.user.userName = value;
    this.setState({ form: form });
  };

  toggleCheckbox(role: Role) {
    this.state.form.roles.map(r => {
      if (role.id === r.id) {
        r.isChecked = !r.isChecked;
      }
    });

    const form = {
      ...this.state.form
    };
    this.setState({ form: form });
  }

  appliedRole() {
    return this.state.form.roles.filter(x => x.isChecked === true);
  }

  saveUser = () => {
    const newUser = this.state.form.user;
    newUser.roles = this.appliedRole();
    this.props.saveUser(newUser);
    this.props.closeModal();
  };

  closeModal = () => {
    this.props.closeModal();
  };

  loadCheckState(selectedUser: User, roles: Role[]) {
    roles.map(role => {
      selectedUser.roles.map(userRole => {
        role.isChecked = role.id === userRole.id;
      });
    });

    return roles;
  }

  render() {
    const roleList = this.state.form.roles.map((role, i) => {
      return (
        <tr key={i}>
          <td>
            <input
              checked={role.isChecked}
              id={role.id}
              name={role.name}
              type="checkbox"
              onChange={this.toggleCheckbox.bind(this, role)}
            />
            {role.name}
          </td>
        </tr>
      );
    });
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={this.state.form.user.userName}
                  onChange={this.handleInputChange}
                />
              </td>
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
            onClick={this.saveUser}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.closeModal}
          >
            Close
          </button>
        </div>
      </>
    );
  }
}

export default UserUpdate;
