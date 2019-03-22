import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import UsersList from "../../components/Account/UsersList";
import * as UserActionCreators from "../../actions/Account/User";
import * as ModalActionCreators from '../../actions/Common/Modal';

const mapStateToProps = (state: AppState) => {
  return {
    ...state.account,
    ...state.common
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      retrievedUsers: UserActionCreators.retrievedUsers,
      closeModal: ModalActionCreators.hideModal,
      saveDelUser: UserActionCreators.saveDelUser,
      updateUser: UserActionCreators.updateUser,
      addUser: UserActionCreators.addUser,
      saveUser: UserActionCreators.saveNewUser
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
