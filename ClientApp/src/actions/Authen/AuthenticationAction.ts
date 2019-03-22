import * as ActionTypes from '../../constants/ActionTypes/Authentication';

export const requestLogin = () => ({
    type: ActionTypes.REQUEST_LOGIN,
    isAuthenticated: false
});

export const receiveLogin = (token: string) => ({
    type: ActionTypes.RECEIVE_LOGIN,
    isAuthenticated: true,
    token:token
});

export const logout = () => ({
    type: ActionTypes.LOGOUT,
    isAuthenticated: false
});