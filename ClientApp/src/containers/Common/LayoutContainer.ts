import { connect } from "react-redux";
import { AppState } from "../../reducers";
import Layout from "../../components/Shared/Layout";

const mapStateToProps = (state: AppState) => {
  return {
    ...state.common,
    ...state.account
  };
};

export default connect(
  mapStateToProps
)(Layout);
