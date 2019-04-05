import * as ActionTypes from "../../Authentication/constants/Authentication";

interface ReceiveLogin {
  type: typeof ActionTypes.RECEIVE_LOGIN;
  accessToken: string;
  isAuthenticated: boolean;
}

interface RequestLogin {
  type: typeof ActionTypes.REQUEST_LOGIN;
}

interface Logout {
  type: typeof ActionTypes.LOGOUT;
  isAuthenticated: boolean;
}

export type AuthenticationActionType = ReceiveLogin | RequestLogin | Logout;
