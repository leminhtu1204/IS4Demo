import { connect } from "react-redux";
import { AppState } from "../../reducers";
import Authentication from "../../components/Authentication/Authentication";
const mapStateToProps = (state: AppState) => {
  return {
    ...state.authentication
  };
};
export default connect(
  mapStateToProps
)(Authentication);
