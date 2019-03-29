import { combineReducers } from 'redux';
import Loading from './Loading';

export const loadingReducers = combineReducers({
    loadingState: Loading
});

export type LoadingState = ReturnType<typeof loadingReducers>;