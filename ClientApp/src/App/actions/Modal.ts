import * as ActionTypes from '../constants/Modal';

export const openModal = (title: string, body: any) => ({
    type: ActionTypes.SHOW_MODAL,
    title,
    body
});

export const hideModal = () => ({
    type: ActionTypes.HIDE_MODAL
});