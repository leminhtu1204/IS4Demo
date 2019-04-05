import { combineReducers } from 'redux';
import Modal from './Modal';

export const commonReducers = combineReducers({
    modalState: Modal
});

export type CommonState = ReturnType<typeof commonReducers>;