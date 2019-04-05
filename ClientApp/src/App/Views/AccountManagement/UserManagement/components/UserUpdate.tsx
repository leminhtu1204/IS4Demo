import React from "react";
import Role from "../types/Role";
import User from "../types/User";

export interface ModalContentProps {
  closeModal: any;
  roles: Role[];
  saveUpdateUser: any;
  selectedUser: User;
  userService: any;
}

export interface ModalContentState {
  form: UpdateUserForm;
}

export interface UpdateUserForm {
  [key: string]: string | User | Role[] | string[];
  roles: Role[];
  userName: string;
  phoneNumber: string;
  address: string;
  id: string;
  email: string;
  roleNames: string[];
}

class UserUpdate extends React.Component<ModalContentProps, ModalContentState> {
  constructor(props: ModalContentProps) {
    super(props);
    this.state = {
      form: {
        id: props.selectedUser.id,
        roles: this.loadCheckState(props.selectedUser, props.roles),
        userName: props.selectedUser.userName,
        phoneNumber: props.selectedUser.phoneNumber,
        address: props.selectedUser.address,
        email: props.selectedUser.email,
        roleNames: []
      }
    };
    this.saveUser = this.saveUser.bind(this);
  }

  handleInputChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;
    let form = {
      ...this.state.form
    };

    form[name] = value;
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

  setSelectedRoleNameToState(){
    this.state.form.roles.forEach(role => {
      if(role.isChecked){
        this.state.form.roleNames.push(role.name);
      }
    });
  }

  saveUser = () => {
    const { userService } = this.props;
    let newUser = this.state.form;
    this.setSelectedRoleNameToState();
    this.props.saveUpdateUser(newUser, userService);
    this.props.closeModal();
  };

  closeModal = () => {
    this.props.closeModal();
  };

  loadCheckState(selectedUser: User, roles: Role[]) {
    selectedUser.roles.forEach(element => {
      element.isChecked = true;
    });
    const selectedRoleIds = new Set(selectedUser.roles.map(({id}) => id));

    const combined = [
      ...selectedUser.roles,
      ...roles.filter(({id}) => !selectedRoleIds.has(id))
    ]

    return combined;
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
        <h3>User info</h3>
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
                  name="userName"
                  className="form-control"
                  value={this.state.form.userName}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  value={this.state.form.phoneNumber}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={this.state.form.address}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={this.state.form.email}
                  onChange={this.handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h3>roles</h3>
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
            style={{ marginRight: "5px" }}
            type="button"
            className="btn btn-primary"
            onClick={this.saveUser}
          >
            Save
          </button>
          <button
            style={{ marginRight: "5px" }}
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
