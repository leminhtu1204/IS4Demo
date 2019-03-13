import { combineReducers } from 'redux';
import { accountReducers } from './Account';

export const rootReducer = combineReducers({
    account: accountReducers
});

export type AppState = ReturnType<typeof rootReducer>;