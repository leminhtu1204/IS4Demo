import * as ActionTypes from "../../constants/ActionTypes/User";
import User from "../../types/Account/User";

export const RetrievedUsers = (users: User[]) => {
  return {
    type: ActionTypes.USERS_RETRIEVED,
    users: users
  };
};

export const SelectUser = (userId: string) => {
  return {
    type: ActionTypes.USER_SELECTED,
    userId: userId
  };
};

export const OpenUserDetail = (user: User) => {
  return {
    type: ActionTypes.USER_SELECTED,
    isOpen: true,
    user: user
  };
};

export const CloseUserModal = () => {
  return {
    type: ActionTypes.USER_MODAL_CLOSE,
    isOpen: false
  };
};
