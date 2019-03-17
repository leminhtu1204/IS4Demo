import * as ActionTypes from '../../constants/ActionTypes/User';
import User from '../../types/Account/User';

export const RetrievedUsers = (users: User[]) => {
    return {
        type: ActionTypes.USERS_RETRIEVED,
        users: users
    }
};

export const SelectUser = (userId: string) => {
    return {
        type: ActionTypes.USER_SELECTED,
        userId: userId
    };
};

export const LoadUsers = () => (dispatch: any) => {
    dispatch({
        type: ActionTypes.USER_LOADING
    });
}
