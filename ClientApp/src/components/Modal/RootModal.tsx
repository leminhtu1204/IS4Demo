import React from "react";
import Modal from "react-modal";

let defaultStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%"
  }
};
Modal.setAppElement("#root");
const RootModal = (props: any) => {
  const { customStyles } = props;
  const { title } = props;
  const { isOpen } = props;
  const { children } = props;
  const { afterOpenModal } = props;
  const { closeModal } = props;

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles || defaultStyles}
      contentLabel="Example Modal"
    >
      <h2>{title}</h2>
      {children}
    </Modal>
  );
};

export default RootModal;
