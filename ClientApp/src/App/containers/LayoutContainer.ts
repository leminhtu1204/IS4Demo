import { connect } from "react-redux";
import { AppState } from "../reducers";
import Layout from "../components/Shared/Layout";
import { bindActionCreators } from "redux";
import * as AuthenActionCreators from "../../App/Views/Authentication/actions/AuthenticationAction";
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
      requestLogin: AuthenActionCreators.requestLogin,
      receiveLogin: AuthenActionCreators.receiveLogin,
      logout: AuthenActionCreators.logout
    },
    dispatch
  );
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Layout);
