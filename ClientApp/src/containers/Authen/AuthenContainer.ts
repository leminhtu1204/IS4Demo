import { connect } from "react-redux";
import { AppState } from "../../reducers";
import Authentication from "../../components/Authen/Authentication";
import { bindActionCreators } from "redux";
import * as AuthenActionCreators from "../../actions/Authen/AuthenticationAction";
const mapStateToProps = (state: AppState) => {
  return {
    ...state.common,
    ...state.account
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
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
