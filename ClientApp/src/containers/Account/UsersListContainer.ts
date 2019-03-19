import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import UsersList from "../../components/Account/UsersList";
import * as UserActionCreators from "../../actions/Account/User";
import { openModal, hideModal } from '../../actions/Common/Modal';

const mapStateToProps = (state: AppState) => {
  return {
    ...state.account,
    ...state.common
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      openUserDetail: openModal,
      retrievedUsers: UserActionCreators.RetrievedUsers,
      closeUserDetail: hideModal
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
