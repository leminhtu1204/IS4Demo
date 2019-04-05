import * as ActionTypes from "../../constants/Modal";

interface ShowModal {
  type: typeof ActionTypes.SHOW_MODAL;
  isOpen: boolean;
  title: string;
  body: {};
}

interface HideModal {
  type: typeof ActionTypes.HIDE_MODAL;
  isOpen: boolean;
}

export type ModalActionType = ShowModal | HideModal;
