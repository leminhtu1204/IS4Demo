import * as ActionTypes from '../../constants/ActionTypes/Modal';

interface ShowModalAction {
    type: typeof ActionTypes.SHOW_MODAL;
    modalProps: any,
    modalType: any
}

interface HideModalAction {
    type: typeof ActionTypes.HIDE_MODAL;
}

export type ModalActionType = ShowModalAction | HideModalAction;