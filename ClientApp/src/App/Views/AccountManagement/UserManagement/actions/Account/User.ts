import * as ActionTypes from "../../constants/User";
import * as LoadingActionTypes from "../../../../../../App/constants/Loading";
import User from "../../types/User";
import UserServices from "../../services/UserServices";
import Role from "../../types/Role";

export const retrievedUsers = (users: User[], roles: Role[]) => {
  return {
    type: ActionTypes.USERS_RETRIEVED,
    users,
    roles
  };
};

export const loadUsers = (userService: UserServices) => (dispatch:any) =>{
  dispatch({
    type: ActionTypes.USER_LOADING
  })

  dispatch({
    type: LoadingActionTypes.SHOW_LOADING
  })

  userService.getUsers(0, 10000, '').then(rs => {
    const { users } = rs.data;
    const{roles} = rs.data;
    dispatch(retrievedUsers(users, roles));
    dispatch({type: LoadingActionTypes.HIDE_LOADING})
  }).catch (error => {
    alert(error);
    dispatch({type: LoadingActionTypes.HIDE_LOADING})
  });
}

export const saveDelUser = (userId: string, userService: UserServices) => (dispatch: any) => {
  userService.deleteUser(userId).then(rs => {
    dispatch(loadUsers(userService));
  })
}

export const saveNewUser = (user: User, userService: UserServices) => (dispatch: any) => {
  userService.addUser(user).then(rs => {
    dispatch(loadUsers(userService));
  })
}

export const saveUpdateUser = (user: User, userService: UserServices) => (dispatch: any) => {
  userService.editUser(user).then(rs => {
    dispatch(loadUsers(userService));
  })
}

