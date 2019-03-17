import { combineReducers } from 'redux';
import { accountReducers } from './Account';
import Modal from './Modal/Modal';

export const rootReducer = combineReducers({
    account: accountReducers,
    modal: Modal
});

export type AppState = ReturnType<typeof rootReducer>;