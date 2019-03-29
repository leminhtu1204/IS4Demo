import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import UsersList from "../../components/Account/UsersList";
import * as UserActionCreators from "../../actions/Account/User";
import * as ModalActionCreators from '../../actions/Common/Modal';
import * as AuthenActionCreators from '../../actions/Authentication/AuthenticationAction';

const mapStateToProps = (state: AppState) => {
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
      updateUser: UserActionCreators.updateUser,
      addUser: UserActionCreators.addUser,
      saveUser: UserActionCreators.saveNewUser,
      logout: AuthenActionCreators.logout, // add for test logout function
      loadUsers: UserActionCreators.loadUsers
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
