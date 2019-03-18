import * as ActionTypes from "../../constants/ActionTypes/User";
import User from "./User";

interface RetrievedUsersAction {
  type: typeof ActionTypes.USERS_RETRIEVED;
  users: User[];
}

interface SelectUserAction {
  type: typeof ActionTypes.USER_SELECTED;
  user: User;
  isOpen: boolean;
}

interface CloseUserModal {
  type: typeof ActionTypes.USER_MODAL_CLOSE;
  isOpen: boolean;
}

export type UserActionType =
  | RetrievedUsersAction
  | SelectUserAction
  | CloseUserModal;
