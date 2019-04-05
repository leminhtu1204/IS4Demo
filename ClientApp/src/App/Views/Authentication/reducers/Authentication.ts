import { AuthenticationActionType } from "../types/AuthenticateAction";
import * as ActionTypes from "../../Authentication/constants/Authentication";

interface AuthenticationInitialState {
  accessToken: string;
  isAuthenticated: boolean;
}

const initialState: AuthenticationInitialState = {
  accessToken: "",
  isAuthenticated: !!localStorage.getItem('ACCESS_TOKEN')
};

const Authentication = (
  state: AuthenticationInitialState = initialState,
  action: AuthenticationActionType
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_LOGIN:
      return {
        ...state
      };
    case ActionTypes.RECEIVE_LOGIN:
      return {
        ...state,
        accessToken: action.accessToken,
        isAuthenticated: action.isAuthenticated
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };

    default:
      return state;
  }
};

export default Authentication;
