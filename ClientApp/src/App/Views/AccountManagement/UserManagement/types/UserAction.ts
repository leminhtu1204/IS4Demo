import * as ActionTypes from "../constants/User";
import User from "./User";
import Role from "./Role";

interface RetrievedUsersAction {
  type: typeof ActionTypes.USERS_RETRIEVED;
  users: User[];
  roles: Role[];
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

interface LoadingUser {
  type: typeof ActionTypes.USER_LOADING;
}

export type UserActionType =
  | RetrievedUsersAction
  | DeleteUser
  | UpdateUser
  | LoadingUser
  | AddUser;
