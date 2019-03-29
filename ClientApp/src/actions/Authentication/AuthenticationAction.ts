import * as ActionTypes from '../../constants/ActionTypes/Authentication';

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
    isAuthenticated: removeAccessToken()
});

const isAuthenticated = (token: string) =>{
    return !!token;
}

const removeAccessToken = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    return false;
}

const ferderatedLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    return false;
}