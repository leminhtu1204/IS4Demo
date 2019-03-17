import * as ActionTypes from '../../constants/ActionTypes/Modal'

export const ShowModal = (modalProps: any, modalType: any) => (dispatch: any) => {
    dispatch({
      type: ActionTypes.SHOW_MODAL,
      modalProps,
      modalType
    });
  }

  export const HideModal = () => (dispatch: any) => {
    dispatch({
        type: ActionTypes.HIDE_MODAL
    });
}