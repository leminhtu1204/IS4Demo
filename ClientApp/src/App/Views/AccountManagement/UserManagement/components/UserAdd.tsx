import React from "react";
import Role from "../types/Role";

export interface ModalContentProps {
  closeModal: any;
  roles: Role[];
  saveUser: any;
  userService: any;
}

export interface ModalContentState {
  form: any;
}

class UserAdd extends React.Component<ModalContentProps, ModalContentState> {
  constructor(props: ModalContentProps) {
    super(props);
    this.state = {
      form: {
        userName: "",
        phoneNumber: "",
        address:"",
        roleNames: [],
        email: ""
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

  toggleCheckbox = (event: any) => {
    const value = event.target.value;
    const form = {
      ...this.state.form
    }
    if(event.target.checked){
      form.roleNames.push(value);
    }
    else{
      var index = form.roleName.indexOf(value);
      form.roleNames.slice(index, 1);
    }
    this.setState({ form: form });
  }

  saveUser = () => {
    const newUser = this.state.form;
    const { userService } = this.props;
    this.props.saveUser(newUser, userService);
    this.props.closeModal();
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    const { roles } = this.props;
    console.log(roles);

    const roleList = roles.map((role, i) => {
      return (
        <tr key={i}>
          <td>
            <input
              name='roleName'
              type="checkbox"
              value = {role.name}
              onChange={this.toggleCheckbox.bind(this)}
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
        <h3>Roles</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>{roleList}</tbody>
        </table>

        <div className="modal-footer">
          <button style={{ marginRight: "5px" }}
            type="button"
            className="btn btn-primary"
            onClick={this.saveUser}
          >
            Save
          </button>
          <button style={{ marginRight: "5px" }}
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

export default UserAdd;
