import * as ActionTypes from "../../constants/ActionTypes/User";
import * as LoadingActionTypes from "../../constants/ActionTypes/Loading";
import User from "../../types/Account/User";
import UserServices from "../../services/AccountService/UserService";


export const retrievedUsers = (users: User[]) => {
  return {
    type: ActionTypes.USERS_RETRIEVED,
    users
  };
};

export const loadUsers = (userService: UserServices) => (dispatch:any) =>{
  dispatch({
    type: ActionTypes.USER_LOADING
  })

  dispatch({
    type: LoadingActionTypes.SHOW_LOADING
  })

  userService.getUsers().then(rs => {
    const { users } = rs.data;
    dispatch(retrievedUsers(users));
    dispatch({
      type: LoadingActionTypes.HIDE_LOADING
    })
  });
}

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
