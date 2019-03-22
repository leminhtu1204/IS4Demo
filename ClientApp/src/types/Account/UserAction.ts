import * as ActionTypes from "../../constants/ActionTypes/User";
import User from "./User";

interface RetrievedUsersAction {
  type: typeof ActionTypes.USERS_RETRIEVED;
  users: User[];
}

interface DeleteUser {
  type: typeof ActionTypes.USER_DELETE;
  userId: string;
}

interface UpdateUser {
  type: typeof ActionTypes.USER_UPDATED;
  user: User;
}

interface AddUser {
  type: typeof ActionTypes.USER_ADDED;
  user: User;
}

interface DeleteUser {
  type: typeof ActionTypes.USER_DELETE;
  userId: string;
}

export type UserActionType =
  | RetrievedUsersAction
  | DeleteUser
  | UpdateUser
  | AddUser;
