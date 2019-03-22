import * as ActionTypes from "../../constants/ActionTypes/User";
import User from "../../types/Account/User";

export const retrievedUsers = (users: User[]) => {
  return {
    type: ActionTypes.USERS_RETRIEVED,
    users
  };
};

export const selectUser = (userId: string) => {
  return {
    type: ActionTypes.USER_SELECTED,
    userId
  };
};

export const updateUser = (user: User) => {
  return {
    type: ActionTypes.USER_UPDATED,
    user
  };
};

export const addUser = (user: User) => {
  return {
    type: ActionTypes.USER_ADDED,
    user: user
  };
};

export const deleteUser = (userId: string) => {
  return {
    type: ActionTypes.USER_DELETE,
    userId
  };
};

export const saveDelUser = (user: string) => (dispatch: any) => {
  dispatch(retrievedUsers);
}

export const saveNewUser = (user: User) => (dispatch: any) => {
  dispatch(retrievedUsers);
}

export const saveupdateUser = (user: User) => (dispatch: any) => {
  dispatch(retrievedUsers);
}
