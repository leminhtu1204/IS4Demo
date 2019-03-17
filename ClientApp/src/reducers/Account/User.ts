import * as ActionTypes from '../../constants/ActionTypes/User';
import { UserActionType } from '../../types/Account/UserAction';
import UsersListState from '../../types/Account/UsersListState';

const initialState: UsersListState = {
    users: [{
        id: '1',
        name: 'Linh Nguyen',
        roles: []
    }],
    userId: ''
}

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
                userId: action.userId
            };

        default:
            return state;
    }
}

export default User;