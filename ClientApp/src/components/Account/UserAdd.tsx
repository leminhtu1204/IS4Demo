import React from "react";
import Role from "../../types/Account/Role";
import { compose } from "react-apollo";

export interface ModalContentProps {
  closeModal: any;
  roles: Role[];
  saveUser: any;
}

export interface ModalContentState {
  is_checked: boolean;
  form: any;
}

class UserAdd extends React.Component<ModalContentProps, ModalContentState> {
  constructor(props: ModalContentProps) {
    super(props);
    this.state = {
      is_checked: false,
      form: {
        name: ""
      }
    };
    this.saveUser = this.saveUser.bind(this);
  }

  handleInputChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;
    const form = {
      ...this.state.form
    };
    form[name] = value;
    this.setState({ form: form });
  };

  toggleCheckbox() {
    this.setState({
      is_checked: !this.state.is_checked
    });
  }

  saveUser = () => {
    const newUser = this.state.form;
    this.props.saveUser(newUser);
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
              name={role.name}
              type="checkbox"
              checked={false}
              onChange={this.toggleCheckbox.bind(this)}
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
                  value={this.state.form.name}
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

export default UserAdd;
