import * as ActionTypes from '../../constants/ActionTypes/Loading';

export const openLoading = () => ({
    type: ActionTypes.SHOW_LOADING
});

export const hideLoading = () => ({
    type: ActionTypes.HIDE_LOADING
});