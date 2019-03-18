import * as ActionTypes from "../../constants/ActionTypes/User";
import { UserActionType } from "../../types/Account/UserAction";
import UsersListState from "../../types/Account/UsersListState";

const initialState: UsersListState = {
  users: [
    {
      id: "1",
      name: "Linh Nguyen",
      roles: []
    }
  ],
  user: { id: "1", name: "", roles: [] },
  isOpen: false
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
    case ActionTypes.USER_SELECTED:
      return {
        ...state,
        user: getSelectedUser({ ...state }, action.user),
        isOpen: action.isOpen
      };
    case ActionTypes.USER_MODAL_CLOSE:
      return {
        ...state,
        isOpen: action.isOpen
      };

    default:
      return state;
  }
};

export default User;
