import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../../../reducers";
import UsersList from "../../../AccountManagement/UserManagement/components/UsersList";
import * as UserActionCreators from "../actions/Account/User";
import * as ModalActionCreators from '../../../../actions/Modal';
import * as AuthenActionCreators from '../../../Authentication/actions/AuthenticationAction';

const mapStateToProps = (state: AppState) => {
  console.log(state);
  
  return {
    ...state.common,
    ...state.account,
    ...state.authentication,
    ...state.loading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      openModal: ModalActionCreators.openModal,
      retrievedUsers: UserActionCreators.retrievedUsers,
      closeModal: ModalActionCreators.hideModal,
      saveDelUser: UserActionCreators.saveDelUser,
      saveUser: UserActionCreators.saveNewUser,
      logout: AuthenActionCreators.logout, // add for test logout function
      loadUsers: UserActionCreators.loadUsers,
      saveUpdateUser: UserActionCreators.saveUpdateUser
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
