import { ModalActionType } from './../../types/Account/ModalAction';
import * as ActionTypes from '../../constants/ActionTypes/Modal';
import ModalState from '../../types/Account/ModalState';

const initialState: ModalState = {
    modalType: null,
    modalProps: {}
}

const Modal = (state: ModalState = initialState, action: ModalActionType) => {
    switch (action.type) {
        case ActionTypes.SHOW_MODAL:
            return {
                ...state,
                modalType: action.modalType,
                modalProps: action.modalProps,
                type: action.type
            };

        case ActionTypes.HIDE_MODAL:
            return initialState

        default:
            return state;
    }
}

export default Modal;