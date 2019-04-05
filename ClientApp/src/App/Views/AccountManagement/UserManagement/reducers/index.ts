import { combineReducers } from 'redux';
import User from './User';

export const accountReducers = combineReducers({
    usersListState: User
});

export type AccountState = ReturnType<typeof accountReducers>;