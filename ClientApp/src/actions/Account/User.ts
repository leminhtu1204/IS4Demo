import * as ActionTypes from "../../constants/ActionTypes/User";
import User from "../../types/Account/User";

export const RetrievedUsers = (users: User[]) => {
  return {
    type: ActionTypes.USERS_RETRIEVED,
    users
  };
};

export const SelectUser = (userId: string) => {
  return {
    type: ActionTypes.USER_SELECTED,
    userId
  };
};

export const UpdateUser = (user: User) => {
  return {
    type: ActionTypes.USER_UPDATED,
    user
  };
};

export const AddUser = (user: User) => {
  return {
    type: ActionTypes,
    user
  };
};
