import * as ActionTypes from "../constants/User";
import { UserActionType } from "../types/UserAction";
import UsersListState from "../types/UsersListState";

const initialState: UsersListState = {
  users: [
    {
      id: "1",
      userName: "Linh Nguyen",
      roles: [],
      phoneNumber: '',
      address: '',
      roleNames: [],
      email: ''
    }
  ],
  roles: []
};

const getSelectedUser = (state: UsersListState, user: any) => {
  const { users } = state;
  const selectedUser = users.filter(x => x.id === user.id);

  return selectedUser[0];
};

const User = (state: UsersListState = initialState, action: UserActionType) => {
  switch (action.type) {
    case ActionTypes.USERS_RETRIEVED:
      return {
        ...state,
        users: action.users,
        roles: action.roles
      };
    case ActionTypes.USER_ADDED:
      return {
        ...state
      };
    case ActionTypes.USER_LOADING:
      return {
        ...state
      }
    default:
      return state;
  }
};

export default User;
