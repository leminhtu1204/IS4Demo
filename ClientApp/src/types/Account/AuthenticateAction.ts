import * as ActionTypes from "../../constants/ActionTypes/Authentication";
import User from "./User";

interface ReceiveLogin {
  type: typeof ActionTypes.RECEIVE_LOGIN;
}

interface RequestLogin {
  type: typeof ActionTypes.REQUEST_LOGIN;
}

interface Logout {
  type: typeof ActionTypes.LOGOUT;
}

export type ModalActionType = ReceiveLogin | RequestLogin | Logout;
