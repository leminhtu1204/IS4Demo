import * as ActionTypes from '../../constants/ActionTypes/User';
import User from './User';

interface RetrievedUsersAction {
    type: typeof ActionTypes.USERS_RETRIEVED;
    users: User[];
}

interface SelectUserAction {
    type: typeof ActionTypes.USER_SELECTED;
    userId: string;
}

export type UserActionType = RetrievedUsersAction | SelectUserAction;