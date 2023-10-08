import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function Modal(props) {
  const {children, header, onClose} = props;
  // слушатель по Ecs
  React.useEffect(() => {
    function closeByEsc (evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEsc);

    return () => { document.removeEventListener('keydown', closeByEsc) };
  }, []);

  return ReactDOM.createPortal(
    (
      <>
        <div className={styles.modal}>
          <ModalHeader onClose={onClose}>{header}</ModalHeader>
          {children}
          <CloseIcon type="primary" onClick={onClose} />
        </div>

        <ModalOverlay onClose={onClose} />
      </>
    ), document.getElementById("react-modals")
  );
}

export default Modal;
