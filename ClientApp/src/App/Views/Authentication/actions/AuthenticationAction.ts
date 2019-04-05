import * as ActionTypes from '../../Authentication/constants/Authentication';

export const requestLogin = () => ({
    type: ActionTypes.REQUEST_LOGIN,
    isAuthenticated: false
});

export const receiveLogin = (token: string) => ({
    type: ActionTypes.RECEIVE_LOGIN,
    isAuthenticated: isAuthenticated(token),
    token:token
});

export const logout = () => ({
    type: ActionTypes.LOGOUT,
    isAuthenticated: false
});

const isAuthenticated = (token: string) =>{
    return !!token;
}
