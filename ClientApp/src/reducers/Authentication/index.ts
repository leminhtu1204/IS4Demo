import { combineReducers } from 'redux';
import Authentication from './Authentication';

export const authenticationReducers = combineReducers({
    authenticationState: Authentication
});

export type AuthenticationState = ReturnType<typeof authenticationReducers>;