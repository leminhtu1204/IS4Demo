import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import UsersList from "../../components/Account/UsersList";
import * as UserActionCreators from "../../actions/Account/User";

const mapStateToProps = (state: AppState) => {
  return {
    ...state.account
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      openUserDetail: UserActionCreators.OpenUserDetail,
      retrievedUsers: UserActionCreators.RetrievedUsers,
      closeUserDetail: UserActionCreators.CloseUserModal
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
