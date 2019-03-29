import * as ActionTypes from "../../constants/ActionTypes/User";
import { UserActionType } from "../../types/Account/UserAction";
import UsersListState from "../../types/Account/UsersListState";

const initialState: UsersListState = {
  users: [
    {
      id: "1",
      userName: "Linh Nguyen",
      roles: []
    }
  ],
  user: { id: "1", userName: "", roles: [] }
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
        users: action.users
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
