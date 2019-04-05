
import React from 'react';
import * as ActionTypes from '../../constants/Modal';

interface ModalInitialState {
    isOpen: boolean;
    title: string;
    body: any
}
const defaultBody = () => {
    return (
        <div>
        </div>
    );
}
const initialState: ModalInitialState = {
    isOpen: false,
    title: '',
    body: defaultBody()
};

const Modal = (state: ModalInitialState = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SHOW_MODAL:
            return {
                ...state,
                isOpen: true,
                title: action.title,
                body: action.body
            };
        case ActionTypes.HIDE_MODAL:
            return {
                ...state,
                isOpen: false,
                title: '',
                body: defaultBody()
            };
        default:
            return state;
    }   
}

export default Modal;